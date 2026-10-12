import type { MotionMode, PreviewStatus } from './types';

export const PREVIEW_PROTOCOL = 'agent-wan-reactbits/v1' as const;

export type FrameMessage = {
  protocol: typeof PREVIEW_PROTOCOL;
  channel: string;
  componentId: string;
} & (
  | { type: 'frame-ready' }
  | { type: 'status'; status: PreviewStatus; detail?: string }
);

export type HostMessage = {
  protocol: typeof PREVIEW_PROTOCOL;
  channel: string;
  componentId: string;
  type: 'preferences';
  active: boolean;
  motion: MotionMode;
};

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

export function isFrameMessage(value: unknown): value is FrameMessage {
  if (!hasEnvelope(value)) return false;
  if (value.type === 'frame-ready') return true;
  return value.type === 'status'
    && typeof value.status === 'string'
    && statuses.has(value.status as PreviewStatus)
    && (value.detail === undefined || typeof value.detail === 'string');
}

export function isHostMessage(value: unknown): value is HostMessage {
  return hasEnvelope(value)
    && value.type === 'preferences'
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
