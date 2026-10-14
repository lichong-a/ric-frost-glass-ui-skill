# 特殊运行条件与本包处理

版本：1.1.0 · 固定提交 `2139cb3098d4fedc6264f13e50dcb4694224ba7c`。以下来自对实际安装源码、示例 Props 与依赖代码的静态检查，不是浏览器交互验收。

## 设备与状态

| 组件 | 实际源码特点 | 本包已经实现的接入 |
|---|---|---|
| Reflective Card | 挂载即请求摄像头，没有关闭采集的 Props | 独立的「启动摄像头反射」按钮之后才挂载；只对该 iframe 委派 camera，microphone 保持关闭。用户仍需处理浏览器权限。停止或切换预览释放实例。 |
| Grid Scan | 即使 `enableWebcam=false`，原模型加载 effect 仍会执行，且静态依赖 face-api | 本例明确关闭 webcam / gyro；共享适配层仅在开启 webcam 时动态导入 face-api 并加载模型，取消后不更新状态或遗留晚到的摄像头流。 |
| Voice Pill | 提供 simulated 和 mic 两种输入 | 本例显式 `reactive="simulated"`，不采集麦克风；回调时长按毫秒转换为秒。 |
| Prompt Bar | 发送、附件、语音由调用者实现 | 全部为界面内明确标记的本地模拟，不连接真实模型服务。 |
| Swipe Row | 可选振动 | 本例 `haptic={false}`。 |
| Option Wheel | 非空 soundUrl 可播放音频 | 本例保持空音频路径。 |

## 资源

| 组件 | 实际资源配置 |
|---|---|
| Fluid Glass | 三个 GLB 由 setup 获取；其 Draco 解码器从锁定的 Three npm 包复制并校验 SHA-256，缺失时使用带散列保护的官方版本 URL。GLB、Draco 与本地 Roboto Flex 的路径按 Vite base 生成；标题为 Agent Ric。 |
| Model Viewer | 使用自有、嵌入缓冲区且无压缩的 sample-object.gltf；`environment="none"`，不请求外部 HDR。 |
| Text Pressure | fontUrl 指向本地 CSS，再加载真实可变字体。 |
| Variable Proximity | 原 CSS 的 Google Fonts 导入在构建时剥离，预览使用本地可变字体。 |
| Circular Gallery | 字体显式为 `600 24px sans-serif`，源码因此不进入默认 Figtree 远程字体分支；图片均为本地素材。 |
| Staggered Menu | 显式使用本包 Agent Ric 图标，覆盖上游开发目录中的默认路径。 |
| Paper Crumple / Refine Frame | 使用自有 SVG 纹理或本地内嵌图像，具备实际像素输入。 |
| 各图片画廊 / Shader | 用本地 MEDIA / items 传参；Fluid Glass 等无法传入的默认图片 URL 在构建适配层转为本地素材。 |

安装后的官方源和资源共 **421 个校验条目**。来源、字节数和散列分别保存在 `catalog/upstream-manifest.json` 与 `catalog/asset-lock.json`。官方源字节不被修改；`scripts/adapt-upstream.mjs` 在内存中进行有限、明确的集成变换。授权文本保存在 `notices/`，包括组件实现、字体与解码器。

本示例项目默认按站点根路径 `/` 运行。嵌入非根路径时设置 Vite base，例如 `/demo/`；自有示例资源和内存适配后的上游默认 GLB、Draco、字体、媒体路径采用同一配置。

## 图形与生命周期

Shape Waves 与 Aero Shards 的原版实际调用 WebGPU。两个示例自行检查安全上下文、API 和适配器；原版挂载后等待 `data-ready` 首帧标记，启动失败、超时或运行中失效时显示状态卡和重新检查入口。Canvas 兼容演示由用户主动开启，其材质与光效不同于原版。详情见 [Shape Waves](docs/components/shape-waves.md)、[Aero Shards](docs/components/aero-shards.md)。Paper Crumple 单独标记 WebGL 2。其他 GPU 项做 WebGL 能力预检，具体 Shader、Three 或设备支持仍需在目标浏览器验证。Glass Surface 的 auto 模式由组件自主选择 SVG / WebGL / CSS，不能因为源码包含 GL 分支而强制阻止其非 GPU 路径。

选中项的代码和 CSS 只在自己的 iframe 中加载。切换、暂停、隐藏页面、离开预览区域、变更动态偏好或出现未被组件处理的运行错误时，父页面会销毁相关 iframe；重新激活时创建新实例。两个 WebGPU 示例在内部处理的可恢复失败保留状态卡，停止失败渲染器并提供重试。这也处理了某些上游组件仅卸载 React 子树时不会完全停止全局动画循环的问题。iframe 用于样式和生命周期隔离，不能视作执行任意陌生代码的安全边界。

减少运动偏好下先显示未挂载说明，用户可明确播放本次；这不是为每种效果绘制等价静态图。业务页面应按所选组件提供等价静态内容或原生控制器。

## 验证边界

本文描述静态接入与恢复策略，不作为浏览器、真实 GPU、设备授权、截图或屏幕阅读器验收。默认目录状态中的「已挂载」只表示 React commit；两个自行报告状态的 WebGPU 示例还等待首帧标记，但该标记也不代替视觉和交互验收。历史检查见 [规范包历史验证记录](../VALIDATION_REPORT.md)，构建依赖图与资源分支细节见 [资源审计](RESOURCE_AUDIT.md)。
