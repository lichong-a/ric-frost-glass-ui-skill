import { Fragment } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { pagerState } from './pager-state';
import styles from './Pager.module.css';

export function Pager({ page, pageSize, total, onChange }: { page: number; pageSize: number; total: number; onChange: (page: number) => void }) {
  const { pages, current, pageNumbers, total: count } = pagerState(page, pageSize, total);
  return (
    <nav data-ui="aw-business-row" className={styles.pager} aria-label="分页">
      <div className={styles.controls}>
        <Button variant="secondary" data-size="sm" disabled={current === 0} onClick={() => onChange(current - 1)}>
          <ChevronLeft size={16} aria-hidden="true" />上一页
        </Button>
        <div className={styles.pages}>
          {pageNumbers.map((number, index) => (
            <Fragment key={number}>
              {index > 0 && number > pageNumbers[index - 1] + 1 ? <span className={styles.ellipsis} aria-hidden="true">…</span> : null}
              <Button variant={number === current ? 'primary' : 'ghost'} data-size="sm" data-icon-only="true" aria-label={`第 ${number + 1} 页`} aria-current={number === current ? 'page' : undefined} onClick={() => { if (number !== current) onChange(number); }}>
                {number + 1}
              </Button>
            </Fragment>
          ))}
        </div>
        <Button variant="secondary" data-size="sm" disabled={current === pages - 1} onClick={() => onChange(current + 1)}>
          下一页<ChevronRight size={16} aria-hidden="true" />
        </Button>
      </div>
      <span className={styles.summary} aria-live="polite">第 {current + 1} / {pages} 页 · 共 {count} 项</span>
    </nav>
  );
}
