import Component from '../../../.upstream/src/ts-default/Backgrounds/GridMotion/GridMotion';
import { palette, MEDIA } from '../../shared/demo-support';
import { useDemoConfig } from '../../parameters/DemoConfig';

const items = [...MEDIA.map((src, index) => ({ src, alt: `自然色场景 ${index + 1}` })), 'AGENT RIC', '技能编排', '知识检索', '工作空间'];

/** Agent Ric natural-tone preset for the real Grid Motion component. */
export default function GridMotionDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <div className="aw-demo-stage" data-layout="full" data-canvas="dark">
      <div style={{ width: '100%', height: 560, position: 'relative' }}>
        <Component
          items={items}
          rows={4}
          speed={16}
          radius={20}
          angle={-8}
          gap={16}
          dim={0.2}
          spotlight={0.25}
          fade={0.5}
          tileColor={palette.primary}
          textColor={palette.ivory}
          theme="dark" {...demoProps('t0')}
        />
      </div>
    </div>
  );
}
