import ownedStyles0 from '../../components/Button.module.css';
import ownedStyles1 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState, useId } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { useDemoConfig } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
// 场景：主动作展开少量相关快捷操作，保持触屏和键盘可操作。
export default function SpeedDialDemo() {
  const { props: demoProps } = useDemoConfig();
  const [open, setOpen] = useState(false); const [action, setAction] = useState(''); const id = useId();
  return <BusinessDemo title="SpeedDial · 快捷动作" description="主按钮展开相关操作，选择后收起。"><div style={{ minHeight:240,position:'relative' }}><div style={{ position:'absolute',bottom:16,right:16,display:'grid',gap:10,justifyItems:'end' }}>{open ? <div data-ui="aw-business-segments" id={id} className={cn("aw-business-segments")} style={{ display:'grid' }} role="group" aria-label="快捷操作">{['新建任务','添加标签','收藏空间'].map(item => <button className={cn('aw-business-button-feedback')} type="button" key={item} onClick={() => { setAction(item); setOpen(false); }} {...demoProps('t0')}>{item}</button>)}</div> : null}<Button aria-expanded={open} aria-controls={id} onClick={() => setOpen(value => !value)} {...demoProps('t1')}>{open ? '收起 ×' : '快捷操作 +'}</Button></div></div><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">{action ? `已选择本地动作：${action}` : '展开按钮选择操作'}</p></BusinessDemo>;
}
