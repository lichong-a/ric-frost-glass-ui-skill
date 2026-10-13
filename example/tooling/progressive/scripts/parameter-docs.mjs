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
export function parameterDocs(definition) {
  const signature = props => JSON.stringify(props.map(prop => [prop.name, prop.type, prop.defaultExpression]));
  const seen = new Set([signature(definition.props)]);
  const rows = definition.props.map(prop => ({ ...prop, owner: '' }));
  for (const target of definition.targets) {
    if (!target.props?.length || seen.has(signature(target.props))) continue;
    seen.add(signature(target.props));
    rows.push(...target.props.map(prop => ({ ...prop, owner: target.name })));
  }
  const inheritedTypes = [...new Map([...definition.inherited, ...definition.targets.flatMap(target => target.inherited ?? [])].map(item => [item.type, item])).values()];
  const api = '| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |\n|---|---|---|---|---|\n' + rows.map(prop =>
    `| \`${cell(`${prop.owner ? prop.owner + '.' : ''}${prop.name}`)}\` | \`${cell(prop.type)}\` | ${prop.required ? '是' : '否'} | \`${cell(prop.defaultExpression)}\` | ${cell(prop.description)} |`).join('\n');
  const inherited = inheritedTypes.length ? '\n\n**继承的原生属性：**\n\n' + inheritedTypes.map(item => `- \`${item.type}\`：见[完整类型与原生属性](${item.reference})。`).join('\n') : '';
  const special = rows.filter(prop => prop.codeExample && /=>|EventHandler|Ref|ReactNode|\[|\{|CSSProperties|Record</.test(prop.type)).map(prop => `\n\n**${prop.name} 的真实接入：**\n\n\`\`\`tsx\n${prop.codeExample}\n\`\`\``).join('');
  const fields = definition.fields.filter(field => field.scope !== 'container');
  const controls = fields.length ? '| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |\n|---|---|---|---|---|\n' + fields.map(field =>
    `| \`${cell(field.key)}\` | \`${cell(JSON.stringify(field.defaultValue))}\` | ${cell(field.control)} | ${cell(field.options ? field.options.map(item => JSON.stringify(item.value)).join(' / ') : `${field.min ?? '不限'} ~ ${field.max ?? '不限'}${field.unit ? ` ${field.unit}` : ''}`)} | ${field.apply === 'rebuild' ? '调节结束后重建' : '即时应用'}${field.scope === 'state' ? '；原组件回调同步受控值' : ''} |`).join('\n') : '本项使用 React 节点、回调和业务数据组合；这些内容保持真实 TSX 接入，未伪装成普通文本控件。';
  const container = definition.fields.filter(field => field.scope === 'container').map(field => `- \`${field.name}\`：${field.description}；默认 \`${JSON.stringify(field.defaultValue)}\`${field.unit ?? ''}，范围 ${field.min ?? '不限'}–${field.max ?? '不限'}。`).join('\n');
  const scopeNote = definition.apiScope === 'native-composition' ? '\n\n本示例函数不接收额外公开 Props，能力由原生元素与上述叶组件组合；下面列出实际继承类型和可编辑示例配置。' : '';
  const openSignatures = definition.indexSignatures?.length ? '\n\n**开放属性签名：**\n\n' + definition.indexSignatures.map(item => `- \`${item.readonly ? 'readonly ' : ''}[key: ${item.keyType}]: ${item.valueType}\`；额外字段按锁定实现转发，当前用法展示了本例采用的配置。`).join('\n') : '';
  return `### 完整组件 API\n\n${api}${scopeNote}${openSignatures}${inherited}${special}\n\n### 本例配置与 DIY\n\n以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。\n\n${controls}\n\n### 演示容器设置\n\n${container}\n\n容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。`;
}
