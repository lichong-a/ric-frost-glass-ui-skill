# Rating

业务表单 · `business-rating` · 中文意图：评分 / 星级 / 评价等级

## 1. 什么场景使用

用户明确对体验或对象打分，并显示或清除当前评分。

**不适合或优先替代：**不能把评分当状态标签；纯展示状态用Tag。

先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加效果组件。

## 2. 只加载这一项

1. 只读本指南，确认用途与边界。
2. 只读 [src/business/demos/business-rating.tsx](../../../src/business/demos/business-rating.tsx)；共享基础有需要才读 [support.tsx](../../../src/business/support.tsx)。
3. 本例若导入 primitives，再定位该文件中被使用的符号，不加载其它示例。样式按需检索 [业务 Token 皮肤](../../../src/business/business.css) 中的对应类。
4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：[05-input](../../contracts/05-input.md)。
5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。

所有实现使用本项目已有 React、原生 HTML 和 CSS。完整交互、类型与回调以当前示例代码为准。

## 3. 本例真实用法

下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。

```tsx
import { useState, useRef } from 'react';
import { BusinessDemo, Button } from '../support';

// 场景：用户对体验或对象进行分级评分，显示当前选择并允许重置。
export default function RatingDemo() {
  const [value, setValue] = useState(0); const refs = useRef<Array<HTMLButtonElement | null>>([]);
  return <BusinessDemo title="Rating · 评分" description="选择 1–5 星，左右方向键调整评分。"><div className="aw-business-row aw-business-rating" role="radiogroup" aria-label="组件体验评分">{[1,2,3,4,5].map(star => <button key={star} ref={element => { refs.current[star-1] = element; }} type="button" role="radio" aria-checked={value === star} aria-label={`${star} 星`} tabIndex={(value || 1) === star ? 0 : -1} data-filled={star <= value} onClick={() => setValue(star)} onKeyDown={event => { if (['ArrowLeft','ArrowRight'].includes(event.key)) { event.preventDefault(); const next = Math.min(5,Math.max(1,star+(event.key === 'ArrowRight' ? 1 : -1))); setValue(next); refs.current[next-1]?.focus(); } }}>★</button>)}</div><Button variant="secondary" onClick={() => setValue(0)}>清除评分</Button><p className="aw-business-status" role="status">{value ? `${value} / 5 星` : '尚未评分'}</p></BusinessDemo>;
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

能力对照：peek-rating 是已有相邻效果；通用业务行为按本例补齐。

选型有疑问时返回 [业务表单](../categories/form.md)，先比较最多 2–3 项。
