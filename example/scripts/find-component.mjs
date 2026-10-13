#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const args = process.argv.slice(2);
const options = { limit: 5, json: false, exact: false, category: '', tag: '', provider: '' };
const terms = [];
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--json') options.json = true;
  else if (a === '--exact') options.exact = true;
  else if (a === '--limit') options.limit = Number(args[++i]);
  else if (a === '--category') options.category = args[++i] || '';
  else if (a === '--tag') {
    const value = args[++i];
    if (!value || value.startsWith('--')) throw new Error('--tag requires a source tag.');
    options.tag = value;
  }
  else if (a === '--provider') options.provider = args[++i] || '';
  else if (a === '--index') options.index = args[++i];
  else if (a === '--help' || a === '-h') {
    process.stdout.write('Usage: node scripts/find-component.mjs "AutoComplete" [--provider business|effects] [--exact] [--category CATEGORY] [--tag TAG] [--limit 5] [--json]\n--category 按主用途分类；--tag 按实现来源或用途标签过滤。只返回所需文档和源码入口。\n');
    process.exit(0);
  } else if (a.startsWith('--')) throw new Error(`Unknown option: ${a}`);
  else terms.push(a);
}
if (!Number.isInteger(options.limit) || options.limit < 1 || options.limit > 20) {
  throw new Error('--limit must be an integer from 1 through 20.');
}
if (options.provider === 'reactbits') options.provider = 'effects';
if (options.provider && !['business', 'effects'].includes(options.provider)) throw new Error('--provider must be business or effects.');
const query = terms.join(' ').trim();
if (!query && !options.category && !options.tag) throw new Error('Provide a component name, Chinese intent, --category or --tag.');
const normalize = s => String(s ?? '').normalize('NFKC').toLowerCase().replace(/[\s_\-./()]+/g, '');
const queryKey = normalize(query);
const queryTerms = [...new Set(query.toLowerCase().split(/[\s,，;；/]+/).map(normalize).filter(Boolean))];
const indexPath = options.index ? path.resolve(options.index) : path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../docs/component-index.json");
const index = JSON.parse(await readFile(indexPath, 'utf8'));
const entries = index.components || index;
if (!Array.isArray(entries)) throw new Error('Component index must contain an array of entries.');
const purposeCategories = new Map(entries.map(component => [component.category, component.categoryLabel]));
const category = options.category && [...purposeCategories].find(([id, label]) => [id, label].some(value => normalize(value) === normalize(options.category)))?.[0];
const tagsFor = component => [component.sourceCategory, ...(component.tags || [])].filter(Boolean);
let legacyTag = '';
const warnings = [];
if (options.category && !category) {
  if (!entries.some(component => tagsFor(component).some(value => normalize(value) === normalize(options.category)))) {
    throw new Error(`未知用途分类：${options.category}。可选：${[...purposeCategories].map(([id, label]) => `${id}（${label}）`).join('、')}。来源标签请使用 --tag。`);
  }
  legacyTag = options.category;
  warnings.push(`“${options.category}”是来源标签，已按 --tag ${options.category} 查询；用途分类请使用 --category。`);
}
for (const warning of warnings) process.stderr.write(`${warning}\n`);
const providerFor = component => ['reactbits', 'react-bits', 'effects'].includes(component.provider) ? 'effects' : component.provider || 'effects';
const rank = component => {
  if (options.provider && providerFor(component) !== options.provider) return 0;
  if (category && component.category !== category) return 0;
  if ([options.tag, legacyTag].filter(Boolean).some(tag => !tagsFor(component).some(value => normalize(value) === normalize(tag)))) return 0;
  if (!queryKey) return 1;
  const canonical = [component.id, component.name].map(normalize);
  const aliases = (component.aliases || []).map(normalize);
  if (canonical.includes(queryKey)) return 1000;
  if (aliases.includes(queryKey)) return 900;
  if (options.exact) return 0;
  const name = normalize(component.name);
  const description = normalize([component.description, component.useWhen].filter(Boolean).join(' '));
  const tags = (component.tags || []).map(normalize);
  let score = name.includes(queryKey) ? 200 : 0;
  for (const term of queryTerms) {
    if (name.includes(term)) score += 90;
    if (aliases.some(v => v.includes(term) || (v.length >= 2 && term.includes(v)))) score += 65;
    if (tags.some(v => v.includes(term) || (v.length >= 2 && term.includes(v)))) score += 35;
    if (description.includes(term)) score += 10;
  }
  if (!score && /[\u3400-\u9fff]/.test(queryKey)) {
    const grams = [];
    for (let index = 1; index < queryKey.length; index++) {
      const pair = queryKey.slice(index - 1, index + 1);
      if (/^[\u3400-\u9fff]{2}$/.test(pair)) grams.push(pair);
    }
    const haystack = [name, description, ...aliases, ...tags].join(' ');
    score = [...new Set(grams)].filter(term => haystack.includes(term)).length * 5;
  }
  return score;
};
const ranked = entries.map(component => ({ component, score: rank(component) })).filter(x => x.score > 0).sort((a,b) => b.score - a.score || a.component.name.localeCompare(b.component.name));
const matches = ranked.slice(0, options.limit).map(({ component, score }) => ({
  id: component.id,
  name: component.name,
  category: component.category,
  provider: providerFor(component),
  intent: component.aliases,
  score,
  readFirst: component.docPath,
  source: component.sourcePath,
  example: component.demoPath || null,
  props: component.propsPath || null,
  motion: component.motion,
  useWhen: component.useWhen || component.description,
  avoidWhen: component.avoidWhen || null,
  note: '先只读 readFirst；按其中需要再读 source / example / props。'
}));
const output = { query, provider: options.provider || null, category: options.category || null, tag: options.tag || legacyTag || null, resolvedCategory: category || null, warnings, totalMatches: ranked.length, shown: matches.length, matches };
if (!matches.length) process.exitCode = 2;
if (options.json) process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
else if (!matches.length) {
  process.stdout.write(`未匹配：${query || options.category || options.tag}\n尝试规范英文名、中文关键词，或读取当前包的 task-router.md。不要据此创造并不存在的上游组件。\n`);
  process.exitCode = 2;
} else {
  process.stdout.write(`匹配 ${ranked.length} 项，显示 ${matches.length} 项。${ranked[0].score >= 900 ? '首项为名称或别名精确匹配。' : '这是候选列表；先读最相关的一个组件文档。'}\n\n`);
  for (const item of matches) {
    process.stdout.write(`${item.name} [${item.category}]\n  意图：${item.intent.join(' / ')}\n  先读：${item.readFirst}\n  源码：${item.source}\n`);
    if (item.useWhen) process.stdout.write(`  适用：${item.useWhen}\n`);
    if (item.avoidWhen) process.stdout.write(`  替代/边界：${item.avoidWhen}\n`);
    if (item.example) process.stdout.write(`  示例：${item.example}\n`);
    if (item.props) process.stdout.write(`  Props：${item.props}\n`);
    process.stdout.write(`  动效：${item.motion}\n\n`);
  }
}
