# AutoComplete

业务表单 · `business-autocomplete` · 中文意图：自动补全 / 搜索建议 / 候选项搜索 / 输入时搜索候选

## 1. 什么场景使用

候选项较多且用户知道部分名称，需要边输入边筛选并选择明确对象。

**不适合或优先替代：**只有少量固定候选项时优先Select；自由文本不能强制选项。

先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加 React Bits。

## 2. 只加载这一项

1. 只读本指南，确认用途与边界。
2. 只读 [src/business/demos/business-autocomplete.tsx](../../../src/business/demos/business-autocomplete.tsx)；共享基础有需要才读 [support.tsx](../../../src/business/support.tsx)。
3. 本例若导入 primitives，再定位该文件中被使用的符号，不加载其它示例。样式按需检索 [业务 Token 皮肤](../../../src/business/business.css) 中的对应类。
4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：[05-input](../../contracts/05-input.md)、[06-select](../../contracts/06-select.md)。
5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。

所有实现使用本项目已有 React、原生 HTML 和 CSS。PrimeReact 文档只作为功能目录参考，本例不依赖或承诺匹配 PrimeReact 的库 API；无需安装它。完整交互、类型与回调以当前示例代码为准。

## 3. 本例真实用法

下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。

```tsx
import { useState, useId, useEffect } from 'react';
import { BusinessDemo, Button, Field } from '../support';

// 场景：从较多候选项中边输入边搜索，支持键盘选择与清空。
export default function AutoCompleteDemo() {
  const options = ['项目工作台', '智能体管理', '技能目录', '知识库', '工具连接', '运行记录', '团队空间'];
  const id = useId(); const [query, setQuery] = useState(''); const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false); const [active, setActive] = useState(0);
  const matches = options.filter(item => item.includes(query.trim()));
  useEffect(() => {
    if (open) document.getElementById(`${id}-option-${active}`)?.scrollIntoView({ block: 'nearest' });
  }, [id, open, active, matches.length]);
  function choose(value: string) { setQuery(value); setSelected(value); setOpen(false); }
  return <BusinessDemo title="AutoComplete · 自动补全" description="从较多候选项中边输入边搜索，支持方向键、Enter 和 Escape。"><Field label="搜索工作入口" htmlFor={id}><div className="aw-business-combo" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}><input id={id} role="combobox" aria-autocomplete="list" aria-expanded={open} aria-controls={`${id}-options`} aria-activedescendant={open && matches[active] ? `${id}-option-${active}` : undefined} value={query} placeholder="输入“管理”或“目录”" onFocus={() => setOpen(true)} onChange={event => { setQuery(event.target.value); setSelected(''); setActive(0); setOpen(true); }} onKeyDown={event => { if (['ArrowDown','ArrowUp'].includes(event.key)) { event.preventDefault(); setOpen(true); setActive(value => matches.length ? (value + (event.key === 'ArrowDown' ? 1 : -1) + matches.length) % matches.length : 0); } else if (event.key === 'Enter' && open && matches[active]) { event.preventDefault(); choose(matches[active]); } else if (event.key === 'Escape') setOpen(false); }} />{open ? <div className="aw-business-combo-list"><ul id={`${id}-options`} role="listbox" className="aw-business-options">{matches.length ? matches.map((item,index) => <li key={item} id={`${id}-option-${index}`} role="option" aria-selected={active === index}><button type="button" tabIndex={-1} onPointerDown={event => event.preventDefault()} onClick={() => choose(item)}>{item}</button></li>) : <li className="aw-business-empty">没有匹配的入口</li>}</ul></div> : null}</div></Field><div className="aw-business-row"><Button variant="secondary" onClick={() => { setQuery(''); setSelected(''); setOpen(false); }}>清空</Button><p className="aw-business-status" role="status">{selected ? `已选择：${selected}` : '尚未选择入口'}</p></div></BusinessDemo>;
}
```

## 4. 接入约束

- 颜色、阅读面、圆角、边界、焦点与阴影使用 Agent Wan Token，业务逻辑留在所属模块。
- 服务端状态、资源归属与动作权限由既有可信业务接口处理；前端输入限制只服务于体验。
- 保留本项键盘、名称、空状态、错误状态和恢复入口，清理拥有的监听、计时器、观察器与对象 URL。
- 文档中的本地数组、文件或短命令只用于示例；不增加未授权的上传、设备访问、外部写入或 shell 执行。
- 减少运动偏好下保留业务操作，仅停用短过渡；不要因为动效偏好关闭必要表单与菜单。

## 5. 场景级验收

按第 1 节实际业务任务检查状态变化、键盘路径、边界值、失败和取消。只报告运行过的检查；本指南和源码存在不等于已完成浏览器验收。

功能目录来源：[AutoComplete](https://primereact.dev/docs/styled/components/autocomplete)。与原有目录的对照：此前没有独立可运行业务示例，规范和 CSS 不作为运行覆盖。

选型有疑问时返回 [业务表单](../categories/form.md)，先比较最多 2–3 项。
