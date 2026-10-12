// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Animations/ElectricBorder/ElectricBorder';
import { DemoPanel, palette } from '../shared/demo-support';

// 实际边缘动画；不传上游旧usage中已不存在的thickness属性。
// 此演示使用Canvas；确保容器拥有非零宽高。

export default function ElectricBorderDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink, fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 650, padding: 24 }}>
      <Component color={palette.primary} speed={0.5} chaos={0.25} borderRadius={20}
style={{ borderRadius: 20, width: 'min(100%, 380px)' }}><DemoPanel title="连接已建立"><p>低强度的电弧沿圆角边缘移动。</p></DemoPanel></Component>
    </div>
  );
}
