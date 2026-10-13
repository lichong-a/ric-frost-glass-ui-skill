// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/Components/AnimatedList/AnimatedList';
import { palette } from '../../shared/demo-support';
import { useState } from "react";
import { useDemoConfig } from '../../parameters/DemoConfig';
// 列表数量超过容器可视区，可验证入场、滚动与选择。

export default function AnimatedListDemo() {
  const { props: demoProps } = useDemoConfig();
  const [status, setStatus] = useState("滚动列表，点击或使用方向键选择");

  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 400, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div style={{ width: '100%', height: '100%' }}><div style={{ height: 330, width: 'min(100%, 460px)', margin: '0 auto', padding: 16 }}><Component items={Array.from({ length: 9 }, (_, index) => ({ title: '工作流 ' + (index + 1), description: ['资料检索', '代码审查', '报告整理'][index % 3], meta: (index + 1) + ' 项步骤' }))}
theme="light" animation="pop" accentColor={palette.primary} radius={16}
gap={8} width="100%" maxHeight={300} showGradients displayScrollbar frame
enableArrowNavigation onItemSelect={(_item, index) => setStatus('选中工作流 ' + (index + 1))} {...demoProps('t0')} /></div><p role="status" aria-live="polite" style={{ margin: '12px 20px', fontSize: 14, color: palette.muted }}>{status}</p></div>
    </div>
  );
}
