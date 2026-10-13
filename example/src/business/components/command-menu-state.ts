export interface CommandEntry {
  id: string;
  label: string;
  category: string;
}

/** Apply both filters without losing the command identity used for execution. */
export function filterCommandEntries<T extends CommandEntry>(entries: readonly T[], query: string, category: string): T[] {
  const needle = query.trim().toLowerCase();
  return entries.filter(entry => (category === 'all' || entry.category === category) && entry.label.toLowerCase().includes(needle));
}

/** Derive a valid selection before effects synchronize externally changed filters. */
export function commandSelectionIndex(current: number, count: number): number | null {
  if (count <= 0) return null;
  return Number.isInteger(current) && current >= 0 && current < count ? current : 0;
}

/** A missing result never produces an executable selection. */
export function commandIndexForKey(current: number, count: number, key: string): number | null {
  if (count <= 0 || !['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(key)) return null;
  if (key === 'Home') return 0;
  if (key === 'End') return count - 1;
  const direction = key === 'ArrowDown' || key === 'ArrowRight' ? 1 : -1;
  const index = current >= 0 && current < count ? current : direction > 0 ? -1 : 0;
  return (index + direction + count) % count;
}
