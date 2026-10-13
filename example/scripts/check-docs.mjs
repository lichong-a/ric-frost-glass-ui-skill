#!/usr/bin/env node
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { auditDocumentation } from './lib/documentation-audit.mjs';

const defaultRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const options = { root: defaultRoot, mode: 'kit', generatedOnly: false };
const args = process.argv.slice(2);
try {
  for (let index = 0; index < args.length; index++) {
    const argument = args[index];
    if (argument === '--help' || argument === '-h') {
      console.log('Usage: node example/scripts/check-docs.mjs [--root DIR] [--source-root KIT_ROOT] [--mode kit|skill] [--generated-only]');
      console.log('Read-only: checks Markdown links/anchors, documented command entries, purpose categories, progressive routes and complete API tables. External URLs are checked for format only.');
      process.exit(0);
    }
    if (argument === '--generated-only') options.generatedOnly = true;
    else if (['--root', '--source-root', '--mode'].includes(argument) && args[index + 1] && !args[index + 1].startsWith('--')) {
      const value = args[++index];
      if (argument === '--root') options.root = value;
      else if (argument === '--source-root') options.sourceRoot = value;
      else options.mode = value;
    } else throw new Error(`Invalid argument: ${argument}`);
  }
  options.sourceRoot ??= options.root;
  const result = await auditDocumentation(options);
  if (result.failures.length) {
    for (const failure of result.failures) console.error(`${failure.file}${failure.line ? `:${failure.line}` : ''} [${failure.code}] ${failure.message}`);
    console.error(`Documentation check failed: ${result.failures.length} errors across ${result.markdownCount} Markdown files; ${result.componentCount} catalog components, ${result.linkCount} links and ${result.commandCount} command entries checked.`);
    process.exitCode = 1;
  } else {
    console.log(`Verified ${result.markdownCount} Markdown files, ${result.componentCount} component guides, ${result.linkCount} links (${result.conditionalLinkCount} manifest-backed installed resources) and ${result.commandCount} command entries. No files were written; external URLs were not fetched.`);
    console.log('API tables align with definitions and the extracted parameter-api.json. This standalone audit does not re-extract source; npm run check:docs includes the separate fresh source check.');
  }
} catch (error) {
  console.error(`Documentation check failed: ${error.message}`);
  process.exitCode = 1;
}
