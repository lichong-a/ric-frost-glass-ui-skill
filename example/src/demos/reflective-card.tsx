// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/ReflectiveCard/ReflectiveCard';
import { palette } from '../shared/demo-support';
import { useState } from "react";
// 必须在明确点击后才挂载上游组件，防止浏览目录就触发摄像头授权。
// 需要getUserMedia、安全上下文及浏览器摄像头许可；没有权限时如实呈现提示。

export default function ReflectiveCardDemo() {
  const [enabled, setEnabled] = useState(false); const supported = typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia;
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 420, position: 'relative', overflow: 'auto' }}>
      <div style={{ width: '100%', padding: 20, color: palette.ink }}><button type="button" className="aw-button" data-variant="primary" disabled={!supported} onClick={() => setEnabled(value => !value)}>{enabled ? '停止摄像头反射' : '启动摄像头反射'}</button><p role="status" style={{ color: palette.muted, fontSize: 14 }}>{!supported ? '当前环境不支持摄像头，请在安全上下文中打开。' : enabled ? '请处理浏览器摄像头授权；关闭此预览会释放摄像头。' : '点击启动后才会请求摄像头，用本地视频实时形成反射。'}</p>{enabled ? <Component color={palette.ink} overlayColor="rgba(166,179,154,0.18)" blurStrength={9} glassDistortion={9} metalness={0.6} roughness={0.6} displacementStrength={15} noiseScale={1.1} grayscale={0.6} style={{ width: 'min(100%, 440px)', height: 260, margin: '20px auto' }} /> : <div style={{ height: 220, display: 'grid', placeItems: 'center', border: `1px solid ${palette.sage}`, borderRadius: 20, background: palette.ivory }}><p>摄像头反射尚未启动</p></div>}</div>
    </div>
  );
}
