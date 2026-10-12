# 示例运行资源审计

审计范围：`catalog/upstream-manifest.json` 锁定的 215 个 React Bits 免费组件、各自的真实示例 Props、`scripts/adapt-upstream.mjs` 转换后的源码，以及 Vite 构建产物的引用关系。上游提交为 `2139cb3098d4fedc6264f13e50dcb4694224ba7c`。

这是一份静态审计。它核对资源路径、加载分支、文件内容和依赖图；没有执行浏览器渲染、摄像头授权、交互、网络测速或 GPU 性能测试。生成的画面、跨浏览器兼容性和交互手感仍需在实际运行环境验收。

## 当前接入方式

每个组件都由独立的 `src/demos/<slug>.tsx` 示例挂载对应的官方实现。示例图片采用自有的本地 SVG，字体、GLB 模型和 Draco 解码器由 `setup:reactbits` 按固定来源与 SHA-256 安装到本地。

`src/main.tsx` 负责画廊，`src/preview.tsx` 负责独立 iframe。`src/demo-loaders.ts` 保存延迟导入函数；组件进入活动预览后才加载实现及其依赖。查看用法或指南时，画廊另行导入对应的纯文本文件。暂停、隐藏或离开可见区域时，父级预览会销毁 iframe。

安装命令仍需要取得锁定的 npm 包及官方资源；本文的“本地资源”指安装完成后示例的运行依赖。第三方源码缓存、依赖目录及 `dist/` 不包含在可再分发模板中。

## 本地资源清单

以下 URL 按当前 Vite 配置的站点根路径 `/` 解析。直接部署到子目录时，需统一处理仍使用根路径的示例、HTML 字体链接和上游适配代码，再重新构建与验收。

| 运行资源 | 使用范围 | 证据与处理 |
| --- | --- | --- |
| `/media/scene-1.svg` 至 `/media/scene-6.svg` | 图片画廊、卡片、背景纹理、图片交互 | `src/shared/demo-support.tsx` 的 `MEDIA` 指向 6 张本地 SVG；对应文件没有外部图片或字体依赖。 |
| `/media/agent-wan-mark.svg` | 画廊品牌、导航、卡片图标 | `LOGO` 显式覆盖相关组件的默认 Logo。 |
| `/media/sample-object.gltf` | ModelViewer | 自有 GLTF，二进制缓冲以 data URI 内嵌；没有 Draco、外部纹理或外部二进制引用。 |
| `/assets/fonts/demo-fonts.css` | TextPressure、VariableProximity，以及预览页字体声明 | CSS 的相对 `./RobotoFlex.ttf` 指向同一目录内的本地字体。 |
| `/assets/fonts/RobotoFlex.ttf` | 可变字体示例、FluidGlass 的三维文字 | `catalog/asset-lock.json` 锁定 Google Fonts 仓库提交及字节摘要；OFL 说明在 `notices/RobotoFlex-OFL.txt`。 |
| `/assets/3d/lens.glb` | FluidGlass 当前透镜模式 | GLB 的 `extensionsRequired` 含 `KHR_draco_mesh_compression`，必须提供解码器。 |
| `/assets/3d/cube.glb`、`/assets/3d/bar.glb` | FluidGlass 其它模式的资源支持 | 两个 GLB 没有 Draco 压缩扩展；模型数据内嵌，无外部图片或缓冲文件。 |
| `/assets/draco/draco_wasm_wrapper.js`、`draco_decoder.wasm` | FluidGlass 的压缩透镜 | 从锁定的 `three@0.180.0` 依赖复制，或从固定的 Three.js `r180` 来源下载；均校验 SHA-256。 |
| `/assets/draco/draco_decoder.js` | Draco 的 JavaScript 解码分支 | 同样固定来源和摘要；无需回退到 Google 托管的解码器地址。 |

PaperCrumple、RefineFrame 和 ElectricLogo 还使用自有 data SVG。Shredder 的示例内容来自本地 DOM 与本地状态；PromptBar 的文件、发送和听写反馈是明确标注的模拟交互。

## 已处理的实际隐式请求

### FluidGlass：Draco 与三维字体

上游 `FluidGlass.tsx` 在 `ModeWrapper` 中调用 `useGLTF(glb)`。当前 Drei 的默认 Draco 路径是 Google 托管的解码器目录；由于 `lens.glb` 确实需要 Draco，该默认地址会在透镜加载时被使用。适配代码已将这一处调用改为 `useGLTF(glb, '/assets/draco/')`。Drei 的第二参数支持字符串解码器路径，使用该路径创建实际的 `DRACOLoader`。

上游两个 `<Text>` 标签原本没有传入字体。当前 Troika 会为没有覆盖的文字查询默认的 Unicode 字体解析 CDN。适配代码现为两个标签显式设置 `font="/assets/fonts/RobotoFlex.ttf"`，并将透镜示例标题设为 `Agent Wan`。在当前安装的 Troika 解析器上进行的纯字体解析确认，`Agent Wan`、`React Bits`、`Home About Contact` 所需字符均被该 TTF 覆盖并产生 glyph。这个检查没有生成或观察画面。

如果以后把三维文字改为该字体未覆盖的字符，需要同时提供覆盖那些字符的本地字体，否则 Troika 的缺字回退仍可能使用外部字体解析服务。

