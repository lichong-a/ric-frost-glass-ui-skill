import { useState } from 'react';
import SlideCommit from '../../.upstream/src/ts-default/Micro/SlideCommit/SlideCommit';
import SpringCheck from '../../.upstream/src/ts-default/Micro/SpringCheck/SpringCheck';
import { palette, DemoPanel } from '../shared/demo-support';
import '../shared/micro-demos.css';

export default function SlideCommitDemo() {
  const [simulateError, setSimulateError] = useState(false);
  const [message, setMessage] = useState('拖动滑块至右侧，提交本地模拟操作。');
  const [revision, setRevision] = useState(0);
  return <DemoPanel title="Slide Commit · 滑动确认"><div className="aw-micro-stack">
    <SlideCommit key={revision} label="滑动确认" doneLabel="模拟已确认" errorLabel="模拟失败，重试" trackColor={palette.surface} handleColor={palette.primary} successColor={palette.primary} dangerColor={palette.terra} width={300} height={56} radius={14} onConfirm={async () => { if (simulateError) throw new Error('本次示例设置为模拟失败。'); }} onDone={() => setMessage('本地模拟操作成功。')} onError={() => setMessage('已进入错误态，可重试或重置。')} />
    <div className="aw-micro-controls"><SpringCheck label="模拟失败" ariaLabel="模拟失败" checked={simulateError} onChange={checked => { setSimulateError(checked); setRevision(value => value + 1); setMessage(checked ? '已开启模拟失败，拖动滑块可查看错误态。' : '已关闭模拟失败，拖动滑块可完成操作。'); }} color={palette.ink} fillColor={palette.primary} checkColor={palette.ivory} boxSize={24} boxRadius={7} fontSize={14} strike="none" /><button type="button" onClick={() => { setRevision(value => value + 1); setMessage('滑块已重置。'); }}>重置</button></div>
    <p className="aw-micro-status" role="status" aria-live="polite">{message}</p>
  </div></DemoPanel>;
}
