import { useState } from 'react';
import Shredder from '../../../.upstream/src/ts-default/Micro/Shredder/Shredder';
import { palette, DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
import { useDemoConfig, useDemoState } from '../../parameters/DemoConfig';
const cn=(names:string)=>componentClasses(styles,names);

const initialItems = [{ id: 'draft-a', title: '页面布局草稿', text: '拖入底部碎纸口，演示移除过期草稿。' }, { id: 'draft-b', title: '早期配色方案', text: '只影响当前示例中的本地卡片。' }, { id: 'draft-c', title: '组件探索记录', text: '可先重新排序，再选择要移除的条目。' }];
export default function ShredderDemo() {
  const { props: demoProps } = useDemoConfig();
  const [items, setItems] = useDemoState('state.items', initialItems);
  const [message, setMessage] = useState('将纸卡拖向下方碎纸口；聚焦纸卡后也可按 Delete 删除。');
  const [revision, setRevision] = useState(0);
  return <DemoPanel title="Shredder · 碎纸交互"><div className={cn("aw-micro-stack aw-shredder-stack")}>
    <Shredder key={revision} items={items} renderItem={item => <article className={cn("aw-micro-paper aw-shredder-paper")}><strong>{item.title}</strong><span>{item.text}</span></article>} onShred={item => { setItems(value => value.filter(candidate => candidate.id !== item.id)); setMessage(`已移除本地示例：${item.title}`); }} onReorder={next => { setItems(next); setMessage('本地纸卡顺序已更新。'); }} width={320} height={430} fallHeight={84} color={palette.ink} slitColor={palette.primary} autoAnimate={false} loop={false} loopAfterDelete={false} {...demoProps('t0')} />
    <div className={cn("aw-micro-controls")}><button className={styles['aw-micro-action']} type="button" onClick={() => { setItems(initialItems); setRevision(value => value + 1); setMessage('纸卡已恢复。'); }} {...demoProps('t1')}>恢复示例纸卡</button></div>
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">{message} 剩余 {items.length} 张。</p>
  </div></DemoPanel>;
}
