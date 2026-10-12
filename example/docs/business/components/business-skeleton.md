# Skeleton

状态反馈 · `business-skeleton` · 中文意图：内容骨架 / 加载占位 / 预留布局

## 1. 什么场景使用

已知内容布局但数据尚未到达，预留稳定尺寸。

**不适合或优先替代：**未知布局只需简短加载状态；占位不能冒充真实内容。

先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加效果组件。

## 2. 只加载这一项

1. 只读本指南，确认用途与边界。
2. 只读 [src/business/demos/business-skeleton.tsx](../../../src/business/demos/business-skeleton.tsx)；共享基础有需要才读 [support.tsx](../../../src/business/support.tsx)。
3. 本例若导入 primitives，再定位该文件中被使用的符号，不加载其它示例。样式按需检索 [业务 Token 皮肤](../../../src/business/business.css) 中的对应类。
4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：[15-feedback](../../contracts/15-feedback.md)。
5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。

所有实现使用本项目已有 React、原生 HTML 和 CSS。完整交互、类型与回调以当前示例代码为准。

## 3. 本例真实用法

下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。

```tsx
// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button } from '../support';


export default function BusinessSkeletonDemo() {
  const [loading,setLoading]=useState(true);
  return <BusinessDemo title="Skeleton" description="展示内容准备中的占位结构，由明确按钮切换到本地实际内容。">
    <section className="aw-business-item" aria-busy={loading}>{loading?<div aria-hidden="true" style={{display:'grid',gap:12}}><div className="aw-business-skeleton" style={{height:28,width:'45%'}} /><div className="aw-business-skeleton" style={{height:16,width:'100%'}} /><div className="aw-business-skeleton" style={{height:16,width:'80%'}} /></div>:<><h3>资料整理任务</h3><p>本地内容已经可供阅读。</p></>}</section><p role="status">{loading?'本地示例内容准备中。':'本地示例内容已显示。'}</p><Button variant="secondary" onClick={()=>setLoading(value=>!value)}>{loading?'显示示例内容':'展示加载状态'}</Button>
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
