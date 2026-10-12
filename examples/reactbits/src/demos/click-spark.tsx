// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Animations/ClickSpark/ClickSpark';
import { palette } from '../shared/demo-support';
import { useState } from "react";
// 真实点击坐标产生粒子火花，按钮计数验证交互没有被覆盖层吞掉。
// 此演示使用Canvas；确保容器拥有非零宽高。

export default function ClickSparkDemo() {
  const [count, setCount] = useState(0);
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <Component sparkColor={palette.primary} sparkSize={7} sparkRadius={20}
sparkCount={7} duration={350} easing="ease-out"><div style={{ width: "100%", minHeight: 320, display: "grid", placeItems: "center" }}><button className="aw-button" data-variant="primary" type="button" onClick={() => setCount(value => value + 1)}>点击产生火花 · {count}</button></div></Component>
    </div>
  );
}
