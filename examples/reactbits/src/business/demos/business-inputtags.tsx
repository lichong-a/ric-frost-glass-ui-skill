import { useState } from 'react';
import { BusinessDemo, Button } from '../support';

// 场景：录入多个自由文本标签，支持添加、去重和逐项移除。
export default function InputTagsDemo() {
  const [tags, setTags] = useState(['设计','组件']); const [input, setInput] = useState('');
  function add() { const value = input.trim(); if (value && !tags.includes(value) && tags.length < 8) setTags(current => [...current,value]); setInput(''); }
  return <BusinessDemo title="InputTags · 标签输入" description="Enter 或逗号添加标签，最多 8 项。"><div className="aw-business-row">{tags.map(tag => <span className="aw-business-tag" key={tag}>{tag}<button type="button" aria-label={`移除 ${tag}`} onClick={() => setTags(current => current.filter(item => item !== tag))}>×</button></span>)}</div><input aria-label="新标签" value={input} placeholder="输入新标签" maxLength={24} onChange={event => setInput(event.target.value)} onKeyDown={event => { if (['Enter',','].includes(event.key)) { event.preventDefault(); add(); } else if (event.key === 'Backspace' && !input) setTags(current => current.slice(0,-1)); }} /><Button variant="secondary" disabled={!input.trim() || tags.length >= 8} onClick={add}>添加标签</Button><p className="aw-business-status" role="status">已选 {tags.length}/8 项</p></BusinessDemo>;
}
