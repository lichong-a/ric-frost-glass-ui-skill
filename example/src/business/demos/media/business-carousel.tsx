import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { MediaViewer } from '../../components/MediaViewer';
import { MEDIA } from '../../../shared/demo-support';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessCarouselDemo() {
  const { props: demoProps } = useDemoConfig();
  const [index, setIndex] = useDemoState('state.index', 0);
  return <BusinessDemo title="Carousel" description="参考 Morph Slider 的形状揭示与位移转场，按钮、位置指示和键盘浏览保持同步。">
    <MediaViewer sources={MEDIA} index={index} onChange={setIndex} label="本地自然色图片轮播" {...demoProps('t0')} />
  </BusinessDemo>;
}
