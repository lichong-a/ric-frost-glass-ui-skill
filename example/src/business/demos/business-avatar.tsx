// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button, Field } from '../support';
import { MEDIA } from '../../shared/demo-support';


export default function BusinessAvatarDemo() {
  const [name,setName]=useState('林清'); const [photo,setPhoto]=useState(false);
  return <BusinessDemo title="Avatar" description="在姓名缩写与本地头像之间切换，编辑显示名称会同步缩写。">
    <Field label="显示名称"><input className="aw-business-input" value={name} onChange={event=>setName(event.target.value)} /></Field><div className="aw-business-row"><span role="img" aria-label={name?name+'的头像':'未命名头像'} style={{display:'grid',placeItems:'center',width:64,height:64,borderRadius:'50%',overflow:'hidden',background:'var(--aw-palette-sage)',fontSize:24}}>{photo?<img src={MEDIA[1]} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}} />:name.slice(0,2)||'?'}</span><Button variant="secondary" onClick={()=>setPhoto(value=>!value)}>{photo?'显示姓名缩写':'使用本地图片'}</Button></div>
  </BusinessDemo>;
}
