// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/BorderGlow/BorderGlow';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

// 注意glowColor使用空格分隔RGB值；颜色数组均为规范自然色。
// 此演示需要可用WebGL上下文；不支持时应显示能力提示，不声称效果已运行。

export default function BorderGlowDemo() {
  const { props: demoProps } = useDemoConfig();
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 340, position: 'relative', display: 'grid', placeItems: 'center', padding: 24, color: palette.ink }}>
      <Component edgeSensitivity={26} glowColor="82 96 78" backgroundColor={palette.ivory}
borderRadius={20} glowRadius={24} glowIntensity={0.55} coneSpread={22}
animated={false} colors={[palette.primary, palette.sage, palette.sand]} fillOpacity={0.05} {...demoProps('t0')}><div style={{ padding: 32, color: palette.ink }}><h3>安静的轮廓</h3><p>将指针靠近边缘，观察光沿轮廓移动。</p></div></Component>
    </div>
  );
}
