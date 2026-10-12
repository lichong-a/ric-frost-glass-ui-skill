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

### 14.6 React Bits 全量示例与按需引导

`examples/reactbits/` 接入指定 [React Bits 索引](https://reactbits.dev/get-started/index) 在 2026-10-12 的全部 **215 个组件身份**：文字动画 33、动画效果 41、组合组件 48、微交互 34、背景效果 59。统一采用 TypeScript + CSS，不把 JS / TS 与 CSS / Tailwind 四种语法变体重复计数。对应仓库提交固定为 `2139cb3098d4fedc6264f13e50dcb4694224ba7c`。

每个组件包含独立的 `src/demos/<slug>.tsx`、明确的 lazy import 以及 `docs/components/<slug>.md`。文档写明可观察的效果机制、真实 Props 用法、依赖、源文件、资源与验收要求。目录页支持英文名、中文意图与类别查询；选中项在独立 iframe 中运行，切换、暂停或离开预览区域会销毁旧实例。

```bash
cd examples/reactbits
npm ci
npm run setup:reactbits
npm run dev

# Agent 仅定位一个组件；不输出整个索引
node scripts/find-component.mjs "毛玻璃卡片" --limit 3
```

React Bits 的官方源码按其 [许可](https://github.com/DavidHDev/react-bits/blob/2139cb3098d4fedc6264f13e50dcb4694224ba7c/LICENSE.md) 从锁定提交安装到 `.upstream/`；本包保留自有示例、主题适配、来源清单、散列校验和授权文本。`.upstream/` 与包含官方实现的构建产物不随模板再次分发。首次运行需要获取依赖与官方资源，下载失败可重跑安装脚本并复用已校验文件。

颜色继续以 `tokens.json` 为唯一源。v1.1 增加 `palette.effectSage`、`palette.effectSand`、`palette.effectTerra` 三个低饱和效果色；`src/shared/palette.generated.ts` 由 Token 生成，供需要实际颜色字符串的 Canvas / WebGL 参数使用。深墨色背景仅用于需要暗底观察的局部效果舞台，不定义一套新的业务暗色主题。

系统减少运动时，演示先显示未挂载说明，用户可选择播放本次。这个说明不是逐效果静态重绘；生产页面需要按所选组件提供等价的静态内容或原生控制器。某项显示“已挂载”仅表示 React commit，不能据此判断 GPU 已出帧、图片已加载或交互已验收。实际检查记录见 `VALIDATION_REPORT.md`。

---

规范来源：[AGENT_WAN_UI_SPEC.md](../../../../AGENT_WAN_UI_SPEC.md)。本文件由主规范按章节生成；修改主规范后重新生成，不独立维护第二套规则。
