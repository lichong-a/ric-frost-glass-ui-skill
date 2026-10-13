import { useState } from 'react';
import Component from '../../../.upstream/src/ts-default/Components/BubbleMenu/BubbleMenu';
import styles from './bubble-menu.module.css';
import { useDemoConfig } from '../../parameters/DemoConfig';

export default function BubbleMenuDemo() {
  const { props: demoProps } = useDemoConfig();
  const [status, setStatus] = useState('点击右上角展开导航。');
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <section className={styles.stage} data-visual-demo="bubble-menu"
      onClickCapture={event => {
        const link = (event.target as Element).closest('a');
        if (link) { event.preventDefault(); setStatus('已选择：' + link.textContent); }
      }}>
      {!menuOpen && <div className={styles.intro}><span className={styles.eyebrow}>BUBBLE MENU</span><h2 className={styles.title}>让创意自由展开</h2><p className={styles.description}>展开导航，选择下一处灵感。</p></div>}
      <Component logo={<strong className={styles.logo}>Agent Wan</strong>}
        items={['工作台', '智能体', '技能', '设置'].map((label, index) => ({
          label, href: '#section-' + index, ariaLabel: label, rotation: [-8, 8, -6, 6][index],
          hoverStyles: { bgColor: '#c2e3ce', textColor: '#10251d' },
        }))}
        menuAriaLabel="展开或收起示例导航" menuBg="#faf7f0" menuContentColor="#10251d"
        useFixedPosition={false} animationDuration={0.6} staggerDelay={0.12}
        onMenuClick={open => { setMenuOpen(open); setStatus(open ? '导航已展开，点击菜单项选择。' : '导航已收起。'); }} {...demoProps('t0')} />
      <p className={styles.status} role="status" aria-live="polite">{status}</p>
    </section>
  );
}
