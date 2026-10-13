import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { motion } from 'motion/react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { controlSpring } from '../../motion-preference';
import { useBusinessReducedMotion } from '../../motion-preference';
import { useDemoConfig } from '../../../parameters/DemoConfig';

const ownedStyles={};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessDividerDemo() {
  const { props: demoProps } = useDemoConfig();
  const [vertical, setVertical] = useState(false);
  const reduced = useBusinessReducedMotion();
  return <BusinessDemo title="Divider" description="切换分隔方向时，内容位置与分隔线自然过渡。">
    <Button variant="secondary" onClick={() => setVertical(value => !value)} {...demoProps('t0')}>{vertical ? '改为水平分隔' : '改为垂直分隔'}</Button>
    <motion.div data-ui="aw-business-divider-layout" layout={!reduced} className={cn("aw-business-divider-layout")} style={{ display: 'flex', flexDirection: vertical ? 'row' : 'column', gap: 20, alignItems: 'stretch' }}>
      <motion.p layout={!reduced} transition={reduced ? { duration: 0 } : controlSpring}>内容区</motion.p>
      <motion.div layout={!reduced} role="separator" aria-orientation={vertical ? 'vertical' : 'horizontal'} transition={reduced ? { duration: 0 } : controlSpring} style={{ background: 'var(--aw-color-border-control)', width: vertical ? 1 : '100%', height: vertical ? 100 : 1, flexShrink: 0 }} />
      <motion.p layout={!reduced} transition={reduced ? { duration: 0 } : controlSpring}>操作区</motion.p>
    </motion.div>
  </BusinessDemo>;
}
