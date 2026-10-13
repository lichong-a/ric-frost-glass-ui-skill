import ownedStyles0 from './RangeSlider.module.css';
import { componentClasses } from '../class-names';
import { type CSSProperties, type InputHTMLAttributes } from 'react';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export function RangeSlider({ value = 0, min = 0, max = 100, className = '', style, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  const percentage = Number(max) > Number(min) ? Math.max(0, Math.min(100, (Number(value) - Number(min)) / (Number(max) - Number(min)) * 100)) : 0;
  return <input data-ui="aw-business-range" {...props} type="range" className={cn(`aw-business-range ${className}`)} min={min} max={max} value={value}
    style={{ ...style, '--business-range-progress': `${percentage}%` } as CSSProperties} />;
}
