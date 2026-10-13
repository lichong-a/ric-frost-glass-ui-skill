import path from 'node:path';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const unknown = Symbol('not a static JSON expression');
const baseUrl = Symbol('Vite deployment base');
const forbiddenKeys = new Set(['__proto__', 'prototype', 'constructor']);
const controlledProperties = new Set(['value', 'values', 'checked', 'defaultChecked', 'pressed', 'aria-pressed', 'aria-valuenow', 'selected', 'selection', 'selectedKeys', 'active', 'activeIndex', 'selectedIndex', 'index', 'page', 'pageSize', 'open', 'expanded', 'position', 'date', 'endDate', 'items']);
const transientNames = /^(?:hover(?:ed)?|particles?|timers?|count|status|message|loading|busy|touched|dragging|isDragging|revision|tick|elapsed|progressStatus|error)$/i;
const nonEditableProperties = /^(?:key|ref|children|className|id|htmlFor|role|data-|aria-(?!label$)|dangerouslySetInnerHTML|on[A-Z]|render[A-Z])/;
const nativeTags = new Set(['input', 'textarea', 'select', 'option', 'button', 'progress', 'meter', 'details', 'img', 'video', 'audio']);
const labels = {
  text: '文字内容', texts: '轮换文字', title: '标题', label: '标签', description: '说明',
  color: '颜色', colors: '颜色列表', colorStops: '渐变颜色', backgroundColor: '背景颜色', accentColor: '强调颜色', textColor: '文字颜色', surfaceColor: '表面颜色', borderColor: '边框颜色',
  fontSize: '字号', fontWeight: '字重', fontFamily: '字体', speed: '速度', delay: '延迟', duration: '持续时间', animationDuration: '动画时长',
  width: '宽度', height: '高度', size: '尺寸', radius: '圆角', gap: '间距', opacity: '透明度', scale: '缩放', amplitude: '振幅',
  value: '当前值', checked: '选中状态', disabled: '禁用', required: '必填', placeholder: '占位文字', min: '最小值', max: '最大值', step: '步长',
  maxLength: '最大长度', rows: '行数', multiple: '多选', readOnly: '只读', type: '类型', variant: '外观', orientation: '方向', direction: '方向',
  options: '选项', items: '数据项', images: '图片数据', src: '资源地址', alt: '替代文字', href: '链接地址',
  enableHover: '悬停响应', mouseInteraction: '指针响应', paused: '暂停', loop: '循环', autoplay: '自动播放', autoPlay: '自动播放',
  threshold: '触发阈值', rootMargin: '观察边距', stagger: '错峰间隔', spread: '展开距离', rotation: '旋转', rotationSpeed: '旋转速度',
  blend: '混合程度', glow: '辉光', brightness: '亮度', layers: '层数', time: '时间', dpr: '像素比',
  index: '当前索引', activeIndex: '活动索引', selectedIndex: '选中索引', page: '当前页', pageSize: '每页数量', total: '总数',
  open: '打开状态', expanded: '展开状态', position: '位置', date: '日期', endDate: '结束日期',
  pressed: '按下状态', ratio: '工作区比例',
};

function deploymentResource(relative) {
  const clean = relative.replace(/^\/+/, '');
  return clean.startsWith('media/') ? `@${clean}` : `@public/${clean}`;
}

function importedAsset(relative) {
  return relative.startsWith('src/assets/') && /\.(?:svg|png|jpe?g|webp|avif|gif)$/i.test(relative) ? `@asset/${relative.slice('src/assets/'.length)}` : null;
}

function codeOnlyProperty(property) {
  return ['callback', 'ref', 'react-node'].includes(property.valueKind) || /\b(?:ReactNode|ReactElement|RefObject|MutableRefObject|Ref<)\b/.test(property.type);
}

export function parseDemo(source, filename = 'demo.tsx') {
  const file = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  if (file.parseDiagnostics.length) throw new Error(`Invalid demo source ${filename}: ${ts.flattenDiagnosticMessageText(file.parseDiagnostics[0].messageText, '\n')}`);
  return file;
}

export function sourceDigest(source) { return createHash('sha256').update(source).digest('hex'); }

export function isSerializable(value, depth = 0) {
  if (depth > 12 || value === unknown || value === undefined) return false;
  if (value === null || typeof value === 'boolean') return true;
  if (typeof value === 'number') return Number.isFinite(value);
  if (typeof value === 'string') return value.length <= 20000;
  if (Array.isArray(value)) return value.length <= 512 && value.every(item => isSerializable(item, depth + 1));
  if (typeof value !== 'object' || !value || Object.getPrototypeOf(value) !== Object.prototype) return false;
  const entries = Object.entries(value);
  return entries.length <= 256 && entries.every(([key, item]) => !forbiddenKeys.has(key) && isSerializable(item, depth + 1));
}

function unwrap(node) {
  while (node && (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isTypeAssertionExpression(node) || ts.isSatisfiesExpression(node) || ts.isNonNullExpression(node))) node = node.expression;
  return node;
}

function arrowValue(node, values, evaluate, environment) {
  node = unwrap(node);
  if (!node || !ts.isArrowFunction(node) || ts.isBlock(node.body)) return unknown;
  const local = new Map(environment);
  for (let i = 0; i < node.parameters.length; i++) {
    if (!ts.isIdentifier(node.parameters[i].name)) return unknown;
    local.set(node.parameters[i].name.text, values[i]);
  }
  return evaluate(node.body, local);
}

