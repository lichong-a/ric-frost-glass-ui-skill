import path from 'node:path';

const cell = value => String(value ?? '').replaceAll('|', '\\|').replace(/\r?\n/g, ' ');
const link = (from, target, label) => `[${label}](${path.posix.relative(path.posix.dirname(from), target)})`;
const unique = values => [...new Set(values)];

function routePage({ filename, prefix, categories, entries, provider, index, pageRoutes = '' }) {
  const label = provider === 'business' ? '业务' : provider === 'effects' ? '效果' : '';
  const title = provider === 'business' ? '按业务场景渐进选型' : provider === 'effects' ? '按效果场景渐进选型' : '按任务渐进加载';
  const filtered = categories.filter(category => !provider || entries.some(entry => entry.category === category.id));
  const filterOption = provider ? ` --provider ${provider}` : '';
  return `# ${title}\n\n本次清单：${entries.length} 个${label}组件；日期 ${index.capturedAt}。每项对应独立示例；有明确名称时直接查询单组件指南，无需先读类别。\n\n1. 有精确名称：运行 \`find-component.mjs "名称"${filterOption} --exact\`，只读命中指南。\n2. 只有中文场景：运行 \`find-component.mjs "中文意图"${filterOption} --limit 3\`，最多比较 2–3 项。\n3. 只知道用途：先读下方一个用途类别；来源分类、family、micro 与 components 用 \`--tag\` 过滤。\n4. 单组件指南 → 自有示例 → 实际导入的源码、共享符号和样式 → 当前任务涉及的契约。禁止加载完整索引、所有 Props 或全量源码。\n\n${!provider ? `普通业务先看 ${link(filename, `${prefix}/business/task-router.md`, '业务路由')}；明确要求装饰效果时再看 ${link(filename, `${prefix}/effects/task-router.md`, '效果路由')}。\n\n` : ''}## 用途分类\n\n| 类别 | 组件数 | 用途 |\n|---|---:|---|\n${filtered.map(category => `| ${link(filename, `${prefix}/categories/${category.id}.md`, category.name)} | ${entries.filter(entry => entry.category === category.id).length} | ${cell(category.description)} |`).join('\n')}\n\n${pageRoutes}${provider ? `返回 ${link(filename, `${prefix.replace(/\/(?:effects|business)$/, '')}/task-router.md`, '全库任务路由')}。\n` : ''}`;
}

export async function writePurposeViews({ directory, index, docPrefix, write, pageRoutes = '' }) {
  const views = [
    { prefix: docPrefix, entries: index.components },
    ...['effects', 'business'].map(provider => ({ prefix: `${docPrefix}/${provider}`, provider, entries: index.components.filter(entry => entry.provider === provider) })),
  ];
  for (const view of views) {
    const filename = `${view.prefix}/task-router.md`;
    await write(filename, routePage({ ...view, filename, categories: directory.categories, index, pageRoutes: !view.provider ? pageRoutes : '' }));
    for (const category of directory.categories) {
      const entries = view.entries.filter(entry => entry.category === category.id);
      if (view.provider && !entries.length) continue;
      const categoryPath = `${view.prefix}/categories/${category.id}.md`;
      await write(categoryPath, `# ${category.name}\n\n${entries.length} 个组件。${category.description}。每项只有一个主用途；来源与组合／微交互作为标签保留。没有精确名称或需要同类比较时才读本页，选定一项后停止扩展。\n\n| 组件 | 用途 | 来源与标签 |\n|---|---|---|\n${entries.map(entry => `| ${link(categoryPath, entry.docPath, entry.name)} | ${cell(entry.useWhen || entry.description)} | ${cell((entry.tags ?? []).join('、'))} |`).join('\n')}\n\n选定一个组件后只读它的指南、示例与实际依赖；返回 ${link(categoryPath, filename, '任务路由')}。`);
    }
  }
  const migration = async (filename, label, entries, prefix, sourceTag) => {
    const categories = unique(entries.map(entry => entry.category)).map(id => directory.categoryById.get(id));
    await write(filename, `<!-- generated-category-migration -->\n\n# ${label}（迁移）\n\n旧${sourceTag === 'business' ? '业务' : ''}来源标签入口（迁移）。旧来源标签 \`${label}\` 保留用于查询，主分类以实际用途为准。${entries.length} 项旧记录分布在以下用途页；只读本次相关的一页。\n\n${categories.map(category => `- ${link(filename, `${prefix}/categories/${category.id}.md`, category.name)}：${entries.filter(entry => entry.category === category.id).length} 项。`).join('\n') || '当前清单中没有此来源标签记录。'}\n\n有精确名称直接用 \`find-component.mjs "名称" --exact\`；按来源筛选用 \`--tag ${sourceTag === 'business' ? `business-${label}` : label}\`，不要把旧来源作为 \`--category\`。`);
  };
  for (const sourceCategory of ['text-animations', 'animations', 'components', 'micro', 'backgrounds']) {
    const subset = index.components.filter(entry => entry.provider === 'effects' && entry.sourceCategory === sourceCategory);
    await migration(`${docPrefix}/categories/${sourceCategory}.md`, sourceCategory, subset, docPrefix, sourceCategory);
  }
  const business = index.components.filter(entry => entry.provider === 'business');
  for (const family of ['action', 'panel', 'utility']) {
    await migration(`${docPrefix}/business/categories/${family}.md`, family, business.filter(entry => entry.family === family), `${docPrefix}/business`, 'business');
  }
}
