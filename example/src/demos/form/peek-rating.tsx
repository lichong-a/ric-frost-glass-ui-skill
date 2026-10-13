import { useState } from 'react';
import PeekRating from '../../../.upstream/src/ts-default/Micro/PeekRating/PeekRating';
import { palette, DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
import { useDemoConfig, useDemoState } from '../../parameters/DemoConfig';
const cn=(names:string)=>componentClasses(styles,names);

const labels = ['需要改进', '基本可用', '符合预期', '体验良好', '非常满意'];
export default function PeekRatingDemo() {
  const { props: demoProps } = useDemoConfig();
  const [value, setValue] = useDemoState('state.value', 3);
  const [preview, setPreview] = useState<number | null>(null);
  return <DemoPanel title="Peek Rating · 预览评分"><div className={cn("aw-micro-stack")}>
    <PeekRating value={value} onChange={setValue} onPreview={setPreview} count={5} labels={labels} activeColor={palette.sand} idleColor={palette.sage} tipColor={palette.primary} tipTextColor={palette.ivory} size={40} allowClear ariaLabel="为本次示例体验评分" {...demoProps('t0')} />
    <p className={cn("aw-micro-hint")}>悬停查看提示，点击提交评分；再次点击当前分数可清空。</p>
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">已选：{value ? `${value} 分 · ${labels[value - 1]}` : '未评分'}{preview ? `；正在预览 ${preview} 分` : ''}</p>
  </div></DemoPanel>;
}