/** A bounded AST interpreter for literal data. It never imports or executes demo code. */
export function staticValue(expression, bindings = new Map()) {
  const resolving = new Set();
  let steps = 0;
  function evaluate(raw, environment = bindings, depth = 0) {
    if (++steps > 10000 || depth > 32) return unknown;
    const node = unwrap(raw);
    if (!node) return unknown;
    const recurse = item => evaluate(item, environment, depth + 1);
    if (node.getText().replace(/\s+/g, '') === 'import.meta.env.BASE_URL') return baseUrl;
    if (ts.isStringLiteralLike(node)) return node.text;
    if (ts.isNumericLiteral(node)) return Number(node.text);
    if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
    if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
    if (node.kind === ts.SyntaxKind.NullKeyword) return null;
    if (ts.isIdentifier(node)) {
      if (!environment.has(node.text) || resolving.has(node.text)) return unknown;
      const value = environment.get(node.text);
      if (value && typeof value === 'object' && value.__staticNode) {
        resolving.add(node.text);
        const result = evaluate(value.__staticNode, value.bindings ?? environment, depth + 1);
        resolving.delete(node.text);
        return result;
      }
      return value;
    }
    if (ts.isPrefixUnaryExpression(node)) {
      const value = recurse(node.operand);
      if (value === unknown) return unknown;
      if (node.operator === ts.SyntaxKind.MinusToken && typeof value === 'number') return -value;
      if (node.operator === ts.SyntaxKind.PlusToken && typeof value === 'number') return value;
      if (node.operator === ts.SyntaxKind.ExclamationToken) return !value;
      return unknown;
    }
    if (ts.isArrayLiteralExpression(node)) {
      const values = [];
      for (const element of node.elements) {
        const value = recurse(ts.isSpreadElement(element) ? element.expression : element);
        if (value === unknown || (ts.isSpreadElement(element) && !Array.isArray(value))) return unknown;
        if (ts.isSpreadElement(element)) values.push(...value); else values.push(value);
        if (values.length > 512) return unknown;
      }
      return values;
    }
    if (ts.isObjectLiteralExpression(node)) {
      const result = {};
      for (const property of node.properties) {
        if (ts.isSpreadAssignment(property)) {
          const value = recurse(property.expression);
          if (!value || typeof value !== 'object' || Array.isArray(value) || value === unknown) return unknown;
          for (const [key, item] of Object.entries(value)) {
            if (forbiddenKeys.has(key)) return unknown;
            result[key] = item;
          }
          continue;
        }
        if (!ts.isPropertyAssignment(property) && !ts.isShorthandPropertyAssignment(property)) return unknown;
        const name = property.name;
        const key = ts.isComputedPropertyName(name) ? recurse(name.expression) : name.text;
        if (typeof key !== 'string' && typeof key !== 'number') return unknown;
        if (forbiddenKeys.has(String(key))) return unknown;
        const value = recurse(ts.isShorthandPropertyAssignment(property) ? property.name : property.initializer);
        if (value === unknown) return unknown;
        result[key] = value;
      }
      return result;
    }
    if (ts.isTemplateExpression(node)) {
      let result = node.head.text;
      for (const span of node.templateSpans) {
        // Preserve Vite's deployment base without evaluating import.meta.
        const value = recurse(span.expression);
        if (value === baseUrl) {
          if (result) return unknown;
          result = '@__BASE__/';
          result += span.literal.text;
          continue;
        }
        if (value === unknown || (typeof value === 'object' && value !== null)) return unknown;
        result += String(value) + span.literal.text;
      }
      return result.startsWith('@__BASE__/') ? deploymentResource(result.slice('@__BASE__/'.length)) : result;
    }
    if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
      const value = recurse(node.expression);
      const key = ts.isPropertyAccessExpression(node) ? node.name.text : recurse(node.argumentExpression);
      if (value === unknown || value === null || forbiddenKeys.has(String(key))) return unknown;
      if (key === 'length' && (Array.isArray(value) || typeof value === 'string')) return value.length;
      if ((Array.isArray(value) || typeof value === 'object') && Object.hasOwn(value, key)) return value[key];
      return unknown;
    }
    if (ts.isConditionalExpression(node)) {
      const condition = recurse(node.condition);
      return condition === unknown ? unknown : recurse(condition ? node.whenTrue : node.whenFalse);
    }
    if (ts.isBinaryExpression(node)) {
      const left = recurse(node.left);
      if (left === unknown) return unknown;
      if (node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken && !left) return left;
      if (node.operatorToken.kind === ts.SyntaxKind.BarBarToken && left) return left;
      if (node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken && left !== null) return left;
      const right = recurse(node.right);
      if (right === unknown) return unknown;
      if (node.operatorToken.kind === ts.SyntaxKind.PlusToken && left === baseUrl && typeof right === 'string') return deploymentResource(right);
      const primitive = value => value === null || ['boolean', 'number', 'string'].includes(typeof value);
      if (!primitive(left) || !primitive(right)) return unknown;
      switch (node.operatorToken.kind) {
        case ts.SyntaxKind.PlusToken: return typeof left === 'string' || typeof right === 'string' ? String(left) + String(right) : Number(left) + Number(right);
        case ts.SyntaxKind.MinusToken: return Number(left) - Number(right);
        case ts.SyntaxKind.AsteriskToken: return Number(left) * Number(right);
        case ts.SyntaxKind.SlashToken: return Number(left) / Number(right);
        case ts.SyntaxKind.PercentToken: return Number(left) % Number(right);
        case ts.SyntaxKind.AsteriskAsteriskToken: return Number(left) ** Number(right);
        case ts.SyntaxKind.EqualsEqualsEqualsToken: return left === right;
        case ts.SyntaxKind.ExclamationEqualsEqualsToken: return left !== right;
        case ts.SyntaxKind.LessThanToken: return left < right;
        case ts.SyntaxKind.LessThanEqualsToken: return left <= right;
        case ts.SyntaxKind.GreaterThanToken: return left > right;
        case ts.SyntaxKind.GreaterThanEqualsToken: return left >= right;
        case ts.SyntaxKind.AmpersandAmpersandToken:
        case ts.SyntaxKind.BarBarToken:
        case ts.SyntaxKind.QuestionQuestionToken: return right;
        default: return unknown;
      }
    }
    if (ts.isNewExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 'URL' && node.arguments?.length === 2 && node.arguments[1].getText().replace(/\s+/g, '') === 'import.meta.url') {
      const relative = recurse(node.arguments[0]);
      const filename = environment.get('__demoSourcePath');
      if (typeof relative !== 'string' || typeof filename !== 'string') return unknown;
      const asset = importedAsset(path.posix.normalize(path.posix.join(path.posix.dirname(filename), relative)));
      return asset ? { href: asset } : unknown;
    }
    if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression)) {
      const receiver = node.expression.expression;
      const method = node.expression.name.text;
      if (ts.isIdentifier(receiver) && receiver.text === 'Array' && method === 'from') {
        const argument = recurse(node.arguments[0]);
        const length = argument?.length;
        if (!Number.isInteger(length) || length < 0 || length > 512 || node.arguments.length !== 2) return unknown;
        return Array.from({ length }, (_, index) => arrowValue(node.arguments[1], [undefined, index], (item, local) => evaluate(item, local, depth + 1), environment));
      }
      if (ts.isIdentifier(receiver) && receiver.text === 'Math' && ['min', 'max', 'round', 'floor', 'ceil', 'abs'].includes(method)) {
        const arguments_ = node.arguments.map(recurse);
        if (arguments_.some(value => typeof value !== 'number')) return unknown;
        if (method === 'min') return Math.min(...arguments_);
        if (method === 'max') return Math.max(...arguments_);
        if (method === 'round') return Math.round(arguments_[0]);
        if (method === 'floor') return Math.floor(arguments_[0]);
        if (method === 'ceil') return Math.ceil(arguments_[0]);
        return Math.abs(arguments_[0]);
      }
      const value = recurse(receiver);
      if (value === unknown) return unknown;
      if (method === 'slice' && (Array.isArray(value) || typeof value === 'string')) {
        const args = node.arguments.map(recurse);
        if (args.some(item => !Number.isInteger(item))) return unknown;
        return value.slice(...args);
      }
      if (method === 'map' && Array.isArray(value) && node.arguments.length === 1) {
        return value.map((item, index) => arrowValue(node.arguments[0], [item, index, value], (body, local) => evaluate(body, local, depth + 1), environment));
      }
      if (method === 'join' && Array.isArray(value) && value.every(item => ['number', 'boolean', 'string'].includes(typeof item))) {
        const separator = node.arguments.length ? recurse(node.arguments[0]) : ',';
        return typeof separator === 'string' ? value.join(separator) : unknown;
      }
      return unknown;
    }
    return unknown;
  }
  const value = evaluate(expression);
  return isSerializable(value) ? { known: true, value } : { known: false };
}

