// Authored integration demo; implementation is installed from the pinned official source.
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Component from '../../../.upstream/src/ts-default/TextAnimations/ScrollReveal/ScrollReveal';
import styles from './scroll-reveal.module.css';
import { useDemoConfig } from '../../parameters/DemoConfig';

export default function ScrollRevealDemo() {
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

  useEffect(() => {
    ScrollTrigger.getAll().filter(trigger => trigger.scroller === scrollRef.current).forEach(trigger => trigger.refresh());
  }, [viewportHeight]);

  const startScrolling = () => {
    scrollRef.current.scrollTo({
      top: viewportHeight,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
    contentRef.current?.focus({ preventScroll: true });
  };

  return (
    <div className={styles.stage}>
      <div ref={scrollRef} className={styles.scroller} role="region" aria-label="Scroll Reveal 滚动演示" tabIndex={0}>
        <section className={styles.intro} style={{ height: viewportHeight }} data-scroll-screen="intro">
          <p className={styles.eyebrow}>SCROLL REVEAL</p>
          <h2 className={styles.heading}>继续向下，让想法逐词清晰</h2>
          <p className={styles.guide}>在预览区域内滚动，下一屏的文字将由朦胧变清晰。向上滚动可重新观察。</p>
          <button className={styles.startButton} type="button" onClick={startScrolling} {...demoProps('t0')}>开始滚动 ↓</button>
        </section>
        <section ref={contentRef} className={styles.content} style={{ minHeight: viewportHeight }} tabIndex={-1} aria-label="逐词揭示效果" data-scroll-screen="content">
          {viewportHeight > 0 ? <Component
            scrollContainerRef={scrollRef}
            containerClassName={styles.revealContainer}
            textClassName={styles.revealText}
            baseOpacity={0.1}
            enableBlur={true}
            baseRotation={3}
            blurStrength={4}
            rotationEnd="center center+=10%"
            wordAnimationEnd="center center+=10%" {...demoProps('t1')}
          >Clarity gives every idea room to become something useful.</Component> : null}
        </section>
      </div>
    </div>
  );
}
