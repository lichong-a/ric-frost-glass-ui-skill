import { useState } from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';
import Component from '../../../.upstream/src/ts-default/Components/SpotlightCard/SpotlightCard';
import styles from './spotlight-card.module.css';
import { useDemoConfig } from '../../parameters/DemoConfig';

export default function SpotlightCardDemo() {
  const { props: demoProps } = useDemoConfig();
  const [status, setStatus] = useState('移动指针，观察卡片表面与边缘的光。');
  return (
    <div className={styles.stage} data-visual-demo="spotlight-card">
      <Component theme="dark" spotlightColor="#a4e6c8" intensity={0.28}
        spotlightSize={280} softness={0.7} shape="circle" borderGlow={0.8}
        proximity={100} smoothing={0.3} grain={0.06} ambient={false} flare
        style={{ width: 'min(100%, 380px)', minHeight: 280, padding: 32, borderRadius: 24, color: '#e7f2ec' }} {...demoProps('t0')}>
        <span className={styles.icon}><Layers size={24} strokeWidth={1.5} /></span>
        <h3 className={styles.title}>知识检索工作流</h3>
        <p className={styles.description}>把分散的资料连接起来，构建可重复执行的知识检索流程。</p>
        <button type="button" className={styles.action} onClick={() => setStatus('工作流运行按钮已点击。')} {...demoProps('t1')}>
          运行示例 <ArrowUpRight size={16} aria-hidden="true" />
        </button>
      </Component>
      <p className={styles.hint} role="status" aria-live="polite">{status}</p>
    </div>
  );
}
