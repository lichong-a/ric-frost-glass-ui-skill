// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Animations/ShapeBlur/ShapeBlur';
import { palette } from '../shared/demo-support';

// 真实形状经过指针透镜区域时失焦；轻微色散保持自然色。
// 此演示需要可用的WebGL上下文；上下文创建失败时应显示能力提示，不能声称效果已经运行。

export default function ShapeBlurDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component shape="circle" size={0.55} fill color={palette.primary} blur={12}
lensSize={0.28} lensSoftness={0.7} chroma={0.04} idle spin={0.1} />
    </div>
  );
}
