# Agent Wan Frost Glass UI Skill

Agent Wan 自然色霜玻璃 UI 的可复用 Skill、设计规范和 React 组件示例。当前包含 **215 个 React Bits 效果示例 + 88 个自有业务能力，共 303 个独立入口**。

从 [SKILL.md](SKILL.md) 开始。Agent 按具体业务场景定位组件，只读取命中的指南、示例和必要共享资源；普通业务能力与装饰效果分别选型，沿用目标项目的技术栈、权限、路由和数据契约。

## 内容

| 入口 | 用途 |
|---|---|
| [SKILL.md](SKILL.md) | Skill 触发、场景判断与渐进式读取规则 |
| [业务场景路由](examples/reactbits/docs/business/task-router.md) | 表单、数据、布局、弹层、导航、反馈、媒体与辅助能力 |
| [业务覆盖对照](examples/reactbits/docs/business/coverage.md) | 88 项能力的原有相邻示例与新增自有实现 |
| [效果路由](examples/reactbits/docs/task-router.md) | 按需选择 React Bits 文字、交互、组合组件、微交互与背景 |
| [示例工程说明](examples/reactbits/README.md) | 安装、运行、目录和维护方式 |
| [视觉规范](AGENT_WAN_UI_SPEC.md) | 自然色、材质、字体、布局与交互约束 |
| [组件行为契约](COMPONENT_CONTRACTS.md) | 业务状态、键盘、权限、异步与恢复边界 |
| [CSS API](CSS_API.md) | 主题样式与语义 Token 的接入 |
| [Agent 交接入口](AGENT_HANDOFF.md) | 可直接复用的任务提示与引用方式 |

新增业务示例由本项目使用 React、原生 HTML 和 CSS 独立实现。PrimeReact 仅作为功能目录参考，不需要安装其运行时；每项的适用场景、替代边界和实际用法以当前指南与源码为准。

## 运行示例

需要 Node.js **22.12 或更新版本**。

```bash
git clone https://github.com/lichong-a/artifact-template-agent-wan-frost-glass-ui-skill.git agent-wan-frost-glass-ui-skill
cd agent-wan-frost-glass-ui-skill/examples/reactbits
npm ci
npm run setup:reactbits
npm run dev
```

打开终端显示的本地地址。组件支持名称和中文意图查询，选中项在独立 iframe 中延迟加载；切换或暂停时释放预览。左侧原有 React Bits 保留原中文子标题，新增业务能力使用逐项细化的中文描述。

首次运行 setup 需要网络，它按固定清单获取上游源码、字体、模型与解码器，并校验 SHA-256。失败可有限重试或重新运行，已校验文件会复用。

## 给 Agent 按需使用

在仓库根目录运行：

```bash
node examples/reactbits/scripts/find-component.mjs "AutoComplete" --provider business --exact
node examples/reactbits/scripts/find-component.mjs "排序分页" --provider business --limit 3
node examples/reactbits/scripts/find-component.mjs "Glass Surface" --provider reactbits --exact
```

查询返回单项指南、源码位置、适用场景和替代边界。读取顺序为 **Skill 入口 → 业务或效果 → 单项指南 → 本例源码 → 必要共享符号与契约**，不把整个索引或全部组件送入上下文。

本仓库根目录可作为 Skill 目录使用，资源路径相对仓库根解析。是否被具体宿主发现或加载，以该宿主的实际安装与加载结果为准。

## 维护与验证

在 `examples/reactbits/` 中，修改自有示例或场景元数据后运行 `npm run docs:build`，同步指南、查询索引、懒加载入口、包根 Skill 与分发模板。生成文件通过对应脚本重建；设计值以 `tokens.json` 为准。

项目提供类型检查、覆盖检查、测试和生产构建命令，见示例说明。仓库保留的验证记录有各自范围与时间；文件齐全、类型或构建通过均不代表所有组件已经完成浏览器视觉和交互验收。

## 源码与资源边界

Git 保存自有代码、固定清单、文档、主题、原始参考图和来源说明。`node_modules/`、`.upstream/`、`dist/`、安装得到的字体、GLB 和 Draco 文件属于本地运行资源，首次使用由安装命令生成。

React Bits 来源与授权说明保存在 [notices](examples/reactbits/notices/)。原始上游源码与资源按锁定版本获取，本项目的集成适配在内存中执行。固定目录不承诺未来上游新增项自动存在。

可运行 `python3 scripts/package-ui-kit.py --output /path/to/agent-wan-ui.zip` 打包自有规范与示例，归档保持相同的资源边界。