| Draco 文件 | 字节数 | SHA-256 |
| --- | ---: | --- |
| `draco_decoder.js` | 512465 | `8625489da79a805f4f2a7d511c3e52d8b4085608a9d2a4d5f4f9de5db0aea04f` |
| `draco_wasm_wrapper.js` | 58456 | `8bb2952d2ba7d67e1414f8df819410cb0434a666be53f671fff75f68843d76f6` |
| `draco_decoder.wasm` | 192420 | `a680d927bed9cb864ddbd63521868891af2bfbe755092761b4837487618df8ac` |

以上字节数是文件大小，不是网络传输量、加载耗时或运行性能结果。精确来源与安装位置以 `catalog/asset-lock.json` 为准。

### GridScan：人脸模型与摄像头

当前示例显式设置 `enableWebcam={false}`、`enableGyro={false}`、`showPreview={false}`。上游的人脸模型加载 effect 原本不检查 `enableWebcam`，即使关闭摄像头也会读取远程权重。Vite 适配在该 effect 开头加入 `if (!enableWebcam) return`，并将 `enableWebcam` 纳入依赖数组。构建后的代码已核对保留这一条件。

因此当前 GridScan 示例不会请求摄像头、设备方向事件或远程人脸模型。适配层将 face-api 改为该 effect 内的动态导入；关闭摄像头时不执行它，开启后才准备模块与模型。卸载或关闭期间完成的模块加载不更新状态，晚到的摄像头流会立即释放。实际包体积应在下一次生产构建后重新读取，历史大小不作为此修复的测量结果。

### 其它默认资源的当前行为

| 组件 | 当前示例实际分支 |
| --- | --- |
| ModelViewer | 显式 `environment="none"`，不会挂载 Drei 的 HDR Environment；自有模型没有压缩扩展，设置默认 Draco loader 不会自行触发解码器下载。 |
| CircularGallery | 显式传入本地 `items` 与系统字体 `600 24px sans-serif`，不会选择默认 Google Fonts URL。 |
| TextPressure | `fontUrl` 指向本地字体 CSS，覆盖默认 Google Fonts 样式地址。 |
| VariableProximity | 上游 CSS 的 Google Fonts `@import` 已由 Vite 适配移除；示例使用本地字体声明。 |
| FluidGlass 的图片 | 上游内部固定的图片 URL 已转换为本地 `scene-*.svg`。 |
| DomeGallery 等图像组件 | 示例显式传入本地资源；上游保留的默认 URL 没有进入当前图片加载分支。 |
| StaggeredMenu | `logoUrl={LOGO}` 覆盖上游源码路径形式的默认图片地址。 |
| OptionWheel | 显式 `soundUrl=""`，不创建需要加载音频资源的 `Audio` 实例。 |
| MetallicPaint | 使用真实文字材质分支，不调用图片资源的 fetch 分支。 |

## 设备能力的明确入口

ReflectiveCard 的官方实现会在挂载时调用 `getUserMedia`。示例先显示“启动摄像头反射”，只有用户点击后才挂载实现；关闭后卸载。父预览只对该组件允许摄像头能力。

VoicePill 显式使用 `reactive="simulated"`。PromptBar 的听写由本地状态模拟，没有默认麦克风请求。ProfileCard 显式关闭移动设备倾斜输入。WebGPU 组件由运行时先检查安全上下文、`navigator.gpu` 与实际 adapter 可用性，再挂载组件；异步检查取消时不会晚到挂载。

这些控制只说明何时调用能力。用户是否授权、实际设备效果如何，需在运行环境中检查。

## 构建依赖图的复核

完成指南生成并构建后，运行：

```sh
npm run build
node scripts/check-build.mjs
```

检查脚本读取真实 `dist/.vite/manifest.json`，输出 `catalog/build-report.json`，覆盖以下条件：

- 215 个真实组件入口、215 个用法源码入口、215 个组件指南入口均存在，且经 `import()` 从对应 HTML 根入口动态可达。
- 首页和预览页同步闭包只包含允许的 React、目录元数据与预览运行时模块；同步闭包没有组件入口，也没有 GSAP、OGL、Three、face-api 等已识别的效果库实现。
- 一个真实组件的同步依赖闭包不会夹带另一个真实组件入口。
- manifest 的 `imports`、`dynamicImports` 指向有效记录，所有 chunk、CSS 和 asset 文件实际存在。
- Vite manifest 之外的每个 `public/` 文件在 `dist/` 中存在，且字节摘要与当前源文件相同，包括字体、GLB 和 Draco 解码器。

退出码 `0` 表示这些静态条件通过，`1` 表示结构或资源问题，`2` 表示构建或组件指南生成尚未完成。缺少指南的旧构建不会被当作完整通过。

首次构建中发出的 GridScan 约 657 KB、Three 约 705 KB 的 chunk 警告对应延迟加载的实现文件：GridScan 的实现只被自身示例引用，Three 的共享实现被 16 个相关示例引用。正式构建的精确文件名、字节数与消费组件以最新的 `build-report.json` 为准。原始文件大小不能代替下载时间、设备内存、GPU 帧率或交互性能测试。

## 审计边界

本审计结论针对所交付的示例 Props、锁定源码与适配脚本。修改默认 Props、增加远程素材、改变字体文本或开启设备能力后，应再次核对对应加载分支。仅在源码中看见外部 URL，不能推断当前示例会请求它；同样，构建通过也不能证明视觉效果已成功呈现。
