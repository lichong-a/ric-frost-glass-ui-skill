// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/TextAnimations/TextType/TextType';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

// 展示中文打字、停留与删除循环。

export default function TextTypeDemo() {
  const { props: demoProps } = useDemoConfig();
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink, fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 650, padding: 24 }}>
      <Component text={['整理技能与工具', '编排多智能体工作流', 'Agent Ric · 自然有序']}
typingSpeed={85} deletingSpeed={45} pauseDuration={2000} showCursor
cursorCharacter="▏" textColors={[palette.ink, palette.primary, palette.muted]} {...demoProps('t0')} />
    </div>
  );
}
