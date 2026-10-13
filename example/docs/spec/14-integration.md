# 14. 前端工程接入

### 14.1 Token 管理

`tokens.json` 使用包内定义的三组结构：`primitives` 基础值、`semantic` 语义值、`component` 组件别名。它是本项目自定义格式，不声明兼容任意第三方 Token 标准。引用在统一路径空间中解析，例如 `{palette.canvas}`、`{color.text.primary}`；生成 CSS 时略过三组顶层名，将路径转为 `--aw-` 开头的变量。

```bash
node scripts/build-tokens.mjs
node scripts/validate-tokens.mjs
```

脚本不需要依赖安装。生成器负责验证缺失引用、循环和名字冲突；样式修改必须先改 Token 再生成。不要手工修改 `tokens.css`。`theme.css` 是消费层，可按项目封装组件；新增视觉值必须解释适用范围，不能为单个页面重复造颜色。

### 14.2 引入方式

```html
<!-- theme.css 通过本地 @import 引入 tokens.css。 -->
<link rel="stylesheet" href="./theme.css">
```

在 React / Vue / 原生项目中也保持 Token 在先、主题在后。若构建工具需要在入口显式 import 两份文件，移除 theme.css 中重复的 @import。把 `aw-theme` 放在能覆盖页面与 overlay 的根上；如果只挂在局部业务容器，Portal 到 body 的浮层可能无法继承主题。

优先使用原有组件库的无障碍行为，再通过类名、变量或 theme adapter 替换外观。不得直接套用组件库默认的蓝色 primary、默认小圆角或实心灰背景。类名不是行为承诺：仅套 `aw-dialog` 不会自动完成焦点锁定；仅套 `aw-menu` 也不会自动完成方向键操作。

### 14.3 推荐拆分

| 层 | 内容 | 边界 |
|---|---|---|
| Design tokens | 色彩、间距、半径、模糊、阴影、层级、动效 | 不包含业务文案和权限 |
| Primitives | Button、Input、Tag、Surface、IconButton | 可复用外观与基础语义 |
| Patterns | Select、Menu、Dialog、DataTable、Pagination | 键盘、焦点、定位、选择行为 |
| Product components | TodoPopover、TenantSwitcher、SkillImportDialog | 数据、权限、状态机 |
| Screens | SkillsPage、ToolsPage、LogsPage 等 | 组合组件，不重复定义主题 |

这里的名称表达职责，不要求建立这些英文目录。已有架构合理时沿用已有结构。

### 14.4 框架适配注意事项

- React / Vue：交互组件支持受控值和事件；唯一键使用实体 ID。不要因换主题重建业务状态。
- 使用 Tailwind：将本包变量映射到项目配置或公共类；禁止每页堆不同的任意值。断点由 Token 生成或在公共样式集中定义，不能直接把 CSS `var()` 放进普通媒体查询条件。
- 使用现有组件库：优先其 Slot / class / theme API，集中维护一个适配层；避免到处覆盖内部 DOM 选择器。
- SSR：在首屏确定主题与密度，保持服务端和客户端标记一致，减少首帧跳变。
- 遮罩和嵌套浮层：通过同一 overlay 管理栈决定关闭顺序、返回焦点和可见区域；不要随机追加 z-index。
- 背景和 Logo：原始参考图只用于对照；正文、图标、行数据、按钮必须真实渲染。

### 14.5 最小可复用示例

```html
<!-- 使用前核对 theme.css 的类和 data-variant 定义；行为交由目标项目实现。 -->
<section aria-labelledby="skills-heading">
  <div class="aw-page-heading">
    <div>
      <h1 class="aw-page-title" id="skills-heading">技能与工具</h1>
      <p class="aw-page-description">管理可用技能、版本来源与扫描结果</p>
    </div>
    <div class="aw-page-actions">
      <button type="button" class="aw-button" data-variant="secondary">AI 创建 Skill</button>
      <button type="button" class="aw-button" data-variant="primary">导入 Skill</button>
    </div>
  </div>
  <!-- 工具栏、数量标题、真实 table、分页依规范组装。 -->
</section>
```

这是结构和样式接入示例，不把点击按钮后的业务结果伪装成已完成。完整组件行为以组件契约为准。

### 14.6 组件示例与按需引导

示例库包含 **303 个独立入口**：215 个交互效果与 88 个业务基础能力。上游来源统计为文字动画 33、动画效果 41、组合组件 48、微交互 34、背景效果 59；这些是来源标签，不是当前用途分类。全部组件共用 13 个用途分类，按业务目标选择并逐项读取。每个身份计为一项，不重复统计语言或样式变体。

效果示例使用 `example/src/demos/<用途>/<slug>.tsx` 与 `example/docs/components/<slug>.md`；业务示例使用 `example/src/business/demos/<用途>/<id>.tsx` 与 `example/docs/business/components/<id>.md`。实际路径来自用途目录元数据和查询结果，不按组件名称猜测目录。各项都有明确的 lazy import，文档写明真实 Props、依赖、资源与验收要求。目录页支持英文名、中文意图与主用途查询；来源标签可另行过滤。选中项在独立 iframe 中运行，切换、暂停或离开预览区域会销毁旧实例。

```bash
node scripts/example.mjs setup
node scripts/example.mjs dev

# Agent 仅定位一个组件；不输出整个索引
node scripts/find-component.mjs "毛玻璃卡片" --limit 3
```

需要额外资源的效果按固定清单准备到本地缓存；本包保留独立示例、主题、安装清单、散列校验和必要声明。安装缓存与包含额外实现的构建产物不随模板再次分发。首次运行需要获取依赖与资源，下载失败可重跑准备命令并复用已校验文件。详细安装与校验记录在示例目录维护，页面文案不展示外部目录或仓库入口。

颜色继续以 `tokens.json` 为唯一源。v1.1 增加 `palette.effectSage`、`palette.effectSand`、`palette.effectTerra` 三个低饱和效果色；`src/shared/palette.generated.ts` 由 Token 生成，供需要实际颜色字符串的 Canvas / WebGL 参数使用。深墨色背景仅用于需要暗底观察的局部效果舞台，不定义一套新的业务暗色主题。

系统减少运动时，演示先显示未挂载说明，用户可选择播放本次。这个说明不是逐效果静态重绘；生产页面需要按所选组件提供等价的静态内容或原生控制器。默认的“已挂载”仅表示 React commit；自行管理状态的 WebGPU 示例等待首帧标记，并在失败时保留恢复入口。两种状态都不代替图片、视觉和交互验收。历史规范包检查见 `VALIDATION_REPORT.md`，当前结果以本轮实际执行的维护检查为准。

---

规范来源：[AGENT_WAN_UI_SPEC.md](../../../AGENT_WAN_UI_SPEC.md)。本文件由主规范按章节生成；修改主规范后重新生成，不独立维护第二套规则。
