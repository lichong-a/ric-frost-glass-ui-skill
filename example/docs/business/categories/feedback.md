# 状态反馈

仅在需要按场景选型时读本页；精确名称可直接查询单项指南，不顺序读取整个类别。

| 组件 | 什么时候使用 | 什么时候换用其它能力 |
|---|---|---|
| [Message](../components/business-message.md) | 反馈与具体字段或区域相关，需要常显或可关闭 | 短暂非阻断反馈用Toast |
| [Toast](../components/business-toast.md) | 操作完成后给出非阻断反馈，可关闭且不会抢焦点 | 必须用户处理的错误应常显在Message或Dialog |
| [Avatar](../components/business-avatar.md) | 显示人物或团队识别信息，并提供无图片的姓名缩写 | 不把头像当权限或身份验证依据 |
| [Badge](../components/business-badge.md) | 给对象补充短数量或新状态，文本含义仍可读 | 长状态或分类用Tag；不能只靠颜色说明 |
| [Chip](../components/business-chip.md) | 紧凑展示一个可选或可移除的对象，移除有可访问名称 | 自由录入多个词用InputTags |
| [MeterGroup](../components/business-metergroup.md) | 多个部分组成总量，需要同时显示数值、标签与比例 | 单一完成进度用ProgressBar；不要只画无标签颜色段 |
| [ProgressBar](../components/business-progressbar.md) | 已有可信完成比例时显示有界进度与状态 | 没有真实进度时用ProgressSpinner，不编造百分比 |
| [ProgressSpinner](../components/business-progressspinner.md) | 操作正在等待且没有可信百分比，提供文字与完成/取消路径 | 有明确百分比时用ProgressBar |
| [Skeleton](../components/business-skeleton.md) | 已知内容布局但数据尚未到达，预留稳定尺寸 | 未知布局只需简短加载状态；占位不能冒充真实内容 |
| [Tag](../components/business-tag.md) | 用文字和受控颜色表达短状态或分类 | 数字计数用Badge；可移除对象用Chip |

选定一个组件后只读它的文档、示例与必要共享符号。
