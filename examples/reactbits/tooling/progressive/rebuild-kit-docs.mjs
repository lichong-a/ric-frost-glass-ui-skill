#!/usr/bin/env node
// Rebuild this package's progressive docs from its local frozen manifest,
// authored demos, generated preview catalog and parent UI specification.
import { cp, mkdtemp, readFile, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const toolingRoot = path.dirname(fileURLToPath(import.meta.url));
const exampleRoot = path.resolve(toolingRoot, '../..');
const kitRoot = path.resolve(exampleRoot, '../..');
const args = process.argv.slice(2);
if (args.length) {
  if (args.length === 1 && ['--help', '-h'].includes(args[0])) {
    console.log('Usage: node tooling/progressive/rebuild-kit-docs.mjs');
    console.log('Rebuilds docs/, scripts/find-component.mjs and ../../AGENT_HANDOFF.md using the files in this package. No work-directory paths or official source downloads are required.');
    process.exit(0);
  }
  throw new Error('This package-local entry takes no path arguments. For a custom skill output, use tooling/progressive/scripts/build-progressive.mjs --help.');
}
const staging = await mkdtemp(path.join(tmpdir(), 'agent-wan-progressive-'));
try {
  const result = spawnSync(process.execPath, [
    path.join(toolingRoot, 'scripts/build-progressive.mjs'),
    '--catalog', path.join(exampleRoot, 'catalog/upstream-manifest.json'),
    '--kit-root', kitRoot,
    '--output-root', staging,
    '--mode', 'kit',
    '--demos-root', path.join(exampleRoot, 'src/demos'),
    '--preview-catalog', path.join(exampleRoot, 'src/catalog.ts'),
  ], { stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Documentation generator exited with status ${result.status}. Existing docs were not replaced.`);
  await cp(path.join(staging, 'examples/reactbits/docs'), path.join(exampleRoot, 'docs'), { recursive: true });
  await cp(path.join(staging, 'examples/reactbits/scripts/find-component.mjs'), path.join(exampleRoot, 'scripts/find-component.mjs'));
  await cp(path.join(staging, 'AGENT_HANDOFF.md'), path.join(kitRoot, 'AGENT_HANDOFF.md'));
  await cp(path.join(staging, 'SKILL.md'), path.join(kitRoot, 'SKILL.md'));
  const business = spawnSync(process.execPath, [path.join(toolingRoot, 'scripts/build-business.mjs')], { stdio: 'inherit' });
  if (business.error) throw business.error;
  if (business.status !== 0) throw new Error(`Business catalog generation exited with ${business.status}.`);
  const index = JSON.parse(await readFile(path.join(exampleRoot, 'docs/component-index.json'), 'utf8'));
  console.log(`Rebuilt ${index.total} component documents, task routes and the package-local lookup script.`);
  console.log('Run npm run check:coverage to verify identities, imports and generated examples. This command does not render the components.');
} finally {
  await rm(staging, { recursive: true, force: true });
}
