import ownedStyles0 from './Button.module.css';
import ownedStyles1 from './DemoLayout.module.css';
import { componentClasses } from '../class-names';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export function Pager({ page, pageSize, total, onChange }: { page: number; pageSize: number; total: number; onChange: (page: number) => void }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  return <nav data-ui="aw-business-row" className={cn("aw-business-row")} aria-label="分页">
    <button data-ui="aw-button" type="button" className={cn("aw-button")} disabled={page <= 0} onClick={() => onChange(page - 1)}>上一页</button>
    <span aria-live="polite">第 {Math.min(page + 1, pages)} / {pages} 页 · 共 {total} 项</span>
    <button data-ui="aw-button" type="button" className={cn("aw-button")} disabled={page >= pages - 1} onClick={() => onChange(page + 1)}>下一页</button>
  </nav>;
}
