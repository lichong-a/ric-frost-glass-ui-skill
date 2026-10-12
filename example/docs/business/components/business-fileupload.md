# FileUpload

数据与文件 · `business-fileupload` · 中文意图：文件选择 / 附件验证 / 移除附件

## 1. 什么场景使用

用户选择本地文件，验证类型大小数量并能逐项移除。

**不适合或优先替代：**真实上传需明确后端与授权，不能模拟外部写入成功。

先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加效果组件。

## 2. 只加载这一项

1. 只读本指南，确认用途与边界。
2. 只读 [src/business/demos/business-fileupload.tsx](../../../src/business/demos/business-fileupload.tsx)；共享基础有需要才读 [support.tsx](../../../src/business/support.tsx)。
3. 本例若导入 primitives，再定位该文件中被使用的符号，不加载其它示例。样式按需检索 [业务 Token 皮肤](../../../src/business/business.css) 中的对应类。
4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：[13-import-dialog](../../contracts/13-import-dialog.md)。
5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。

所有实现使用本项目已有 React、原生 HTML 和 CSS。完整交互、类型与回调以当前示例代码为准。

## 3. 本例真实用法

下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。

```tsx
// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button, Field } from '../support';


export default function BusinessFileUploadDemo() {
  const [files,setFiles]=useState<File[]>([]); const [message,setMessage]=useState('请选择文件，每项最多1MiB、总数最多5项。'); function select(incoming:File[]){const allowed=incoming.filter(file=>file.size<=1048576&&(file.type.startsWith('image/')||/\.(txt|csv)$/i.test(file.name)));const unique=[...files];allowed.forEach(file=>{if(!unique.some(current=>current.name===file.name&&current.size===file.size&&current.lastModified===file.lastModified))unique.push(file);});setFiles(unique.slice(0,5));setMessage(`${allowed.length}项符合类型和大小限制，${incoming.length-allowed.length}项未加入。仅保留前5项，尚未发送文件。`);}
  return <BusinessDemo title="FileUpload" description="真实选择本地图片、文本或CSV文件，验证大小和类型，支持移除；文件保留在浏览器内。">
    <Field label="选择本地文件" hint="支持图片、TXT、CSV。"><input type="file" accept="image/*,.txt,.csv" multiple onChange={event=>{select(Array.from(event.target.files??[]));event.target.value='';}} /></Field><div className="aw-business-item" onDragOver={event=>event.preventDefault()} onDrop={event=>{event.preventDefault();select(Array.from(event.dataTransfer.files));}}><p>也可将文件拖到这里。</p><ul>{files.map(file=><li key={`${file.name}-${file.size}-${file.lastModified}`} className="aw-business-row"><span>{file.name} · {Math.ceil(file.size/1024)} KiB</span><Button variant="secondary" aria-label={'移除'+file.name} onClick={()=>setFiles(current=>current.filter(item=>item!==file))}>移除</Button></li>)}</ul>{!files.length?<p>尚未选择文件。</p>:null}</div><Button variant="secondary" disabled={!files.length} onClick={()=>{setFiles([]);setMessage('本地选择已清空。');}}>移除全部</Button><p className="aw-business-status" role="status">{message}</p>
  </BusinessDemo>;
}
```

## 4. 接入约束

- 颜色、阅读面、圆角、边界、焦点与阴影使用 Agent Wan Token，业务逻辑留在所属模块。
- 服务端状态、资源归属与动作权限由既有可信业务接口处理；前端输入限制只服务于体验。
- 保留本项键盘、名称、空状态、错误状态和恢复入口，清理拥有的监听、计时器、观察器与对象 URL。
- 文档中的本地数组、文件或短命令只用于示例；不增加未授权的上传、设备访问、外部写入或 shell 执行。
- 减少运动偏好下保留业务操作，仅停用短过渡；不要因为动效偏好关闭必要表单与菜单。

## 5. 场景级验收

按第 1 节实际业务任务检查状态变化、键盘路径、边界值、失败和取消。只报告运行过的检查；本指南和源码存在不等于已完成浏览器验收。

能力对照：此前没有独立可运行业务示例，规范和 CSS 不作为运行覆盖。

选型有疑问时返回 [数据与文件](../categories/data.md)，先比较最多 2–3 项。
