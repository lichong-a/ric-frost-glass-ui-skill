import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFile, lstat, mkdir, mkdtemp, readFile, readdir, readlink, rm, symlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { promisify } from 'node:util';
import { after, before, test } from 'node:test';

const workspaceRoot = fileURLToPath(new URL('../', import.meta.url));
const execute = promisify(execFile);
let directory;
let fixtureRoot;
let entry;
let originalCatalog;
let originalTemplates;

async function runNode(args) {
  try {
    const result = await execute(process.execPath, args, { timeout: 90_000, maxBuffer: 512 * 1024 });
    return { status: 0, output: `${result.stdout}${result.stderr}` };
  } catch (error) {
    if (typeof error.code !== 'number') throw error;
    return { status: error.code, output: `${error.stdout}${error.stderr}` };
  }
}

const runCli = (args = [], readOnly = false) => runNode([
  ...(readOnly ? ['--permission', '--allow-fs-read=*'] : []),
  entry,
  ...args,
]);
const prop = (catalog, id, name) => catalog.components[id].props.find(item => item.name === name);

async function fixtureSnapshot() {
  const records = [];
  async function visit(relativePath) {
    const filename = path.join(fixtureRoot, relativePath);
    const details = await lstat(filename, { bigint: true });
    const record = { path: relativePath, mode: String(details.mode), mtime: String(details.mtimeNs) };
    if (details.isSymbolicLink()) record.link = await readlink(filename);
    else if (details.isDirectory()) {
      record.directory = true;
      records.push(record);
      for (const name of (await readdir(filename)).sort()) await visit(path.join(relativePath, name));
      return;
    } else record.sha256 = createHash('sha256').update(await readFile(filename)).digest('hex');
    records.push(record);
  }
  await visit('');
  return records;
}

before(async () => {
  directory = await mkdtemp(path.join(os.tmpdir(), 'wan-api-source-check-'));
  fixtureRoot = path.join(directory, 'example');
  entry = path.join(fixtureRoot, 'scripts/extract-parameters.mjs');
  await mkdir(path.join(fixtureRoot, 'scripts/lib'), { recursive: true });
  await mkdir(path.join(fixtureRoot, 'catalog'));
  await copyFile(path.join(workspaceRoot, 'scripts/extract-parameters.mjs'), entry);
  await copyFile(path.join(workspaceRoot, 'scripts/lib/parameter-extraction.mjs'), path.join(fixtureRoot, 'scripts/lib/parameter-extraction.mjs'));
  // The extractor consumes the actual frozen/owned implementations and installed
  // types. Only input snapshots and the generated catalog are private to this test.
  for (const name of ['.upstream', 'src', 'node_modules']) await symlink(path.join(workspaceRoot, name), path.join(fixtureRoot, name), 'dir');
  for (const name of ['upstream-manifest.json', 'business-catalog.json', 'use-categories.json', 'demo-source-templates.json']) {
    await copyFile(path.join(workspaceRoot, 'catalog', name), path.join(fixtureRoot, 'catalog', name));
  }
  originalTemplates = await readFile(path.join(fixtureRoot, 'catalog/demo-source-templates.json'), 'utf8');
  const generated = await runCli();
  assert.equal(generated.status, 0, generated.output);
  originalCatalog = await readFile(path.join(fixtureRoot, 'catalog/parameter-api.json'), 'utf8');
});

after(async () => {
  if (directory) await rm(directory, { recursive: true });
});

test('default CLI generation still extracts all 303 real APIs and frozen defaults', () => {
  const catalog = JSON.parse(originalCatalog);
  assert.equal(catalog.coverage.components, 303);
  assert.equal(catalog.coverage.upstream, 215);
  assert.equal(catalog.coverage.business, 88);
  assert.equal(Object.keys(catalog.components).length, 303);
  assert.equal(prop(catalog, 'cubes', 'gap').type, 'number');
  assert.equal(prop(catalog, 'cubes', 'gap').defaultValue, 0.18);
  assert.equal(prop(catalog, 'glitch-text', 'children').type, 'string');
  assert.equal(prop(catalog, 'glitch-text', 'children').required, true);
  assert.deepEqual(prop(catalog, 'cubes', 'edgeStyle').options, ['solid', 'dashed', 'dotted', 'none']);
  assert.ok(catalog.components['business-datepicker'].targets.some(target => target.name === 'DatePicker'));
});

