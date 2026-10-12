# ContextMenu

业务导航 · `business-contextmenu` · 中文意图：右键菜单 / 对象快捷操作 / 上下文动作

## 1. 什么场景使用

操作依赖当前对象，通过右键和可见按钮都能打开。

**不适合或优先替代：**关键操作不能仅隐藏在右键菜单。

先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加 React Bits。

## 2. 只加载这一项

1. 只读本指南，确认用途与边界。
2. 只读 [src/business/demos/business-contextmenu.tsx](../../../src/business/demos/business-contextmenu.tsx)；共享基础有需要才读 [support.tsx](../../../src/business/support.tsx)。
3. 本例若导入 primitives，再定位该文件中被使用的符号，不加载其它示例。样式按需检索 [业务 Token 皮肤](../../../src/business/business.css) 中的对应类。
4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：[02-sidebar](../../contracts/02-sidebar.md)、[12-row-actions](../../contracts/12-row-actions.md)、[03-header](../../contracts/03-header.md)。
5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。

所有实现使用本项目已有 React、原生 HTML 和 CSS。PrimeReact 文档只作为功能目录参考，本例不依赖或承诺匹配 PrimeReact 的库 API；无需安装它。完整交互、类型与回调以当前示例代码为准。

## 3. 本例真实用法

下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。

```tsx
import { MenuSurface } from '../primitives';
// Original Agent Wan demonstration using React and native browser controls.
import { useState, useRef } from 'react';
import { BusinessDemo, Popover } from '../support';


export default function BusinessContextMenuDemo() {
  const [open,setOpen]=useState(false); const [message,setMessage]=useState('请选择卡片动作。'); const anchor=useRef<HTMLElement>(null);
  return <BusinessDemo title="ContextMenu" description="在资料卡上右键打开菜单；键盘菜单键或Shift+F10也可打开。">
    <article ref={anchor} className="aw-business-item" tabIndex={0} onContextMenu={event=>{event.preventDefault();setOpen(true);}} onKeyDown={event=>{if(event.key==='ContextMenu'||(event.shiftKey&&event.key==='F10')){event.preventDefault();setOpen(true);}}}><h3>资料整理</h3><p>右键或使用 Shift+F10 打开操作菜单。</p></article><Popover open={open} onClose={()=>setOpen(false)} anchorRef={anchor}><MenuSurface label="资料操作">{['查看详情','复制名称','加入收藏'].map(label=><button type="button" role="menuitem" className="aw-button" key={label} onClick={async()=>{setOpen(false);if(label==='复制名称'){try{await navigator.clipboard.writeText('资料整理');setMessage('任务名称已复制。');}catch{setMessage('无法自动复制，请手动复制名称：资料整理。');}}else{setMessage('已选择本地动作：'+label);}}}>{label}</button>)}</MenuSurface></Popover><p className="aw-business-status" role="status">{message}</p>
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

功能目录来源：[ContextMenu](https://primereact.dev/docs/styled/components/contextmenu)。与原有目录的对照：此前没有独立可运行业务示例，规范和 CSS 不作为运行覆盖。

选型有疑问时返回 [业务导航](../categories/navigation.md)，先比较最多 2–3 项。
