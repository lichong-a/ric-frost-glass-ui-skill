// Authored integration demo; implementation is installed from the pinned official source.
import { useLayoutEffect, useRef, useState } from 'react';
import Component from '../../../.upstream/src/ts-default/TextAnimations/ScrollVelocity/ScrollVelocity';
import styles from './scroll-velocity.module.css';
import { useDemoConfig } from '../../parameters/DemoConfig';

export default function ScrollVelocityDemo() {
  const { props: demoProps } = useDemoConfig();
  const scrollRef = useRef<HTMLDivElement>(null!);
  const contentRef = useRef<HTMLElement>(null);
  const [viewportHeight, setViewportHeight] = useState(0);

  useLayoutEffect(() => {
    const scroller = scrollRef.current;
    const measure = () => setViewportHeight(scroller.clientHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(scroller);
    return () => observer.disconnect();
  }, []);

  const startScrolling = () => {
    scrollRef.current.scrollTo({
      top: viewportHeight,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
    contentRef.current?.focus({ preventScroll: true });
  };

  return (
    <div className={styles.stage}>
      <div ref={scrollRef} className={styles.scroller} role="region" aria-label="Scroll Velocity 滚动演示" tabIndex={0}>
        <section className={styles.intro} style={{ height: viewportHeight }} data-scroll-screen="intro">
          <p className={styles.eyebrow}>SCROLL VELOCITY</p>
          <h2 className={styles.heading}>用滚动速度推动文字</h2>
          <p className={styles.guide}>在预览区域内向下滚动。下一屏的两行文字会随滚动加速，反向滚动时改变方向。</p>
          <button className={styles.startButton} type="button" onClick={startScrolling} {...demoProps('t0')}>开始滚动 ↓</button>
        </section>
        <section ref={contentRef} className={styles.content} style={{ minHeight: viewportHeight }} tabIndex={-1} aria-label="滚动速度文字效果" data-scroll-screen="content">
          {viewportHeight > 0 ? <Component
            scrollContainerRef={scrollRef}
            texts={['AGENT RIC ·', 'QUIET FLOW ·']}
            velocity={100}
            numCopies={6}
            damping={50}
            stiffness={400}
            velocityMapping={{ input: [0, 1000], output: [0, 5] }}
            parallaxClassName={styles.parallax}
            scrollerClassName={styles.textScroller}
            className={styles.copy} {...demoProps('t1')}
          /> : null}
        </section>
      </div>
    </div>
  );
}
