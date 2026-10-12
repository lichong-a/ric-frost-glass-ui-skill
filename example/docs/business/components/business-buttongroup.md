# ButtonGroup

业务动作 · `business-buttongroup` · 中文意图：按钮组 / 相关动作 / 视图周期

## 1. 什么场景使用

相邻展示关系明确的动作，并独立表达每项语义。

**不适合或优先替代：**页面主导航用NavigationMenu；不堆无关动作。

先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加效果组件。

## 2. 只加载这一项

1. 只读本指南，确认用途与边界。
2. 只读 [src/business/demos/business-buttongroup.tsx](../../../src/business/demos/business-buttongroup.tsx)；共享基础有需要才读 [support.tsx](../../../src/business/support.tsx)。
3. 本例若导入 primitives，再定位该文件中被使用的符号，不加载其它示例。样式按需检索 [业务 Token 皮肤](../../../src/business/business.css) 中的对应类。
4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：[04-button](../../contracts/04-button.md)。
5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。

所有实现使用本项目已有 React、原生 HTML 和 CSS。完整交互、类型与回调以当前示例代码为准。

## 3. 本例真实用法

下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。

```tsx
import { useState } from 'react';
import { BusinessDemo } from '../support';

// 场景：相关动作紧邻呈现，保持各按钮独立的语义与可访问名称。
export default function ButtonGroupDemo() {
  const [value, setValue] = useState('周');
  return <BusinessDemo title="ButtonGroup · 按钮组" description="相关动作放在一组，当前项有明确选中状态。"><div className="aw-business-segments" role="group" aria-label="视图周期">{['日','周','月'].map(item => <button type="button" key={item} aria-pressed={value === item} onClick={() => setValue(item)}>{item}视图</button>)}</div><p className="aw-business-status" role="status">当前：{value}视图</p></BusinessDemo>;
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

选型有疑问时返回 [业务动作](../categories/action.md)，先比较最多 2–3 项。
