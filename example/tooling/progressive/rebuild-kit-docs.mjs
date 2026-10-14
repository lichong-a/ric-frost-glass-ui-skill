#!/usr/bin/env node
// Generate a complete overlay, validate it without writing, then replace only
// files owned by the generated manifest. No build products or downloads needed.
import { access, mkdtemp, readFile, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { applyGeneratedOverlay, docsPrefixFor } from './scripts/generated-output.mjs';
import { checkParameterApi } from '../../scripts/extract-parameters.mjs';

const toolingRoot = path.dirname(fileURLToPath(import.meta.url));
const options = { mode: 'kit', 'kit-root': path.resolve(toolingRoot, '../../..') };
const args = process.argv.slice(2);
for (let index = 0; index < args.length; index++) {
  const key = args[index];
  if (['--help', '-h'].includes(key)) {
    console.log('Usage: node tooling/progressive/rebuild-kit-docs.mjs [--check] [--prune-generated] [--mode kit|skill] [--kit-root DIR] [--output-root DIR]');
    console.log('Builds effects + business, indices and routes in staging; fresh source API validation and the read-only docs checker must pass before manifest-managed files are applied. --check uses the same validations and leaves output untouched. Obsolete manifest-managed files require --prune-generated or migration stubs. Skill mode requires --output-root when applying.');
    process.exit(0);
  }
  if (['--check', '--prune-generated'].includes(key)) { options[key.slice(2)] = true; continue; }
  if (!['--mode', '--kit-root', '--output-root'].includes(key) || !args[index + 1] || args[index + 1].startsWith('--')) throw new Error(`Invalid documentation rebuild argument: ${key}`);
  options[key.slice(2)] = args[++index];
}
const docPrefix = docsPrefixFor(options.mode);
const kitRoot = path.resolve(options['kit-root']);
const exampleRoot = path.join(kitRoot, 'example');
if (options.mode === 'skill' && !options['output-root'] && !options.check) throw new Error('Skill mode requires --output-root DIR.');
const targetRoot = path.resolve(options['output-root'] || kitRoot);
if (options.mode === 'skill' && targetRoot === kitRoot && !options.check) throw new Error('A skill output root must be separate from the source kit.');

function run(script, parameters, failure) {
  const result = spawnSync(process.execPath, [script, ...parameters], { stdio: 'inherit', cwd: exampleRoot });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${failure} (exit ${result.status ?? result.signal}). Existing docs were not replaced.`);
}
const staging = await mkdtemp(path.join(tmpdir(), 'agent-ric-progressive-'));
try {
  const parameters = [
    '--catalog', path.join(exampleRoot, 'catalog/upstream-manifest.json'),
    '--kit-root', kitRoot, '--output-root', staging, '--mode', options.mode,
  ];
  const previewCatalog = path.join(exampleRoot, 'src/catalog.ts');
  try { await access(previewCatalog); parameters.push('--preview-catalog', previewCatalog); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  run(path.join(toolingRoot, 'scripts/build-progressive.mjs'), parameters, 'Documentation generation failed');
  const validate = async () => {
    // Recompute against actual source first. Comparing two cached catalogs can
    // otherwise accept mutually stale API, definitions and generated guides.
    await checkParameterApi({ root: exampleRoot });
    run(path.join(exampleRoot, 'scripts/check-docs.mjs'), [
      '--root', staging, '--source-root', kitRoot, '--mode', options.mode, '--generated-only',
    ], 'Documentation validation failed');
  };
  if (options.check) await validate();
  else await applyGeneratedOverlay({ stagingRoot: staging, targetRoot, mode: options.mode, validate, pruneGenerated: Boolean(options['prune-generated']) });
  const index = JSON.parse(await readFile(path.join(staging, docPrefix, 'component-index.json'), 'utf8'));
  console.log(`${options.check ? 'Validated staging for' : 'Rebuilt'} ${index.total} component guides: ${index.effectsTotal} effects and ${index.businessTotal} business components, with purpose routes and the lookup script.`);
  console.log('Documentation checks do not render components; setup, build and actual UI checks remain separate.');
} finally {
  await rm(staging, { recursive: true, force: true });
}
