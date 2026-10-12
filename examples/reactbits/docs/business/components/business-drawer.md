# Drawer

弹层与焦点 · `business-drawer` · 中文意图：侧边抽屉 / 详情编辑 / 侧栏表单

## 1. 什么场景使用

不离开当前列表即可查看或编辑较多详情。

**不适合或优先替代：**简短确认用Dialog；永久导航用Sidebar。

先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加效果组件。

## 2. 只加载这一项

1. 只读本指南，确认用途与边界。
2. 只读 [src/business/demos/business-drawer.tsx](../../../src/business/demos/business-drawer.tsx)；共享基础有需要才读 [support.tsx](../../../src/business/support.tsx)。
3. 本例若导入 primitives，再定位该文件中被使用的符号，不加载其它示例。样式按需检索 [业务 Token 皮肤](../../../src/business/business.css) 中的对应类。
4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：[17-drawer-tooltip](../../contracts/17-drawer-tooltip.md)、[19-overlays-keyboard](../../contracts/19-overlays-keyboard.md)。
5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。

所有实现使用本项目已有 React、原生 HTML 和 CSS。完整交互、类型与回调以当前示例代码为准。

## 3. 本例真实用法

下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。

```tsx
// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button, Dialog } from '../support';


export default function BusinessDrawerDemo() {
  const [open,setOpen]=useState(false); const [notify,setNotify]=useState(false);
  return <BusinessDemo title="Drawer" description="从右侧打开任务抽屉，勾选本地选项后关闭；再次打开保留选择。">
    <Button onClick={()=>setOpen(true)}>打开任务抽屉</Button><p className="aw-business-status" role="status">本地提醒：{notify?'开启':'关闭'}</p><Dialog open={open} side="right" title="任务选项" onClose={()=>setOpen(false)}><label className="aw-business-row"><input type="checkbox" checked={notify} onChange={event=>setNotify(event.target.checked)} />完成后在界面显示提醒</label><Button onClick={()=>setOpen(false)}>完成</Button></Dialog>
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

选型有疑问时返回 [弹层与焦点](../categories/overlay.md)，先比较最多 2–3 项。
