import { useState } from 'react';
import TearTicket from '../../../.upstream/src/ts-default/Micro/TearTicket/TearTicket';
import { palette, DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
import { useDemoConfig } from '../../parameters/DemoConfig';
const cn=(names:string)=>componentClasses(styles,names);

export default function TearTicketDemo() {
  const { props: demoProps } = useDemoConfig();
  const [torn, setTorn] = useState(false);
  return <DemoPanel title="Tear Ticket · 撕取票据"><div className={cn("aw-micro-stack")}>
    <TearTicket torn={torn} onTear={() => setTorn(true)} width={320} height={210} stubSize={86} radius={20} background={palette.surface} color={palette.ink} stubBackground={palette.sage} border borderColor="rgba(82,96,78,.22)" ariaLabel="拖动撕取演示票据" stub={<div className={cn("aw-micro-card")} style={{ padding: 14 }}><strong>DEMO</strong><span>撕取</span></div>} {...demoProps('t0')}><div className={cn("aw-micro-card")}><span>AGENT RIC</span><h3 style={{ fontSize: 23 }}>工作坊通行证</h3><p>本地交互示例<br />拖动右侧票根</p></div></TearTicket>
    <div className={cn("aw-micro-controls")}><button className={styles['aw-micro-action']} type="button" onClick={() => setTorn(false)} {...demoProps('t1')}>恢复票据</button></div>
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">票根：{torn ? '已撕取' : '完整'}</p>
  </div></DemoPanel>;
}
