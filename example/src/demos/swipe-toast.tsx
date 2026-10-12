import { useState } from 'react';
import SwipeToast from '../../.upstream/src/ts-default/Micro/SwipeToast/SwipeToast';
import { palette, DemoPanel } from '../shared/demo-support';
import '../shared/micro-demos.css';

export default function SwipeToastDemo() {
  const [open, setOpen] = useState(true);
  const [revision, setRevision] = useState(0);
  const [message, setMessage] = useState('通知已显示，可滑动、关闭或撤销。');
  return <DemoPanel title="Swipe Toast · 可滑动通知"><div className="aw-micro-stack">
    <div style={{ minHeight: 150, display: 'flex', alignItems: 'center', maxWidth: '100%' }}><SwipeToast key={revision} title="演示配置已保存" description="这是本地模拟通知。" actionLabel="撤销" open={open} onClose={reason => { setOpen(false); setMessage(`通知已关闭：${reason}`); }} onAction={() => { setMessage('已撤销本地演示操作。'); setOpen(false); }} background={palette.surface} color={palette.ink} fuseColor={palette.primary} width={320} radius={16} duration={7000} closeButton inline /></div>
    <div className="aw-micro-controls"><button type="button" onClick={() => { setRevision(value => value + 1); setOpen(true); setMessage('通知已重新显示。'); }}>显示通知</button></div>
    <p className="aw-micro-status" role="status" aria-live="polite">{message}</p>
  </div></DemoPanel>;
}