function defaultFunction(file) {
  const declaration = file.statements.find(node => ts.isFunctionDeclaration(node) && node.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.DefaultKeyword));
  if (declaration?.body) return declaration;
  const exported = file.statements.find(ts.isExportAssignment);
  if (exported && ts.isIdentifier(exported.expression)) {
    const name = exported.expression.text;
    const candidate = file.statements.find(node => ts.isFunctionDeclaration(node) && node.name?.text === name);
    if (candidate?.body) return candidate;
  }
  throw new Error(`Expected a standalone default demo function in ${file.fileName}`);
}

function variableBindings(file, scope = defaultFunction(file)) {
  const bindings = new Map();
  function add(statement) {
    if (!ts.isVariableStatement(statement)) return;
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.initializer) bindings.set(declaration.name.text, { __staticNode: declaration.initializer });
    }
  }
  file.statements.forEach(add);
  scope?.body?.statements.forEach(add);
  return bindings;
}

function moduleFile(root, current, specifier) {
  if (!specifier.startsWith('.')) return null;
  const filename = path.resolve(path.dirname(current), specifier);
  const relative = path.relative(root, filename);
  if (relative.startsWith('..') || path.isAbsolute(relative)) return null;
  return filename;
}

/** Read only constant bindings from local modules; function bodies never run. */
export async function staticEnvironment(source, filename, root, cache = new Map(), depth = 0) {
  const absolute = path.resolve(root, filename);
  if (cache.has(absolute)) return cache.get(absolute);
  const file = parseDemo(source, filename);
  const scope = file.statements.find(node => ts.isFunctionDeclaration(node) && node.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.DefaultKeyword));
  const environment = variableBindings(file, scope ?? { body: null });
  environment.set('__demoSourcePath', filename.split(path.sep).join('/'));
  cache.set(absolute, environment);
  if (depth > 8) return environment;
  for (const declaration of file.statements.filter(ts.isImportDeclaration)) {
    const specifier = declaration.moduleSpecifier.text;
    const resolved = moduleFile(path.resolve(root), absolute, specifier);
    if (!resolved) continue;
    if (declaration.importClause?.name) {
      const asset = importedAsset(path.relative(root, resolved).split(path.sep).join('/'));
      if (asset) environment.set(declaration.importClause.name.text, asset);
    }
    if (!declaration.importClause?.namedBindings || !ts.isNamedImports(declaration.importClause.namedBindings)) continue;
    let moduleSource;
    let modulePath;
    for (const candidate of [resolved, `${resolved}.ts`, `${resolved}.tsx`, `${resolved}/index.ts`, `${resolved}/index.tsx`]) {
      try { moduleSource = await readFile(candidate, 'utf8'); modulePath = candidate; break; }
      catch (error) { if (!['ENOENT', 'EISDIR'].includes(error.code)) throw error; }
    }
    if (!moduleSource) continue;
    const imported = await staticEnvironment(moduleSource, path.relative(root, modulePath), root, cache, depth + 1);
    for (const binding of declaration.importClause.namedBindings.elements) {
      if (binding.isTypeOnly) continue;
      const original = (binding.propertyName ?? binding.name).text;
      if (imported.has(original)) {
        const value = imported.get(original);
        environment.set(binding.name.text, value?.__staticNode ? { ...value, bindings: imported } : value);
      }
    }
  }
  // Pure constant re-exports such as palette remain available to demo imports.
  for (const declaration of file.statements.filter(ts.isExportDeclaration)) {
    if (!declaration.moduleSpecifier || !declaration.exportClause || !ts.isNamedExports(declaration.exportClause)) continue;
    const resolved = moduleFile(path.resolve(root), absolute, declaration.moduleSpecifier.text);
    if (!resolved) continue;
    let moduleSource;
    let modulePath;
    for (const candidate of [resolved, `${resolved}.ts`, `${resolved}.tsx`]) {
      try { moduleSource = await readFile(candidate, 'utf8'); modulePath = candidate; break; }
      catch (error) { if (!['ENOENT', 'EISDIR'].includes(error.code)) throw error; }
    }
    if (!moduleSource) continue;
    const exported = await staticEnvironment(moduleSource, path.relative(root, modulePath), root, cache, depth + 1);
    for (const binding of declaration.exportClause.elements) {
      const original = (binding.propertyName ?? binding.name).text;
      if (exported.has(original)) {
        const value = exported.get(original);
        environment.set(binding.name.text, value?.__staticNode ? { ...value, bindings: exported } : value);
      }
    }
  }
  return environment;
}

