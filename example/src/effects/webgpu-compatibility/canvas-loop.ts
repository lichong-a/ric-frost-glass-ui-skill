export type CanvasPointer = { x: number; y: number; active: boolean; pressed: boolean; gather: number };
export type CanvasFrame = { width: number; height: number; time: number; elapsed: number; pointer: CanvasPointer; pulses: { x: number; y: number; age: number }[] };
type FrameEnvironment = {
  request: (callback: FrameRequestCallback) => number;
  cancel: (id: number) => void;
  pixelRatio: number;
  observeResize: (callback: () => void) => () => void;
};
export type CanvasPainter<P> = (canvas: HTMLCanvasElement, getProps: () => P) => () => void;

/** Both compatibility effects share only canvas lifetime and pointer input. */
export function startCanvas<P extends { paused?: boolean }>(canvas: HTMLCanvasElement, getProps: () => P, paint: (context: CanvasRenderingContext2D, frame: CanvasFrame, props: P) => void, environment?: FrameEnvironment) {
  const context = canvas.getContext('2d');
  if (!context) throw new Error('当前环境无法创建兼容画布。');
  const env = environment ?? {
    request: requestAnimationFrame,
    cancel: cancelAnimationFrame,
    pixelRatio: Math.min(window.devicePixelRatio || 1, 1.5),
    observeResize: (callback: () => void) => { const observer = new ResizeObserver(callback); observer.observe(canvas); return () => observer.disconnect(); },
  };
  const frame: CanvasFrame = { width: 1, height: 1, time: 0, elapsed: 0, pointer: { x: 0, y: 0, active: false, pressed: false, gather: 0 }, pulses: [] };
  let disposed = false, raf = 0, previous: number | undefined, held = 0, pointerId: number | undefined;
  const resize = () => {
    if (disposed) return;
    const rect = canvas.getBoundingClientRect();
    frame.width = Math.max(1, rect.width); frame.height = Math.max(1, rect.height);
    canvas.width = Math.max(1, Math.round(frame.width * env.pixelRatio));
    canvas.height = Math.max(1, Math.round(frame.height * env.pixelRatio));
    context.setTransform(env.pixelRatio, 0, 0, env.pixelRatio, 0, 0);
  };
  resize();
  const unobserve = env.observeResize(resize);
  const move = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    frame.pointer.x = event.clientX - rect.left; frame.pointer.y = event.clientY - rect.top; frame.pointer.active = true;
  };
  const down = (event: PointerEvent) => {
    move(event); pointerId = event.pointerId; frame.pointer.pressed = true; held = 0;
    canvas.setPointerCapture(pointerId);
    frame.pulses.push({ x: frame.pointer.x, y: frame.pointer.y, age: 0 });
    if (frame.pulses.length > 8) frame.pulses.shift();
  };
  const release = () => {
    frame.pointer.pressed = false; held = 0;
    if (pointerId !== undefined && canvas.hasPointerCapture(pointerId)) canvas.releasePointerCapture(pointerId);
    pointerId = undefined;
  };
  const leave = () => { if (!frame.pointer.pressed) frame.pointer.active = false; };
  canvas.addEventListener('pointermove', move);
  canvas.addEventListener('pointerdown', down);
  canvas.addEventListener('pointerup', release);
  canvas.addEventListener('pointercancel', release);
  canvas.addEventListener('pointerleave', leave);
  const draw = (timestamp: number) => {
    if (disposed) return;
    if (previous === undefined || timestamp - previous >= 1000 / 30) {
      const props = getProps(), dt = previous === undefined ? 0 : Math.min(0.05, (timestamp - previous) / 1000);
      previous = timestamp;
      frame.elapsed = props.paused ? 0 : dt; frame.time += frame.elapsed;
      held = frame.pointer.pressed ? held + frame.elapsed : 0;
      frame.pointer.gather += ((held > 0.15 ? 1 : 0) - frame.pointer.gather) * Math.min(1, frame.elapsed * 5);
      for (const pulse of frame.pulses) pulse.age += frame.elapsed;
      frame.pulses = frame.pulses.filter(pulse => pulse.age < 2.5);
      paint(context, frame, props);
    }
    raf = env.request(draw);
  };
  raf = env.request(draw);
  return () => {
    if (disposed) return;
    disposed = true; env.cancel(raf); unobserve(); release();
    canvas.removeEventListener('pointermove', move);
    canvas.removeEventListener('pointerdown', down);
    canvas.removeEventListener('pointerup', release);
    canvas.removeEventListener('pointercancel', release);
    canvas.removeEventListener('pointerleave', leave);
  };
}
