import { createRoot } from 'react-dom/client';
import { createPreviewRegistry } from './runtime/registry';
import { PreviewRuntime } from './runtime/PreviewRuntime';
import { entries } from './gallery-catalog';
import { loaders } from './demo-loaders';
import { loaders as businessLoaders } from './business/demo-loaders.generated';
import '../../../theme.css';
import './runtime/preview-runtime.css';
import './shared/demo.css';

const registry = createPreviewRegistry(entries, { ...loaders, ...businessLoaders });
createRoot(document.getElementById('root')!).render(<PreviewRuntime registry={registry} />);
