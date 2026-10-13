import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { Dialog } from '../../components/Dialog';
import { MediaViewer } from '../../components/MediaViewer';
import { MEDIA } from '../../../shared/demo-support';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessGalleryDemo() {
  const { props: demoProps } = useDemoConfig();
  const [index, setIndex] = useDemoState('state.index', 0);
  const [open, setOpen] = useDemoState('state.open', false);
  return <BusinessDemo title="Gallery" description="缩略图高亮弹性滑动，大图以形状揭示切换，可放大并继续浏览。">
    <MediaViewer sources={MEDIA} index={index} onChange={setIndex} label="自然色图片集" thumbnails {...demoProps('t0')} />
    <Button onClick={() => setOpen(true)} {...demoProps('t1')}>放大当前图片</Button>
    <Dialog open={open} title={`图片 ${index + 1} / ${MEDIA.length}`} onClose={() => setOpen(false)}><MediaViewer sources={MEDIA} index={index} onChange={setIndex} label="放大的自然色图片" {...demoProps('t3')} /></Dialog>
  </BusinessDemo>;
}
