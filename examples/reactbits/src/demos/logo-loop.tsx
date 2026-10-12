// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Animations/LogoLoop/LogoLoop';
import { palette } from '../shared/demo-support';

// 展示真实无缝循环和悬停暂停；标签为自有平台概念。

export default function LogoLoopDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink, fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 650, padding: 24 }}>
      <Component logos={['AGENT', 'MODEL', 'SKILL', 'FLOW', 'MEMORY'].map(label => ({ node: <span style={{ color: palette.primary, fontSize: 24, fontWeight: 650, letterSpacing: 2 }}>{label}</span>, title: label }))}
speed={65} direction="left" logoHeight={36} gap={42} hoverSpeed={0}
fadeOut fadeOutColor={palette.ivory} ariaLabel="平台能力标签循环展示" />
    </div>
  );
}
