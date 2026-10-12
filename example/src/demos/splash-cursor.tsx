// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Animations/SplashCursor/SplashCursor';
import { palette } from '../shared/demo-support';

// 必须在独立iframe预览。上游实现固定整个viewport且没有完整卸载清理；切换时销毁iframe文档可释放该演示。
// 关闭彩虹模式，流体颜色使用苔绿；光标移动运行真实流体模拟。
// 此演示需要可用的WebGL上下文；上下文创建失败时应显示能力提示，不能声称效果已经运行。

export default function SplashCursorDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component SIM_RESOLUTION={96} DYE_RESOLUTION={512} RAINBOW_MODE={false}
COLOR={palette.primary} COLOR_UPDATE_SPEED={0} TRANSPARENT
SPLAT_RADIUS={0.15} SPLAT_FORCE={3000} CURL={10} PRESSURE_ITERATIONS={12} />
    </div>
  );
}
