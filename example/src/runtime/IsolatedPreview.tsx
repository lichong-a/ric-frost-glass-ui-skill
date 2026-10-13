import { useCallback, useEffect, useRef, useState } from 'react';
import { buildPreviewUrl, isFrameMessage, isMatchingEnvelope, PREVIEW_PROTOCOL } from './protocol';
import { normalizePreviewHeight } from './policy';
import type { MotionMode, PreviewEntry, PreviewStatus } from './types';
import type { DemoValues } from '../parameters/types';

type Props = {
  entry: PreviewEntry;
  /** Local Vite entry, e.g. `${import.meta.env.BASE_URL}preview.html`. */
  previewUrl: string;
  motion?: MotionMode;
  active?: boolean;
  onStatus?: (status: PreviewStatus, detail?: string) => void;
  values?: DemoValues;
  configRevision?: number;
  rebuildVersion?: number;
  height?: number;
  onValuesChange?: (changes: DemoValues, revision: number) => void;
};

/** Exactly one frame. Replacing the selected ID destroys the old JS/CSS realm. */
export function IsolatedPreview(props: Props) {
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    if (props.entry.motion === 'none') return;
    if ((props.motion ?? 'system') !== 'system') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const restart = () => setRevision(value => value + 1);
    media.addEventListener('change', restart);
    return () => media.removeEventListener('change', restart);
  }, [props.motion, props.entry.motion]);
  // Recreate the realm on preference changes as well: some upstream effects do
  // not cancel all RAF callbacks when their React subtree alone is unmounted.
  const preferenceKey = props.entry.motion === 'none' ? 'functional' : props.motion ?? 'system';
  return <PreviewFrame key={`${props.entry.id}:${preferenceKey}:${revision}:${props.rebuildVersion ?? 0}`} {...props} onReload={() => setRevision(value => value + 1)} />;
}

const statusLabels: Record<PreviewStatus, string> = {
  booting: '准备预览', loading: '加载组件', ready: '已挂载', paused: '已暂停',
  'reduced-motion': '已减少动态效果', unsupported: '当前环境不支持', error: '预览发生错误',
};

function PreviewFrame({ entry, previewUrl, motion = 'system', active = true, onStatus, onReload, values = {}, configRevision = 0, height, onValuesChange }: Props & { onReload: () => void }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [channel] = useState(() => crypto.randomUUID());
  const [source] = useState(() => buildPreviewUrl({ previewUrl, baseUrl: window.location.href, componentId: entry.id, channel, motion }).href);
  const [visible, setVisible] = useState(() => !document.hidden);
  const [intersecting, setIntersecting] = useState(true);
  const [status, setStatus] = useState<PreviewStatus>('booting');
  const [detail, setDetail] = useState<string>();
  const [slow, setSlow] = useState(false);
  const origin = window.location.origin;
  const demoOwnsStatus = entry.statusMode === 'demo';
  const statusLabel = demoOwnsStatus
    ? status === 'unsupported' ? '原版暂不可用' : (status === 'ready' || status === 'loading') && detail ? detail : statusLabels[status]
    : statusLabels[status];

  const sendPreferences = useCallback(() => {
    frameRef.current?.contentWindow?.postMessage({
      protocol: PREVIEW_PROTOCOL, channel, componentId: entry.id,
      type: 'preferences', active: active && visible && intersecting, motion,
    }, origin);
  }, [active, visible, intersecting, motion, channel, entry.id, origin]);
  const sendConfiguration = useCallback(() => {
    frameRef.current?.contentWindow?.postMessage({
      protocol: PREVIEW_PROTOCOL, channel, componentId: entry.id,
      type: 'configuration', revision: configRevision, values,
    }, origin);
  }, [channel, entry.id, origin, values, configRevision]);

  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => {
    const target = viewportRef.current;
    if (!target || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([intersection]) => setIntersecting(intersection.isIntersecting));
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent<unknown>) => {
      if (event.origin !== origin || event.source !== frameRef.current?.contentWindow || !isFrameMessage(event.data)) return;
      if (!isMatchingEnvelope(event.data, channel, entry.id)) return;
      if (event.data.type === 'frame-ready') {
        sendPreferences();
        sendConfiguration();
      } else if (event.data.type === 'values-change') {
        if (event.data.revision === configRevision) onValuesChange?.(event.data.changes, event.data.revision);
      } else {
        setStatus(event.data.status);
        setDetail(event.data.detail);
        onStatus?.(event.data.status, event.data.detail);
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [origin, channel, entry.id, sendPreferences, sendConfiguration, onStatus, onValuesChange, configRevision]);

  useEffect(sendPreferences, [sendPreferences]);
  useEffect(sendConfiguration, [sendConfiguration]);

  useEffect(() => {
    if (status !== 'booting' && status !== 'loading') {
      setSlow(false);
      return;
    }
    const timer = window.setTimeout(() => setSlow(true), 20000);
    return () => window.clearTimeout(timer);
  }, [status]);

  return (
    <section className="aw-isolated-preview" aria-label={`${entry.name} 独立预览`}>
      <div className="aw-preview-toolbar">
        <span className="aw-preview-status" role="status" aria-live="polite">{active && visible && intersecting ? statusLabel : statusLabels.paused}</span>
        <button type="button" className="aw-preview-button" onClick={onReload}>重新加载</button>
      </div>
      {slow ? <p className="aw-preview-note">组件仍在加载。如果长时间没有变化，可重新加载本次预览。</p> : null}
      {detail && status === 'error' ? <p className="aw-preview-note">{detail}</p> : null}
      <div ref={viewportRef} style={{ minHeight: normalizePreviewHeight(height ?? entry.minHeight) }}>
      {active && visible && intersecting && (status !== 'error' || demoOwnsStatus) ? <iframe
        ref={frameRef}
        src={source}
        title={`${entry.name} 组件交互演示`}
        className="aw-preview-frame"
        height={normalizePreviewHeight(height ?? entry.minHeight)}
        sandbox="allow-scripts allow-same-origin"
        allow={entry.id === 'reflective-card' ? "camera 'self'; microphone 'none'" : "camera 'none'; microphone 'none'"}
        referrerPolicy="no-referrer"
        loading="eager"
        onLoad={() => { sendPreferences(); sendConfiguration(); }}
      /> : <div className="aw-preview-fallback" role="status"><h2>{status === 'error' ? '组件预览已停止' : '预览已暂停'}</h2><p>{status === 'error' ? (detail || '组件发生错误，已释放本次预览。可通过上方按钮重新加载。') : '回到此区域或继续播放时重新加载当前组件。'}</p></div>}
      </div>
    </section>
  );
}
