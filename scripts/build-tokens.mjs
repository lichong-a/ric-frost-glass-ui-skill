#!/usr/bin/env node
/** Agent Ric custom token compiler. Node.js standard library only; no npm install. */
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const PACKAGE_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const TOKEN_GROUPS = ['primitives', 'semantic', 'component'];
const REFERENCE = /\{([A-Za-z0-9_.-]+)\}/g;

export function cssName(path) {
  return '--aw-' + path
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/\./g, '-')
    .toLowerCase();
}

export function flattenTokens(document) {
  if (document.format !== 'ric-frost-glass-ui-skill/custom-tokens@1') {
    throw new Error('Unsupported token format: expected ric-frost-glass-ui-skill/custom-tokens@1. This is a custom format, not DTCG.');
  }
  const tokens = new Map();
  const names = new Map();
  function visit(value, path, group) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      throw new Error(`Invalid token group at ${group}.${path || '(root)'}`);
    }
    if (Object.hasOwn(value, 'value')) {
      if (!path || typeof value.value !== 'string' || !value.type) {
        throw new Error(`Token ${group}.${path} needs a string value and an explicit type.`);
      }
      if (tokens.has(path)) throw new Error(`Duplicate flattened token path: ${path}`);
      const name = cssName(path);
      if (!/^--aw-[a-z0-9-]+$/.test(name)) throw new Error(`Unsafe CSS name: ${name}`);
      if (names.has(name)) throw new Error(`CSS name collision: ${path} and ${names.get(name)} both map to ${name}`);
      if (/[;\n\r{}]/.test(value.value.replace(REFERENCE, ''))) {
        throw new Error(`Token ${path} has a malformed reference or an unsupported CSS declaration character.`);
      }
      tokens.set(path, { ...value, path, group, css: name });
      names.set(name, path);
      return;
    }
    for (const [key, child] of Object.entries(value)) {
      if (!/^[A-Za-z0-9_-]+$/.test(key)) throw new Error(`Invalid token key: ${key}`);
      visit(child, path ? `${path}.${key}` : key, group);
    }
  }
  for (const group of TOKEN_GROUPS) {
    if (!document[group]) throw new Error(`Missing top-level token group: ${group}`);
    visit(document[group], '', group);
  }
  return tokens;
}

export function resolveTokens(tokens) {
  const resolved = new Map();
  const stack = [];
  function get(path) {
    if (resolved.has(path)) return resolved.get(path);
    if (!tokens.has(path)) throw new Error(`Missing token reference: ${[...stack, path].join(' → ')}`);
    if (stack.includes(path)) throw new Error(`Circular token reference: ${[...stack, path].join(' → ')}`);
    stack.push(path);
    const token = tokens.get(path);
    const value = token.value.replace(REFERENCE, (_match, reference) => {
      const dependency = tokens.get(reference);
      if (dependency && TOKEN_GROUPS.indexOf(dependency.group) > TOKEN_GROUPS.indexOf(token.group)) {
        throw new Error(`Invalid token layer dependency: ${token.group}.${path} cannot depend on ${dependency.group}.${reference}`);
      }
      return get(reference);
    });
    stack.pop();
    resolved.set(path, value);
    return value;
  }
  for (const path of tokens.keys()) get(path);
  return resolved;
}

export async function loadTokenModel(tokenPath = resolve(PACKAGE_ROOT, 'tokens.json')) {
  const source = await readFile(tokenPath, 'utf8');
  const document = JSON.parse(source);
  const tokens = flattenTokens(document);
  const values = resolveTokens(tokens);
  return { document, tokens, values, sourceHash: createHash('sha256').update(source).digest('hex') };
}

function comment(value) {
  return String(value).replace(/\*\//g, '* /').replace(/[\n\r]+/g, ' ');
}

export function renderTokens(model) {
  const lines = [
    '/*',
    ' * GENERATED FILE — do not edit. Author tokens.json, then run:',
    ' *   node scripts/build-tokens.mjs',
    ' * Format: ric-frost-glass-ui-skill/custom-tokens@1 (custom JSON; not DTCG).',
    ` * Source SHA-256: ${model.sourceHash}`,
    ' * CSS aliases preserve token references; each comment records its resolved value.',
    ' * Place aw-theme on html/body or the shared ancestor of the app and its portals.',
    ' */',
    '.aw-theme {'
  ];
  for (const group of TOKEN_GROUPS) {
    lines.push('', `  /* === ${group} === */`);
    for (const token of model.tokens.values()) {
      if (token.group !== group) continue;
      const note = token.description ? ` | ${comment(token.description)}` : '';
      const output = token.value.replace(REFERENCE, (_match, reference) => `var(${model.tokens.get(reference).css})`);
      lines.push(`  /* ${token.path} [${token.type}] | resolved: ${comment(model.values.get(token.path))}${note} */`);
      lines.push(`  ${token.css}: ${output};`);
    }
  }
  lines.push('}', '');
  return lines.join('\n');
}

async function main() {
  const argumentsList = process.argv.slice(2);
  if (argumentsList.some(argument => argument !== '--check')) throw new Error('Usage: node scripts/build-tokens.mjs [--check]');
  const model = await loadTokenModel();
  const generated = renderTokens(model);
  const outputPath = resolve(PACKAGE_ROOT, 'tokens.css');
  if (argumentsList.includes('--check')) {
    const existing = await readFile(outputPath, 'utf8');
    if (existing !== generated) throw new Error('tokens.css is stale. Run node scripts/build-tokens.mjs.');
    console.log(`PASS tokens.css is current (${model.tokens.size} tokens).`);
  } else {
    await writeFile(outputPath, generated, 'utf8');
    console.log(`Generated tokens.css from tokens.json (${model.tokens.size} tokens, references resolved, no name collisions).`);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
