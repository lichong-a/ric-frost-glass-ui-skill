import ownedStyles0 from './MorphImage.module.css';
import { componentClasses } from '../class-names';
import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { AnimatePresence, motion, useIsPresent } from 'motion/react';
import { useBusinessReducedMotion } from '../motion-preference';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
function ImageLayer({ source, alt, direction, reduced }: { source: string; alt: string; direction: number; reduced: boolean }) {
  const present = useIsPresent();
  return <motion.img src={source} alt={present ? alt : ''} aria-hidden={!present || undefined} draggable={false}
    initial={reduced ? false : { clipPath: direction > 0 ? 'polygon(100% 0, 100% 0, 100% 100%, 85% 100%)' : 'polygon(0 0, 15% 0, 0 100%, 0 100%)', scale: 1.08 }}
    animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', scale: 1 }} exit={{ scale: reduced ? 1 : 1.025 }}
    transition={{ duration: reduced ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }} />;
}
export function MorphImage({ source, alt, caption, identity }: { source: string; alt: string; caption?: ReactNode; identity?: string | number }) {
  const reduced = useBusinessReducedMotion();
  const last = useRef(identity);
  const direction = typeof identity === 'number' && typeof last.current === 'number' && identity < last.current ? -1 : 1;
  useLayoutEffect(() => { last.current = identity; }, [identity]);
  return <div data-ui="aw-business-morph-image" className={cn("aw-business-morph-image")}><AnimatePresence initial={false}>
    <ImageLayer key={source} source={source} alt={alt} direction={direction} reduced={reduced} />
  </AnimatePresence>{caption ? <div data-ui="aw-business-media-caption" className={cn("aw-business-media-caption")}>{caption}</div> : null}</div>;
}
