// Authored integration demo; implementation is installed from the pinned official source.
import Component from '../../.upstream/src/ts-default/Components/ElasticSlider/ElasticSlider';
import { palette } from '../shared/demo-support';
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { Volume1, Volume2 } from "lucide-react";
// 使用ChakraProvider(defaultSystem)满足上游Icon上下文；此组件仅提供内部值，没有onChange Props，不伪造受控接口。

export default function ElasticSliderDemo() {
  
  return (
    <div className="aw-demo-stage" style={{ width: '100%', minHeight: 340, position: 'relative', display: 'grid', placeItems: 'center', padding: 24, color: palette.ink }}>
      <ChakraProvider value={defaultSystem}><style>{`.slider-container { color: #52604e; }.slider-range { background-color: #52604e; }.slider-track { background-color: #c3c8b8; }.value-indicator,.icon { color: #5c6259; }`}</style><div style={{ width: '100%', minHeight: 300, display: 'grid', placeItems: 'center', color: palette.ink }}><Component startingValue={0} defaultValue={45} maxValue={100} isStepped stepSize={5} leftIcon={<Volume1 size={22} />} rightIcon={<Volume2 size={22} />} /><p style={{ fontSize: 14, color: palette.muted }}>拖动滑块，观察两端弹性与组件内置数值</p></div></ChakraProvider>
    </div>
  );
}
