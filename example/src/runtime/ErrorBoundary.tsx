import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  componentName: string;
  onError?: (error: Error, info: ErrorInfo) => void;
  onRetry: () => void;
};

type State = { error: Error | null };

export class PreviewErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    return (
      <section className="aw-preview-fallback" role="alert">
        <p className="aw-preview-eyebrow">预览未能运行</p>
        <h2>{this.props.componentName}</h2>
        <p>组件加载或执行时发生错误。重新加载只会重启本次预览。</p>
        <button type="button" className="aw-preview-button" onClick={this.props.onRetry}>
          重新加载组件
        </button>
        <details>
          <summary>错误详情</summary>
          <pre>{error.message}</pre>
        </details>
      </section>
    );
  }
}
