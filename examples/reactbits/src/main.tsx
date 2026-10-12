import { createRoot } from 'react-dom/client';
import { Gallery } from './Gallery';
import '../../../theme.css';
import './gallery.css';
import './runtime/preview-runtime.css';

// Individual third-party effects are isolated in preview.html, not mounted here.
createRoot(document.getElementById('root')!).render(<Gallery />);
