import { useState, useId } from 'react';
import { BusinessDemo, Field } from '../support';

// 场景：搜索或带提示图标的输入；图标仅辅助识别，标签仍完整提供。
export default function IconFieldDemo() {
  const id = useId(); const [query, setQuery] = useState('');
  return <BusinessDemo title="IconField · 图标输入" description="图标辅助识别搜索字段，输入语义仍由标签说明。"><Field label="搜索资源" htmlFor={id}><div className="aw-business-icon-field"><span aria-hidden="true">⌕</span><input id={id} value={query} onChange={event => setQuery(event.target.value)} placeholder="输入资源名" /></div></Field><p className="aw-business-status" role="status">查询：{query || '无'}</p></BusinessDemo>;
}
