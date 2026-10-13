import { useState } from 'react';
import CodeSlots, { type CodeSlotsStatus } from '../../../.upstream/src/ts-default/Micro/CodeSlots/CodeSlots';
import { palette, DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
import { useDemoConfig, useDemoState } from '../../parameters/DemoConfig';
const cn=(names:string)=>componentClasses(styles,names);

export default function CodeSlotsDemo() {
  const { props: demoProps } = useDemoConfig();
  const [value, setValue] = useDemoState('state.value', '');
  const [status, setStatus] = useState<CodeSlotsStatus>('idle');
  return <DemoPanel title="Code Slots · 验证码输入"><div className={cn("aw-micro-stack")}>
    <p className={cn("aw-micro-hint")}>输入演示码 246810 查看成功态，其他完整数字触发错误态。</p>
    <CodeSlots length={6} value={value} status={status} onChange={code => { setValue(code); setStatus('idle'); }} onComplete={code => setStatus(code === '246810' ? 'success' : 'error')} autoFocus={false} ariaLabel="六位演示验证码" accentColor={palette.primary} inkColor={palette.ink} slotColor={palette.surface} digitColor={palette.ink} dangerColor={palette.terra} slotSize={44} gap={8} radius={10} {...demoProps('t0')} />
    <div className={cn("aw-micro-controls")}><button className={styles['aw-micro-action']} type="button" onClick={() => { setValue(''); setStatus('idle'); }} {...demoProps('t1')}>清空重试</button></div>
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">{status === 'success' ? '演示校验成功' : status === 'error' ? '演示码不匹配，请重试' : `已输入 ${value.length} / 6 位`}</p>
  </div></DemoPanel>;
}
