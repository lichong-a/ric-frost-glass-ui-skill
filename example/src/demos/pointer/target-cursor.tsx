// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Animations/TargetCursor/TargetCursor';
import { palette } from '../../shared/demo-support';
import { useRef, useState } from "react";
import { useDemoConfig } from '../../parameters/DemoConfig';
// 光标括号只追踪本预览内的目标；按钮是真实可点击计数。

export default function TargetCursorDemo() {
  const { props: demoProps } = useDemoConfig();
  const scopeRef = useRef<HTMLDivElement>(null!); const [count, setCount] = useState(0);
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div ref={scopeRef} style={{ position: 'relative', minHeight: 320, display: 'grid', placeItems: 'center', gap: 20, padding: 24 }}><Component container={scopeRef} targetSelector=".aw-cursor-target" cursorColor={palette.primary} cursorColorOnTarget={palette.ink} hideDefaultCursor={false} blendMode="normal" spinDuration={3} size={26} padding={8} showLabel {...demoProps('t0')} /><button className="aw-button aw-cursor-target" data-variant="primary" type="button" data-cursor-label="运行" onClick={() => setCount(value => value + 1)} {...demoProps('t1')}>运行 {count} 次</button><div className="aw-cursor-target" data-cursor-label="查看" style={{ padding: 24, borderRadius: 20, background: palette.sage, color: palette.ink }}>将指针移入此目标</div></div>
    </div>
  );
}