test('--check rejects incorrect type, required, default, union, inheritance, target, native and usage fields', async () => {
  const cached = JSON.parse(originalCatalog);
  prop(cached, 'cubes', 'gap').type = 'string';
  prop(cached, 'cubes', 'gap').defaultValue = 9.9;
  prop(cached, 'cubes', 'gap').defaultExpression = '9.9';
  prop(cached, 'cubes', 'edgeStyle').options[0] = 'incorrect-union-member';
  prop(cached, 'glitch-text', 'children').required = false;
  cached.components.cubes.inherited[0].type = 'HTMLAttributes<HTMLSpanElement>';
  const target = cached.components.cubes.targets.find(item => item.name === 'Component');
  target.sourcePath = '.upstream/incorrect-target.tsx';
  target.props.find(item => item.name === 'gap').codeExample = 'gap="incorrect"';
  const native = cached.components['business-inputtext'].nativeElements.find(item => item.tag === 'input');
  native.type = 'HTMLAttributes<HTMLDivElement>';
  native.observedProps.find(item => item.name === 'onChange').type = '() => never';
  await writeFile(path.join(fixtureRoot, 'catalog/parameter-api.json'), `${JSON.stringify(cached, null, 2)}\n`);
  const before = await fixtureSnapshot();
  try {
    const checked = await runCli(['--check']);
    assert.equal(checked.status, 1, checked.output);
    for (const diagnostic of [
      /cubes.*gap.*type/,
      /cubes.*gap.*defaultValue/,
      /cubes.*gap.*defaultExpression/,
      /cubes.*edgeStyle.*options/,
      /glitch-text.*children.*required/,
      /cubes.*inherited.*type/,
      /cubes.*targets.*Component.*sourcePath/,
      /cubes.*targets.*gap.*codeExample/,
      /business-inputtext.*nativeElements.*input.*type/,
      /business-inputtext.*onChange.*type/,
    ]) assert.match(checked.output, diagnostic);
    assert.match(checked.output, /source.*number/);
    assert.match(checked.output, /cached.*string/);
    assert.deepEqual(await fixtureSnapshot(), before, '--check must not change, create or remove any fixture file');
  } finally {
    await writeFile(path.join(fixtureRoot, 'catalog/parameter-api.json'), originalCatalog);
  }
});

test('--check succeeds with every filesystem write denied and leaves no output or report', async () => {
  const before = await fixtureSnapshot();
  const checked = await runCli(['--check'], true);
  assert.equal(checked.status, 0, checked.output);
  assert.match(checked.output, /303/);
  assert.doesNotMatch(checked.output, /ERR_ACCESS_DENIED/);
  assert.deepEqual(await fixtureSnapshot(), before);
});

test('--check recomputes canonical author-source usage rather than comparing generated caches', async () => {
  const templates = JSON.parse(originalTemplates);
  const cubes = templates.templates.cubes;
  assert.match(cubes.source, /gap=\{0\.18\}/);
  cubes.source = cubes.source.replace('gap={0.18}', 'gap={0.33}');
  cubes.sha256 = createHash('sha256').update(cubes.source).digest('hex');
  await writeFile(path.join(fixtureRoot, 'catalog/demo-source-templates.json'), `${JSON.stringify(templates, null, 2)}\n`);
  const before = await fixtureSnapshot();
  try {
    const checked = await runCli(['--check'], true);
    assert.equal(checked.status, 1, checked.output);
    assert.match(checked.output, /cubes.*gap.*(?:codeExample|usageExamples)/);
    assert.match(checked.output, /0\.33/);
    assert.match(checked.output, /0\.18/);
    assert.doesNotMatch(checked.output, /ERR_ACCESS_DENIED/);
    assert.deepEqual(await fixtureSnapshot(), before);
  } finally {
    await writeFile(path.join(fixtureRoot, 'catalog/demo-source-templates.json'), originalTemplates);
  }
});

test('the extraction module imports without filesystem writes or top-level extraction', async () => {
  const before = await fixtureSnapshot();
  const imported = await runNode([
    '--permission', '--allow-fs-read=*', '--input-type=module', '--eval',
    `await import(${JSON.stringify(pathToFileURL(entry).href)});`,
  ]);
  assert.equal(imported.status, 0, imported.output);
  assert.equal(imported.output, '', 'a normal module import must not run the generator or the CLI');
  assert.deepEqual(await fixtureSnapshot(), before);
});

test('--check rejects a truncated source manifest even if its cache was truncated too', async () => {
  const filename = path.join(fixtureRoot, 'catalog/upstream-manifest.json');
  const originalManifest = await readFile(filename, 'utf8');
  const manifest = JSON.parse(originalManifest);
  const removed = manifest.components.pop();
  const cached = JSON.parse(originalCatalog);
  delete cached.components[removed.slug];
  cached.coverage.components = 302;
  cached.coverage.upstream = 214;
  await writeFile(filename, `${JSON.stringify(manifest, null, 2)}\n`);
  await writeFile(path.join(fixtureRoot, 'catalog/parameter-api.json'), `${JSON.stringify(cached, null, 2)}\n`);
  const before = await fixtureSnapshot();
  try {
    const checked = await runCli(['--check']);
    assert.equal(checked.status, 1, checked.output);
    assert.match(checked.output, /expected.*215.*88/i);
    assert.match(checked.output, /214/);
    assert.deepEqual(await fixtureSnapshot(), before);
  } finally {
    await writeFile(filename, originalManifest);
    await writeFile(path.join(fixtureRoot, 'catalog/parameter-api.json'), originalCatalog);
  }
});

test('unsupported CLI flags fail before extraction and cannot turn --check into generation', async () => {
  const before = await fixtureSnapshot();
  const checked = await runCli(['--check', '--capture'], true);
  assert.equal(checked.status, 1, checked.output);
  assert.match(checked.output, /(?:unknown|unsupported).*--capture/i);
  assert.doesNotMatch(checked.output, /ERR_ACCESS_DENIED/);
  assert.deepEqual(await fixtureSnapshot(), before);
});
