# MeterGroup

状态与反馈 · `business-metergroup` · 中文意图：配额组成 / 多段指标 / 容量占比

## 1. 什么场景使用

多个部分组成总量，需要同时显示数值、标签与比例。

**不适合或优先替代：**单一完成进度用ProgressBar；不要只画无标签颜色段。

先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加效果组件。

## 2. 只加载这一项

1. 只读本指南，确认用途与边界。
2. 只读 [src/business/demos/feedback/business-metergroup.tsx](../../../src/business/demos/feedback/business-metergroup.tsx)；需核对 API 与 DIY 配置时读 [本项参数记录](../../../src/parameters/definitions/business-metergroup.json)；共享基础有需要才读 [support.tsx](../../../src/business/support.tsx)。
3. 本例从 components 按需导入独立控件；只读实际导入的 .tsx 及同名 .module.css。布局工具类也显式使用 CSS Modules，不给整块区域的 button/input 套统一动效。
4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：[15-feedback](../../contracts/15-feedback.md)。
5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。

所有实现使用本项目已有 React、原生语义控件、Motion 和 CSS。完整交互、类型与回调以当前示例代码为准；局部弹性、下拉、媒体与日历效果见 [交互动效指南](../motion-guide.md)。

## 3. 本例真实用法

下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。

```tsx
// 当前 MeterGroup 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { useState, type ChangeEvent } from 'react';
import { motion } from 'motion/react';
import { RangeSlider } from '../../components/RangeSlider';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Field } from '../../components/Field';
import { useBusinessReducedMotion } from '../../motion-preference';
import styles from './business-metergroup.module.css';

export default function BusinessMeterGroupDemo() {
  const [knowledge, setKnowledge] = useState(45);
  const reduced = useBusinessReducedMotion();
  const groups = [
    { label: '知识', value: knowledge, color: 'var(--aw-palette-primary)' },
    { label: '文档', value: Math.round((100 - knowledge) * 0.6), color: 'var(--aw-palette-scene-sand)' },
    { label: '服务', value: 100 - knowledge - Math.round((100 - knowledge) * 0.6), color: 'var(--aw-palette-effect-terra)' },
  ];
  const transition = { duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] as const };

  function changeKnowledge(event: ChangeEvent<HTMLInputElement>) {
    setKnowledge(Number(event.target.value));
  }

  return (
    <BusinessDemo title="MeterGroup" description="分组展示资料容量分配，调整知识占比后其他类别自动保持总和100%。">
      <Field  label={`知识占比：${knowledge}%`} control={true} >
        <RangeSlider   value={knowledge} onChange={changeKnowledge} min={"0"} max={"100"}  />
      </Field>
      <div className={styles.allocation} aria-hidden="true">
        {groups.map(group => (
          <motion.div
            key={group.label}
            className={styles.segment}
            style={{ background: group.color }}
            initial={false}
            animate={{ width: `${group.value}%` }}
            transition={transition}
          />
        ))}
      </div>
      <ul className={styles.legend} aria-label="资料容量分配">
        {groups.map(group => (
          <li key={group.label} className={styles.item}>
            <div className={styles.heading}>
              <span className={styles.dot} style={{ background: group.color }} aria-hidden="true" />
              <span>{group.label}</span>
              <span className={styles.value} aria-hidden="true">{group.value}%</span>
            </div>
            <meter className={styles.meterSemantics}   value={group.value} aria-label={group.label + '占比'} min={"0"} max={"100"} >{group.value}%</meter>
            <div className={styles.track} aria-hidden="true">
              <motion.span
                className={styles.fill}
                style={{ background: group.color }}
                initial={false}
                animate={{ scaleX: group.value / 100 }}
                transition={transition}
              />
            </div>
          </li>
        ))}
      </ul>
    </BusinessDemo>
  );
}
```

### 完整组件 API

源码默认值来自本包业务实现；本例默认配置来自独立示例，两者可能不同。

