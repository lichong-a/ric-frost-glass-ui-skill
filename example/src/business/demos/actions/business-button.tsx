import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { useDemoConfig } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
// 场景：执行明确动作，区分普通、次要、危险和禁用状态。
export default function ButtonDemo() {
  const { props: demoProps } = useDemoConfig();
  const [count, setCount] = useState(0);
  return <BusinessDemo title="Button · 动作按钮" description="动作真实更新本地状态，禁用项不能触发。"><div data-ui="aw-business-row" className={cn("aw-business-row")}><Button onClick={() => setCount(value => value+1)} {...demoProps('t0')}>记录一次操作</Button><Button variant="secondary" onClick={() => setCount(0)} {...demoProps('t1')}>重置</Button><Button variant="danger" onClick={() => setCount(0)} {...demoProps('t2')}>清空本地记录</Button><Button disabled {...demoProps('t3')}>暂不可用</Button></div><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">已记录 {count} 次</p></BusinessDemo>;
}
