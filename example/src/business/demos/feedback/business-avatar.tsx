import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Input.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { Field } from '../../components/Field';
import { MEDIA } from '../../../shared/demo-support';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessAvatarDemo() {
  const { props: demoProps } = useDemoConfig();
  const [name,setName]=useDemoState('state.name', '林清'); const [photo,setPhoto]=useState(false);
  return <BusinessDemo title="Avatar" description="在姓名缩写与本地头像之间切换，编辑显示名称会同步缩写。">
    <Field label="显示名称" {...demoProps('t0')}><input data-ui="aw-business-input" className={cn("aw-business-input")} value={name} onChange={event=>setName(event.target.value)} /></Field><div data-ui="aw-business-row" className={cn("aw-business-row")}><span role="img" aria-label={name?name+'的头像':'未命名头像'} style={{display:'grid',placeItems:'center',width:64,height:64,borderRadius:'50%',overflow:'hidden',background:'var(--aw-palette-sage)',fontSize:24}}>{photo?<img src={MEDIA[1]} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}} {...demoProps('t2')} />:name.slice(0,2)||'?'}</span><Button variant="secondary" onClick={()=>setPhoto(value=>!value)} {...demoProps('t3')}>{photo?'显示姓名缩写':'使用本地图片'}</Button></div>
  </BusinessDemo>;
}
