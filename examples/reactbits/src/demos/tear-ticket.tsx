import { useState } from 'react';
import TearTicket from '../../.upstream/src/ts-default/Micro/TearTicket/TearTicket';
import { palette, DemoPanel } from '../shared/demo-support';
import '../shared/micro-demos.css';

export default function TearTicketDemo() {
  const [torn, setTorn] = useState(false);
  return <DemoPanel title="Tear Ticket · 撕取票据"><div className="aw-micro-stack">
    <TearTicket torn={torn} onTear={() => setTorn(true)} width={320} height={210} stubSize={86} radius={20} background={palette.surface} color={palette.ink} stubBackground={palette.sage} border borderColor="rgba(82,96,78,.22)" ariaLabel="拖动撕取演示票据" stub={<div className="aw-micro-card" style={{ padding: 14 }}><strong>DEMO</strong><span>撕取</span></div>}><div className="aw-micro-card"><span>AGENT WAN</span><h3 style={{ fontSize: 23 }}>工作坊通行证</h3><p>本地交互示例<br />拖动右侧票根</p></div></TearTicket>
    <div className="aw-micro-controls"><button type="button" onClick={() => setTorn(false)}>恢复票据</button></div>
    <p className="aw-micro-status" role="status" aria-live="polite">票根：{torn ? '已撕取' : '完整'}</p>
  </div></DemoPanel>;
}
