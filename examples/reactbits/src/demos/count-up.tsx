// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/TextAnimations/CountUp/CountUp';
import { palette } from '../shared/demo-support';

// 以真实目录计数演示数字增长；重播可重新开始。

export default function CountUpDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink, fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 650, padding: 24 }}>
      <div style={{ textAlign: 'center', color: palette.ink }}><div style={{ fontSize: 80, fontWeight: 650, fontVariantNumeric: 'tabular-nums' }}><Component from={0} to={215} direction="up" duration={1.8} separator="," startWhen /></div><p style={{ fontSize: 14, color: palette.muted }}>本次目录中的组件数量</p></div>
    </div>
  );
}
