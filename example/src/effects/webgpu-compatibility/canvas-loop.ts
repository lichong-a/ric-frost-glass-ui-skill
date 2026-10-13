export type CanvasPointer = { x: number; y: number; active: boolean; pressed: boolean; gather: number };
export type CanvasFrame = { width: number; height: number; time: number; elapsed: number; pointer: CanvasPointer; pulses: { x: number; y: number; age: number }[] };
type FrameEnvironment = {
  request: (callback: FrameRequestCallback) => number;
  cancel: (id: number) => void;
  pixelRatio: number;
  observeResize: (callback: () => void) => () => void;
};
export type CanvasLifecycle = { onReady?: () => void; onError?: (error: Error) => void };
export type CanvasPainter<P> = (canvas: HTMLCanvasElement, getProps: () => P, lifecycle?: CanvasLifecycle) => () => void;

/** Both compatibility effects share only canvas lifetime and pointer input. */
export function startCanvas<P extends { paused?: boolean }>(canvas: HTMLCanvasElement, getProps: () => P, paint: (context: CanvasRenderingContext2D, frame: CanvasFrame, props: P) => void, environment?: FrameEnvironment, lifecycle?: CanvasLifecycle) {
  const env = environment ?? {
    request: requestAnimationFrame, cancel: cancelAnimationFrame,
    pixelRatio: Math.min(window.devicePixelRatio || 1, 1.5),
    observeResize: (callback: () => void) => { const observer = new ResizeObserver(callback); observer.observe(canvas); return () => observer.disconnect(); },
  };
  const frame: CanvasFrame = { width: 1, height: 1, time: 0, elapsed: 0, pointer: { x: 0, y: 0, active: false, pressed: false, gather: 0 }, pulses: [] };
  let disposed = false, raf: number | undefined, previous: number | undefined, held = 0, pointerId: number | undefined, ready = false;
  let unobserve: (() => void) | undefined;
  const listeners: [string, EventListener][] = [];
  const release = () => {
    frame.pointer.pressed = false; held = 0;
    const captured = pointerId; pointerId = undefined;
    if (captured !== undefined && canvas.hasPointerCapture(captured)) canvas.releasePointerCapture(captured);
  };
  const stop = () => {
    if (disposed) return;
    disposed = true;
    if (raf !== undefined) env.cancel(raf);
    raf = undefined;
    unobserve?.(); unobserve = undefined;
    // Some browsers have already released capture when an effect fails or leaves the DOM.
    try { release(); } catch { /* Listener and observer cleanup still has to complete. */ }
    for (const [name, handler] of listeners) canvas.removeEventListener(name, handler);
    listeners.length = 0;
    frame.pointer.active = false; frame.pointer.gather = 0; frame.pulses.length = 0;
  };
  const fail = (reason: unknown) => {
    if (disposed) return;
    stop();
    const error = reason instanceof Error ? reason : new Error(String(reason));
    if (lifecycle?.onError) lifecycle.onError(error);
    else throw error;
  };
  const listen = (name: string, handler: (event: PointerEvent) => void) => {
    const guarded: EventListener = event => { if (!disposed) { try { handler(event as PointerEvent); } catch (error) { fail(error); } } };
    canvas.addEventListener(name, guarded); listeners.push([name, guarded]);
  };
  try {
    const context = canvas.getContext('2d');
    if (!context) throw new Error('当前环境无法创建兼容画布。');
    const resize = () => {
      if (disposed) return;
      const rect = canvas.getBoundingClientRect();
      frame.width = Math.max(1, rect.width); frame.height = Math.max(1, rect.height);
      canvas.width = Math.max(1, Math.round(frame.width * env.pixelRatio));
      canvas.height = Math.max(1, Math.round(frame.height * env.pixelRatio));
      context.setTransform(env.pixelRatio, 0, 0, env.pixelRatio, 0, 0);
    };
    resize();
    unobserve = env.observeResize(() => { try { resize(); } catch (error) { fail(error); } });
    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      frame.pointer.x = event.clientX - rect.left; frame.pointer.y = event.clientY - rect.top; frame.pointer.active = true;
    };
    listen('pointermove', move);
    listen('pointerdown', event => {
      move(event); pointerId = event.pointerId; frame.pointer.pressed = true; held = 0;
      canvas.setPointerCapture(pointerId);
      frame.pulses.push({ x: frame.pointer.x, y: frame.pointer.y, age: 0 });
      if (frame.pulses.length > 8) frame.pulses.shift();
    });
    listen('pointerup', release); listen('pointercancel', release);
    listen('pointerleave', () => { if (!frame.pointer.pressed) frame.pointer.active = false; });
    const draw = (timestamp: number) => {
      if (disposed) return;
      raf = undefined;
      try {
        if (previous === undefined || timestamp - previous >= 1000 / 30) {
          const props = getProps(), dt = previous === undefined ? 0 : Math.min(0.05, (timestamp - previous) / 1000);
          previous = timestamp;
          frame.elapsed = props.paused ? 0 : dt; frame.time += frame.elapsed;
          held = frame.pointer.pressed ? held + frame.elapsed : 0;
          frame.pointer.gather += ((held > 0.15 ? 1 : 0) - frame.pointer.gather) * Math.min(1, frame.elapsed * 5);
          for (const pulse of frame.pulses) pulse.age += frame.elapsed;
          frame.pulses = frame.pulses.filter(pulse => pulse.age < 2.5);
          paint(context, frame, props);
          if (!ready) { ready = true; lifecycle?.onReady?.(); }
        }
        if (!disposed) raf = env.request(draw);
      } catch (error) { fail(error); }
    };
    raf = env.request(draw);
  } catch (error) { fail(error); }
  return stop;
}
