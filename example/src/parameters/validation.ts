import type { DemoValues, JsonValue, ParameterDefinition, ParameterField, ValueShape } from './types';

const forbiddenKeys = new Set(['__proto__', 'prototype', 'constructor']);
/** Native RGB pickers require six digits; retain an optional CSS alpha channel. */
export function colorPickerParts(value: string): { rgb: string; alpha: string } | null {
  if (!/^#(?:[\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i.test(value)) return null;
  const digits = value.slice(1);
  const expanded = digits.length <= 4 ? [...digits].map(digit => digit + digit).join('') : digits;
  return { rgb: `#${expanded.slice(0, 6)}`, alpha: expanded.slice(6) };
}
export function isJsonValue(value: unknown, depth = 0): value is JsonValue {
  if (depth > 12) return false;
  if (value === null || typeof value === 'boolean') return true;
  if (typeof value === 'number') return Number.isFinite(value);
  if (typeof value === 'string') return value.length <= 20000;
  if (Array.isArray(value)) return value.length <= 512 && value.every(item => isJsonValue(item, depth + 1));
  if (typeof value !== 'object' || !value || Object.getPrototypeOf(value) !== Object.prototype) return false;
  const items = Object.entries(value);
  return items.length <= 256 && items.every(([key, item]) => !forbiddenKeys.has(key) && isJsonValue(item, depth + 1));
}
export function isDemoValues(value: unknown): value is DemoValues {
  return typeof value === 'object' && value !== null && !Array.isArray(value) && isJsonValue(value);
}
export function defaultValues(definition: ParameterDefinition): DemoValues {
  return Object.fromEntries(definition.fields.map(field => [field.key, field.defaultValue]));
}
function matchesShape(value: JsonValue, shape: ValueShape): boolean {
  if (shape.kind === 'union') return (shape.variants ?? []).some(variant => matchesShape(value, variant));
  if (shape.kind === 'null') return value === null;
  if (shape.kind === 'array') return Array.isArray(value) && (!shape.items || value.every(item => matchesShape(item, shape.items!)));
  if (shape.kind === 'object') {
    if (value === null || typeof value !== 'object' || Array.isArray(value)) return false;
    return (shape.required ?? []).every(key => key in value) && Object.entries(shape.properties ?? {}).every(([key, child]) => !(key in value) || matchesShape(value[key], child));
  }
  return typeof value === shape.kind;
}
export function validateField(field: ParameterField, value: unknown): string | null {
  if (!isJsonValue(value)) return '请输入有限、有效的 JSON 值。';
  if (field.options && !field.options.some(option => JSON.stringify(option.value) === JSON.stringify(value))) return '请选择列表中提供的选项。';
  if (field.control === 'number' || field.control === 'range') {
    if (typeof value !== 'number') return '请输入有效数字。';
    if (field.min !== undefined && value < field.min) return `最小值为 ${field.min}${field.unit ?? ''}。`;
    if (field.max !== undefined && value > field.max) return `最大值为 ${field.max}${field.unit ?? ''}。`;
  }
  if (field.control === 'switch' && typeof value !== 'boolean') return '此参数需要布尔值。';
  if (['text', 'color', 'resource'].includes(field.control) && typeof value !== 'string' && !field.options) return '此参数需要字符串。';
  if (field.control === 'color' && typeof value === 'string' && !colorPickerParts(value)) return '请使用 3、4、6 或 8 位十六进制颜色，例如 #5227ff 或 #5227ff80。';
  if (field.shape && !matchesShape(value, field.shape)) return '数据结构或字段类型不符合本例要求，请参考默认配置。';
  if (field.uniqueBy) {
    if (!Array.isArray(value)) return '此配置需要具有唯一标识的对象数组。';
    const identities = new Set<string>();
    for (const item of value) {
      if (!item || typeof item !== 'object' || Array.isArray(item) || !Object.hasOwn(item, field.uniqueBy)) return `每项都需要 ${field.uniqueBy} 标识。`;
      const identity = item[field.uniqueBy];
      if (typeof identity !== 'string' && typeof identity !== 'number') return `${field.uniqueBy} 标识需要字符串或数字。`;
      const key = String(identity);
      if (identities.has(key)) return `${field.uniqueBy} 标识必须唯一，重复项不会更新预览。`;
      identities.add(key);
    }
  }
  function validResources(item: JsonValue): boolean {
    if (typeof item === 'string' && item.startsWith('@asset/')) return !!field.resources?.includes(item);
    if (Array.isArray(item)) return item.every(validResources);
    if (item && typeof item === 'object') return Object.values(item).every(validResources);
    return true;
  }
  if (!validResources(value)) return '未知本地素材，请使用本例提供的资源；预览保留最后有效配置。';
  return null;
}
/** Reject the entire invalid message; a malformed value never reaches a live renderer. */
export function validateValues(definition: ParameterDefinition, values: unknown): values is DemoValues {
  if (!isDemoValues(values)) return false;
  const fields = new Map(definition.fields.map(field => [field.key, field]));
  return Object.entries(values).every(([key, value]) => !!fields.get(key) && !validateField(fields.get(key)!, value));
}
