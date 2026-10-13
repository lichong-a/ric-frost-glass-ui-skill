import { createContext, useCallback, useContext, useMemo, useRef, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import type { DemoValues, JsonValue } from './types';
import { isJsonValue } from './validation';
import { parameterAssetUrl } from './assets';

type Configuration = { values: DemoValues; onChange?: (key: string, value: JsonValue) => void };
const Context = createContext<Configuration>({ values: {} });
export function DemoConfigProvider({ values, onChange, children }: Configuration & { children: ReactNode }) {
  return <Context.Provider value={{ values, onChange }}>{children}</Context.Provider>;
}
function assetValue(value: JsonValue): JsonValue {
  if (typeof value === 'string') return parameterAssetUrl(value);
  if (Array.isArray(value)) return value.map(assetValue);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, assetValue(item)]));
  return value;
}
/** Only named, schema-validated props are added; callback/ref props remain authored TSX. */
export function useDemoConfig() {
  const config = useContext(Context);
  const resolved = useRef(new Map<string, { signature: string; value: JsonValue }>());
  const targets = useMemo(() => {
    const result = new Map<string, Record<string, JsonValue>>();
    for (const [key, value] of Object.entries(config.values)) {
      if (!/^t\d+\./.test(key)) continue;
      const dot = key.indexOf('.');
      const target = key.slice(0, dot), name = key.slice(dot + 1);
      const signature = JSON.stringify(value);
      const before = resolved.current.get(key);
      const current = before?.signature === signature ? before.value : assetValue(value);
      resolved.current.set(key, { signature, value: current });
      if (!result.has(target)) result.set(target, {});
      result.get(target)![name] = current;
    }
    return result;
  }, [config.values]);
  const props = useCallback((target: string): Record<string, JsonValue> => targets.get(target) ?? {}, [targets]);
  return { props };
}
/** Controlled public values use the same setter as the demo's existing callback. */
export function useDemoState<T>(key: string, initial: T | (() => T)): [T, Dispatch<SetStateAction<T>>] {
  const config = useContext(Context);
  const [local, setLocal] = useState(initial);
  const effective = Object.hasOwn(config.values, key) ? config.values[key] as T : local;
  const current = useRef(effective);
  current.current = effective;
  const setter = useCallback<Dispatch<SetStateAction<T>>>(update => {
    const next = typeof update === 'function' ? (update as (before: T) => T)(current.current) : update;
    current.current = next;
    setLocal(next);
    if (isJsonValue(next)) config.onChange?.(key, next);
  }, [config.onChange, key]);
  return [effective, setter];
}
