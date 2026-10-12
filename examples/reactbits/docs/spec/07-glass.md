# 7. 霜玻璃材质与阴影

### 7.1 背景环境层

背景在整个应用中连续，仅建立一份。它由暖米灰基底和多个大尺寸、低频的径向渐变构成：左侧灰茶绿，左下少量较深鼠尾草绿，右侧沙米色，中上部象牙白。色团必须柔和且尺度大，不能像彩色气泡。

背景固定在视口后方，内容滚动时不跟随每张卡片重复移动。不要在每个卡片内部重复一张背景，也不要用纯白背景检验玻璃强弱。默认不引入粒子、视差、持续流动或背景动画。参考图中轻微的自然纹理不是一张可恢复的独立素材；本包使用可复现的 CSS 色团近似其环境色。

### 7.2 材料档位

| 材料 | 象牙白背景不透明度 | 背景模糊 | 用途 |
|---|---:|---:|---|
| `frame` | 0.38 | 24 px | 顶栏、侧栏、主工作区外壳 |
| `panel` | 0.68 | 16 px | 独立内容卡片；嵌在已模糊框架时可不再次模糊 |
| `table` | 0.82 | 不单独模糊 | 数据阅读面 |
| `control` | 0.82 | 不单独模糊 | 输入、次按钮、选择器 |
| `popover` | 0.82 | 28 px | 下拉菜单、待办、租户、用户面板 |
| `dialog` | 0.88 | 32 px | 导入及确认弹窗 |
| `fallback` | 1.00 | 无 | 不支持模糊 / 减少透明度：`#F4F1E8` |

这里的透明度只应用于背景颜色。组件文字、图标、焦点环保持原有不透明度。`saturate()` 采用轻微增强，约 1.05；不得通过大幅增强饱和度来制造“液态”效果。

透明表面上方应有一条细白边和轻微内侧顶部高光；普通面板边线约 1 px。交互边界与装饰边线分开：玻璃外壳可以很轻，输入框不能因为只剩白边而无法辨识。

### 7.3 阴影层级

| 高度 | 使用对象 | 设计结果 |
|---|---|---|
| 0 | 表格行、标签、分割线 | 不加独立阴影 |
| 1 | 输入、次按钮、分页 | 小范围接触影，轻微离面 |
| 2 | 侧栏、卡片、外壳 | 柔和环境影，约 8 px 下移 / 24 px 扩散 |
| 3 | 下拉和非模态浮层 | 约 16 px 下移 / 40 px 扩散，更易看出浮起 |
| 4 | 模态弹窗 | 更宽的环境影，配合遮罩和内部亮边 |

阴影以灰绿或棕灰为基色，透明度约 0.10、0.16、0.20 随层级增加；具体多层字符串由 `--aw-shadow-*` 定义。按钮 hover 只小幅改变底色和接触影，不做明显向上跳跃或强烈浮雕。`box-shadow` 不用于替代所有边框。

### 7.4 实现方式

```css
/* 结构示意；实际项目优先复用 theme.css，避免维护两份同名规则。 */
.glass-frame {
  position: relative;
  background: var(--aw-surface-frame);
  border: 1px solid rgb(255 255 255 / 0.68);
  border-radius: var(--aw-radius-page);
  box-shadow: var(--aw-shadow-panel);
  -webkit-backdrop-filter: blur(var(--aw-blur-frame)) saturate(1.05);
  backdrop-filter: blur(var(--aw-blur-frame)) saturate(1.05);
}
.glass-reading-surface {
  background: var(--aw-surface-table);
  /* 内层阅读面依靠底色稳定文字，不继续堆叠模糊。 */
}
```

`backdrop-filter` 处理元素后方已经绘制的像素，表面需要有透明部分才能看到效果。父元素的 `opacity`、`filter` 或其他 backdrop root 条件可能改变子元素能采样的背景；这也是不把整个框架做透明度动画的原因。[MDN backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter)

**层结构必须满足：** 应用背景位于框架后；阅读面位于框架内；页面级浮层渲染到统一 overlay 容器；overlay 容器位于会裁切或改变坐标系的内容容器之外。高光伪元素使用 `pointer-events: none`。不得对所有组件添加 `will-change`。

### 7.5 降级

不支持 `backdrop-filter`、用户开启减少透明度或项目主动启用低性能模式时，切换为稳定实色表面，保留暖色体系、圆角、边线和阴影。支持检测使用 `@supports`，不得仅按浏览器名称判断。`data-transparency="reduce"` 是可由设置或应用策略控制的统一入口。

降低透明度时应一并覆盖 `frame / panel / table / control / popover / dialog`，不能只修复首页卡片却让弹窗文字仍被背景干扰。`forced-colors` 下采用系统色和可见边界；减少动效不等同于减少透明度，应分别控制。

---

规范来源：[AGENT_WAN_UI_SPEC.md](../../../../AGENT_WAN_UI_SPEC.md)。本文件由主规范按章节生成；修改主规范后重新生成，不独立维护第二套规则。
