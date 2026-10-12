// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/Folder/Folder';
import { MEDIA, palette } from '../shared/demo-support';
import { useState } from "react";
// 真实文件夹翻盖、拖出放回与放大交互，回调区分开启、选择和投放。
// 此演示需要可用WebGL上下文；不支持时应显示能力提示，不声称效果已运行。

export default function FolderDemo() {
  const [status, setStatus] = useState("点击资料夹并拖动内容");

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ height: 330, position: 'relative', display: 'grid', placeItems: 'center' }}><Component items={[{ title: 'UI规范', description: '设计变量与组件契约' }, { title: '执行计划', description: '逐步实现与验收' }, { image: MEDIA[4], title: '自然色素材' }]}
label="项目资料" mode="flap" variant="glass" color={palette.sage}
paperColor={palette.ivory} layout="spread" size={1.4} openOn="click"
draggable zoomOnClick peek tilt={4} bounce={0.45} frost={0.5} theme="light"
onOpenChange={open => setStatus(open ? '资料夹已展开' : '资料夹已收起')}
onItemClick={(_item, index) => setStatus('已选择第 ' + (index + 1) + ' 项资料')}
onItemDrop={(_item, index, inside) => setStatus('第 ' + (index + 1) + ' 项已' + (inside ? '放回资料夹' : '移出资料夹'))} /></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}
