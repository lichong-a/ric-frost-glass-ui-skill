# DataTable

数据与文件 · `business-datatable` · 中文意图：数据表格 / 排序分页 / 批量数据

## 1. 什么场景使用

结构化记录需要列比较、搜索、排序和分页。

**不适合或优先替代：**卡片内容浏览用DataView；大数据需服务端分页。

先确认本次任务要解决的业务行为，再选择本组件。普通业务页面优先使用这里的基础能力；只有用户明确要求装饰效果时才追加 React Bits。

## 2. 只加载这一项

1. 只读本指南，确认用途与边界。
2. 只读 [src/business/demos/business-datatable.tsx](../../../src/business/demos/business-datatable.tsx)；共享基础有需要才读 [support.tsx](../../../src/business/support.tsx)。
3. 本例若导入 primitives，再定位该文件中被使用的符号，不加载其它示例。样式按需检索 [业务 Token 皮肤](../../../src/business/business.css) 中的对应类。
4. 涉及业务错误、权限、数据或异步行为时才追加对应契约：[11-data-table](../../contracts/11-data-table.md)、[16-pagination](../../contracts/16-pagination.md)、[13-import-dialog](../../contracts/13-import-dialog.md)。
5. 预览库使用本项独立 import() 入口；复制到目标项目时也只接入所需组件和直接依赖。

所有实现使用本项目已有 React、原生 HTML 和 CSS。PrimeReact 文档只作为功能目录参考，本例不依赖或承诺匹配 PrimeReact 的库 API；无需安装它。完整交互、类型与回调以当前示例代码为准。

## 3. 本例真实用法

下面来自当前独立示例。默认导出是一个可运行实例；复制后把本地选项、数据与回调接到目标项目已有业务层，不把演示结果当作后端成功。

```tsx
// Original Agent Wan demonstration using React and native browser controls.
import { useState } from 'react';
import { BusinessDemo, Button, Field } from '../support';
import { workItems, Pager } from '../primitives';


export default function BusinessDataTableDemo() {
  const [query,setQuery]=useState('');
  const [sort,setSort]=useState<'title'|'quantity'>('title');
  const [ascending,setAscending]=useState(true);
  const [page,setPage]=useState(0);
  const [selected,setSelected]=useState<string[]>([]);
  const filtered=workItems.filter(item=>item.title.includes(query)||item.category.includes(query)).sort((a,b)=>(sort==='title'?a.title.localeCompare(b.title,'zh-CN'):a.quantity-b.quantity)*(ascending?1:-1));
  function order(field:'title'|'quantity'){setAscending(field===sort?!ascending:true);setSort(field);setPage(0);}
  return <BusinessDemo title="DataTable" description="在本地任务表中搜索、排序、勾选和分页；没有网络写入。">
    <Field label="搜索任务"><input className="aw-business-input" value={query} onChange={event=>{setQuery(event.target.value);setPage(0);}} /></Field>
    <div style={{overflowX:'auto'}}><table className="aw-business-table"><thead><tr><th scope="col">选择</th><th scope="col" aria-sort={sort==='title'?(ascending?'ascending':'descending'):'none'}><Button variant="secondary" onClick={()=>order('title')}>任务 ↕</Button></th><th scope="col">类别</th><th scope="col" aria-sort={sort==='quantity'?(ascending?'ascending':'descending'):'none'}><Button variant="secondary" onClick={()=>order('quantity')}>数量 ↕</Button></th></tr></thead><tbody>{filtered.slice(page*3,page*3+3).map(item=><tr key={item.id}><td><input type="checkbox" aria-label={'选择'+item.title} checked={selected.includes(item.id)} onChange={event=>setSelected(current=>event.target.checked?[...current,item.id]:current.filter(id=>id!==item.id))} /></td><td>{item.title}</td><td>{item.category}</td><td>{item.quantity}</td></tr>)}{!filtered.length?<tr><td colSpan={4}>没有符合条件的任务。</td></tr>:null}</tbody></table></div>
    <Pager page={page} pageSize={3} total={filtered.length} onChange={setPage} /><p className="aw-business-status" role="status">已选择 {selected.length} 项。</p>
  </BusinessDemo>;
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

功能目录来源：[DataTable](https://primereact.dev/docs/styled/components/datatable)。与原有目录的对照：此前没有独立可运行业务示例，规范和 CSS 不作为运行覆盖。

选型有疑问时返回 [数据与文件](../categories/data.md)，先比较最多 2–3 项。
