import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessStyleClassDemo() {
  const { props: demoProps } = useDemoConfig();
  const [selected,setSelected]=useDemoState('state.selected', false);
  return <BusinessDemo title="StyleClass" description="通过React切换局部CSS类，应用选中皮肤并保持可访问状态一致。">
    <Button variant="secondary" aria-pressed={selected} onClick={()=>setSelected(value=>!value)} {...demoProps('t0')}>切换强调样式</Button><article data-ui="aw-business-item" className={cn(`aw-business-item${selected?' aw-business-selected':''}`)}><h3>资料整理</h3><p>当前局部类：{selected?'aw-business-selected':'默认阅读面'}</p></article>
  </BusinessDemo>;
}
