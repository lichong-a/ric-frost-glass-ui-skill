import type { DemoLoaders, PreviewEntry, PreviewRegistry } from './types';

/**
 * Metadata is light and eagerly searchable; effect modules stay behind loaders.
 * Prefer generated explicit `() => import('./demos/NameDemo')` entries.
 * Do not use a component barrel or eager import.meta.glob.
 */
export function createPreviewRegistry(
  entries: readonly PreviewEntry[],
  loaders: DemoLoaders,
): PreviewRegistry {
  const byId = new Map<string, PreviewEntry>();
  for (const entry of entries) {
    if (!/^[a-z0-9][a-z0-9-]*$/.test(entry.id)) {
      throw new Error(`Invalid component id: ${entry.id}`);
    }
    if (byId.has(entry.id)) throw new Error(`Duplicate component id: ${entry.id}`);
    if (typeof loaders[entry.id] !== 'function') {
      throw new Error(`Missing demo loader: ${entry.id}`);
    }
    byId.set(entry.id, Object.freeze({ ...entry }));
  }
  for (const id of Object.keys(loaders)) {
    if (!byId.has(id)) throw new Error(`Demo loader has no catalog entry: ${id}`);
  }
  const catalog = Object.freeze([...byId.values()]);
  return Object.freeze({
    entries: catalog,
    getEntry: (id: string) => byId.get(id),
    getLoader: (id: string) => loaders[id],
  });
}
