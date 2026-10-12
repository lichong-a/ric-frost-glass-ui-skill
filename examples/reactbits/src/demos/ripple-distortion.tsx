// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Animations/RippleDistortion/RippleDistortion';
import { MEDIA, palette } from '../shared/demo-support';
import { useEffect, useState } from "react";
// 指针水波实际扭曲图片纹理；保留原图颜色和低强度反射。
// 此演示需要可用的WebGL上下文；上下文创建失败时应显示能力提示，不能声称效果已经运行。
// 同一本地SVG先栅格化为有明确尺寸的PNG纹理，再进入真实WebGL水波；不修改图形算法或原素材。

export default function RippleDistortionDemo() {
  const [imageSource, setImageSource] = useState<string | null>(null);
  const [imageError, setImageError] = useState('');
  useEffect(() => {
    let canceled = false;
    const image = new Image();
    image.src = MEDIA[3];
    void image.decode().then(() => {
      if (canceled) return;
      if (!image.naturalWidth || !image.naturalHeight) throw new Error('The local image has no dimensions.');
      // SVG image elements without intrinsic dimensions cannot be uploaded by some WebGL drivers.
      // Rasterize the same artwork once; the real RippleDistortion shader remains unchanged.
      const texture = document.createElement('canvas');
      texture.width = 1600;
      texture.height = Math.round(texture.width * image.naturalHeight / image.naturalWidth);
      const context = texture.getContext('2d');
      if (!context) throw new Error('A 2D context is required to prepare the local image.');
      context.drawImage(image, 0, 0, texture.width, texture.height);
      setImageSource(texture.toDataURL('image/png'));
    }).catch(() => {
      if (!canceled) setImageError('本地图片纹理准备失败，请重新加载组件。');
    });
    return () => { canceled = true; image.removeAttribute('src'); };
  }, []);
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, minHeight: 360, padding: 0, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      {imageSource ? <Component src={imageSource} brushSize={95} strength={0.12} swirl={0.5}
rings={3} dispersion={0.1} tint={palette.sage} tintAmount={0.15}
highlightColor={palette.ivory} clickStrength={0.5} quality="medium" /> : <p className="aw-demo-notice" role={imageError ? "alert" : "status"}>{imageError || "正在准备本地图片纹理…"}</p>}
    </div>
  );
}
