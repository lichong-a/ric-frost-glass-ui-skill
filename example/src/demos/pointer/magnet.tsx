// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Animations/Magnet/Magnet';
import { palette } from '../../shared/demo-support';
import { useState } from "react";
import { useDemoConfig } from '../../parameters/DemoConfig';
// 按钮在邻域内向指针偏移，移出后恢复；计数交互可用。

export default function MagnetDemo() {
  const { props: demoProps } = useDemoConfig();
  const [count, setCount] = useState(0);
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink, fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 650, padding: 24 }}>
      <Component padding={70} magnetStrength={8} activeTransition="transform 0.18s ease-out"
inactiveTransition="transform 0.35s ease-out" {...demoProps('t0')}><button type="button" className="aw-button" data-variant="primary" onClick={() => setCount(value => value + 1)} {...demoProps('t1')}>靠近并点击 · {count}</button></Component>
    </div>
  );
}
