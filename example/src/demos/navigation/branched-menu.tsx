import { useState } from 'react';
import BranchedMenu from '../../../.upstream/src/ts-default/Micro/BranchedMenu/BranchedMenu';
import { palette, DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
import { useDemoConfig } from '../../parameters/DemoConfig';
const cn=(names:string)=>componentClasses(styles,names);

const items = [
  { label: '工作空间', children: [{ value: 'skills', label: '技能与工具' }, { value: 'agents', label: '智能体' }, { value: 'knowledge', label: '知识库' }] },
  { label: '设置', children: [{ value: 'members', label: '成员管理' }, { value: 'preferences', label: '偏好设置' }] },
];
export default function BranchedMenuDemo() {
  const { props: demoProps } = useDemoConfig();
  const [message, setMessage] = useState('当前选中：技能与工具');
  return <DemoPanel title="Branched Menu · 分支导航"><div className={cn("aw-micro-stack")}>
    <BranchedMenu items={items} defaultOpen={0} defaultActive="skills" color={palette.ink} accentColor={palette.primary} lineColor={palette.sage} width={280} rowHeight={44} onSelect={(_, item) => setMessage(`当前选中：${item.label}`)} onToggle={(index, open) => setMessage(`${items[index].label}：${open ? '展开' : '收起'}`)} {...demoProps('t0')} />
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">{message}（本地演示导航）</p>
  </div></DemoPanel>;
}
