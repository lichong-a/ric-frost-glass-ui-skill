#!/usr/bin/env node
import ts from 'typescript';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { adaptUpstreamTypes, upstreamTypeCompatibilityRules } from './adapt-upstream-types.mjs';
import { adaptUpstream } from './adapt-upstream.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const checkUsage = process.argv.slice(2).includes('--usage');
if (process.argv.slice(2).some(arg => arg !== '--usage')) throw new Error('Usage: node scripts/check-types.mjs [--usage]');
const virtualSources = new Map();
if (checkUsage) {
  const source = await readFile(path.join(root, 'src/parameters/usage.ts'), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  const { currentUsage } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
  const directory = JSON.parse(await readFile(path.join(root, 'catalog/use-categories.json'), 'utf8'));
  for (const item of directory.components) {
    const definition = JSON.parse(await readFile(path.join(root, 'src/parameters/definitions', `${item.id}.json`), 'utf8'));
    const values = Object.fromEntries(definition.fields.map(field => [field.key, field.defaultValue]));
    virtualSources.set(path.join(root, definition.demoPath), currentUsage(definition, values));
  }
}
const configPath = fileURLToPath(new URL('../tsconfig.json', import.meta.url));
const formatHost = {
  getCurrentDirectory: () => root,
  getCanonicalFileName: name => name,
  getNewLine: () => '\n'
};
const printDiagnostics = diagnostics => {
  if (diagnostics.length) process.stderr.write(ts.formatDiagnostics(diagnostics, formatHost));
};

try {
  const config = ts.readConfigFile(configPath, ts.sys.readFile);
  if (config.error) {
    printDiagnostics([config.error]);
    process.exitCode = 1;
  } else {
    const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root, undefined, configPath);
    const host = ts.createCompilerHost(parsed.options);
    host.getCurrentDirectory = () => root;
    const readOriginal = host.readFile.bind(host);
    host.readFile = id => {
      const typed = adaptUpstreamTypes(virtualSources.get(id) ?? readOriginal(id), id);
      return typed === undefined ? undefined : (adaptUpstream(typed, id) ?? typed);
    };
    const program = ts.createProgram(parsed.fileNames, parsed.options, host);
    const diagnostics = [...parsed.errors, ...ts.getPreEmitDiagnostics(program)];
    printDiagnostics(diagnostics);
    const demoCount = parsed.fileNames.filter(path => /\/src\/(?:business\/)?demos\//.test(path.replaceAll('\\', '/'))).length;
    console.log(`TypeScript checked ${demoCount} ${checkUsage ? 'copyable default usages' : 'demonstration modules'} and the application: ${diagnostics.length} diagnostics.`);
    console.log(`${upstreamTypeCompatibilityRules.length} explicit type compatibility rules apply in memory; upstream source files remain unchanged.`);
    process.exitCode = diagnostics.length ? 1 : 0;
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
