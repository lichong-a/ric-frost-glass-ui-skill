#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { loadComponentDirectory, componentMetadataFor, demoPathFor, categoryCountsFor, relativeModuleSpecifier } from './component-directory.mjs';
export async function buildBusinessCatalog(root = fileURLToPath(new URL('../', import.meta.url))) {
  if (root instanceof URL) root = fileURLToPath(root);
  const manifest = JSON.parse(await readFile(path.join(root, 'catalog/business-catalog.json'), 'utf8'));
  const directory = await loadComponentDirectory(root);
  const entries = manifest.components.map(item => {
    const metadata = componentMetadataFor(directory, item.id);
    return {
      id: item.id, name: metadata.name, sourceName: metadata.sourceName,
      category: metadata.category, sourceCategory: metadata.sourceCategory,
      provider: metadata.provider, tags: metadata.tags, exportName: metadata.sourceName,
      description: item.description, subtitle: item.subtitle, aliases: item.aliases,
      dependencies: item.dependencies, docsUrl: '', sourcePath: demoPathFor(directory, item.id),
      demoPath: demoPathFor(directory, item.id), guidePath: item.guidePath,
      motion: item.motion, webgl: item.webgl, minHeight: item.minHeight,
    };
  });
  const categories = categoryCountsFor(directory, entries.map(entry => entry.id));
  await writeFile(path.join(root, 'src/business/catalog.generated.ts'), `// Generated from business identities and catalog/use-categories.json; metadata only.\nimport type { CatalogEntry } from '../catalog';\nexport const entries: CatalogEntry[] = ${JSON.stringify(entries, null, 2)};\nexport const categories = ${JSON.stringify(categories, null, 2)};\n`);
  await writeFile(path.join(root, 'src/business/demo-loaders.generated.ts'), `// One lazy edge per business capability.\nimport type { DemoLoaders } from '../runtime/types';\nexport const loaders: DemoLoaders = {\n${entries.map(entry => `  '${entry.id}': () => import('${relativeModuleSpecifier('src/business/demo-loaders.generated.ts', entry.demoPath)}'),`).join('\n')}\n};\n`);
  return entries.length;
}
if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  console.log(`Generated ${await buildBusinessCatalog()} business metadata entries and independent loaders.`);
}
