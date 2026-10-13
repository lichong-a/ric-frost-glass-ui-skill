import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { ScreenReaderText } from '../../components/ScreenReaderText';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessVisuallyHiddenDemo() {
  const { props: demoProps } = useDemoConfig();
  const [saved,setSaved]=useDemoState('state.saved', false);
  return <BusinessDemo title="VisuallyHidden" description="仅图标按钮保留完整可访问名称，屏幕阅读器可读到视觉隐藏文字。">
    <Button variant="secondary" aria-pressed={saved} onClick={()=>setSaved(value=>!value)} {...demoProps('t0')}><span aria-hidden="true">{saved?'★':'☆'}</span><ScreenReaderText>{saved?'取消收藏资料':'收藏资料'}</ScreenReaderText></Button><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">{saved?'资料已在当前示例收藏。':'资料尚未收藏。'}</p>
  </BusinessDemo>;
}
