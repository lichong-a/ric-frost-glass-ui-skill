# Knob

业务表单 · `business-knob` · 中文意图：数值旋钮 / 比例调整 / 圆形数值

## 1. 什么场景使用

通过圆形控件调整有界比例，同时提供键盘和精确值。

**不适合或优先替代：**精确批量编辑用InputNumber；不要仅允许拖拽。

先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加 React Bits。

## 2. 只加载这一项

1. 只读本指南，确认用途与边界。
2. 只读 [src/business/demos/business-knob.tsx](../../../src/business/demos/business-knob.tsx)；共享基础有需要才读 [support.tsx](../../../src/business/support.tsx)。
3. 本例若导入 primitives，再定位该文件中被使用的符号，不加载其它示例。样式按需检索 [业务 Token 皮肤](../../../src/business/business.css) 中的对应类。
4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：[05-input](../../contracts/05-input.md)。
5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。

所有实现使用本项目已有 React、原生 HTML 和 CSS。PrimeReact 文档只作为功能目录参考，本例不依赖或承诺匹配 PrimeReact 的库 API；无需安装它。完整交互、类型与回调以当前示例代码为准。

## 3. 本例真实用法

下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。

```tsx
import { useState, useRef } from 'react';
import { BusinessDemo, Button } from '../support';

// 场景：可视化调整有界数值，适合比例或配置；保留键盘和常规增减入口。
export default function KnobDemo() {
  const [value, setValue] = useState(65); const ref = useRef<SVGSVGElement>(null);
  function point(x: number,y: number) { const rect = ref.current?.getBoundingClientRect(); if (!rect) return; const angle = (Math.atan2(y-rect.top-rect.height/2,x-rect.left-rect.width/2)*180/Math.PI-135+720)%360; setValue(Math.round(Math.min(270,angle)/270*100)); }
  return <BusinessDemo title="Knob · 数值旋钮" description="拖动旋钮或使用方向键调整 0–100。"><div className="aw-business-row"><svg ref={ref} className="aw-business-knob" viewBox="0 0 120 120" role="slider" tabIndex={0} aria-label="运行配额比例" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value} onPointerDown={event => { event.currentTarget.setPointerCapture(event.pointerId); point(event.clientX,event.clientY); }} onPointerMove={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) point(event.clientX,event.clientY); }} onPointerUp={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }} onKeyDown={event => { if (['ArrowLeft','ArrowDown','ArrowRight','ArrowUp','Home','End'].includes(event.key)) { event.preventDefault(); setValue(current => event.key === 'Home' ? 0 : event.key === 'End' ? 100 : Math.min(100,Math.max(0,current + (['ArrowRight','ArrowUp'].includes(event.key) ? 1 : -1)))); } }}><circle cx="60" cy="60" r="46" fill="none" stroke="var(--aw-color-border-decorative)" strokeWidth="9" strokeDasharray="217 289" transform="rotate(135 60 60)" /><circle cx="60" cy="60" r="46" fill="none" stroke="var(--aw-color-action-primary)" strokeWidth="9" strokeDasharray={`${217*value/100} 289`} transform="rotate(135 60 60)" /><text x="60" y="66" textAnchor="middle" fill="currentColor" fontSize="23">{value}%</text></svg><Button variant="secondary" onClick={() => setValue(current => Math.max(0,current-5))}>−5</Button><Button variant="secondary" onClick={() => setValue(current => Math.min(100,current+5))}>+5</Button></div></BusinessDemo>;
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

功能目录来源：[Knob](https://primereact.dev/docs/styled/components/knob)。与原有目录的对照：comet-dial 是已有相邻效果；通用业务行为按本例补齐。

选型有疑问时返回 [业务表单](../categories/form.md)，先比较最多 2–3 项。
