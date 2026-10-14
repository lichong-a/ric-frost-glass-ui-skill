import { useState } from 'react';
import Component from '../../../.upstream/src/ts-default/Backgrounds/Hyperspeed/Hyperspeed';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

/** Agent Ric natural-tone preset for the real Hyperspeed component. */
export default function HyperspeedDemo() {
  const { props: demoProps } = useDemoConfig();
  const [boosting, setBoosting] = useState(false);
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          tailColors={[palette.terra, palette.sand]}
          headColors={[palette.ivory, palette.sage]}
          poleColors={[palette.sage]}
          roadColor={palette.primary}
          background={palette.ink}
          lineColor={palette.muted}
          speed={0.5}
          boost={1.6}
          density={24}
          poles={12}
          dust={30}
          glow={0.25}
          reflections={0.25}
          curvature={0.65}
          interactive
          onBoostStart={() => setBoosting(true)}
          onBoostEnd={() => setBoosting(false)} {...demoProps('t0')}
        />
        <p role="status" aria-live="polite" style={{ position: 'absolute', bottom: 18, left: 18, margin: 0, padding: '8px 12px', borderRadius: 10, background: palette.surface, color: palette.ink, pointerEvents: 'none', fontSize: 13 }}>{boosting ? '正在演示加速' : '按住画布体验加速，松开恢复'}</p>
      </div>
    </div>
  );
}
