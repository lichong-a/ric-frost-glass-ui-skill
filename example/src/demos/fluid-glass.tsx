// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/FluidGlass/FluidGlass';
import { palette } from '../shared/demo-support';

// 真实Three/Fiber折射透镜，默认图片通过本地集成转换替换为自有素材。
// 需要本地lens.glb、cube.glb、bar.glb模型；按当前选择只展示lens模式，滚动可查看穿过透镜的内容。
// 此演示需要可用WebGL上下文；不支持时应显示能力提示，不声称效果已运行。

export default function FluidGlassDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 480, position: 'relative', overflow: 'hidden' }}>
      <Component mode="lens" backgroundColor={palette.canvas} textColor={palette.ink}
lensProps={{ ior: 1.12, thickness: 4, chromaticAberration: 0.025, anisotropy: 0.01 }} />
    </div>
  );
}
