// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Animations/ScrollExpand/ScrollExpand';
import { MEDIA, palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

// 组件自带局部滚动模式，预览不占用整个示例站的页面滚动。

export default function ScrollExpandDemo() {
  const { props: demoProps } = useDemoConfig();
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 460, position: 'relative', overflow: 'hidden' }}>
      <Component src={MEDIA[2]} alt="自然色山形示意图" title="空间随内容展开"
scrollHint="在此区域向下滚动" useWindowScroll={false} startWidth={65}
startRadius={24} endRadius={4} mediaZoom={1.15} smoothing={0.12} overlayScrim={0.15} {...demoProps('t0')}><div style={{ color: palette.ink }}><h3>Every idea needs space.</h3><p>继续滚动，观察媒体框与圆角变化。</p></div></Component>
    </div>
  );
}
