import { useState } from 'react';
import Component from '../../../.upstream/src/ts-default/Components/StaggeredMenu/StaggeredMenu';
import { LOGO } from '../../shared/demo-support';
import styles from './staggered-menu.module.css';
import { useDemoConfig } from '../../parameters/DemoConfig';

export default function StaggeredMenuDemo() {
  const { props: demoProps } = useDemoConfig();
  const [status, setStatus] = useState('点击 Menu 展开导航。');
  return (
    <section className={styles.stage} data-visual-demo="staggered-menu"
      onClickCapture={event => {
        const link = (event.target as Element).closest('a');
        if (link) { event.preventDefault(); setStatus('已选择：' + link.textContent); }
      }}>
      <div className={styles.intro}><span className={styles.eyebrow}>STAGGERED MENU</span><h2 className={styles.title}>一层一层，进入下一站。</h2><p className={styles.description}>打开菜单，查看分层遮罩和错峰入场。</p></div>
      <Component position="right" items={['工作台', '智能体', '技能', '设置'].map((label, index) => ({
          label, ariaLabel: '选择' + label, link: '#section-' + index,
        }))} socialItems={[]} displaySocials={false} displayItemNumbering
        logoUrl={LOGO} menuButtonColor="#354c41" openMenuButtonColor="#354c41"
        colors={['#b4cabc', '#5b876c']} accentColor="#3f6651" closeOnClickAway isFixed={false}
        onMenuOpen={() => setStatus('分层菜单已展开。')}
        onMenuClose={() => setStatus('分层菜单已收起。')} {...demoProps('t0')} />
      <p className={styles.status} role="status" aria-live="polite">{status}</p>
    </section>
  );
}
