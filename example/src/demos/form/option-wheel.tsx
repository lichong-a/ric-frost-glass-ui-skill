// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/OptionWheel/OptionWheel';
import { palette } from '../../shared/demo-support';
import { useState } from "react";
import { useDemoConfig } from '../../parameters/DemoConfig';
// 使用真实曲面选项轮盘与选中状态。

export default function OptionWheelDemo() {
  const { props: demoProps } = useDemoConfig();
  const [status, setStatus] = useState("滚轮、拖动或方向键选择；声音默认关闭");

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ position: 'relative', height: 330, minHeight: 0, width: '100%' }}><Component items={['山雾', '茶庭', '沙洲', '静水', '林间', '岩纹']}
defaultSelected={1} textColor={palette.muted} activeColor={palette.ink}
side="left" fontSize={2} spacing={1.5} curve={0.6} tilt={4} blur={1.3}
fade={0.2} smoothing={180} inset={40} loop={false} draggable soundUrl=""
onChange={(_index, item) => setStatus('已选择：' + item)} {...demoProps('t0')} /></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}
