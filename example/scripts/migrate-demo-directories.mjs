#!/usr/bin/env node
import { readFile, writeFile, open, lstat, mkdir, unlink, rmdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';
import { demoPathFor, loadComponentDirectory, validateDirectorySources } from './component-directory.mjs';

const slash = filename => filename.split(path.sep).join('/');
const moduleExtensions = ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.cjs'];

function parseSource(code, filename) {
  const source = ts.createSourceFile(filename, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  if (source.parseDiagnostics.length) throw new Error(`Cannot migrate invalid source ${filename}: ${ts.flattenDiagnosticMessageText(source.parseDiagnostics[0].messageText, '\n')}`);
  return source;
}

function moduleLiterals(source) {
  const literals = new Set();
  const add = node => { if (node && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))) literals.add(node); };
  function visit(node) {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) add(node.moduleSpecifier);
    if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) add(node.moduleReference.expression);
    if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) add(node.argument.literal);
    if (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(node.expression) && node.expression.text === 'require'))) {
      const argument = node.arguments[0];
      add(argument);
      if (argument && !ts.isStringLiteral(argument) && !ts.isNoSubstitutionTemplateLiteral(argument)) throw new Error(`Cannot safely migrate computed relative module import in ${source.fileName}`);
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return [...literals];
}

