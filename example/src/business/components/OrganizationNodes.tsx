import ownedStyles0 from './Button.module.css';
import ownedStyles1 from './OrganizationNodes.module.css';
import { componentClasses } from '../class-names';
import type { TreeItem } from '../data';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export function OrganizationNodes({ nodes, selected, expanded, onSelect, onToggle }: { nodes: TreeItem[]; selected: string | null; expanded: string[]; onSelect: (key: string) => void; onToggle: (key: string) => void }) {
  return <ul data-ui="aw-business-org-branches" className={cn("aw-business-org-branches")}>{nodes.map(node => <li key={node.key}>
    <div data-ui="aw-business-org-card" className={cn("aw-business-org-card")}><button className={cn('aw-business-button-feedback')} type="button" aria-pressed={selected === node.key} onClick={() => onSelect(node.key)}>{node.label}</button>{node.children ? <button className={cn('aw-business-button-feedback')} type="button" aria-label={`${expanded.includes(node.key) ? '收起' : '展开'}${node.label}的团队`} aria-expanded={expanded.includes(node.key)} onClick={() => onToggle(node.key)}>{expanded.includes(node.key) ? '−' : '+'}</button> : null}</div>
    {node.children && expanded.includes(node.key) ? <OrganizationNodes nodes={node.children} selected={selected} expanded={expanded} onSelect={onSelect} onToggle={onToggle} /> : null}
  </li>)}</ul>;
}
