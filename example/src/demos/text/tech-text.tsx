// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/TextAnimations/TechText/TechText';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

// 将指针移入字母，查看虚线路径；拉丁示例避免把字体字形差异误认为组件缺失。
// 此演示使用Canvas；确保容器拥有非零宽高。

export default function TechTextDemo() {
  const { props: demoProps } = useDemoConfig();
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component text="Agent Ric" fontFamily="sans-serif" fontWeight={650} fontSize={100}
color={palette.ink} accentColor={palette.primary} reveal="letter"
dashLength={4} dashGap={2} specks={8} reach={110} speed={0.55} {...demoProps('t0')} />
    </div>
  );
}
