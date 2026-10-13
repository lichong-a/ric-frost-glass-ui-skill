import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Toolbar.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { controlSpring } from '../../motion-preference';
import { useBusinessReducedMotion } from '../../motion-preference';
import { useDemoConfig } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessToolbarDemo() {
  const { props: demoProps } = useDemoConfig();
  const [count, setCount] = useState(3);
  const reduced = useBusinessReducedMotion();
  return <BusinessDemo title="Toolbar" description="常用操作集中在工具栏，新建与移除条目以位置和高度过渡呈现。">
    <div data-ui="aw-business-row" role="toolbar" aria-label="任务操作" className={cn("aw-business-row")}><Button disabled={count >= 20} onClick={() => setCount(value => Math.min(20, value + 1))} {...demoProps('t0')}>新建任务</Button><Button variant="danger" disabled={!count} onClick={() => setCount(value => value - 1)} {...demoProps('t1')}>移除末项</Button><Button variant="secondary" onClick={() => setCount(3)} {...demoProps('t2')}>恢复</Button></div>
    <p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">当前本地任务数：{count}</p>
    <ul data-ui="aw-business-toolbar-items" className={cn("aw-business-toolbar-items")}><AnimatePresence initial={false}>{Array.from({ length: count }, (_, index) => <motion.li data-ui="aw-business-item" className={cn("aw-business-item")} key={index} layout={!reduced} initial={reduced ? false : { x: -12, height: 0 }} animate={{ x: 0, height: 'auto' }} exit={{ x: reduced ? 0 : 12, height: 0, paddingBlock: 0, marginBlock: 0, borderWidth: 0 }} transition={reduced ? { duration: 0 } : controlSpring}>本地任务 {index + 1}</motion.li>)}</AnimatePresence></ul>
  </BusinessDemo>;
}
