import { lstat, mkdir, readFile, rename, unlink, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';

export function docsPrefixFor(mode) {
  if (!['kit', 'skill'].includes(mode)) throw new Error('Documentation mode must be kit or skill.');
  return mode === 'kit' ? 'example/docs' : 'references/example';
}
export const generatedManifestPath = mode => `${docsPrefixFor(mode)}/generated-files.json`;
export function safeOutputPath(root, relative) {
  if (!relative || relative.startsWith('/') || relative.includes('\\') || relative.split('/').some(part => !part || part === '.' || part === '..')) throw new Error(`Unsafe generated output path: ${relative}`);
  const target = path.resolve(root, relative);
  if (!target.startsWith(path.resolve(root) + path.sep)) throw new Error(`Generated output path is outside its root: ${relative}`);
  return target;
}

// The manifest contains only files this generator owns. Authored inputs may be
// staged for link validation, but applying an overlay never rewrites them.
export function createGeneratedWriter(root, mode) {
  const files = new Set();
  const preservedFiles = new Map();
  async function output(relative, body) {
    const target = safeOutputPath(root, relative);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, body.endsWith('\n') ? body : `${body}\n`, 'utf8');
  }
  return {
    async write(relative, body) { await output(relative, body); files.add(relative); },
    async preserve(relative, body, sourcePath = relative) {
      safeOutputPath(root, sourcePath);
      await output(relative, body);
      preservedFiles.set(relative, { path: relative, sourcePath });
    },
    async finish() {
      const filename = generatedManifestPath(mode);
      files.add(filename);
      const manifest = { schemaVersion: 1, mode, files: [...files].sort(), preservedFiles: [...preservedFiles.values()].sort((a, b) => a.path.localeCompare(b.path)) };
      await output(filename, JSON.stringify(manifest, null, 2));
      return manifest;
    },
  };
}

export async function readGeneratedManifest(root, mode) {
  const manifest = JSON.parse(await readFile(safeOutputPath(root, generatedManifestPath(mode)), 'utf8'));
  if (manifest.schemaVersion !== 1 || manifest.mode !== mode || !Array.isArray(manifest.files) || new Set(manifest.files).size !== manifest.files.length || !manifest.files.includes(generatedManifestPath(mode))) throw new Error('Invalid generated documentation manifest.');
  const prefix = `${docsPrefixFor(mode)}/`;
  const entries = new Set(['SKILL.md', mode === 'kit' ? 'AGENT_HANDOFF.md' : 'assets/ui-kit/AGENT_HANDOFF.md', mode === 'kit' ? 'example/scripts/find-component.mjs' : 'scripts/find-component.mjs']);
  for (const file of manifest.files) {
    safeOutputPath(root, file);
    if (!file.startsWith(prefix) && !entries.has(file)) throw new Error(`Manifest contains an unmanaged path outside generated docs: ${file}`);
  }
  return manifest;
}

async function safeExistingTarget(root, relative) {
  const filename = safeOutputPath(root, relative);
  const parts = relative.split('/');
  let current = path.resolve(root);
  for (const [index, part] of parts.entries()) {
    current = path.join(current, part);
    try {
      const stat = await lstat(current);
      if (stat.isSymbolicLink() || (index < parts.length - 1 ? !stat.isDirectory() : !stat.isFile())) throw new Error(`Generated destination is not a regular path: ${relative}`);
    } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  return filename;
}
async function optionalRead(filename) {
  try { return await readFile(filename); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}
async function replaceFile(filename, body) {
  await mkdir(path.dirname(filename), { recursive: true });
  const temporary = `${filename}.agent-wan-${randomUUID()}.tmp`;
  try {
    await writeFile(temporary, body, { flag: 'wx' });
    await rename(temporary, filename);
  } finally {
    try { await unlink(temporary); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
}

// Preflight every generated file and obsolete path before mutating the target.
// Per-file renames avoid truncated documents; a failed apply restores the
// captured target contents. Directory entries outside the manifest are kept.
export async function applyGeneratedOverlay({ stagingRoot, targetRoot, mode, validate, pruneGenerated = false }) {
  if (path.resolve(stagingRoot) === path.resolve(targetRoot)) throw new Error('Staging must be separate from the destination.');
  if (typeof validate !== 'function') throw new Error('A read-only staging validator is required before applying generated docs.');
  const manifest = await readGeneratedManifest(stagingRoot, mode);
  await validate();
  let previous;
  try { previous = await readGeneratedManifest(targetRoot, mode); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  const nextFiles = new Set(manifest.files);
  const preserved = new Set((manifest.preservedFiles ?? []).map(file => file.path));
  if ([...preserved].some(file => nextFiles.has(file))) throw new Error('A preserved authored file cannot be managed as generated.');
  const obsolete = (previous?.files ?? []).filter(file => !nextFiles.has(file) && !preserved.has(file));
  if (obsolete.length && !pruneGenerated) throw new Error(`Obsolete generated files require --prune-generated or migration stubs: ${obsolete.join(', ')}`);
  const contents = new Map();
  for (const file of manifest.files) contents.set(file, await readFile(await safeExistingTarget(stagingRoot, file)));
  const snapshots = new Map();
  for (const file of [...manifest.files, ...obsolete]) snapshots.set(file, await optionalRead(await safeExistingTarget(targetRoot, file)));
  const changed = [];
  const manifestPath = generatedManifestPath(mode);
  const writeOrder = [...manifest.files.filter(file => file !== manifestPath), manifestPath];
  try {
    for (const file of writeOrder) {
      const body = contents.get(file);
      if (snapshots.get(file)?.equals(body)) continue;
      await replaceFile(safeOutputPath(targetRoot, file), body);
      changed.push(file);
    }
    for (const file of obsolete) {
      if (snapshots.get(file) === null) continue;
      await unlink(safeOutputPath(targetRoot, file));
      changed.push(file);
    }
  } catch (error) {
    const failures = [];
    for (const file of changed.reverse()) {
      try {
        const previousBody = snapshots.get(file);
        if (previousBody === null) await unlink(safeOutputPath(targetRoot, file));
        else await replaceFile(safeOutputPath(targetRoot, file), previousBody);
      } catch (restoreError) { failures.push(restoreError); }
    }
    if (failures.length) throw new AggregateError([error, ...failures], 'Documentation apply failed and restoration was incomplete.');
    throw error;
  }
  return { files: manifest.files.length, obsoleteFilesRemoved: obsolete };
}
