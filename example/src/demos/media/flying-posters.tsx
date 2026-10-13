import { useState } from 'react';
import Component from '../../../.upstream/src/ts-default/Components/FlyingPosters/FlyingPosters';
import bloom from '../../assets/restoration/chromatic-bloom.svg';
import canopy from '../../assets/restoration/prismatic-canopy.svg';
import tide from '../../assets/restoration/mineral-tide.svg';
import dunes from '../../assets/restoration/solar-dunes.svg';
import orbit from '../../assets/restoration/nocturne-orbit.svg';
import fold from '../../assets/restoration/vermilion-fold.svg';
import styles from './flying-posters.module.css';
import { useDemoConfig } from '../../parameters/DemoConfig';

const artwork = [bloom, canopy, tide, dunes, orbit, fold];
const labels = ['色彩绽放', '棱镜树冠', '矿物潮汐', '太阳沙丘', '夜间轨道', '朱红折叠'];
const items = artwork.map((image, index) => ({ image, alt: labels[index] }));

export default function FlyingPostersDemo() {
  const { props: demoProps } = useDemoConfig();
  const [status, setStatus] = useState('点击海报选择作品。');
  return (
    <div className={styles.stage} data-visual-demo="flying-posters">
      <div className={styles.field}>
        <Component items={items} planeWidth={300} planeHeight={330} distortion={3}
          scrollEase={0.025} cameraFov={45} cameraZ={20} gap={48} columns={1}
          radius={0.06} rotation={180} speed={0} lean={0.2} fade={0.15} shading={0.25}
          wheel drag onItemClick={(_item, index) => setStatus('已选择：' + labels[index % labels.length])} {...demoProps('t0')} />
      </div>
      <div className={styles.caption}><p className={styles.hint}>滚动鼠标或按住拖动，浏览翻转的 3D 海报</p><p className={styles.status} role="status" aria-live="polite">{status}</p></div>
    </div>
  );
}
