// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Animations/Crosshair/Crosshair';
import { palette } from '../shared/demo-support';
import { useRef, useState } from "react";
// 十字线与实时坐标绑定到局部容器，目标按钮保持可操作。
// 此演示使用Canvas；确保容器拥有非零宽高。

export default function CrosshairDemo() {
  const scopeRef = useRef<HTMLDivElement>(null!); const [count, setCount] = useState(0);
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div ref={scopeRef} style={{ position: 'relative', height: 340, display: 'grid', placeItems: 'center' }}><Component containerRef={scopeRef} color={palette.primary} targetEffect="lock" targetSelector=".aw-crosshair-target" thickness={1} opacity={0.7} smoothing={0.3} showCoordinates hideCursor={false} blendMode="normal" /><button className="aw-button aw-crosshair-target" data-variant="secondary" type="button" onClick={() => setCount(value => value + 1)}>锁定目标 · {count}</button></div>
    </div>
  );
}