function mergeShapes(shapes) {
  if (!shapes.length || shapes.some(shape => shape.kind !== shapes[0].kind)) return undefined;
  const kind = shapes[0].kind;
  if (kind === 'array') {
    const items = mergeShapes(shapes.flatMap(shape => shape.items ? [shape.items] : []));
    return { kind, ...(items ? { items } : {}) };
  }
  if (kind === 'object') {
    const keys = [...new Set(shapes.flatMap(shape => Object.keys(shape.properties ?? {})))];
    const properties = Object.fromEntries(keys.flatMap(key => {
      const merged = mergeShapes(shapes.flatMap(shape => shape.properties?.[key] ? [shape.properties[key]] : []));
      return merged ? [[key, merged]] : [];
    }));
    const required = keys.filter(key => shapes.every(shape => shape.required?.includes(key)));
    return { kind, properties, required };
  }
  return { kind };
}

export function valueShape(value) {
  if (value === null) return { kind: 'null' };
  if (Array.isArray(value)) {
    const shape = { kind: 'array' };
    const items = mergeShapes(value.map(valueShape));
    if (items) shape.items = items;
    return shape;
  }
  if (typeof value === 'object') return { kind: 'object', properties: Object.fromEntries(Object.entries(value).map(([name, item]) => [name, valueShape(item)])), required: Object.keys(value) };
  return { kind: typeof value };
}

