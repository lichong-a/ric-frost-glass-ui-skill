# 基础辅助

仅在需要按场景选型时读本页；精确名称可直接查询单项指南，不顺序读取整个类别。

| 组件 | 什么时候使用 | 什么时候换用其它能力 |
|---|---|---|
| [AnimateOnScroll](../components/business-animateonscroll.md) | 非关键内容进入视口时轻量揭示，减少运动时直接可读 | 核心业务不能依赖动画出现；已有Animated Content可复用 |
| [Fluid](../components/business-fluid.md) | 容器中的控件随可用宽度伸缩，保留合理最小尺寸 | 固定尺寸的图形效果不应全局改为100%宽 |
| [FocusTrap](../components/business-focustrap.md) | 临时任务区需要焦点限制，并能退出和恢复触发点 | 普通内容不能永久困住焦点；Dialog已有原生模态行为 |
| [Terminal](../components/business-terminal.md) | 产品确有受限文本命令入口时保留输入、历史和结果 | 示例只处理白名单本地命令，不运行shell或越权调用 |
| [StyleClass](../components/business-styleclass.md) | 一个局部状态需要控制类名或可见性，由React状态驱动 | 不要改变全局样式或用隐藏CSS替代资源卸载 |
| [Motion](../components/business-motion.md) | 状态切换需要短促过渡，减少运动时仍能完成操作 | 持续装饰效果选择现有动效目录，不在通用业务页默认开启 |
| [Portal](../components/business-portal.md) | 浮层需要挂到当前文档指定位置，保留主题与生命周期 | 普通内容不需要Portal；不能跨源或跨租户挂载 |
| [VisuallyHidden](../components/business-visuallyhidden.md) | 补充给辅助技术的名称或说明，视觉布局不显示它 | 重要业务信息必须同时可见；不要用它隐藏错误 |

选定一个组件后只读它的文档、示例与必要共享符号。
