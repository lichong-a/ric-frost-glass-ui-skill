# Toast

状态反馈 · `business-toast` · 中文意图：短暂通知 / 操作反馈 / 消息堆叠

## 1. 什么场景使用

操作完成后给出非阻断反馈，可关闭且不会抢焦点。

**不适合或优先替代：**必须用户处理的错误应常显在Message或Dialog。

先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加效果组件。

## 2. 只加载这一项

1. 只读本指南，确认用途与边界。
2. 只读 [src/business/demos/business-toast.tsx](../../../src/business/demos/business-toast.tsx)；共享基础有需要才读 [support.tsx](../../../src/business/support.tsx)。
3. 本例若导入 primitives，再定位该文件中被使用的符号，不加载其它示例。样式按需检索 [业务 Token 皮肤](../../../src/business/business.css) 中的对应类。
4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：[15-feedback](../../contracts/15-feedback.md)。
5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。

所有实现使用本项目已有 React、原生 HTML 和 CSS。完整交互、类型与回调以当前示例代码为准。

## 3. 本例真实用法

下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。

```tsx
// Original Agent Wan demonstration using React and native browser controls.
import { useState, useEffect } from 'react';
import { BusinessDemo, Button } from '../support';


export default function BusinessToastDemo() {
  const [notice,setNotice]=useState<string|null>(null); const [sequence,setSequence]=useState(0); useEffect(()=>{if(!notice)return;const timer=window.setTimeout(()=>setNotice(null),4000);return()=>window.clearTimeout(timer);},[notice,sequence]);
  return <BusinessDemo title="Toast" description="短消息在本地出现，可手动关闭，4秒后自动移除；卸载时清理计时器。">
    <div className="aw-business-row"><Button onClick={()=>{setSequence(value=>value+1);setNotice('本地草稿已保存。');}}>显示成功提示</Button><Button variant="secondary" onClick={()=>{setSequence(value=>value+1);setNotice('可以继续完善草稿内容。');}}>显示普通提示</Button></div>{notice?<div className="aw-business-item aw-business-row" role="status" style={{position:'fixed',right:20,bottom:20,zIndex:100,maxWidth:'calc(100% - 40px)'}}><span>{notice}</span><Button variant="secondary" aria-label="关闭提示" onClick={()=>setNotice(null)}>关闭</Button></div>:null}
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

选型有疑问时返回 [状态反馈](../categories/feedback.md)，先比较最多 2–3 项。
