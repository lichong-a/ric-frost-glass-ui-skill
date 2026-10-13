# AnimateOnScroll

滚动与转场 · `business-animateonscroll` · 中文意图：滚动入场 / 进入视口 / 局部揭示

## 1. 什么场景使用

非关键内容进入视口时轻量揭示，减少运动时直接可读。

**不适合或优先替代：**核心业务不能依赖动画出现；已有Animated Content可复用。

先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加效果组件。

## 2. 只加载这一项

1. 只读本指南，确认用途与边界。
2. 只读 [src/business/demos/scroll/business-animateonscroll.tsx](../../../src/business/demos/scroll/business-animateonscroll.tsx)；共享基础有需要才读 [support.tsx](../../../src/business/support.tsx)。
3. 本例从 components 按需导入独立控件；只读实际导入的 .tsx 及同名 .module.css。布局工具类也显式使用 CSS Modules，不给整块区域的 button/input 套统一动效。
4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：[19-overlays-keyboard](../../contracts/19-overlays-keyboard.md)、[18-auxiliary](../../contracts/18-auxiliary.md)。
5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。

所有实现使用本项目已有 React、原生语义控件、Motion 和 CSS。完整交互、类型与回调以当前示例代码为准；局部弹性、下拉、媒体与日历效果见 [交互动效指南](../motion-guide.md)。

## 3. 本例真实用法

下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。

```tsx
// 当前 AnimateOnScroll 用法；所需实现和 CSS 与完整示例相同。
// 预览框高度：560px（宿主设置，不是组件 Props）。
import ownedStyles0 from '../../components/DemoLayout.module.css';
import { componentClasses } from '../../class-names';
import { useState, useEffect, useRef } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { MotionSurface } from '../../components/MotionSurface';

const ownedStyles={...ownedStyles0};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessAnimateOnScrollDemo() {
  const scroller=useRef<HTMLDivElement>(null); const target=useRef<HTMLDivElement>(null); const [visible,setVisible]=useState(false); useEffect(()=>{if(!target.current||!scroller.current)return;const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{root:scroller.current,threshold:0.25});observer.observe(target.current);return()=>observer.disconnect();},[]);
  return <BusinessDemo title="AnimateOnScroll" description="滚动到资料卡后触发真实入场动画，离开时恢复；减少运动偏好使用静态显示。">
    <div data-ui="aw-business-item" className={cn("aw-business-item")} ref={scroller} tabIndex={0} aria-label="滚动触发动画的资料区" style={{height:260,overflow:'auto'}}><p style={{height:280}}>向下滚动查看入场资料卡。</p><div ref={target} style={{minHeight:100}}>{visible?<MotionSurface><article data-ui="aw-business-item" className={cn("aw-business-item")}><h3>资料已进入视野</h3><p>动画由实际可见性驱动。</p></article></MotionSurface>:<p>资料卡将在进入视野时显示。</p>}</div><p style={{height:180}}>向上滚动可再次触发。</p></div>
  </BusinessDemo>;
}
```

### 完整组件 API

| 参数 | 类型 | 必填 | 上游默认值 | 中文说明 |
|---|---|---|---|---|
| `children` | `ReactNode` | 是 | `未指定` | 组件内显示的内容；字符串、ReactNode 与 JSX 的支持范围由类型声明决定。 |

**children 的真实接入：**

```tsx
children={<><article data-ui="aw-business-item" className={cn("aw-business-item")}><h3>资料已进入视野</h3><p>动画由实际可见性驱动。</p></article></>}
```

### 本例配置与 DIY

以下范围属于本例编辑器的可用范围，不改写上游 API。常用参数在预览下方展开，高级参数折叠；无效输入保留最后有效预览。需要重新初始化图形资源的字段在调节结束后重建。

本项使用 React 节点、回调和业务数据组合；这些内容保持真实 TSX 接入，未伪装成普通文本控件。

### 演示容器设置

- `height`：宿主 iframe 的预览框高度，单位 px；不传入组件 Props。此面板仅提供 320–1200px 的演示范围。；默认 `560`px，范围 320–1200。

容器选项属于示例宿主，不是组件 Props。同页切换记住各自配置，刷新恢复默认。使用“恢复默认”“重播”“复制当前用法／配置”可重新体验和导出；滚动进度、粒子位置等瞬时状态不会写入配置。

## 4. 接入约束

- 颜色、阅读面、圆角、边界、焦点与阴影使用 Agent Wan Token，业务逻辑留在所属模块。
- 服务端状态、资源归属与动作权限由既有可信业务接口处理；前端输入限制只服务于体验。
- 保留本项键盘、名称、空状态、错误状态和恢复入口，清理拥有的监听、计时器、观察器与对象 URL。
- 文档中的本地数组、文件或短命令只用于示例；不增加未授权的上传、设备访问、外部写入或 shell 执行。
- 减少运动偏好下保留业务操作，仅停用短过渡；不要因为动效偏好关闭必要表单与菜单。

## 5. 场景级验收

按第 1 节实际业务任务检查状态变化、键盘路径、边界值、失败和取消。只报告运行过的检查；本指南和源码存在不等于已完成浏览器验收。

能力对照：animated-content、fade-content 是已有相邻效果；通用业务行为按本例补齐。

选型有疑问时返回 [基础辅助](../categories/utility.md)，先比较最多 2–3 项。
