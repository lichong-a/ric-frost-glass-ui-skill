/** Serializable demo configuration. Functions, DOM refs and React nodes stay in TSX. */
export type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };
export type DemoValues = Record<string, JsonValue>;
export type ValueShape = { kind: 'number' | 'boolean' | 'string' | 'null' | 'array' | 'object' | 'union'; variants?: ValueShape[]; items?: ValueShape; properties?: Record<string, ValueShape>; required?: string[] };
export type ParameterField = {
  key: string;
  name: string;
  label: string;
  description: string;
  scope: 'prop' | 'state' | 'container';
  target?: string;
  type: string;
  defaultValue: JsonValue;
  upstreamDefault?: string;
  control: 'number' | 'range' | 'switch' | 'select' | 'color' | 'text' | 'resource' | 'json';
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  options?: { label: string; value: JsonValue }[];
  advanced: boolean;
  apply: 'live' | 'rebuild';
  shape?: ValueShape;
  /** Known local resource tokens; also used when resources appear in JSON data. */
  resources?: string[];
  bindings?: { target: string; name: string }[];
};
export type ApiProperty = {
  name: string;
  type: string;
  required: boolean;
  defaultExpression?: string;
  defaultValue?: JsonValue;
  description: string;
  codeExample?: string;
  inheritedFrom?: string;
};
export type ParameterDefinition = {
  version: 1;
  id: string;
  name: string;
  sourcePath: string;
  demoPath: string;
  fields: ParameterField[];
  props: ApiProperty[];
  inherited: { type: string; reference: string }[];
  apiScope?: string;
  indexSignatures?: { keyType: string; valueType: string; readonly: boolean }[];
  notes?: string[];
  usageTemplate: string;
  targets: { id: string; name: string; sourcePath?: string; props?: ApiProperty[]; inherited?: { type: string; reference: string }[] }[];
};
