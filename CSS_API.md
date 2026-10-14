# Agent Ric CSS 接入与属性映射

本文件描述本包实际提供的 CSS API。业务组件的建议 TypeScript Props 可以适配现有项目，但需要明确映射到下列类名与属性。样式表不包含定位、焦点、权限、路由或网络请求行为。

## 1. 引入与作用域

直接使用时引入 `theme.css` 即可，它通过本地 `@import` 引入 `tokens.css`。打包项目可以改成在入口依次 import 两份文件并移除重复导入，保持 Token 在先。

```html
<html lang="zh-CN" class="aw-theme">
  <head><link rel="stylesheet" href="./theme.css"></head>
  <body class="aw-app-page">
    <div class="aw-canvas aw-canvas-layer" aria-hidden="true"></div>
    <div class="aw-app-shell">
      <header class="aw-topbar">…</header>
      <div class="aw-workspace">
        <aside class="aw-sidebar">…</aside>
        <main class="aw-main">…</main>
      </div>
    </div>
    <div id="overlay-root"></div>
  </body>
</html>
```

`aw-canvas` 只负责背景；独立的空背景 div 必须同时使用 `aw-canvas-layer` 才会固定铺满。样式文档页不使用 `aw-app-page`，即可保持正常文档滚动。

`aw-theme` 推荐挂在 html 上。减少透明度标记挂在**同一个元素**：`<html class="aw-theme" data-transparency="reduce">`。普通 DOM 继承不会让任意位置的 data 属性自动生效。

## 2. 常用样式 API

| 元素 | 基础 class | 属性 / 子元素 |
|---|---|---|
| 玻璃表面 | `aw-glass` | `data-material="frame\|popover\|dialog\|control\|table"`；未设置为 panel |
| 带内边距卡片 | `aw-panel` | 固定消费 panel 材料 |
| 页面主标题 | `aw-page-title` | 宋体、页面字号、窄屏字号 |
| 弹窗标题 | `aw-dialog-title` | 宋体 24 / 32 |
| 卡片标题 | `aw-component-title` | 无衬线 18 / 26 |
| 页面描述 | `aw-page-description` | 次要文字 |
| 说明文字 | `aw-caption` / `aw-muted` | 说明字号 / 辅助颜色 |
| 页面头 | `aw-page-heading` | 内部 `aw-page-title` 与 `aw-page-actions` |
| 顶栏 | `aw-topbar` | `aw-logo`、`aw-topbar-actions` |
| 顶栏入口 | `aw-button aw-topbar-trigger` | `aw-trigger-copy`、`aw-trigger-label` 为可压缩文字 |
| 主导航行 | `aw-nav-item` | 当前路由使用 `aria-current="page"`；文字 `aw-nav-label` |
| 窄屏导航抽屉 | `aw-sidebar` | `<1024` 时通过 `data-state="open"` 显示；开关、焦点、滚动与模态行为由应用管理 |
| 导航抽屉遮罩 | `aw-drawer-backdrop` | 仅在抽屉打开时挂载或显示；fixed、全视口；关闭事件由应用处理 |
| 工具栏 | `aw-toolbar` | `aw-toolbar-search`、`aw-toolbar-group` |
| 按钮 | `aw-button` | 默认 secondary；`data-variant` 见下表 |
| 单行输入 | `aw-input` | 原生 readonly / disabled，错误 `aria-invalid="true"` |
| 选择器外观 | `aw-select` | 可用于原生 select 或已实现行为的自定义控件 |
| 搜索容器 | `aw-search-field` | 直接子图标 `aw-icon`，直接子输入 `aw-input` |
| 字段布局 | `aw-field` | `aw-label`、`aw-input`、`aw-field-error` |
| 复选 / 单选 | `aw-check` / `aw-radio` | 原生 input；标签点击区 `aw-choice-label` |
| 开关 | `aw-switch` | `aria-checked` + `aw-switch-thumb`；触屏点击区见第 6 节 |
| 状态筛选 | `aw-segmented` | radio / aria-checked 或互斥按钮 / aria-pressed，选一种语义 |
| 标签页 | `aw-tabs` | `aw-tab`；当前 `aria-selected="true"` |
| 标签 | `aw-tag` | `data-tone="success\|warning\|danger\|info\|sand\|forbidden"`；默认 neutral |
| 计数 | `aw-tag aw-count` | 数值和完整名称由数据提供 |
| 数据面 | `aw-table-panel` | `aw-table-summary`、`aw-table-wrap`、`aw-table`、`aw-pagination` |
| 表格单元内容 | `aw-cell-title` / `aw-cell-description` / `aw-cell-number` | 名称 / 说明 / 数值 |
| 表格选中行 | `aw-table` 中的 tr | 默认样式状态用 `data-state="selected"`；不要给不支持该语义的普通表格强加 ARIA |
| 行操作 | `aw-row-actions` | 内部真实 button / a |
| 分页 | `aw-pagination` | `aw-pagination-items`，页按钮 `aria-current="page"` |
| 下拉浮层 | `aw-popover` | fixed；定位坐标、碰撞处理由行为层提供 |
| 菜单内容 | `aw-menu` | 内部 `aw-menu-item`；`aw-menu-separator`；`aw-menu-meta` |
| 弹窗 | `aw-dialog` | `aw-dialog-header/body/footer`；模态语义由原语完成 |
| 四向抽屉 | `aw-drawer` | `data-side="left\|right\|top\|bottom"`；焦点、遮罩和关闭由原语完成 |
| 模态遮罩 | `aw-dialog-backdrop` | 不是 `<dialog>` 的必需额外包装；原生 dialog 有 ::backdrop |
| 上传区 | `aw-upload-zone` | `data-state="dragging\|error"` |
| Toast | `aw-toast-stack` + `aw-toast` | `data-tone="success\|danger\|warning\|info"`；正文 `aw-toast-copy` |
| 角落 Notice | `aw-notice-stack` + `aw-notice` | `aw-notice-copy/title/description/actions`；关闭与计时由通知服务管理 |
| 空状态 | `aw-empty` | 可加图标、标题、说明和恢复入口 |
| 骨架 | `aw-skeleton` | `data-size="short\|icon"`；装饰元素 aria-hidden |

