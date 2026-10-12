<div align="center">

# Agent Wan UI

**自然色霜玻璃界面 · 清晰交互 · 按需读取**

面向 React 页面与组件的设计规范、交互示例和渐进式 Skill。

[开始使用](#开始使用) · [浏览能力](#组件能力) · [交给 Agent](#交给-agent) · [视觉规范](AGENT_WAN_UI_SPEC.md)

<img src="assets/readme/readme-hero-v02.png" width="920" alt="档案架上的多数资料保持闭合，角色只取出一册资料，沿一条纸带逐层展开当前工作需要的内容。" />

</div>

> 先找到当前任务需要的能力，再读取它的用法与边界。让界面保持安静，让操作与状态清楚可见。

| 组件示例 | 业务基础 | 交互与效果 | 场景指南 |
| :---: | :---: | :---: | :---: |
| **303** | **88** | **215** | **逐项可查** |

## 这里有什么

- **统一的视觉语言**：茶绿、沙米、象牙白与深墨色；稳定阅读面、清晰边界、柔和层次。
- **可操作的示例**：输入、选择、排序、分页、展开、确认和反馈都有对应的状态与操作。
- **克制的加载方式**：目录只加载轻量信息，选中一项才加载它的演示；暂停或切换时释放当前预览。
- **渐进式的 Agent 入口**：先看场景与替代边界，再读单个指南、代码和必要契约。

## 组件能力

| 需要完成的事情 | 可以从这些组件开始 |
| --- | --- |
| 输入、选择与表单反馈 | AutoComplete、InputText、Select、DatePicker、InputTags、InputOtp |
| 浏览和整理数据 | DataTable、DataView、Tree、TreeTable、PickList、Paginator |
| 组织内容与流程 | Accordion、Panel、Tabs、Stepper、Splitter、Inplace |
| 临时输入与就地操作 | Dialog、Drawer、Popover、Menu、CommandMenu |
| 展示状态与结果 | Message、Toast、Badge、Tag、ProgressBar、Skeleton |
| 图片与媒体浏览 | Gallery、Carousel、Compare |
| 文字、指针与局部动效 | Split Text、Shiny Text、Click Spark、Glass Surface |
| 焦点、挂载与辅助说明 | FocusTrap、Portal、VisuallyHidden |

想比较方案时，只读一个类别并选择最多两三项；有精确名称时，直接查询单项指南。

**[业务场景导航](example/docs/business/task-router.md)** · **[交互效果导航](example/docs/task-router.md)** · **[能力清单](example/docs/business/coverage.md)**

## 开始使用

需要 **Node.js 22.12 或更新版本**。在项目根目录执行：

```bash
# 首次准备依赖与组件资源
node scripts/example.mjs setup

# 打开本地示例
node scripts/example.mjs dev --port 5174
```

打开终端显示的地址即可。目录支持英文名称、中文意图和类别筛选，每项都有交互预览、用法源码与接入说明。

初次资源准备需要网络，文件按固定清单校验；中断后可以重新执行，已校验资源会复用。仅需某一项时可单独准备：

```bash
node scripts/example.mjs setup --component glass-surface
```

## 交给 Agent

从 **[SKILL.md](SKILL.md)** 开始。它首先区分业务行为与装饰效果，再定位当前任务需要的一项能力。

```bash
node scripts/find-component.mjs "AutoComplete" --provider business --exact
node scripts/find-component.mjs "排序分页" --provider business --limit 3
node scripts/find-component.mjs "Glass Surface" --provider effects --exact
```

查询结果会给出：适用场景、替代边界、先读哪份指南，以及必要的代码入口。

```text
Skill 入口
   ↓
业务场景 / 明确效果
   ↓
一个组件的用途与边界
   ↓
当前示例 → 必要共享符号 → 相关行为契约
```

可直接使用的任务提示：

```text
使用 Agent Wan UI 完成当前页面。
先按业务场景定位组件，只读命中项的指南和代码。
保持自然色霜玻璃规范，接入项目已有数据、权限与路由。
保留键盘操作、错误状态与恢复入口；装饰效果按需启用。
```

## 设计与接入

| 入口 | 在什么时候读取 |
| --- | --- |
| [核心视觉约束](example/docs/design-core.md) | 开始设计或改造一个页面时 |
| [视觉规范](AGENT_WAN_UI_SPEC.md) | 需要确认颜色、字体、材质与布局时 |
| [CSS API](CSS_API.md) | 需要复用样式与语义 Token 时 |
| [行为契约](COMPONENT_CONTRACTS.md) | 涉及表单、权限、异步、焦点与恢复时 |
| [Agent 交接入口](AGENT_HANDOFF.md) | 将任务交给另一位协作者时 |
| [示例维护说明](example/README.md) | 修改示例、场景数据或生成文档时 |

业务状态、接口与权限继续归属于目标项目。组件示例展示交互用法；文件选择、短命令和本地状态不会替代真实业务执行。

## 维护这个组件库

设计值以 `tokens.json` 为准。修改示例或场景数据后同步指南与入口：

```bash
node scripts/example.mjs docs
```

需要生产构建或查看构建结果时：

```bash
node scripts/example.mjs build
node scripts/example.mjs preview
```

只接入当前需要的实现和直接依赖。保留输入语义、焦点路径、空数据、错误与取消处理；减少运动时停用装饰过渡，必要的操作继续可用。

---

<div align="center">

**界面安静，交互清晰。**

</div>
