# Masonry

媒体与轮播 · `masonry` · 中文意图：瀑布流 / 不等高图片布局

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

不等高内容响应式排布并平滑重排。

功能要求：图片说明与次序可理解；提供触屏和键盘可达的浏览路径，自动播放可暂停，资源失败时保留稳定布局。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/media/masonry.tsx](../../src/demos/media/masonry.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Components/Masonry/Masonry.tsx](../../.upstream/src/ts-default/Components/Masonry/Masonry.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Components/Masonry/Masonry.css](../../.upstream/src/ts-default/Components/Masonry/Masonry.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/masonry.json](../../src/parameters/definitions/masonry.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component masonry
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Masonry 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { useState } from 'react';
import Component from '../../../.upstream/src/ts-default/Components/Masonry/Masonry';






import styles from './masonry.module.css';


const labels = ['色彩绽放', '棱镜树冠', '矿物潮汐', '太阳沙丘', '夜间轨道', '朱红折叠'];


export default function MasonryDemo() {
  const [selected, setSelected] = useState('点击素材卡片选择作品；调整预览宽度可观察重排。');
  return (
    <section className={styles.stage} data-visual-demo="masonry">
      <header className={styles.header}><span className={styles.eyebrow}>COLOR STUDIES</span><h2 className={styles.title}>色彩的不同形态</h2><p className={styles.status} role="status" aria-live="polite">{selected}</p></header>
      <div className={styles.grid} onClickCapture={event => {
        const item = (event.target as Element).closest('[data-key]');
        if (item) {
          event.preventDefault(); event.stopPropagation();
          const index = Number(item.getAttribute('data-key')?.replace('art-', ''));
          setSelected('已选择：' + labels[index % labels.length]);
        }
      }}>
        <Component
               items={[{ "id": "art-0", "img": new URL("../../assets/restoration/chromatic-bloom.svg", import.meta.url).href, "url": "#art-0", "height": 420 }, { "id": "art-1", "img": new URL("../../assets/restoration/prismatic-canopy.svg", import.meta.url).href, "url": "#art-1", "height": 600 }, { "id": "art-2", "img": new URL("../../assets/restoration/mineral-tide.svg", import.meta.url).href, "url": "#art-2", "height": 360 }, { "id": "art-3", "img": new URL("../../assets/restoration/solar-dunes.svg", import.meta.url).href, "url": "#art-3", "height": 500 }, { "id": "art-4", "img": new URL("../../assets/restoration/nocturne-orbit.svg", import.meta.url).href, "url": "#art-4", "height": 640 }, { "id": "art-5", "img": new URL("../../assets/restoration/vermilion-fold.svg", import.meta.url).href, "url": "#art-5", "height": 440 }, { "id": "art-6", "img": new URL("../../assets/restoration/chromatic-bloom.svg", import.meta.url).href, "url": "#art-6", "height": 420 }, { "id": "art-7", "img": new URL("../../assets/restoration/prismatic-canopy.svg", import.meta.url).href, "url": "#art-7", "height": 600 }, { "id": "art-8", "img": new URL("../../assets/restoration/mineral-tide.svg", import.meta.url).href, "url": "#art-8", "height": 360 }, { "id": "art-9", "img": new URL("../../assets/restoration/solar-dunes.svg", import.meta.url).href, "url": "#art-9", "height": 500 }, { "id": "art-10", "img": new URL("../../assets/restoration/nocturne-orbit.svg", import.meta.url).href, "url": "#art-10", "height": 640 }, { "id": "art-11", "img": new URL("../../assets/restoration/vermilion-fold.svg", import.meta.url).href, "url": "#art-11", "height": 440 }]} ease={"power3.out"} duration={0.6} stagger={0.06} animateFrom={"bottom"} scaleOnHover={true} hoverScale={0.97} blurToFocus={true} colorShiftOnHover={false}  />
      </div>
    </section>
  );
}

```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `items` | `Item[]` | 是 | `未指定` | 参与渲染或交互的条目列表，每项字段和可选内容按完整类型传入。 |
| `ease` | `string` | 否 | `'power3.out'` | 动画缓动名称或配置，按所用动画库的类型传入。 |
| `duration` | `number` | 否 | `0.6` | 一次动画或过渡的持续时长，时间单位以组件实现和示例为准。 |
| `stagger` | `number` | 否 | `0.05` | 错开，控制 masonry 的对应渲染或交互参数。 |
| `animateFrom` | `'bottom' \| 'top' \| 'left' \| 'right' \| 'center' \| 'random'` | 否 | `'bottom'` | 动画起始，控制 masonry 的对应渲染或交互参数。 |
| `scaleOnHover` | `boolean` | 否 | `true` | 是否缩放悬停，决定该分支的展示或交互行为。 |
| `hoverScale` | `number` | 否 | `0.95` | 悬停缩放，控制 masonry 的对应渲染或交互参数。 |
| `blurToFocus` | `boolean` | 否 | `true` | 是否模糊目标焦点，决定该分支的展示或交互行为。 |
| `colorShiftOnHover` | `boolean` | 否 | `false` | 是否颜色偏移悬停，决定该分支的展示或交互行为。 |

**items 的真实接入：**

```tsx
items={items}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.items` | `[{"id":"art-0","img":"@asset/restoration/chromatic-bloom.svg","url":"#art-0","height":420},{"id":"art-1","img":"@asset/restoration/prismatic-canopy.svg","url":"#art-1","height":600},{"id":"art-2","img":"@asset/restoration/mineral-tide.svg","url":"#art-2","height":360},{"id":"art-3","img":"@asset/restoration/solar-dunes.svg","url":"#art-3","height":500},{"id":"art-4","img":"@asset/restoration/nocturne-orbit.svg","url":"#art-4","height":640},{"id":"art-5","img":"@asset/restoration/vermilion-fold.svg","url":"#art-5","height":440},{"id":"art-6","img":"@asset/restoration/chromatic-bloom.svg","url":"#art-6","height":420},{"id":"art-7","img":"@asset/restoration/prismatic-canopy.svg","url":"#art-7","height":600},{"id":"art-8","img":"@asset/restoration/mineral-tide.svg","url":"#art-8","height":360},{"id":"art-9","img":"@asset/restoration/solar-dunes.svg","url":"#art-9","height":500},{"id":"art-10","img":"@asset/restoration/nocturne-orbit.svg","url":"#art-10","height":640},{"id":"art-11","img":"@asset/restoration/vermilion-fold.svg","url":"#art-11","height":440}]` | json | 不限 ~ 不限 | 即时应用 |
| `t0.ease` | `"power3.out"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.duration` | `0.6` | range | 0.1 ~ 2 s | 即时应用 |
| `t0.stagger` | `0.06` | range | 0 ~ 0.3 s | 即时应用 |
| `t0.animateFrom` | `"bottom"` | select | "bottom" / "top" / "left" / "right" / "center" / "random" | 即时应用 |
| `t0.scaleOnHover` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.hoverScale` | `0.97` | range | 0.7 ~ 1.3 倍率 | 即时应用 |
| `t0.blurToFocus` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.colorShiftOnHover` | `false` | switch | 不限 ~ 不限 | 即时应用 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [媒体与轮播](../categories/media.md)；否则直接完成当前组件。
