import type { CSSProperties, ReactNode } from 'react';

// Canvas/WebGL color props consume resolved strings generated from the UI tokens.
export { palette } from './palette.generated';

export const MEDIA = Array.from({ length: 6 }, (_, index) => `${import.meta.env.BASE_URL}media/scene-${index + 1}.svg`);
export const LOGO = `${import.meta.env.BASE_URL}media/agent-wan-mark.svg`;
export const LABELS = ['山雾', '茶庭', '沙洲', '静水', '林间', '岩纹'];

export function DemoPanel({ children, title, style, className = '' }: { children?: ReactNode; title?: string; style?: CSSProperties; className?: string }) {
  return <section className={`aw-demo-panel ${className}`} style={style}>{title ? <h2>{title}</h2> : null}{children}</section>;
}

export function DemoNotice({ children }: { children: ReactNode }) {
  return <p className="aw-demo-notice" role="status" aria-live="polite">{children}</p>;
}

export function ExampleContent({ title = '自然色霜玻璃', description = '克制的颜色、清晰的内容与有节奏的交互。' }: { title?: string; description?: string }) {
  return <div className="aw-example-content"><span className="aw-example-mark" aria-hidden="true"/><h2>{title}</h2><p>{description}</p></div>;
}
