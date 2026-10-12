import Component from '../../.upstream/src/ts-default/Backgrounds/LiquidChrome/LiquidChrome';
import { palette } from '../shared/demo-support';

function toRgb(hex: string): [number, number, number] {
  return [
    Number.parseInt(hex.slice(1, 3), 16) / 255,
    Number.parseInt(hex.slice(3, 5), 16) / 255,
    Number.parseInt(hex.slice(5, 7), 16) / 255,
  ];
}

/** Agent Wan natural-tone preset for the real Liquid Chrome component. */
export default function LiquidChromeDemo() {
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          baseColor={toRgb(palette.primary)}
          speed={0.12}
          amplitude={0.22}
          frequencyX={2.4}
          frequencyY={3.1}
          interactive
        />
      </div>
    </div>
  );
}
