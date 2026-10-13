import { useId, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, LayoutGroup, motion, useIsPresent } from 'motion/react';
import { BookOpen, Bot, ChevronDown, ChevronRight, Layers, LayoutDashboard, Plug, WandSparkles } from 'lucide-react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { AnimatedSwap } from '../../components/AnimatedSwap';
import { DropdownSurface } from '../../components/DropdownSurface';
import { SelectionIndicator } from '../../components/SelectionIndicator';
import { controlSpring, useBusinessReducedMotion } from '../../motion-preference';
import styles from './business-navigationmenu.module.css';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const primaryPages = [{ label: '工作台', icon: LayoutDashboard }, { label: '智能体', icon: Bot }];
const resources = [
  { label: '技能', description: '可复用的工作能力', icon: WandSparkles },
  { label: '知识', description: '工作空间的资料内容', icon: BookOpen },
  { label: '连接器', description: '已接入的服务入口', icon: Plug }
];

function ResourceLayer({ children, reduced }: { children: ReactNode; reduced: boolean }) {
  const present = useIsPresent();
  return <motion.div className={styles.resourceLayer} inert={!present} aria-hidden={!present || undefined} initial={reduced ? false : { height: 0, opacity: 0, y: -6 }} animate={{ height: 'auto', opacity: 1, y: 0 }} exit={{ height: 0, opacity: 0, y: reduced ? 0 : -4 }} transition={{ duration: reduced ? 0 : .22, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}

export default function BusinessNavigationMenuDemo() {
  const { props: demoProps } = useDemoConfig();
  const [selected, setSelected] = useDemoState('state.selected', '工作台');
  const [expanded, setExpanded] = useState(false);
  const resourceTrigger = useRef<HTMLButtonElement>(null);
  const prefix = useId();
  const reduced = useBusinessReducedMotion();

  return <BusinessDemo title="NavigationMenu" description="主导航切换工作区，资源菜单可展开并选择二级入口。">
    <LayoutGroup id={prefix}>
      <nav data-ui="aw-business-row" aria-label="主导航" className={styles.primaryNavigation} onKeyDown={event => { if (event.key === 'Escape' && expanded) { event.preventDefault(); setExpanded(false); resourceTrigger.current?.focus(); } }}>{primaryPages.map(({ label, icon: Icon }) => <Button variant="ghost" data-size="sm" className={styles.navigationItem} key={label} aria-current={selected === label ? 'page' : undefined} onClick={() => { setSelected(label); setExpanded(false); }} {...demoProps('t0')}>
        {selected === label ? <SelectionIndicator identity={`${prefix}-navigation`} /> : null}<Icon size={16} aria-hidden="true" /><span className={styles.navigationLabel}>{label}</span>
      </Button>)}
        <Button variant="ghost" data-size="sm" ref={resourceTrigger} className={styles.resourceTrigger} data-selected={resources.some(item => item.label === selected)} aria-expanded={expanded} aria-controls={expanded ? 'business-resource-nav' : undefined} onClick={() => setExpanded(value => !value)} {...demoProps('t2')}><Layers size={16} aria-hidden="true" />资源<motion.span className={styles.chevron} aria-hidden="true" animate={{ rotate: expanded ? 180 : 0 }} transition={reduced ? { duration: 0 } : controlSpring}><ChevronDown size={14} /></motion.span></Button>
      </nav>
    </LayoutGroup>
    <AnimatePresence initial={false}>{expanded ? <ResourceLayer key="resources" reduced={reduced}>
      <DropdownSurface className={styles.resourceSurface}>
        <nav id="business-resource-nav" aria-label="资源导航" className={styles.resourceNavigation} onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); setExpanded(false); resourceTrigger.current?.focus(); } }}>
          {resources.map(({ label, description, icon: Icon }) => <Button variant="ghost" className={styles.resourceItem} key={label} aria-current={selected === label ? 'page' : undefined} onClick={() => { setSelected(label); setExpanded(false); resourceTrigger.current?.focus(); }} {...demoProps('t4')}>
            <span className={styles.resourceIcon}><Icon size={18} aria-hidden="true" /></span><span className={styles.resourceCopy}><span className={styles.resourceLabel}>{label}</span><span className={styles.resourceDescription}>{description}</span></span><ChevronRight className={styles.resourceArrow} size={15} aria-hidden="true" />
          </Button>)}
        </nav>
      </DropdownSurface>
    </ResourceLayer> : null}</AnimatePresence>
    <section data-ui="aw-business-item" className={styles.workspace}><AnimatedSwap value={selected}><h3 className={styles.workspaceTitle}>{selected}</h3><p className={styles.workspaceCopy}>已切换到当前示例的{selected}工作区。</p></AnimatedSwap></section>
  </BusinessDemo>;
}
