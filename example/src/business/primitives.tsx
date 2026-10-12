import { useEffect, useRef, type KeyboardEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import './primitives.css';

export type WorkItem = { id: string; title: string; category: string; quantity: number };
export const workItems: WorkItem[] = [
  { id: 'a', title: '资料整理', category: '知识', quantity: 12 },
  { id: 'b', title: '合同校对', category: '文档', quantity: 8 },
  { id: 'c', title: '客户跟进', category: '服务', quantity: 20 },
  { id: 'd', title: '会议纪要', category: '文档', quantity: 6 },
  { id: 'e', title: '工单分配', category: '服务', quantity: 16 },
  { id: 'f', title: '技能归档', category: '知识', quantity: 9 },
];

export function Pager({ page, pageSize, total, onChange }: { page: number; pageSize: number; total: number; onChange: (page: number) => void }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  return <nav className="aw-business-row" aria-label="分页">
    <button type="button" className="aw-button" disabled={page <= 0} onClick={() => onChange(page - 1)}>上一页</button>
    <span aria-live="polite">第 {Math.min(page + 1, pages)} / {pages} 页 · 共 {total} 项</span>
    <button type="button" className="aw-button" disabled={page >= pages - 1} onClick={() => onChange(page + 1)}>下一页</button>
  </nav>;
}

export type TreeItem = { key: string; label: string; children?: TreeItem[] };
export const workspaceTree: TreeItem[] = [{ key: 'workspace', label: '工作空间', children: [
  { key: 'agents', label: '智能体', children: [{ key: 'research', label: '资料助理' }, { key: 'service', label: '服务助理' }] },
  { key: 'skills', label: '技能', children: [{ key: 'writing', label: '文档写作' }, { key: 'search', label: '知识检索' }] },
] }];

export function TreeRows({ nodes, selected, expanded, onSelect, onToggle, level = 1 }: { nodes: TreeItem[]; selected: string | null; expanded: string[]; onSelect: (key: string) => void; onToggle: (key: string) => void; level?: number }) {
  return <ul className="aw-business-tree" role={level === 1 ? 'tree' : 'group'} aria-label={level === 1 ? '工作空间树' : undefined} onKeyDown={event => {
    if (level !== 1 || !['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const labels = [...event.currentTarget.querySelectorAll<HTMLButtonElement>('.aw-business-tree-label')];
    const index = labels.findIndex(button => button === document.activeElement);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? labels.length - 1 : Math.max(0, Math.min(labels.length - 1, index + (event.key === 'ArrowDown' ? 1 : -1)));
    labels[next]?.focus();
  }}>
    {nodes.map(node => <li key={node.key} role="treeitem" aria-level={level} aria-selected={selected === node.key} aria-expanded={node.children ? expanded.includes(node.key) : undefined}>
      <div className="aw-business-tree-row">
        {node.children ? <button type="button" aria-label={`${expanded.includes(node.key) ? '收起' : '展开'}${node.label}`} onClick={() => onToggle(node.key)}>{expanded.includes(node.key) ? '−' : '+'}</button> : <span aria-hidden="true">·</span>}
        <button type="button" className="aw-business-tree-label" aria-pressed={selected === node.key} onClick={() => onSelect(node.key)} onKeyDown={event => {
          if (node.children && ['ArrowRight', 'ArrowLeft'].includes(event.key)) {
            event.preventDefault();
            if ((event.key === 'ArrowRight') !== expanded.includes(node.key)) onToggle(node.key);
          }
        }}>{node.label}</button>
      </div>
      {node.children && expanded.includes(node.key) ? <TreeRows nodes={node.children} selected={selected} expanded={expanded} onSelect={onSelect} onToggle={onToggle} level={level + 1} /> : null}
    </li>)}
  </ul>;
}

export function OrganizationNodes({ nodes, selected, expanded, onSelect, onToggle }: { nodes: TreeItem[]; selected: string | null; expanded: string[]; onSelect: (key: string) => void; onToggle: (key: string) => void }) {
  return <ul className="aw-business-org-branches">{nodes.map(node => <li key={node.key}>
    <div className="aw-business-org-card"><button type="button" aria-pressed={selected === node.key} onClick={() => onSelect(node.key)}>{node.label}</button>{node.children ? <button type="button" aria-label={`${expanded.includes(node.key) ? '收起' : '展开'}${node.label}的团队`} aria-expanded={expanded.includes(node.key)} onClick={() => onToggle(node.key)}>{expanded.includes(node.key) ? '−' : '+'}</button> : null}</div>
    {node.children && expanded.includes(node.key) ? <OrganizationNodes nodes={node.children} selected={selected} expanded={expanded} onSelect={onSelect} onToggle={onToggle} /> : null}
  </li>)}</ul>;
}

export function MenuSurface({ label, children }: { label: string; children: ReactNode }) {
  const menu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    menu.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
    return () => { if (previous?.isConnected) previous.focus(); };
  }, []);
  return <div ref={menu} role="menu" aria-label={label} className="aw-business-list" onKeyDown={event => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const buttons = [...event.currentTarget.querySelectorAll<HTMLElement>('[role="menuitem"]:not(:disabled)')];
    const index = buttons.findIndex(button => button === document.activeElement);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length;
    buttons[next]?.focus();
  }}>{children}</div>;
}

