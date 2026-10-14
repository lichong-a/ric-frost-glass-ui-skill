import Component from '../../../.upstream/src/ts-default/Backgrounds/Dither/Dither';
import { palette } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

function toRgb(hex: string): [number, number, number] {
  return [
    Number.parseInt(hex.slice(1, 3), 16) / 255,
    Number.parseInt(hex.slice(3, 5), 16) / 255,
    Number.parseInt(hex.slice(5, 7), 16) / 255,
  ];
}

/** Agent Ric natural-tone preset for the real Dither component. */
export default function DitherDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          waveColor={toRgb(palette.sage)}
          backgroundColor={toRgb(palette.ink)}
          palette={[palette.ink, palette.primary, palette.sage, palette.ivory]}
          waveSpeed={0.035}
          waveFrequency={3}
          waveAmplitude={0.25}
          colorNum={4}
          pixelSize={3}
          ditherMode="bayer"
          enableMouseInteraction
          mouseEffect="ripple"
          mouseStrength={0.6}
          clickRipple {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
