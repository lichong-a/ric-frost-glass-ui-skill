import type { ComponentProps } from 'react';
import Component from '../../../.upstream/src/ts-default/Backgrounds/ShapeWaves/ShapeWaves';
import { palette } from '../../shared/demo-support';
import { useWebGPUCompatibility } from '../../effects/webgpu-compatibility/useWebGPUCompatibility';
import { createShapeWavesCanvas } from '../../effects/webgpu-compatibility/shape-canvas';
import styles from './shape-waves.module.css';
import { useDemoConfig } from '../../parameters/DemoConfig';

export default function ShapeWavesDemo() {
  const { props: demoProps } = useDemoConfig();
  const effect = useWebGPUCompatibility<ComponentProps<typeof Component>>(
        <Component
          text="AGENT WAN"
          fontFamily="system-ui, sans-serif"
          fontWeight={600}
          textSize={0.5}
          shapes="mixed"
          cellSize={11}
          color={palette.sage}
          hoverColor={palette.ivory}
          backgroundColor={palette.ink}
          speed={0.55}
          glow={0.16}
          contrast={1.1}
          interactive {...demoProps('t0')}
        />,
    createShapeWavesCanvas,
  );
  return <div className={styles.stage} data-visual-demo="shape-waves">{effect}<p className={styles.hint}>移动指针点亮图形 · 点击释放波纹</p></div>;
}
