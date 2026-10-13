import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { useDemoConfig } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessProgressSpinnerDemo() {
  const { props: demoProps } = useDemoConfig();
  const [busy,setBusy]=useState(true);
  return <BusinessDemo title="ProgressSpinner" description="显示本地处理中的不定进度；结束按钮切换到完成状态，减弱动效时保持状态文本。">
    <div data-ui="aw-business-row" role="status" className={cn("aw-business-row")}>{busy?<span data-ui="aw-business-spinner" className={cn("aw-business-spinner")} aria-hidden="true" />:<span aria-hidden="true">✓</span>}<span>{busy?'正在处理本地示例…':'本地示例处理已结束。'}</span></div><Button onClick={()=>setBusy(value=>!value)} {...demoProps('t0')}>{busy?'结束处理':'再次开始'}</Button>
  </BusinessDemo>;
}
