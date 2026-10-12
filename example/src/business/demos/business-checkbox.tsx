import { useState, useId } from 'react';
import { BusinessDemo } from '../support';

// 场景：独立布尔选项；完成任务动效可选择已有 Spring Check。
export default function CheckboxDemo() {
  const id = useId(); const [checked, setChecked] = useState(false);
  return <BusinessDemo title="Checkbox · 复选框" description="独立选项允许开关，选中状态由调用方维护。"><label className="aw-business-choice"><input id={id} type="checkbox" checked={checked} onChange={event => setChecked(event.target.checked)} />接收任务完成通知</label><p className="aw-business-status" role="status">通知：{checked ? '开启' : '关闭'}</p></BusinessDemo>;
}
