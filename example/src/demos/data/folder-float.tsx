import { useState } from 'react';
import FolderFloat from '../../../.upstream/src/ts-default/Micro/FolderFloat/FolderFloat';
import { palette, DemoPanel } from '../../shared/demo-support';
import styles from '../../shared/micro-demos.module.css';
import {componentClasses} from '../../shared/class-names';
import { useDemoConfig } from '../../parameters/DemoConfig';
const cn=(names:string)=>componentClasses(styles,names);

const items = [{ label: 'UI 规范', value: 'spec' }, { label: '设计变量', value: 'tokens' }, { label: '组件契约', value: 'contracts' }];
export default function FolderFloatDemo() {
  const { props: demoProps } = useDemoConfig();
  const [message, setMessage] = useState('点击文件夹展开文档。');
  return <DemoPanel title="Folder Float · 浮动文件夹"><div className={cn("aw-micro-stack")}>
    <div style={{ padding: '100px 20px 20px' }}><FolderFloat items={items} label="设计资源" sublabel="3 份本地示例文档" trigger="click" folderColor={palette.primary} frontColor={palette.sage} paperColor={palette.ivory} itemColor={palette.surface} itemTextColor={palette.ink} labelColor={palette.ink} physics onOpenChange={open => setMessage(open ? '文件夹已展开。' : '文件夹已收起。')} onSelect={value => setMessage(`已选择：${items.find(item => item.value === value)?.label}`)} {...demoProps('t0')} /></div>
    <p className={cn("aw-micro-status")} role="status" aria-live="polite">{message}</p>
  </div></DemoPanel>;
}
