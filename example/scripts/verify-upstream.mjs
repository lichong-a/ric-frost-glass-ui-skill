#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const root = new URL('../', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('catalog/upstream-manifest.json', root), 'utf8'));
const assets = JSON.parse(await readFile(new URL('catalog/asset-lock.json', root), 'utf8'));
const missing = [];
const files = [...manifest.components.flatMap(c => c.files.map(f => ({...f, destination:'.upstream/'+f.path}))), ...assets.files];
for (const file of files) {
  try {
    const data = await readFile(new URL(file.destination, root));
    if (createHash('sha256').update(data).digest('hex') !== file.sha256) missing.push(file.destination+' (changed)');
  } catch { missing.push(file.destination); }
}
if (missing.length) {
  console.error(`${missing.length} source/asset files missing or changed. Run npm run setup:components first.`);
  console.error(missing.slice(0,8).join('\n'));
  process.exitCode=1;
} else console.log(`PASS ${manifest.total} components and ${files.length} locked source/asset files.`);
