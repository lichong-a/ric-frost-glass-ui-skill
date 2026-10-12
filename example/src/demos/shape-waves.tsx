import { useState } from 'react';
import Component from '../../.upstream/src/ts-default/Backgrounds/ShapeWaves/ShapeWaves';
import { palette } from '../shared/demo-support';

/** Agent Wan natural-tone preset for the real Shape Waves component. */
export default function ShapeWavesDemo() {
  const [error, setError] = useState<Error | null>(null);
  if (error) throw error; // The preview ErrorBoundary shows GPU runtime failures.
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          text="AGENT WAN"
          fontFamily="system-ui, sans-serif"
          fontWeight={600}
          textSize={0.5}
          shapes="mixed"
          cellSize={11}
          color={palette.sage}
          hoverColor={palette.ivory}
          backgroundColor={palette.ink}
          speed={0.55}
          glow={0.16}
          contrast={1.1}
          interactive
          onError={setError}
        />
      </div>
    </div>
  );
}
