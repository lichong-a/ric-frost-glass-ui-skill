# GPU 预览与指针默认配置修正

本轮以 `2fd26ab` 为基线，处理 Aero Shards、Shape Waves、Color Bends、Pixel Blast 四项预览和两个指针组件的默认配置。冻结上游实现与依赖版本保持原样。

| 示例 | 当前行为与配置 |
|---|---|
| Aero Shards | 检查 WebGPU 适配器，支持时运行锁定实现；无接口、无适配器、检查超时或原版初始化失败时进入带有“兼容预览”标记的 Canvas 2D 碎片风场。支持移动拨动、点击波纹、按住聚拢与暂停。 |
| Shape Waves | 同样选择 WebGPU 原版或 Canvas 2D 兼容路径；保留三种形状、文字遮罩、变化波面、指针与点击响应、入场及暂停。 |
| Color Bends | `warpStrength=1`、`frequency=1`、`iterations=1`，恢复可见的弯曲色带；使用粉、紫、青配色，`intensity=1.5`、`speed=0.2`。 |
| Pixel Blast | 使用更清晰的紫色像素，`pixelSize=5`、`patternDensity=1.35`、`edgeFade=0.15`、`speed=0.5`、`rippleIntensityScale=1.5`。默认关闭可选液体后处理，直接渲染像素与点击波纹；液体开关在常用 DIY 参数中展示。 |
| Swarm Cursor | 本例 `size` 默认从 `12` 改为 `3px`。 |
| Pixel Trail | 本例 `trailSize` 默认从 `0.16` 改为 `0.04`。 |

四个背景示例使用各自的 CSS Module，占满实际 iframe 视口。兼容处理属于这两个演示，目录将其最低图形要求记录为无需 GPU；其余组件的 GPU 检查继续由原运行时执行。没有修改全局浏览器接口或共享组件动画样式。

兼容渲染是实际动画，不是原版 WebGPU 材质的逐像素复刻。Aero Shards 降低碎片数量，并简化材质、光晕及路径；Shape Waves 使用 CPU 空间波场，其噪声与光晕不同。需要原版外观时应使用能创建 WebGPU 适配器和设备的浏览器。接入指南已逐项写明这些差异。

参数模板、API 用法、默认定义、DIY 面板与生成文档已经同步。上游默认值仍来自冻结源码，以上只改变本例配置；常规重新生成会保留这轮配置和私有样式。

## 验证范围

- `npm run test`：当前整体 93 项通过，包括 8 项兼容路径回归；覆盖无接口、空适配器、请求异常与超时、时间推进、图形与指针变化、暂停、RAF/观察器/事件/指针捕获清理。
- `npm run check:types`、`npm run check:parameters`：303 项示例与当前用法，0 diagnostics；4358 个字段有效、3945 个属性控件映射真实 API、110 个受控状态同步契约保留。
- `npm run docs:build`、`npm run check:coverage`：303 份指南、215 个锁定组件与 88 个业务示例通过，13 个用途分类保持完整。
- `npm run build`：成功；215 个上游组件、421 个冻结文件完整性校验通过。大型异步图形 chunk 的提醒保留。
- 独立原生 Canvas 2D 验证：使用与示例相同的兼容绘制函数和默认配置，验证运动、按住后的变化、暂停静止及资源清理。文字测试将本机 DejaVu Sans 注册为原生测试进程的 system-ui。
- 独立原生 OpenGL ES 验证：直接编译锁定的 Color Bends 与 Pixel Blast 片段着色器，比较旧配置、当前配置、时间变化和 Pixel Blast 点击波纹；覆盖首次时间与多个随机初始时间。此检查不包含浏览器 DOM 或可选液体后处理。
- 实际浏览器复测未执行：浏览器工具的 URL 安全策略拒绝了本地页面访问。原生绘图记录及截图是独立渲染证据，不能作为浏览器截图使用；上一轮 303 项浏览器报告对应本轮修改前的实现。

本轮浏览器内仍需复测 WebGPU 原版初始化、自动切换、减少动效及 DIY 后处理。示例服务使用原有 `5174` 端口，刷新后读取当前默认配置。

后续 19 项业务组件样式、交互与参数联动修复见 [业务组件整合说明](business/component-polish.md)。
