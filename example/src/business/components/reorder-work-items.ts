import type { WorkItem } from '../data';

export function moveWorkItem(items: WorkItem[], id: string, targetIndex: number): WorkItem[] {
  const fromIndex = items.findIndex(item => item.id === id);
  if (fromIndex < 0 || !Number.isInteger(targetIndex)) return items;
  const toIndex = Math.max(0, Math.min(items.length - 1, targetIndex));
  if (fromIndex === toIndex) return items;
  const next = [...items];
  const [item] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, item);
  return next;
}

export function applyWorkItemOrder(items: WorkItem[], ids: readonly string[]): WorkItem[] {
  if (ids.length !== items.length || new Set(ids).size !== items.length) return items;
  const byId = new Map(items.map(item => [item.id, item]));
  if (ids.some(id => !byId.has(id))) return items;
  if (ids.every((id, index) => id === items[index].id)) return items;
  return ids.map(id => byId.get(id)!);
}

export function workItemKeyboardTarget(key: string, index: number, total: number): number | null {
  if (!total) return null;
  if (key === 'ArrowUp') return Math.max(0, index - 1);
  if (key === 'ArrowDown') return Math.min(total - 1, index + 1);
  if (key === 'Home') return 0;
  if (key === 'End') return total - 1;
  return null;
}
