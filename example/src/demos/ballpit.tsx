import Component from '../../.upstream/src/ts-default/Backgrounds/Ballpit/Ballpit';
import { palette } from '../shared/demo-support';

const ballColors = [palette.primary, palette.sage, palette.sand, palette.ivory].map(color => Number.parseInt(color.slice(1), 16));

/** Agent Wan natural-tone preset for the real Ballpit component. */
export default function BallpitDemo() {
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          colors={ballColors}
          count={60}
          gravity={0.4}
          friction={0.996}
          minSize={0.35}
          maxSize={0.75}
          ambientColor={Number.parseInt(palette.ivory.slice(1), 16)}
          ambientIntensity={1}
          lightIntensity={80}
          materialParams={{ metalness: 0.15, roughness: 0.65, clearcoat: 0.35, clearcoatRoughness: 0.6 }}
          followCursor
        />
      </div>
    </div>
  );
}
