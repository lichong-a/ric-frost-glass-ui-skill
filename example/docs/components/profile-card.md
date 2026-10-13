# Profile Card

卡片与面板 · `profile-card` · 中文意图：个人资料卡 / 用户卡片

目录：[效果](#1-必须保留) · [资源](#2-只读本组件的资源) · [参数](#3-本例参数与-api) · [皮肤](#4-agent-wan-皮肤) · [运行与降级](#5-加载动效与降级) · [验收](#6-验收本组件)

## 1. 必须保留

资料卡保留指针倾斜与图案反光。

功能要求：保持内容的语义和可访问名称；只有真实可交互元素可进入焦点顺序。

## 2. 只读本组件的资源

| 资源 | 位置与用途 |
|---|---|
| 自有示例（随包） | [example/src/demos/cards/profile-card.tsx](../../src/demos/cards/profile-card.tsx) |
| 组件实现（准备后存在） | [example/.upstream/src/ts-default/Components/ProfileCard/ProfileCard.tsx](../../.upstream/src/ts-default/Components/ProfileCard/ProfileCard.tsx) |
| 组件 CSS（准备后存在） | [example/.upstream/src/ts-default/Components/ProfileCard/ProfileCard.css](../../.upstream/src/ts-default/Components/ProfileCard/ProfileCard.css) |
| 单独 Props 记录 | [example/src/parameters/definitions/profile-card.json](../../src/parameters/definitions/profile-card.json) |
| 固定版本 | `2139cb3098d4fedc6264f13e50dcb4694224ba7c` |

先打开随包示例，确认它如何组合 props、状态与资源。官方源码不随本包再分发；若上表安装路径不存在，在包根运行：

```bash
node scripts/example.mjs setup --component profile-card
```

安装完成再读取对应源码及直接依赖。无需加载其余 214 项。

## 3. 本例参数与 API

以下来自本包自有示例的实际用法；它只表示本例参数，不代表上游所有 Props。

```tsx
// 当前 Profile Card 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：680px（宿主设置，不是组件 Props）。
// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/ProfileCard/ProfileCard';
import { palette } from '../../shared/demo-support';
import { useState } from "react";
// 不用真实个人头像或虚构身份数据；移动端设备方向权限默认不申请。

export default function ProfileCardDemo() {
  const [status, setStatus] = useState("移动指针查看卡片视差，点击下方按钮");

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 620, position: 'relative', overflow: 'hidden' }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ height: 550, display: 'grid', placeItems: 'center' }}><Component




onContactClick={() => setStatus('已点击查看资料；此处接入项目自己的详情页')} avatarUrl={import.meta.env.BASE_URL + "media/scene-3.svg"} miniAvatarUrl={import.meta.env.BASE_URL + "media/scene-3.svg"} iconUrl={import.meta.env.BASE_URL + "media/agent-wan-mark.svg"} name={"Agent Wan"} title={"智能体协作工作台"} handle={"agent-wan"} status={"示例在线"} statusColor={"#52604e"} contactText={"查看资料"} showUserInfo={true} theme={"light"} backdropColor={"#e8e4d7"} radius={20} holo={0.18} glare={0.18} enableTilt={true} tiltStrength={7} parallax={4} enableMobileTilt={false} mobileTiltSensitivity={5} intro={true}  /></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}

```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `avatarUrl` | `string` | 否 | `''` | 头像地址，控制 profile card 的对应渲染或交互参数。 |
| `iconUrl` | `string` | 否 | `未指定` | 图标地址，控制 profile card 的对应渲染或交互参数。 |
| `miniAvatarUrl` | `string` | 否 | `未指定` | 小型头像地址，控制 profile card 的对应渲染或交互参数。 |
| `name` | `string` | 否 | `'Javi A. Torres'` | 原生表单字段名称，用于表单提交与分组。 |
| `title` | `string` | 否 | `'Software Engineer'` | 组件标题或原生元素提示文字。 |
| `handle` | `string` | 否 | `'javicodes'` | 拖动把手，控制 profile card 的对应渲染或交互参数。 |
| `status` | `string` | 否 | `'Online'` | 状态，控制 profile card 的对应渲染或交互参数。 |
| `statusColor` | `string` | 否 | `'#22c55e'` | 状态颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `contactText` | `string` | 否 | `'Contact'` | 联系入口文字，控制 profile card 的对应渲染或交互参数。 |
| `showUserInfo` | `boolean` | 否 | `true` | 是否显示用户信息，决定该分支的展示或交互行为。 |
| `onContactClick` | `() => void` | 否 | `未指定` | 联系入口点击时执行的回调；按签名接收事件或结果，调用方在函数中同步业务状态。 |
| `theme` | `Palette` | 否 | `'dark'` | 主题，控制 profile card 的对应渲染或交互参数。 |
| `backdropColor` | `string` | 否 | `未指定` | 遮罩颜色，传入组件支持的 CSS 或着色器颜色格式。 |
| `radius` | `number` | 否 | `16` | 半径，决定几何、布局或绘制尺寸；数值与 CSS 字符串支持按类型设置。 |
| `holo` | `number` | 否 | `0.8` | 全息，控制 profile card 的对应渲染或交互参数。 |
| `glare` | `number` | 否 | `0.5` | 眩光，控制 profile card 的对应渲染或交互参数。 |
| `enableTilt` | `boolean` | 否 | `true` | 是否启用倾斜，决定该分支的展示或交互行为。 |
| `tiltStrength` | `number` | 否 | `12` | 倾斜强度，控制 profile card 的对应渲染或交互参数。 |
| `parallax` | `number` | 否 | `8` | 视差，控制 profile card 的对应渲染或交互参数。 |
| `enableMobileTilt` | `boolean` | 否 | `false` | 是否启用移动端倾斜，决定该分支的展示或交互行为。 |
| `mobileTiltSensitivity` | `number` | 否 | `5` | 移动端倾斜灵敏度，控制 profile card 的对应渲染或交互参数。 |
| `intro` | `boolean` | 否 | `true` | 是否入场，决定该分支的展示或交互行为。 |
| `className` | `string` | 否 | `''` | 附加在组件容器上的 CSS 类名，用于调用方的局部样式。 |

**onContactClick 的真实接入：**

```tsx
onContactClick={() => setStatus('已点击查看资料；此处接入项目自己的详情页')}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.avatarUrl` | `"@media/scene-3.svg"` | resource | 不限 ~ 不限 | 即时应用 |
| `t0.miniAvatarUrl` | `"@media/scene-3.svg"` | resource | 不限 ~ 不限 | 即时应用 |
| `t0.iconUrl` | `"@media/agent-wan-mark.svg"` | resource | 不限 ~ 不限 | 即时应用 |
| `t0.name` | `"Agent Wan"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.title` | `"智能体协作工作台"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.handle` | `"agent-wan"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.status` | `"示例在线"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.statusColor` | `"#52604e"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.contactText` | `"查看资料"` | text | 不限 ~ 不限 | 即时应用 |
| `t0.showUserInfo` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.theme` | `"light"` | select | "dark" / "light" | 即时应用 |
| `t0.backdropColor` | `"#e8e4d7"` | color | 不限 ~ 不限 | 即时应用 |
| `t0.radius` | `20` | number | 不限 ~ 不限 | 即时应用 |
| `t0.holo` | `0.18` | number | 不限 ~ 不限 | 即时应用 |
| `t0.glare` | `0.18` | number | 不限 ~ 不限 | 即时应用 |
| `t0.enableTilt` | `true` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.tiltStrength` | `7` | number | 不限 ~ 不限 | 即时应用 |
| `t0.parallax` | `4` | number | 不限 ~ 不限 | 即时应用 |
| `t0.enableMobileTilt` | `false` | switch | 不限 ~ 不限 | 即时应用 |
| `t0.mobileTiltSensitivity` | `5` | number | 不限 ~ 不限 | 即时应用 |
| `t0.intro` | `true` | switch | 不限 ~ 不限 | 即时应用 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `680`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. Agent Wan 皮肤

- 容器、状态色、边界与焦点使用 Agent Wan 规范；交互命中区不随视觉形变缩小。
- 组件库外壳与基础控件沿用主题 Token；效果画布通过真实 Props 保留原版配色和可观察强度。
- 保留实际效果结构，不用一张背景图或统一 hover 卡片代替该组件。

## 5. 加载、动效与降级

本例实际配置：设备访问与音频行为以本例真实 Props 和显式回调为准。capabilities 是源码扫描提示，不能据此声称已请求相机、录音或播放音频。

- 依赖清单：`@hugeicons/core-free-icons`、`@hugeicons/react`、`react`。安装前复用目标项目的兼容版本，不重复加载。
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

只报告实际执行的构建、交互和视觉检查。选型需要同类比较时才返回 [卡片与面板](../categories/cards.md)；否则直接完成当前组件。
