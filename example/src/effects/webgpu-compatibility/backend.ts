export type EffectBackend = { backend: 'webgpu' | 'canvas'; reason?: string };
export type AdapterProbe = { requestAdapter: (options: { powerPreference: 'low-power' }) => Promise<unknown | null> };

/** Probe only this effect's environment; never request a device or change browser settings. */
export async function selectBackend(secureContext: boolean, gpu?: AdapterProbe, timeoutMs = 1500): Promise<EffectBackend> {
  if (!secureContext || !gpu) return { backend: 'canvas', reason: '当前环境未提供 WebGPU，使用兼容预览。' };
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const adapter = await Promise.race([
      gpu.requestAdapter({ powerPreference: 'low-power' }),
      new Promise<null>(resolve => { timer = setTimeout(() => resolve(null), timeoutMs); }),
    ]);
    return adapter ? { backend: 'webgpu' } : { backend: 'canvas', reason: '当前环境没有可用的 WebGPU 适配器，使用兼容预览。' };
  } catch {
    return { backend: 'canvas', reason: 'WebGPU 初始化检查失败，使用兼容预览。' };
  } finally {
    if (timer !== undefined) clearTimeout(timer);
  }
}
