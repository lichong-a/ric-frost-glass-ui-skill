// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../../.upstream/src/ts-default/TextAnimations/VariableProximity/VariableProximity';
import { palette } from '../../shared/demo-support';
import { useRef } from "react";
import { useDemoConfig } from '../../parameters/DemoConfig';
// 真实字重和字宽插值依赖本地Roboto Flex可变字体；距离变化由容器ref计算。

export default function VariableProximityDemo() {
  const { props: demoProps } = useDemoConfig();
  const containerRef = useRef<HTMLDivElement>(null!);
  return (
    <div className="aw-demo-stage" style={{ width: '100%', height: 360, position: 'relative', overflow: 'hidden', color: palette.ink }}>
      <div ref={containerRef} style={{ position: 'relative', display: 'grid', placeItems: 'center', minHeight: 320, padding: 24 }}><Component label="Move closer. Find clarity." fromFontVariationSettings="'wght' 300, 'wdth' 80" toFontVariationSettings="'wght' 900, 'wdth' 120" containerRef={containerRef} radius={150} falloff="gaussian" style={{ fontFamily: 'Roboto Flex', fontSize: 50, color: palette.ink }} {...demoProps('t0')} /></div>
    </div>
  );
}
