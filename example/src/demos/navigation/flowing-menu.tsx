import { useState } from 'react';
import Component from '../../../.upstream/src/ts-default/Components/FlowingMenu/FlowingMenu';
import canopy from '../../assets/restoration/prismatic-canopy.svg';
import tide from '../../assets/restoration/mineral-tide.svg';
import orbit from '../../assets/restoration/nocturne-orbit.svg';
import dunes from '../../assets/restoration/solar-dunes.svg';
import styles from './flowing-menu.module.css';
import { useDemoConfig } from '../../parameters/DemoConfig';

const items = [
  { link: '#canopy', text: '林间漫游', image: canopy },
  { link: '#mineral', text: '矿物色谱', image: tide },
  { link: '#orbit', text: '星际轨道', image: orbit },
  { link: '#solar', text: '太阳之境', image: dunes },
];

export default function FlowingMenuDemo() {
  const { props: demoProps } = useDemoConfig();
  const [status, setStatus] = useState('悬停菜单项，展开图文流动；点击选择。');
  return (
    <section className={styles.stage} data-visual-demo="flowing-menu" onClickCapture={event => {
      const link = (event.target as Element).closest('a');
      if (link) { event.preventDefault(); setStatus('已选择：' + link.textContent?.trim()); }
    }}>
      <div className={styles.menu}>
        <Component items={items} speed={18} textColor="#e9f1ea" bgColor="#10251d"
          marqueeBgColor="#dce9d7" marqueeTextColor="#10251d" borderColor="#ffffff26" {...demoProps('t0')} />
      </div>
      <p className={styles.status} role="status" aria-live="polite">{status}</p>
    </section>
  );
}
