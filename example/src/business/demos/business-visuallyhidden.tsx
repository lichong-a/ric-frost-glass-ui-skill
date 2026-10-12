// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button } from '../support';
import { ScreenReaderText } from '../primitives';


export default function BusinessVisuallyHiddenDemo() {
  const [saved,setSaved]=useState(false);
  return <BusinessDemo title="VisuallyHidden" description="仅图标按钮保留完整可访问名称，屏幕阅读器可读到视觉隐藏文字。">
    <Button variant="secondary" aria-pressed={saved} onClick={()=>setSaved(value=>!value)}><span aria-hidden="true">{saved?'★':'☆'}</span><ScreenReaderText>{saved?'取消收藏资料':'收藏资料'}</ScreenReaderText></Button><p className="aw-business-status" role="status">{saved?'资料已在当前示例收藏。':'资料尚未收藏。'}</p>
  </BusinessDemo>;
}
