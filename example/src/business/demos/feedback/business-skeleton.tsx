import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { useDemoConfig } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessSkeletonDemo() {
  const { props: demoProps } = useDemoConfig();
  const [loading,setLoading]=useState(true);
  return <BusinessDemo title="Skeleton" description="展示内容准备中的占位结构，由明确按钮切换到本地实际内容。">
    <section data-ui="aw-business-item" className={cn("aw-business-item")} aria-busy={loading}>{loading?<div aria-hidden="true" style={{display:'grid',gap:12}}><div data-ui="aw-business-skeleton" className={cn("aw-business-skeleton")} style={{height:28,width:'45%'}} /><div data-ui="aw-business-skeleton" className={cn("aw-business-skeleton")} style={{height:16,width:'100%'}} /><div data-ui="aw-business-skeleton" className={cn("aw-business-skeleton")} style={{height:16,width:'80%'}} /></div>:<><h3>资料整理任务</h3><p>本地内容已经可供阅读。</p></>}</section><p role="status">{loading?'本地示例内容准备中。':'本地示例内容已显示。'}</p><Button variant="secondary" onClick={()=>setLoading(value=>!value)} {...demoProps('t0')}>{loading?'显示示例内容':'展示加载状态'}</Button>
  </BusinessDemo>;
}
