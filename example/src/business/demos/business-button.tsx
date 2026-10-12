import { useState } from 'react';
import { BusinessDemo, Button } from '../support';

// 场景：执行明确动作，区分普通、次要、危险和禁用状态。
export default function ButtonDemo() {
  const [count, setCount] = useState(0);
  return <BusinessDemo title="Button · 动作按钮" description="动作真实更新本地状态，禁用项不能触发。"><div className="aw-business-row"><Button onClick={() => setCount(value => value+1)}>记录一次操作</Button><Button variant="secondary" onClick={() => setCount(0)}>重置</Button><Button variant="danger" onClick={() => setCount(0)}>清空本地记录</Button><Button disabled>暂不可用</Button></div><p className="aw-business-status" role="status">已记录 {count} 次</p></BusinessDemo>;
}
