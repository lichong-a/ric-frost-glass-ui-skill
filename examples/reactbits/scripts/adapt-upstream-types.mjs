// Type-only compatibility for the pinned component TypeScript sources.
// Official source bytes and their recorded hashes remain unchanged on disk.
// Pin: 2139cb3098d4fedc6264f13e50dcb4694224ba7c
export const upstreamTypeCompatibilityRules = [
  {
    path: '/src/ts-default/Animations/TargetCursor/TargetCursor.tsx',
    before: "(value && 'current' in value ? value.current : value) || null;",
    after: "(value && 'current' in value ? value.current : (value as HTMLElement | null)) || null;",
    reason: 'Express the existing ref/element guard result to TypeScript with strictNullChecks disabled.'
  },
  {
    path: '/src/ts-default/Components/AnimatedList/AnimatedList.tsx',
    before: "const entry: AnimatedListEntry = item !== null && typeof item === 'object' ? item : { title: item };",
    after: "const entry: AnimatedListEntry = item !== null && typeof item === 'object' ? item : { title: item as string };",
    reason: 'The public AnimatedListItem union contains only a string and an entry object.'
  },
  {
    path: '/src/ts-default/Components/GlassSurface/GlassSurface.tsx',
    before: "const outline = shape && art?.src === shape && !art.failed ? art : null;",
    after: "const outline = shape && art?.src === shape && !art.failed ? art as Exclude<ShapeArt, { failed: true }> : null;",
    reason: 'The existing failure guard selects successful artwork containing box, glow and line.'
  },
  {
    path: '/src/ts-default/TextAnimations/Shuffle/Shuffle.tsx',
    before: "const Tag = (tag || 'p') as keyof JSX.IntrinsicElements;",
    after: "const Tag = (tag || 'p') as keyof React.JSX.IntrinsicElements;",
    reason: 'React 19 exposes the JSX type namespace through the existing React import.'
  },
  {
    path: '/src/ts-default/TextAnimations/SplitFlapText/SplitFlapText.tsx',
    before: 'const cycleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);',
    after: 'const cycleTimerRef = useRef<number | null>(null);',
    reason: 'The implementation uses window.setTimeout; its timer is numeric even when Node build-tool types are loaded.'
  }
];

export function adaptUpstreamTypes(code, id) {
  if (code === undefined) return code;
  const path = id.replaceAll('\\', '/').split('?')[0];
  if (!path.includes('/.upstream/')) return code;
  const rule = upstreamTypeCompatibilityRules.find(rule => path.endsWith(rule.path));
  if (!rule) return code;
  if (code.split(rule.before).length !== 2) {
    throw new Error(`Pinned TypeScript compatibility context changed: ${rule.path}`);
  }
  return code.replace(rule.before, rule.after);
}
