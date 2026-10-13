import { readFile, readdir, stat } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { createComponentDirectory, validateDirectorySources, demoPathFor } from '../component-directory.mjs';

const slash = value => value.replaceAll('\\', '/');
const safeRelative = value => typeof value === 'string' && value !== '' && !path.posix.isAbsolute(value) && !value.split('/').includes('..') && !value.includes('\\');
const oldSources = new Set(['text-animations', 'animations', 'components', 'micro', 'backgrounds']);
const oldBusiness = new Set(['action', 'panel', 'utility']);
const runtimeFolders = new Set(['.git', 'node_modules', '.upstream', 'dist', '.vite', 'coverage']);
const decodeEntities = value => value.replace(/&(?:amp|lt|gt|quot|apos|#\d+|#x[\da-f]+);/gi, entity => {
  const named = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'" };
  if (named[entity.toLowerCase()]) return named[entity.toLowerCase()];
  const code = entity[2].toLowerCase() === 'x' ? Number.parseInt(entity.slice(3, -1), 16) : Number.parseInt(entity.slice(2, -1), 10);
  return Number.isInteger(code) && code <= 0x10ffff ? String.fromCodePoint(code) : entity;
});

function withoutFences(markdown) {
  let fence;
  return markdown.split('\n').map(line => {
    const marker = line.match(/^\s{0,3}(`{3,}|~{3,})/);
    if (marker && (!fence || (marker[1][0] === fence[0] && marker[1].length >= fence.length))) {
      fence = fence ? undefined : marker[1];
      return '';
    }
    return fence ? '' : line;
  }).join('\n');
}

const plainCell = value => decodeEntities(value.trim().replace(/^(`+)([\s\S]*)\1$/, '$2').replace(/\\([\\|`*_[\]()])/g, '$1').replaceAll('<br>', '\n'));
const labelText = value => decodeEntities(value.replace(/!?\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/<[^>]*>/g, '').replace(/[`*_~]/g, '').replace(/\\([\p{P}\p{S}])/gu, '$1').trim());

// GFM table delimiters ignore escaped pipes, including unions inside code spans.
export function splitMarkdownRow(line) {
  const cells = [];
  let cell = '';
  for (let index = 0; index < line.length; index++) {
    const char = line[index];
    if (char === '\\' && index + 1 < line.length) {
      cell += char + line[++index];
    } else if (char === '|') {
      cells.push(cell.trim());
      cell = '';
    } else cell += char;
  }
  cells.push(cell.trim());
  if (line.trimStart().startsWith('|')) cells.shift();
  if (line.trimEnd().endsWith('|')) cells.pop();
  return cells;
}

export function parseMarkdownTables(markdown) {
  const lines = withoutFences(markdown).split('\n');
  const tables = [];
  for (let index = 0; index < lines.length - 1; index++) {
    const separator = splitMarkdownRow(lines[index + 1]);
    if (!lines[index].includes('|') || !separator.length || !separator.every(cell => /^:?-{3,}:?$/.test(cell))) continue;
    const table = { line: index + 1, header: splitMarkdownRow(lines[index]).map(labelText), rows: [] };
    index += 2;
    while (index < lines.length && lines[index].includes('|') && lines[index].trim()) {
      table.rows.push({ line: index + 1, cells: splitMarkdownRow(lines[index]) });
      index++;
    }
    index--;
    tables.push(table);
  }
  return tables;
}

export function markdownAnchors(markdown) {
  const source = withoutFences(markdown);
  const anchors = new Set();
  const duplicates = new Map();
  const addHeading = text => {
    const slug = labelText(text).toLowerCase().replace(/[^\p{L}\p{N}\p{M}\s_-]/gu, '').replace(/\s/g, '-');
    const occurrence = duplicates.get(slug) ?? 0;
    duplicates.set(slug, occurrence + 1);
    anchors.add(occurrence ? `${slug}-${occurrence}` : slug);
  };
  const lines = source.split('\n');
  for (let index = 0; index < lines.length; index++) {
    const heading = lines[index].match(/^\s{0,3}#{1,6}\s+(.+?)(?:\s+#+)?\s*$/);
    if (heading) addHeading(heading[1]);
    else if (index && /^\s{0,3}(?:=+|-+)\s*$/.test(lines[index]) && lines[index - 1].trim()) addHeading(lines[index - 1].trim());
  }
  for (const match of source.matchAll(/<(?:[\w:-]+)\b[^>]*?\b(?:id|name)\s*=\s*["']([^"']+)["'][^>]*>/gi)) anchors.add(decodeEntities(match[1]));
  return anchors;
}

const referenceKey = value => value.replace(/\s+/g, ' ').trim().toLowerCase();
function readDestination(source, start) {
  let index = start;
  while (/\s/.test(source[index] ?? '') && index < source.length) index++;
  if (source[index] === '<') {
    const end = source.indexOf('>', index + 1);
    return end < 0 ? null : { destination: source.slice(index + 1, end), end: end + 1 };
  }
  const beginning = index;
  let depth = 0;
  for (; index < source.length; index++) {
    if (source[index] === '\\') { index++; continue; }
    if (source[index] === '(') depth++;
    else if (source[index] === ')') { if (!depth) break; depth--; }
    else if (/\s/.test(source[index]) && !depth) break;
  }
  return { destination: source.slice(beginning, index), end: index };
}

export function extractMarkdownLinks(markdown) {
  // Inline code is prose or source, not Markdown link syntax. Keep line numbers.
  const source = withoutFences(markdown).replace(/(`+)[\s\S]*?\1/g, match => match.replace(/[^\n]/g, ' '));
  const definitions = new Map();
  const result = [];
  for (const match of source.matchAll(/^\s{0,3}\[([^\]]+)\]:\s*(.*)$/gm)) {
    const parsed = readDestination(match[2], 0);
    if (parsed) definitions.set(referenceKey(match[1]), parsed.destination);
  }
  const lines = markdown.split('\n');
  const emit = (destination, offset, label, missingReference = false) => {
    const line = source.slice(0, offset).split('\n').length;
    result.push({ destination: decodeEntities(destination.replace(/\\([()\\])/g, '$1')), label: labelText(label), line, context: lines[line - 1] ?? '', missingReference });
  };
  for (let index = 0; index < source.length; index++) {
    if (source[index] !== '[' || source[index - 1] === '\\') continue;
    let end = index + 1, depth = 1;
    for (; end < source.length; end++) {
      if (source[end] === '\\') { end++; continue; }
      if (source[end] === '[') depth++;
      if (source[end] === ']' && --depth === 0) break;
    }
    if (depth) continue;
    const label = source.slice(index + 1, end);
    if (source[end + 1] === ':') { index = end; continue; }
    if (source[end + 1] === '(') {
      const parsed = readDestination(source, end + 2);
      if (parsed) emit(parsed.destination, index, label);
      index = end;
    } else if (source[end + 1] === '[') {
      const referenceEnd = source.indexOf(']', end + 2);
      if (referenceEnd >= 0) {
        const key = referenceKey(source.slice(end + 2, referenceEnd) || label);
        emit(definitions.get(key) ?? key, index, label, !definitions.has(key));
        index = referenceEnd;
      }
    } else {
      const destination = definitions.get(referenceKey(label));
      if (destination !== undefined) emit(destination, index, label);
      index = end;
    }
  }
  for (const match of source.matchAll(/<\w+\b[^>]*?\b(?:src|href)\s*=\s*["']([^"']+)["'][^>]*>/gi)) emit(match[1], match.index, match[0]);
  for (const match of source.matchAll(/<(https?:\/\/[^\s<>]+|mailto:[^\s<>]+)>/gi)) emit(match[1], match.index, match[1]);
  return result;
}

const apiSignature = props => JSON.stringify(props.map(prop => [prop.name, prop.type, prop.required, prop.defaultExpression]));
export function documentedApiRows(definition) {
  const seen = new Set([apiSignature(definition.props ?? [])]);
  const rows = (definition.props ?? []).map(prop => ({ ...prop, owner: '', key: prop.name }));
  for (const target of definition.targets ?? []) {
    if (!target.props?.length || seen.has(apiSignature(target.props))) continue;
    seen.add(apiSignature(target.props));
    rows.push(...target.props.map(prop => ({ ...prop, owner: target.name, key: `${target.name}.${prop.name}` })));
  }
  return rows;
}

async function exists(filename) {
  try { return await stat(filename); } catch (error) { if (error.code === 'ENOENT' || error.code === 'ENOTDIR') return null; throw error; }
}
async function walkMarkdown(root, base = root) {
  const files = [];
  for (const entry of await readdir(base, { withFileTypes: true })) {
    if (entry.isDirectory() && !runtimeFolders.has(entry.name)) files.push(...await walkMarkdown(root, path.join(base, entry.name)));
    else if (entry.isFile() && entry.name.endsWith('.md')) files.push(slash(path.relative(root, path.join(base, entry.name))));
  }
  return files.sort();
}
async function repositoryMarkdown(root) {
  const git = spawnSync('git', ['-C', root, 'ls-files', '-z', '--cached', '--others', '--exclude-standard', '*.md'], { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
  if (git.status === 0) {
    const files = [...new Set(git.stdout.split('\0').filter(Boolean))].sort();
    const present = await Promise.all(files.map(file => exists(path.join(root, file))));
    return files.filter((file, index) => present[index]?.isFile());
  }
  return walkMarkdown(root);
}

function templateText(markdown, mode) {
  return markdown.replaceAll('references/', mode === 'kit' ? 'example/docs/' : 'references/example/').replaceAll('assets/ui-kit/', mode === 'kit' ? '' : 'assets/ui-kit/');
}

function commandLines(markdown) {
  const lines = markdown.split('\n');
  const result = [];
  let fence, shell = false, directoryScope;
  for (let index = 0; index < lines.length; index++) {
    if (!fence) {
      if (/(?:在|相对)(?:整个)?(?:项目|包)(?:的)?根(?:目录)?/.test(lines[index])) directoryScope = 'root';
      else if (/(?:在示例目录|相对示例目录|在\s*`?example\/?`?\s*(?:目录|执行))/.test(lines[index])) directoryScope = 'example';
    }
    const marker = lines[index].match(/^\s{0,3}(`{3,}|~{3,})(\w*)/);
    if (marker && (!fence || (marker[1][0] === fence[0] && marker[1].length >= fence.length))) {
      if (fence) { fence = undefined; shell = false; }
      else { fence = marker[1]; shell = /^(?:bash|sh|shell|console|zsh)$/.test(marker[2]); }
      continue;
    }
    if (shell) result.push({ command: lines[index].trim().replace(/^\$\s+/, ''), line: index + 1, directoryScope });
    else if (!fence) for (const match of lines[index].matchAll(/`((?:node|npm|npx|python3?)\s+[^`]+)`/g)) result.push({ command: match[1], line: index + 1, directoryScope });
  }
  return result;
}

export async function auditDocumentation({ root, sourceRoot = root, mode = 'kit', generatedOnly = false } = {}) {
  if (!root) throw new Error('Documentation root is required.');
  if (!['kit', 'skill'].includes(mode)) throw new Error('mode must be kit or skill.');
  root = path.resolve(root);
  sourceRoot = path.resolve(sourceRoot);
  const docsPrefix = mode === 'kit' ? 'example/docs' : 'references/example';
  const examplePrefix = mode === 'kit' ? 'example' : 'assets/ui-kit/example';
  const failures = [];
  const fail = (file, code, message, line) => failures.push({ file, code, message, ...(line ? { line } : {}) });
  const texts = new Map();
  const json = async (base, relative, required = true) => {
    try { return JSON.parse(await readFile(path.join(base, relative), 'utf8')); }
    catch (error) { if (required || error.code !== 'ENOENT') fail(relative, 'json-source', error.message); return null; }
  };
  const canonical = target => mode === 'skill' ? target.replace(/^assets\/ui-kit\//, '').replace(/^references\/example(?:\/|$)/, 'example/docs/') : target;
  const isDocs = target => canonical(target).startsWith('example/docs/') || ['SKILL.md', 'AGENT_HANDOFF.md'].includes(canonical(target));
  const localFile = async target => {
    if (await exists(path.join(root, target))) return path.join(root, target);
    if (root !== sourceRoot && !isDocs(target) && await exists(path.join(sourceRoot, canonical(target)))) return path.join(sourceRoot, canonical(target));
    return null;
  };
  const textFor = async relative => {
    if (texts.has(relative)) return texts.get(relative);
    const filename = await localFile(relative);
    if (!filename) return null;
    const text = await readFile(filename, 'utf8');
    texts.set(relative, text);
    return text;
  };
  const manifestPath = `${docsPrefix}/generated-files.json`;
  const manifest = await json(root, manifestPath, false);
  const manifestFiles = Array.isArray(manifest?.files) ? manifest.files : [];
  const preservedFiles = Array.isArray(manifest?.preservedFiles) ? manifest.preservedFiles : [];
  let markdownFiles;
  if (manifest) {
    if (manifest.schemaVersion !== 1 || manifest.mode !== mode || !Array.isArray(manifest.files) || manifest.files.some(file => !safeRelative(file)) || new Set(manifest.files).size !== manifest.files.length) {
      fail(manifestPath, 'generation-manifest', 'Expected schemaVersion 1, matching mode and unique safe package-relative files.');
    }
    if (manifest.preservedFiles !== undefined && !Array.isArray(manifest.preservedFiles)) fail(manifestPath, 'generation-manifest', 'preservedFiles: expected an array.');
    for (const relative of manifestFiles) if (safeRelative(relative) && !(await exists(path.join(root, relative)))) fail(manifestPath, 'generated-file-missing', `files: ${relative} was declared but not generated.`);
    for (const preserved of preservedFiles) {
      if (!safeRelative(preserved.path) || !safeRelative(preserved.sourcePath) || !await exists(path.join(root, preserved.path)) || !await exists(path.join(sourceRoot, preserved.sourcePath))) fail(manifestPath, 'preserved-file-missing', `preservedFiles: ${JSON.stringify(preserved)} does not resolve to both output and source.`);
      if (mode !== 'kit' || preserved.path !== 'example/docs/business/motion-guide.md' || preserved.sourcePath !== preserved.path) fail(manifestPath, 'preserved-file-scope', `preservedFiles: only the authored kit business/motion-guide.md may be excluded from generated checks.`);
    }
    if (generatedOnly) {
      const declared = new Set(manifestFiles);
      const preserved = new Set(preservedFiles.map(entry => entry.path));
      for (const file of await walkMarkdown(root)) if (file.startsWith(`${docsPrefix}/`) && !declared.has(file) && !preserved.has(file)) fail(manifestPath, 'generated-file-undeclared', `files: generated Markdown ${file} is not declared.`);
    }
  }
  if (generatedOnly && manifest && Array.isArray(manifest.files)) markdownFiles = manifestFiles.filter(file => safeRelative(file) && file.endsWith('.md')).sort();
  else markdownFiles = await repositoryMarkdown(root);
  if (!markdownFiles.length) fail(docsPrefix, 'markdown-empty', 'No Markdown files were found to audit.');
  const metadata = await json(sourceRoot, 'example/catalog/use-categories.json');
  let directory;
  if (metadata) {
    try { directory = createComponentDirectory(metadata); }
    catch (error) { fail('example/catalog/use-categories.json', 'category-source', error.message); }
  }
  const upstream = await json(sourceRoot, 'example/catalog/upstream-manifest.json');
  const business = await json(sourceRoot, 'example/catalog/business-catalog.json');
  const api = await json(sourceRoot, 'example/catalog/parameter-api.json');
  const assetLock = await json(sourceRoot, 'example/catalog/asset-lock.json', false);
  const packageManifest = await json(sourceRoot, 'example/package.json');
  const packageLock = await json(sourceRoot, 'example/package-lock.json', false);
  if (directory && upstream?.components && business?.components) {
    try { validateDirectorySources(directory, upstream.components, business.components); }
    catch (error) { fail('example/catalog/use-categories.json', 'category-ownership', error.message); }
    for (const [file, source] of [['upstream-manifest', upstream], ['business-catalog', business]]) if (source.total !== source.components.length) fail(`example/catalog/${file}.json`, 'source-total', `total ${source.total} differs from ${source.components.length} identities.`);
  }
  const conditionalPaths = new Set();
  for (const component of upstream?.components ?? []) for (const file of component.files ?? []) conditionalPaths.add(`example/.upstream/${file.path}`);
  for (const file of assetLock?.files ?? []) if (file.destination) conditionalPaths.add(`example/${file.destination}`);
  const nativeReferences = new Set();
  const sourceDependencyNames = new Set(Object.keys({ ...packageManifest?.dependencies, ...packageManifest?.devDependencies }));
  for (const key of Object.keys(packageLock?.packages ?? {})) {
    const dependency = key.match(/^node_modules\/((?:@[^/]+\/)?[^/]+)$/)?.[1];
    if (dependency) sourceDependencyNames.add(dependency);
  }
  for (const component of Object.values(api?.components ?? {})) {
    for (const item of [...(component.inherited ?? []), ...(component.targets ?? []).flatMap(target => target.inherited ?? [])]) {
      if (item.reference?.startsWith('node_modules/')) nativeReferences.add(`example/${item.reference.split('#')[0]}`);
    }
  }
  let linkCount = 0, conditionalLinkCount = 0, commandCount = 0;
  async function checkLink(file, link, virtualFile = file) {
    linkCount++;
    const { destination, context, line } = link;
    if (link.missingReference) { fail(file, 'link-reference', `Undefined link reference: ${destination}`, line); return; }
    if (!destination) return;
    if (destination.includes('gpu-preview-fixes.md')) { fail(file, 'deleted-document-link', `Removed document is still referenced: ${destination}`, line); return; }
    if (/^[a-z][a-z\d+.-]*:/i.test(destination) || destination.startsWith('//')) {
      try {
        const url = new URL(destination.startsWith('//') ? `https:${destination}` : destination);
        if (!['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol) || (['http:', 'https:'].includes(url.protocol) && !url.hostname)) throw new Error('Unsupported or malformed URL');
      } catch { fail(file, 'external-url-format', `Invalid external URL: ${destination}`, line); }
      return;
    }
    let cleanPath, fragment;
    const hash = destination.indexOf('#');
    try {
      cleanPath = decodeURIComponent((hash < 0 ? destination : destination.slice(0, hash)).split('?')[0]);
      fragment = hash < 0 ? '' : decodeURIComponent(destination.slice(hash + 1));
    }
    catch { fail(file, 'link-format', `Invalid percent encoding: ${destination}`, line); return; }
    const target = cleanPath ? path.posix.normalize(cleanPath.startsWith('/') ? cleanPath.slice(1) : path.posix.join(path.posix.dirname(virtualFile), cleanPath)) : virtualFile;
    if (target === '..' || target.startsWith('../')) { fail(file, 'link-outside-package', `Link leaves the package: ${destination}`, line); return; }
    const sourceTarget = canonical(target);
    const conditional = /^(?:example\/(?:\.upstream|node_modules|public)\/)/.test(sourceTarget);
    const actual = await localFile(target);
    if (conditional) {
      const dependency = sourceTarget.match(/^example\/node_modules\/((?:@[^/]+\/)?[^/]+)/)?.[1];
      const declared = dependency ? sourceDependencyNames.has(dependency) && (nativeReferences.has(sourceTarget) || Boolean(actual)) : conditionalPaths.has(sourceTarget);
      if (!declared) { fail(file, 'conditional-resource-unknown', `Installed resource is absent from the pinned manifest or declared dependencies: ${target}`, line); return; }
      if (!/(?:准备后|安装后|setup\s*后|依赖安装|安装依赖|安装[^|。\n]*存在)/.test(context)) { fail(file, 'conditional-resource-label', `Mark this installed resource as conditional: ${target}`, line); return; }
      conditionalLinkCount++;
      if (!actual) return;
    } else if (!actual) { fail(file, 'link-missing', `Target does not exist: ${target}`, line); return; }
    if (fragment && /\.md$/i.test(target)) {
      const targetText = await textFor(target);
      if (targetText !== null && !markdownAnchors(targetText).has(fragment)) fail(file, 'anchor-missing', `No heading or explicit anchor '${fragment}' in ${target}`, line);
    }
  }
  async function checkCommands(file, markdown, templateMode) {
    let commandDirectory;
    for (const item of commandLines(markdown)) {
      const tokens = item.command.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g)?.map(token => token.replace(/^(["'])(.*)\1$/, '$2')) ?? [];
      if (!tokens.length || tokens[0].startsWith('#')) continue;
      if (tokens[0] === 'cd' && tokens[1] && !/[<>]/.test(tokens[1])) { commandDirectory = slash(path.posix.normalize(tokens[1])); continue; }
      const prefix = templateMode === 'skill' ? 'assets/ui-kit/' : mode === 'skill' ? 'assets/ui-kit/' : '';
      const defaultScope = file.startsWith('example/') && !/^example\/(?:tooling|docs)\//.test(file) ? 'example' : 'root';
      const cwd = commandDirectory ?? ((item.directoryScope ?? defaultScope) === 'example' ? `${prefix}example` : '');
      let entry;
      if (['node', 'python', 'python3'].includes(tokens[0])) entry = tokens.slice(1).find(token => !token.startsWith('-') && /\.(?:mjs|cjs|js|ts|py)$/.test(token));
      if (entry && !/[<>]/.test(entry)) {
        commandCount++;
        const target = path.posix.normalize(path.posix.join(cwd, entry));
        // Markdown often mixes root-wrapper commands with example maintenance
        // commands without a shell cd. Verify the two real package entry scopes;
        // an explicit cd is strict and never gets a fallback.
        const candidates = commandDirectory ? [target] : [...new Set([target, entry, `${prefix}example/${entry}`])];
        const found = await Promise.all(candidates.map(candidate => localFile(candidate)));
        if (!found.some(Boolean)) fail(file, 'command-missing', `Command entry is missing from the documented package/example scopes: ${entry}`, item.line);
        const componentIndex = tokens.indexOf('--component');
        if (componentIndex >= 0 && directory && !/[<>]/.test(tokens[componentIndex + 1] ?? '') && !directory.byId.has(tokens[componentIndex + 1])) fail(file, 'command-component', `--component: unknown identity ${tokens[componentIndex + 1]}`, item.line);
      }
      if (tokens[0] === 'npm' && ['run', 'run-script'].includes(tokens[1])) {
        commandCount++;
        const script = tokens[2];
        // npm commands in maintenance prose refer to the example package; this
        // package has no root package.json and its README states that scope.
        const manifestFile = `${cwd || `${prefix}example`}/package.json`;
        const actual = await localFile(manifestFile);
        const manifestText = actual ? JSON.parse(await readFile(actual, 'utf8')) : null;
        if (!manifestText?.scripts?.[script]) fail(file, 'npm-script-missing', `scripts.${script}: no npm script in ${manifestFile}`, item.line);
      }
    }
  }
  for (const file of markdownFiles) {
    const markdown = await textFor(file);
    if (markdown === null) { fail(file, 'markdown-missing', 'Tracked or generated Markdown file is missing.'); continue; }
    if (/^example\/tooling\/progressive\/templates\/(?:SKILL|AGENT_HANDOFF)\.md$/.test(file)) {
      for (const targetMode of ['kit', 'skill']) {
        const mapped = templateText(markdown, targetMode);
        // Both template modes refer to the same audited output; convert the
        // virtual skill target to the current output mode after rendering.
        for (const link of extractMarkdownLinks(mapped)) {
          const destination = mode === targetMode ? link.destination : targetMode === 'skill' ? link.destination.replace(/^references\/example\//, 'example/docs/').replace(/^assets\/ui-kit\//, '') : link.destination.replace(/^example\/docs\//, 'references/example/').replace(/^(?!(?:references|scripts)\/)/, 'assets/ui-kit/');
          await checkLink(file, { ...link, destination }, path.posix.basename(file));
        }
        await checkCommands(file, templateText(markdown, mode), mode);
      }
    } else {
      for (const link of extractMarkdownLinks(markdown)) await checkLink(file, link);
      await checkCommands(file, markdown);
    }
  }
  if (!directory) return { failures, markdownCount: markdownFiles.length, componentCount: 0, linkCount, conditionalLinkCount, commandCount };
  const indexPath = `${docsPrefix}/component-index.json`;
  const index = await json(root, indexPath);
  const expectedCounts = Object.fromEntries(directory.categories.map(category => [category.id, directory.components.filter(component => component.category === category.id).length]));
  const indexComponents = new Map();
  for (const entry of index?.components ?? []) {
    if (indexComponents.has(entry.id)) fail(indexPath, 'index-duplicate', `components.${entry.id}: duplicate identity.`);
    indexComponents.set(entry.id, entry);
    const component = directory.byId.get(entry.id);
    if (!component) { fail(indexPath, 'index-unknown', `components.${entry.id}: identity is not in the source catalog.`); continue; }
    const expected = { name: component.name, category: component.category, categoryLabel: directory.categoryById.get(component.category).name, provider: component.provider === 'business' ? 'business' : 'effects', sourceCategory: component.sourceCategory, docPath: `${docsPrefix}/${component.provider === 'business' ? 'business/' : ''}components/${component.id}.md`, demoPath: `${examplePrefix}/${demoPathFor(directory, component.id)}`, propsPath: `${examplePrefix}/src/parameters/definitions/${component.id}.json` };
    for (const [field, value] of Object.entries(expected)) if (entry[field] !== value) fail(indexPath, 'index-field', `components.${entry.id}.${field}: expected ${JSON.stringify(value)}, received ${JSON.stringify(entry[field])}.`);
  }
  if (index) {
    const effectsTotal = directory.components.filter(component => component.provider === 'react-bits').length;
    const businessTotal = directory.components.filter(component => component.provider === 'business').length;
    if (index.total !== directory.total || indexComponents.size !== directory.total) fail(indexPath, 'index-total', `total: expected ${directory.total}, received ${index.total}; ${indexComponents.size} unique entries.`);
    if (index.businessTotal !== businessTotal) fail(indexPath, 'index-business-total', `businessTotal: expected ${businessTotal}, received ${index.businessTotal}.`);
    if (index.effectsTotal !== effectsTotal) fail(indexPath, 'index-effects-total', `effectsTotal: expected ${effectsTotal}, received ${index.effectsTotal}.`);
    for (const [provider, total] of [['effects', effectsTotal], ['business', businessTotal]]) {
      const actualCounts = index.providerCounts?.[provider];
      const subset = directory.components.filter(component => component.provider === (provider === 'business' ? 'business' : 'react-bits'));
      const expectedProviderCounts = Object.fromEntries(directory.categories.map(category => [category.id, subset.filter(component => component.category === category.id).length]));
      if (!actualCounts || typeof actualCounts !== 'object' || Array.isArray(actualCounts)) {
        fail(indexPath, 'index-provider-schema', `providerCounts.${provider}: expected a purpose-category count map.`);
        continue;
      }
      for (const [category, count] of Object.entries(expectedProviderCounts)) if (actualCounts[category] !== count) fail(indexPath, 'index-provider-count', `providerCounts.${provider}.${category}: expected ${count}, received ${JSON.stringify(actualCounts[category])}.`);
      for (const category of Object.keys(actualCounts)) if (!(category in expectedProviderCounts)) fail(indexPath, 'index-provider-category', `providerCounts.${provider}.${category}: unknown purpose category.`);
      const actualTotal = Object.values(actualCounts).filter(value => Number.isInteger(value) && value >= 0).reduce((sum, count) => sum + count, 0);
      if (actualTotal !== total) fail(indexPath, 'index-provider-total', `providerCounts.${provider}: category sum must be ${total}, received ${actualTotal}.`);
    }
    for (const provider of Object.keys(index.providerCounts ?? {})) if (!['effects', 'business'].includes(provider)) fail(indexPath, 'index-provider-unknown', `providerCounts.${provider}: unknown provider.`);
    for (const [category, count] of Object.entries(expectedCounts)) if (index.counts?.[category] !== count) fail(indexPath, 'index-category-count', `counts.${category}: expected ${count}, received ${index.counts?.[category]}.`);
    for (const category of Object.keys(index.counts ?? {})) if (!directory.categoryById.has(category)) fail(indexPath, 'index-category-unknown', `counts.${category}: unknown purpose category.`);
  }

  async function requiredText(file) {
    if (generatedOnly && manifest && !manifestFiles.includes(file)) fail(manifestPath, 'generated-required-undeclared', `files: required generated document ${file} is not declared.`);
    const text = await textFor(file);
    if (text === null) fail(file, 'required-document-missing', 'Required generated document is absent from the output.');
    return text;
  }
  const guideFiles = new Set();
  for (const component of directory.components) {
    const guide = `${docsPrefix}/${component.provider === 'business' ? 'business/' : ''}components/${component.id}.md`;
    guideFiles.add(guide);
    const markdown = await requiredText(guide);
    if (!indexComponents.has(component.id)) fail(indexPath, 'index-component-missing', `components.${component.id}: source identity is missing.`);
    if (markdown === null) continue;
    const heading = markdown.match(/^#\s+(.+)$/m)?.[1]?.trim();
    if (heading !== component.name) fail(guide, 'guide-name', `name: expected ${component.name}, received ${heading}.`);
    if (!markdown.includes(`${directory.categoryById.get(component.category).name} · \`${component.id}\``)) fail(guide, 'guide-category', `category/id: expected ${component.category} · ${component.id}.`);
    const definitionFile = `example/src/parameters/definitions/${component.id}.json`;
    const definition = await json(sourceRoot, definitionFile);
    const sourceApi = api?.components?.[component.id];
    if (!definition || !sourceApi) { if (!sourceApi) fail('example/catalog/parameter-api.json', 'api-component-missing', `components.${component.id}: actual API is missing.`); continue; }
    if (definition.id !== component.id || sourceApi.id !== component.id) fail(definitionFile, 'api-identity', `id: expected ${component.id}.`);
    if (definition.apiScope !== sourceApi.apiScope) fail(definitionFile, 'api-scope', `apiScope differs from actual API: ${definition.apiScope}/${sourceApi.apiScope}.`);
    if (definition.sourcePath !== sourceApi.sourcePath) fail(definitionFile, 'api-source-path', `sourcePath differs from actual API: ${definition.sourcePath}/${sourceApi.sourcePath}.`);
    const indexEntry = indexComponents.get(component.id);
    const sourceEntry = component.provider === 'business' ? `${examplePrefix}/${demoPathFor(directory, component.id)}` : `${examplePrefix}/${sourceApi.sourcePath}`;
    if (indexEntry?.sourcePath !== sourceEntry) fail(indexPath, 'index-source-path', `components.${component.id}.sourcePath: expected ${sourceEntry}, received ${indexEntry?.sourcePath}.`);
    const guideTargets = new Set(extractMarkdownLinks(markdown).filter(link => !/^[a-z][a-z\d+.-]*:/i.test(link.destination)).map(link => path.posix.normalize(path.posix.join(path.posix.dirname(guide), link.destination.split('#')[0]))));
    const ownedResources = [['demo', `${examplePrefix}/${demoPathFor(directory, component.id)}`]];
    if (component.provider === 'react-bits') ownedResources.push(['definition', `${examplePrefix}/src/parameters/definitions/${component.id}.json`], ['source', sourceEntry]);
    for (const [field, target] of ownedResources) if (!guideTargets.has(target)) fail(guide, 'guide-resource-owner', `${field}: the guide must link its own ${target}.`);
    const compareProps = (defined, actual, owner) => {
      const actualByName = new Map((actual ?? []).map(prop => [prop.name, prop]));
      if (defined.length !== actualByName.size) fail(definitionFile, 'definition-api-count', `${owner || 'primary'}.props: ${defined.length}/${actualByName.size} actual fields.`);
      if (new Set(defined.map(prop => prop.name)).size !== defined.length) fail(definitionFile, 'definition-api-duplicate', `${owner || 'primary'}.props: duplicate names cannot replace another actual field.`);
      for (const prop of defined) for (const field of ['name', 'type', 'required', 'defaultExpression']) if (prop[field] !== actualByName.get(prop.name)?.[field]) fail(definitionFile, 'definition-api-field', `${owner ? `${owner}.` : ''}${prop.name}.${field}: differs from actual API.`);
    };
    compareProps(definition.props ?? [], sourceApi.props ?? [], '');
    for (const target of definition.targets ?? []) {
      const name = target.componentName ?? target.name.replace(/ · t\d+$/, '');
      const actual = (sourceApi.targets ?? []).find(item => (!target.sourcePath || item.sourcePath === target.sourcePath) && [item.name, item.componentName].includes(name));
      if (!actual) { fail(definitionFile, 'definition-api-owner', `targets.${target.name}: no matching actual native/leaf component.`); continue; }
      compareProps(target.props ?? [], actual.props ?? [], target.name);
    }
    if (sourceApi.apiScope === 'native-composition' && (!markdown.includes('本示例函数不接收额外公开 Props') || (definition.props?.length ?? 0))) fail(guide, 'native-composition-scope', 'Separate native composition and leaf API; the demo function has no public Props.');
    const table = parseMarkdownTables(markdown).find(table => table.header[0] === '参数' && table.header[1] === '类型');
    if (!table) { fail(guide, 'api-table-missing', 'Complete component API table is missing.'); continue; }
    if (table.header[3] !== '源码默认值') fail(guide, 'api-default-heading', `Default column must be 源码默认值, received ${table.header[3]}.`, table.line);
    const expected = new Map(documentedApiRows(definition).map(prop => [prop.key, prop]));
    const actual = new Map();
    for (const row of table.rows) {
      const cells = row.cells.map(plainCell);
      const key = cells[0];
      if (actual.has(key)) fail(guide, 'api-row-duplicate', `API ${key}: duplicate owner/name.`, row.line);
      actual.set(key, cells);
      const prop = expected.get(key);
      if (!prop) { fail(guide, 'api-row-unknown', `API ${key}: owner/name is absent from actual definitions.`, row.line); continue; }
      for (const [field, value, received] of [['type', prop.type, cells[1]], ['required', prop.required ? '是' : '否', cells[2]], ['default', String(prop.defaultExpression ?? '未指定'), cells[3]]]) if (value !== received) fail(guide, 'api-row-field', `API ${key}.${field}: expected ${JSON.stringify(value)}, received ${JSON.stringify(received)}.`, row.line);
    }
    for (const prop of expected.values()) if (!actual.has(prop.key)) fail(guide, 'api-row-missing', `API ${prop.key}: actual field is missing from the table.`);
  }
  for (const file of markdownFiles) if (new RegExp(`^${docsPrefix}/(?:business/)?components/[^/]+\\.md$`).test(file) && !guideFiles.has(file)) fail(file, 'guide-unknown', 'Component guide has no identity in the source catalog.');

  const views = [{ prefix: docsPrefix, components: directory.components }, { prefix: `${docsPrefix}/effects`, components: directory.components.filter(component => component.provider === 'react-bits') }, { prefix: `${docsPrefix}/business`, components: directory.components.filter(component => component.provider === 'business') }];
  for (const view of views) {
    const categories = directory.categories.filter(category => view.components.some(component => component.category === category.id));
    const routerFile = `${view.prefix}/task-router.md`;
    const router = await requiredText(routerFile);
    if (router !== null) {
      const count = router.match(/(?:本次清单|本目录包含|本视图包含|本页包含|本视图|能力范围)[：:]?\s*(\d+)\s*个/);
      if (!count || Number(count[1]) !== view.components.length) fail(routerFile, 'router-total', `total: expected ${view.components.length}, received ${count?.[1] ?? 'missing'}.`);
      const table = parseMarkdownTables(router).find(table => ['类别', '用途分类'].includes(table.header[0]) && ['组件数', '数量'].includes(table.header[1]));
      if (!table) fail(routerFile, 'router-table-missing', 'Purpose category/count table is missing.');
      else {
        const seen = new Set();
        for (const row of table.rows) {
          if (labelText(row.cells[0]) === '合计') continue;
          const link = extractMarkdownLinks(row.cells[0])[0];
          const categoryId = link?.destination.match(/(?:^|\/)categories\/([^/]+)\.md(?:#.*)?$/)?.[1];
          const category = categories.find(category => category.id === categoryId);
          if (!category) { fail(routerFile, 'router-category', `category: unknown or empty category ${categoryId ?? row.cells[0]}.`, row.line); continue; }
          if (seen.has(categoryId)) fail(routerFile, 'router-category-duplicate', `category ${categoryId}: repeated.`, row.line);
          seen.add(categoryId);
          const expectedCount = view.components.filter(component => component.category === categoryId).length;
          if (link.label !== category.name) fail(routerFile, 'router-category-name', `${categoryId}.name: expected ${category.name}, received ${link.label}.`, row.line);
          if (Number(labelText(row.cells[1])) !== expectedCount) fail(routerFile, 'router-category-count', `${categoryId}.count: expected ${expectedCount}, received ${row.cells[1]}.`, row.line);
          const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(routerFile), link.destination));
          if (resolved !== `${view.prefix}/categories/${categoryId}.md`) fail(routerFile, 'router-category-path', `${categoryId}.path: route points outside its view (${resolved}).`, row.line);
        }
        for (const category of categories) if (!seen.has(category.id)) fail(routerFile, 'router-category-missing', `${category.id}: required purpose category is absent.`);
      }
    }
    for (const category of categories) {
      const file = `${view.prefix}/categories/${category.id}.md`;
      const markdown = await requiredText(file);
      if (markdown === null) continue;
      if (markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() !== category.name) fail(file, 'category-name', `name: expected ${category.name}.`);
      const expected = new Set(view.components.filter(component => component.category === category.id).map(component => component.id));
      const count = markdown.match(/(\d+)\s*个组件/);
      if (!count || Number(count[1]) !== expected.size) fail(file, 'category-count', `count: expected ${expected.size}, received ${count?.[1] ?? 'missing'}.`);
      const table = parseMarkdownTables(markdown).find(table => table.header[0] === '组件');
      if (!table) { fail(file, 'category-table-missing', 'Component membership table is missing.'); continue; }
      const seen = new Set();
      for (const row of table.rows) {
        const link = extractMarkdownLinks(row.cells[0])[0];
        const id = link?.destination.match(/(?:^|\/)components\/([^/]+)\.md(?:#.*)?$/)?.[1];
        if (!id || !expected.has(id)) { fail(file, 'category-component', `component ${id ?? row.cells[0]}: does not belong to ${category.id} in this view.`, row.line); continue; }
        if (seen.has(id)) fail(file, 'category-component-duplicate', `component ${id}: occurs more than once in this view.`, row.line);
        seen.add(id);
        const component = directory.byId.get(id);
        if (link.label !== component.name) fail(file, 'category-component-name', `${id}.name: expected ${component.name}, received ${link.label}.`, row.line);
        const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(file), link.destination));
        const expectedPath = `${docsPrefix}/${component.provider === 'business' ? 'business/' : ''}components/${id}.md`;
        if (resolved !== expectedPath) fail(file, 'category-component-path', `${id}.guide: expected ${expectedPath}, received ${resolved}.`, row.line);
      }
      for (const id of expected) if (!seen.has(id)) fail(file, 'category-component-missing', `${id}: component is absent from its purpose category.`);
    }
  }
  for (const file of markdownFiles) {
    const categoryMatch = file.match(new RegExp(`^${docsPrefix}/(business/|effects/)?categories/([^/]+)\\.md$`));
    if (!categoryMatch || directory.categoryById.has(categoryMatch[2])) continue;
    const legacy = categoryMatch[1] === 'business/' ? oldBusiness : categoryMatch[1] ? new Set() : oldSources;
    const markdown = await textFor(file);
    if (!legacy.has(categoryMatch[2]) || !markdown?.includes('<!-- generated-category-migration -->') || parseMarkdownTables(markdown).some(table => table.header[0] === '组件')) fail(file, 'legacy-category-stub', 'An obsolete source/family category must be an explicit migration stub without a component table.');
  }
  // Handwritten overview tables are part of the same taxonomy contract. Do not
  // inspect prose mentioning normative contracts as runtime component records.
  for (const file of markdownFiles.filter(file => !file.endsWith('/task-router.md') && !file.includes('/tooling/progressive/templates/'))) {
    const markdown = await textFor(file);
    if (markdown === null) continue;
    for (const table of parseMarkdownTables(markdown).filter(table => ['类别', '用途分类'].includes(table.header[0]) && ['数量', '组件数'].includes(table.header[1]))) {
      let total = 0;
      for (const row of table.rows) {
        if (labelText(row.cells[0]) === '合计') {
          if (Number(labelText(row.cells[1])) !== total) fail(file, 'overview-total', `category total: expected ${total}, received ${row.cells[1]}.`, row.line);
          continue;
        }
        const link = extractMarkdownLinks(row.cells[0])[0];
        if (!link) { fail(file, 'overview-category', `Purpose category row has no linked identity: ${row.cells[0]}.`, row.line); continue; }
        const target = path.posix.normalize(path.posix.join(path.posix.dirname(file), link.destination));
        const match = target.match(new RegExp(`^${docsPrefix}/(business/|effects/)?categories/([^/]+)\\.md$`));
        const category = match && directory.categoryById.get(match[2]);
        if (!category) { fail(file, 'overview-category', `Unknown purpose category: ${target}.`, row.line); continue; }
        const subset = directory.components.filter(component => !match[1] || component.provider === (match[1] === 'business/' ? 'business' : 'react-bits'));
        const count = subset.filter(component => component.category === category.id).length;
        total += count;
        if (link.label !== category.name) fail(file, 'overview-category-name', `${category.id}.name: expected ${category.name}, received ${link.label}.`, row.line);
        if (Number(labelText(row.cells[1])) !== count) fail(file, 'overview-category-count', `${category.id}.count: expected ${count}, received ${row.cells[1]}.`, row.line);
      }
    }
  }
  const skill = await requiredText('SKILL.md');
  if (skill !== null) {
    const links = extractMarkdownLinks(skill);
    for (const target of [`${docsPrefix}/design-core.md`, `${docsPrefix}/business/task-router.md`, `${docsPrefix}/effects/task-router.md`]) if (!links.some(link => path.posix.normalize(link.destination) === target)) fail('SKILL.md', 'skill-progressive-entry', `Required progressive entry is missing: ${target}.`);
    if (links.filter(link => /\/components\/[^/]+\.md$/.test(link.destination)).length > 3) fail('SKILL.md', 'skill-eager-component-list', 'The skill entry must route to selected guides; more than three direct component guides are linked.');
  }
  return { failures, markdownCount: markdownFiles.length, componentCount: directory.total, linkCount, conditionalLinkCount, commandCount };
}
