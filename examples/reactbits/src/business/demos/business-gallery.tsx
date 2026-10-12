// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button, Dialog } from '../support';
import { MEDIA } from '../../shared/demo-support';


export default function BusinessGalleryDemo() {
  const [index,setIndex]=useState(0); const [open,setOpen]=useState(false);
  return <BusinessDemo title="Gallery" description="点击缩略图切换大图，可在弹窗中查看选中图片。">
    <img className="aw-business-media" src={MEDIA[index]} alt={`当前自然色示意图${index+1}`} /><div className="aw-business-row" aria-label="图片缩略图">{MEDIA.map((source,position)=><button type="button" key={source} className="aw-button" aria-label={`查看图片${position+1}`} aria-pressed={index===position} onClick={()=>setIndex(position)}><img src={source} alt="" style={{width:64,height:48,objectFit:'cover'}} /></button>)}</div><Button onClick={()=>setOpen(true)}>放大当前图片</Button><Dialog open={open} title={`图片${index+1}`} onClose={()=>setOpen(false)}><img className="aw-business-media" src={MEDIA[index]} alt={`放大的自然色示意图${index+1}`} /></Dialog>
  </BusinessDemo>;
}
