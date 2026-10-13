import ownedStyles0 from './Button.module.css';
import ownedStyles1 from './TreeRows.module.css';
import { componentClasses } from '../class-names';
import type { TreeItem } from '../data';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export function TreeRows({ nodes, selected, expanded, onSelect, onToggle, level = 1 }: { nodes: TreeItem[]; selected: string | null; expanded: string[]; onSelect: (key: string) => void; onToggle: (key: string) => void; level?: number }) {
  return <ul data-ui="aw-business-tree" className={cn("aw-business-tree")} role={level === 1 ? 'tree' : 'group'} aria-label={level === 1 ? '工作空间树' : undefined} onKeyDown={event => {
    if (level !== 1 || !['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const labels = [...event.currentTarget.querySelectorAll<HTMLButtonElement>(`[data-ui="aw-business-tree-label"]`)];
    const index = labels.findIndex(button => button === document.activeElement);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? labels.length - 1 : Math.max(0, Math.min(labels.length - 1, index + (event.key === 'ArrowDown' ? 1 : -1)));
    labels[next]?.focus();
  }}>
    {nodes.map(node => <li key={node.key} role="treeitem" aria-level={level} aria-selected={selected === node.key} aria-expanded={node.children ? expanded.includes(node.key) : undefined}>
      <div data-ui="aw-business-tree-row" className={cn("aw-business-tree-row")}>
        {node.children ? <button className={cn('aw-business-button-feedback')} type="button" aria-label={`${expanded.includes(node.key) ? '收起' : '展开'}${node.label}`} onClick={() => onToggle(node.key)}>{expanded.includes(node.key) ? '−' : '+'}</button> : <span aria-hidden="true">·</span>}
        <button data-ui="aw-business-tree-label" type="button" className={cn("aw-business-tree-label")} aria-pressed={selected === node.key} onClick={() => onSelect(node.key)} onKeyDown={event => {
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
