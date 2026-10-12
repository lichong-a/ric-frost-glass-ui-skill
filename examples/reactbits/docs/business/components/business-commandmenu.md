# CommandMenu

业务导航 · `business-commandmenu` · 中文意图：命令面板 / 快捷检索 / 动作搜索

## 1. 什么场景使用

很多动作需要统一搜索、方向键选择和Enter触发。

**不适合或优先替代：**少量固定动作使用Menu或可见Button。

先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加 React Bits。

## 2. 只加载这一项

1. 只读本指南，确认用途与边界。
2. 只读 [src/business/demos/business-commandmenu.tsx](../../../src/business/demos/business-commandmenu.tsx)；共享基础有需要才读 [support.tsx](../../../src/business/support.tsx)。
3. 本例若导入 primitives，再定位该文件中被使用的符号，不加载其它示例。样式按需检索 [业务 Token 皮肤](../../../src/business/business.css) 中的对应类。
4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：[02-sidebar](../../contracts/02-sidebar.md)、[12-row-actions](../../contracts/12-row-actions.md)、[03-header](../../contracts/03-header.md)。
5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。

所有实现使用本项目已有 React、原生 HTML 和 CSS。PrimeReact 文档只作为功能目录参考，本例不依赖或承诺匹配 PrimeReact 的库 API；无需安装它。完整交互、类型与回调以当前示例代码为准。

## 3. 本例真实用法

下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。

```tsx
// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button, Field, Dialog } from '../support';


export default function BusinessCommandMenuDemo() {
  const [open,setOpen]=useState(false); const [query,setQuery]=useState(''); const [active,setActive]=useState(0); const [message,setMessage]=useState('尚未选择命令'); const commands=['查看任务','查看资料','查看设置']; const visible=commands.filter(label=>label.includes(query)); function execute(label:string){setMessage('当前入口：'+label);setOpen(false);}
  return <BusinessDemo title="CommandMenu" description="打开命令面板搜索当前页面动作；支持上下键选择、Enter执行与Escape关闭。">
    <Button onClick={()=>{setQuery('');setActive(0);setOpen(true);}}>打开命令面板</Button><Dialog open={open} title="命令面板" onClose={()=>setOpen(false)}><Field label="搜索页面命令"><input className="aw-business-input" autoFocus value={query} aria-controls="business-command-results" onChange={event=>{setQuery(event.target.value);setActive(0);}} onKeyDown={event=>{if(!visible.length)return;if(['ArrowDown','ArrowUp'].includes(event.key)){event.preventDefault();setActive(value=>(value+(event.key==='ArrowDown'?1:-1)+visible.length)%visible.length);}if(event.key==='Enter'){event.preventDefault();execute(visible[active]);}}} /></Field><ul id="business-command-results">{visible.map((label,index)=><li key={label}><Button variant={active===index?'primary':'secondary'} onClick={()=>execute(label)}>{label}</Button></li>)}</ul>{!visible.length?<p role="status">没有匹配的命令。</p>:null}</Dialog><section className="aw-business-item" role="status">{message}</section>
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

功能目录来源：[CommandMenu](https://primereact.dev/docs/styled/components/commandmenu)。与原有目录的对照：此前没有独立可运行业务示例，规范和 CSS 不作为运行覆盖。

选型有疑问时返回 [业务导航](../categories/navigation.md)，先比较最多 2–3 项。
