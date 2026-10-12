#!/usr/bin/env node
import { readFile, mkdir, writeFile, rename } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';

const root = resolve(fileURLToPath(new URL('../', import.meta.url)));
const manifest = JSON.parse(await readFile(resolve(root, 'catalog/upstream-manifest.json'), 'utf8'));
const assets = JSON.parse(await readFile(resolve(root, 'catalog/asset-lock.json'), 'utf8'));
const args = process.argv.slice(2);
const get = key => args.includes(key) ? args[args.indexOf(key) + 1] : undefined;
const selected = get('--component');
const localSource = get('--local-source');
if (selected && !manifest.components.some(item => item.slug === selected)) throw new Error(`Unknown component: ${selected}`);
const components = selected ? manifest.components.filter(item => item.slug === selected) : manifest.components;
const allowed = new Set(['--component', '--local-source']);
for (let i=0; i<args.length; i+=2) if (!allowed.has(args[i]) || !args[i+1]) throw new Error('Usage: node scripts/example.mjs setup [--component slug] [--local-source checkout]');
const hash = data => createHash('sha256').update(data).digest('hex');
async function download(url) {
  const attempts = 3;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
      if (!response.ok) {
        await response.body?.cancel();
        const error = new Error(`${response.status}: ${url}`);
        error.retryable = [408, 425, 429].includes(response.status) || (response.status >= 500 && response.status < 600);
        throw error;
      }
      return Buffer.from(await response.arrayBuffer());
    } catch (error) {
      const retryable = error.retryable ?? ['TypeError', 'TimeoutError', 'AbortError'].includes(error.name);
      if (!retryable || attempt === attempts) throw error;
      console.warn(`Retry ${attempt}/${attempts - 1}: ${url} (${error.message})`);
      await delay(500 * 2 ** (attempt - 1) + Math.floor(Math.random() * 250));
    }
  }
}
function inside(relative) {
  const path = resolve(root, relative);
  if (!path.startsWith(root + sep) && path !== root) throw new Error(`Unsafe destination: ${relative}`);
  return path;
}
async function install(item) {
  const path = inside(item.destination);
  try { if (hash(await readFile(path)) === item.sha256) return; } catch {}
  let data;
  if (item.dependencyPath) {
    try { data = await readFile(inside(item.dependencyPath)); }
    catch { /* A single-component setup may run before npm ci; use its locked URL. */ }
  }
  if (data) {
    // Dependency bytes are still verified against the fixed asset hash below.
  } else if (localSource && item.upstreamPath) {
    data = await readFile(resolve(localSource, item.upstreamPath));
  } else {
    data = await download(item.url);
  }
  if (hash(data) !== item.sha256) throw new Error(`Hash mismatch: ${item.destination}. The locked source was not installed.`);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path + '.download', data);
  await rename(path + '.download', path);
}
const files = components.flatMap(component => component.files.map(file => ({
  ...file, upstreamPath: file.path, destination: `.upstream/${file.path}`,
  url: `https://raw.githubusercontent.com/DavidHDev/react-bits/${manifest.sources.commit}/${file.path}`,
})));
const extra = assets.files.filter(file => !selected || !file.components || file.components.includes(selected));
const jobs = [...files, ...extra];
let cursor = 0, finished = 0, processed = 0;
const errors = [];
console.log(`Preparing ${components.length} Agent Wan effect components at ${manifest.sources.commit.slice(0,12)}.`);
console.log('Prepared implementations remain in the local cache and are excluded from template archives. Resource declarations are kept in notices/.');
await Promise.all(Array.from({ length: 6 }, async () => {
  while (cursor < jobs.length) {
    const item = jobs[cursor++];
    try { await install(item); finished++; }
    catch (error) { errors.push({ file: item.destination, error: error.message }); }
    processed++;
    if (processed % 25 === 0 || processed === jobs.length) {
      console.log(`Progress: ${processed}/${jobs.length}; verified ${finished}; failed ${errors.length}.`);
    }
  }
}));
if (errors.length) {
  for (const failure of errors) console.error(`${failure.file}: ${failure.error}`);
  console.error(`${finished}/${jobs.length} files installed. Run the same command to resume; verified files are reused.`);
  process.exitCode = 1;
} else console.log(`Ready: ${components.length} components; ${finished} verified source/asset files.`);
