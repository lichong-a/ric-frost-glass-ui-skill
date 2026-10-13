import type { DemoValues, JsonValue, ParameterDefinition } from './types';
function literal(value: JsonValue, definition: ParameterDefinition): string {
  if (typeof value === 'string' && value.startsWith('@media/')) return `import.meta.env.BASE_URL + ${JSON.stringify(value.slice(1))}`;
  if (typeof value === 'string' && value.startsWith('@public/')) return `import.meta.env.BASE_URL + ${JSON.stringify(value.slice('@public/'.length))}`;
  if (typeof value === 'string' && value.startsWith('@asset/restoration/')) {
    const parents = '../'.repeat(definition.demoPath.split('/').length - 2);
    return `new URL(${JSON.stringify(`${parents}assets/restoration/${value.slice('@asset/restoration/'.length)}`)}, import.meta.url).href`;
  }
  if (Array.isArray(value)) return `[${value.map(item => literal(item, definition)).join(', ')}]`;
  if (value && typeof value === 'object') return `{ ${Object.entries(value).map(([key, item]) => `${JSON.stringify(key)}: ${literal(item, definition)}`).join(', ')} }`;
  return JSON.stringify(value);
}
/** Template markers are trusted generator output; input is serialized, never executed. */
export function currentUsage(definition: ParameterDefinition, values: DemoValues): string {
  let source = definition.usageTemplate;
  for (const target of definition.targets) {
    const fields = definition.fields.filter(field => field.scope === 'prop' && field.target === target.id);
    const props = fields.map(field => `${field.name}={${literal(Object.hasOwn(values, field.key) ? values[field.key] : field.defaultValue, definition)}}`).join(' ');
    source = source.replace(`/*__AW_PROPS_${target.id}__*/`, () => props);
  }
  for (const field of definition.fields.filter(field => field.scope === 'state')) {
    source = source.replace(`/*__AW_STATE_${field.key}__*/`, () => literal(Object.hasOwn(values, field.key) ? values[field.key] : field.defaultValue, definition));
  }
  for (const field of definition.fields) {
    source = source.replaceAll(`/*__AW_VALUE_${field.key}__*/`, () => literal(Object.hasOwn(values, field.key) ? values[field.key] : field.defaultValue, definition));
  }
  return `// 当前 ${definition.name} 用法；所需实现和 CSS 与完整示例相同。\n// 预览框高度：${values['container.height'] ?? 560}px（宿主设置，不是组件 Props）。\n${source}`;
}
