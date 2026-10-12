# 上游 TypeScript 兼容说明

本项目通过 `npm run check:types` 检查全部 **215 个示例模块和应用代码**。该命令在 TypeScript 的内存读取层应用下列 **5 条明确、可审查的类型兼容规则**；在当前锁定的依赖版本下，检查结果为 **0 条诊断**。

这不表示未经处理的官方源码可以直接得到零诊断。使用当前工程配置直接运行原始 `tsc --noEmit` 时，官方源码会产生 **13 条类型诊断**。适配规则解决这些诊断，不过滤诊断、不使用 `@ts-ignore`，也不放宽示例的实际组件 Props 检查。

## 版本与作用范围

- 官方仓库：<https://github.com/DavidHDev/react-bits>
- 固定提交：`2139cb3098d4fedc6264f13e50dcb4694224ba7c`
- 组件来源：`src/ts-default` 的 TypeScript + CSS 变体。
- 本次检查环境：TypeScript `5.9.2`、React `19.1.1`、`@types/react` `19.1.13`、`@types/node` `24.19.2`。
- 原始源文件与 SHA-256：`catalog/upstream-manifest.json`。
- 适配实现：`scripts/adapt-upstream-types.mjs`。
- 检查入口：`scripts/check-types.mjs`。

规则只匹配 `.upstream` 中的五个指定 TSX 文件。官方文件保留安装时的原始字节，适配只发生在 TypeScript CompilerHost 和 Vite 转换输入的内存副本中。升级提交或更换源文件时，如果预期文本没有恰好出现一次，适配会立即报错；不能静默沿用旧规则。

## 五条规则与十三条诊断

| 官方组件 | 原始诊断数 | 原因 | 内存中的类型修正 |
| --- | ---: | --- | --- |
| TargetCursor | 1 | 当前 `strictNullChecks: false` 配置下，引用对象与 DOM 元素的条件表达式没有被充分收窄。 | 保留已有 `current` 属性判断，为元素分支补充 `HTMLElement \| null` 类型断言。 |
| AnimatedList | 1 | `AnimatedListItem` 的对象/字符串分支未被充分收窄，字符串分支仍被视作整个联合类型。 | 保留原有对象判断，将另一个分支的 `title` 声明为 `string`。公开的条目联合类型和示例 Props 不变。 |
| GlassSurface | 8 | 已有 `!art.failed` 条件排除了失败的图形结果，但当前配置未收窄 `box`、`glow`、`line` 属性。 | 为成功分支补充 `Exclude<ShapeArt, { failed: true }>` 类型断言，保留原有失败检查。 |
| Shuffle | 2 | React 19 的类型不再提供组件使用的全局 `JSX` 命名空间，随后触发 `createElement` 重载错误。 | 将 `keyof JSX.IntrinsicElements` 改为 `keyof React.JSX.IntrinsicElements`。已有 React 导入不变。 |
| SplitFlapText | 1 | Node 构建工具类型进入同一工程后，未限定的 `ReturnType<typeof setTimeout>` 对应 Node 的 `Timeout`，而实现实际调用 `window.setTimeout` 并返回数值。 | 将浏览器计时器引用明确为 `number \| null`。实际计时器调用、清理和动画逻辑不变。 |
| **合计** | **13** |  |  |

最初未安装 Node 类型时，前四个组件产生 12 条诊断；补齐 Vite 配置所需的 Node 类型后，SplitFlapText 的计时器诊断出现，因此最终记录为 13 条。

## 已完成的验证

在完成最后的示例、按钮语义和 GlassSurface 回退说明修改后，执行了完整工程检查：

```text
TypeScript checked 215 demonstration modules and the application: 0 diagnostics.
5 explicit type compatibility rules apply in memory; upstream source files remain unchanged.
```

另外对五条规则执行了以下定向核验：

1. 使用 TypeScript `transpileModule` 分别编译适配前后的 TSX，五个组件的 JavaScript 输出逐字节一致。因此这些规则没有改变执行逻辑。
2. 五个官方源文件的 SHA-256 仍与锁定清单一致。
3. 人为移除各规则的匹配文本后，五条规则均按预期报告上下文漂移。

这些结果证明类型兼容范围、原始源码完整性和示例的类型契约；不代替浏览器中的视觉或交互验证。WebGL、WebGPU、摄像头、字体和资源加载的运行条件仍由各组件说明及预览运行时处理。

## 复现与维护

```bash
npm ci --ignore-scripts
npm run setup:reactbits
npm run check:types
npm run build
```

`npm run check:types` 会检查应用、所有示例以及所导入的组件实现，并输出真实的全部 TypeScript 诊断。后续修改示例 Props、组件数据或依赖后，应继续运行该入口。Vite 使用同一类型适配函数，避免构建输入与检查输入之间出现另一套类型修正。

升级上游提交时，应先重新锁定源文件和资源散列，再逐条复核本表；上游已经修复的规则应删除，不应通过扩大匹配、忽略错误或修改原始文件来维持通过状态。
