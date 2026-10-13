// Authored integration demo; implementation is installed from the pinned official source.
import Component, { Step } from '../../../.upstream/src/ts-default/Components/Stepper/Stepper';
import { palette } from '../../shared/demo-support';
import { useState } from "react";
import { useDemoConfig, useDemoState } from '../../parameters/DemoConfig';
// 使用真实Step具名子组件，输入、下一步、返回与完成状态均可操作。

export default function StepperDemo() {
  const { props: demoProps } = useDemoConfig();
  const [status, setStatus] = useState("当前步骤：1");
const [name, setName] = useDemoState('state.name', '资料整理');
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 440, position: 'relative', overflow: 'auto' }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ minHeight: 350, width: 'min(100%, 560px)', margin: '0 auto', padding: 18 }}><Component initialStep={1} backButtonText="上一步" nextButtonText="继续"
completeButtonText="完成" theme="light" accentColor={palette.primary}
frame radius={20} width="100%" transition="slide" linear
onStepChange={step => setStatus('当前步骤：' + step)}
onFinalStepCompleted={() => setStatus('已完成示例配置')}
completedContent={<div style={{ padding: 24 }}><h3>准备完成</h3><p>这是示例流程，没有写入后台数据。</p></div>} {...demoProps('t0')}><Step title="选择目标" description="定义任务"><h3>创建工作流</h3><p>本示例将演示三步配置与完成状态。</p></Step><Step title="填写名称" description="方便识别"><label>工作流名称<input className="aw-input" value={name} onChange={event => setName(event.target.value)} placeholder="例如：资料整理" {...demoProps('t3')} /></label></Step><Step title="确认" description="检查内容"><h3>{name || '未命名工作流'}</h3><p>点击完成结束本地演示。</p></Step></Component></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}
