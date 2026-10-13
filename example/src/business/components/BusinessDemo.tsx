import ownedStyles0 from './BusinessDemo.module.css';
import { componentClasses } from '../class-names';
import { type ReactNode } from 'react';
import { motion } from 'motion/react';
import { controlSpring, useBusinessReducedMotion } from '../motion-preference';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export function BusinessDemo({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  const reduced = useBusinessReducedMotion();
  return <motion.section data-ui="aw-business" className={cn("aw-business")} aria-label={`${title} 组件演示`} initial={reduced ? false : { y: 10 }} animate={{ y: 0 }} transition={reduced ? { duration: 0 } : controlSpring}><header data-ui="aw-business-heading" className={cn("aw-business-heading")}><span>业务基础组件</span><h2>{title}</h2>{description ? <p>{description}</p> : null}</header><div data-ui="aw-business-content" className={cn("aw-business-content")}>{children}</div></motion.section>;
}
