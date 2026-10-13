import type { ComponentProps } from 'react';
import Component from '../../../.upstream/src/ts-default/Backgrounds/AeroShards/AeroShards';
import { palette } from '../../shared/demo-support';
import { useWebGPUCompatibility } from '../../effects/webgpu-compatibility/useWebGPUCompatibility';
import { createAeroShardsCanvas } from '../../effects/webgpu-compatibility/aero-canvas';
import styles from './aero-shards.module.css';
import { useDemoConfig } from '../../parameters/DemoConfig';

export default function AeroShardsDemo() {
  const { props: demoProps } = useDemoConfig();
  const effect = useWebGPUCompatibility<ComponentProps<typeof Component>>(
        <Component
          backgroundColor={palette.ink}
          shardColor={palette.sage}
          accentColor={palette.sand}
          material="pearl"
          detail="balanced"
          flow="stream"
          density={1.1}
          speed={0.5}
          spin={0.6}
          glow={0.4}
          bloom={0.12}
          grain={0.025}
          chromaticAberration={0}
          interaction="repel" {...demoProps('t0')}
        />,
    createAeroShardsCanvas,
  );
  return <div className={styles.stage} data-visual-demo="aero-shards">{effect}<p className={styles.hint}>移动指针拨动碎片 · 按住聚拢 · 点击扩散</p></div>;
}
