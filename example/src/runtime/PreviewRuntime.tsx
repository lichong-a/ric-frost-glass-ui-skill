import { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PreviewErrorBoundary } from './ErrorBoundary';
import { detectGraphicsSupport, isMotionReduced, parseMotionMode, shouldGateMotion, type GraphicsSupport } from './policy';
import { isHostMessage, isMatchingEnvelope, PREVIEW_PROTOCOL } from './protocol';
import type { MotionMode, PreviewRegistry, PreviewStatus } from './types';
import { loadDefinition } from '../parameters/load';
import { defaultValues, validateValues } from '../parameters/validation';
import { DemoConfigProvider } from '../parameters/DemoConfig';
import type { DemoValues, JsonValue, ParameterDefinition } from '../parameters/types';

function useSystemReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

function ReadySignal({ onReady }: { onReady: () => void }) {
  useEffect(onReady, [onReady]);
  return null;
}

function describeError(reason: unknown): string {
  if (reason instanceof Error) return reason.message;
  if (typeof reason === 'string') return reason;
  return '组件执行过程中出现未处理的错误。';
}

/** Run only in preview.html. The Gallery never imports this file or effect CSS. */
export function PreviewRuntime({ registry }: { registry: PreviewRegistry }) {
  const [config] = useState(() => {
    const query = new URLSearchParams(window.location.search);
    return { id: query.get('component') ?? '', channel: query.get('channel') ?? 'direct-preview', motion: parseMotionMode(query.get('motion')) };
  });
  const entry = registry.getEntry(config.id);
  const loader = registry.getLoader(config.id);
  const Demo = useMemo(() => loader ? lazy(loader) : null, [loader]);
  const [motion, setMotion] = useState<MotionMode>(config.motion);
  // Embedded previews wait for the host's motion/visibility preferences before
  // loading any effect. A direct preview URL may start on its own.
  const [hostActive, setHostActive] = useState(() => window.parent === window);
  const [documentVisible, setDocumentVisible] = useState(() => !document.hidden);
  const [startedByUser, setStartedByUser] = useState(false);
  const [graphics, setGraphics] = useState<GraphicsSupport | null>(null);
  const [runtimeError, setRuntimeError] = useState<string | null>(null);
  const [definition, setDefinition] = useState<ParameterDefinition>();
  const [incoming, setIncoming] = useState<{ revision: number; values: DemoValues }>();
  const [parameters, setParameters] = useState<DemoValues>({});
  const latestRevision = useRef(-1);
  const parameterRevision = useRef(0);
  const pendingChanges = useRef<{ revision: number; values: DemoValues } | undefined>(undefined);
  const changeScheduled = useRef(false);
  const [configured, setConfigured] = useState(false);
  const systemReduced = useSystemReducedMotion();
  const reduced = isMotionReduced(motion, systemReduced);
  const motionGated = !!entry && shouldGateMotion(entry, reduced) && !startedByUser;
  const active = hostActive && documentVisible;
  const mayMount = !!entry && !!Demo && !!definition && configured && active && !motionGated;

  useEffect(() => {
    let cancelled = false;
    void loadDefinition(config.id).then(value => { if (!cancelled) setDefinition(value); })
      .catch(error => { if (!cancelled) setRuntimeError(describeError(error)); });
    return () => { cancelled = true; };
  }, [config.id]);
  useEffect(() => {
    if (!definition) return;
    if (!incoming && window.parent !== window) return;
    if (incoming && !validateValues(definition, incoming.values)) return;
    if (incoming && incoming.revision < latestRevision.current) return;
    latestRevision.current = incoming?.revision ?? 0;
    parameterRevision.current = incoming?.revision ?? 0;
    setParameters({ ...defaultValues(definition), ...incoming?.values });
    setConfigured(true);
  }, [definition, incoming]);

  const report = useCallback((status: PreviewStatus, detail?: string) => {
    if (window.parent === window) return;
    window.parent.postMessage({
      protocol: PREVIEW_PROTOCOL, channel: config.channel, componentId: config.id,
      type: 'status', status, detail: detail?.slice(0, 500),
    }, window.location.origin);
  }, [config.channel, config.id]);

  useEffect(() => {
    const onMessage = (event: MessageEvent<unknown>) => {
      if (event.origin !== window.location.origin || event.source !== window.parent || !isHostMessage(event.data)) return;
      if (!isMatchingEnvelope(event.data, config.channel, config.id)) return;
      if (event.data.type === 'preferences') {
        setHostActive(event.data.active);
        setMotion(event.data.motion);
      } else if (event.data.revision >= latestRevision.current) {
        setIncoming({ revision: event.data.revision, values: event.data.values });
      }
    };
    const onVisibility = () => setDocumentVisible(!document.hidden);
    window.addEventListener('message', onMessage);
    document.addEventListener('visibilitychange', onVisibility);
    window.parent.postMessage({ protocol: PREVIEW_PROTOCOL, channel: config.channel, componentId: config.id, type: 'frame-ready' }, window.location.origin);
    return () => {
      window.removeEventListener('message', onMessage);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [config.channel, config.id]);

  useEffect(() => setStartedByUser(false), [motion, systemReduced]);

  useEffect(() => {
    let cancelled = false;
    setGraphics(null);
    if (!entry || !mayMount) {
      return () => { cancelled = true; };
    }
    void detectGraphicsSupport(entry.webgl).then(result => {
      if (!cancelled) setGraphics(result);
    }).catch(() => {
      if (!cancelled) setGraphics({ available: false, reason: '当前组件的图形能力检查未能完成。' });
    });
    // requestAdapter has no AbortSignal; ignore late results after a pause,
    // selection change or unmount so they cannot remount an inactive effect.
    return () => { cancelled = true; };
  }, [entry, mayMount]);

  useEffect(() => {
    if (!mayMount || !graphics?.available) return;
    const fail = (reason: unknown) => {
      const message = describeError(reason);
      setRuntimeError(message);
      report('error', message);
    };
    const onError = (event: ErrorEvent) => fail(event.error ?? event.message);
    const onRejection = (event: PromiseRejectionEvent) => fail(event.reason);
    const onContextLost = (event: Event) => {
      if (!(event.target instanceof HTMLCanvasElement)) return;
      event.preventDefault();
      fail('图形上下文已丢失，预览已暂停。可以重新加载该组件。');
    };
    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);
    document.addEventListener('webglcontextlost', onContextLost, true);
    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRejection);
      document.removeEventListener('webglcontextlost', onContextLost, true);
    };
  }, [mayMount, graphics, report]);

  useEffect(() => {
    if (!entry || !Demo) report('error', '目录中没有此组件，或它缺少独立演示入口。');
    else if (runtimeError) report('error', runtimeError);
    else if (!active) report('paused');
    else if (motionGated) report('reduced-motion');
    else if (graphics && graphics.available === false) report('unsupported', graphics.reason);
    else if (!graphics) report('loading');
  }, [entry, Demo, runtimeError, active, motionGated, graphics, report]);

  const ready = useCallback(() => report('ready'), [report]);
  const boundaryError = useCallback((error: Error) => report('error', error.message), [report]);
  const changeValue = useCallback((key: string, value: JsonValue) => {
    if (!definition || !definition.fields.some(field => field.key === key && field.scope === 'state') || !validateValues(definition, { [key]: value })) return;
    setParameters(before => ({ ...before, [key]: value }));
    if (window.parent === window) return;
    const revision = parameterRevision.current;
    pendingChanges.current = pendingChanges.current?.revision === revision
      ? { revision, values: { ...pendingChanges.current.values, [key]: value } }
      : { revision, values: { [key]: value } };
    if (changeScheduled.current) return;
    changeScheduled.current = true;
    // Cascade and date-range callbacks can update several controlled fields.
    // Send their final values together, retaining the host edit's revision.
    queueMicrotask(() => {
      changeScheduled.current = false;
      const batch = pendingChanges.current;
      pendingChanges.current = undefined;
      if (!batch || batch.revision !== parameterRevision.current) return;
      window.parent.postMessage({
        protocol: PREVIEW_PROTOCOL, channel: config.channel, componentId: config.id,
        type: 'values-change', revision: batch.revision, changes: batch.values,
      }, window.location.origin);
    });
  }, [definition, config.channel, config.id]);
  const reload = () => window.location.reload();

  if (!entry || !Demo) {
    return <Fallback title="没有找到该组件" description="请返回组件目录选择一个有效的组件。" />;
  }
  if (runtimeError) {
    return <Fallback title={`${entry.name} 预览已停止`} description={runtimeError} action="重新加载组件" onAction={reload} />;
  }
  if (!active) {
    return <Fallback title="预览已暂停" description="回到这个预览区域后将重新挂载当前组件。" />;
  }
  if (motionGated) {
    return <Fallback title="已按偏好减少动态效果" description={`${entry.name} 包含动态效果，当前尚未挂载。可以选择仅播放本次预览。`} action="播放本次预览" onAction={() => setStartedByUser(true)} />;
  }
  if (!graphics) {
    return <Fallback title="正在准备组件" description="正在检查当前组件需要的运行能力。" busy />;
  }
  if (graphics.available === false) {
    return <Fallback title={`${entry.name} 暂不可预览`} description={graphics.reason} action="重新检查" onAction={reload} />;
  }
  return (
    <main className="aw-preview-runtime" data-component={entry.id} data-motion={reduced && !startedByUser ? 'reduce' : 'allow'}>
      <PreviewErrorBoundary componentName={entry.name} onError={boundaryError} onRetry={reload}>
        <Suspense fallback={<Fallback title={`正在加载 ${entry.name}`} description="仅下载并挂载当前选中的组件。" busy />}>
          <DemoConfigProvider values={parameters} onChange={changeValue}><Demo /></DemoConfigProvider>
          <ReadySignal onReady={ready} />
        </Suspense>
      </PreviewErrorBoundary>
    </main>
  );
}

function Fallback({ title, description, action, onAction, busy = false }: { title: string; description: string; action?: string; onAction?: () => void; busy?: boolean }) {
  return (
    <section className="aw-preview-fallback" role="status" aria-live="polite" aria-busy={busy}>
      <p className="aw-preview-eyebrow">Agent Wan · 组件预览</p>
      <h2>{title}</h2>
      <p>{description}</p>
      {action && onAction ? <button type="button" className="aw-preview-button" onClick={onAction}>{action}</button> : null}
    </section>
  );
}
