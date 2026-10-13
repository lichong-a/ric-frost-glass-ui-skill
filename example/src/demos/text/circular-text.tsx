// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/TextAnimations/CircularText/CircularText';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

// 环形排字缓慢旋转，悬停暂停。

export default function CircularTextDemo() {
  const { props: demoProps } = useDemoConfig();
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink, fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 650, padding: 24 }}>
      <><style>{`.aw-rb-circular.circular-text { color: #52604e; font-weight: 650; }`}</style><Component text="AGENT·WAN·FLOW·" spinDuration={26} onHover="pause" className="aw-rb-circular" {...demoProps('t0')} /></>
    </div>
  );
}
