// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Animations/ElasticMesh/ElasticMesh';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

// 拖动或按压真实膨胀文字网格，释放后回弹。
// 此演示需要可用的WebGL上下文；上下文创建失败时应显示能力提示，不能声称效果已经运行。

export default function ElasticMeshDemo() {
  const { props: demoProps } = useDemoConfig();
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component text="WAN" material="balloon" color={palette.primary} imageColors={false}
inflate={0.8} stiffness={0.6} wobble={0.35} stretch={0.7} press={0.7}
shadow={0.4} theme="light" dpr={1.5} {...demoProps('t0')} />
    </div>
  );
}
