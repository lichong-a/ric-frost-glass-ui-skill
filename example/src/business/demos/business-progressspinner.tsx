// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button } from '../support';


export default function BusinessProgressSpinnerDemo() {
  const [busy,setBusy]=useState(true);
  return <BusinessDemo title="ProgressSpinner" description="显示本地处理中的不定进度；结束按钮切换到完成状态，减弱动效时保持状态文本。">
    <div role="status" className="aw-business-row">{busy?<span className="aw-business-spinner" aria-hidden="true" />:<span aria-hidden="true">✓</span>}<span>{busy?'正在处理本地示例…':'本地示例处理已结束。'}</span></div><Button onClick={()=>setBusy(value=>!value)}>{busy?'结束处理':'再次开始'}</Button>
  </BusinessDemo>;
}
