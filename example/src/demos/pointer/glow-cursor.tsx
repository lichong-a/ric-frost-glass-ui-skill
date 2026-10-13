// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Animations/GlowCursor/GlowCursor';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

// 真实流动光迹限制在独立预览文档；移动与点击均可触发。
// 此演示需要可用的WebGL上下文；上下文创建失败时应显示能力提示，不能声称效果已经运行。

export default function GlowCursorDemo() {
  const { props: demoProps } = useDemoConfig();
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component color={palette.primary} secondaryColor={palette.sand} intensity={0.75}
trailWidth={2.5} linger={0.8} glow={0.65} clickBurst quality="medium"
theme="light" maxDevicePixelRatio={1.5} style={{ width: '100%', height: '100%' }} {...demoProps('t0')}><div style={{ height: 320, display: "grid", placeItems: "center", color: palette.ink }}><p>移动指针，留下柔和光迹</p></div></Component>
    </div>
  );
}
