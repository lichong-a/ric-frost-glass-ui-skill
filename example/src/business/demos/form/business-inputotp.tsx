import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Input.module.css';
import { componentClasses } from '../../class-names';
import { useState, useId, useRef } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { useDemoConfig } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
// 场景：分段录入短验证码，支持粘贴、方向键与退格；验证码校验由业务服务完成。
export default function InputOtpDemo() {
  const { props: demoProps } = useDemoConfig();
  const id = useId(); const [value, setValue] = useState<string[]>(Array(6).fill('')); const refs = useRef<Array<HTMLInputElement | null>>([]);
  function update(index: number, text: string) { const digits = text.replace(/\D/g,'').slice(0,6-index); setValue(current => { const next = [...current]; next[index] = ''; digits.split('').forEach((digit,offset) => next[index+offset] = digit); return next; }); if (digits.length) refs.current[Math.min(5,index + digits.length)]?.focus(); }
  return <BusinessDemo title="InputOtp · 分段验证码" description="输入或一次粘贴 6 位数字，方向键和退格移动焦点。"><fieldset className={cn('aw-business-fieldset')}><legend>本地验证码输入</legend><div data-ui="aw-business-otp" className={cn("aw-business-otp")}>{value.map((digit,index) => <input className={cn('aw-business-input')} key={index} id={`${id}-${index}`} ref={element => { refs.current[index] = element; }} aria-label={`验证码第 ${index+1} 位`} onFocus={event => event.currentTarget.select()} inputMode="numeric" value={digit} maxLength={6} onChange={event => update(index,event.target.value)} onPaste={event => { event.preventDefault(); update(index,event.clipboardData.getData('text')); }} onKeyDown={event => { if (event.key === 'Backspace' && !digit && index) { event.preventDefault(); refs.current[index-1]?.focus(); } else if (event.key === 'ArrowLeft') refs.current[Math.max(0,index-1)]?.focus(); else if (event.key === 'ArrowRight') refs.current[Math.min(5,index+1)]?.focus(); }} {...demoProps('t0')} />)}</div></fieldset><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">已输入 {value.filter(Boolean).length}/6 位；当前仅演示输入，不请求验证服务。</p></BusinessDemo>;
}
