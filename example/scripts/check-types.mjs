#!/usr/bin/env node
import ts from 'typescript';
import { fileURLToPath } from 'node:url';
import { adaptUpstreamTypes, upstreamTypeCompatibilityRules } from './adapt-upstream-types.mjs';
import { adaptUpstream } from './adapt-upstream.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
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
      const typed = adaptUpstreamTypes(readOriginal(id), id);
      return typed === undefined ? undefined : (adaptUpstream(typed, id) ?? typed);
    };
    const program = ts.createProgram(parsed.fileNames, parsed.options, host);
    const diagnostics = [...parsed.errors, ...ts.getPreEmitDiagnostics(program)];
    printDiagnostics(diagnostics);
    const demoCount = parsed.fileNames.filter(path => /\/src\/(?:business\/)?demos\//.test(path.replaceAll('\\', '/'))).length;
    console.log(`TypeScript checked ${demoCount} demonstration modules and the application: ${diagnostics.length} diagnostics.`);
    console.log(`${upstreamTypeCompatibilityRules.length} explicit type compatibility rules apply in memory; upstream source files remain unchanged.`);
    process.exitCode = diagnostics.length ? 1 : 0;
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
