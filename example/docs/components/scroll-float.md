# Scroll Float

滚动与转场 · `scroll-float` · 中文意图：滚动漂浮文字 / 滚动字移

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

文字随滚动轻微漂浮或产生视差。

功能要求：保持内容的语义和可访问名称；只有真实可交互元素可进入焦点顺序。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/scroll/scroll-float.tsx](../../src/demos/scroll/scroll-float.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/TextAnimations/ScrollFloat/ScrollFloat.tsx](../../.upstream/src/ts-default/TextAnimations/ScrollFloat/ScrollFloat.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/TextAnimations/ScrollFloat/ScrollFloat.css](../../.upstream/src/ts-default/TextAnimations/ScrollFloat/ScrollFloat.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/scroll-float.json](../../src/parameters/definitions/scroll-float.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component scroll-float
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Scroll Float 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Component from '../../../.upstream/src/ts-default/TextAnimations/ScrollFloat/ScrollFloat';
import styles from './scroll-float.module.css';

export default function ScrollFloatDemo() {
  const scrollRef = useRef<HTMLDivElement>(null!);
  const contentRef = useRef<HTMLElement>(null);
  const [viewportHeight, setViewportHeight] = useState(0);

  useLayoutEffect(() => {
    const scroller = scrollRef.current;
    const measure = () => setViewportHeight(scroller.clientHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(scroller);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    ScrollTrigger.getAll().filter(trigger => trigger.scroller === scrollRef.current).forEach(trigger => trigger.refresh());
  }, [viewportHeight]);

  useEffect(() => {
    const scroller = scrollRef.current;
    // The locked ScrollFloat effect has no cleanup; release only this demo's triggers.
    return () => ScrollTrigger.getAll().filter(trigger => trigger.scroller === scroller).forEach(trigger => trigger.kill());
  }, []);

  const startScrolling = () => {
    scrollRef.current.scrollTo({
      top: viewportHeight,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
    contentRef.current?.focus({ preventScroll: true });
  };

  return (
    <div className={styles.stage}>
      <div ref={scrollRef} className={styles.scroller} role="region" aria-label="Scroll Float 滚动演示" tabIndex={0}>
        <section className={styles.intro} style={{ height: viewportHeight }} data-scroll-screen="intro">
          <p className={styles.eyebrow}>SCROLL FLOAT</p>
          <h2 className={styles.heading}>向下滚动，让文字浮现</h2>
          <p className={styles.guide}>在预览区域内滚动，下一屏的字母会逐个上浮。向上滚动可倒放。</p>
          <button className={styles.startButton}  onClick={startScrolling} type={"button"} >开始滚动 ↓</button>
        </section>
        <section ref={contentRef} className={styles.content} style={{ minHeight: viewportHeight }} tabIndex={-1} aria-label="文字浮现效果" data-scroll-screen="content">
          {viewportHeight > 0 ? <Component
            scrollContainerRef={scrollRef}
            containerClassName={styles.floatContainer}
            textClassName={styles.floatText}




             animationDuration={1} ease={"back.inOut(2)"} scrollStart={"top bottom"} scrollEnd={"center center"} stagger={0.03}
          >QUIET FLOW</Component> : null}
        </section>
      </div>
    </div>
  );
}

```

### 完整组件 API

源码默认值来自锁定效果实现及已声明的本包适配；本例默认配置来自独立示例，两者可能不同。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `children` | `ReactNode` | 是 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |
| `scrollContainerRef` | `RefObject<HTMLElement>` | 否 | `未指定` | 滚动容器引用的实际 DOM 或组件句柄引用，用于定位、聚焦或命令调用。 |
| `containerClassName` | `string` | 否 | `''` | 容器类名名称，控制 scroll float 的对应渲染或交互参数。 |
| `textClassName` | `string` | 否 | `''` | 文字类名名称，控制 scroll float 的对应渲染或交互参数。 |
| `animationDuration` | `number` | 否 | `1` | 动画时长，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `ease` | `string` | 否 | `'back.inOut(2)'` | 动画缓动名称或配置，按所用动画库的类型传入。 |
| `scrollStart` | `string` | 否 | `'center bottom+=50%'` | 滚动开始，控制 scroll float 的对应渲染或交互参数。 |
| `scrollEnd` | `string` | 否 | `'bottom bottom-=40%'` | 滚动结束，控制 scroll float 的对应渲染或交互参数。 |
| `stagger` | `number` | 否 | `0.03` | 错开，控制 scroll float 的对应渲染或交互参数。 |
| `button.className` | `string \| undefined` | 否 | `未指定` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `button.type` | `"button" \| "reset" \| "submit" \| undefined` | 否 | `未指定` | 原生输入或按钮的行为类型；按钮类型会影响表单提交。 |
| `button.onClick` | `MouseEventHandler<HTMLButtonElement> \| undefined` | 否 | `未指定` | 用户点击或通过键盘激活时触发的事件处理函数。 |
| `button.children` | `ReactNode` | 否 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |

**继承的原生属性：**

- `DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>`：见[完整类型与原生属性](https://react.dev/reference/react-dom/components/common)。

**children 的真实接入：**

```tsx
children={<>QUIET FLOW</>}
```

**scrollContainerRef 的真实接入：**

```tsx
const elementRef = useRef<HTMLElement | null>(null);
// JSX: scrollContainerRef={elementRef}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.type` | `"button"` | select | "button" / "reset" / "submit" | 调节结束后重建 |
| `t1.animationDuration` | `1` | range | 0.1 ~ 3 s | 调节结束后重建 |
| `t1.ease` | `"back.inOut(2)"` | text | 不限 ~ 不限 | 调节结束后重建 |
| `t1.scrollStart` | `"top bottom"` | text | 不限 ~ 不限 | 调节结束后重建 |
| `t1.scrollEnd` | `"center center"` | text | 不限 ~ 不限 | 调节结束后重建 |
| `t1.stagger` | `0.03` | range | 0 ~ 0.2 s | 调节结束后重建 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Wan 皮肤

- 标题按页面层级选择宋体或 UI 字体；正文保持无衬线。动画终态必须是完整、清晰、可复制的文字。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`gsap`、`react`。安装前复用目标项目的兼容版本，不重复加载。
- 运行类型：本例预览入口不要求预先通过图形接口检查；实际组件内部的可选渲染分支由源码和本例 Props 决定。此说明不等于浏览器运行证明。
- 动效策略：遵从系统减少动效偏好，功能交互保持可用。
- 示例库降级：动态偏好或能力检查不满足时先不挂载本项，显示原因；减少运动时可明确选择仅播放本次。
- 业务接入的静态降级要求：保留可读内容与原生交互，并提供当前组件的静态状态
- 卸载时释放本例监听、计时、动画帧及拥有的渲染资源；不以隐藏 CSS 代替停止循环。

仅当前需求涉及高级运行、资源或设备权限时再读 [效果与降级策略](../effects-policy.md)。

## 6. 验收本组件

1. 参数与对应源码真实 API 一致，构建可导入，安装失败可恢复。
2. 能观察到第 1 节的核心机制，而不只是相同名称的占位卡片。
3. 真实状态 / 事件 / 键盘与必要的触屏等价操作可用。
4. 画布保留本例的效果对比度和原版配色；外壳、阅读面与基础规范一致。
5. 只激活本项；切换或卸载后停止其持续工作。
6. 减少运动与不可用情形保留本节所述等价内容或功能。

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [滚动与转场](../effects/categories/scroll.md)；否则直接完成当前组件。
