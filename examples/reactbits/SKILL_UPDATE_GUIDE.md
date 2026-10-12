# Agent Wan 技能更新与使用

## 本次更新

保留技能名 `artifact-template-agent-wan-frost-glass-ui`、显示名 `Agent Wan Frost Glass UI`、模板类别与四张原始图。保留 React Bits 的 215 项效果示例，并补充 88 项自有业务能力与按场景逐层读取的入口。新增项使用既有 React 和原生 HTML；不用安装 PrimeReact。

新的默认读取顺序：

1. `SKILL.md`：短入口，确认当前任务和文件边界。
2. `references/reactbits/design-core.md`：核心视觉约束。
3. 先判断业务或效果。普通业务查 `references/reactbits/business/task-router.md`，使用 `--provider business`；明确装饰效果使用 `--provider reactbits`。
4. 业务只读 `references/reactbits/business/components/<id>.md` 的适用场景、替代边界和当前用法；效果只读 `references/reactbits/components/<slug>.md`。需要比较时先读最多2–3项。
5. 根据该文档读取自有演示、实际 Props、CSS 与安装后的官方源码。

普通业务页面需要的 AppShell、表格、菜单、输入和异步行为，继续使用原始规范；通过 `references/reactbits/spec/` 和 `references/reactbits/contracts/` 分片读取，不再要求先读完整主规范与全部契约。

## 按名称使用

```text
使用 Agent Wan Frost Glass UI。
为当前页面接入 Glass Surface 和 Split Text。
通过精确检索读取这两个组件的文档、示例和必要源码；
保留现有业务状态，用 Agent Wan 皮肤统一配色与阅读面。
```

## 按中文意图使用

```text
使用 Agent Wan Frost Glass UI。
给聊天页面增加可折叠的公开步骤摘要、工具调用状态和底部输入框。
先按中文意图定位对应 Micro 组件，比较需要的少量候选；
状态和计时来自已有业务数据，不编造模型内部推理或工具结果。
```

## 只读取所需官方源码

进入技能中的 `assets/ui-kit/examples/reactbits/`，可以按单个 slug 执行 setup。首次运行完整示例库时执行全量安装，再启动开发服务器。已安装的官方源码位于 `.upstream/`，不需要把整个目录发送到 Agent 上下文。

## 后续升级目录

上游新增组件时，先重新确认用户指定目录与固定提交，再更新清单；不要仅按宣传数字增大总数。新增项至少补齐真实自有演示、加载入口、中文意图、单组件文档和所需资源；修改项按相同版本校验 Props、状态、依赖与效果机制。

更新视觉数值时先修改主 Token 与规范，再生成 CSS 和读取分片。更新示例 Props 后重新生成单组件文档，避免示例与文档出现两套参数。源码安装仍使用明确固定的提交和散列，不能静默切到 latest。

## 已有项目接入

可以在项目自己的规范入口追加对本技能或规范包的引用，不覆盖原有 `AGENTS.md`。只复制当前项目需要的组件与共享依赖；保持现有路由、权限和状态管理。

任务完成后分别说明实际实现、构建、交互、视觉检查与未验证范围。保存新的技能资源不等于已经修改用户现有网站；安装模板或发布站点的实际状态以本次交付结果为准。

## 包内入口与重建

规范包根目录现在也包含可直接读取的 `SKILL.md`。`npm run docs:build` 会同时更新包内入口与分发模板所需文档，不修改用户级安装目录。业务元数据只维护 `catalog/business-catalog.json`，源代码只维护对应自有示例；生成输出不作为第二套事实源。
