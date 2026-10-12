#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { loadTokenModel } from '../../../scripts/build-tokens.mjs';
const root = new URL('../', import.meta.url);
const catalog = JSON.parse(await readFile(new URL('catalog/upstream-manifest.json', root), 'utf8'));
const descriptions = JSON.parse(await readFile(new URL('catalog/intent-metadata.json', root), 'utf8'));
const previewHeights = {
  'paper-crumple':720, shredder:720, 'flip-card':640, 'folder-float':640,
  'glide-select':640, 'prompt-bar':640, 'refine-frame':640,
  'profile-card':680, 'magic-bento':660, 'card-swap':640,
};
const entries = catalog.components.map(item => ({
  id:item.slug, name:item.name, category:item.category, exportName:item.id,
  description:descriptions[item.slug]?.effectContract ?? item.name,
  aliases:descriptions[item.slug]?.aliases ?? [],
  dependencies:item.dependencies, docsUrl:item.docsUrl,
  sourcePath:`.upstream/${item.sourceRoot}/${item.id}.tsx`,
  demoPath:`src/demos/${item.slug}.tsx`,
  motion:['micro','components'].includes(item.category)?'interactive':'continuous',
  // GlassSurface auto-selects SVG/WebGL/CSS itself; a mandatory GPU gate would
  // incorrectly suppress its supported SVG/CSS paths.
  webgl:item.slug==='glass-surface'?'none':['shape-waves','aero-shards'].includes(item.slug)?'webgpu':item.capabilities.webGL?(item.slug==='paper-crumple'?'webgl2':'webgl'):'none',
  minHeight:previewHeights[item.slug] ?? 560,
}));
const categories = [
  ['text-animations', '文字动画'], ['animations', '动画效果'],
  ['components', '组合组件'], ['micro', '微交互'], ['backgrounds', '动态背景'],
].map(([id, name]) => ({ id, name, count: entries.filter(entry => entry.category === id).length }));
const code=`// Generated from the frozen official catalog and authored Chinese intent metadata.\nimport type { PreviewEntry } from './runtime/types';\nexport type CatalogEntry = PreviewEntry & { exportName:string; aliases:string[]; dependencies:string[]; docsUrl:string; demoPath:string; guidePath?:string; subtitle?:string };\nexport const entries: CatalogEntry[] = ${JSON.stringify(entries,null,2)};\nexport const categories = ${JSON.stringify(categories,null,2)};\n`;
await writeFile(new URL('src/catalog.ts',root),code);
await writeFile(new URL('src/demo-loaders.ts',root),`// Explicit lazy edges: one real demonstration module per index entry.\nimport type { DemoLoaders } from './runtime/types';\nexport const loaders: DemoLoaders = {\n${entries.map(c=>`  '${c.id}': () => import('./demos/${c.id}'),`).join('\n')}\n};\n`);
const model=await loadTokenModel();
const paths={primary:'palette.primary',ink:'palette.ink',ivory:'palette.ivory',sage:'palette.effectSage',sand:'palette.effectSand',terra:'palette.effectTerra',muted:'palette.muted',secondary:'palette.secondary',canvas:'palette.canvas',surface:'surface.control',white:'palette.ivory'};
const palette=Object.fromEntries(Object.entries(paths).map(([key,path])=>{if(!model.values.has(path))throw new Error(path);return[key,model.values.get(path)];}));
await writeFile(new URL('src/shared/palette.generated.ts',root),`// Generated from ../../../tokens.json; do not hand-edit.\nexport const palette = ${JSON.stringify(palette,null,2)} as const;\n`);
console.log(`Generated ${entries.length} explicit demo loaders and token-derived palette.`);
