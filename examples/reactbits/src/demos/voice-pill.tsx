import { useState } from 'react';
import VoicePill from '../../.upstream/src/ts-default/Micro/VoicePill/VoicePill';
import { palette, DemoPanel } from '../shared/demo-support';
import '../shared/micro-demos.css';

export default function VoicePillDemo() {
  const [message, setMessage] = useState('点击开始模拟，再次点击结束。');
  return <DemoPanel title="Voice Pill · 语音胶囊"><div className="aw-micro-stack">
    <VoicePill reactive="simulated" mode="toggle" waveform showTime size={40} background={palette.surface} accentColor={palette.primary} iconColor={palette.ink} ariaLabel="开始或停止模拟语音波形" onStart={() => setMessage('正在播放模拟语音波形。')} onStop={detail => setMessage(`模拟结束，用时 ${(detail.duration / 1000).toFixed(1)} 秒；原因：${detail.reason}。`)} />
    <p className="aw-micro-status" role="status" aria-live="polite">{message}</p>
    <p className="aw-micro-hint">仅模拟波形与计时，不请求麦克风，不录音。</p>
  </div></DemoPanel>;
}
