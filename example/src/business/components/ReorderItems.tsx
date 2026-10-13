import { useId, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { ArrowDown, ArrowUp, GripVertical } from 'lucide-react';
import { Reorder, useDragControls, useMotionValue } from 'motion/react';
import { Button } from './Button';
import styles from './ReorderItems.module.css';
import { controlSpring, useBusinessReducedMotion } from '../motion-preference';
import type { WorkItem } from '../data';
import { applyWorkItemOrder, moveWorkItem, workItemKeyboardTarget } from './reorder-work-items';

function ReorderRow({ item, index, total, instructionId, onMove }: {
  item: WorkItem;
  index: number;
  total: number;
  instructionId: string;
  onMove: (id: string, toIndex: number) => void;
}) {
  const reduced = useBusinessReducedMotion();
  const controls = useDragControls();
  const y = useMotionValue(0);
  const [dragging, setDragging] = useState(false);
  function startDrag(event: PointerEvent<HTMLButtonElement>) {
    if (event.button !== 0 || !event.isPrimary) return;
    event.currentTarget.focus({ preventScroll: true });
    controls.start(event);
  }
  function reorderWithKeyboard(event: KeyboardEvent<HTMLButtonElement>) {
    const target = workItemKeyboardTarget(event.key, index, total);
    if (target === null) return;
    event.preventDefault();
    onMove(item.id, target);
  }
  return (
    <Reorder.Item
      as="li"
      value={item}
      data-ui="aw-business-item"
      data-dragging={dragging}
      className={styles.item}
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      layout="position"
      style={{ y }}
      transition={reduced ? { duration: 0 } : controlSpring}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => {
        setDragging(false);
        if (reduced) { y.stop(); y.set(0); }
      }}
    >
      <button type="button" className={styles.handle} aria-label={`调整${item.title}的顺序，当前第${index + 1}项，共${total}项`} aria-describedby={instructionId} onPointerDown={startDrag} onKeyDown={reorderWithKeyboard}>
        <GripVertical size={18} aria-hidden="true" />
      </button>
      <span className={styles.position} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      <div className={styles.content}>
        <span className={styles.title}>{item.title}</span>
        <span className={styles.category}>{item.category} · {item.quantity} 项</span>
      </div>
      <div className={styles.actions}>
        <Button variant="ghost" data-size="sm" data-icon-only="true" aria-label={`上移${item.title}`} disabled={index === 0} onClick={() => onMove(item.id, index - 1)}>
          <ArrowUp size={16} aria-hidden="true" />
        </Button>
        <Button variant="ghost" data-size="sm" data-icon-only="true" aria-label={`下移${item.title}`} disabled={index === total - 1} onClick={() => onMove(item.id, index + 1)}>
          <ArrowDown size={16} aria-hidden="true" />
        </Button>
      </div>
    </Reorder.Item>
  );
}

export function ReorderItems({ items, onChange }: { items: WorkItem[]; onChange: (items: WorkItem[]) => void }) {
  const instructionId = useId();
  function move(id: string, toIndex: number) {
    const next = moveWorkItem(items, id, toIndex);
    if (next !== items) onChange(next);
  }
  function reorder(nextItems: WorkItem[]) {
    const next = applyWorkItemOrder(items, nextItems.map(item => item.id));
    if (next !== items) onChange(next);
  }
  return (
    <div className={styles.root}>
      <p id={instructionId} className={styles.instructions}>拖动左侧把手调整顺序。键盘聚焦把手后，用 ↑ / ↓ 移动，Home / End 移到首尾。</p>
      <Reorder.Group as="ol" axis="y" values={items} onReorder={reorder} data-ui="aw-business-reorder" className={styles.list} aria-label="任务顺序">
        {items.map((item, index) => <ReorderRow key={item.id} item={item} index={index} total={items.length} instructionId={instructionId} onMove={move} />)}
      </Reorder.Group>
    </div>
  );
}