export function ReorderItems({ items, onChange }: { items: WorkItem[]; onChange: (items: WorkItem[]) => void }) {
  function move(index: number, direction: number) {
    const next = [...items];
    [next[index], next[index + direction]] = [next[index + direction], next[index]];
    onChange(next);
  }
  return <ol className="aw-business-reorder">{items.map((item, index) => <li key={item.id} className="aw-business-item">
    <span>{item.title}</span><div className="aw-business-row"><button type="button" className="aw-button" aria-label={`上移${item.title}`} disabled={index === 0} onClick={() => move(index, -1)}>↑</button><button type="button" className="aw-button" aria-label={`下移${item.title}`} disabled={index === items.length - 1} onClick={() => move(index, 1)}>↓</button></div>
  </li>)}</ol>;
}

export function FocusRegion({ active, onExit, children }: { active: boolean; onExit?: () => void; children: ReactNode }) {
  const region = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!active || !region.current) return;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const first = region.current.querySelector<HTMLElement>('button:not(:disabled), input:not(:disabled), [tabindex="0"]');
    first?.focus();
    return () => { if (previous?.isConnected) previous.focus(); };
  }, [active]);
  const trap = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!active || !region.current) return;
    if (event.key === 'Escape') { event.preventDefault(); onExit?.(); return; }
    if (event.key !== 'Tab') return;
    const controls = [...region.current.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex="0"]')].filter(element => !element.closest('[hidden], [inert]') && element.getClientRects().length > 0);
    const first = controls[0], last = controls.at(-1);
    if (!first) { event.preventDefault(); region.current.focus(); return; }
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  };
  return <div className="aw-business-focus-region" ref={region} tabIndex={-1} onKeyDown={trap}>{children}</div>;
}

export function ImageCompare({ before, after, value, onChange }: { before: string; after: string; value: number; onChange: (value: number) => void }) {
  return <div className="aw-business-comparison">
    <div className="aw-business-comparison-images"><img src={before} alt="调整前的自然色示意图" /><img src={after} alt="调整后的自然色示意图" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }} /><span className="aw-business-comparison-line" style={{ left: `${value}%` }} aria-hidden="true" /></div>
    <label>对比位置：{value}%<input type="range" min="0" max="100" value={value} onChange={event => onChange(Number(event.target.value))} aria-label="调整前后图片对比位置" /></label>
  </div>;
}

export function MotionSurface({ children }: { children: ReactNode }) {
  return <div className="aw-business-motion-surface">{children}</div>;
}

export function LocalPortal({ children, target }: { children: ReactNode; target: HTMLElement | null }) {
  return target ? createPortal(children, target) : null;
}

export function ScreenReaderText({ children }: { children: ReactNode }) {
  return <span className="aw-business-visually-hidden">{children}</span>;
}
