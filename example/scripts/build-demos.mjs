import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { buildParameters, readCanonicalTemplates } from './build-parameters.mjs';
import { loadComponentDirectory, demoPathFor } from './component-directory.mjs';
import { rewriteRelativeImports } from './migrate-demo-directories.mjs';
import ts from 'typescript';
const root = new URL('../', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('catalog/upstream-manifest.json', root), 'utf8'));
const recipes = JSON.parse(await readFile(new URL('catalog/demo-recipes.json', root), 'utf8'));
const args = process.argv.slice(2);
if (args.length && (args.length !== 2 || args[0] !== '--component')) throw new Error('Usage: node scripts/build-demos.mjs [--component slug]');
const canonical = await readCanonicalTemplates(fileURLToPath(root));
if (Object.keys(canonical.templates).length) {
  const selectedIds = args.length ? [args[1]] : manifest.components.map(item => item.slug);
  for (const id of selectedIds) {
    if (!manifest.components.some(item => item.slug === id) || !canonical.templates[id]) throw new Error(`Missing canonical effect recipe: ${id}`);
    await buildParameters({ root: fileURLToPath(root), component: id });
  }
  console.log(`Regenerated ${selectedIds.length} canonical effect demos with preserved CSS Modules, restored defaults and parameter bindings.`);
  process.exit(0);
}
const directory = await loadComponentDirectory(root);
const selected = args.length ? recipes.filter(recipe => recipe.slug === args[1]) : recipes;
if (!selected.length) throw new Error(`No demonstration recipe: ${args[1]}`);
for (const recipe of selected) {
  const entry = manifest.components.find(item => item.slug === recipe.slug);
  if (!entry) throw new Error(`Unknown component ${recipe.slug}`);
  const names = new Set(['palette', 'MEDIA', 'LOGO', 'DemoPanel']);
  const imports = [];
  for (const line of recipe.extraImports ?? []) {
    const shared = line.match(/^import\s*\{([^}]+)\}\s*from\s*['"]\.\.\/shared\/demo-support['"]/);
    if (shared) shared[1].split(',').forEach(name => names.add(name.trim()));
    else imports.push(line);
  }
  const file = entry.files.find(file => file.path.endsWith(`/${entry.id}.tsx`));
  if (!file) throw new Error(`Missing main source ${entry.slug}`);
  const named = recipe.namedImports?.length ? `, { ${recipe.namedImports.join(', ')} }` : '';
  const sourceImport = `import Component${named} from '../../.upstream/${file.path.replace(/\.tsx$/, '')}';`;
  const code = recipe.renderCode || (recipe.childrenCode
    ? `<Component ${recipe.propsCode ?? ''}>${recipe.childrenCode}</Component>`
    : `<Component ${recipe.propsCode ?? ''} />`);
  const body = `${recipe.beforeCode ?? ''}\nreturn (<div${recipe.wrapperStyleCode ? ` style={${recipe.wrapperStyleCode}}` : ''}>${code}</div>);`;
  const source = ts.createSourceFile('demo.tsx', `function Demo() { ${body} }`, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const references = new Set();
  function visit(node) {
    if (ts.isIdentifier(node) && !(ts.isPropertyAccessExpression(node.parent) && node.parent.name === node) &&
        !(ts.isPropertyAssignment(node.parent) && node.parent.name === node)) references.add(node.text);
    ts.forEachChild(node, visit);
  }
  visit(source);
  const sharedNames = [...names].filter(name => references.has(name.split(/\s+as\s+/).at(-1))).sort();
  const sharedImport = sharedNames.length ? `import { ${sharedNames.join(', ')} } from '../shared/demo-support';\n` : '';
  const notes = (recipe.notes ?? []).map(line => `// ${line}`).join('\n');
  const result = `// Authored integration demo; implementation is installed from the pinned official source.\n${sourceImport}\n${sharedImport}${imports.join('\n')}\n${notes}\n\nexport default function ${entry.id}Demo() {\n  ${recipe.beforeCode ?? ''}\n  return (\n    <div className="aw-demo-stage"${recipe.wrapperStyleCode ? ` style={${recipe.wrapperStyleCode}}` : ''}>\n      ${code}\n    </div>\n  );\n}\n`;
  const target = demoPathFor(directory, entry.slug);
  const legacy = `src/demos/${entry.slug}.tsx`;
  const rewritten = rewriteRelativeImports(result, path.join(fileURLToPath(root), legacy), path.join(fileURLToPath(root), target)).code;
  await mkdir(path.dirname(path.join(fileURLToPath(root), target)), { recursive: true });
  await writeFile(new URL(target, root), rewritten);
}
console.log(`Generated ${selected.length} standalone integration demos.`);
