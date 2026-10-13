import path from 'node:path';
import ts from 'typescript';

export const REACT_NATIVE_REFERENCE = 'https://react.dev/reference/react-dom/components/common';
export const MDN_NATIVE_REFERENCE = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes';
const typeFlags = ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope;
const compact = text => text.trim().replace(/\s+/g, ' ');
const relative = (root, file) => path.relative(root, file).split(path.sep).join('/');
const isReactDeclaration = node => /[/\\]node_modules[/\\]@types[/\\]react[/\\]/.test(node.getSourceFile().fileName);

export function createExtractionProgram(files, root, { sourceOverrides = new Map() } = {}) {
  const options = {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    jsx: ts.JsxEmit.ReactJSX,
    lib: ['lib.es2022.d.ts', 'lib.dom.d.ts', 'lib.dom.iterable.d.ts'],
    skipLibCheck: true,
    strict: true,
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    noEmit: true,
    resolveJsonModule: true,
  };
  const host = ts.createCompilerHost(options);
  host.getCurrentDirectory = () => root;
  const readOriginal = host.readFile.bind(host);
  host.readFile = file => sourceOverrides.get(path.resolve(file)) ?? readOriginal(file);
  return ts.createProgram([...new Set(files)], options, host);
}

function unalias(checker, symbol) {
  return symbol?.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
}

function resolveExpression(checker, node, seen = new Set()) {
  if (!node || seen.has(node)) return undefined;
  seen.add(node);
  if (ts.isFunctionDeclaration(node) || ts.isArrowFunction(node) || ts.isFunctionExpression(node)) return node;
  if (ts.isVariableDeclaration(node)) return resolveExpression(checker, node.initializer, seen);
  if (ts.isExportAssignment(node)) return resolveExpression(checker, node.expression, seen);
  if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node)) return resolveExpression(checker, node.expression, seen);
  if (ts.isCallExpression(node)) {
    // React wrappers keep the implementation in their first argument. Resolving
    // that implementation also recovers defaults hidden by an FC annotation.
    for (const argument of node.arguments) {
      const result = resolveExpression(checker, argument, seen);
      if (result) return result;
    }
  }
  if (ts.isIdentifier(node) || ts.isPropertyAccessExpression(node)) {
    const symbol = unalias(checker, checker.getSymbolAtLocation(node));
    for (const declaration of symbol?.declarations ?? []) {
      const result = resolveExpression(checker, declaration, seen);
      if (result) return result;
    }
  }
  return undefined;
}

export function exportedComponent(program, file, exportName = 'default') {
  const source = program.getSourceFile(file);
  if (!source) throw new Error(`Source is not in extraction program: ${file}`);
  const checker = program.getTypeChecker();
  const moduleSymbol = checker.getSymbolAtLocation(source);
  const symbol = unalias(checker, checker.getExportsOfModule(moduleSymbol).find(symbol => symbol.name === exportName));
  if (!symbol) throw new Error(`Missing ${exportName} export in ${file}`);
  const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];
  const type = checker.getTypeOfSymbolAtLocation(symbol, declaration ?? source);
  const signature = checker.getSignaturesOfType(type, ts.SignatureKind.Call)[0];
  const implementation = resolveExpression(checker, declaration);
  const parameter = signature?.parameters[0];
  const propsType = parameter ? checker.getTypeOfSymbolAtLocation(parameter, signature.declaration ?? source) : undefined;
  return { checker, source, symbol, declaration, implementation, propsType, exportName };
}

function unwrap(node) {
  while (node && (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isNonNullExpression(node))) node = node.expression;
  return node;
}

/** Interpret literal syntax only. Never evaluate component code or call helpers. */
export function literalValue(node, checker, seen = new Set()) {
  node = unwrap(node);
  if (!node || seen.has(node)) return { serializable: false };
  seen = new Set([...seen, node]);
  if (ts.isStringLiteralLike(node)) return { serializable: true, value: node.text };
  if (ts.isNumericLiteral(node)) return { serializable: true, value: Number(node.text) };
  if (node.kind === ts.SyntaxKind.TrueKeyword) return { serializable: true, value: true };
  if (node.kind === ts.SyntaxKind.FalseKeyword) return { serializable: true, value: false };
  if (node.kind === ts.SyntaxKind.NullKeyword) return { serializable: true, value: null };
  if (ts.isPrefixUnaryExpression(node)) {
    const result = literalValue(node.operand, checker, seen);
    if (result.serializable && typeof result.value === 'number') {
      if (node.operator === ts.SyntaxKind.MinusToken) return { serializable: true, value: -result.value };
      if (node.operator === ts.SyntaxKind.PlusToken) return result;
    }
  }
  if (ts.isArrayLiteralExpression(node)) {
    const items = [];
    for (const element of node.elements) {
      const result = literalValue(ts.isSpreadElement(element) ? element.expression : element, checker, seen);
      if (!result.serializable) return { serializable: false };
      if (ts.isSpreadElement(element)) {
        if (!Array.isArray(result.value)) return { serializable: false };
        items.push(...result.value);
      } else items.push(result.value);
    }
    return { serializable: true, value: items };
  }
  if (ts.isObjectLiteralExpression(node)) {
    const result = {};
    for (const property of node.properties) {
      if (ts.isSpreadAssignment(property)) {
        const spread = literalValue(property.expression, checker, seen);
        if (!spread.serializable || !spread.value || Array.isArray(spread.value) || typeof spread.value !== 'object') return { serializable: false };
        Object.assign(result, spread.value);
      } else if (ts.isPropertyAssignment(property) || ts.isShorthandPropertyAssignment(property)) {
        if (ts.isComputedPropertyName(property.name)) return { serializable: false };
        const name = property.name.text;
        const item = literalValue(ts.isPropertyAssignment(property) ? property.initializer : property.name, checker, seen);
        if (!item.serializable) return { serializable: false };
        Object.defineProperty(result, name, { value: item.value, enumerable: true, configurable: true, writable: true });
      } else return { serializable: false };
    }
    return { serializable: true, value: result };
  }
  if (ts.isIdentifier(node) && checker) {
    const symbol = unalias(checker, checker.getSymbolAtLocation(node));
    for (const declaration of symbol?.declarations ?? []) {
      if (ts.isVariableDeclaration(declaration) && declaration.initializer && declaration.parent.flags & ts.NodeFlags.Const) return literalValue(declaration.initializer, checker, seen);
    }
  }
  return { serializable: false };
}

function defaultRecord(expression, checker, root, kind = 'parameter') {
  const literal = literalValue(expression, checker);
  const record = {
    defaultExpression: expression.getText(),
    defaultSource: { path: relative(root, expression.getSourceFile().fileName), line: expression.getSourceFile().getLineAndCharacterOfPosition(expression.getStart()).line + 1, kind },
  };
  if (literal.serializable) record.defaultValue = literal.value;
  if (ts.isIdentifier(unwrap(expression))) {
    const symbol = unalias(checker, checker.getSymbolAtLocation(unwrap(expression)));
    const declaration = symbol?.declarations?.find(node => ts.isVariableDeclaration(node) && node.initializer);
    if (declaration) record.defaultResolvedExpression = declaration.initializer.getText();
  }
  return record;
}

function parameterBindings(component) {
  const names = new Map();
  const parameter = component.implementation?.parameters[0];
  const collect = pattern => {
    if (!pattern || !ts.isObjectBindingPattern(pattern)) return;
    for (const element of pattern.elements) {
      if (!element.dotDotDotToken && ts.isIdentifier(element.name)) names.set(element.propertyName?.text ?? element.name.text, element);
    }
  };
  collect(parameter?.name);
  if (parameter && ts.isIdentifier(parameter.name)) {
    const symbol = component.checker.getSymbolAtLocation(parameter.name);
    const visit = node => {
      if (ts.isVariableDeclaration(node) && ts.isObjectBindingPattern(node.name) && node.initializer) {
        const expression = unwrap(node.initializer);
        if (ts.isIdentifier(expression) && component.checker.getSymbolAtLocation(expression) === symbol) collect(node.name);
      }
      ts.forEachChild(node, visit);
    };
    if (component.implementation.body) visit(component.implementation.body);
  }
  return names;
}

function visitImplementationTypeSyntax(component, visit) {
  visit(component.implementation?.parameters[0]?.type);
  if (ts.isVariableDeclaration(component.declaration ?? {})) visit(component.declaration.type);
  let node = component.implementation;
  while (node && !ts.isSourceFile(node)) {
    if (ts.isVariableDeclaration(node)) visit(node.type);
    if (ts.isCallExpression(node)) for (const argument of node.typeArguments ?? []) visit(argument);
    node = node.parent;
  }
}

