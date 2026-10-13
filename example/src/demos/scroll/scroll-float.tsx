// Authored integration demo; implementation is installed from the pinned official source.
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Component from '../../../.upstream/src/ts-default/TextAnimations/ScrollFloat/ScrollFloat';
import styles from './scroll-float.module.css';
import { useDemoConfig } from '../../parameters/DemoConfig';

export default function ScrollFloatDemo() {
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

  useEffect(() => {
    const scroller = scrollRef.current;
    // The locked ScrollFloat effect has no cleanup; release only this demo's triggers.
    return () => ScrollTrigger.getAll().filter(trigger => trigger.scroller === scroller).forEach(trigger => trigger.kill());
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
      <div ref={scrollRef} className={styles.scroller} role="region" aria-label="Scroll Float 滚动演示" tabIndex={0}>
        <section className={styles.intro} style={{ height: viewportHeight }} data-scroll-screen="intro">
          <p className={styles.eyebrow}>SCROLL FLOAT</p>
          <h2 className={styles.heading}>向下滚动，让文字浮现</h2>
          <p className={styles.guide}>在预览区域内滚动，下一屏的字母会逐个上浮。向上滚动可倒放。</p>
          <button className={styles.startButton} type="button" onClick={startScrolling} {...demoProps('t0')}>开始滚动 ↓</button>
        </section>
        <section ref={contentRef} className={styles.content} style={{ minHeight: viewportHeight }} tabIndex={-1} aria-label="文字浮现效果" data-scroll-screen="content">
          {viewportHeight > 0 ? <Component
            scrollContainerRef={scrollRef}
            containerClassName={styles.floatContainer}
            textClassName={styles.floatText}
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="top bottom"
            scrollEnd="center center"
            stagger={0.03} {...demoProps('t1')}
          >QUIET FLOW</Component> : null}
        </section>
      </div>
    </div>
  );
}
