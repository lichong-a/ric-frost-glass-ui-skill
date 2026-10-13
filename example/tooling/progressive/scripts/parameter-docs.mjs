import { readFile } from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const cell = value => String(value ?? '未指定').replaceAll('|', '\\|').replaceAll('\n', '<br>');
let usageModule;
export async function readParameters(exampleRoot, id) {
  const file = path.join(exampleRoot, 'src/parameters/definitions', `${id}.json`);
  const definition = JSON.parse(await readFile(file, 'utf8'));
  if (definition.id !== id || definition.version !== 1) throw new Error(`Invalid parameter record: ${id}`);
  return definition;
}
export async function defaultUsage(exampleRoot, definition) {
  if (!usageModule) {
    const text = await readFile(path.join(exampleRoot, 'src/parameters/usage.ts'), 'utf8');
    const code = ts.transpileModule(text, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
    usageModule = import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
  }
  const { currentUsage } = await usageModule;
  return currentUsage(definition, Object.fromEntries(definition.fields.map(field => [field.key, field.defaultValue])));
}
export function parameterDocs(definition, { guidePath, examplePrefix, provider = 'effects' } = {}) {
  const signature = props => JSON.stringify(props.map(prop => [prop.name, prop.type, prop.required, prop.defaultExpression]));
  const seen = new Set([signature(definition.props)]);
  const rows = definition.props.map(prop => ({ ...prop, owner: '' }));
  for (const target of definition.targets) {
    if (!target.props?.length || seen.has(signature(target.props))) continue;
    seen.add(signature(target.props));
    rows.push(...target.props.map(prop => ({ ...prop, owner: target.name })));
  }
  const inheritedTypes = [...new Map([...definition.inherited, ...definition.targets.flatMap(target => target.inherited ?? [])].map(item => [item.type, item])).values()];
  const primary = definition.targets.find(target => target.sourcePath && target.sourcePath === definition.sourcePath);
  const primaryName = primary?.name.replace(/\s*·\s*t\d+$/, '').trim() || (definition.sourcePath ? path.posix.basename(definition.sourcePath, path.posix.extname(definition.sourcePath)) : '实际组件');
  const primaryLabel = guidePath && examplePrefix && definition.sourcePath
    ? `[${primaryName}](${path.posix.relative(path.posix.dirname(guidePath), path.posix.join(examplePrefix, definition.sourcePath))})`
    : `\`${primaryName}\``;
  const ownership = provider === 'business'
    ? definition.apiScope === 'native-composition'
      ? '本例默认导出是由原生元素与叶组件组成的演示函数，不接收公开 Props。下表按叶组件前缀列出实际 API；原生属性类型单独注明。'
      : `本例默认导出是可运行演示入口。下表无前缀参数属于 ${primaryLabel} 的组件 API，带前缀参数属于对应叶组件；这些参数不表示演示函数本身接收相同 Props。`
    : '';
  const api = '| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |\n|---|---|---|---|---|\n' + rows.map(prop =>
    `| \`${cell(`${prop.owner ? prop.owner + '.' : ''}${prop.name}`)}\` | \`${cell(prop.type)}\` | ${prop.required ? '是' : '否'} | \`${cell(prop.defaultExpression)}\` | ${cell(prop.description)} |`).join('\n');
  const inherited = inheritedTypes.length ? '\n\n**继承的原生属性：**\n\n' + inheritedTypes.map(item => {
    if (/^https?:\/\//.test(item.reference)) return `- \`${item.type}\`：见[完整类型与原生属性](${item.reference})。`;
    if (!guidePath || !examplePrefix) throw new Error(`Local inherited type reference needs a guide location: ${item.reference}`);
    const reference = item.reference.replaceAll('\\', '/');
    if (reference.startsWith('/') || reference.split('/').includes('..')) throw new Error(`Unsafe inherited type reference: ${reference}`);
    const href = path.posix.relative(path.posix.dirname(guidePath), path.posix.join(examplePrefix, reference));
    return `- \`${item.type}\`：见[完整类型与原生属性](${href})（安装依赖后存在）。`;
  }).join('\n') : '';
  const special = rows.filter(prop => prop.codeExample && /=>|EventHandler|Ref|ReactNode|\[|\{|CSSProperties|Record</.test(prop.type)).map(prop => `\n\n**${prop.name} 的真实接入：**\n\n\`\`\`tsx\n${prop.codeExample}\n\`\`\``).join('');
  const fields = definition.fields.filter(field => field.scope !== 'container');
  const controls = fields.length ? '| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |\n|---|---|---|---|---|\n' + fields.map(field =>
    `| \`${cell(field.key)}\` | \`${cell(JSON.stringify(field.defaultValue))}\` | ${cell(field.control)} | ${cell(field.options ? field.options.map(item => JSON.stringify(item.value)).join(' / ') : `${field.min ?? '不限'} ~ ${field.max ?? '不限'}${field.unit ? ` ${field.unit}` : ''}`)} | ${field.apply === 'rebuild' ? '调节结束后重建' : '即时应用'}${field.scope === 'state' ? '；原组件回调同步受控值' : ''} |`).join('\n') : '本项使用 React 节点、回调和业务数据组合；这些内容保持真实 TSX 接入，未伪装成普通文本控件。';
  const container = definition.fields.filter(field => field.scope === 'container').map(field => `- \`${field.name}\`：${field.description}；默认 \`${JSON.stringify(field.defaultValue)}\`${field.unit ?? ''}，范围 ${field.min ?? '不限'}–${field.max ?? '不限'}。`).join('\n');
  const scopeNote = definition.apiScope === 'native-composition' ? '\n\n本示例函数不接收额外公开 Props，能力由原生元素与上述叶组件组合；下面列出实际继承类型和可编辑示例配置。' : '';
  const openSignatures = definition.indexSignatures?.length ? '\n\n**开放属性签名：**\n\n' + definition.indexSignatures.map(item => `- \`${item.readonly ? 'readonly ' : ''}[key: ${item.keyType}]: ${item.valueType}\`；额外字段按锁定实现转发，当前用法展示了本例采用的配置。`).join('\n') : '';
  const sourceNote = provider === 'business' ? '源码默认值来自本包业务实现；本例默认配置来自独立示例，两者可能不同。' : '源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。';
  return `### 完整组件 API\n\n${sourceNote}${ownership ? `\n\n${ownership}` : ''}\n\n${api}${scopeNote}${openSignatures}${inherited}${special}\n\n### 本例配置与 DIY\n\n以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。\n\n${controls}\n\n### 演示容器设置\n\n${container || '本例没有可编辑的容器设置。'}\n\n容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。`;
}
