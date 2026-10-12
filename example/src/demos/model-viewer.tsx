// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/ModelViewer/ModelViewer';
import { palette } from '../shared/demo-support';
import { useState } from "react";
// 使用自有sample-object.gltf与无HDR环境模式，避免外部模型或环境贴图依赖。
// 此演示需要可用WebGL上下文；不支持时应显示能力提示，不声称效果已运行。

export default function ModelViewerDemo() {
  const [status, setStatus] = useState("加载本地三维示例模型");

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ position: 'relative', height: 330, minHeight: 0, width: '100%' }}><Component url={import.meta.env.BASE_URL + 'media/sample-object.gltf'} width="100%" height={330}
environment="none" exposure={1} autoRotate autoRotateSpeed={0.3}
dragRotate zoom minZoom={0.7} maxZoom={1.7} hoverTilt={0.1}
float={0.15} shadow shadowOpacity={0.18} resetOnDoubleClick
onModelLoaded={() => setStatus('本地GLTF模型已加载；拖动旋转，双击复位')} /></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}
