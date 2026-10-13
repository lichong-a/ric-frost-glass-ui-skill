import ownedStyles0 from '../../components/Button.module.css';
import ownedStyles1 from '../../components/DemoLayout.module.css';
import ownedStyles2 from '../../components/Rating.module.css';
import { componentClasses } from '../../class-names';
import { useState, useRef } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { useDemoConfig } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1,...ownedStyles2};
const cn=(names:string)=>componentClasses(ownedStyles,names);
// 场景：用户对体验或对象进行分级评分，显示当前选择并允许重置。
export default function RatingDemo() {
  const { props: demoProps } = useDemoConfig();
  const [value, setValue] = useState(0); const refs = useRef<Array<HTMLButtonElement | null>>([]);
  return <BusinessDemo title="Rating · 评分" description="选择 1–5 星，左右方向键调整评分。"><div data-ui="aw-business-row" className={cn("aw-business-row aw-business-rating")} role="radiogroup" aria-label="组件体验评分">{[1,2,3,4,5].map(star => <button className={cn('aw-business-button-feedback')} key={star} ref={element => { refs.current[star-1] = element; }} type="button" role="radio" aria-checked={value === star} aria-label={`${star} 星`} tabIndex={(value || 1) === star ? 0 : -1} data-filled={star <= value} onClick={() => setValue(star)} onKeyDown={event => { if (['ArrowLeft','ArrowRight'].includes(event.key)) { event.preventDefault(); const next = Math.min(5,Math.max(1,star+(event.key === 'ArrowRight' ? 1 : -1))); setValue(next); refs.current[next-1]?.focus(); } }} {...demoProps('t0')}>★</button>)}</div><Button variant="secondary" onClick={() => setValue(0)} {...demoProps('t1')}>清除评分</Button><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">{value ? `${value} / 5 星` : '尚未评分'}</p></BusinessDemo>;
}
