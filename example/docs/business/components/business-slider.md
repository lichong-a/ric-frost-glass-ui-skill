# Slider

业务表单 · `business-slider` · 中文意图：范围滑块 / 区间筛选 / 连续数值

## 1. 什么场景使用

调整有界连续值或上下限区间，数字值始终可见。

**不适合或优先替代：**精确数量与金额用InputNumber；不要省略键盘入口。

先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加效果组件。

## 2. 只加载这一项

1. 只读本指南，确认用途与边界。
2. 只读 [src/business/demos/business-slider.tsx](../../../src/business/demos/business-slider.tsx)；共享基础有需要才读 [support.tsx](../../../src/business/support.tsx)。
3. 本例若导入 primitives，再定位该文件中被使用的符号，不加载其它示例。样式按需检索 [业务 Token 皮肤](../../../src/business/business.css) 中的对应类。
4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：[05-input](../../contracts/05-input.md)。
5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。

所有实现使用本项目已有 React、原生 HTML 和 CSS。完整交互、类型与回调以当前示例代码为准。

## 3. 本例真实用法

下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。

```tsx
import { useState, useId } from 'react';
import { BusinessDemo, Field } from '../support';

// 场景：在有界连续范围内调整值或选择区间，保留精确值展示。
export default function SliderDemo() {
  const id = useId(); const [value, setValue] = useState(40); const [start, setStart] = useState(20); const [end, setEnd] = useState(80);
  return <BusinessDemo title="Slider · 范围滑块" description="单值和区间选择，同时展示精确数字。"><Field label={`采样比例 ${value}%`} htmlFor={id}><input id={id} type="range" min={0} max={100} value={value} onChange={event => setValue(Number(event.target.value))} /></Field><Field label={`区间下限 ${start}`} htmlFor={`${id}-start`}><input id={`${id}-start`} type="range" min={0} max={end} value={start} onChange={event => setStart(Number(event.target.value))} /></Field><Field label={`区间上限 ${end}`} htmlFor={`${id}-end`}><input id={`${id}-end`} type="range" min={start} max={100} value={end} onChange={event => setEnd(Number(event.target.value))} /></Field><p className="aw-business-status" role="status">区间：{start}–{end}</p></BusinessDemo>;
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

能力对照：wake-slider、elastic-slider 是已有相邻效果；通用业务行为按本例补齐。

选型有疑问时返回 [业务表单](../categories/form.md)，先比较最多 2–3 项。
