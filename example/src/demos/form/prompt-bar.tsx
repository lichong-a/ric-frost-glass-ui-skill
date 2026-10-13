import { useState } from 'react';
import PromptBar from '../../../.upstream/src/ts-default/Micro/PromptBar/PromptBar';
import { palette, DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
import { useDemoConfig } from '../../parameters/DemoConfig';
const cn=(names:string)=>componentClasses(styles,names);

const sources = [{ key: 'design', name: '设计规范', description: '本地演示上下文' }, { key: 'files', name: '附加示例文件', description: '只添加模拟文件名', attach: true }];
const commands = [{ key: 'summarize', name: '/总结', description: '生成本地演示摘要' }, { key: 'compare', name: '/比较', description: '比较两个方案' }];
const models = [{ key: 'quick', name: '示例 · 快速', tag: '本地' }, { key: 'deep', name: '示例 · 深入', tag: '本地' }];
export default function PromptBarDemo() {
  const { props: demoProps } = useDemoConfig();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('输入内容，使用 @ 或 / 选择上下文与命令。');
  return <DemoPanel title="Prompt Bar · Agent 输入栏"><div className={cn("aw-micro-stack")}>
    <div className={cn("aw-micro-wide")}><PromptBar placeholder="描述想要构建的页面…" sources={sources} commands={commands} models={models} defaultModel="quick" efforts={['低', '中', '高']} defaultEffort="中" width={500} background={palette.surface} color={palette.ink} menuBackground={palette.ivory} sparkColor={palette.sage} radius={20} busy={busy} onSend={(text, detail) => { setBusy(true); setMessage(`已接收本地模拟请求：${text}；${detail.model?.name ?? '默认演示模型'}，附带 ${detail.attachments.length} 项。`); }} onStop={() => { setBusy(false); setMessage('本地模拟任务已停止。'); }} onAttach={() => { setMessage('已添加模拟文件名，没有读取本机文件。'); return 'design-notes-demo.md'; }} onDictate={() => { setMessage('已填入模拟语音文本，没有请求麦克风。'); return '根据霜玻璃规范创建一个技能管理页面'; }} onEffortChange={effort => setMessage(`演示推理强度：${effort}`)} {...demoProps('t0')} /></div>
    {busy ? <div className={cn("aw-micro-controls")}><button className={styles['aw-micro-action']} type="button" onClick={() => { setBusy(false); setMessage('本地模拟任务已完成。'); }} {...demoProps('t1')}>完成模拟任务</button></div> : null}
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">{message}</p>
    <p className={cn("aw-micro-hint")}>此示例展示输入、附件、命令、发送与停止状态，未连接模型或录音设备。</p>
  </div></DemoPanel>;
}
