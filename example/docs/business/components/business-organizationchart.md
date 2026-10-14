# OrganizationChart

数据与文件 · `business-organizationchart` · 中文意图：组织结构 / 部门树 / 层级关系图

## 1. 什么场景使用

展示可展开的上下级组织或责任关系并选择节点。

**不适合或优先替代：**通用文件目录用Tree；大量树形记录用TreeTable。

先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加效果组件。

## 2. 只加载这一项

1. 只读本指南，确认用途与边界。
2. 只读 [src/business/demos/data/business-organizationchart.tsx](../../../src/business/demos/data/business-organizationchart.tsx)；需核对 API 与 DIY 配置时读 [本项参数记录](../../../src/parameters/definitions/business-organizationchart.json)；共享基础有需要才读 [support.tsx](../../../src/business/support.tsx)。
3. 本例从 components 按需导入独立控件；只读实际导入的 .tsx 及同名 .module.css。布局工具类也显式使用 CSS Modules，不给整块区域的 button/input 套统一动效。
4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：[11-data-table](../../contracts/11-data-table.md)、[16-pagination](../../contracts/16-pagination.md)、[13-import-dialog](../../contracts/13-import-dialog.md)。
5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。

所有实现使用本项目已有 React、原生语义控件、Motion 和 CSS。完整交互、类型与回调以当前示例代码为准；局部弹性、下拉、媒体与日历效果见 [交互动效指南](../motion-guide.md)。

## 3. 本例真实用法

下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。

```tsx
// 当前 OrganizationChart 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：680px（宿主设置，不是组件 Props）。
import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { OrganizationNodes } from '../../components/OrganizationNodes';


const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessOrganizationChartDemo() {
  const [selected,setSelected]=useState("workspace"); const [expanded,setExpanded]=useState(["workspace"]);
  return <BusinessDemo title="OrganizationChart" description="逐层展开团队结构，点击成员显示当前选择。">
    <div data-ui="aw-business-organization" className={cn("aw-business-organization")} style={{overflowX:"auto"}}><OrganizationNodes  selected={selected} expanded={expanded} onSelect={setSelected} onToggle={key=>setExpanded(current=>current.includes(key)?current.filter(value=>value!==key):[...current,key])} nodes={[{ "key": "workspace", "label": "工作空间", "children": [{ "key": "agents", "label": "智能体", "children": [{ "key": "research", "label": "资料助理" }, { "key": "service", "label": "服务助理" }] }, { "key": "skills", "label": "技能", "children": [{ "key": "writing", "label": "文档写作" }, { "key": "search", "label": "知识检索" }] }] }]}  /></div><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">已选择节点：{selected}</p>
  </BusinessDemo>;
}
```

### 完整组件 API

源码默认值来自本包业务实现；本例默认配置来自独立示例，两者可能不同。

本例默认导出是可运行演示入口。下表无前缀参数属于 [OrganizationNodes](../../../src/business/components/OrganizationNodes.tsx) 的组件 API，带前缀参数属于对应叶组件；这些参数不表示演示函数本身接收相同 Props。

| 参数 | 类型 | 必填 | 源码默认值 | 中文说明 |
|---|---|---|---|---|
| `nodes` | `TreeItem[]` | 是 | `未指定` | 树或组织结构的节点数据，子节点和标识按类型定义。 |
| `selected` | `string \| null` | 是 | `未指定` | 当前选中项的标识。 |
| `expanded` | `string[]` | 是 | `未指定` | 当前展开节点的标识集合。 |
| `onSelect` | `(key: string) => void` | 是 | `未指定` | 用户选择条目时通知调用方，参数为选中项的标识或数据。 |
| `onToggle` | `(key: string) => void` | 是 | `未指定` | 节点展开或收起时通知调用方，参数为目标节点的标识。 |

**nodes 的真实接入：**

```tsx
nodes={workspaceTree}
```

**expanded 的真实接入：**

```tsx
expanded={expanded}
```

**onSelect 的真实接入：**

```tsx
onSelect={setSelected}
```

**onToggle 的真实接入：**

```tsx
onToggle={key=>setExpanded(current=>current.includes(key)?current.filter(value=>value!==key):[...current,key])}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，组件 API 保持上述类型与约束。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

| 参数 / 实例 | 本例默认配置 | 控件 | 演示范围 / 单位 | 应用方式 |
|---|---|---|---|---|
| `t0.nodes` | `[{"key":"workspace","label":"工作空间","children":[{"key":"agents","label":"智能体","children":[{"key":"research","label":"资料助理"},{"key":"service","label":"服务助理"}]},{"key":"skills","label":"技能","children":[{"key":"writing","label":"文档写作"},{"key":"search","label":"知识检索"}]}]}]` | json | 不限 ~ 不限 | 即时应用 |
| `state.selected` | `"workspace"` | text | 不限 ~ 不限 | 即时应用；原组件回调同步受控值 |
| `state.expanded` | `["workspace"]` | json | 不限 ~ 不限 | 即时应用；原组件回调同步受控值 |

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `680`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. 接入约束

- 颜色、阅读面、圆角、边界、焦点与阴影使用 Agent Ric Token，业务逻辑留在所属模块。
- 服务端状态、资源归属与动作权限由既有可信业务接口处理；前端输入限制只服务于体验。
- 保留本项键盘、名称、空状态、错误状态和恢复入口，清理拥有的监听、计时器、观察器与对象 URL。
- 文档中的本地数组、文件或短命令只用于示例；不增加未授权的上传、设备访问、外部写入或 shell 执行。
- 减少运动偏好下保留业务操作，仅停用短过渡；不要因为动效偏好关闭必要表单与菜单。

## 5. 场景级验收

按第 1 节实际业务任务检查状态变化、键盘路径、边界值、失败和取消。只报告运行过的检查；本指南和源码存在不等于已完成浏览器验收。

能力对照：此前没有独立可运行业务示例，规范和 CSS 不作为运行覆盖。

选型有疑问时返回 [数据与文件](../categories/data.md)，先比较最多 2–3 项。
