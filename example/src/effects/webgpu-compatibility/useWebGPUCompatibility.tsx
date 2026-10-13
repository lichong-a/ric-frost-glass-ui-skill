import { Component, cloneElement, useCallback, useEffect, useRef, useState, type ReactElement, type ReactNode } from 'react';
import { createWebGPULifecycle, selectBackend, type AdapterProbe, type EffectState, type WebGPULifecycle } from './backend';
import type { CanvasPainter } from './canvas-loop';
import { useDemoStatus } from '../../runtime/DemoStatus';
import styles from './Compatibility.module.css';

class EffectBoundary extends Component<{ onError: (error: Error) => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error) { this.props.onError(error); }
  render() { return this.state.failed ? null : this.props.children; }
}

function OriginalPreview({ lifecycle, attempt, children }: { lifecycle: WebGPULifecycle; attempt: number; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (root.current) return lifecycle.mountOriginal(root.current, attempt);
  }, [lifecycle, attempt]);
  return <div ref={root} className={styles.original}>{children}</div>;
}

function CanvasPreview<P>({ painter, props, lifecycle, attempt }: { painter: CanvasPainter<P>; props: P; lifecycle: WebGPULifecycle; attempt: number }) {
  const canvas = useRef<HTMLCanvasElement>(null), current = useRef(props);
  current.current = props;
  useEffect(() => {
    if (!canvas.current) return;
    try {
      return painter(canvas.current, () => current.current, {
        onReady: () => lifecycle.canvasReady(attempt),
        onError: error => lifecycle.failCanvas(error, attempt),
      });
    } catch (error) { lifecycle.failCanvas(error, attempt); }
  }, [painter, lifecycle, attempt]);
  return <canvas ref={canvas} className={styles.canvas} aria-label="Canvas 兼容动画演示" data-render-backend="canvas" />;
}

function StatusCard({ state, componentName, onRetry, onCompatibility }: { state: EffectState; componentName: string; onRetry: () => void; onCompatibility: () => void }) {
  const unavailable = state.phase === 'unavailable';
  const title = unavailable ? `${componentName} 原版暂不可用` : state.phase === 'checking' ? `正在检查 ${componentName} 原版` : `正在启动 ${componentName} 原版`;
  const description = unavailable ? state.reason : state.phase === 'checking' ? '正在检查当前环境的 WebGPU 适配器。' : '原版已开始初始化，正在等待首次绘制。';
  return <section className={styles.card} role="status" aria-live="polite" aria-busy={!unavailable}>
    <p className={styles.eyebrow}>WebGPU 原版</p>
    <h2 className={styles.title}>{title}</h2>
    <p className={styles.description}>{description}</p>
    {unavailable ? <>
      <div className={styles.actions}>
        <button className={styles.action} type="button" onClick={onRetry}>重新检查</button>
        <button className={styles.secondaryAction} type="button" onClick={onCompatibility}>打开兼容演示</button>
      </div>
      <p className={styles.note}>兼容演示使用 Canvas，外观和性能与原版不同，可随时重试原版。</p>
      <details className={styles.details}>
        <summary className={styles.summary}>技术细节</summary>
        <p className={styles.technical}>原版依赖 WebGPU 和可用的图形适配器；不会自动替换为其他渲染器。</p>
        {state.detail ? <pre className={styles.error}>{state.detail}</pre> : null}
      </details>
    </> : null}
  </section>;
}

