export type EffectBackend = { backend: 'webgpu' } | { backend: 'unavailable'; reason: string; detail?: string };
export type AdapterProbe = { requestAdapter: (options: { powerPreference: 'low-power' }) => Promise<unknown | null> };

function errorDetail(reason: unknown): string {
  return (reason instanceof Error ? reason.message : String(reason)).slice(0, 1000);
}

/** Probe only this effect's environment; never request a device or select Canvas automatically. */
export async function selectBackend(secureContext: boolean, gpu?: AdapterProbe, timeoutMs = 1500, signal?: AbortSignal): Promise<EffectBackend> {
  const cancelled: EffectBackend = { backend: 'unavailable', reason: '本次 WebGPU 检查已取消。' };
  if (signal?.aborted) return cancelled;
  if (!secureContext) return { backend: 'unavailable', reason: '当前页面未处于安全上下文，无法启动 WebGPU 原版。' };
  if (!gpu || typeof gpu.requestAdapter !== 'function') return { backend: 'unavailable', reason: '当前浏览器未提供 WebGPU，原版暂不可用。' };
  let timer: ReturnType<typeof setTimeout> | undefined;
  let onAbort: (() => void) | undefined;
  const timedOut = Symbol('adapter-timeout');
  const aborted = Symbol('adapter-abort');
  try {
    const cancellation = signal ? new Promise<typeof aborted>(resolve => {
      onAbort = () => resolve(aborted);
      signal.addEventListener('abort', onAbort, { once: true });
    }) : undefined;
    const adapter = await Promise.race([
      gpu.requestAdapter({ powerPreference: 'low-power' }),
      new Promise<typeof timedOut>(resolve => { timer = setTimeout(() => resolve(timedOut), timeoutMs); }),
      ...(cancellation ? [cancellation] : []),
    ]);
    if (adapter === aborted) return cancelled;
    if (adapter === timedOut) return { backend: 'unavailable', reason: 'WebGPU 适配器检查超时，可以重新检查或打开兼容演示。' };
    return adapter ? { backend: 'webgpu' } : { backend: 'unavailable', reason: '当前环境没有可用的 WebGPU 适配器，原版暂不可用。' };
  } catch (error) {
    return { backend: 'unavailable', reason: 'WebGPU 适配器检查失败，可以重新检查或打开兼容演示。', detail: errorDetail(error) };
  } finally {
    if (timer !== undefined) clearTimeout(timer);
    if (onAbort) signal?.removeEventListener('abort', onAbort);
  }
}

export type EffectState = { attempt: number } & (
  | { phase: 'checking' | 'starting' | 'ready' }
  | { phase: 'unavailable'; reason: string; detail?: string }
  | { phase: 'compatibility'; ready: boolean }
);

type LifecycleEnvironment = {
  setTimer: (callback: () => void, delay: number) => number;
  clearTimer: (timer: number) => void;
  observeReady: (root: HTMLElement, callback: (ready: boolean) => void) => () => void;
};

/** Observe the locked components' root marker; React mounting is not a rendered GPU frame. */
export function observeOriginalReady(root: HTMLElement, callback: (ready: boolean) => void): () => void {
  const check = () => callback(root.querySelector('[data-ready]')?.getAttribute('data-ready') === 'true');
  const observer = new MutationObserver(check);
  observer.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-ready'] });
  check();
  return () => observer.disconnect();
}

/** Own attempt identity, first-frame deadline and explicit renderer transitions for these two demos. */
export function createWebGPULifecycle(probe: () => Promise<EffectBackend>, onChange: (state: EffectState) => void, environment?: LifecycleEnvironment) {
  const env: LifecycleEnvironment = environment ?? {
    setTimer: (callback, delay) => window.setTimeout(callback, delay),
    clearTimer: timer => window.clearTimeout(timer),
    observeReady: observeOriginalReady,
  };
  let state: EffectState = { phase: 'checking', attempt: 0 }, disposed = false;
  let timer: number | undefined, unobserve: (() => void) | undefined;
  const clearDeadline = () => { if (timer !== undefined) env.clearTimer(timer); timer = undefined; };
  const stopOriginal = () => { clearDeadline(); unobserve?.(); unobserve = undefined; };
  const publish = (next: EffectState) => { if (!disposed) { state = next; onChange(next); } };
  const currentOriginal = (attempt: number) => !disposed && attempt === state.attempt && (state.phase === 'starting' || state.phase === 'ready');
  const unavailable = (reason: string, detail?: string) => { stopOriginal(); publish({ phase: 'unavailable', attempt: state.attempt, reason, detail }); };
  const deadline = (attempt: number) => {
    clearDeadline();
    timer = env.setTimer(() => {
      if (currentOriginal(attempt)) unavailable('WebGPU 原版未能在 15 秒内完成首帧，已停止本次渲染。可以重新检查或打开兼容演示。');
    }, 15000);
  };
  return {
    retry() {
      if (disposed) return;
      stopOriginal();
      const attempt = state.attempt + 1;
      publish({ phase: 'checking', attempt });
      void probe().then(result => {
        if (disposed || state.attempt !== attempt) return;
        if (result.backend === 'webgpu') publish({ phase: 'starting', attempt });
        else unavailable(result.reason, result.detail);
      }).catch(error => {
        if (!disposed && state.attempt === attempt) unavailable('WebGPU 检查未能完成，可以重新检查。', errorDetail(error));
      });
    },
    mountOriginal(root: HTMLElement, attempt: number): () => void {
      if (!currentOriginal(attempt)) return () => {};
      stopOriginal();
      deadline(attempt);
      const disconnect = env.observeReady(root, ready => {
        if (!currentOriginal(attempt)) return;
        if (ready) { clearDeadline(); if (state.phase !== 'ready') publish({ phase: 'ready', attempt }); }
        else if (state.phase === 'ready') { publish({ phase: 'starting', attempt }); deadline(attempt); }
      });
      unobserve = disconnect;
      return () => { if (unobserve === disconnect) stopOriginal(); };
    },
    failOriginal(error: unknown, attempt: number) {
      if (currentOriginal(attempt)) unavailable('WebGPU 原版渲染遇到问题，已停止本次预览。可以重新检查或打开兼容演示。', errorDetail(error));
    },
    openCompatibility() {
      if (disposed || state.phase !== 'unavailable') return;
      stopOriginal();
      publish({ phase: 'compatibility', attempt: state.attempt + 1, ready: false });
    },
    canvasReady(attempt: number) {
      if (!disposed && state.attempt === attempt && state.phase === 'compatibility' && !state.ready) publish({ phase: 'compatibility', attempt, ready: true });
    },
    failCanvas(error: unknown, attempt: number) {
      if (!disposed && state.attempt === attempt && state.phase === 'compatibility') unavailable('兼容演示未能继续绘制，已停止本次预览。可以重新检查原版或再次打开兼容演示。', errorDetail(error));
    },
    dispose() { disposed = true; stopOriginal(); },
  };
}
export type WebGPULifecycle = ReturnType<typeof createWebGPULifecycle>;
