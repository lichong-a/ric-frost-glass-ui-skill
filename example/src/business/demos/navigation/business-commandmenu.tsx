import inputStyles from '../../components/Input.module.css';
import { useEffect, useId, useState } from 'react';
import { ArrowDown, ArrowUp, CornerDownLeft, Files, ListTodo, Search, Settings } from 'lucide-react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { CommandTabs } from '../../components/CommandTabs';
import { Dialog } from '../../components/Dialog';
import { Field } from '../../components/Field';
import { commandIndexForKey, commandSelectionIndex, filterCommandEntries } from '../../components/command-menu-state';
import styles from './business-commandmenu.module.css';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const commands = [
  { id: 'tasks', label: '查看任务', category: 'tasks', description: '打开当前工作空间的任务入口', icon: ListTodo },
  { id: 'files', label: '查看资料', category: 'files', description: '打开当前工作空间的资料入口', icon: Files },
  { id: 'settings', label: '查看设置', category: 'settings', description: '打开当前工作空间的设置入口', icon: Settings }
];
const categories = [{ value: 'all', label: '全部' }, { value: 'tasks', label: '任务' }, { value: 'files', label: '资料' }, { value: 'settings', label: '设置' }];

export default function BusinessCommandMenuDemo() {
  const { props: demoProps } = useDemoConfig();
  const [open, setOpen] = useDemoState('state.open', false);
  const [query, setQuery] = useDemoState('state.query', '');
  const [category, setCategory] = useDemoState('state.category', 'all');
  const [active, setActive] = useState(0);
  const [message, setMessage] = useState('尚未选择命令');
  const prefix = useId();
  const panelId = `${prefix}-command-panel`;
  const visible = filterCommandEntries(commands, query, category);
  const selectedIndex = commandSelectionIndex(active, visible.length);
  const selectedCommand = selectedIndex === null ? undefined : visible[selectedIndex];
  const tabs = categories.map(item => ({ ...item, count: filterCommandEntries(commands, query, item.value).length }));

  // DIY parameters change the filters directly, without invoking the input callbacks.
  useEffect(() => { setActive(0); }, [query, category]);

  function execute(label: string) { setMessage('当前入口：' + label); setOpen(false); }

  return <BusinessDemo title="CommandMenu" description="打开命令面板搜索当前页面动作；支持上下键选择、Enter执行与Escape关闭。">
    <Button className={styles.trigger} onClick={() => { setQuery(''); setCategory('all'); setActive(0); setOpen(true); }} {...demoProps('t0')}><Search size={17} aria-hidden="true" />打开命令面板</Button>
    <Dialog open={open} title="命令面板" onClose={() => setOpen(false)} {...demoProps('t1')}>
      <div className={styles.commandPanel}>
        <CommandTabs items={tabs} value={category} idPrefix={prefix} panelId={panelId} onValueChange={value => { setCategory(value); setActive(0); }} />
        <Field label="搜索页面命令" {...demoProps('t3')}><input data-ui="aw-business-input" className={inputStyles['aw-business-input']} autoFocus role="combobox" aria-expanded={open} aria-autocomplete="list" aria-controls="business-command-results" aria-activedescendant={selectedCommand ? `${prefix}-command-${selectedCommand.id}` : undefined} placeholder="搜索任务、资料或设置" value={query} onChange={event => { setQuery(event.target.value); setActive(0); }} onKeyDown={event => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            const next = commandIndexForKey(selectedIndex ?? 0, visible.length, event.key);
            if (next !== null) { event.preventDefault(); setActive(next); }
          }
          if (event.key === 'Enter' && selectedCommand) { event.preventDefault(); execute(selectedCommand.label); }
        }} {...demoProps('t4')} /></Field>
        <section id={panelId} role="tabpanel" aria-labelledby={`${prefix}-category-${category}`} className={styles.resultsPanel}>
          <div className={styles.resultHeading}><span>可运行的命令</span><span>{visible.length} 条</span></div>
          <ul id="business-command-results" role="listbox" aria-label="可运行的命令" className={styles.results}>
            {visible.map(({ id, label, description, icon: Icon }, index) => <li key={id} role="presentation" className={styles.result}><Button id={`${prefix}-command-${id}`} variant="ghost" role="option" aria-selected={selectedIndex === index} tabIndex={-1} className={styles.commandItem} onPointerMove={() => setActive(index)} onClick={() => execute(label)} {...demoProps('t5')}>
              <span className={styles.commandIcon}><Icon size={18} aria-hidden="true" /></span><span className={styles.commandCopy}><span className={styles.commandLabel}>{label}</span><span className={styles.commandDescription}>{description}</span></span><CornerDownLeft className={styles.enterIcon} size={15} aria-hidden="true" />
            </Button></li>)}
          </ul>
          {!visible.length ? <p role="status" className={styles.empty}>没有匹配的命令。</p> : null}
        </section>
        <div className={styles.keyboardHelp} aria-hidden="true"><span className={styles.keyHint}><kbd className={styles.key}><ArrowUp size={11} /><ArrowDown size={11} /></kbd>选择</span><span className={styles.keyHint}><kbd className={styles.key}>Enter</kbd>执行</span><span className={styles.keyHint}><kbd className={styles.key}>Esc</kbd>关闭</span></div>
      </div>
    </Dialog>
    <section data-ui="aw-business-item" className={styles.status} role="status">{message}</section>
  </BusinessDemo>;
}
