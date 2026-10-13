// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/TextAnimations/CountUp/CountUp';
import { palette } from '../../shared/demo-support';
import { entries } from '../../gallery-catalog';
import { useDemoConfig } from '../../parameters/DemoConfig';
// 终值来自页面共用的完整组件目录，新增或移除组件后自动更新；重播可重新开始。
// 大字号使用独立行高，说明文字放在下一行并保留间距。

export default function CountUpDemo() {
  const { props: demoProps } = useDemoConfig();
  const total = entries.length;
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink, padding: 24 }}>
      <div style={{ display: 'grid', justifyItems: 'center', gap: 20, textAlign: 'center', color: palette.ink }}><div style={{ fontSize: 'clamp(56px, 14vw, 80px)', lineHeight: 1.4, fontWeight: 650, fontVariantNumeric: 'tabular-nums' }}><Component from={0} to={total} direction="up" duration={1.8} separator="," startWhen {...demoProps('t0')} /></div><p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, fontWeight: 400, color: palette.muted }}>本次目录中的组件数量</p></div>
    </div>
  );
}
