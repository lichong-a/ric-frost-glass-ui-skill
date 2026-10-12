# Agent Wan Skill 维护与使用

本包包含 303 个独立示例：88 个业务基础能力与 215 个交互效果。Skill 名称、设计值和四张视觉基准图保持稳定，按实际场景逐层读取资料。

## 默认读取顺序

1. 从 `SKILL.md` 确认目标任务、技术栈和文件边界。
2. 读取核心视觉约束，确认自然色霜玻璃规范。
3. 输入、选择、数据、导航与反馈先查业务路由，使用 `--provider business`；明确需要装饰效果时使用 `--provider effects`。
4. 只读命中项的适用场景、替代边界和当前用法。需要比较时先读同类 2–3 项。
5. 实际示例 → 本例使用的共享符号与样式 → 任务涉及的行为契约。

已有明确名称时，直接从项目根查询：

```bash
node scripts/find-component.mjs "AutoComplete" --provider business --exact
node scripts/find-component.mjs "Glass Surface" --provider effects --exact
```

只有业务目标时，用中文场景检索：

```bash
node scripts/find-component.mjs "排序分页" --provider business --limit 3
node scripts/find-component.mjs "思考过程" --provider effects --limit 3
```

## 任务提示词

```text
使用 Agent Wan Frost Glass UI 完成当前页面。
先按英文名称或中文场景定位组件，读取用途与优先替代边界。
只加载当前指南、实际示例及必要依赖，保持已有数据、权限与路由。
界面沿用自然色霜玻璃规范，状态和回调连接真实业务。
保留键盘、错误与取消入口；装饰效果按需启用。
```

## 只准备当前资源

在项目根执行单项准备命令，不将完整实现缓存放入 Agent 上下文：

```bash
node scripts/example.mjs setup --component glass-surface
```

首次运行整个示例库时执行不带组件参数的全量准备，然后启动开发服务器。资源按固定版本与散列校验；不得静默切换版本或忽略校验失败。

## 更新能力与指南

新增能力先完成可操作的实现，再补中文子标题、适用场景、替代边界、加载入口和必要资源。业务元数据维护在 `catalog/business-catalog.json`，业务实现维护在对应 demo；效果资源与参数分别按固定清单和配方维护。

修改后从项目根执行 `node scripts/example.mjs docs`，同步路由、单项指南、检索索引、Skill 与交接入口。生成结果不独立维护第二套规则。视觉修改先更新 Token 与主规范，再生成 CSS 与规范分片。

## 接入已有项目

可以在已有 `AGENTS.md` 追加简短 Skill 入口，保留原项目约束。只复制当前需要的实现和直接依赖，保持现有状态、路由与权限；行为契约按章节读取。

交付时说明实际修改、运行方法与执行过的检查，区分构建、挂载、视觉和业务结果。保存 Skill 资源或创建示例不等于已经接入用户的真实业务服务。
