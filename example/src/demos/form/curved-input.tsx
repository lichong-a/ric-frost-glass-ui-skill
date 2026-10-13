// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/CurvedInput/CurvedInput';
import { palette } from '../../shared/demo-support';
import { useState } from "react";
import { useDemoConfig, useDemoState } from '../../parameters/DemoConfig';
// 真实受控输入与提交回调，提供中文标签和结果反馈。

export default function CurvedInputDemo() {
  const { props: demoProps } = useDemoConfig();
  const [status, setStatus] = useState("弧形输入内容并提交，示例不会创建后台数据");
const [value, setValue] = useDemoState('state.value', '');
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ minHeight: 300, display: 'grid', placeItems: 'center', padding: 28 }}><Component value={value} onChange={setValue}
onSubmit={submitted => setStatus(submitted.trim() ? '已提交示例：' + submitted : '请先填写内容')}
placeholder="输入你的工作流名称" buttonText="创建" ariaLabel="工作流名称"
theme="light" bend={14} height={56} width="100%" cornerRadius={14}
backgroundColor={palette.ivory} textColor={palette.ink} placeholderColor={palette.muted}
borderColor={palette.sage} buttonColor={palette.primary} buttonTextColor={palette.ivory}
iconColor={palette.primary} shadowSize="sm" shadowColor={palette.sage} {...demoProps('t0')} /></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}
