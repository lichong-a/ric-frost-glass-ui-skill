import { SiReact, SiTypescript, SiVite, SiGithub, SiFigma, SiTailwindcss } from 'react-icons/si';
import Component from '../../../.upstream/src/ts-default/Animations/LogoLoop/LogoLoop';
import styles from './logo-loop.module.css';
import { useDemoConfig } from '../../parameters/DemoConfig';

const logos = [
  { node: <SiReact aria-hidden="true" />, title: 'React', ariaLabel: 'React' },
  { node: <SiTypescript aria-hidden="true" />, title: 'TypeScript', ariaLabel: 'TypeScript' },
  { node: <SiVite aria-hidden="true" />, title: 'Vite', ariaLabel: 'Vite' },
  { node: <SiGithub aria-hidden="true" />, title: 'GitHub', ariaLabel: 'GitHub' },
  { node: <SiFigma aria-hidden="true" />, title: 'Figma', ariaLabel: 'Figma' },
  { node: <SiTailwindcss aria-hidden="true" />, title: 'Tailwind CSS', ariaLabel: 'Tailwind CSS' },
];

export default function LogoLoopDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <section className={styles.stage} data-visual-demo="logo-loop">
      <span className={styles.eyebrow}>CREATIVE TOOLBOX</span>
      <h2 className={styles.title}>构建灵感的工具</h2>
      <div className={styles.loop}>
        <Component logos={logos} speed={100} direction="left" width="100%"
          logoHeight={56} gap={64} hoverSpeed={0} scaleOnHover
          fadeOut fadeOutColor="#faf7f0" ariaLabel="React、TypeScript、Vite、GitHub、Figma 和 Tailwind CSS 图标循环展示" {...demoProps('t0')} />
      </div>
      <p className={styles.hint}>悬停暂停，移开继续无缝循环。</p>
    </section>
  );
}
