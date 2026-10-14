import type { MotionMode, PreviewStatus } from './types';
import type { DemoValues } from '../parameters/types';

export const PREVIEW_PROTOCOL = 'ric-frost-glass-ui-skill/preview/v1' as const;

export type FrameMessage = {
  protocol: typeof PREVIEW_PROTOCOL;
  channel: string;
  componentId: string;
} & (
  | { type: 'frame-ready' }
  | { type: 'status'; status: PreviewStatus; detail?: string }
  | { type: 'values-change'; revision: number; changes: DemoValues }
);

export type HostMessage = {
  protocol: typeof PREVIEW_PROTOCOL;
  channel: string;
  componentId: string;
} & (
  | { type: 'preferences'; active: boolean; motion: MotionMode }
  | { type: 'configuration'; revision: number; values: DemoValues }
);

const statuses = new Set<PreviewStatus>([
  'booting', 'loading', 'ready', 'paused', 'reduced-motion', 'unsupported', 'error',
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function hasEnvelope(value: unknown): value is Record<string, unknown> {
  return isRecord(value)
    && value.protocol === PREVIEW_PROTOCOL
    && typeof value.channel === 'string' && value.channel.length > 0
    && typeof value.componentId === 'string' && value.componentId.length > 0;
}

// Keep envelope validation independent of React and the parameter loader.
function safeJson(value: unknown, depth = 0): boolean {
  if (depth > 12) return false;
  if (value === null || typeof value === 'boolean') return true;
  if (typeof value === 'number') return Number.isFinite(value);
  if (typeof value === 'string') return value.length <= 20000;
  if (Array.isArray(value)) return value.length <= 512 && value.every(item => safeJson(item, depth + 1));
  if (!isRecord(value) || Object.getPrototypeOf(value) !== Object.prototype) return false;
  const pairs = Object.entries(value);
  return pairs.length <= 256 && pairs.every(([key, item]) => !['__proto__', 'prototype', 'constructor'].includes(key) && safeJson(item, depth + 1));
}
function hasRevision(value: Record<string, unknown>) {
  return Number.isSafeInteger(value.revision) && Number(value.revision) >= 0;
}

export function isFrameMessage(value: unknown): value is FrameMessage {
  if (!hasEnvelope(value)) return false;
  if (value.type === 'frame-ready') return true;
  if (value.type === 'values-change') return hasRevision(value) && isRecord(value.changes) && safeJson(value.changes);
  return value.type === 'status'
    && typeof value.status === 'string'
    && statuses.has(value.status as PreviewStatus)
    && (value.detail === undefined || typeof value.detail === 'string');
}

export function isHostMessage(value: unknown): value is HostMessage {
  if (!hasEnvelope(value)) return false;
  if (value.type === 'configuration') return hasRevision(value) && isRecord(value.values) && safeJson(value.values);
  return value.type === 'preferences'
    && typeof value.active === 'boolean'
    && (value.motion === 'system' || value.motion === 'allow' || value.motion === 'reduce');
}

/** No messages are accepted using only origin; also bind source and instance ID. */
export function isMatchingEnvelope(
  message: { channel: string; componentId: string },
  channel: string,
  componentId: string,
): boolean {
  return message.channel === channel && message.componentId === componentId;
}

export function buildPreviewUrl({
  previewUrl, baseUrl, componentId, channel, motion,
}: {
  previewUrl: string;
  baseUrl: string;
  componentId: string;
  channel: string;
  motion: MotionMode;
}): URL {
  const base = new URL(baseUrl);
  const url = new URL(previewUrl, base);
  if (url.origin !== base.origin || !['http:', 'https:'].includes(url.protocol)) {
    throw new Error('Preview entry must use an HTTP(S) URL on the gallery origin.');
  }
  url.searchParams.set('component', componentId);
  url.searchParams.set('channel', channel);
  url.searchParams.set('motion', motion);
  return url;
}
