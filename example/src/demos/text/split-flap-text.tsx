// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/TextAnimations/SplitFlapText/SplitFlapText';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

// 翻牌字符集采用英文和数字；业务状态另提供不依赖动效的可读文本。

export default function SplitFlapTextDemo() {
  const { props: demoProps } = useDemoConfig();
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink, fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 650, padding: 24 }}>
      <Component words={['AGENT RIC', 'FLOW READY', 'SKILL SYNC']}
flipDuration={0.12} stagger={0.035} cycleDelay={3200} charset="alphanumeric"
flipsPerChar={5} tileColor={palette.primary} textColor={palette.ivory}
tileRadius={10} gap={4} fontSize={32} loop padTo={10} {...demoProps('t0')} />
    </div>
  );
}