本例默认导出是由原生元素与叶组件组成的演示函数，不接收公开 Props。下表按叶组件前缀列出实际 API；原生属性类型单独注明。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `Field.label` | `string` | 是 | `未指定` | 向用户或辅助技术说明控件的名称。 |
| `Field.children` | `ReactNode` | 是 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `Field.hint` | `string` | 否 | `未指定` | 与字段一起显示的帮助文字。 |
| `Field.htmlFor` | `string` | 否 | `(isControl ? children.props.id : undefined)` | 关联控件的 id，让标签点击与辅助技术定位到该控件。 |
| `Field.control` | `boolean` | 否 | `false` | 是否控制，决定该分支的展示或交互行为。 |
| `RangeSlider.max` | `string \| number \| undefined` | 否 | `100` | 允许输入、拖动或选择的上限。 |
| `RangeSlider.min` | `string \| number \| undefined` | 否 | `0` | 允许输入、拖动或选择的下限。 |
| `RangeSlider.value` | `string \| number \| readonly string[] \| undefined` | 否 | `0` | 当前受控值，由调用方维护并随交互回调更新。 |
| `RangeSlider.className` | `string \| undefined` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `RangeSlider.style` | `CSSProperties \| undefined` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |
| `RangeSlider.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `meter.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `meter.min` | `string \| number \| undefined` | 否 | `未指定` | 允许输入、拖动或选择的下限。 |
| `meter.max` | `string \| number \| undefined` | 否 | `未指定` | 允许输入、拖动或选择的上限。 |
| `meter.value` | `string \| number \| readonly string[] \| undefined` | 否 | `未指定` | 当前受控值，由调用方维护并随交互回调更新。 |
| `meter.aria-label` | `string \| undefined` | 否 | `未指定` | 辅助技术的 label 状态或说明；值须与控件当前可观察行为一致。 |
| `meter.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |

本示例函数不接收额外公开 Props，能力由原生元素与上述叶组件组合；下面列出实际继承类型和可编辑示例配置。

**继承的原生属性：**

- `DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `DetailedHTMLProps<MeterHTMLAttributes<HTMLMeterElement>, HTMLMeterElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。
- `InputHTMLAttributes<HTMLInputElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**children 的真实接入：**

```tsx
children={<><RangeSlider min="0" max="100" value={knowledge} onChange={changeKnowledge} /></>}
```

**value 的真实接入：**

```tsx
value={knowledge}
```

**style 的真实接入：**

```tsx
style={{ width: "100%", minHeight: 240 }}
```

**children 的真实接入：**

```tsx
children={"示例"}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.control` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t1.min` | `"0"` | json | 不限 ~ 不限 | 即时应用 |
| `t1.max` | `"100"` | json | 不限 ~ 不限 | 即时应用 |
| `t2.min` | `"0"` | json | 不限 ~ 不限 | 即时应用 |
| `t2.max` | `"100"` | json | 不限 ~ 不限 | 即时应用 |
| `state.knowledge` | `45` | number | 0 ~ 100 | 即时应用；原组件回调同步受控值 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. 接入约束

- 颜色、阅读面、圆角、边界、焦点与阴影使用 Agent Ric Token，业务逻辑留在所属模块。
- 服务端状态、资源归属与动作权限由既有可信业务接口处理；前端输入限制只服务于体验。
- 保留本项键盘、名称、空状态、错误状态和恢复入口，清理拥有的监听、计时器、观察器与对象 URL。
- 文档中的本地数组、文件或短命令只用于示例；不增加未授权的上传、设备访问、外部写入或 shell 执行。
- 减少运动偏好下保留业务操作，仅停用短过渡；不要因为动效偏好关闭必要表单与菜单。

## 5. 场景级验收

按第 1 节实际业务任务检查状态变化、键盘路径、边界值、失败和取消。只报告运行过的检查；本指南和源码存在不等于已完成浏览器验收。

能力对照：此前没有独立可运行业务示例，规范和 CSS 不作为运行覆盖。

选型有疑问时返回 [状态与反馈](../categories/feedback.md)，先比较最多 2–3 项。
