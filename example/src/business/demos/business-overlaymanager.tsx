// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button, Dialog } from '../support';


export default function BusinessOverlayManagerDemo() {
  const [stack,setStack]=useState<string[]>([]);
  return <BusinessDemo title="OverlayManager" description="两个原生模态弹层按打开顺序形成有限栈，浏览器管理层级、焦点与Escape。">
    <Button onClick={()=>setStack(['editor'])}>打开第一层</Button><p className="aw-business-status" role="status">当前弹层数：{stack.length}</p><Dialog open={stack.includes('editor')} title="第一层：编辑" onClose={()=>setStack([])}><p>确认动作会打开第二层，关闭第二层后回到这里。</p><Button onClick={()=>setStack(['editor','confirm'])}>打开确认层</Button></Dialog><Dialog open={stack.includes('confirm')} title="第二层：确认" onClose={()=>setStack(['editor'])}><p>此示例只管理当前页面的弹层。</p><Button onClick={()=>setStack(['editor'])}>返回第一层</Button><Button variant="secondary" onClick={()=>setStack([])}>关闭全部</Button></Dialog>
  </BusinessDemo>;
}
