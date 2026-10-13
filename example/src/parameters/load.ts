import type { ParameterDefinition } from './types';
const definitions = import.meta.glob('./definitions/*.json', { import: 'default' });
const cache = new Map<string, Promise<ParameterDefinition>>();
/** Metadata and usage templates load per selection, without importing an implementation. */
export function loadDefinition(id: string): Promise<ParameterDefinition> {
  const loader = definitions[`./definitions/${id}.json`];
  if (!loader) return Promise.reject(new Error(`Missing parameter definition: ${id}`));
  if (!cache.has(id)) cache.set(id, loader().then(value => value as ParameterDefinition));
  return cache.get(id)!;
}
