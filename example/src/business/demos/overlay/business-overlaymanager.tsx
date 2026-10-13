import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { Dialog } from '../../components/Dialog';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessOverlayManagerDemo() {
  const { props: demoProps } = useDemoConfig();
  const [stack,setStack]=useDemoState<string[]>('state.stack', []);
  return <BusinessDemo title="OverlayManager" description="两个原生模态弹层按打开顺序形成有限栈，浏览器管理层级、焦点与Escape。">
    <Button onClick={()=>setStack(['editor'])} {...demoProps('t0')}>打开第一层</Button><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">当前弹层数：{stack.length}</p><Dialog open={stack.includes('editor')} title="第一层：编辑" onClose={()=>setStack([])} {...demoProps('t1')}><p>确认动作会打开第二层，关闭第二层后回到这里。</p><Button onClick={()=>setStack(['editor','confirm'])} {...demoProps('t2')}>打开确认层</Button></Dialog><Dialog open={stack.includes('confirm')} title="第二层：确认" onClose={()=>setStack(['editor'])} {...demoProps('t3')}><p>此示例只管理当前页面的弹层。</p><Button onClick={()=>setStack(['editor'])} {...demoProps('t4')}>返回第一层</Button><Button variant="secondary" onClick={()=>setStack([])} {...demoProps('t5')}>关闭全部</Button></Dialog>
  </BusinessDemo>;
}
