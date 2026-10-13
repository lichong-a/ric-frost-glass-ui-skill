import {useEffect,useState} from 'react';
export const controlSpring = { type: 'spring' as const, stiffness: 440, damping: 28, mass: 0.7 };

export function useBusinessReducedMotion() {
  const read = () => {
    if (typeof window === 'undefined') return true;
    const mode = document.querySelector<HTMLElement>('.aw-preview-runtime')?.dataset.motion;
    return mode ? mode === 'reduce' : window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };
  const [reduced, setReduced] = useState(read);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(read());
    const observer = new MutationObserver(update);
    const runtime = document.querySelector('.aw-preview-runtime');
    if (runtime) observer.observe(runtime, { attributes: true, attributeFilter: ['data-motion'] });
    media.addEventListener('change', update);
    update();
    return () => { observer.disconnect(); media.removeEventListener('change', update); };
  }, []);
  return reduced;
}
