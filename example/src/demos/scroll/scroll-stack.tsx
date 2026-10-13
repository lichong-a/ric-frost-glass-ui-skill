// Authored integration demo; implementation is installed from the pinned official source.
import Component, { ScrollStackItem } from '../../../.upstream/src/ts-default/Components/ScrollStack/ScrollStack';
import { palette } from '../../shared/demo-support';
import { useState } from "react";
import { useDemoConfig } from '../../parameters/DemoConfig';
// 采用真实ScrollStackItem具名子组件；局部滚动有足够距离完成堆叠。

export default function ScrollStackDemo() {
  const { props: demoProps } = useDemoConfig();
  const [status, setStatus] = useState("在此卡片区域内滚动");

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 480, position: 'relative', overflow: 'hidden' }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ height: 430, width: '100%', position: 'relative' }}><Component itemDistance={60} itemStackDistance={14} itemScale={0.035}
baseScale={0.9} dimAmount={0.18} blurAmount={0.8} tiltAmount={1.5}
holdDistance={100} smoothScroll={false} useWindowScroll={false}
onStackComplete={() => setStatus('三张卡片已完成堆叠')} {...demoProps('t0')}>{['收集上下文', '生成执行计划', '交付结果'].map((title, index) => <ScrollStackItem key={title} style={{ background: [palette.ivory, palette.canvas, palette.sage][index], color: palette.ink, borderRadius: 20, minHeight: 200 }} {...demoProps('t1')}><h3>{index + 1} · {title}</h3><p>继续在卡片区域向下滚动，查看顺序叠放。</p></ScrollStackItem>)}</Component></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}