### 按钮映射

| 组件语义 | DOM 属性 |
|---|---|
| 默认 / 次按钮 | 无 data-variant，或 `data-variant="secondary"` |
| 主按钮 | `data-variant="primary"` |
| 文本操作 | `data-variant="ghost"` |
| 浅色危险边框 | `data-variant="danger-outline"` |
| 强危险确认 | `data-variant="danger"`，深陶土底配浅字 |
| 停用警告确认 | `data-variant="warning"`，浅沙金底配深字 |
| small | `data-size="sm"` |
| medium / default | 不设置 data-size |
| large | `data-size="lg"` |
| 纯图标 | `data-icon-only="true"`，同时给 aria-label |
| 持续加载 | `aria-busy="true"` 或 `data-state="loading"`，事件层阻止重复提交 |
| 禁用 | 原生 disabled；需要保留焦点时可用 aria-disabled 并阻止激活 |

组件 Props 中 `size="small"` 不会自动匹配 `data-size="sm"`，需要适配器完成映射。Toast 的业务 `kind="error"` 映射到样式 `data-tone="danger"`，不要遗漏。

## 3. 表格最小示例

```html
<section class="aw-table-panel" aria-labelledby="skills-count">
  <div class="aw-table-summary" id="skills-count">技能列表</div>
  <div class="aw-table-wrap">
    <table class="aw-table">
      <thead><tr><th scope="col">名称</th><th scope="col">状态</th></tr></thead>
      <tbody><tr><td class="aw-cell-title">示例技能</td><td><span class="aw-tag" data-tone="success">可用</span></td></tr></tbody>
    </table>
  </div>
</section>
```

标准完整八列表最小宽度为 1240 px；上面只示意结构。真实两列表应在明确的紧凑表格组件中覆盖 `--aw-table-min-width`，不要把八列表的宽度机械应用到所有表格。示例数据不等于真实加载结果。

## 4. 浮层属性

| 类型 | DOM 属性 | 基准宽度 |
|---|---|---:|
| 普通菜单 | `.aw-popover` | 240 px |
| 通用较宽面板 | `data-size="wide"` | 360 px |
| 待办 | `data-kind="todo"` | 420 px |
| 租户空间 | `data-kind="tenant"` | 360 px |
| 用户信息 | `data-kind="user"` | 320 px |
| 导入弹窗 | `.aw-dialog` | 520 px |
| 确认弹窗 | `.aw-dialog[data-kind="confirm"]` | 400 px |

菜单活动项使用 `data-highlighted="true"`，选择项按其语义使用 aria-selected / aria-checked，危险动作使用 `data-tone="danger"`。值必须由真实状态驱动，不能只添加一个绿色 class。

页面级浮层放在主滚动区外；模态内子浮层使用 `data-layer="modal"` 的样式层级，并挂到该模态的可访问与焦点上下文。原生 dialog top layer 仍需把其子浮层放在相应 dialog 内，数字 z-index 无法跨越 top layer 规则。

## 5. 导航和层级

桌面主动折叠由 `.aw-app-shell[data-navigation="collapsed"]` 控制。≥1280 时该状态缩为 72 px；1024–1279 默认图标栏；<1024 使用抽屉，不让折叠标记覆盖抽屉形态。导航标签隐藏后，原始按钮 / 链接必须仍有可访问名称。

背景层使用 z-index 0；app-shell 不建立会困住抽屉的额外 stacking context。需要作为浮层的抽屉与遮罩使用统一 overlay 管理，且不要置于带 filter、transform、opacity 或裁切的祖先下。打开抽屉或模态时关闭无关页面菜单。

z-index 的具体数值以 `tokens.json` 的 `semantic.z` 为准。不要只复制数值而忽略实际父子 stacking context。

## 6. 触屏点击范围

默认控件的视觉高度为 40 px，紧凑行操作为 32 px。在粗指针设备上，行为目标需要达到本项目 44 × 44 px 目标；CSS 对普通按钮、菜单项和输入提供对应最小尺寸。

