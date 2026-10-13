import { cloneElement, useEffect, useRef, useState, type ReactElement } from 'react';
import { selectBackend, type AdapterProbe, type EffectBackend } from './backend';
import type { CanvasPainter } from './canvas-loop';
import styles from './Compatibility.module.css';

function CanvasPreview<P>({ painter, props }: { painter: CanvasPainter<P>; props: P }) {
  const canvas = useRef<HTMLCanvasElement>(null), current = useRef(props);
  current.current = props;
  useEffect(() => {
    if (!canvas.current) return;
    return painter(canvas.current, () => current.current);
  }, [painter]);
  return <canvas ref={canvas} className={styles.canvas} aria-label="兼容动画预览" data-render-backend="canvas" />;
}

/** Keep the locked component on WebGPU devices; only these demos own the Canvas alternative. */
export function useWebGPUCompatibility<P extends { onError?: (error: Error) => void }>(original: ReactElement<P>, painter: CanvasPainter<P>) {
  const [backend, setBackend] = useState<EffectBackend>();
  useEffect(() => {
    let cancelled = false;
    void selectBackend(window.isSecureContext, (navigator as Navigator & { gpu?: AdapterProbe }).gpu)
      .then(result => { if (!cancelled) setBackend(result); });
    return () => { cancelled = true; };
  }, []);
  const onError = (error: Error) => {
    setBackend({ backend: 'canvas', reason: 'WebGPU 渲染失败，已切换到兼容预览。' });
    original.props.onError?.(error);
  };
  return <div className={styles.surface} data-effect-backend={backend?.backend ?? 'checking'}>
    {!backend ? <p role="status" className={styles.status}>正在准备动画…</p> : backend.backend === 'webgpu'
      ? cloneElement(original, { ...original.props, onError })
      : <><CanvasPreview painter={painter} props={original.props} /><span className={styles.badge} role="status" aria-label={backend.reason} title={backend.reason}>兼容预览</span></>}
  </div>;
}
