import ownedStyles0 from './Button.module.css';
import ownedStyles1 from './DemoLayout.module.css';
import ownedStyles2 from './MediaViewer.module.css';
import ownedStyles3 from './SelectOptions.module.css';
import { componentClasses } from '../class-names';
import { useId } from 'react';
import { LayoutGroup, motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { controlSpring, useBusinessReducedMotion } from '../motion-preference';
import { Button } from './Button';
import { SelectionIndicator } from './SelectionIndicator';
import { MorphImage } from './MorphImage';

const ownedStyles={...ownedStyles0,...ownedStyles1,...ownedStyles2,...ownedStyles3};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export function MediaViewer({ sources, index, onChange, label, thumbnails = false }: { sources: readonly string[]; index: number; onChange: (index: number) => void; label: string; thumbnails?: boolean }) {
  const id = useId();
  const reduced = useBusinessReducedMotion();
  const move = (direction: number) => onChange((index + direction + sources.length) % sources.length);
  if (!sources.length) return <p data-ui="aw-business-empty" className={cn("aw-business-empty")}>暂无图片</p>;
  return <LayoutGroup id={id}><section data-ui="aw-business-media-viewer" className={cn("aw-business-media-viewer")} tabIndex={0} aria-label={label} aria-roledescription="轮播" onKeyDown={event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key) || event.target !== event.currentTarget) return;
    event.preventDefault();
    if (event.key === 'Home') onChange(0);
    else if (event.key === 'End') onChange(sources.length - 1);
    else move(event.key === 'ArrowLeft' ? -1 : 1);
  }}>
    <MorphImage source={sources[index]} identity={index} alt={`自然色示意图${index + 1}`} caption={<><span>AGENT RIC / NATURAL PALETTE</span><strong>自然色影像 <span>{String(index + 1).padStart(2, '0')}</span></strong></>} />
    <div data-ui="aw-business-media-controls" className={cn("aw-business-media-controls")}><Button className={cn("aw-business-media-control")} variant="secondary" aria-label="上一张" onClick={() => move(-1)}><ArrowLeft size={17} />上一张</Button>
      <div data-ui="aw-business-media-dots" className={cn("aw-business-media-dots")} role="group" aria-label="图片位置">{sources.map((source, position) => <button className={cn('aw-business-button-feedback')} type="button" key={source} aria-label={`转到图片${position + 1}`} aria-pressed={index === position} onClick={() => onChange(position)}>
        <motion.span aria-hidden="true" animate={{ width: index === position ? 28 : 7 }} transition={reduced ? { duration: 0 } : controlSpring} /></button>)}</div>
      <Button className={cn("aw-business-media-control")} variant="secondary" aria-label="下一张" onClick={() => move(1)}>下一张<ArrowRight size={17} /></Button></div>
    {thumbnails ? <div data-ui="aw-business-media-thumbnails" className={cn("aw-business-media-thumbnails")} role="group" aria-label="图片缩略图">{sources.map((source, position) => <button className={cn('aw-business-button-feedback')} type="button" key={source} aria-label={`查看图片${position + 1}`} aria-pressed={index === position} onClick={() => onChange(position)}>
      {index === position ? <SelectionIndicator identity={`${id}-thumbnail`} /> : null}<img src={source} alt="" draggable={false} /></button>)}</div> : null}
    <p data-ui="aw-business-status" className={cn("aw-business-status aw-business-media-position")} role="status" aria-live="polite">{index + 1} / {sources.length}</p>
  </section></LayoutGroup>;
}
