import { useState } from 'react';
import HoldButton from '../../../.upstream/src/ts-default/Micro/HoldButton/HoldButton';
import { palette, DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
import { useDemoConfig } from '../../parameters/DemoConfig';
const cn=(names:string)=>componentClasses(styles,names);

export default function HoldButtonDemo() {
  const { props: demoProps } = useDemoConfig();
  const [message, setMessage] = useState('按住按钮约 1 秒完成本地模拟操作。');
  return <DemoPanel title="Hold Button · 长按确认"><div className={cn("aw-micro-stack")}>
    <HoldButton doneLabel="确认完成" backgroundColor={palette.surface} fillColor={palette.primary} textColor={palette.ink} fillTextColor={palette.ivory} holdTime={1000} radius={10} wave glow={false} resetAfter={1800} onHold={() => setMessage('本地模拟操作已确认。')} onTap={() => setMessage('按下时间不足，请继续按住。')} {...demoProps('t0')}>按住确认</HoldButton>
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">{message}</p>
  </div></DemoPanel>;
}
