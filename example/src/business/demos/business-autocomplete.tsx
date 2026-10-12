import { useState, useId, useEffect } from 'react';
import { BusinessDemo, Button, Field } from '../support';

// 场景：从较多候选项中边输入边搜索，支持键盘选择与清空。
export default function AutoCompleteDemo() {
  const options = ['项目工作台', '智能体管理', '技能目录', '知识库', '工具连接', '运行记录', '团队空间'];
  const id = useId(); const [query, setQuery] = useState(''); const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false); const [active, setActive] = useState(0);
  const matches = options.filter(item => item.includes(query.trim()));
  useEffect(() => {
    if (open) document.getElementById(`${id}-option-${active}`)?.scrollIntoView({ block: 'nearest' });
  }, [id, open, active, matches.length]);
  function choose(value: string) { setQuery(value); setSelected(value); setOpen(false); }
  return <BusinessDemo title="AutoComplete · 自动补全" description="从较多候选项中边输入边搜索，支持方向键、Enter 和 Escape。"><Field label="搜索工作入口" htmlFor={id}><div className="aw-business-combo" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}><input id={id} role="combobox" aria-autocomplete="list" aria-expanded={open} aria-controls={`${id}-options`} aria-activedescendant={open && matches[active] ? `${id}-option-${active}` : undefined} value={query} placeholder="输入“管理”或“目录”" onFocus={() => setOpen(true)} onChange={event => { setQuery(event.target.value); setSelected(''); setActive(0); setOpen(true); }} onKeyDown={event => { if (['ArrowDown','ArrowUp'].includes(event.key)) { event.preventDefault(); setOpen(true); setActive(value => matches.length ? (value + (event.key === 'ArrowDown' ? 1 : -1) + matches.length) % matches.length : 0); } else if (event.key === 'Enter' && open && matches[active]) { event.preventDefault(); choose(matches[active]); } else if (event.key === 'Escape') setOpen(false); }} />{open ? <div className="aw-business-combo-list"><ul id={`${id}-options`} role="listbox" className="aw-business-options">{matches.length ? matches.map((item,index) => <li key={item} id={`${id}-option-${index}`} role="option" aria-selected={active === index}><button type="button" tabIndex={-1} onPointerDown={event => event.preventDefault()} onClick={() => choose(item)}>{item}</button></li>) : <li className="aw-business-empty">没有匹配的入口</li>}</ul></div> : null}</div></Field><div className="aw-business-row"><Button variant="secondary" onClick={() => { setQuery(''); setSelected(''); setOpen(false); }}>清空</Button><p className="aw-business-status" role="status">{selected ? `已选择：${selected}` : '尚未选择入口'}</p></div></BusinessDemo>;
}
