import { useState } from 'react';
import Component from '../../../.upstream/src/ts-default/Components/Masonry/Masonry';
import bloom from '../../assets/restoration/chromatic-bloom.svg';
import canopy from '../../assets/restoration/prismatic-canopy.svg';
import tide from '../../assets/restoration/mineral-tide.svg';
import dunes from '../../assets/restoration/solar-dunes.svg';
import orbit from '../../assets/restoration/nocturne-orbit.svg';
import fold from '../../assets/restoration/vermilion-fold.svg';
import styles from './masonry.module.css';
import { useDemoConfig } from '../../parameters/DemoConfig';

const artwork = [bloom, canopy, tide, dunes, orbit, fold];
const labels = ['色彩绽放', '棱镜树冠', '矿物潮汐', '太阳沙丘', '夜间轨道', '朱红折叠'];
const items = Array.from({ length: 12 }, (_, index) => ({
  id: 'art-' + index, img: artwork[index % artwork.length], url: '#art-' + index,
  height: [420, 600, 360, 500, 640, 440][index % 6],
}));

export default function MasonryDemo() {
  const { props: demoProps } = useDemoConfig();
  const [selected, setSelected] = useState('点击素材卡片选择作品；调整预览宽度可观察重排。');
  return (
    <section className={styles.stage} data-visual-demo="masonry">
      <header className={styles.header}><span className={styles.eyebrow}>COLOR STUDIES</span><h2 className={styles.title}>色彩的不同形态</h2><p className={styles.status} role="status" aria-live="polite">{selected}</p></header>
      <div className={styles.grid} onClickCapture={event => {
        const item = (event.target as Element).closest('[data-key]');
        if (item) {
          event.preventDefault(); event.stopPropagation();
          const index = Number(item.getAttribute('data-key')?.replace('art-', ''));
          setSelected('已选择：' + labels[index % labels.length]);
        }
      }}>
        <Component items={items} ease="power3.out" duration={0.6} stagger={0.06}
          animateFrom="bottom" scaleOnHover hoverScale={0.97} blurToFocus colorShiftOnHover={false} {...demoProps('t0')} />
      </div>
    </section>
  );
}
