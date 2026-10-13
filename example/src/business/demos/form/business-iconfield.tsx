import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Input.module.css';
import { componentClasses } from '../../class-names';
import { useState, useId } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Field } from '../../components/Field';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
// 场景：搜索或带提示图标的输入；图标仅辅助识别，标签仍完整提供。
export default function IconFieldDemo() {
  const { props: demoProps } = useDemoConfig();
  const id = useId(); const [query, setQuery] = useDemoState('state.query', '');
  return <BusinessDemo title="IconField · 图标输入" description="图标辅助识别搜索字段，输入语义仍由标签说明。"><Field label="搜索资源" htmlFor={id} {...demoProps('t0')}><div data-ui="aw-business-icon-field" className={cn("aw-business-icon-field")}><span aria-hidden="true">⌕</span><input className={cn('aw-business-input')} id={id} value={query} onChange={event => setQuery(event.target.value)} placeholder="输入资源名" {...demoProps('t1')} /></div></Field><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">查询：{query || '无'}</p></BusinessDemo>;
}
