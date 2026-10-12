#!/usr/bin/env node
/** Structural and contrast checks for the supplied token contract; not a browser or WCAG certification. */
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { PACKAGE_ROOT, loadTokenModel, renderTokens } from './build-tokens.mjs';

function parseColor(css, label) {
  if (/^#[0-9a-f]{6}$/i.test(css)) {
    return [...css.slice(1).match(/.{2}/g).map(part => parseInt(part, 16)), 1];
  }
  const match = css.match(/^rgba?\(([^)]+)\)$/i);
  if (match) {
    const pieces = match[1].trim().split(/[\s,\/]+/);
    if (pieces.length === 3 || pieces.length === 4) {
      const rgb = pieces.slice(0, 3).map(part => part.endsWith('%') ? Number.parseFloat(part) * 2.55 : Number(part));
      const alphaText = pieces[3] ?? '1';
      const alpha = alphaText.endsWith('%') ? Number.parseFloat(alphaText) / 100 : Number(alphaText);
      if (rgb.every(value => Number.isFinite(value) && value >= 0 && value <= 255) && Number.isFinite(alpha) && alpha >= 0 && alpha <= 1) return [...rgb, alpha];
    }
  }
  throw new Error(`Contrast check ${label}: unsupported color ${css}`);
}

function composite(front, back) {
  if (back[3] !== 1) throw new Error('A contrast sample must finish on an opaque backdrop.');
  return [...front.slice(0, 3).map((value, index) => value * front[3] + back[index] * (1 - front[3])), 1];
}

function luminance(color) {
  return color.slice(0, 3).map(value => {
    const s = value / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  }).reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
}

function contrast(a, b) {
  const x = luminance(a), y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

async function main() {
  const model = await loadTokenModel(); // Missing references, cycles, path and CSS name collisions fail here.
  const [generatedCSS, theme] = await Promise.all([
    readFile(resolve(PACKAGE_ROOT, 'tokens.css'), 'utf8'),
    readFile(resolve(PACKAGE_ROOT, 'theme.css'), 'utf8')
  ]);
  if (generatedCSS !== renderTokens(model)) throw new Error('tokens.css is stale; regenerate before shipping.');

  const known = new Set([...model.tokens.values()].map(token => token.css));
  const referenced = new Set([...theme.matchAll(/var\(\s*(--aw-[a-z0-9-]+)/g)].map(match => match[1]));
  const unknown = [...referenced].filter(name => !known.has(name));
  if (unknown.length) throw new Error(`theme.css references unknown tokens: ${unknown.join(', ')}`);
  const declarations = [...theme.matchAll(/(--aw-[a-z0-9-]+)\s*:/g)].map(match => match[1]);
  const unknownOverrides = declarations.filter(name => !known.has(name));
  if (unknownOverrides.length) throw new Error(`theme.css overrides unknown tokens: ${[...new Set(unknownOverrides)].join(', ')}`);
  if (!/@import\s+url\(["']\.\/tokens\.css["']\)/.test(theme)) throw new Error('theme.css must import ./tokens.css.');
  if ([...theme.matchAll(/@media[^{}]+/g)].some(match => /var\(/.test(match[0]))) throw new Error('CSS media queries cannot use var(); use literal breakpoint values.');

  for (const [path, type] of [['breakpoint.wide', '1280px'], ['breakpoint.drawer', '1024px'], ['breakpoint.compact', '768px']]) {
    if (model.values.get(path) !== type || !theme.includes(type)) throw new Error(`${path} and the CSS media-query literals need to be updated together.`);
  }
  const checks = model.document.contrastChecks;
  if (!Array.isArray(checks) || checks.length === 0) throw new Error('No declared contrast checks.');
  const results = [];
  for (const check of checks) {
    const getColor = path => {
      if (!model.values.has(path)) throw new Error(`Contrast check ${check.label}: missing token ${path}`);
      return parseColor(model.values.get(path), check.label);
    };
    let background = getColor(check.background);
    if (background[3] !== 1) {
      if (!check.backdrop) throw new Error(`Contrast check ${check.label}: a transparent background needs an explicit backdrop.`);
      background = composite(background, getColor(check.backdrop));
    }
    let foreground = getColor(check.foreground);
    if (foreground[3] !== 1) foreground = composite(foreground, background);
    const ratio = contrast(foreground, background);
    const passed = ratio >= check.minimum; // Compare the unrounded ratio, not the displayed value.
    results.push({ label: check.label, ratio, minimum: check.minimum, passed });
    console.log(`${passed ? 'PASS' : 'FAIL'} ${check.label}: ${ratio.toFixed(2)}:1 (minimum ${check.minimum}:1)`);
  }
  if (results.some(result => !result.passed)) throw new Error('One or more declared contrast pairs failed.');
  console.log(`PASS ${model.tokens.size} tokens; ${referenced.size} theme variables; no missing/circular references; generated CSS current.`);
  console.log(`PASS ${results.length} declared solid-color pairs/composited samples. This does not certify arbitrary glass backgrounds, focus behavior, keyboard operation, browser rendering, or the entire UI.`);
}

main().catch(error => { console.error(error.message); process.exitCode = 1; });
