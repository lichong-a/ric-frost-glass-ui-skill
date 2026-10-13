import { useEffect, useId, useState } from 'react';
import type { DemoValues, JsonValue, ParameterDefinition, ParameterField } from './types';
import { colorPickerParts, validateField } from './validation';
import styles from './ParametersPanel.module.css';
import { SpringCheckbox } from '../business/components/SpringCheckbox';
import { AnimatedSelect } from '../business/components/AnimatedSelect';

type Props = {
  definition: ParameterDefinition;
  values: DemoValues;
  onCommit: (field: ParameterField, value: JsonValue) => void;
  onReset: () => void;
  onReplay: () => void;
  onCopy: (kind: 'usage' | 'configuration') => void;
};
const display = (field: ParameterField, value: JsonValue) => field.control === 'json' ? JSON.stringify(value, null, 2) : String(value ?? '');

function Control({ field, value, onCommit }: { field: ParameterField; value: JsonValue; onCommit: Props['onCommit'] }) {
  const id = useId();
  const [draft, setDraft] = useState(() => display(field, value));
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);
  useEffect(() => { if (!focused && !error) setDraft(display(field, value)); }, [value, field, focused, error]);
  function apply(next: JsonValue) {
    const message = validateField(field, next);
    setError(message);
    if (!message) onCommit(field, next);
  }
  function parse(text: string): JsonValue | undefined {
    try {
      if (field.control === 'number' || field.control === 'range') {
        if (!text.trim()) throw new Error('请输入数字。');
        const number = Number(text);
        const message = validateField(field, number);
        if (message) throw new Error(message);
        setError(null); return number;
      }
      const next = field.control === 'json' ? JSON.parse(text) as JsonValue : text;
      const message = validateField(field, next);
      if (message) throw new Error(message);
      setError(null); return next;
    } catch (reason) {
      setError(field.control === 'json' && reason instanceof SyntaxError ? 'JSON 格式不完整；预览保留最后有效配置。' : (reason instanceof Error ? reason.message : '输入无效。'));
      return undefined;
    }
  }
  function change(text: string, commit = false) {
    setDraft(text);
    const next = parse(text);
    if (next !== undefined && (commit || field.apply === 'live')) apply(next);
  }
  const shared = {
    id,
    'aria-describedby': `${id}-description${error ? ` ${id}-error` : ''}`,
    'aria-invalid': !!error,
    'data-parameter': field.key,
    onFocus: () => setFocused(true),
    onBlur: () => { setFocused(false); change(draft, true); },
  };
  let input;
  if (field.control === 'switch') {
    input = <SpringCheckbox id={id} data-parameter={field.key} checked={value === true} onChange={event => apply(event.target.checked)} />;
  } else if (field.options) {
    input = <div data-parameter={field.key}><AnimatedSelect id={id} value={JSON.stringify(value)} label={field.label} onChange={next => apply(JSON.parse(next) as JsonValue)} options={field.options.map(option => ({ value: JSON.stringify(option.value), label: option.label }))} /></div>;
  } else if (field.control === 'json') {
    input = <textarea {...shared} value={draft} rows={5} spellCheck={false} className={`${styles.input} ${styles.json}`} onChange={event => change(event.target.value)} />;
  } else if (field.control === 'range') {
    input = <div className={styles.rangeRow}><input {...shared} type="range" min={field.min} max={field.max} step={field.step ?? 0.01} value={draft} className={styles.range}
      onChange={event => change(event.target.value)} onPointerUp={event => change(event.currentTarget.value, true)} onKeyUp={event => change(event.currentTarget.value, true)} /><output htmlFor={id}>{draft}{field.unit}</output></div>;
  } else if (field.control === 'color') {
    const parts = colorPickerParts(draft) ?? colorPickerParts(String(value)) ?? { rgb: '#000000', alpha: '' };
    input = <div className={styles.colorRow}>
      <input type="color" aria-label={`${field.label}色板`} value={parts.rgb} className={styles.colorPicker}
        onChange={event => change(event.target.value + parts.alpha, true)} />
      <input {...shared} type="text" value={draft} className={styles.input} spellCheck={false} onChange={event => change(event.target.value)} onKeyDown={event => { if (event.key === 'Enter') change(draft, true); }} />
    </div>;
  } else {
    input = <input {...shared} type={field.control === 'number' ? 'number' : 'text'} min={field.min} max={field.max} step={field.step ?? 'any'} value={draft} className={styles.input} onChange={event => change(event.target.value)} onKeyDown={event => { if (event.key === 'Enter') change(draft, true); }} />;
  }
  return <div className={`${styles.field} ${field.control === 'json' ? styles.wide : ''}`}>
    <div className={styles.labelRow}><label htmlFor={id}>{field.label}</label><code>{field.name}</code></div>
    {input}
    <p id={`${id}-description`} className={styles.description}>{field.description}{field.apply === 'rebuild' ? ' 调节结束后重建演示。' : ''}</p>
    {error ? <p id={`${id}-error`} role="alert" className={styles.error}>{error}</p> : null}
  </div>;
}
export default function ParametersPanel({ definition, values, onCommit, onReset, onReplay, onCopy }: Props) {
  const common = definition.fields.filter(field => !field.advanced && field.scope !== 'container');
  const advanced = definition.fields.filter(field => field.advanced && field.scope !== 'container');
  const container = definition.fields.filter(field => field.scope === 'container');
  const controls = (fields: ParameterField[]) => <div className={styles.grid}>{fields.map(field => <Control key={field.key} field={field} value={Object.hasOwn(values, field.key) ? values[field.key] : field.defaultValue} onCommit={onCommit} />)}</div>;
  return <section className={styles.panel} aria-label="自定义参数" data-parameter-panel={definition.id}>
    <div className={styles.heading}><div><p>MAKE IT YOURS</p><h2>自定义参数</h2></div><div className={styles.actions}>
      <button type="button" onClick={onReset}>恢复默认</button><button type="button" onClick={onReplay}>重播</button>
      <button type="button" onClick={() => onCopy('usage')}>复制当前用法</button><button type="button" onClick={() => onCopy('configuration')}>复制配置</button>
    </div></div>
    <p className={styles.intro}>调整后直接查看效果；同页切换保留各组件的设置，刷新恢复本例默认值。{definition.fields.filter(field => field.scope !== 'container').length} 个可调项，完整 API 见接入说明。</p>
    {common.length ? controls(common) : <p className={styles.intro}>本例通过内容和回调组合运行；可在完整源码中编辑节点与业务数据。</p>}
    {advanced.length ? <details className={styles.details}><summary>高级参数 <span>{advanced.length}</span></summary>{controls(advanced)}</details> : null}
    <details className={styles.details}><summary>演示容器设置</summary>{controls(container)}</details>
  </section>;
}

