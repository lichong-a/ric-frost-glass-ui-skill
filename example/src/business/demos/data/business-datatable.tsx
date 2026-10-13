import { useEffect, useState } from 'react';
import { ArrowDown, ArrowDownUp, ArrowUp, Search } from 'lucide-react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { SpringCheckbox } from '../../components/SpringCheckbox';
import { Field } from '../../components/Field';
import { AnimatedSelect } from '../../components/AnimatedSelect';
import { Pager } from '../../components/Pager';
import { pagerState } from '../../components/pager-state';
import { workItems } from '../../data';
import inputStyles from '../../components/Input.module.css';
import styles from '../../components/DataTable.module.css';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

export default function BusinessDataTableDemo() {
  const { props: demoProps } = useDemoConfig();
  const [query, setQuery] = useDemoState('state.query', '');
  const [sort, setSort] = useState<'title' | 'quantity'>('title');
  const [ascending, setAscending] = useState(true);
  const [page, setPage] = useDemoState('state.page', 0);
  const [pageSize, setPageSize] = useDemoState('state.pageSize', 3);
  const [selected, setSelected] = useDemoState<string[]>('state.selected', []);
  const filtered = workItems
    .filter(item => item.title.includes(query) || item.category.includes(query))
    .sort((a, b) => (sort === 'title' ? a.title.localeCompare(b.title, 'zh-CN') : a.quantity - b.quantity) * (ascending ? 1 : -1));
  const pagination = pagerState(page, pageSize, filtered.length);
  const visible = filtered.slice(pagination.start, pagination.end);
  const sizes = [...new Set([1, 3, 6, pagination.pageSize])].sort((a, b) => a - b);
  useEffect(() => {
    if (page !== pagination.current) setPage(pagination.current);
    if (pageSize !== pagination.pageSize) setPageSize(pagination.pageSize);
  }, [page, pageSize, pagination.current, pagination.pageSize, setPage, setPageSize]);
  function order(field: 'title' | 'quantity') {
    setAscending(field === sort ? !ascending : true);
    setSort(field);
    setPage(0);
  }
  function sortIcon(field: 'title' | 'quantity') {
    const Icon = sort !== field ? ArrowDownUp : ascending ? ArrowUp : ArrowDown;
    return <Icon size={15} aria-hidden="true" />;
  }
  return (
    <BusinessDemo title="DataTable" description="在本地任务表中搜索、排序、勾选和分页；没有网络写入。">
      <div className={styles.toolbar}>
        <Field label="搜索任务" {...demoProps('t0')}>
          <input data-ui="aw-business-input" className={inputStyles['aw-business-input']} value={query} placeholder="搜索任务或类别" onChange={event => { setQuery(event.target.value); setPage(0); }} {...demoProps('t1')} />
        </Field>
        <Field label="每页数量" control {...demoProps('t2')}>
          <AnimatedSelect label="每页数量" value={String(pagination.pageSize)} options={sizes.map(size => ({ value: String(size), label: `${size} 项` }))} onChange={value => { setPageSize(Number(value)); setPage(0); }} {...demoProps('t3')} />
        </Field>
        <span className={styles.resultCount}><Search size={14} aria-hidden="true" />共 {filtered.length} 项任务</span>
      </div>
      <div className={styles.tableWrap} role="region" aria-label="任务表格" tabIndex={0}>
        <table data-ui="aw-business-table" className={styles.table}>
          <thead className={styles.head}>
            <tr>
              <th scope="col" className={`${styles.headCell} ${styles.selectionColumn}`}>选择</th>
              <th scope="col" className={styles.headCell} aria-sort={sort === 'title' ? (ascending ? 'ascending' : 'descending') : 'none'}>
                <button type="button" className={styles.sortControl} data-active={sort === 'title'} aria-label={`任务，点击按${sort === 'title' && ascending ? '降序' : '升序'}排列`} onClick={() => order('title')} {...demoProps('t4')}>任务{sortIcon('title')}</button>
              </th>
              <th scope="col" className={styles.headCell}>类别</th>
              <th scope="col" className={`${styles.headCell} ${styles.numberColumn}`} aria-sort={sort === 'quantity' ? (ascending ? 'ascending' : 'descending') : 'none'}>
                <button type="button" className={styles.sortControl} data-active={sort === 'quantity'} aria-label={`数量，点击按${sort === 'quantity' && ascending ? '降序' : '升序'}排列`} onClick={() => order('quantity')} {...demoProps('t5')}>数量{sortIcon('quantity')}</button>
              </th>
            </tr>
          </thead>
          <tbody className={styles.body}>
            {visible.map(item => (
              <tr key={item.id} className={styles.row} data-selected={selected.includes(item.id)}>
                <td className={styles.bodyCell}><SpringCheckbox aria-label={'选择' + item.title} checked={selected.includes(item.id)} onChange={event => setSelected(current => event.target.checked ? (current.includes(item.id) ? current : [...current, item.id]) : current.filter(id => id !== item.id))} /></td>
                <td className={`${styles.bodyCell} ${styles.taskTitle}`}>{item.title}</td>
                <td className={styles.bodyCell}><span className={styles.category}>{item.category}</span></td>
                <td className={`${styles.bodyCell} ${styles.quantity}`}>{item.quantity}</td>
              </tr>
            ))}
            {!filtered.length ? <tr><td className={styles.empty} colSpan={4}>没有符合条件的任务。</td></tr> : null}
          </tbody>
        </table>
      </div>
      <Pager page={page} pageSize={pageSize} total={filtered.length} onChange={setPage} />
      <p data-ui="aw-business-status" className={styles.status} role="status">已选择 {selected.length} 项。</p>
    </BusinessDemo>
  );
}
