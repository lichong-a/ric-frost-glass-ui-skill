import { useState } from 'react';
import DodgeField from '../../.upstream/src/ts-default/Micro/DodgeField/DodgeField';
import { palette, DemoPanel } from '../shared/demo-support';
import '../shared/micro-demos.css';

export default function DodgeFieldDemo() {
  const [message, setMessage] = useState('试着移动到按钮附近。');
  const [revision, setRevision] = useState(0);
  return <DemoPanel title="Dodge Field · 避让微交互"><div className="aw-micro-stack">
    <div className="aw-micro-wide"><DodgeField key={revision} inkColor={palette.ink} contrastColor={palette.ivory} fieldHeight={280} patience={4} taunts={['再近一点', '向左试试', '就要到了']} notice="可以抓住了" onDodge={count => setMessage(`已避让 ${count} 次`)} onRelent={() => setMessage('按钮已停止避让，可直接点击。')} onCatch={() => setMessage('已抓住演示按钮。')}><button className="aw-micro-action" type="button">试着抓住我</button></DodgeField></div>
    <div className="aw-micro-controls"><button type="button" onClick={() => { setRevision(value => value + 1); setMessage('演示已重置。'); }}>重置</button></div>
    <p className="aw-micro-status" role="status" aria-live="polite">{message}</p>
    <p className="aw-micro-hint">用于趣味展示，不用于提交、取消或其他关键业务操作。</p>
  </div></DemoPanel>;
}
