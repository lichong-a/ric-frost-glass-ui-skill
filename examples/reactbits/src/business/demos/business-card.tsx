// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button } from '../support';


export default function BusinessCardDemo() {
  const [saved,setSaved]=useState(false);
  return <BusinessDemo title="Card" description="阅读任务摘要，保存或撤销当前卡片的本地收藏状态。">
    <article className="aw-business-item"><h3>资料整理助手</h3><p>将零散记录整理为有序的工作清单。</p><Button aria-pressed={saved} onClick={()=>setSaved(value=>!value)}>{saved?'撤销收藏':'收藏卡片'}</Button></article><p className="aw-business-status" role="status">{saved?'已在当前示例收藏。':'尚未收藏。'}</p>
  </BusinessDemo>;
}
