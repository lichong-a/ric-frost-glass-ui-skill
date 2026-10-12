# Agent Wan CSS 接入与属性映射

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
| 模态遮罩 | `aw-dialog-backdrop` | 不是 `<dialog>` 的必需额外包装；原生 dialog 有 ::backdrop |
| 上传区 | `aw-upload-zone` | `data-state="dragging\|error"` |
| Toast | `aw-toast-stack` + `aw-toast` | `data-tone="success\|danger\|warning"`；正文 `aw-toast-copy` |
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
