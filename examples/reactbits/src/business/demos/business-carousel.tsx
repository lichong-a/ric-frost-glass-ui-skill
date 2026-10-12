// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button } from '../support';
import { MEDIA } from '../../shared/demo-support';


export default function BusinessCarouselDemo() {
  const [index,setIndex]=useState(0);
  return <BusinessDemo title="Carousel" description="通过前后按钮浏览本地图片，支持左右方向键并提供图片位置。">
    <section tabIndex={0} aria-label="本地自然色图片轮播" aria-roledescription="轮播" onKeyDown={event=>{if(['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();setIndex(value=>(value+(event.key==='ArrowLeft'?-1:1)+MEDIA.length)%MEDIA.length);}}}><img className="aw-business-media" src={MEDIA[index]} alt={`自然色示意图${index+1}`} /><div className="aw-business-row"><Button variant="secondary" onClick={()=>setIndex(value=>(value-1+MEDIA.length)%MEDIA.length)}>上一张</Button><span role="status">{index+1} / {MEDIA.length}</span><Button variant="secondary" onClick={()=>setIndex(value=>(value+1)%MEDIA.length)}>下一张</Button></div></section>
  </BusinessDemo>;
}