function publicPropNames(component) {
  const names = new Set();
  const seen = new Set();
  const visit = node => {
    if (!node || seen.has(node)) return;
    seen.add(node);
    if (ts.isTypeLiteralNode(node) || ts.isInterfaceDeclaration(node)) {
      for (const member of node.members) if ((ts.isPropertySignature(member) || ts.isMethodSignature(member)) && member.name) names.add(member.name.getText().replace(/^['"]|['"]$/g, ''));
      if (ts.isInterfaceDeclaration(node)) for (const clause of node.heritageClauses ?? []) clause.types.forEach(visit);
    } else if (ts.isTypeAliasDeclaration(node)) visit(node.type);
    else if (ts.isIntersectionTypeNode(node) || ts.isUnionTypeNode(node)) node.types.forEach(visit);
    else if (ts.isParenthesizedTypeNode(node)) visit(node.type);
    else if (ts.isTypeReferenceNode(node) || ts.isExpressionWithTypeArguments(node)) {
      const symbol = unalias(component.checker, component.checker.getSymbolAtLocation(node.typeName ?? node.expression));
      for (const declaration of symbol?.declarations ?? []) {
        if (!/[/\\]node_modules[/\\]/.test(declaration.getSourceFile().fileName)) visit(declaration);
      }
      for (const argument of node.typeArguments ?? []) visit(argument);
    }
  };
  visitImplementationTypeSyntax(component, visit);
  const visitedTypes = new Set();
  const visitType = type => {
    if (!type || visitedTypes.has(type)) return;
    visitedTypes.add(type);
    for (const member of type.types ?? []) visitType(member);
    for (const declaration of type.aliasSymbol?.declarations ?? type.symbol?.declarations ?? []) {
      if (!/[/\\]node_modules[/\\]/.test(declaration.getSourceFile().fileName)) visit(declaration);
    }
  };
  visitType(component.propsType);
  return names;
}

function getDefaults(component, root, bindings) {
  const defaults = new Map();
  for (const [name, binding] of bindings) {
    if (binding.initializer) defaults.set(name, defaultRecord(binding.initializer, component.checker, root));
  }
  const componentNames = new Set([component.symbol.name, component.implementation?.name?.text].filter(Boolean));
  for (const statement of component.source.statements) {
    if (!ts.isExpressionStatement(statement) || !ts.isBinaryExpression(statement.expression)) continue;
    const { left, right } = statement.expression;
    if (ts.isPropertyAccessExpression(left) && componentNames.has(left.expression.getText()) && left.name.text === 'defaultProps' && ts.isObjectLiteralExpression(right)) {
      for (const property of right.properties) {
        if (ts.isPropertyAssignment(property)) defaults.set(property.name.text, defaultRecord(property.initializer, component.checker, root, 'defaultProps'));
      }
    }
  }
  // A named config object is only a default when the implementation actually
  // merges it before the incoming props. Merely resembling a Props interface
  // does not make an internal settings object a public API.
  if (component.implementation?.body) {
    const bodyText = component.implementation.body.getText();
    for (const statement of component.source.statements) {
      if (!ts.isVariableStatement(statement)) continue;
      for (const declaration of statement.declarationList.declarations) {
        if (!ts.isIdentifier(declaration.name) || !/^(?:DEFAULT_CONFIG|defaultConfig|defaults)$/.test(declaration.name.text) || !ts.isObjectLiteralExpression(declaration.initializer ?? {})) continue;
        const escaped = declaration.name.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        if (!new RegExp(`(?:mergeConfigs\\(\\s*${escaped}\\b|\\.\\.\\.${escaped}\\b)`).test(bodyText)) continue;
        for (const property of declaration.initializer.properties) {
          if (ts.isPropertyAssignment(property) && !defaults.has(property.name.text)) defaults.set(property.name.text, defaultRecord(property.initializer, component.checker, root, 'merged-config'));
        }
      }
    }
    const symbols = new Map([...bindings].map(([name, binding]) => [component.checker.getSymbolAtLocation(binding.name), name]));
    const parameter = component.implementation.parameters[0];
    const propsSymbol = parameter && ts.isIdentifier(parameter.name) ? component.checker.getSymbolAtLocation(parameter.name) : undefined;
    const propName = node => {
      node = unwrap(node);
      if (node && ts.isIdentifier(node)) return symbols.get(component.checker.getSymbolAtLocation(node));
      if (node && ts.isPropertyAccessExpression(node) && propsSymbol && ts.isIdentifier(node.expression) && component.checker.getSymbolAtLocation(node.expression) === propsSymbol) return node.name.text;
      return undefined;
    };
    const fallback = (name, expression, condition) => {
      if (!name || defaults.has(name)) return;
      const record = { ...defaultRecord(expression, component.checker, root, 'implementation-fallback'), defaultCondition: condition };
      const property = component.propsType?.getProperty(name);
      const propertyType = property && component.checker.getTypeOfSymbolAtLocation(property, component.declaration ?? component.source);
      const expressionType = component.checker.getTypeAtLocation(expression);
      if (propertyType && !component.checker.isTypeAssignableTo(expressionType, propertyType)) {
        // A renderer may normalize a missing URL or array to null internally.
        // That internal sentinel is not a valid value for its public Prop.
        delete record.defaultValue;
        record.defaultAcceptsAsProp = false;
      }
      defaults.set(name, record);
    };
    const visit = node => {
      if (ts.isBinaryExpression(node) && [ts.SyntaxKind.QuestionQuestionToken, ts.SyntaxKind.BarBarToken].includes(node.operatorToken.kind)) fallback(propName(node.left), node.right, node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken ? 'nullish' : 'falsy');
      else if (ts.isConditionalExpression(node) && propName(node.condition) && propName(node.whenTrue) === propName(node.condition)) fallback(propName(node.condition), node.whenFalse, 'falsy');
      ts.forEachChild(node, visit);
    };
    visit(component.implementation.body);
  }
  return defaults;
}

function sourceEnumOptions(node, checker, seen = new Set()) {
  if (!node || seen.has(node)) return undefined;
  seen.add(node);
  if (ts.isUnionTypeNode(node)) {
    const values = node.types.map(type => sourceEnumOptions(type, checker, seen));
    return values.every(value => value !== undefined) ? values.flat() : undefined;
  }
  if (ts.isLiteralTypeNode(node)) {
    const literal = literalValue(node.literal, checker);
    return literal.serializable ? [literal.value] : undefined;
  }
  if (ts.isParenthesizedTypeNode(node)) return sourceEnumOptions(node.type, checker, seen);
  if (ts.isTypeReferenceNode(node)) {
    const symbol = unalias(checker, checker.getSymbolAtLocation(node.typeName));
    const declaration = symbol?.declarations?.find(ts.isTypeAliasDeclaration);
    if (declaration) return sourceEnumOptions(declaration.type, checker, seen);
  }
  return undefined;
}

function reactTypeReference(type) {
  return {
    type,
    reference: REACT_NATIVE_REFERENCE,
    mdnReference: MDN_NATIVE_REFERENCE,
    description: '继承该 React 原生属性类型的字段与事件；具体约束以安装的 @types/react 及原生元素语义为准。',
  };
}

function inheritedTypes(component, root) {
  const inherited = new Map();
  const seen = new Set();
  const visit = node => {
    if (!node || seen.has(node)) return;
    seen.add(node);
    if (ts.isTypeReferenceNode(node) || ts.isExpressionWithTypeArguments(node)) {
      const name = node.typeName?.getText() ?? node.expression?.getText();
      if (/^(?:React\.)?(?:FC|FunctionComponent|ForwardRefExoticComponent|MemoExoticComponent|NamedExoticComponent)$/.test(name)) {
        for (const argument of node.typeArguments ?? []) visit(argument);
        return;
      }
      if (/^(?:React\.)?(?:(?:\w+HTML|HTML|SVG|DOM|Aria)Attributes|ComponentProps(?:WithRef|WithoutRef)?|PropsWithChildren|RefAttributes|ClassAttributes)$/.test(name)) {
        inherited.set(node.getText(), reactTypeReference(node.getText()));
        return;
      }
      if (['Omit', 'Pick', 'Partial', 'Required', 'PropsWithoutRef'].includes(name)) {
        const before = new Set(inherited.keys());
        visit(node.typeArguments?.[0]);
        for (const [key, value] of [...inherited]) {
          if (!before.has(key)) {
            inherited.delete(key);
            inherited.set(node.getText(), { ...value, type: node.getText() });
          }
        }
        return;
      }
      const symbol = unalias(component.checker, component.checker.getSymbolAtLocation(node.typeName ?? node.expression));
      for (const declaration of symbol?.declarations ?? []) {
        if (ts.isTypeParameterDeclaration(declaration)) continue;
        if (isReactDeclaration(declaration)) {
          inherited.set(node.getText(), reactTypeReference(node.getText()));
        } else if (/[/\\]node_modules[/\\]/.test(declaration.getSourceFile().fileName)) {
          inherited.set(node.getText(), { type: node.getText(), reference: relative(root, declaration.getSourceFile().fileName), description: '继承安装依赖中的属性契约，当前版本以锁文件和该类型声明为准。' });
        } else {
          if (ts.isInterfaceDeclaration(declaration)) {
            for (const clause of declaration.heritageClauses ?? []) for (const type of clause.types) visit(type);
          } else if (ts.isTypeAliasDeclaration(declaration)) visit(declaration.type);
        }
      }
      // FC<Props> and forwardRef<Handle, Props> have the Props syntax in their
      // arguments. Visiting them does not enumerate DOM fields.
      for (const argument of node.typeArguments ?? []) visit(argument);
    } else if (ts.isIntersectionTypeNode(node) || ts.isUnionTypeNode(node)) node.types.forEach(visit);
    else if (ts.isParenthesizedTypeNode(node)) visit(node.type);
  };
  visitImplementationTypeSyntax(component, visit);
  const visitedTypes = new Set();
  const visitType = type => {
    if (!type || visitedTypes.has(type)) return;
    visitedTypes.add(type);
    for (const member of type.types ?? []) visitType(member);
    for (const declaration of type.aliasSymbol?.declarations ?? type.symbol?.declarations ?? []) {
      if (/[/\\]node_modules[/\\]/.test(declaration.getSourceFile().fileName)) continue;
      if (ts.isInterfaceDeclaration(declaration)) for (const clause of declaration.heritageClauses ?? []) clause.types.forEach(visit);
      else if (ts.isTypeAliasDeclaration(declaration)) visit(declaration.type);
    }
  };
  visitType(component.propsType);
  const initializer = component.declaration?.initializer;
  if (initializer && ts.isCallExpression(initializer)) for (const argument of initializer.typeArguments ?? []) visit(argument);
  const properties = component.propsType?.getProperties() ?? [];
  if (properties.some(property => property.name === 'ref' && property.declarations?.some(isReactDeclaration)) && ![...inherited.keys()].some(type => /RefAttributes/.test(type))) {
    const declaration = properties.find(property => property.name === 'ref').declarations.find(isReactDeclaration);
    const refType = component.checker.typeToString(component.checker.getTypeOfSymbolAtLocation(properties.find(property => property.name === 'ref'), declaration), declaration, typeFlags);
    inherited.set(refType, { ...reactTypeReference(refType), description: '组件由 forwardRef 暴露的 ref；句柄类型按签名传递，React 特殊属性不作为普通文本配置。' });
  }
  return [...inherited.values()];
}

function declaredType(property, checker, location) {
  const declaration = property.declarations?.find(node => node.type) ?? property.valueDeclaration;
  const type = checker.getTypeOfSymbolAtLocation(property, declaration ?? location);
  const typeText = declaration && !/[/\\]node_modules[/\\]/.test(declaration.getSourceFile().fileName) ? declaration.type?.getText() ?? checker.typeToString(type, declaration, typeFlags) : checker.typeToString(type, location, typeFlags);
  return { declaration, type, typeText: compact(typeText) };
}

function typeDescription(type, checker, location, depth = 0, seen = new Set()) {
  const text = checker.typeToString(type, location, typeFlags);
  if (depth > 2 || seen.has(type) || /^\w*CSSProperties$|^(?:React\.)?(?:ReactNode|ReactElement)|Ref(?:Object)?</.test(text)) return undefined;
  const members = type.isUnion() ? type.types.filter(item => !(item.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null))) : [type];
  if (members.every(item => item.flags & (ts.TypeFlags.StringLiteral | ts.TypeFlags.NumberLiteral | ts.TypeFlags.BooleanLiteral))) return { kind: 'enum', options: members.map(item => item.value ?? (item.intrinsicName === 'true')) };
  const nonNullable = checker.getNonNullableType(type);
  if (checker.isArrayType(nonNullable) || checker.isTupleType(nonNullable)) {
    const itemTypes = checker.getTypeArguments(nonNullable);
    return { kind: checker.isTupleType(nonNullable) ? 'tuple' : 'array', items: itemTypes.map(item => ({ type: checker.typeToString(item, location, typeFlags), ...(typeDescription(item, checker, location, depth + 1, new Set([...seen, type])) ?? {}) })) };
  }
  if (members.length > 1) return { kind: 'union', variants: members.map(item => ({ type: checker.typeToString(item, location, typeFlags), ...(typeDescription(item, checker, location, depth + 1, new Set([...seen, type])) ?? {}) })) };
  if (checker.getSignaturesOfType(nonNullable, ts.SignatureKind.Call).length) return { kind: 'callback', signature: text };
  const properties = nonNullable.getProperties();
  if (nonNullable.flags & ts.TypeFlags.Object && properties.length && properties.length <= 35 && !/node_modules/.test(nonNullable.symbol?.declarations?.[0]?.getSourceFile().fileName ?? '')) {
    return { kind: 'object', fields: properties.map(property => {
      const value = declaredType(property, checker, location);
      return { name: property.name, type: value.typeText, required: !(property.flags & ts.SymbolFlags.Optional), ...(typeDescription(value.type, checker, value.declaration ?? location, depth + 1, new Set([...seen, type])) ?? {}) };
    }) };
  }
  return undefined;
}

function controlForProp(name, type, checker, location, defaultValue) {
  const text = checker.typeToString(type, location, typeFlags);
  const nonNullable = checker.getNonNullableType(type);
  const members = nonNullable.isUnion() ? nonNullable.types : [nonNullable];
  if (/(?:Ref|RefObject)<|(?:^|\W)ref(?:$|\W)/i.test(text) || /Ref$/.test(name)) return { control: 'code', valueKind: 'ref', editable: false };
  if (checker.getSignaturesOfType(nonNullable, ts.SignatureKind.Call).length || /=>|Handler\b/.test(text)) return { control: 'code', valueKind: 'callback', editable: false };
  if (/ReactNode|ReactElement|JSX\.Element/.test(text) && name !== 'children') return { control: 'code', valueKind: 'react-node', editable: false };
  if (name === 'children' && !members.every(member => member.flags & ts.TypeFlags.StringLike)) return { control: 'code', valueKind: 'react-node', editable: false };
  if (members.every(member => member.flags & (ts.TypeFlags.Boolean | ts.TypeFlags.BooleanLiteral))) return { control: 'boolean', valueKind: 'boolean', editable: true };
  if (members.every(member => member.flags & (ts.TypeFlags.StringLiteral | ts.TypeFlags.NumberLiteral))) return { control: 'enum', valueKind: 'enum', options: members.map(member => member.value), editable: true };
  if (members.every(member => member.flags & ts.TypeFlags.NumberLike)) return { control: 'number', valueKind: 'number', editable: true };
  if (members.every(member => member.flags & ts.TypeFlags.StringLike)) return { control: /color/i.test(name) ? 'color' : 'text', valueKind: 'string', editable: true };
  if (members.every(member => member.flags & (ts.TypeFlags.NumberLike | ts.TypeFlags.StringLike)) && ['number', 'string'].includes(typeof defaultValue)) return { control: typeof defaultValue === 'number' ? 'number' : 'text', valueKind: 'scalar-union', editable: true };
  if (checker.isArrayType(nonNullable) || checker.isTupleType(nonNullable) || /^(?:readonly )?.*\[\]$|^(?:ReadonlyArray|Array)</.test(text)) return { control: 'code', valueKind: 'array', editable: false };
  if (nonNullable.flags & ts.TypeFlags.Object || /^Record<|CSSProperties|Props\b|Options\b/.test(text)) return { control: 'code', valueKind: 'object', editable: false };
  return { control: 'code', valueKind: 'union', editable: false };
}

function exampleValue(type, checker, location, depth = 0, seen = new Set()) {
  if (depth > 3 || seen.has(type)) return undefined;
  seen = new Set([...seen, type]);
  const nullable = checker.getNonNullableType(type);
  const text = checker.typeToString(nullable, location, typeFlags);
  if (/^(?:React\.)?ReactNode$/.test(text)) return '<span>示例内容</span>';
  if (/^(?:React\.)?CSSProperties$/.test(text) || text === 'Properties<string | number, string & {}>') return '{ width: "100%", minHeight: 240 }';
  if (nullable.isUnion()) {
    for (const candidate of nullable.types) {
      const value = exampleValue(candidate, checker, location, depth + 1, seen);
      if (value !== undefined) return value;
    }
  }
  if (nullable.flags & ts.TypeFlags.StringLiteral) return JSON.stringify(nullable.value);
  if (nullable.flags & ts.TypeFlags.NumberLiteral) return String(nullable.value);
  if (nullable.flags & ts.TypeFlags.BooleanLiteral) return nullable.intrinsicName;
  if (nullable.flags & ts.TypeFlags.String) return '"示例"';
  if (nullable.flags & ts.TypeFlags.Number) return '1';
  if (nullable.flags & ts.TypeFlags.Boolean) return 'true';
  if (nullable.flags & ts.TypeFlags.TypeParameter) {
    const constraint = checker.getBaseConstraintOfType(nullable);
    if (constraint && constraint !== nullable) return exampleValue(constraint, checker, location, depth + 1, seen);
  }
  if (checker.isArrayType(nullable) || checker.isTupleType(nullable)) {
    const values = checker.getTypeArguments(nullable).map(item => exampleValue(item, checker, location, depth + 1, seen));
    if (values.some(value => value === undefined)) return '[]';
    return `[${values.join(', ')}]`;
  }
  const signature = checker.getSignaturesOfType(nullable, ts.SignatureKind.Call)[0];
  if (signature) {
    const parameters = signature.parameters.map((parameter, index) => /^\w+$/.test(parameter.name) ? parameter.name : `value${index}`);
    const returnType = checker.getReturnTypeOfSignature(signature);
    const returnValue = returnType.flags & (ts.TypeFlags.Void | ts.TypeFlags.Undefined) ? undefined : exampleValue(returnType, checker, location, depth + 1, seen);
    return `(${parameters.join(', ')}) => ${returnValue !== undefined ? `(${returnValue})` : '{}'} `;
  }
  const properties = nullable.getProperties().filter(property => !(property.flags & ts.SymbolFlags.Optional));
  if (!properties.length && checker.getIndexInfosOfType(nullable).length) return '{}';
  if (nullable.flags & ts.TypeFlags.Object && properties.length <= 12 && !/node_modules/.test(nullable.symbol?.declarations?.[0]?.getSourceFile().fileName ?? '')) {
    const values = properties.map(property => {
      const value = declaredType(property, checker, location);
      const example = exampleValue(value.type, checker, value.declaration ?? location, depth + 1, seen);
      return example === undefined ? undefined : `${JSON.stringify(property.name)}: ${example}`;
    });
    if (values.every(value => value !== undefined)) return `{ ${values.join(', ')} }`;
  }
  return undefined;
}

export function extractComponentApi(program, file, { root, id, exportName = 'default', descriptions = {}, usage = [] } = {}) {
  const component = exportedComponent(program, file, exportName);
  const { checker, source, propsType } = component;
  const bindings = parameterBindings(component);
  const customNames = publicPropNames(component);
  const defaults = getDefaults(component, root, bindings);
  const props = [];
  const inherited = inheritedTypes(component, root);
  const propsName = checker.typeToString(propsType ?? checker.getNeverType(), component.declaration ?? source, typeFlags);
  for (const property of propsType?.getProperties() ?? []) {
    const value = declaredType(property, checker, component.declaration ?? source);
    const reactInherited = property.declarations?.length && property.declarations.every(isReactDeclaration);
    const externalInherited = property.declarations?.length && property.declarations.every(declaration => /[/\\]node_modules[/\\]/.test(declaration.getSourceFile().fileName));
    // Native fields stay available through the inherited type reference. Fields
    // the implementation explicitly handles are useful API entries of their own.
    if (!customNames.has(property.name) && !bindings.has(property.name) && !['children', 'ref'].includes(property.name)) continue;
    const defaultInfo = defaults.get(property.name) ?? {};
    const mode = controlForProp(property.name, value.type, checker, value.declaration ?? source, defaultInfo.defaultValue);
    const sourceOptions = sourceEnumOptions(value.declaration?.type, checker);
    if (mode.control === 'enum' && sourceOptions) mode.options = sourceOptions;
    const comment = ts.displayPartsToString(property.getDocumentationComment(checker));
    const examples = usage.filter(item => item.name === property.name).map(item => item.code);
    const generatedExample = exampleValue(value.type, checker, value.declaration ?? source);
    const record = {
      name: property.name,
      type: value.typeText,
      required: !(property.flags & ts.SymbolFlags.Optional),
      ...defaultInfo,
      description: descriptions[property.name] ?? describeProp(property.name, value.typeText, id, mode.valueKind),
      ...mode,
      source: { path: relative(root, value.declaration?.getSourceFile().fileName ?? file), line: value.declaration ? value.declaration.getSourceFile().getLineAndCharacterOfPosition(value.declaration.getStart()).line + 1 : 1 },
    };
    if (comment) record.sourceDescription = comment;
    if (externalInherited) record.inheritedFrom = inherited[0]?.type ?? value.declaration?.parent?.name?.getText() ?? 'Inherited dependency attributes';
    const details = typeDescription(value.type, checker, value.declaration ?? source);
    if (details?.kind === 'enum' && sourceOptions) details.options = sourceOptions;
    if (details) record.details = details;
    if (examples.length) record.usageExamples = [...new Set(examples)];
    if (mode.valueKind === 'ref') {
      const element = value.typeText.match(/(?:Ref|RefObject)<(.+)>/)?.[1]?.replace(/\s*\|\s*null$/, '') ?? 'HTMLElement';
      record.codeExample = `const elementRef = useRef<${element} | null>(null);\n// JSX: ${property.name}={elementRef}`;
    } else if (examples.length) record.codeExample = examples[0];
    else if (Object.hasOwn(defaultInfo, 'defaultValue')) record.codeExample = `${property.name}={${JSON.stringify(defaultInfo.defaultValue)}}`;
    else if (generatedExample !== undefined) record.codeExample = `${property.name}={${generatedExample.trim()}}`;
    else if (record.defaultExpression !== undefined) record.codeExample = `${property.name}={${record.defaultExpression}}`;
    else record.codeExample = `// ${property.name}: ${value.typeText}\n// 使用符合该完整类型的值；参见源码声明。`;
    if (!mode.editable) record.controlExplanation = `${mode.valueKind === 'callback' ? '回调由调用方提供函数' : mode.valueKind === 'ref' ? 'ref 连接实际 DOM 或组件句柄' : mode.valueKind === 'react-node' ? '内容通过 JSX 组合' : '复合值按完整类型编写代码'}，本例通过真实用法展示。`;
    props.push(record);
  }
  const indexSignatures = propsType ? checker.getIndexInfosOfType(propsType).map(info => ({ keyType: checker.typeToString(info.keyType, source, typeFlags), valueType: checker.typeToString(info.type, source, typeFlags), readonly: info.isReadonly })) : [];
  return {
    id,
    componentName: component.implementation?.name?.text ?? component.symbol.name,
    exportName,
    sourcePath: relative(root, file),
    propsType: propsName === 'never' ? '{}' : propsName,
    apiScope: 'component-props',
    props,
    inherited,
    ...(indexSignatures.length ? { indexSignatures, notes: ['源码包含开放索引签名；未声明字段保持开放配置，不将内部辅助接口推断为公开 Props。'] } : {}),
    extraction: { method: 'typescript-type-checker-and-source-ast', typescriptVersion: ts.version, defaultPolicy: 'literal-syntax-only-no-code-execution', nativeFields: 'referenced-as-inherited-types' },
  };
}

export function collectJsxUsage(program, file, tags) {
  const source = program.getSourceFile(file);
  const checker = program.getTypeChecker();
  if (!source) return [];
  const usage = [];
  const visit = node => {
    if ((ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) && (!tags || tags.includes(node.tagName.getText()))) {
      for (const attribute of node.attributes.properties) {
        if (ts.isJsxAttribute(attribute)) {
          const initializer = attribute.initializer;
          const expression = ts.isJsxExpression(initializer ?? {}) ? initializer.expression : initializer;
          const value = expression ? literalValue(expression, checker) : { serializable: true, value: true };
          const propertyType = checker.getContextualType(expression ?? attribute) ?? (expression ? checker.getTypeAtLocation(expression) : checker.getBooleanType());
          usage.push({ name: attribute.name.getText(), tag: node.tagName.getText(), code: attribute.getText(), ...(expression ? { expression: expression.getText() } : {}), ...(value.serializable ? { value: value.value } : {}), type: checker.typeToString(propertyType, node, typeFlags), line: source.getLineAndCharacterOfPosition(attribute.getStart()).line + 1 });
        }
      }
      if (ts.isJsxOpeningElement(node) && node.parent.children?.length) {
        const text = node.parent.children.map(child => child.getText()).join('').trim();
        if (text) usage.push({ name: 'children', tag: node.tagName.getText(), code: `children={<>${text}</>}`, type: 'ReactNode', line: source.getLineAndCharacterOfPosition(node.getStart()).line + 1 });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return usage;
}

export function collectNativeApis(program, file, root) {
  const source = program.getSourceFile(file);
  const checker = program.getTypeChecker();
  const tags = new Map();
  const usage = collectJsxUsage(program, file);
  const intrinsicTypes = new Map(checker.getJsxIntrinsicTagNamesAt(source).map(symbol => [symbol.name, symbol]));
  const visit = node => {
    if (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) {
      const tag = node.tagName.getText();
      if (/^[a-z][a-z0-9-]*$/.test(tag) && !tags.has(tag)) {
        const symbol = intrinsicTypes.get(tag);
        const type = symbol ? checker.getTypeOfSymbolAtLocation(symbol, source) : undefined;
        const typeText = type ? checker.typeToString(type, source, typeFlags) : 'unknown';
        const usedProps = [...new Map(usage.filter(item => item.tag === tag).map(item => [item.name, item])).values()].map(item => {
          const property = type?.getProperty(item.name);
          const value = property ? declaredType(property, checker, source) : undefined;
          return { name: item.name, type: value?.typeText ?? (item.name.startsWith('aria-') ? 'React.AriaAttributes' : item.type), required: property ? !(property.flags & ts.SymbolFlags.Optional) : false, description: describeProp(item.name, value?.typeText ?? item.type, tag), usageExamples: usage.filter(other => other.tag === tag && other.name === item.name).map(other => other.code), inheritedFrom: typeText, ...(value?.declaration ? { source: { path: relative(root, value.declaration.getSourceFile().fileName), line: value.declaration.getSourceFile().getLineAndCharacterOfPosition(value.declaration.getStart()).line + 1 } } : {}) };
        });
        tags.set(tag, { tag, ...reactTypeReference(typeText), observedProps: usedProps });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return [...tags.values()];
}

const specificMeanings = {
  children: '组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定',
  className: '附加在组件容器上的 CSS 类名，用于调用方的局部样式',
  style: '容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入',
  id: '原生控件或容器的唯一标识，用于标签关联、焦点与无障碍引用',
  key: 'React 列表项身份，用于更新时保持对应节点',
  ref: '连接实际 DOM 元素或组件命令句柄，支持类型声明中的 ref 形式',
  text: '显示或生成效果的文字内容', words: '按顺序轮播或翻转的文字列表', texts: '按顺序切换的文字列表',
  items: '参与渲染或交互的条目列表，每项字段和可选内容按完整类型传入',
  options: '可选择的候选项，显示标签与提交值按选项类型定义',
  value: '当前受控值，由调用方维护并随交互回调更新', values: '当前多选值集合，调用方根据回调添加或删除条目',
  defaultValue: '非受控模式的初始值；挂载后更新通常通过内部状态或受控 value 完成',
  checked: '当前受控勾选状态，调用方在变更回调中写回', defaultChecked: '非受控模式首次挂载时的勾选状态',
  selected: '当前选中项的标识', expanded: '当前展开节点的标识集合',
  open: '是否展开或显示内容，由调用方控制', active: '是否启用当前交互或焦点约束',
  disabled: '是否禁用控件的用户交互', paused: '是否暂停持续动画或模拟更新', pause: '是否暂停动画推进',
  label: '向用户或辅助技术说明控件的名称', title: '组件标题或原生元素提示文字', description: '补充组件用途或当前展示内容的说明',
  hint: '与字段一起显示的帮助文字', htmlFor: '关联控件的 id，让标签点击与辅助技术定位到该控件',
  placeholder: '尚未填写或选择时显示的提示文字',
  width: '容器或效果的宽度，CSS 字符串与数值的支持以类型为准', height: '容器或效果的高度，CSS 字符串与数值的支持以类型为准',
  min: '允许输入、拖动或选择的下限', max: '允许输入、拖动或选择的上限', step: '每次调整的步进间隔或当前步骤，具体含义取决于组件',
  rangeStart: '日期范围起点，按本地日历日期 YYYY-MM-DD 传入', rangeEnd: '日期范围终点，按本地日历日期 YYYY-MM-DD 传入',
  source: '实际显示的图像或媒体资源地址', sources: '按顺序展示的媒体资源地址列表', src: '加载图像、视频或纹理的资源地址',
  imageSrc: '用作主图或纹理的图像资源地址', images: '参与画廊、轮播或效果的图像列表', image: '主图资源或图像配置，结构以类型为准',
  backImage: '背面显示的图像资源', alt: '图像无法显示及辅助技术读取时的替代文字', altText: '主图的替代文字',
  caption: '与图像或内容一起显示的说明，可按类型传入 JSX', captionText: '主图旁显示的说明文字',
  identity: '区分本次内容或动效节点的身份，改变后用于切换和布局过渡',
  surfaceRef: '连接弹出面板的 DOM ref，供调用方测量与管理焦点', anchorRef: '连接触发器 DOM 的 ref，供弹层定位及焦点返回使用',
  returnFocusRef: '焦点约束退出后要返回的 DOM 元素 ref', target: '效果作用范围或 Portal 挂载目标，按类型传入父级/页面/DOM',
  page: '当前分页页码', pageSize: '每页显示的条目数量', total: '参与分页的记录总数', index: '当前展示条目的索引',
  pressed: '按钮的当前切换选中状态', thumbnails: '是否显示可点击切换的缩略图列表',
  before: '对比视图中调整前的图像地址', after: '对比视图中调整后的图像地址',
  nodes: '树或组织结构的节点数据，子节点和标识按类型定义', level: '树节点当前的层级，用于缩进与辅助技术层级',
  side: '抽屉或浮层从哪个边缘出现', variant: '选择组件内置的外观或效果变体', mode: '选择组件的渲染或交互工作模式',
  type: '原生输入或按钮的行为类型；按钮类型会影响表单提交', name: '原生表单字段名称，用于表单提交与分组',
  autoComplete: '浏览器自动填写提示，采用 HTML autocomplete 约定值', inputMode: '提示触屏设备使用适合内容的键盘布局',
  readOnly: '是否只读；仍可聚焦，但不允许用户修改原生输入值', required: '是否要求填写后才能完成原生表单提交',
  maxLength: '允许输入的最大字符数', minLength: '允许输入的最小字符数', pattern: '原生表单验证使用的正则模式',
  role: '辅助技术使用的元素角色，须与实际键盘和交互行为相匹配', tabIndex: '键盘 Tab 导航的焦点顺序',
  enableShadows: '是否绘制 Glitch Text 两侧红色与青色错位阴影', enableOnHover: '是否只在指针悬停时显示故障错位动画',
  gridSize: '网格每边的单元数量或单元尺寸，按该组件的数值契约设置', gap: '相邻单元、卡片或字符之间的间距；单位由组件实现定义',
  dpr: '渲染像素比；影响 Canvas/WebGL 的清晰度与绘制成本', speed: '动画、流动或滚动的推进速度；不同效果使用各自的速度尺度',
  duration: '一次动画或过渡的持续时长，时间单位以组件实现和示例为准', delay: '开始动画或执行回调之前的等待时长',
  easing: '动画进度的缓动曲线名称或函数，按类型传入', ease: '动画缓动名称或配置，按所用动画库的类型传入',
  easingFunction: '输入动画进度并返回映射后进度的缓动函数',
  onChange: '用户改变值或条目顺序时通知调用方；回调参数类型就是应写回的值或原生事件',
  onSelect: '用户选择条目时通知调用方，参数为选中项的标识或数据',
  onToggle: '节点展开或收起时通知调用方，参数为目标节点的标识',
  onClose: '请求关闭弹层、对话框或提示时调用，调用方同步更新 open 状态',
  onExit: '用户退出焦点区域或按下退出键时调用',
  onPressedChange: '切换按钮改变选中状态时回调，参数为新的布尔状态',
  onClick: '用户点击或通过键盘激活时触发的事件处理函数',
  onAnimationComplete: '动画全部结束时调用，供调用方更新后续界面状态',
  onStepChange: '当前步骤改变时通知调用方，参数为新的步骤编号',
  onFinalStepCompleted: '最后一步确认完成时通知调用方',
  onValueChange: '交互产生新的值时通知调用方',
  onIndexChange: '当前展示条目的索引改变时通知调用方',
  onComplete: '动作、输入或动画达到完成状态时通知调用方',
  onStart: '动作或动画开始时通知调用方',
  as: '选择实际渲染的元素或 React 组件，继承的原生属性随该元素类型变化',
  animationFrom: '显现动画开始时的属性快照，如 filter、opacity 与 y；覆盖内置初始快照',
  animationTo: '显现动画依次经过的属性快照列表，每一步按动画库支持的属性配置',
  initial: 'Motion 动画的初始姿态或变体名称，false 表示跳过首次入场姿态',
  animate: 'Motion 动画要达到的姿态或变体名称，按 TargetAndTransition 支持的属性配置',
  exit: 'Motion 内容退出时的姿态或变体名称，由 AnimatePresence 的退出流程使用',
  transition: '动画的过渡配置对象，如 spring 的 stiffness、damping 或 duration',
  renderItem: '自定义每一项内容的渲染函数，接收条目及索引等参数并返回 ReactNode',
  renderInfo: '自定义当前项目说明的渲染函数，接收条目、索引及移动状态',
  renderLabel: '自定义标签内容的渲染函数，接收文本及工作状态并返回 ReactNode',
  renderStepIndicator: '自定义步骤指示器的渲染函数，接收当前步骤、状态与点击接口',
  formatValue: '将数值转换为用户可读文本的函数，返回字符串并用于标签或结果显示',
  onAction: '用户激活操作项时通知调用方，按签名接收该动作的身份或数据',
  onAttach: '用户请求添加附件时通知调用方',
  onBackground: '用户选择背景设置时通知调用方',
  onColor: '用户选择颜色时通知调用方，参数为新颜色',
  onCommit: '交互达到提交阈值并确认时通知调用方',
  onConfirm: '用户确认当前动作或选择时通知调用方',
  onDictate: '用户激活听写入口时通知调用方',
  onDisappearanceComplete: '退出或消失动画完成时通知调用方',
  onEffortChange: '用户切换思考力度或工作模式时通知调用方',
  onFlipChange: '卡片翻转后的正反面状态改变时通知调用方',
  onItemClick: '用户点击列表或菜单项时通知调用方，参数为条目及索引',
  onItemSelect: '用户选择候选项时通知调用方',
  onMenuClick: '用户点击菜单触发器或菜单项时通知调用方',
  onMenuOpen: '菜单打开时通知调用方',
  onMenuClose: '菜单关闭时通知调用方',
  onModelLoaded: '三维模型资源加载完成时通知调用方',
  onOpenChange: '展开状态改变时通知调用方，参数为新的布尔状态',
  onPhaseChange: '交互或动画进入新的阶段时通知调用方',
  onReorder: '拖动条目改变排列顺序后通知调用方',
  onRetry: '用户请求重试失败操作时通知调用方',
  onSend: '用户提交文本或消息时通知调用方',
  onSentenceComplete: '一段文字完成输入、轮播或显现时通知调用方',
  onSettle: '运动完成并进入稳定状态时通知调用方',
  onShred: '拖动动作完成碎纸处理时通知调用方',
  onShuffleComplete: '文字打乱与复位动画完成时通知调用方',
  onStackComplete: '卡片堆栈一轮移动完成时通知调用方',
  onStateChange: '控件的状态机切换状态时通知调用方',
  onTear: '拖动动作完成撕裂票据时通知调用方',
  onUndo: '用户在允许的时间窗口内请求撤销时通知调用方',
  BFECC: '是否启用双向误差补偿的流体输运求解',
  parting: '指针移入时将丝线分开的强度，0 表示不分开',
  barge: '胶冻单选项膨胀时额外推开相邻项的距离',
  clapper: '是否显示铃铛内部的钟锤及其摆动',
  bite: '纸张被碎纸口咬入时允许的推进距离',
  misregistration: '半色调印刷各颜色网点层之间的套色偏移强度',
  equalSlots: '是否让分段选项占用相同宽度',
  focal: '星系效果的二维焦点位置，以组件坐标比例传入',
  dt: '模拟更新使用的时间步长',
  gridMul: '网格在横向与纵向上的缩放倍数',
  fromFontVariationSettings: '靠近指针前的可变字体轴配置字符串，如 wght、opsz 的取值',
  toFontVariationSettings: '靠近指针后的可变字体轴配置字符串，轴名需由所选字体支持',
  modelsPath: '人脸模型权重资源的根地址，由摄像头检测加载流程使用',
  enableWebcam: '是否请求摄像头并启用人脸检测来驱动网格；启用后仍须浏览器授予权限',
  enableGyro: '是否启用设备姿态或陀螺仪交互驱动效果',
  rootMargin: 'IntersectionObserver 的视口边界扩展量，如 0px 或 -20% 0px',
  mixBlendMode: '效果图层与后方背景叠加时的 CSS 混合模式',
};

const words = {
  color:'颜色', colors:'颜色组', background:'背景', foreground:'前景', accent:'强调', text:'文字', font:'字体', family:'字族', weight:'字重', size:'尺寸', pixel:'像素',
  ring:'圆环', line:'线条', edge:'边缘', face:'立方体面', ripple:'波纹', wave:'波形', particle:'粒子', flake:'雪花', glow:'辉光', shadow:'阴影', blur:'模糊',
  grid:'网格', tile:'字符格', card:'卡片', image:'图像', logo:'标志', border:'边框', shape:'形状', stroke:'描边', fill:'填充', cursor:'指针', pointer:'指针',
  mouse:'鼠标', hover:'悬停', click:'点击', scroll:'滚动', animation:'动画', animate:'动画', transition:'过渡', reveal:'显现', intro:'入场', outro:'退出',
  speed:'速度', duration:'时长', delay:'延迟', count:'数量', radius:'半径', width:'宽度', height:'高度', length:'长度', thickness:'厚度', opacity:'不透明度',
  intensity:'强度', strength:'强度', scale:'缩放', rotation:'旋转角度', rotate:'旋转', angle:'角度', amplitude:'振幅', frequency:'频率', offset:'偏移',
  direction:'方向', position:'位置', placement:'布局位置', align:'对齐', spread:'展开间距', spacing:'间距', gap:'间距', distance:'距离', padding:'内边距',
  min:'最小', max:'最大', base:'基础', start:'开始', end:'结束', initial:'初始', current:'当前', active:'激活', selected:'选中', idle:'静止',
  enable:'启用', enabled:'启用', disable:'禁用', disabled:'禁用', show:'显示', hide:'隐藏', auto:'自动', pause:'暂停', loop:'循环', reverse:'反向',
  bounce:'回弹', damping:'阻尼', stiffness:'弹簧刚度', friction:'摩擦', gravity:'重力', force:'作用力', velocity:'速度矢量', mass:'质量', tension:'张力',
  horizontal:'水平', vertical:'垂直', top:'顶部', bottom:'底部', left:'左侧', right:'右侧', center:'中心', x:'X轴', y:'Y轴', z:'Z轴',
  container:'容器', panel:'面板', item:'条目', items:'条目', menu:'菜单', button:'按钮', tooltip:'提示', input:'输入', label:'标签', title:'标题',
  filter:'滤镜', noise:'噪声', grain:'颗粒', scan:'扫描', bloom:'泛光', contrast:'对比度', saturation:'饱和度', brightness:'亮度', distortion:'扭曲',
  warp:'形变', refraction:'折射', chromatic:'色散', aberration:'色散', mix:'混合', blend:'混合', diffusion:'扩散', dissipation:'耗散', resolution:'分辨率',
  sim:'模拟', dye:'染料', capture:'采样', density:'密度', curl:'旋度', pressure:'压力', splat:'注入', iterations:'迭代次数', poisson:'泊松求解', viscous:'粘性',
  material:'材质', roughness:'粗糙度', metalness:'金属度', reflectivity:'反射率', light:'光照', ambient:'环境光', diffuse:'漫反射', specular:'镜面反射',
  model:'模型', models:'模型', path:'路径', url:'地址', src:'资源', source:'资源', texture:'纹理', camera:'相机', fov:'视场角', perspective:'透视',
  progress:'进度', threshold:'阈值', smoothing:'平滑', softness:'柔和度', sharpness:'锐度', jitter:'抖动', random:'随机', seed:'随机种子',
  time:'时间', cycle:'循环周期', step:'步进', interval:'间隔', age:'存活时间', life:'生命周期', trail:'轨迹', tail:'尾迹', fade:'淡出', fadeout:'淡出',
  spring:'弹簧', overshoot:'过冲', ease:'缓动', easing:'缓动', curve:'曲线', custom:'自定义', responsive:'响应式', mobile:'移动端', tablet:'平板', desktop:'桌面端',
  display:'显示', frame:'外框', fit:'适配', stretch:'拉伸', rounded:'圆角', round:'圆角', corner:'角', aspect:'宽高', ratio:'比例',
  saturation:'饱和度', shading:'面部明暗', brush:'指针笔刷', reach:'作用距离', dash:'虚线', dotted:'点线', solid:'实线',
  follow:'跟随', repel:'排斥', repulsion:'排斥', attract:'吸引', attraction:'吸引', sensitivity:'灵敏度', influence:'影响系数',
  content:'内容', control:'控制', controls:'控制', interaction:'交互', interactive:'交互', target:'目标', trigger:'触发方式', triggerOn:'触发方式',
  front:'正面', back:'背面', caption:'图注', alt:'替代文字', prefix:'前缀', suffix:'后缀', separator:'分隔符', char:'字符', chars:'字符',
  charset:'字符集', character:'字符', characters:'字符', scramble:'打乱', scrambled:'打乱', sequential:'逐字顺序', decrypt:'解密',
  grow:'生长', shrink:'收缩', expand:'展开', collapse:'折叠', reset:'重置', return:'返回', snap:'吸附', snapback:'复位',
  borderless:'无边框', transparent:'透明背景', absolute:'绝对定位', full:'完整', use:'使用', only:'仅', all:'全部',
};

Object.assign(words, {
  after:'之后', amount:'幅度', amp:'振幅', anchor:'定位锚点', animated:'播放动画', animations:'动画组', aria:'无障碍', 'aria-label':'无障碍名称', as:'元素类型', attenuation:'衰减', children:'子内容', curvature:'曲率', depth:'深度', description:'说明', dpr:'像素比', drift:'漂移', drop:'投放', edges:'边缘组', effect:'效果', exit:'退出', expanded:'展开状态', highlight:'高亮', hint:'提示', id:'标识', images:'图像组', in:'进入', index:'索引', level:'层级', lighting:'光照', mode:'模式', name:'名称', nodes:'节点组', open:'打开', options:'选项', orbit:'轨道', origin:'起点', outer:'外围', page:'页码', particles:'粒子组', pattern:'图样', paused:'暂停', placeholder:'占位提示', places:'计数位', preset:'预设', props:'属性配置', range:'范围', ref:'引用', ribbon:'丝带', side:'边侧', sources:'资源列表', targets:'目标组', texts:'文字列表', thumbnails:'缩略图', to:'目标', total:'总数', type:'类型', value:'值', values:'值集合', variant:'变体', waveform:'波形信号', waves:'波组', waviness:'波动程度', wind:'风量', words:'短句列表',
  accumulate:'累积', action:'操作', actions:'操作项', allow:'允许', alternate:'交替', alpha:'透明度', alt:'替代文字', antialias:'抗锯齿', arc:'弧线', arcs:'弧线组', argument:'参数', arm:'就绪阈值', arrow:'箭头', arrows:'箭头', ascii:'字符画', at:'阈值', attach:'附件', attack:'起始响应', autoplay:'自动播放', avatar:'头像', away:'移开', axis:'坐标轴',
  back:'背面', backdrop:'遮罩', badge:'标记', badges:'标记', balance:'平衡', ball:'球体', band:'条带', bands:'条带组', bar:'条形', barge:'挤压推开', bars:'条形组', basis:'计算基准', beam:'光束', beat:'拍动', before:'之前', behavior:'行为', bend:'弯曲', bend1:'第一弯曲', bend2:'第二弯曲', between:'之间', bevel:'倒角', bfecc:'双向误差补偿输运', bg:'背景', bite:'咬入距离', black:'黑位', bleed:'外溢', blind:'百叶', blink:'闪烁', blocks:'块', blue:'蓝色通道', bolts:'闪电束', boost:'加速', boosting:'加速时', bounciness:'弹性', box:'方块', branches:'分支', breath:'呼吸', breathe:'呼吸', breeze:'微风', bulge:'鼓起', burst:'爆发', busy:'忙碌', by:'单位',
  cable:'电缆', cancel:'取消', captions:'图注', cards:'卡片', caret:'插入光标', cascade:'级联', catch:'捕获', cell:'单元', change:'改变', channel:'通道', chaos:'混乱', check:'勾选', checked:'勾选状态', chip:'标签片', chop:'分割', chroma:'色彩', circle:'圆形', clapper:'钟锤', class:'类名', clear:'清除', close:'关闭', clump:'聚团', clutter:'杂散', coarse:'粗粒度', collapse:'收起', collapsible:'可收起', color1:'第一颜色', color2:'第二颜色', color3:'第三颜色', colored:'着色', column:'列', columns:'列数', comet:'彗星', commands:'命令列表', commit:'提交', complete:'完成', completed:'完成后', cone:'锥形', confirm:'确认', connection:'连接', connections:'连接线', constant:'常数', constraint:'约束', contact:'联系入口', coordinates:'坐标', copies:'副本', core:'核心', counter:'计数器', crackle:'闪电噼啪', crease:'折痕', crest:'峰顶', crossfade:'交叉淡变', crumple:'揉皱', cube:'立方体', curviness:'曲线弯曲程度',
  dampening:'阻尼', dampness:'阻尼', danger:'危险操作', dashes:'虚线段', decay:'衰减', default:'非受控初始', deg:'角度', delete:'删除', deleting:'删除', delta:'变化量', demo:'演示', detail:'细节', device:'设备', dictate:'听写', digit:'数字字符', dim:'暗化', dip:'下沉', dir2:'第二方向', dirty:'已修改', disappear:'消失', disappearance:'消失', dismissible:'可关闭', dispersion:'色散', displace:'位移', displacement:'位移', distort:'扭曲', dither:'抖色', div:'模糊分层', dodge:'躲避', done:'完成', dot:'圆点', dots:'圆点组', double:'双次', drag:'拖动', draggable:'可拖动', draw:'绘制', drawer:'抽屉', drip:'滴落', dt:'时间步长', dust:'尘点',
  echoes:'回声层', effort:'思考力度', efforts:'思考力度候选', elapsed:'已过时间', elasticity:'弹性', element:'元素', encrypted:'未揭示字符', enlarge:'放大', environment:'环境', equal:'等宽', error:'错误', expand:'展开', expected:'预期', exponential:'指数分布', exposure:'曝光', extra:'额外',
  factor:'系数', fall:'下落', falloff:'衰减', fan:'扇形', far:'远端', feed:'供入', field:'场', final:'最终', fine:'细粒度', finish:'完成', first:'第一', fixed:'固定', flap:'翻片', flare:'耀斑', flares:'耀斑组', flee:'逃离', flex:'伸缩', flick:'甩动', flicker:'闪烁', flight:'飞行', flip:'翻转', flipped:'翻面状态', flips:'翻转次数', float:'浮动', floor:'底部', flow:'流动', fluidity:'流动性', focal:'焦点', focus:'焦点', fog:'雾', foil:'箔面', fold:'折叠', folder:'文件夹', footer:'底部栏', format:'格式化', fps:'每秒帧数', fray:'撕口毛边', from:'起始', frost:'磨砂', function:'函数', fuse:'导火线', fuzz:'扰动范围',
  gamma:'伽马', gather:'聚合', glare:'眩光', glass:'玻璃', glide:'滑移', glint:'微光', glitch:'故障错位', glyph:'字形', goo:'粘液', gooey:'粘连', gooeyness:'粘连程度', gpu:'图形加速', grab:'抓取', gradient:'渐变', gradients:'渐变组', grayscale:'灰度', green:'绿色通道', gyro:'陀螺仪',
  handle:'拖动把手', haptic:'触感回弹', haze:'薄雾', head:'头部', high:'高值', hinge:'铰链', hold:'按住', hole:'孔洞', holes:'孔洞组', holo:'全息', horizon:'地平线', hotspot:'热点', hovered:'悬停时', href:'链接地址', hue:'色相',
  icon:'图标', inactive:'未激活', indent:'缩进', indicator:'指示器', indicators:'指示器', inertia:'惯性', inflate:'膨胀', info:'信息', ink:'墨色', inline:'行内', inner:'内侧', inset:'内缩', interpolate:'插值', invert:'反转', italic:'斜体',
  jelly:'胶冻程度', key:'身份标识', keep:'保持', labels:'标签', lag:'滞后', landing:'落地', lanes:'车道', launch:'发射', layer:'图层', layers:'图层', layout:'布局', lean:'倾斜', lens:'透镜', lerp:'插值', letter:'字母', levels:'层数', lift:'抬起', liked:'点赞状态', linear:'线性', lines:'线条', linger:'停留', liquid:'液体', load:'加载', loaded:'加载完成', logos:'标志列表', long:'长按', low:'低值',
  magnet:'磁吸', magnetism:'磁吸', magnification:'放大', magnify:'放大', main:'主体', manual:'手动', mapping:'映射', margin:'边距', mark:'标记', marker:'标记', marquee:'跑马灯', mask:'蒙版', match:'匹配', media:'媒体', median:'中部', merge:'合并', metal:'金属', mid:'中间', middle:'中层', mini:'小型', mirror:'镜像', misregistration:'套色偏移', mix:'混合', momentum:'动量', morph:'形态变换', mosaic:'马赛克', motion:'动效', move:'移动', ms:'毫秒', mul:'倍数', multiplier:'倍率',
  navigation:'导航', near:'近端', next:'下一步', no:'禁用', notch:'缺口', notice:'提示', num:'数量', numbering:'编号', octave:'噪声倍频', of:'的', off:'关闭时', offscreen:'视口外', once:'仅一次', opened:'打开后', optimized:'优化策略', order:'顺序', orientation:'方向', original:'原始', out:'退出', outline:'轮廓', outside:'外部', overlay:'覆盖层',
  pad:'留白', palette:'调色板', paper:'纸张', parallax:'视差', parent:'父级', parting:'丝线分开', passes:'扫描次数', patience:'等待耐心', pct:'百分比', peek:'预露出', peel:'剥离', per:'每个', period:'周期', phase:'阶段', physics:'物理模拟', pill:'胶囊', pillar:'光柱', pivot:'支点', pixelation:'像素化', pixels:'像素', plane:'平面', plate:'底板', play:'播放', point:'点', points:'点组', pole:'立柱', poles:'立柱组', pop:'弹出', post:'后处理', poster:'海报', presence:'挂载退出', press:'按压', pressed:'按下选中状态', preview:'预览', proximity:'邻近程度', pull:'拉动', pulsating:'脉动', pulse:'脉冲', push:'推移',
  quality:'渲染质量', rainbow:'彩虹', ramp:'逐渐增加', randomness:'随机差异', rate:'速率', ray:'射线', rays:'射线', react:'响应', reactive:'交互响应', read:'读取', recenter:'回到中心', recoil:'后坐回弹', recovery:'恢复', red:'红色通道', reduced:'减少动效', reflections:'反射', regrow:'重新生长', relaxation:'松弛', release:'释放', relent:'缓和', remember:'记住', removal:'移除', render:'渲染', renderer:'渲染器', reorder:'重排', reset:'重置', resistance:'阻力', respect:'遵循', rest:'静止', restore:'恢复', resume:'恢复播放', retry:'重试', reverse:'反向', rgb:'三色通道', ribbons:'丝带', rim:'轮缘', rings:'圆环组', ripples:'波纹组', rise:'上升', road:'道路', roll:'滚动翻转', root:'观察根边界', roundness:'圆润程度', row:'行', rows:'行数', rubber:'橡胶',
  scanline:'扫描线', scanlines:'扫描线组', scatter:'散开', scene:'场景', scope:'范围', scratches:'划痕', scrim:'遮罩', scrollbar:'滚动条', scroller:'滚动容器', second:'第二', secondary:'次要', segments:'分段', select:'选择', selection:'选择', selector:'选择器', send:'发送', sends:'发送', sentence:'句段', separation:'分离', settings:'配置', settle:'稳定', shade:'暗部', shadows:'阴影', shake:'摇晃', shapes:'形状列表', shard:'碎片', sheen:'光泽', shift:'偏移', shimmer:'闪光', shine:'扫光', shock:'冲击', shortcut:'快捷键', shred:'碎纸', shuffle:'打乱', sides:'多边形边数', skew:'斜切', slat:'条板', slices:'切片', slide:'滑动', slit:'狭缝', slot:'槽位', slots:'槽位组', smooth:'平滑', smoothness:'平滑程度', social:'社交入口', socials:'社交入口组', sound:'声音', spark:'火花', sparkle:'星屑闪烁', sparks:'火花组', specks:'细点', spike:'尖峰', spill:'溢出', spin:'自转', speed1:'第一速度', speed2:'第二速度', splash:'飞溅', split:'拆分', spoke:'辐条', spotlight:'聚光', squash:'挤压', squeeze:'压缩', stack:'堆叠', stage:'阶段', stagger:'错开', star:'星点', stars:'星点组', starting:'开始', state:'状态', status:'状态', steer:'转向', stepped:'阶梯', steps:'步骤', stickiness:'粘滞', stir:'搅动', stop:'停止', stops:'色标', strands:'丝线组', strap:'挂带', streak:'拖尾', streaks:'拖尾组', strike:'击打', strip:'纸条', stub:'票根', style:'样式', styles:'样式列表', sublabel:'副标签', submit:'提交', success:'成功', surface:'表面', suspend:'暂停', sway:'摇摆', sweep:'扫掠', swell:'膨胀', swipe:'滑动', swirl:'旋涡',
  tab:'选项页', tag:'标签', tags:'标签组', takeover:'接管', tap:'点按', taper:'渐缩', taunts:'提示短句', tear:'撕裂', theme:'主题', thread:'丝线', threads:'丝线组', thumb:'滑块', tick:'刻度', ticks:'刻度组', tiles:'字符格组', tilt:'倾斜', timer:'计时器', times:'次数', tint:'色调', tip:'提示', toggle:'切换', tooltip:'提示浮层', torn:'撕裂状态', track:'轨道', tracking:'跟踪', transform:'变换', transparency:'透明', travel:'移动距离', trunk:'主干', tunnel:'隧道', turbulence:'湍流', turn:'转动', turntable:'旋转台', twinkle:'闪烁', twist:'扭转', two:'第二', typing:'输入',
  undo:'撤销', unit:'单位', update:'更新', uppercase:'大写', upright:'直立', user:'用户', variable:'可变', variance:'差异', variation:'变体', vignette:'暗角', viscosity:'粘性', visible:'可见', volume:'音量', wall:'墙面', wander:'游走', warm:'预热', warning:'提示', wash:'覆盖染色', webcam:'摄像头', well:'凹槽', wheel:'滚轮', when:'条件', while:'期间', window:'窗口', wireframes:'线框', wobble:'摇晃', word:'单词', working:'工作中', wrapper:'包装层', wrinkle:'褶皱', yoyo:'往复', zoom:'缩放',
});

const componentMeanings = {
  cubes: {
    gridSize: '每边立方体的数量，组成方形网格。',
    gap: '每个网格单元中保留为空隙的比例；立方体面宽为 1 - gap，源码限制在 0 至 0.9。',
    faceColor: '立方体各面的基础颜色。', edgeColor: '立方体边线的颜色。', edgeWidth: '边线绘制的宽度。',
    edgeStyle: '边线采用实线、虚线、点线或隐藏的样式。', faceOpacity: '立方体面的不透明度，边线单独绘制。',
    shading: '侧面和正面之间的明暗变化强度。', maxAngle: '立方体响应指针时允许旋转的最大角度。',
    radius: '指针影响周边立方体的半径，以网格坐标计算。',
    speed: '立方体旋转响应的速度系数，通过弹簧刚度影响趋近目标的快慢。',
    bounce: '立方体旋转的回弹程度，源码限制在 0 至 1。', brush: '指针笔刷作用的强度。',
    perspective: '观察立方体阵列的透视参数。', autoAnimate: '是否在没有用户指针输入时自动更新动画目标。',
    rippleOnClick: '点击时是否从点击位置发出波纹。', rippleColor: '点击波纹经过立方体时的颜色。',
    rippleSpeed: '点击波纹沿网格传播的速度。', intro: '首次挂载时是否播放立方体阵列的入场动画。',
    paused: '是否暂停立方体模拟与绘制循环。', dpr: 'WebGL 绘图缓冲使用的像素比；未传入时由设备像素比决定。',
  },
  'business-datepicker': {
    value: '当前选中的本地日历日期，按 YYYY-MM-DD 保存；空字符串表示尚未选择。',
    min: '可选日期的下界，按本地日历日期 YYYY-MM-DD 传入。', max: '可选日期的上界，按本地日历日期 YYYY-MM-DD 传入。',
    label: '日期控件的可读名称，同时用于触发器与日历的无障碍说明。',
    onChange: '选中、清除或选择今天时回调，参数为 YYYY-MM-DD 日期或空字符串，调用方更新 value。',
  },
};

export function describeProp(name, type, id = '', kind = '') {
  if (componentMeanings[id]?.[name]) return componentMeanings[id][name];
  if (specificMeanings[name]) return `${specificMeanings[name]}。`;
  if (name.startsWith('aria-')) return `辅助技术的 ${name.slice(5)} 状态或说明；值须与控件当前可观察行为一致。`;
  if (name.startsWith('data-')) return `示例在 DOM 上使用的 ${name.slice(5)} 数据标记，供局部样式或状态定位读取。`;
  const tokens = name.replace(/([a-z\d])([A-Z])/g, '$1 $2').replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2').split(/[_\s]+/).map(token => token.toLowerCase());
  const translated = tokens.filter(token => !['on', 'is', 'has', 'with'].includes(token)).map(token => words[token] ?? token).join('');
  if (name.startsWith('on') || kind === 'callback' || /=>|Handler\b/.test(type)) return `${translated}时执行的回调；按签名接收事件或结果，调用方在函数中同步业务状态。`;
  if (kind === 'ref' || /Ref(?:Object)?</.test(type)) return `${translated}的实际 DOM 或组件句柄引用，用于定位、聚焦或命令调用。`;
  if (kind === 'array' || /\[\]|Array</.test(type)) return `${translated}的有序数据集合；每一项按数组元素类型配置。`;
  if (kind === 'object' || /CSSProperties|Record<|^\{/.test(type)) return `${translated}的结构化配置；对象字段按完整类型传入并由组件读取。`;
  if (/^(?:enable|show|hide|auto|pause|disable|use|is|has|allow|prevent|follow|repeat)/i.test(name) || type === 'boolean') return `是否${translated}，决定该分支的展示或交互行为。`;
  if (/Color|^color\d*$/i.test(name)) return `${translated}，传入组件支持的 CSS 或着色器颜色格式。`;
  if (/Duration|Delay|Interval|Age|Life|Time$/i.test(name)) return `${translated}，决定动画或交互阶段的时间安排；单位以该组件源码为准。`;
  if (/Width|Height|Radius|Size|Thickness|Gap|Spacing|Distance|Length|Padding/i.test(name)) return `${translated}，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。`;
  return `${translated}，控制 ${id ? id.replaceAll('-', ' ') : '组件'} 的对应渲染或交互参数。`;
}