export function ApiReference({ definition, values }: { definition: ParameterDefinition; values: DemoValues }) {
  const signature = (props: ParameterDefinition['props']) => JSON.stringify(props.map(prop => [prop.name, prop.type, prop.defaultExpression]));
  const seen = new Set([signature(definition.props)]);
  const primaryTargets = definition.targets.filter(target => target.props && signature(target.props) === signature(definition.props)).map(target => target.id);
  const rows = definition.props.map(prop => ({ prop, owner: '', targets: primaryTargets }));
  for (const target of definition.targets) {
    if (!target.props?.length || seen.has(signature(target.props))) continue;
    seen.add(signature(target.props));
    const targetIds = definition.targets.filter(item => item.props && signature(item.props) === signature(target.props!)).map(item => item.id);
    rows.push(...target.props.map(prop => ({ prop, owner: target.name, targets: targetIds })));
  }
  const inherited = [...new Map([
    ...definition.inherited,
    ...definition.targets.flatMap(target => target.inherited ?? []),
  ].map(item => [item.type, item])).values()];
  return <section className={styles.api} aria-label="完整参数 API">
    <h2>完整参数 API</h2><p>类型与上游默认值来自当前锁定源码；本例配置来自当前预览。回调、ref 和 React 节点在 TSX 中接入。</p>
    <div className={styles.tableScroll}><table><thead><tr><th>参数</th><th>类型</th><th>上游默认值</th><th>本例配置</th><th>说明</th></tr></thead><tbody>
      {rows.map(({ prop, owner, targets }, index) => {
        const fields = definition.fields.filter(field => field.bindings?.some(binding => targets.includes(binding.target) && binding.name === prop.name)
          || (field.scope === 'prop' && targets.includes(field.target ?? '') && field.name === prop.name));
        return <tr key={`${prop.name}:${index}`}><td>{owner ? <small>{owner}<br /></small> : null}<code>{prop.name}</code>{prop.required ? ' *' : ''}</td><td><code>{prop.type}</code></td><td><code>{prop.defaultExpression ?? '未指定'}</code></td><td>{fields.length ? fields.map(field => <div key={field.key}><small>{field.key}</small><br /><code>{JSON.stringify(Object.hasOwn(values, field.key) ? values[field.key] : field.defaultValue)}</code></div>) : '见 TSX 接入'}</td><td>{prop.description}{prop.codeExample && /=>|EventHandler|Ref|ReactNode|\[|\{|CSSProperties|Record</.test(prop.type) ? <pre><code>{prop.codeExample}</code></pre> : null}</td></tr>;
      })}
    </tbody></table></div>
    {definition.apiScope === 'native-composition' ? <p>本示例函数组合原生元素和下列控件，不接收额外的公开 Props。原生属性与可编辑示例配置分别列出。</p> : null}
    {definition.indexSignatures?.length ? <div className={styles.inherited}><h3>开放属性签名</h3>{definition.indexSignatures.map((item, index) => <p key={index}><code>{`[key: ${item.keyType}]: ${item.valueType}`}</code>；额外字段按锁定实现转发，当前用法展示了本例使用的配置。</p>)}</div> : null}
    {inherited.length ? <div className={styles.inherited}><h3>继承属性</h3>{inherited.map((item, index) => <p key={`${item.type}:${index}`}><code>{item.type}</code> · <a href={item.reference} target="_blank" rel="noreferrer">查询完整类型与原生属性</a></p>)}</div> : null}
    <p>预览高度等容器选项属于示例页面，独立于组件 Props。</p>
  </section>;
}
