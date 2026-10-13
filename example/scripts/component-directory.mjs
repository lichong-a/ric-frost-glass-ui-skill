import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const useCategoriesPath = 'catalog/use-categories.json';
const safeId = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
const providers = new Set(['react-bits', 'business']);

// A single authored assignment joins frozen identities with their user-facing
// purpose. Providers and original categories remain searchable source metadata.
export function createComponentDirectory(metadata) {
  if (metadata?.schemaVersion !== 1 || !Array.isArray(metadata.categories) || !Array.isArray(metadata.components)) {
    throw new Error('Invalid functional component directory schema.');
  }
  const categoryById = new Map();
  for (const category of metadata.categories) {
    if (!safeId.test(category.id) || !category.name?.trim() || categoryById.has(category.id)) {
      throw new Error(`Invalid or duplicate functional category: ${category.id}`);
    }
    categoryById.set(category.id, category);
  }
  const byId = new Map();
  for (const component of metadata.components) {
    if (!safeId.test(component.id) || byId.has(component.id)) throw new Error(`Invalid or duplicate component identity: ${component.id}`);
    if (!categoryById.has(component.category)) throw new Error(`Unknown functional category for ${component.id}: ${component.category}`);
    if (!providers.has(component.provider)) throw new Error(`Unknown provider for ${component.id}: ${component.provider}`);
    if (!component.name?.trim() || !component.sourceName?.trim() || !component.sourceCategory?.trim()) throw new Error(`Incomplete source metadata for ${component.id}`);
    if (!Array.isArray(component.tags) || component.tags.some(tag => typeof tag !== 'string' || !tag.trim()) || !component.tags.includes(component.sourceCategory) || !component.tags.includes(component.provider)) {
      throw new Error(`Missing searchable source tags for ${component.id}`);
    }
    byId.set(component.id, component);
  }
  if (metadata.total !== byId.size) throw new Error(`Functional directory total mismatch: total=${metadata.total}; unique=${byId.size}`);
  return { categories: metadata.categories, components: metadata.components, total: metadata.total, byId, categoryById };
}

export async function loadComponentDirectory(exampleRoot) {
  const root = exampleRoot instanceof URL ? fileURLToPath(exampleRoot) : exampleRoot;
  return createComponentDirectory(JSON.parse(await readFile(path.join(root, useCategoriesPath), 'utf8')));
}

export function componentMetadataFor(directory, id) {
  const component = directory.byId.get(id);
  if (!component) throw new Error(`Missing functional category assignment: ${id}`);
  return component;
}

export function demoPathFor(directory, id) {
  const component = componentMetadataFor(directory, id);
  const base = component.provider === 'business' ? 'src/business/demos' : 'src/demos';
  return `${base}/${component.category}/${component.id}.tsx`;
}

export function categoryCountsFor(directory, ids = directory.components.map(component => component.id)) {
  const counts = new Map(directory.categories.map(category => [category.id, 0]));
  const seen = new Set();
  for (const id of ids) {
    if (seen.has(id)) throw new Error(`Duplicate category count identity: ${id}`);
    seen.add(id);
    const component = componentMetadataFor(directory, id);
    counts.set(component.category, counts.get(component.category) + 1);
  }
  return directory.categories.map(category => ({ ...category, count: counts.get(category.id) }));
}

// Keep the frozen provider contracts independent of the functional taxonomy.
// A classification edit must not introduce, lose or reassign a source identity.
export function validateDirectorySources(directory, effects, business) {
  const sources = [
    ...effects.map(component => ({ id: component.slug, sourceName: component.name, sourceCategory: component.category, provider: 'react-bits' })),
    ...business.map(component => ({ id: component.id, sourceName: component.sourceName ?? component.name.replace(/ · 基础轮播$/, ''), sourceCategory: component.sourceCategory ?? `business-${component.family}`, provider: 'business' })),
  ];
  const expected = new Map();
  for (const source of sources) {
    if (expected.has(source.id)) throw new Error(`Duplicate source component identity: ${source.id}`);
    expected.set(source.id, source);
    const assignment = componentMetadataFor(directory, source.id);
    for (const field of ['sourceName', 'sourceCategory', 'provider']) {
      if (assignment[field] !== source[field]) throw new Error(`Functional directory ${field} differs from its source: ${source.id}`);
    }
    if (assignment.name !== source.sourceName && !assignment.name.startsWith(`${source.sourceName} · `)) throw new Error(`Functional display name loses its source identity: ${source.id}`);
  }
  for (const id of directory.byId.keys()) if (!expected.has(id)) throw new Error(`Functional directory has an unknown source identity: ${id}`);
  if (directory.total !== sources.length) throw new Error(`Functional directory source total mismatch: ${directory.total}/${sources.length}`);
}

export function relativeModuleSpecifier(fromFile, targetFile) {
  const relative = path.posix.relative(path.posix.dirname(fromFile), targetFile.replace(/\.(?:tsx?|jsx?)$/, ''));
  return relative.startsWith('.') ? relative : `./${relative}`;
}

export function demoIdentityFromBuildSource(directory, source) {
  const normalized = source.replaceAll('\\', '/').replace(/^\.\//, '');
  const match = normalized.match(/^src\/(business\/)?demos\/(?:[^/]+\/)*([^/]+)\.tsx(\?raw)?$/);
  if (!match) return null;
  const id = match[2];
  const metadata = directory.byId.get(id);
  return {
    id, provider: match[1] ? 'business' : 'react-bits', kind: match[3] ? 'usage' : 'real',
    actualPath: normalized.replace(/\?raw$/, ''), expectedPath: metadata ? demoPathFor(directory, id) : null,
  };
}

const rootSharedNames = new Set([
  'preview-runtime', 'catalog', 'gallery-catalog', 'react', 'react-dom',
  'react-dom-client', 'client', 'jsx-runtime', 'scheduler',
  // These helpers carry metadata, validation and a React configuration context.
  // Parameter panels, definitions and implementations still load separately.
  'validation', 'usage', 'load', 'DemoConfig', 'DemoStatus', 'assets',
]);
export const isAllowedRootSharedName = name => rootSharedNames.has(name);

export async function recursiveFiles(directory, accepts = () => true) {
  // Lazy-load fs traversal; the taxonomy/count/path helpers above are pure.
  const { readdir } = await import('node:fs/promises');
  let children;
  try { children = await readdir(directory, { withFileTypes: true }); }
  catch (error) { if (error.code === 'ENOENT') return []; throw error; }
  const files = [];
  for (const child of children) {
    const filename = path.join(directory, child.name);
    if (child.isDirectory()) files.push(...await recursiveFiles(filename, accepts));
    else if (child.isFile() && accepts(filename)) files.push(filename);
  }
  return files.sort();
}
