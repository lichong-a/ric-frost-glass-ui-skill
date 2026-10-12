import { useState } from 'react';
import ThoughtLine from '../../.upstream/src/ts-default/Micro/ThoughtLine/ThoughtLine';
import { palette, DemoPanel } from '../shared/demo-support';
import '../shared/micro-demos.css';

const steps = ['读取示例设计规范', '整理组件与页面依赖', '准备验收检查项'];
export default function ThoughtLineDemo() {
  const [working, setWorking] = useState(true);
  const [message, setMessage] = useState('本地演示任务进行中。');
  const [revision, setRevision] = useState(0);
  return <DemoPanel title="Thought Line · 任务过程提示"><div className="aw-micro-stack">
    <ThoughtLine key={revision} label="正在整理示例资料" doneLabel="整理完成" steps={steps} working={working} color={palette.ink} glyphColor={palette.primary} fontSize={15} shimmer={false} collapsible collapseOnSettle onSettle={seconds => setMessage(`本地演示任务结束，用时约 ${seconds.toFixed(1)} 秒。`)} />
    <div className="aw-micro-controls"><button type="button" onClick={() => { if (working) setWorking(false); else { setRevision(value => value + 1); setWorking(true); setMessage('本地演示任务重新开始。'); } }}>{working ? '完成模拟任务' : '重新演示'}</button></div>
    <p className="aw-micro-status" role="status" aria-live="polite">{message}</p>
    <p className="aw-micro-hint">展示用户可见的任务步骤，不代表模型内部推理内容。</p>
  </div></DemoPanel>;
}
