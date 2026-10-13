import { useState } from 'react';
import ScrubField from '../../../.upstream/src/ts-default/Micro/ScrubField/ScrubField';
import { palette, DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
import { useDemoConfig, useDemoState } from '../../parameters/DemoConfig';
const cn=(names:string)=>componentClasses(styles,names);

export default function ScrubFieldDemo() {
  const { props: demoProps } = useDemoConfig();
  const [value, setValue] = useDemoState('state.value', 24);
  const [committed, setCommitted] = useState(24);
  return <DemoPanel title="Scrub Field · 拖动数值"><div className={cn("aw-micro-stack")}>
    <ScrubField label="模糊" suffix="px" value={value} min={0} max={48} step={1} onChange={setValue} onCommit={setCommitted} accent={palette.primary} chipColor={palette.surface} showDelta showFill {...demoProps('t0')} />
    <p className={cn("aw-micro-hint")}>拖动字段调节，或直接编辑数值；使用键盘完成精细调整。</p>
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">当前 {value}px，最近确认 {committed}px。</p>
  </div></DemoPanel>;
}
