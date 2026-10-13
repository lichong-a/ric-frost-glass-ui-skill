import ownedStyles0 from '../../components/DemoLayout.module.css';
import ownedStyles1 from '../../components/Input.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { Field } from '../../components/Field';
import { useDemoConfig } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessFileUploadDemo() {
  const { props: demoProps } = useDemoConfig();
  const [files,setFiles]=useState<File[]>([]); const [message,setMessage]=useState('请选择文件，每项最多1MiB、总数最多5项。'); function select(incoming:File[]){const allowed=incoming.filter(file=>file.size<=1048576&&(file.type.startsWith('image/')||/\.(txt|csv)$/i.test(file.name)));const unique=[...files];allowed.forEach(file=>{if(!unique.some(current=>current.name===file.name&&current.size===file.size&&current.lastModified===file.lastModified))unique.push(file);});setFiles(unique.slice(0,5));setMessage(`${allowed.length}项符合类型和大小限制，${incoming.length-allowed.length}项未加入。仅保留前5项，尚未发送文件。`);}
  return <BusinessDemo title="FileUpload" description="真实选择本地图片、文本或CSV文件，验证大小和类型，支持移除；文件保留在浏览器内。">
    <Field label="选择本地文件" hint="支持图片、TXT、CSV。" {...demoProps('t0')}><input className={cn('aw-business-input')} type="file" accept="image/*,.txt,.csv" multiple onChange={event=>{select(Array.from(event.target.files??[]));event.target.value='';}} {...demoProps('t1')} /></Field><div data-ui="aw-business-item" className={cn("aw-business-item")} onDragOver={event=>event.preventDefault()} onDrop={event=>{event.preventDefault();select(Array.from(event.dataTransfer.files));}}><p>也可将文件拖到这里。</p><ul>{files.map(file=><li data-ui="aw-business-row" key={`${file.name}-${file.size}-${file.lastModified}`} className={cn("aw-business-row")}><span>{file.name} · {Math.ceil(file.size/1024)} KiB</span><Button variant="secondary" aria-label={'移除'+file.name} onClick={()=>setFiles(current=>current.filter(item=>item!==file))} {...demoProps('t2')}>移除</Button></li>)}</ul>{!files.length?<p>尚未选择文件。</p>:null}</div><Button variant="secondary" disabled={!files.length} onClick={()=>{setFiles([]);setMessage('本地选择已清空。');}} {...demoProps('t3')}>移除全部</Button><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">{message}</p>
  </BusinessDemo>;
}
