import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { workItems } from '../../data';
import { ReorderItems } from '../../components/ReorderItems';
import styles from './business-orderlist.module.css';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

export default function BusinessOrderListDemo() {
  const { props: demoProps } = useDemoConfig();
  const [items, setItems] = useDemoState('state.items', workItems);
  return (
    <BusinessDemo title="OrderList" description="拖动任务把手重新排列，也可用键盘或上下移按钮调整；顺序保留在当前示例状态。">
      <ReorderItems items={items} onChange={setItems} />
      <div className={styles.footer}>
        <Button variant="secondary" data-size="sm" onClick={() => setItems(workItems)} {...demoProps('t1')}>恢复初始顺序</Button>
        <p data-ui="aw-business-status" className={styles.status} role="status">当前顺序：{items.map(item => item.title).join('、')}</p>
      </div>
    </BusinessDemo>
  );
}