function relocatedSpecifier(specifier, from, to, relocations) {
  if (!specifier.startsWith('./') && !specifier.startsWith('../')) return specifier;
  const [, pathname, suffix = ''] = specifier.match(/^([^?#]+)([?#].*)?$/);
  const resolved = path.resolve(path.dirname(from), pathname);
  let target = relocations.get(resolved);
  const explicitExtension = Boolean(path.extname(pathname));
  if (!target && !explicitExtension) {
    for (const extension of moduleExtensions) {
      target = relocations.get(resolved + extension);
      if (target) { target = target.slice(0, -extension.length); break; }
      target = relocations.get(path.join(resolved, `index${extension}`));
      if (target) { target = target.slice(0, -extension.length); break; }
    }
  }
  const next = slash(path.relative(path.dirname(to), target ?? resolved));
  return `${next.startsWith('.') ? next : `./${next}`}${suffix}`;
}

export function rewriteRelativeImports(code, from, to, relocations = new Map()) {
  const source = parseSource(code, from);
  const edits = moduleLiterals(source).flatMap(literal => {
    const next = relocatedSpecifier(literal.text, from, to, relocations);
    if (next === literal.text) return [];
    return [{ start: literal.getStart(source) + 1, end: literal.end - 1, text: next }];
  });
  let rewritten = code;
  for (const edit of edits.sort((a, b) => b.start - a.start)) rewritten = rewritten.slice(0, edit.start) + edit.text + rewritten.slice(edit.end);
  return { code: rewritten, changedImports: edits.length };
}

export function rewriteRelativeCssUrls(code, from, to, relocations = new Map()) {
  const rewrite = specifier => {
    // CSS treats an unprefixed asset name as relative too. Leave fragments,
    // URLs and CSS variables untouched; only filesystem references move.
    if (/^(?:[a-z]+:|\/|#|var\()/i.test(specifier)) return specifier;
    const prefixed = specifier.startsWith('.') ? specifier : `./${specifier}`;
    return relocatedSpecifier(prefixed, from, to, relocations);
  };
  return code.replace(/url\(\s*(?:(['"])(.*?)\1|([^'"\s)]+))\s*\)/g, (match, quote = '', quoted, unquoted) => {
    const specifier = quoted ?? unquoted;
    const next = rewrite(specifier);
    return next === specifier ? match : `url(${quote}${next}${quote})`;
  }).replace(/(@import\s+)(['"])([^'"]+)\2/g, (match, prefix, quote, specifier) => {
    const next = rewrite(specifier);
    return next === specifier ? match : `${prefix}${quote}${next}${quote}`;
  });
}

async function regularFile(filename) {
  try {
    const info = await lstat(filename);
    if (!info.isFile() || info.isSymbolicLink()) throw new Error(`Refusing to migrate a non-regular file: ${filename}`);
    return info;
  } catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}

async function checkParents(root, filename) {
  const relative = path.relative(root, filename);
  if (!relative || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) throw new Error(`Migration path is outside the example root: ${filename}`);
  let current = path.dirname(filename);
  while (current !== root) {
    try {
      const info = await lstat(current);
      if (!info.isDirectory() || info.isSymbolicLink()) throw new Error(`Refusing migration through a non-directory or symbolic link: ${current}`);
    } catch (error) { if (error.code !== 'ENOENT') throw error; }
    current = path.dirname(current);
  }
}

export async function planDemoDirectoryMigration(exampleRoot, directory) {
  const root = path.resolve(exampleRoot);
  const files = new Map();
  const relocations = new Map();
  async function register(from, to) {
    await checkParents(root, from);
    await checkParents(root, to);
    const previous = files.get(from);
    if (previous) {
      if (previous.to !== to) throw new Error(`A CSS Module is shared across different target categories: ${slash(path.relative(root, from))}. Keep shared ownership explicit before migrating.`);
      return;
    }
    const info = await regularFile(from);
    if (!info) throw new Error(`Migration source is missing: ${slash(path.relative(root, from))}`);
    if (from !== to && await regularFile(to)) throw new Error(`Both legacy and categorized files exist: ${slash(path.relative(root, from))} -> ${slash(path.relative(root, to))}`);
    files.set(from, { from, to, mode: info.mode, original: await readFile(from, 'utf8') });
    relocations.set(from, to);
  }
  for (const component of directory.components) {
    const target = path.join(root, demoPathFor(directory, component.id));
    const base = component.provider === 'business' ? 'src/business/demos' : 'src/demos';
    const legacy = path.join(root, base, `${component.id}.tsx`);
    const oldInfo = await regularFile(legacy);
    const newInfo = await regularFile(target);
    if (oldInfo && newInfo) throw new Error(`Both legacy and categorized demos exist: ${component.id}`);
    await register(oldInfo ? legacy : target, target);
  }
  // Move only directly owned CSS Modules beside their importing demo. Shared
  // modules outside the demo directory retain their existing owner and path.
  for (const demo of [...files.values()]) {
    for (const literal of moduleLiterals(parseSource(demo.original, demo.from))) {
      const pathname = literal.text.split(/[?#]/, 1)[0];
      if (!pathname.startsWith('.') || !pathname.endsWith('.module.css')) continue;
      const stylesheet = path.resolve(path.dirname(demo.from), pathname);
      if (path.dirname(stylesheet) !== path.dirname(demo.from)) continue;
      const target = path.join(path.dirname(demo.to), path.basename(stylesheet));
      await register(stylesheet, target);
    }
  }
  const planned = [];
  for (const file of files.values()) {
    const rewritten = file.from.endsWith('.module.css')
      ? { code: rewriteRelativeCssUrls(file.original, file.from, file.to, relocations), changedImports: 0 }
      : rewriteRelativeImports(file.original, file.from, file.to, relocations);
    if (file.from !== file.to || rewritten.code !== file.original) planned.push({ ...file, ...rewritten });
  }
  return { root, files: planned, moves: planned.filter(file => file.from !== file.to).length };
}

export async function applyDemoDirectoryMigration(plan) {
  // Complete the preflight before touching any source. Exclusive destination
  // creation prevents a concurrent worker's result from being overwritten.
  for (const file of plan.files) {
    await checkParents(plan.root, file.from);
    await checkParents(plan.root, file.to);
    if (await readFile(file.from, 'utf8') !== file.original) throw new Error(`Migration source changed after preflight: ${file.from}`);
    if (file.from !== file.to && await regularFile(file.to)) throw new Error(`Migration destination appeared after preflight: ${file.to}`);
  }
  const created = [];
  const removed = [];
  const updated = [];
  const directories = new Set();
  try {
    for (const file of plan.files) {
      if (file.from === file.to) continue;
      const parent = path.dirname(file.to);
      const firstCreated = await mkdir(parent, { recursive: true });
      if (firstCreated) directories.add(parent);
      const handle = await open(file.to, 'wx', file.mode);
      created.push(file);
      try { await handle.writeFile(file.code, 'utf8'); }
      finally { await handle.close(); }
    }
    for (const file of plan.files) {
      if (file.from !== file.to) continue;
      if (await readFile(file.from, 'utf8') !== file.original) throw new Error(`Migration source changed during apply: ${file.from}`);
      await writeFile(file.to, file.code);
      updated.push(file);
    }
    for (const file of created) {
      if (await readFile(file.from, 'utf8') !== file.original) throw new Error(`Migration source changed during apply: ${file.from}`);
      await unlink(file.from);
      removed.push(file);
    }
  } catch (cause) {
    const recoveryErrors = [];
    for (const file of removed) {
      try { await writeFile(file.from, file.original, { flag: 'wx', mode: file.mode }); }
      catch (error) { recoveryErrors.push(error); }
    }
    for (const file of updated) {
      try { await writeFile(file.from, file.original); }
      catch (error) { recoveryErrors.push(error); }
    }
    for (const file of created) {
      try { await unlink(file.to); }
      catch (error) { recoveryErrors.push(error); }
    }
    for (const directory of directories) {
      try { await rmdir(directory); }
      catch (error) { if (!['ENOTEMPTY', 'ENOENT'].includes(error.code)) recoveryErrors.push(error); }
    }
    if (recoveryErrors.length) throw new AggregateError([cause, ...recoveryErrors], 'Directory migration failed and some recovery steps need inspection.');
    throw new Error('Directory migration failed; original file contents were restored.', { cause });
  }
  return { moved: created.length, updated: updated.length };
}

async function main() {
  const options = { root: fileURLToPath(new URL('../', import.meta.url)), apply: false };
  for (let index = 2; index < process.argv.length; index++) {
    const argument = process.argv[index];
    if (argument === '--apply') options.apply = true;
    else if (argument === '--dry-run') options.apply = false;
    else if (argument === '--root' && process.argv[index + 1]) options.root = path.resolve(process.argv[++index]);
    else throw new Error('Usage: node scripts/migrate-demo-directories.mjs [--dry-run|--apply] [--root DIR]');
  }
  const directory = await loadComponentDirectory(options.root);
  const [effects, business] = await Promise.all(['upstream-manifest.json', 'business-catalog.json'].map(async filename => JSON.parse(await readFile(path.join(options.root, 'catalog', filename), 'utf8'))));
  validateDirectorySources(directory, effects.components, business.components);
  const plan = await planDemoDirectoryMigration(options.root, directory);
  const importCount = plan.files.reduce((sum, file) => sum + file.changedImports, 0);
  if (options.apply) {
    const result = await applyDemoDirectoryMigration(plan);
    console.log(`Moved ${result.moved} demo/CSS Module files; updated ${importCount} relative module imports. Regenerate the catalogs, lazy loaders and documentation next.`);
  } else {
    console.log(`Dry run: ${plan.moves} demo/CSS Module moves; ${importCount} relative module imports. No files were changed.`);
  }
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  await main();
}