function propertyOptions(property) {
  if (property.options?.length) {
    const options = property.options.map(option => typeof option === 'object' && option !== null && Object.hasOwn(option, 'value') ? option : { label: String(option), value: option });
    return options.every(option => isSerializable(option.value)) ? options : undefined;
  }
  const source = ts.createSourceFile('type.ts', `type T = ${property.type};`, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const type = source.statements[0]?.type;
  if (!type || !ts.isUnionTypeNode(type)) return undefined;
  const values = type.types.filter(item => ![ts.SyntaxKind.UndefinedKeyword, ts.SyntaxKind.NullKeyword].includes(item.kind)).map(item => {
    if (!ts.isLiteralTypeNode(item)) return unknown;
    return staticValue(item.literal).value ?? (item.literal.kind === ts.SyntaxKind.NullKeyword ? null : unknown);
  });
  if (values.length < 2 || values.some(value => value === unknown)) return undefined;
  return values.map(value => ({ label: String(value), value }));
}

function typeShape(type) {
  const source = ts.createSourceFile('type.ts', `type T = ${type};`, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  function shape(node) {
    if (!node) return undefined;
    if (ts.isParenthesizedTypeNode(node) || ts.isTypeOperatorNode(node)) return shape(node.type);
    const kinds = new Map([[ts.SyntaxKind.StringKeyword, 'string'], [ts.SyntaxKind.NumberKeyword, 'number'], [ts.SyntaxKind.BooleanKeyword, 'boolean'], [ts.SyntaxKind.NullKeyword, 'null']]);
    if (kinds.has(node.kind)) return { kind: kinds.get(node.kind) };
    if (ts.isLiteralTypeNode(node)) {
      const value = staticValue(node.literal);
      return value.known ? valueShape(value.value) : undefined;
    }
    if (ts.isArrayTypeNode(node)) return { kind: 'array', ...(shape(node.elementType) ? { items: shape(node.elementType) } : {}) };
    if (ts.isTypeReferenceNode(node) && ['Array', 'ReadonlyArray'].includes(node.typeName.getText())) return { kind: 'array', ...(shape(node.typeArguments?.[0]) ? { items: shape(node.typeArguments[0]) } : {}) };
    if (ts.isUnionTypeNode(node)) {
      const variants = node.types.filter(item => item.kind !== ts.SyntaxKind.UndefinedKeyword).map(shape);
      if (variants.some(item => !item)) return undefined;
      const unique = [...new Map(variants.map(item => [JSON.stringify(item), item])).values()];
      return unique.length > 1 ? { kind: 'union', variants: unique } : unique[0];
    }
    if (ts.isTypeLiteralNode(node)) {
      const properties = {};
      const required = [];
      for (const member of node.members) {
        if (!ts.isPropertySignature(member) || !member.name || ts.isComputedPropertyName(member.name)) continue;
        const item = shape(member.type);
        if (item) properties[member.name.text] = item;
        if (!member.questionToken) required.push(member.name.text);
      }
      return { kind: 'object', properties, required };
    }
    return undefined;
  }
  return shape(source.statements[0]?.type);
}

function detailsShape(details) {
  if (!details) return undefined;
  if (details.kind === 'array') {
    const items = details.items?.map(detailsShape).filter(Boolean) ?? [];
    const item = items.length > 1 ? { kind: 'union', variants: items } : items[0];
    return { kind: 'array', ...(item ? { items: item } : {}) };
  }
  if (details.kind === 'union') {
    const variants = details.variants?.map(detailsShape) ?? [];
    // A mapped type alias can contain an object branch that is intentionally not
    // expanded by the API extractor. Constrain this editable JSON to its authored
    // shape instead of accidentally narrowing the API to the remaining scalars.
    if (variants.some(variant => !variant)) return undefined;
    return variants.length > 1 ? { kind: 'union', variants } : variants[0];
  }
  if (details.kind === 'object' && details.fields) return { kind: 'object', properties: Object.fromEntries(details.fields.flatMap(field => {
    const child = detailsShape(field);
    return child ? [[field.name, child]] : [];
  })), required: details.fields.filter(field => field.required).map(field => field.name) };
  return details.type ? typeShape(details.type) : undefined;
}

function controlFor(property, value) {
  const options = propertyOptions(property);
  if (options?.some(option => JSON.stringify(option.value) === JSON.stringify(value))) return { control: 'select', options };
  const declaredShape = typeShape(property.type);
  if (declaredShape?.kind === 'union') return { control: 'json', shape: declaredShape };
  if (typeof value === 'boolean') return { control: 'switch' };
  if (typeof value === 'number') return { control: 'number' };
  if (typeof value === 'string') {
    if (/^#[\da-f]{3,8}$/i.test(value) && /color|colour|tint|background|fill|stroke|accent|surface/i.test(property.name)) return { control: 'color' };
    if (/^@(media|asset|public)\//.test(value) || /^(?:src|image|imageSrc|imageUrl|url|poster|texture|textureUrl|fontUrl)$/.test(property.name)) return { control: 'resource' };
    return { control: 'text' };
  }
  return { control: 'json', shape: detailsShape(property.details) ?? declaredShape ?? valueShape(value) };
}

function fieldAnnotation(annotations, id, scope, name, key) {
  return { ...(annotations?.components?.[id]?.[`${scope}.*`] ?? {}), ...(annotations?.components?.[id]?.[`${scope}.${name}`] ?? {}), ...(annotations?.components?.[id]?.[key] ?? {}) };
}

function fieldFor({ id, target, property, value, scope = 'prop', key, annotations, rebuild }) {
  const annotation = fieldAnnotation(annotations, id, scope, property.name, key ?? `${target}.${property.name}`);
  const field = {
    key: key ?? `${target}.${property.name}`,
    name: property.name,
    label: annotation.label ?? `${labels[property.name] ?? property.name}${target ? ` · ${target}` : ''}`,
    description: [property.description || `传入 ${property.name} 的真实 ${scope === 'state' ? '受控状态' : '属性'}。`, annotation.description].filter(Boolean).join(' '),
    scope,
    ...(target ? { target } : {}),
    ...(target ? { bindings: [{ target, name: property.name }] } : {}),
    type: property.type || typeof value,
    defaultValue: value,
    ...(property.defaultExpression !== undefined ? { upstreamDefault: property.defaultExpression } : {}),
    ...controlFor(property, value),
    advanced: false,
    apply: scope === 'prop' && (rebuild || /^(?:initial|default)[A-Z]/.test(property.name)) ? 'rebuild' : 'live',
    resources: (annotations.resources ?? []).map(option => option.value).filter(resource => resource.startsWith('@asset/')),
  };
  for (const name of ['control', 'min', 'max', 'step', 'unit', 'options', 'shape', 'uniqueBy', 'advanced', 'apply']) if (Object.hasOwn(annotation, name)) field[name] = annotation[name];
  if (field.uniqueBy !== undefined && (typeof field.uniqueBy !== 'string' || !Array.isArray(value) || value.some(item => !item || typeof item !== 'object' || !Object.hasOwn(item, field.uniqueBy)))) {
    throw new Error(`Unique identity annotation must reference a real default item property: ${id}:${field.key}`);
  }
  if (field.control === 'resource' && /^(?:src|image|imageSrc|imageUrl|poster|texture|textureUrl)$/.test(property.name)) {
    const resources = annotations.resources ?? [];
    const available = resources.some(option => option.value === value) ? resources : [{ label: '当前资源', value }, ...resources];
    if (available.length) field.options = available;
  }
  if (field.min !== undefined && typeof value === 'number' && value < field.min) throw new Error(`Default below annotated demo range: ${id}:${field.key}`);
  if (field.max !== undefined && typeof value === 'number' && value > field.max) throw new Error(`Default above annotated demo range: ${id}:${field.key}`);
  return field;
}

function applyEdits(source, edits) {
  let result = source;
  let nextStart = source.length + 1;
  for (const edit of [...edits].sort((a, b) => b.start - a.start || b.end - a.end)) {
    if (edit.end > nextStart) throw new Error('Overlapping demo instrumentation edits');
    result = result.slice(0, edit.start) + edit.text + result.slice(edit.end);
    nextStart = edit.start;
  }
  return result;
}

function referencedStates(expression, stateNames) {
  const found = new Set();
  function visit(node) {
    if (ts.isIdentifier(node) && stateNames.has(node.text) && !(ts.isPropertyAccessExpression(node.parent) && node.parent.name === node)) found.add(node.text);
    ts.forEachChild(node, visit);
  }
  visit(expression);
  return found;
}

function attributeValue(attribute, environment) {
  if (!attribute.initializer) return { known: true, value: true };
  if (ts.isStringLiteral(attribute.initializer)) return { known: true, value: attribute.initializer.text };
  if (ts.isJsxExpression(attribute.initializer)) return staticValue(attribute.initializer.expression, environment);
  return { known: false };
}

function resolveTarget(tag, api) {
  return api.targets?.find(target => target.name === tag) ?? (tag === 'Component' ? { name: tag, componentName: api.componentName, props: api.props, inherited: api.inherited, native: false, sourcePath: api.sourcePath } : null);
}

function nativeControl(node, tag, environment) {
  if (nativeTags.has(tag)) return true;
  if (!['div', 'span'].includes(tag)) return false;
  const role = node.attributes.properties.find(attribute => ts.isJsxAttribute(attribute) && attribute.name.text === 'role');
  return role && ['separator', 'slider', 'spinbutton', 'checkbox', 'radio', 'switch', 'button', 'combobox', 'listbox'].includes(attributeValue(role, environment).value);
}

function normalizeDefault(value) {
  if (typeof value === 'string' && /^https:\/\/(?:images\.unsplash\.com|images\.pexels\.com|picsum\.photos)\//.test(value)) {
    let number = 0;
    for (const character of value) number = (number + character.charCodeAt(0)) % 6;
    return `@media/scene-${number + 1}.svg`;
  }
  if (Array.isArray(value)) return value.map(normalizeDefault);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, normalizeDefault(item)]));
  return value;
}

function referenceNames(file) {
  const names = new Set();
  function visit(node) {
    if (ts.isIdentifier(node)) {
      const parent = node.parent;
      const declaration = (ts.isImportClause(parent) || ts.isNamespaceImport(parent) || ts.isImportSpecifier(parent) || ts.isVariableDeclaration(parent) || ts.isBindingElement(parent) || ts.isParameter(parent) || ts.isFunctionDeclaration(parent) || ts.isTypeAliasDeclaration(parent) || ts.isInterfaceDeclaration(parent) || ts.isPropertySignature(parent) || ts.isPropertyAssignment(parent) || ts.isPropertyAccessExpression(parent) || ts.isJsxAttribute(parent)) && (parent.name === node || parent.propertyName === node);
      if (!declaration) names.add(node.text);
    }
    ts.forEachChild(node, visit);
  }
  visit(file);
  return names;
}

function cleanUsageTemplate(definition, environment) {
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  for (let pass = 0; pass < 8; pass++) {
    const references = referenceNames(parseDemo(renderUsage(definition), definition.demoPath));
    // Attribute markers are placeholders until currentUsage serializes them. The
    // parser can still locate declarations before the JSX return for safe pruning.
    const template = ts.createSourceFile(definition.demoPath, definition.usageTemplate, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const edits = [];
    for (const node of template.statements.filter(ts.isImportDeclaration)) {
      const clause = node.importClause;
      if (!clause) continue;
      const name = clause.name && references.has(clause.name.text) ? clause.name : undefined;
      let named = clause.namedBindings;
      if (named && ts.isNamespaceImport(named) && !references.has(named.name.text)) named = undefined;
      if (named && ts.isNamedImports(named)) {
        const elements = named.elements.filter(element => references.has(element.name.text));
        if (elements.length !== named.elements.length) named = elements.length ? ts.factory.updateNamedImports(named, elements) : undefined;
      }
      if (name === clause.name && named === clause.namedBindings) continue;
      const replacement = name || named ? ts.factory.updateImportDeclaration(node, node.modifiers, ts.factory.updateImportClause(clause, clause.isTypeOnly, name, named), node.moduleSpecifier, node.attributes) : null;
      edits.push({ start: node.getStart(template), end: node.end, text: replacement ? printer.printNode(ts.EmitHint.Unspecified, replacement, template) : '' });
    }
    let demo;
    try { demo = defaultFunction(template); } catch { break; }
    const bindings = new Map([...environment, ...variableBindings(template, demo)]);
    for (const node of [...template.statements, ...demo.body.statements].filter(ts.isVariableStatement)) {
      const declarations = node.declarationList.declarations.filter(declaration => !ts.isIdentifier(declaration.name) || references.has(declaration.name.text) || !declaration.initializer || !staticValue(declaration.initializer, bindings).known);
      if (declarations.length === node.declarationList.declarations.length) continue;
      const replacement = declarations.length ? ts.factory.updateVariableStatement(node, node.modifiers, ts.factory.updateVariableDeclarationList(node.declarationList, declarations)) : null;
      edits.push({ start: node.getStart(template), end: node.end, text: replacement ? printer.printNode(ts.EmitHint.Unspecified, replacement, template) : '' });
    }
    if (!edits.length) break;
    definition.usageTemplate = applyEdits(definition.usageTemplate, edits);
  }
  const template = ts.createSourceFile(definition.demoPath, definition.usageTemplate, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const literalRanges = [];
  function protect(node) {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateExpression(node)) literalRanges.push([node.getStart(template), node.end]);
    else ts.forEachChild(node, protect);
  }
  protect(template);
  // Removing configurable attributes leaves indented empty slots. Trim those
  // formatting artifacts while preserving verbatim code samples in string data.
  definition.usageTemplate = definition.usageTemplate.replace(/[ \t]+(?=\r?$)/gm, (whitespace, offset) => literalRanges.some(([start, end]) => offset >= start && offset < end) ? whitespace : '');
}

function stateOptions(state, bindings, targets) {
  if (state.call.typeArguments?.[0]) {
    const options = propertyOptions({ type: state.call.typeArguments[0].getText() });
    if (options) return options;
  }
  for (const target of targets) {
    const valueAttribute = target.node.attributes.properties.find(attribute => ts.isJsxAttribute(attribute) && controlledProperties.has(attribute.name.text) && ts.isJsxExpression(attribute.initializer) && unwrap(attribute.initializer.expression)?.getText() === state.name);
    if (!valueAttribute) continue;
    const options = target.node.attributes.properties.find(attribute => ts.isJsxAttribute(attribute) && ['options', 'items'].includes(attribute.name.text));
    if (options) {
      const value = attributeValue(options, bindings);
      if (value.known && Array.isArray(value.value) && value.value.length && value.value.every(item => item && typeof item === 'object' && isSerializable(item.value))) {
        return value.value.map(item => ({ label: String(item.label ?? item.value), value: item.value }));
      }
    }
    if (target.tag === 'select' && ts.isJsxElement(target.node.parent)) {
      const values = target.node.parent.children.filter(ts.isJsxElement).filter(child => child.openingElement.tagName.getText() === 'option').flatMap(child => {
        const attribute = child.openingElement.attributes.properties.find(item => ts.isJsxAttribute(item) && item.name.text === 'value');
        if (!attribute) return [];
        const value = attributeValue(attribute, bindings);
        const label = child.children.filter(ts.isJsxText).map(item => item.text.trim()).join(' ');
        return value.known ? [{ label: label || String(value.value), value: value.value }] : [];
      });
      if (values.length) return values;
    }
  }
  return undefined;
}

/** Generate one definition and deterministic instrumentation from its authored snapshot. */
export function parameterizeDemo({ id, name, sourcePath, demoPath, source, api, environment = new Map(), annotations = {}, minHeight = 560, rebuild = false }) {
  if (/\b(?:useDemoConfig|useDemoState)\b/.test(source)) throw new Error(`Canonical source is already instrumented: ${id}. Capture finalized authored demos before generating parameters.`);
  const file = parseDemo(source, demoPath);
  const demo = defaultFunction(file);
  const bindings = new Map([...environment, ...variableBindings(file, demo)]);
  // Imported bindings already own their source environment; local aliases use this scope.
  const states = [];
  for (const statement of demo.body.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      const call = unwrap(declaration.initializer);
      if (!ts.isArrayBindingPattern(declaration.name) || !call || !ts.isCallExpression(call) || call.expression.getText() !== 'useState' || !call.arguments.length) continue;
      const first = declaration.name.elements[0];
      if (!first || !ts.isBindingElement(first) || !ts.isIdentifier(first.name) || transientNames.test(first.name.text)) continue;
      const resolved = staticValue(call.arguments[0], bindings);
      if (resolved.known) states.push({ name: first.name.text, call, initial: call.arguments[0], value: resolved.value });
    }
  }
  const stateNames = new Set(states.map(state => state.name));
  const controlled = new Set();
  const stateBindings = new Map();
  const targets = [];
  function visit(node) {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName.getText(file);
      const targetApi = resolveTarget(tag, api);
      if (targetApi && (targetApi.native ? nativeControl(node, tag, bindings) : /^[A-Z]/.test(tag)) && !['BusinessDemo', 'DemoPanel', 'DemoNotice', 'ExampleContent'].includes(tag)) {
        const target = { id: `t${targets.length}`, tag, node, api: targetApi };
        targets.push(target);
        for (const attribute of node.attributes.properties) {
          if (!ts.isJsxAttribute(attribute) || !controlledProperties.has(attribute.name.text) || !attribute.initializer || !ts.isJsxExpression(attribute.initializer) || !attribute.initializer.expression) continue;
          for (const state of referencedStates(attribute.initializer.expression, stateNames)) {
            controlled.add(state);
            const bindings = stateBindings.get(state) ?? [];
            if (!bindings.some(binding => binding.target === target.id && binding.name === attribute.name.text)) bindings.push({ target: target.id, name: attribute.name.text });
            stateBindings.set(state, bindings);
          }
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(demo.body);
  const runtimeEdits = [];
  const usageEdits = [];
  const fields = [];
  const publicTargets = [];
  let configurableTargets = 0;
  const resourceAliases = [];
  for (const target of targets.filter(item => !item.api.native)) {
    for (const attribute of target.node.attributes.properties) {
      if (!ts.isJsxAttribute(attribute) || !/^(?:src|image|imageSrc|imageUrl)$/.test(attribute.name.text) || !ts.isJsxExpression(attribute.initializer) || !attribute.initializer.expression) continue;
      const resolved = attributeValue(attribute, bindings);
      if (resolved.known && typeof resolved.value === 'string' && /^@asset\//.test(resolved.value)) resourceAliases.push({ expression: attribute.initializer.expression.getText(file), value: resolved.value, key: `${target.id}.${attribute.name.text}`, target: target.id, name: attribute.name.text });
    }
  }
  for (const target of targets) {
    publicTargets.push({ id: target.id, name: `${target.api.componentName ?? target.tag}${targets.filter(item => item.tag === target.tag).length > 1 ? ` · ${target.id}` : ''}`, ...(target.api.sourcePath ? { sourcePath: target.api.sourcePath } : {}), props: target.api.props ?? [], inherited: target.api.inherited ?? [] });
    const props = new Map(target.api.props?.map(property => [property.name, property]) ?? []);
    const ownFields = [];
    const seen = new Set();
    for (const attribute of target.node.attributes.properties) {
      if (!ts.isJsxAttribute(attribute)) continue;
      const propName = attribute.name.text;
      const property = props.get(propName);
      seen.add(propName);
      // Derived data stays in the authored expression and complete API table.
      // Overriding a pager total separately from its dataset would split one view.
      if (fieldAnnotation(annotations, id, 'prop', propName, `${target.id}.${propName}`).editable === false) continue;
      if (!property || nonEditableProperties.test(propName) || codeOnlyProperty(property)) continue;
      const alias = target.tag === 'img' && propName === 'src' && ts.isJsxExpression(attribute.initializer) && resourceAliases.find(item => item.expression === attribute.initializer.expression?.getText(file));
      if (alias) {
        const expression = attribute.initializer.expression;
        runtimeEdits.push({ start: expression.getStart(file), end: expression.end, text: `String(demoProps('${alias.target}').${alias.name} ?? ${expression.getText(file)})` });
        usageEdits.push({ start: expression.getStart(file), end: expression.end, text: `/*__AW_VALUE_${alias.key}__*/` });
        continue;
      }
      const resolved = attributeValue(attribute, bindings);
      if (!resolved.known) continue;
      const field = fieldFor({ id, target: target.id, property, value: resolved.value, annotations, rebuild: rebuild || resourceAliases.some(alias => alias.key === `${target.id}.${propName}`) });
      ownFields.push(field);
      usageEdits.push({ start: attribute.getStart(file), end: attribute.end, text: '' });
    }
    // The real imported component's optional literal defaults complete the panel.
    // Native inherited signatures remain documented, but receive no invented defaults.
    if (!target.api.native) {
      for (const property of target.api.props ?? []) {
        if (fieldAnnotation(annotations, id, 'prop', property.name, `${target.id}.${property.name}`).editable === false) continue;
        if (seen.has(property.name) || property.required || nonEditableProperties.test(property.name) || codeOnlyProperty(property) || (property.inheritedFrom && !property.defaultSource) || !Object.hasOwn(property, 'defaultValue') || !isSerializable(property.defaultValue)) continue;
        if (/^default[A-Z]/.test(property.name) && seen.has(property.name[7].toLowerCase() + property.name.slice(8))) continue;
        if (/^initial[A-Z]/.test(property.name) && ['value', 'checked', 'index', 'activeIndex', 'selectedIndex'].some(name => seen.has(name))) continue;
        if (property.defaultValue === null && !/\bnull\b/.test(property.type)) continue;
        ownFields.push(fieldFor({ id, target: target.id, property, value: normalizeDefault(property.defaultValue), annotations, rebuild }));
      }
    }
    if (!ownFields.length) continue;
    configurableTargets++;
    fields.push(...ownFields);
    const position = target.node.attributes.end;
    runtimeEdits.push({ start: position, end: position, text: ` {...demoProps('${target.id}')}` });
    usageEdits.push({ start: position, end: position, text: ` /*__AW_PROPS_${target.id}__*/ ` });
  }
  for (const state of states.filter(item => controlled.has(item.name))) {
    if (fieldAnnotation(annotations, id, 'state', state.name, `state.${state.name}`).editable === false) continue;
    const type = state.call.typeArguments?.[0]?.getText() ?? (Array.isArray(state.value) ? 'array' : typeof state.value);
    const property = { name: state.name, type, description: `示例的受控状态 ${state.name}；面板与组件的原有回调同步更新。`, options: stateOptions(state, bindings, targets) };
    const field = fieldFor({ id, property, value: state.value, scope: 'state', key: `state.${state.name}`, annotations, rebuild: false });
    field.bindings = stateBindings.get(state.name) ?? [];
    if (typeof state.value === 'number') {
      for (const target of targets) {
        const valueAttribute = target.node.attributes.properties.find(attribute => ts.isJsxAttribute(attribute) && ['value', 'aria-valuenow'].includes(attribute.name.text) && ts.isJsxExpression(attribute.initializer) && unwrap(attribute.initializer.expression)?.getText() === state.name);
        if (!valueAttribute) continue;
        for (const name of ['min', 'max', 'step']) {
          const attribute = target.node.attributes.properties.find(item => ts.isJsxAttribute(item) && item.name.text === (valueAttribute.name.text === 'aria-valuenow' ? `aria-value${name}` : name));
          const resolved = attribute && attributeValue(attribute, bindings);
          if (resolved?.known && (typeof resolved.value === 'number' || /^-?\d+(?:\.\d+)?$/.test(resolved.value))) field[name] = Number(resolved.value);
        }
        if (target.tag === 'progress' && field.min === undefined) field.min = 0;
        if (field.min !== undefined || field.max !== undefined) field.description += ' 数值边界与示例中原生控件的 min/max 属性一致。';
        if (target.tag === 'input' && target.node.attributes.properties.some(attribute => ts.isJsxAttribute(attribute) && attribute.name.text === 'type' && attributeValue(attribute, bindings).value === 'range')) field.control = 'range';
      }
    }
    if (Array.isArray(state.value) && !state.value.length && /^(?:string|number|boolean)\[\]$/.test(type)) field.shape = { kind: 'array', items: { kind: type.slice(0, -2) } };
    fields.push(field);
    runtimeEdits.push({ start: state.call.expression.getStart(file), end: state.call.expression.end, text: 'useDemoState' });
    runtimeEdits.push({ start: state.initial.getStart(file), end: state.initial.getStart(file), text: `'state.${state.name}', ` });
    usageEdits.push({ start: state.initial.getStart(file), end: state.initial.end, text: `/*__AW_STATE_state.${state.name}__*/` });
  }
  const annotationFor = field => ({ ...(annotations?.components?.[id]?.[`${field.scope}.${field.name}`] ?? {}), ...(annotations?.components?.[id]?.[field.key] ?? {}) });
  const priority = field => annotationFor(field).commonPriority ?? (field.scope === 'state' ? 0 : /^(?:text|texts|label|title|color|colorStops|speed|delay|duration|size|height|fontSize|value|checked|options|images|src|imageSrc|gridSize|gap|chaos|velocity|rotationInterval|maxAge)$/.test(field.name) ? 1 : 2);
  const common = new Set([...fields].sort((a, b) => priority(a) - priority(b)).slice(0, 7).map(field => field.key));
  fields.forEach(field => { if (!Object.hasOwn(annotationFor(field), 'advanced')) field.advanced = !common.has(field.key); });
  fields.push({ key: 'container.height', name: 'height', label: '预览框高度', description: '宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。', scope: 'container', type: 'number', defaultValue: Math.max(320, Math.min(1200, minHeight)), control: 'range', min: 320, max: 1200, step: 10, unit: 'px', advanced: false, apply: 'live' });
  const usesState = fields.some(field => field.scope === 'state');
  if (configurableTargets || usesState) {
    const imports = [configurableTargets ? 'useDemoConfig' : '', usesState ? 'useDemoState' : ''].filter(Boolean).join(', ');
    const modulePath = path.posix.relative(path.posix.dirname(demoPath), 'src/parameters/DemoConfig');
    const importSpecifier = modulePath.startsWith('.') ? modulePath : `./${modulePath}`;
    const lastImport = file.statements.filter(ts.isImportDeclaration).at(-1);
    runtimeEdits.push({ start: lastImport?.end ?? 0, end: lastImport?.end ?? 0, text: `\nimport { ${imports} } from '${importSpecifier}';` });
    if (configurableTargets) runtimeEdits.push({ start: demo.body.getStart(file) + 1, end: demo.body.getStart(file) + 1, text: "\n  const { props: demoProps } = useDemoConfig();" });
  }
  const instrumented = applyEdits(source, runtimeEdits);
  parseDemo(instrumented, demoPath);
  const definition = { version: 1, id, name, sourcePath, demoPath, fields, props: api.props ?? [], inherited: api.inherited ?? [], usageTemplate: applyEdits(source, usageEdits), targets: publicTargets };
  for (const key of ['apiScope', 'indexSignatures', 'notes']) if (Object.hasOwn(api, key)) definition[key] = api[key];
  cleanUsageTemplate(definition, bindings);
  parseDemo(renderUsage(definition), demoPath);
  return { definition, instrumented };
}

function jsonLiteral(value) {
  const templatePath = pathname => pathname.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
  if (typeof value === 'string' && value.startsWith('@media/')) return '`' + '${import.meta.env.BASE_URL}' + templatePath(value.slice(1)) + '`';
  if (typeof value === 'string' && value.startsWith('@public/')) return '`' + '${import.meta.env.BASE_URL}' + templatePath(value.slice('@public/'.length)) + '`';
  if (typeof value === 'string' && value.startsWith('@asset/')) throw new Error('Asset literal requires a demo path');
  if (Array.isArray(value)) return `[${value.map(jsonLiteral).join(', ')}]`;
  if (value && typeof value === 'object') return `{ ${Object.entries(value).map(([key, item]) => `${JSON.stringify(key)}: ${jsonLiteral(item)}`).join(', ')} }`;
  return JSON.stringify(value);
}

/** Node-side equivalent used to verify generated copyable TSX independently of the UI. */
export function renderUsage(definition, values = {}) {
  let source = definition.usageTemplate;
  function literal(value) {
    if (typeof value === 'string' && value.startsWith('@asset/')) {
      const assetPath = `src/assets/${value.slice('@asset/'.length)}`;
      const relative = path.posix.relative(path.posix.dirname(definition.demoPath), assetPath);
      return `new URL(${JSON.stringify(relative.startsWith('.') ? relative : `./${relative}`)}, import.meta.url).href`;
    }
    if (Array.isArray(value)) return `[${value.map(literal).join(', ')}]`;
    if (value && typeof value === 'object') return `{ ${Object.entries(value).map(([key, item]) => `${JSON.stringify(key)}: ${literal(item)}`).join(', ')} }`;
    return jsonLiteral(value);
  }
  for (const target of definition.targets) {
    const attrs = definition.fields.filter(field => field.scope === 'prop' && field.target === target.id).map(field => `${field.name}={${literal(Object.hasOwn(values, field.key) ? values[field.key] : field.defaultValue)}}`).join(' ');
    source = source.replace(`/*__AW_PROPS_${target.id}__*/`, () => attrs);
  }
  for (const field of definition.fields) {
    const value = literal(Object.hasOwn(values, field.key) ? values[field.key] : field.defaultValue);
    source = source.replaceAll(`/*__AW_VALUE_${field.key}__*/`, () => value);
    if (field.scope === 'state') source = source.replace(`/*__AW_STATE_${field.key}__*/`, () => value);
  }
  if (/\/\*__AW_(?:PROPS|STATE|VALUE)_/.test(source)) throw new Error(`Unresolved usage template marker: ${definition.id}`);
  return source;
}
