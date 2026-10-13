import ownedStyles0 from '../../components/Button.module.css';
import ownedStyles1 from '../../components/DemoLayout.module.css';
import ownedStyles2 from '../../components/Input.module.css';
import ownedStyles3 from '../../components/SelectOptions.module.css';
import { componentClasses } from '../../class-names';
import { useState, useId, useEffect } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { Field } from '../../components/Field';
import { AnimatePresence } from 'motion/react';
import { DropdownSurface } from '../../components/DropdownSurface';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1,...ownedStyles2,...ownedStyles3};
const cn=(names:string)=>componentClasses(ownedStyles,names);
// 场景：从较多候选项中边输入边搜索，支持键盘选择与清空。
export default function AutoCompleteDemo() {
  const { props: demoProps } = useDemoConfig();
  const options = ['项目工作台', '智能体管理', '技能目录', '知识库', '工具连接', '运行记录', '团队空间'];
  const id = useId(); const [query, setQuery] = useDemoState('state.query', ''); const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false); const [active, setActive] = useState(0);
  const matches = options.filter(item => item.includes(query.trim()));
  useEffect(() => {
    if (open) document.getElementById(`${id}-option-${active}`)?.scrollIntoView({ block: 'nearest' });
  }, [id, open, active, matches.length]);
  function choose(value: string) { setQuery(value); setSelected(value); setOpen(false); }
  return <BusinessDemo title="AutoComplete · 自动补全" description="从较多候选项中边输入边搜索，支持方向键、Enter 和 Escape。"><Field label="搜索工作入口" htmlFor={id} {...demoProps('t0')}><div data-ui="aw-business-combo" className={cn("aw-business-combo")} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}><input className={cn('aw-business-input')} id={id} role="combobox" aria-autocomplete="list" aria-expanded={open} aria-controls={`${id}-options`} aria-activedescendant={open && matches[active] ? `${id}-option-${active}` : undefined} value={query} placeholder="输入“管理”或“目录”" onFocus={() => setOpen(true)} onChange={event => { setQuery(event.target.value); setSelected(''); setActive(0); setOpen(true); }} onKeyDown={event => { if (['ArrowDown','ArrowUp'].includes(event.key)) { event.preventDefault(); setOpen(true); setActive(value => matches.length ? (value + (event.key === 'ArrowDown' ? 1 : -1) + matches.length) % matches.length : 0); } else if (event.key === 'Enter' && open && matches[active]) { event.preventDefault(); choose(matches[active]); } else if (event.key === 'Escape') setOpen(false); }} {...demoProps('t1')} /><AnimatePresence>{open ? <DropdownSurface data-ui="aw-business-combo-list" key="suggestions" className={cn("aw-business-combo-list")}><ul data-ui="aw-business-options" id={`${id}-options`} role="listbox" className={cn("aw-business-options")}>{matches.length ? matches.map((item,index) => <li key={item} id={`${id}-option-${index}`} role="option" aria-selected={active === index}><button className={cn('aw-business-button-feedback')} type="button" tabIndex={-1} onPointerDown={event => event.preventDefault()} onClick={() => choose(item)} {...demoProps('t3')}>{item}</button></li>) : <li data-ui="aw-business-empty" className={cn("aw-business-empty")}>没有匹配的入口</li>}</ul></DropdownSurface> : null}</AnimatePresence></div></Field><div data-ui="aw-business-row" className={cn("aw-business-row")}><Button variant="secondary" onClick={() => { setQuery(''); setSelected(''); setOpen(false); }} {...demoProps('t4')}>清空</Button><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">{selected ? `已选择：${selected}` : '尚未选择入口'}</p></div></BusinessDemo>;
}
