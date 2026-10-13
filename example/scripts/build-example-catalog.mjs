#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { buildBusinessCatalog } from './build-business-catalog.mjs';
import { loadTokenModel } from '../../scripts/build-tokens.mjs';
import { loadComponentDirectory, componentMetadataFor, demoPathFor, categoryCountsFor, relativeModuleSpecifier, validateDirectorySources } from './component-directory.mjs';
const root = new URL('../', import.meta.url);
const catalog = JSON.parse(await readFile(new URL('catalog/upstream-manifest.json', root), 'utf8'));
const business = JSON.parse(await readFile(new URL('catalog/business-catalog.json', root), 'utf8'));
const directory = await loadComponentDirectory(root);
validateDirectorySources(directory, catalog.components, business.components);
const descriptions = JSON.parse(await readFile(new URL('catalog/intent-metadata.json', root), 'utf8'));
const previewHeights = {
  'paper-crumple':720, shredder:720, 'flip-card':640, 'folder-float':640,
  'glide-select':640, 'prompt-bar':640, 'refine-frame':640,
  'profile-card':680, 'magic-bento':660, 'card-swap':640,
};
const entries = catalog.components.map(item => {
  const metadata = componentMetadataFor(directory, item.slug);
  return {
  id:item.slug, name:metadata.name, sourceName:metadata.sourceName,
  category:metadata.category, sourceCategory:metadata.sourceCategory, provider:metadata.provider, tags:metadata.tags, exportName:item.id,
  description:descriptions[item.slug]?.effectContract ?? item.name,
  aliases:descriptions[item.slug]?.aliases ?? [],
  dependencies:item.dependencies, docsUrl:'',
  sourcePath:`.upstream/${item.sourceRoot}/${item.id}.tsx`,
  demoPath:demoPathFor(directory, item.slug),
  motion:['micro','components'].includes(item.category)?'interactive':'continuous',
  // These demos own their graphics status. WebGPU starts by default; Canvas is opt-in.
  webgl:['glass-surface','shape-waves','aero-shards'].includes(item.slug)?'none':item.capabilities.webGL?(item.slug==='paper-crumple'?'webgl2':'webgl'):'none',
  ...(['shape-waves','aero-shards'].includes(item.slug) ? { statusMode:'demo' } : {}),
  minHeight:previewHeights[item.slug] ?? 560,
  };
});
const categories = categoryCountsFor(directory, entries.map(entry => entry.id));
const code=`// Generated from frozen identities, authored intent metadata and catalog/use-categories.json.\nimport type { PreviewEntry } from './runtime/types';\nexport type CatalogEntry = PreviewEntry & { sourceName:string; sourceCategory:string; provider:'react-bits'|'business'; tags:string[]; exportName:string; aliases:string[]; dependencies:string[]; docsUrl:string; demoPath:string; guidePath?:string; subtitle?:string };\nexport const entries: CatalogEntry[] = ${JSON.stringify(entries,null,2)};\nexport const categories = ${JSON.stringify(categories,null,2)};\n`;
await writeFile(new URL('src/catalog.ts',root),code);
await writeFile(new URL('src/demo-loaders.ts',root),`// Explicit lazy edges: one real demonstration module per index entry.\nimport type { DemoLoaders } from './runtime/types';\nexport const loaders: DemoLoaders = {\n${entries.map(c=>`  '${c.id}': () => import('${relativeModuleSpecifier('src/demo-loaders.ts', c.demoPath)}'),`).join('\n')}\n};\n`);
const model=await loadTokenModel();
const paths={primary:'palette.primary',ink:'palette.ink',ivory:'palette.ivory',sage:'palette.effectSage',sand:'palette.effectSand',terra:'palette.effectTerra',muted:'palette.muted',secondary:'palette.secondary',canvas:'palette.canvas',surface:'surface.control',white:'palette.ivory'};
const palette=Object.fromEntries(Object.entries(paths).map(([key,path])=>{if(!model.values.has(path))throw new Error(path);return[key,model.values.get(path)];}));
await writeFile(new URL('src/shared/palette.generated.ts',root),`// Generated from tokens.json at the UI package root; do not hand-edit.\nexport const palette = ${JSON.stringify(palette,null,2)} as const;\n`);
const businessCount = await buildBusinessCatalog(root);
console.log(`Generated ${entries.length + businessCount} explicit demo loaders and token-derived palette.`);
