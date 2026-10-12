// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/GlassSurface/GlassSurface';
import { MEDIA, palette } from '../shared/demo-support';
import { useRef } from "react";
// 显式传入真实图片backdrop，避免只有透明圆角而看不见折射；文字维持墨绿。
// renderer="auto" 根据能力选择SVG折射、WebGL折射或CSS霜玻璃回退；不将WebGL作为挂载前置条件。

export default function GlassSurfaceDemo() {
  const backdropRef = useRef<HTMLImageElement>(null!);
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ position: 'relative', width: '100%', height: 360, overflow: 'hidden', borderRadius: 20 }}><img ref={backdropRef} src={MEDIA[1]} alt="透过玻璃观察的自然色图形" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /><div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}><Component renderer="auto" backdrop={backdropRef} width={320} height={100} borderRadius={24} blur={12} brightness={52} opacity={0.9} backgroundOpacity={0.22} distortionScale={-100} displace={0.3} redOffset={0} greenOffset={3} blueOffset={6} saturation={0.8} refraction style={{ color: palette.ink, padding: 24 }}><strong style={{ fontSize: 24 }}>霜玻璃表面</strong></Component></div></div>
    </div>
  );
}
