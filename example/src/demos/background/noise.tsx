// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Animations/Noise/Noise';
import { MEDIA, palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

// 示例放大颗粒以便观察；用于实际后台环境层时应按UI规范进一步降低强度。
// 此演示使用Canvas；确保容器拥有非零宽高。

export default function NoiseDemo() {
  const { props: demoProps } = useDemoConfig();
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ position: 'relative', width: '100%', height: 340, overflow: 'hidden', borderRadius: 20 }}><img src={MEDIA[0]} alt="颗粒材质示意图" style={{ width: '100%', height: '100%', objectFit: 'cover' }} {...demoProps('t0')} /><Component opacity={0.14} size={1} fps={20} blendMode="overlay" contrast={0.4} colored={false} dust={0.03} scratches={0} scanlines={0} flicker={0} fixed={false} zIndex={2} {...demoProps('t1')} /></div>
    </div>
  );
}
