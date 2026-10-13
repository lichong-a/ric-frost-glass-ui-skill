import { componentClasses } from '../../class-names';
import { useState } from 'react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Field } from '../../components/Field';
import { workItems } from '../../data';
import { Pager } from '../../components/Pager';
import { AnimatedSelect } from '../../components/AnimatedSelect';
import { useDemoConfig, useDemoState } from '../../../parameters/DemoConfig';

const ownedStyles={};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function BusinessPaginatorDemo() {
  const { props: demoProps } = useDemoConfig();
  const [page,setPage]=useDemoState('state.page', 0); const [size,setSize]=useDemoState('state.size', 2);
  return <BusinessDemo title="Paginator" description="分页浏览本地记录，页容量改变时回到第一页。">
    <Field label="每页数量" {...demoProps('t0')}><AnimatedSelect label="每页数量" value={String(size)} onChange={value=>{setSize(Number(value));setPage(0);}} options={[{value:"2",label:"2 项"},{value:"3",label:"3 项"}]} {...demoProps('t1')} /></Field><ul>{workItems.slice(page*size,page*size+size).map(item=><li key={item.id}>{item.title}</li>)}</ul><Pager page={page} pageSize={size} total={workItems.length} onChange={setPage} {...demoProps('t2')} />
  </BusinessDemo>;
}
