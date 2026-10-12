import { useState } from 'react';
import Component from '../../.upstream/src/ts-default/Backgrounds/AeroShards/AeroShards';
import { palette } from '../shared/demo-support';

/** Agent Wan natural-tone preset for the real Aero Shards component. */
export default function AeroShardsDemo() {
  const [error, setError] = useState<Error | null>(null);
  if (error) throw error; // The preview ErrorBoundary shows GPU runtime failures.
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          backgroundColor={palette.ink}
          shardColor={palette.sage}
          accentColor={palette.sand}
          material="pearl"
          detail="balanced"
          flow="stream"
          density={1.1}
          speed={0.5}
          spin={0.6}
          glow={0.4}
          bloom={0.12}
          grain={0.025}
          chromaticAberration={0}
          interaction="repel"
          onError={setError}
        />
      </div>
    </div>
  );
}
