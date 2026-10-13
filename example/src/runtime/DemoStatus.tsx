import { createContext, useContext, type ReactNode } from 'react';
import type { PreviewStatus } from './types';

type DemoStatus = Extract<PreviewStatus, 'loading' | 'unsupported' | 'ready'>;
type StatusReporter = (status: DemoStatus, detail?: string) => void;
const ignoreStatus: StatusReporter = () => {};
const StatusContext = createContext<StatusReporter>(ignoreStatus);

/** Opt-in demos confirm their own first frame and own recoverable renderer failures. */
export function DemoStatusProvider({ report, children }: { report?: StatusReporter; children: ReactNode }) {
  return <StatusContext.Provider value={report ?? ignoreStatus}>{children}</StatusContext.Provider>;
}

export function useDemoStatus() { return useContext(StatusContext); }