小复选框和单选框放在真实关联的 `.aw-choice-label` 内，用标签提供足够的点击区域：

```html
<label class="aw-choice-label">
  <input type="checkbox" class="aw-check">
  <span>选择此技能</span>
</label>
```

不要仅给一个不响应点击的 div 留白就宣称点击区域达标。开关等小视觉控件的扩展区域也要能真正激活同一个操作，并预留空间避免相邻目标重叠；具体样式入口和结构以 `theme.css` 的触屏注释为准。

开关使用以下结构。`.aw-switch-target` 明确保留 44 × 44 px 布局空间；粗指针下按钮的透明伪元素将点击区扩到该包装边界。状态变化由行为层更新 `aria-checked`，不能只移动滑块：

```html
<span class="aw-switch-target">
  <button type="button" class="aw-switch" role="switch" aria-checked="false" aria-label="启用通知">
    <span class="aw-switch-thumb" aria-hidden="true"></span>
  </button>
</span>
```

## 7. 维护命令

```bash
node scripts/build-tokens.mjs
node scripts/validate-tokens.mjs
```

组件与样式统一在 [示例工程](example/README.md) 中查看。在项目根目录运行 `node scripts/example.mjs dev --port 5174`。修改 Token 后先重新生成 CSS；修改示例或文档元数据后运行 `node scripts/example.mjs docs`，同步单项指南与 Skill 入口。

## 8. 统一滚动条

引入 `theme.css` 并使滚动区域位于 `.aw-theme` 范围内即可。样式入口同时覆盖主题根的视口滚动条，以及目录、表格、代码、输入和弹层正文的原生滚动条；不额外设置 overflow 或固定高度。

| Token | 用途 |
|---|---|
| `--aw-scrollbar-thumb` / `--aw-scrollbar-track` | 标准属性的滑块与轨道颜色 |
| `--aw-scrollbar-size` | 兼容实现的宽度 / 高度 8 px |
| `--aw-scrollbar-thumb-hover` | 兼容实现的滑块悬停色 |
| `--aw-scrollbar-min-thumb-size` / `--aw-scrollbar-radius` | 兼容实现的最小滑块长度与圆角 |
| `--aw-scrollbar-touch-size` | 粗指针下的兼容宽度 12 px |

标准 `scrollbar-width: thin` 的实际宽度由浏览器决定；标准颜色生效时不叠加伪元素皮肤。粗指针恢复默认宽度，强制颜色使用系统颜色。项目应修改 Token 后生成 CSS，不在每个列表里重复定义滚动条。可按需要为独立滚动容器加 `scrollbar-gutter: stable`、键盘焦点和可访问名称。

## 9. 弹窗、抽屉与角落通知

| 场景 | 外观入口 | 尺寸 / 位置 |
|---|---|---|
| 说明、短表单与导入 | `aw-dialog` | 默认 520 px |
| 操作确认 | `aw-dialog[data-kind="confirm"]` | 400 px |
| 详情、较宽表单与步骤 | `aw-dialog[data-size="wide"]` | 720 px，受视口边距限制 |
| 媒体或全屏任务 | `aw-dialog[data-size="fullscreen"]` | 视口减两侧 16 px 边距 |
| 左右抽屉 | `aw-drawer[data-side="left\|right"]` | 默认 420 px，高度为可用视口 |
| 上下抽屉 | `aw-drawer[data-side="top\|bottom"]` | 全宽，按内容增长，最大 70dvh |
| 短结果 Toast | `aw-toast-stack` 中的 `aw-toast` | 400 px；默认桌面右上、窄屏右下 |
| 含标题、说明和操作的 Notice | `aw-notice-stack` 中的 `aw-notice` | 420 px；同一位置与安全区规则 |

通知栈的 `data-placement` 使用 `top-start`、`top-end`、`bottom-start`、`bottom-end`，LTR 分别对应左上、右上、左下、右下，RTL 镜像。顶部栈向下、底部栈向上扩展；窄屏顶部位置统一转到底部同侧。卡片使用 `data-tone="success|danger|warning|info"`；`kind="error"` 仍需映射为 `danger`。

```html
<div class="aw-notice-stack" data-placement="bottom-end">
  <section class="aw-notice" data-tone="info" aria-labelledby="task-notice-title">
    <div class="aw-notice-copy">
      <h2 class="aw-notice-title" id="task-notice-title">任务结果待查看</h2>
      <p class="aw-notice-description">这里展示业务层提供的真实任务说明。</p>
      <div class="aw-notice-actions"><button class="aw-button" type="button">查看结果</button></div>
    </div>
    <button class="aw-button" type="button" data-icon-only="true" aria-label="关闭任务结果通知">×</button>
  </section>
</div>
```

这段是结构与外观示例，按钮需要真实事件与状态。模态 / 非模态、遮罩点击、Escape、焦点、未保存内容、通知队列和暂停计时由交互层实现，分别按主规范第 11、12 节和组件契约第 15、17、19 节读取。类型或属性只表达已实现的行为，不以 CSS 类名代替模态原语或后台成功结果。
