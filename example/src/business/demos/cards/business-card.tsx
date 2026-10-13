import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { motion } from 'motion/react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { ToggleButton } from '../../components/ToggleButton';
import { controlSpring } from '../../motion-preference';
import { useBusinessReducedMotion } from '../../motion-preference';
import { useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessCardDemo() {
  const [saved, setSaved] = useDemoState('state.saved', false);
  const reduced = useBusinessReducedMotion();
  return <BusinessDemo title="Card" description="卡片悬停轻盈抬升，收藏按钮以弹性图标和状态过渡回应。">
    <motion.article data-ui="aw-business-item" className={cn("aw-business-item")} whileHover={reduced ? undefined : { y: -4 }} transition={reduced ? { duration: 0 } : controlSpring} style={{ display: 'grid', gap: 15 }}><h3>资料整理助手</h3><p>将零散记录整理为有序的工作清单。</p><div><ToggleButton pressed={saved} onPressedChange={setSaved}>{saved ? '撤销收藏' : '收藏卡片'}</ToggleButton></div></motion.article>
    <p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">{saved ? '已在当前示例收藏。' : '尚未收藏。'}</p>
  </BusinessDemo>;
}
