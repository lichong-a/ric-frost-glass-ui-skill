# React Bits 还原与全库参数交付

本轮保持自然色霜玻璃外壳，恢复 24 项演示的布局、对比度、素材和触发机制。每项使用自己的 CSS Module；共享文件中具体上游菜单的覆盖已移除。核心效果仍由锁定的 215 项上游实现提供，版本为 `2139cb3098d4fedc6264f13e50dcb4694224ba7c`。

以下浏览器验收记录来自 `2fd26ab` 及此前的还原工作。之后四项 GPU 预览和两个指针默认值的修改、独立绘图验证与浏览器复测限制见 [GPU 预览修正](gpu-preview-fixes.md)；各项链接中的参数定义反映当前配置。

## 24 项示例与配置

| 组件 | 参照 | 参数 | 源码 |
|---|---|---|---|
| Scroll Float | [官方参照](https://reactbits.dev/text-animations/scroll-float) | [参数与当前默认配置](../src/parameters/definitions/scroll-float.json) | [独立示例](../src/demos/scroll/scroll-float.tsx) |
| Scroll Velocity | [官方参照](https://reactbits.dev/text-animations/scroll-velocity) | [参数与当前默认配置](../src/parameters/definitions/scroll-velocity.json) | [独立示例](../src/demos/scroll/scroll-velocity.tsx) |
| Scroll Reveal | [官方参照](https://reactbits.dev/text-animations/scroll-reveal) | [参数与当前默认配置](../src/parameters/definitions/scroll-reveal.json) | [独立示例](../src/demos/scroll/scroll-reveal.tsx) |
| Scrambled Text | [官方参照](https://reactbits.dev/text-animations/scrambled-text) | [参数与当前默认配置](../src/parameters/definitions/scrambled-text.json) | [独立示例](../src/demos/text/scrambled-text.tsx) |
| Rotating Text | [官方参照](https://reactbits.dev/text-animations/rotating-text) | [参数与当前默认配置](../src/parameters/definitions/rotating-text.json) | [独立示例](../src/demos/text/rotating-text.tsx) |
| Glitch Text | [官方参照](https://reactbits.dev/text-animations/glitch-text) | [参数与当前默认配置](../src/parameters/definitions/glitch-text.json) | [独立示例](../src/demos/text/glitch-text.tsx) |
| Dither Veil | [官方参照](https://reactbits.dev/animations/dither-veil) | [参数与当前默认配置](../src/parameters/definitions/dither-veil.json) | [独立示例](../src/demos/background/dither-veil.tsx) |
| Swarm Cursor | [官方参照](https://reactbits.dev/animations/swarm-cursor) | [参数与当前默认配置](../src/parameters/definitions/swarm-cursor.json) | [独立示例](../src/demos/pointer/swarm-cursor.tsx) |
| Halftone Reveal | [官方参照](https://reactbits.dev/animations/halftone-reveal) | [参数与当前默认配置](../src/parameters/definitions/halftone-reveal.json) | [独立示例](../src/demos/scroll/halftone-reveal.tsx) |
| Electric Border | [官方参照](https://reactbits.dev/animations/electric-border) | [参数与当前默认配置](../src/parameters/definitions/electric-border.json) | [独立示例](../src/demos/cards/electric-border.tsx) |
| Logo Loop | [官方参照](https://reactbits.dev/animations/logo-loop) | [参数与当前默认配置](../src/parameters/definitions/logo-loop.json) | [独立示例](../src/demos/media/logo-loop.tsx) |
| Pixel Trail | [官方参照](https://reactbits.dev/animations/pixel-trail) | [参数与当前默认配置](../src/parameters/definitions/pixel-trail.json) | [独立示例](../src/demos/pointer/pixel-trail.tsx) |
| Cubes | [官方参照](https://reactbits.dev/animations/cubes) | [参数与当前默认配置](../src/parameters/definitions/cubes.json) | [独立示例](../src/demos/background/cubes.tsx) |
| Bubble Menu | [官方参照](https://reactbits.dev/components/bubble-menu) | [参数与当前默认配置](../src/parameters/definitions/bubble-menu.json) | [独立示例](../src/demos/navigation/bubble-menu.tsx) |
| Masonry | [官方参照](https://reactbits.dev/components/masonry) | [参数与当前默认配置](../src/parameters/definitions/masonry.json) | [独立示例](../src/demos/media/masonry.tsx) |
| Staggered Menu | [官方参照](https://reactbits.dev/components/staggered-menu) | [参数与当前默认配置](../src/parameters/definitions/staggered-menu.json) | [独立示例](../src/demos/navigation/staggered-menu.tsx) |
| Spotlight Card | [官方参照](https://reactbits.dev/components/spotlight-card) | [参数与当前默认配置](../src/parameters/definitions/spotlight-card.json) | [独立示例](../src/demos/cards/spotlight-card.tsx) |
| Flying Posters | [官方参照](https://reactbits.dev/components/flying-posters) | [参数与当前默认配置](../src/parameters/definitions/flying-posters.json) | [独立示例](../src/demos/media/flying-posters.tsx) |
| Decay Card | [官方参照](https://reactbits.dev/components/decay-card) | [参数与当前默认配置](../src/parameters/definitions/decay-card.json) | [独立示例](../src/demos/cards/decay-card.tsx) |
| Flowing Menu | [官方参照](https://reactbits.dev/components/flowing-menu) | [参数与当前默认配置](../src/parameters/definitions/flowing-menu.json) | [独立示例](../src/demos/navigation/flowing-menu.tsx) |
| Magic Rings | [官方参照](https://reactbits.dev/animations/magic-rings) | [参数与当前默认配置](../src/parameters/definitions/magic-rings.json) | [独立示例](../src/demos/background/magic-rings.tsx) |
| Laser Flow | [官方参照](https://reactbits.dev/animations/laser-flow) | [参数与当前默认配置](../src/parameters/definitions/laser-flow.json) | [独立示例](../src/demos/background/laser-flow.tsx) |
| Ghost Cursor | [官方参照](https://reactbits.dev/animations/ghost-cursor) | [参数与当前默认配置](../src/parameters/definitions/ghost-cursor.json) | [独立示例](../src/demos/pointer/ghost-cursor.tsx) |
| Gradual Blur | [官方参照](https://reactbits.dev/animations/gradual-blur) | [参数与当前默认配置](../src/parameters/definitions/gradual-blur.json) | [独立示例](../src/demos/scroll/gradual-blur.tsx) |

三个滚动文字示例使用实际内部视口高度作为完整引导屏；动画正文从第二屏开始进入。支持原生滚轮、键盘启动、逆向滚动和重播。Electric Border 使用 22px 标题、14px 正文，speed=1、chaos=0.12；Cubes 的 gap=0.18 为单元比例。Masonry、Flowing Menu、Gradual Blur 使用完整展示宽度；Staggered Menu 的关闭面板移出且不会泄漏；Flying Posters 有明确的滚轮／拖拽提示。

[Dither、Halftone 等原创纹理与 Logo 的来源说明](../src/assets/restoration/README.md)记录来源和许可。纹理图包含真实加载失败及重试；旧 scene SVG 增加固有尺寸后，六项 WebGL 图片演示的上传警告已消失。

## 参数与分类

303 项均有真实 API 记录、默认配置与可复制的 TSX 用法。提取了 4304 个主 API 属性；编辑器含 4348 个字段，其中 3939 个属性控件映射到实际 API，106 个状态通过实际组件回调同步，303 项宿主高度单独列出。数字范围属于演示编辑器，类型和源码默认值保持独立。回调、ref、ReactNode 使用真实代码，不序列化成函数字符串。

参数面板位于预览下方，常用参数展开，高级参数折叠；无效数字、JSON 或未知本地素材保留最后有效预览。重建参数在结束调节后应用。可复制源码随当前配置更新，完整源码仍可读取；同页切换保留修改，刷新恢复默认。

[目录元数据](../catalog/use-categories.json)是 303 项唯一主分类的来源，生成 13 个用途类别、导航、路径、加载器和检索索引。原组件 ID、hash 链接、来源标签继续可用；各种轮播与媒体能力放在同类，两个 Carousel 带有明确来源名。

## 验证记录

- `npm run test`：63 项通过。
- `npm run check:types`：303 项及应用，0 diagnostics。
- `npm run check:parameters`：303 份定义与默认用法，0 diagnostics；字段及默认值有效，重复生成一致。
- `npm run check:coverage`：215 项官方导入、实际渲染和独立懒加载要求保留；88 项业务覆盖通过。Slide Commit 的辅助勾选使用隔离的业务 SpringCheckbox。
- `npm run docs:build`：303 项具有完整 API、本例配置、容器设置与实际用法。
- `npm run build`、`npm run check:build`：303 个真实示例、源码、指南和参数懒加载入口通过；图形库保持在独立动态导入后。大型异步图形 chunk 的构建提醒仍在，未修改阈值。
- 迁移再次 dry run：0 个移动、0 个导入调整；`git diff --check` 通过。
- 实际默认运行：303 个 ID 全部经过 PreviewRuntime，301 项挂载，Shape Waves 与 Aero Shards 在当前 Chromium/SwiftShader 中给出预期 WebGPU adapter 不可用提示；0 页面、资源和纹理错误。记录的 1167 个源文件哈希在完整运行期间及结束时保持一致。
- 实际图库参数操作：9 项通过，覆盖调节、源码同步、复位、切换记忆、刷新默认、快速修改、错误输入、受控回调、资源切换、复制和减少动效。
- 六个真实按住／拖拽：Shredder、Paper Crumple、Tear Ticket、Sling Button、Swipe Row、Scrub Field 均有按下、持有移动、释放与结果状态证据。
- 五个业务下拉与 DIY 资源下拉的计算背景均为不透底的 rgb(250, 247, 240)；同文档追加其他组件样式后的变换、缩放和指针属性保持一致。

24 项均已在真实 Gallery iframe 验证首屏、原生触发、完成／恢复或暂停：文字与滚动 6/6、视觉 18/18。视觉部分有 38 条检查、73 张截图和 18 次暂停后 iframe 移除记录；文字部分另有 21 张状态截图与原生录屏。Pixel Trail 的活动图像含 26519 个饱和彩色像素，淡出图像与初始图像像素差为 0。颜色编辑器额外复测确认八位 CSS 颜色透明度保留、非法位数不更新预览；原生色板格式警告已解决。

截图、逐项交互报告及浏览器脚本保存在本次本地 Codex 证据附件中。上面的静态与构建结果不等同于 4348 个参数组合的穷举视觉验证。当前环境未验证两项 WebGPU 的实际图形渲染，能力提示与默认代码已验证。
