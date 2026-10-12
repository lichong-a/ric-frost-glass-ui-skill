#!/usr/bin/env node
// Build the standalone style specimen. No network or third-party dependencies.
import {readFile, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const root = new URL('../', import.meta.url);
const [tokens, theme, body] = await Promise.all([
  readFile(new URL('tokens.css', root), 'utf8'),
  readFile(new URL('theme.css', root), 'utf8'),
  readFile(new URL('examples/reference-body.html', root), 'utf8')
]);
const specimenCss = `
body { margin: 0; }
.spec-document { position: relative; z-index: 1; max-width: 1680px; margin-inline: auto; padding: 40px 32px 32px; }
.spec-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; margin-bottom: 28px; }
.spec-header .aw-page-description { margin-top: 8px; max-width: 880px; }
.spec-eyebrow { font-size: 11px; line-height: 18px; letter-spacing: .12em; color: var(--aw-color-text-secondary); margin-bottom: 8px !important; }
.spec-toggle { white-space: nowrap; padding: 0 16px; border-radius: var(--aw-radius-control); background: var(--aw-surface-control); }
.spec-palette { display: grid; grid-template-columns: repeat(6,minmax(0,1fr)); gap: 16px; margin-bottom: 28px; }
.spec-palette > div { display: flex; align-items: center; gap: 12px; }
.spec-palette i { display: block; width: 42px; height: 42px; border-radius: 12px; background: var(--sample); border: 1px solid var(--aw-color-border-decorative); box-shadow: var(--aw-shadow-control); }
.spec-palette small { color: var(--aw-color-text-secondary); font-variant-numeric: tabular-nums; }
.spec-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 20px; }
.spec-card { padding: 24px !important; display: flex; flex-direction: column; gap: 20px; min-width: 0; }
.spec-card > .aw-caption:last-child { margin-top: auto; }
.spec-row { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; }
.spec-material-surface { padding: 20px; border-radius: var(--aw-radius-control); border: 1px solid var(--aw-color-border-decorative); }
.spec-material-surface p { margin-top: 8px; }
.spec-definitions { display: grid; gap: 12px; margin: 0; }
.spec-definitions > div { display: flex; justify-content: space-between; padding-bottom: 8px; border-bottom: 1px solid var(--aw-color-border-divider); }
.spec-definitions dt { color: var(--aw-color-text-secondary); }
.spec-definitions dd { margin: 0; font-variant-numeric: tabular-nums; }
.spec-static-list { list-style: none; padding: 0; margin: 0; }
.spec-static-item { display: flex; justify-content: space-between; align-items: center; gap: 12px; min-height: 44px; padding: 8px 12px; border-radius: var(--aw-radius-control); }
.spec-static-selected { background: var(--aw-surface-selected); }
.spec-end { justify-content: flex-end; }
.spec-table { margin-top: 24px; }
.spec-footer { padding: 24px 0 0; color: var(--aw-color-text-secondary); font-size: 13px; line-height: 22px; }
@media (max-width: 1100px) { .spec-grid { grid-template-columns: repeat(2,minmax(0,1fr)); } .spec-palette { grid-template-columns: repeat(3,minmax(0,1fr)); } }
@media (max-width: 700px) { .spec-document { padding: 24px 16px; } .spec-header { flex-direction: column; } .spec-grid { grid-template-columns: minmax(0,1fr); } .spec-palette { grid-template-columns: repeat(2,minmax(0,1fr)); } .spec-card { padding: 20px !important; } }
`;
const embeddedTheme = theme.replace(/^@import\s+url\(['"]\.\/tokens\.css['"]\);\s*$/m, '');
const html = `<!doctype html>\n<html lang="zh-CN" class="aw-theme"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Agent Wan 自然色霜玻璃 样式参考</title><style>\n${tokens}\n${embeddedTheme}\n${specimenCss}\n</style></head><body>\n${body}\n</body></html>\n`;
await writeFile(new URL('CSS_REFERENCE.html', root), html, 'utf8');
console.log(`Built standalone style reference: ${fileURLToPath(new URL('CSS_REFERENCE.html', root))}`);
