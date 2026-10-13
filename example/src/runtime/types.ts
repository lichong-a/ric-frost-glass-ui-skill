import type { ComponentType } from 'react';

/** Static metadata only. Never import component code or component CSS here. */
export type PreviewEntry = {
  id: string;
  name: string;
  category: string;
  description?: string;
  motion: 'none' | 'interactive' | 'continuous';
  /** Kept as `webgl` for catalog compatibility; WebGPU is a distinct capability. */
  webgl: 'none' | 'webgl' | 'webgl2' | 'webgpu';
  minHeight?: number;
  /** Relative path of the real component source, for disclosure and copy actions. */
  sourcePath?: string;
  /** Defaults to runtime mount status. Only opt-in demos own first-frame readiness. */
  statusMode?: 'runtime' | 'demo';
};

/** One adapter module per actual upstream component. */
export type DemoModule = { default: ComponentType };
export type DemoLoader = () => Promise<DemoModule>;
export type DemoLoaders = Readonly<Record<string, DemoLoader>>;
export type MotionMode = 'system' | 'allow' | 'reduce';
export type PreviewStatus =
  | 'booting'
  | 'loading'
  | 'ready'
  | 'paused'
  | 'reduced-motion'
  | 'unsupported'
  | 'error';

export type PreviewRegistry = {
  entries: readonly PreviewEntry[];
  getEntry: (id: string) => PreviewEntry | undefined;
  getLoader: (id: string) => DemoLoader | undefined;
};
