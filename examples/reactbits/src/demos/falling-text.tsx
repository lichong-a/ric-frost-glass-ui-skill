// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/TextAnimations/FallingText/FallingText';
import { palette } from '../shared/demo-support';

// 点击让单词进入物理模拟；拖动单词后等待恢复。

export default function FallingTextDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component text="Good ideas need room to fall and rise again"
highlightWords={['ideas', 'rise']} trigger="click" split="words" gravity={0.7}
bounciness={0.4} scatter={0.4} draggable restoreDelay={3}
fontSize="1.7rem" accentColor={palette.primary} theme="light"
backgroundColor={palette.ivory} />
    </div>
  );
}
