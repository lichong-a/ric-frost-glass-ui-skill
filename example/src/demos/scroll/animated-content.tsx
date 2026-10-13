// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Animations/AnimatedContent/AnimatedContent';
import { DemoPanel, palette } from '../../shared/demo-support';
import { useState } from "react";
import { useDemoConfig } from '../../parameters/DemoConfig';
// 完整内容块执行真实入场动画，重播可再次查看。
// 数字明确标记为示例数据，查看工作流按钮切换本地说明并通过aria-live播报。

export default function AnimatedContentDemo() {
  const { props: demoProps } = useDemoConfig();
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink, fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 650, padding: 24 }}>
      <Component distance={36} direction="vertical" duration={0.6} ease="power3.out"
initialOpacity={0} animateOpacity scale={0.98} threshold={0.1} delay={0.1} {...demoProps('t0')}><DemoPanel title="技能执行示例" style={{ width: 'min(100%, 400px)', fontSize: 16, fontWeight: 400 }}><p>示例数据：12 个工具，3 个 Agent。</p><button type="button" className="aw-button" data-variant="primary" aria-expanded={showDetails} aria-controls="animated-content-details" onClick={() => setShowDetails(value => !value)} {...demoProps('t1')}>{showDetails ? '收起工作流' : '查看工作流'}</button><div id="animated-content-details" role="status" aria-live="polite">{showDetails ? <p>此示例展示：输入任务 → 选择技能 → 生成结果。</p> : null}</div></DemoPanel></Component>
    </div>
  );
}
