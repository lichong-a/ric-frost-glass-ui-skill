export type WorkItem = {id:string;title:string;category:string;quantity:number};
export type TreeItem = {key:string;label:string;children?:TreeItem[]};
export const workItems: WorkItem[] = [
  { id: 'a', title: '资料整理', category: '知识', quantity: 12 },
  { id: 'b', title: '合同校对', category: '文档', quantity: 8 },
  { id: 'c', title: '客户跟进', category: '服务', quantity: 20 },
  { id: 'd', title: '会议纪要', category: '文档', quantity: 6 },
  { id: 'e', title: '工单分配', category: '服务', quantity: 16 },
  { id: 'f', title: '技能归档', category: '知识', quantity: 9 },
];

export const workspaceTree: TreeItem[] = [{ key: 'workspace', label: '工作空间', children: [
  { key: 'agents', label: '智能体', children: [{ key: 'research', label: '资料助理' }, { key: 'service', label: '服务助理' }] },
  { key: 'skills', label: '技能', children: [{ key: 'writing', label: '文档写作' }, { key: 'search', label: '知识检索' }] },
] }];
