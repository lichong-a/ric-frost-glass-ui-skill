# Flying Posters

媒体与轮播 · `flying-posters` · 中文意图：飞行海报 / 翻转海报

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

海报在连续列中随滚动或拖动翻转。

功能要求：图片说明与次序可理解；提供触屏和键盘可达的浏览路径，自动播放可暂停，资源失败时保留稳定布局。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/media/flying-posters.tsx](../../src/demos/media/flying-posters.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Components/FlyingPosters/FlyingPosters.tsx](../../.upstream/src/ts-default/Components/FlyingPosters/FlyingPosters.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Components/FlyingPosters/FlyingPosters.css](../../.upstream/src/ts-default/Components/FlyingPosters/FlyingPosters.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/flying-posters.json](../../src/parameters/definitions/flying-posters.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component flying-posters
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Flying Posters 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import { useState } from 'react';
import Component from '../../../.upstream/src/ts-default/Components/FlyingPosters/FlyingPosters';






import styles from './flying-posters.module.css';


const labels = ['色彩绽放', '棱镜树冠', '矿物潮汐', '太阳沙丘', '夜间轨道', '朱红折叠'];


export default function FlyingPostersDemo() {
  const [status, setStatus] = useState('点击海报选择作品。');
  return (
    <div className={styles.stage} data-visual-demo="flying-posters">
      <div className={styles.field}>
        <Component


            onItemClick={(_item, index) => setStatus('已选择：' + labels[index % labels.length])} items={[{ "image": new URL("../../assets/restoration/chromatic-bloom.svg", import.meta.url).href, "alt": "色彩绽放" }, { "image": new URL("../../assets/restoration/prismatic-canopy.svg", import.meta.url).href, "alt": "棱镜树冠" }, { "image": new URL("../../assets/restoration/mineral-tide.svg", import.meta.url).href, "alt": "矿物潮汐" }, { "image": new URL("../../assets/restoration/solar-dunes.svg", import.meta.url).href, "alt": "太阳沙丘" }, { "image": new URL("../../assets/restoration/nocturne-orbit.svg", import.meta.url).href, "alt": "夜间轨道" }, { "image": new URL("../../assets/restoration/vermilion-fold.svg", import.meta.url).href, "alt": "朱红折叠" }]} planeWidth={300} planeHeight={330} distortion={3} scrollEase={0.025} cameraFov={45} cameraZ={20} gap={48} columns={1} radius={0.06} rotation={180} speed={0} lean={0.2} fade={0.15} shading={0.25} wheel={true} drag={true} columnGap={40} alternate={true} axis={"vertical"} pageScroll={0}  />
      </div>
      <div className={styles.caption}><p className={styles.hint}>滚动鼠标或按住拖动，浏览翻转的 3D 海报</p><p className={styles.status} role="status" aria-live="polite">{status}</p></div>
    </div>
  );
}

```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `items` | `FlyingPostersItem[]` | 否 | `[]` | 参与渲染或交互的条目列表，每项字段和可选内容按完整类型传入。 |
| `planeWidth` | `number` | 否 | `320` | 平面宽度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `planeHeight` | `number` | 否 | `320` | 平面高度，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `distortion` | `number` | 否 | `3` | 扭曲，控制 flying posters 的对应渲染或交互参数。 |
| `scrollEase` | `number` | 否 | `0.01` | 滚动缓动，控制 flying posters 的对应渲染或交互参数。 |
| `cameraFov` | `number` | 否 | `45` | 相机视场角，控制 flying posters 的对应渲染或交互参数。 |
| `cameraZ` | `number` | 否 | `20` | 相机Z轴，控制 flying posters 的对应渲染或交互参数。 |
| `gap` | `number` | 否 | `未指定` | 相邻单元、卡片或字符之间的间距；单位由组件实现定义。 |
| `columns` | `number` | 否 | `1` | 列数，控制 flying posters 的对应渲染或交互参数。 |
| `columnGap` | `number` | 否 | `40` | 列间距，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `alternate` | `boolean` | 否 | `true` | 是否交替，决定该分支的展示或交互行为。 |
| `radius` | `number` | 否 | `0` | 半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `rotation` | `number` | 否 | `180` | 旋转角度，控制 flying posters 的对应渲染或交互参数。 |
| `axis` | `'vertical' \| 'horizontal' \| 'diagonal'` | 否 | `'vertical'` | 坐标轴，控制 flying posters 的对应渲染或交互参数。 |
| `speed` | `number` | 否 | `0` | 动画、流动或滚动的推进速度；不同效果使用各自的速度尺度。 |
| `lean` | `number` | 否 | `0` | 倾斜，控制 flying posters 的对应渲染或交互参数。 |
| `fade` | `number` | 否 | `0` | 淡出，控制 flying posters 的对应渲染或交互参数。 |
| `shading` | `number` | 否 | `0` | 面部明暗，控制 flying posters 的对应渲染或交互参数。 |
| `wheel` | `boolean` | 否 | `true` | 是否滚轮，决定该分支的展示或交互行为。 |
| `drag` | `boolean` | 否 | `true` | 是否拖动，决定该分支的展示或交互行为。 |
| `pageScroll` | `number` | 否 | `0` | 页码滚动，决定动画或交互阶段的时间安排；单位以该组件源码为准。 |
| `onItemClick` | `(item: { image: string; link?: string; alt?: string }, index: number) => void` | 否 | `未指定` | 用户点击列表或菜单项时通知调用方，参数为条目及索引。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |
| `style` | `React.CSSProperties` | 否 | `未指定` | 容器的 React 内联样式对象，尺寸、布局与 CSS 属性按 CSSProperties 传入。 |

**items 的真实接入：**

```tsx
items={items}
```

**onItemClick 的真实接入：**

```tsx
onItemClick={(_item, index) => setStatus('已选择：' + labels[index % labels.length])}
```

**style 的真实接入：**

```tsx
style={{ width: "100%", minHeight: 240 }}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.items` | `[{"image":"@asset/restoration/chromatic-bloom.svg","alt":"色彩绽放"},{"image":"@asset/restoration/prismatic-canopy.svg","alt":"棱镜树冠"},{"image":"@asset/restoration/mineral-tide.svg","alt":"矿物潮汐"},{"image":"@asset/restoration/solar-dunes.svg","alt":"太阳沙丘"},{"image":"@asset/restoration/nocturne-orbit.svg","alt":"夜间轨道"},{"image":"@asset/restoration/vermilion-fold.svg","alt":"朱红折叠"}]` | json | 不限 ~ 不限 | 调节结束后重建 |
| `t0.planeWidth` | `300` | range | 120 ~ 640 px | 调节结束后重建 |
| `t0.planeHeight` | `330` | range | 120 ~ 800 px | 调节结束后重建 |
| `t0.distortion` | `3` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.scrollEase` | `0.025` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.cameraFov` | `45` | range | 20 ~ 100 ° | 调节结束后重建 |
| `t0.cameraZ` | `20` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.gap` | `48` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.columns` | `1` | range | 1 ~ 6 列 | 调节结束后重建 |
| `t0.radius` | `0.06` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.rotation` | `180` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.speed` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.lean` | `0.2` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.fade` | `0.15` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.shading` | `0.25` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.wheel` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.drag` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.columnGap` | `40` | number | 不限 ~ 不限 | 调节结束后重建 |
| `t0.alternate` | `true` | switch | 不限 ~ 不限 | 调节结束后重建 |
| `t0.axis` | `"vertical"` | select | "vertical" / "horizontal" / "diagonal" | 调节结束后重建 |
| `t0.pageScroll` | `0` | number | 不限 ~ 不限 | 调节结束后重建 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`react`。安装前复用目标项目的兼容版本，不重复加载。
- 运行类型：本例预览入口声明需 WebGL；这是当前示例的运行配置，不是仅凭源码关键词推断。此说明不等于浏览器运行证明。
- 动效策略：按需启用的持续 / 高运动效果。
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
