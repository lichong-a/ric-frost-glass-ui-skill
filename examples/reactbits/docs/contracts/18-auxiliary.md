# 18．数据呈现与辅助控件

| 组件／状态 | 契约 |
| --- | --- |
| Skeleton／loading | 保持目标布局，装饰骨架 aria-hidden，内容容器 aria-busy；没有数据时不显示虚构数值 |
| Empty／no-data | “暂无技能”，提供权限允许的创建或导入入口 |
| Empty／filtered | “未找到匹配的技能”，保留关键词与筛选，提供清空筛选 |
| Error／load-failed | 说明加载失败、提供重试；若保留旧数据，明确其状态 |
| Forbidden | “无访问权限”，提供获授权的切换或申请入口；不能伪装成空列表 |
| Badge／Tag | 显示真实状态文本，颜色与图标作为辅助；非交互标签不加入 Tab |
| Checkbox | 原生优先；checked／mixed／disabled 与视觉一致，每个控件有名称 |
| Switch | checked／pending／failed 分离；有名称和 checked 语义，失败保留原值并解释 |

- 后端返回空数组、请求失败和没有权限是不同分支，不用同一空态组件文案吞并。
- Switch 若采用乐观更新，失败必须回滚且说明；涉及高影响业务的开关按业务约定确认，不能仅凭截图决定。

---

规范来源：[COMPONENT_CONTRACTS.md](../../../../COMPONENT_CONTRACTS.md)。本文件由主规范按章节生成；修改主规范后重新生成，不独立维护第二套规则。