/** Preserve the frozen WebGPU implementation. A Canvas demonstration always requires a user action. */
export function useWebGPUCompatibility<P extends { onError?: (error: Error) => void }>(original: ReactElement<P>, painter: CanvasPainter<P>, { componentName = '组件' }: { componentName?: string } = {}) {
  const [state, setState] = useState<EffectState>({ phase: 'checking', attempt: 0 });
  const lifecycleRef = useRef<WebGPULifecycle | null>(null);
  const errorCallback = useRef(original.props.onError);
  errorCallback.current = original.props.onError;
  const report = useDemoStatus();
  useEffect(() => {
    let adapterCheck: AbortController | undefined;
    const lifecycle = createWebGPULifecycle(
      () => {
        adapterCheck?.abort();
        adapterCheck = new AbortController();
        return selectBackend(window.isSecureContext, (navigator as Navigator & { gpu?: AdapterProbe }).gpu, 1500, adapterCheck.signal);
      }, setState,
    );
    lifecycleRef.current = lifecycle;
    lifecycle.retry();
    return () => { lifecycle.dispose(); adapterCheck?.abort(); if (lifecycleRef.current === lifecycle) lifecycleRef.current = null; };
  }, []);
  const lifecycle = lifecycleRef.current;
  const originalError = useCallback((error: Error) => {
    let detail = error;
    try { errorCallback.current?.(error); }
    catch (callbackError) {
      const message = callbackError instanceof Error ? callbackError.message : String(callbackError);
      detail = new Error(`${error.message}\n错误回调未能完成：${message}`);
    }
    lifecycle?.failOriginal(detail, state.attempt);
  }, [lifecycle, state.attempt]);

  useEffect(() => {
    if (state.phase === 'unavailable') report('unsupported', state.reason);
    else if (state.phase === 'ready') report('ready', 'WebGPU 原版已就绪');
    else if (state.phase === 'compatibility') report(state.ready ? 'ready' : 'loading', state.ready ? 'Canvas 兼容演示已就绪' : '正在启动 Canvas 兼容演示');
    else report('loading', state.phase === 'checking' ? '正在检查 WebGPU 原版' : '正在启动 WebGPU 原版');
  }, [state, report]);

  useEffect(() => {
    if (!lifecycle || state.phase === 'checking' || state.phase === 'unavailable') return;
    const fail = (reason: unknown) => {
      if (state.phase === 'compatibility') lifecycle.failCanvas(reason, state.attempt);
      else lifecycle.failOriginal(reason, state.attempt);
    };
    const onError = (event: ErrorEvent) => fail(event.error ?? event.message);
    const onRejection = (event: PromiseRejectionEvent) => fail(event.reason);
    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);
    return () => { window.removeEventListener('error', onError); window.removeEventListener('unhandledrejection', onRejection); };
  }, [lifecycle, state.phase, state.attempt]);

  const originalMounted = state.phase === 'starting' || state.phase === 'ready';
  return <div className={styles.surface} data-effect-state={state.phase} data-effect-backend={originalMounted ? 'webgpu' : state.phase === 'compatibility' ? 'canvas' : state.phase}>
    {originalMounted && lifecycle ? <EffectBoundary key={state.attempt} onError={originalError}>
      <OriginalPreview lifecycle={lifecycle} attempt={state.attempt}>{cloneElement(original, { onError: originalError } as Partial<P>)}</OriginalPreview>
    </EffectBoundary> : null}
    {state.phase === 'checking' || state.phase === 'starting' || state.phase === 'unavailable' ? <div className={styles.status}>
      <StatusCard state={state} componentName={componentName} onRetry={() => lifecycle?.retry()} onCompatibility={() => lifecycle?.openCompatibility()} />
    </div> : null}
    {state.phase === 'ready' ? <span className={styles.badge} role="status">WebGPU 原版</span> : null}
    {state.phase === 'compatibility' && lifecycle ? <>
      <EffectBoundary key={state.attempt} onError={error => lifecycle.failCanvas(error, state.attempt)}><CanvasPreview painter={painter} props={original.props} lifecycle={lifecycle} attempt={state.attempt} /></EffectBoundary>
      <div className={styles.compatibilityBar} role="status">
        <span className={styles.compatibilityLabel}>Canvas 兼容演示{state.ready ? '' : ' · 正在等待首次绘制'}</span>
        <button className={styles.retryOriginal} type="button" onClick={() => lifecycle.retry()}>重试原版</button>
      </div>
    </> : null}
  </div>;
}
