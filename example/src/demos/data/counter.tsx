// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/Counter/Counter';
import { palette } from '../../shared/demo-support';
import { useState } from "react";
import { useDemoConfig, useDemoState } from '../../parameters/DemoConfig';
// 真实数字滚轮由外部state驱动，按钮改变数字而不是仅展示静态值。

export default function CounterDemo() {
  const { props: demoProps } = useDemoConfig();
  const [value, setValue] = useDemoState('state.value', 128);
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 340, position: 'relative', display: 'grid', placeItems: 'center', padding: 24, color: palette.ink }}>
      <div style={{ display: 'grid', gap: 24, placeItems: 'center' }}><Component value={value} fontSize={68} padding={6} gap={4} borderRadius={12} textColor={palette.ink} fontWeight={650} gradientHeight={18} gradientFrom={palette.ivory} gradientTo="transparent" containerStyle={{ background: palette.ivory, padding: '12px 18px', borderRadius: 12 }} digitStyle={{ overflow: 'hidden' }} {...demoProps('t0')} /><div style={{ display: 'flex', gap: 12 }}><button type="button" className="aw-button" data-variant="secondary" onClick={() => setValue(number => Math.max(0, number - 1))} {...demoProps('t1')}>减少</button><button type="button" className="aw-button" data-variant="primary" onClick={() => setValue(number => number + 1)} {...demoProps('t2')}>增加</button></div><p aria-live="polite" style={{ color: palette.muted }}>当前数值：{value}</p></div>
    </div>
  );
}
