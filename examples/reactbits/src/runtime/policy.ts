import type { MotionMode, PreviewEntry } from './types';

export function isMotionReduced(mode: MotionMode, systemReduced: boolean): boolean {
  return mode === 'reduce' || (mode === 'system' && systemReduced);
}

export function shouldGateMotion(entry: Pick<PreviewEntry, 'motion'>, reduced: boolean): boolean {
  return reduced && entry.motion !== 'none';
}

export function parseMotionMode(value: unknown): MotionMode {
  return value === 'allow' || value === 'reduce' ? value : 'system';
}

export function normalizePreviewHeight(value?: number): number {
  if (value === undefined || !Number.isFinite(value)) return 560;
  return Math.max(320, Math.min(1200, Math.round(value)));
}

export type GraphicsSupport = { available: true } | { available: false; reason: string };

/** Run inside the active iframe, and only for the selected demo's actual API. */
export async function detectGraphicsSupport(kind: PreviewEntry['webgl']): Promise<GraphicsSupport> {
  if (kind === 'none') return { available: true };
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return { available: false, reason: '图形预览需要浏览器环境。' };
  }
  if (kind === 'webgpu') {
    if (!window.isSecureContext) {
      return { available: false, reason: '此组件需要 WebGPU，请在 HTTPS 或浏览器认可的本地安全上下文中打开。' };
    }
    const gpu = (navigator as Navigator & {
      gpu?: { requestAdapter: (options?: { powerPreference?: 'low-power' | 'high-performance' }) => Promise<unknown | null> };
    }).gpu;
    if (!gpu || typeof gpu.requestAdapter !== 'function') {
      return { available: false, reason: '此组件需要 WebGPU，当前浏览器未提供此图形接口。' };
    }
    try {
      // This probe does not request a device or start the component's render loop.
      const adapter = await gpu.requestAdapter({ powerPreference: 'low-power' });
      return adapter
        ? { available: true }
        : { available: false, reason: 'WebGPU 接口存在，但当前环境没有可用的图形适配器。' };
    } catch {
      return { available: false, reason: 'WebGPU 图形适配器检查失败，当前组件暂不可预览。' };
    }
  }
  const canvas = document.createElement('canvas');
  canvas.width = 2;
  canvas.height = 2;
  let context: WebGLRenderingContext | WebGL2RenderingContext | null = null;
  try {
    if (kind === 'webgl2') {
      context = canvas.getContext('webgl2');
    } else {
      context = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    }
    if (!context) {
      return { available: false, reason: `此组件需要 ${kind === 'webgl2' ? 'WebGL 2' : 'WebGL'}，当前环境未提供可用的图形上下文。` };
    }
    return { available: true };
  } catch {
    return { available: false, reason: '当前环境无法创建图形上下文。请检查浏览器图形设置。' };
  } finally {
    // Release the probe immediately; it is not one of the component canvases.
    try { context?.getExtension('WEBGL_lose_context')?.loseContext(); } catch { /* Probe cleanup must not replace the support result. */ }
    canvas.width = 0;
    canvas.height = 0;
  }
}
