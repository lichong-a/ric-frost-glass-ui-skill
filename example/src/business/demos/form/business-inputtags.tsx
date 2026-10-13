import ownedStyles0 from '../../components/Button.module.css';
import ownedStyles1 from '../../components/DemoLayout.module.css';
import ownedStyles2 from '../../components/Input.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1,...ownedStyles2};
const cn=(names:string)=>componentClasses(ownedStyles,names);
// 场景：录入多个自由文本标签，支持添加、去重和逐项移除。
export default function InputTagsDemo() {
  const { props: demoProps } = useDemoConfig();
  const [tags, setTags] = useState(['设计','组件']); const [input, setInput] = useDemoState('state.input', '');
  function add() { const value = input.trim(); if (value && !tags.includes(value) && tags.length < 8) setTags(current => [...current,value]); setInput(''); }
  return <BusinessDemo title="InputTags · 标签输入" description="Enter 或逗号添加标签，最多 8 项。"><div data-ui="aw-business-row" className={cn("aw-business-row")}>{tags.map(tag => <span data-ui="aw-business-tag" className={cn("aw-business-tag")} key={tag}>{tag}<button className={cn('aw-business-button-feedback')} type="button" aria-label={`移除 ${tag}`} onClick={() => setTags(current => current.filter(item => item !== tag))} {...demoProps('t0')}>×</button></span>)}</div><input className={cn('aw-business-input')} aria-label="新标签" value={input} placeholder="输入新标签" maxLength={24} onChange={event => setInput(event.target.value)} onKeyDown={event => { if (['Enter',','].includes(event.key)) { event.preventDefault(); add(); } else if (event.key === 'Backspace' && !input) setTags(current => current.slice(0,-1)); }} {...demoProps('t1')} /><Button variant="secondary" disabled={!input.trim() || tags.length >= 8} onClick={add} {...demoProps('t2')}>添加标签</Button><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">已选 {tags.length}/8 项</p></BusinessDemo>;
}
