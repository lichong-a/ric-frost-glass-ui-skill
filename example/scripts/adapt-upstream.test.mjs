import assert from 'node:assert/strict';
import { test } from 'node:test';
import { adaptUpstream } from './adapt-upstream.mjs';

const gridScan = `const prefix = 'unchanged';
useEffect(() => {
    let canceled = false;
    const load = async () => {
      await loadModel(modelsPath);
    };
    void load();
    return () => { canceled = true; };
  }, [modelsPath]);
const suffix = 'unchanged';`;

test('GridScan model setup is guarded by the real enableWebcam setting', () => {
  const transformed = adaptUpstream(gridScan, '/project/.upstream/src/ts-default/Backgrounds/GridScan/GridScan.tsx');
  assert.ok(transformed);
  assert.ok(transformed.indexOf('if (!enableWebcam) return;') < transformed.indexOf('const load = async'));
  assert.match(transformed, /\[modelsPath, enableWebcam\]/);
  assert.match(transformed, /const prefix = 'unchanged'/);
  assert.match(transformed, /const suffix = 'unchanged'/);
  assert.equal((transformed.match(/if \(!enableWebcam\) return;/g) || []).length, 1);
});

test('GridScan locked patch fails visibly when its expected source no longer matches', () => {
  assert.throws(() => adaptUpstream('useEffect(() => { differentVersion(); }, []);', '/project/.upstream/GridScan/GridScan.tsx'), /no longer matches/);
});

test('MagicBento replaces only its locked demonstration data with natural-tone content', () => {
  const source = `type BentoCardProps = { title: string; description: string; label: string; color: string };\nconst cardData: BentoCardProps[] = [\n  { title: 'OLD TITLE', description: 'old', label: 'old', color: '#f00' }\n];\nexport const spacing = 24;`;
  const transformed = adaptUpstream(source, '/p/.upstream/Components/MagicBento/MagicBento.tsx');
  assert.doesNotMatch(transformed, /OLD TITLE/);
  assert.match(transformed, /技能总览/);
  assert.match(transformed, /var\(--aw-surface-control\)/);
  assert.equal((transformed.match(/"title":/g) || []).length, 6);
  assert.match(transformed, /export const spacing = 24;/);
  assert.match(transformed, /type BentoCardProps =/);
});

test('MagicBento locked data patch rejects an incompatible upstream version', () => {
  assert.throws(() => adaptUpstream('const differentData = [];', '/p/.upstream/Components/MagicBento/MagicBento.tsx'), /no longer matches/);
});

test('FluidGlass uses local Draco and font assets while preserving its two text nodes', () => {
  const source = `const model = useGLTF(glb);\nconst content = (<><Text\n position={[0, 0, 0]}>\n      React Bits\n</Text><Text\n position={[0, 1, 0]}>Other label</Text></>);\nconst quality = 0.8;`;
  const transformed = adaptUpstream(source, '/p/.upstream/Components/FluidGlass/FluidGlass.tsx');
  assert.match(transformed, /useGLTF\(glb, "\/assets\/draco\/"\)/);
  assert.equal((transformed.match(/<Text font="\/assets\/fonts\/RobotoFlex\.ttf"/g) || []).length, 2);
  assert.match(transformed, /Agent Ric/);
  assert.match(transformed, /Other label/);
  assert.match(transformed, /const quality = 0.8;/);
});

test('FluidGlass resource integration fails on changed GLTF or text structure', () => {
  assert.throws(() => adaptUpstream('const model = useGLTF(changedPath);\n<Text>one</Text>', '/p/.upstream/Components/FluidGlass/FluidGlass.tsx'), /no longer matches/);
});

test('source identifiers tolerate Windows separators and Vite query suffixes', () => {
  const transformed = adaptUpstream(gridScan, 'C:\\project\\.upstream\\Backgrounds\\GridScan\\GridScan.tsx?import');
  assert.match(transformed, /if \(!enableWebcam\) return;/);
});

test('only the component-specific Google font import is stripped; CSS rules remain', () => {
  const lockedFormat = '@import url("https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap");\n@import url("./local-fonts.css");\n.variable { font-weight: 500; color: #123456; }';
  const transformed = adaptUpstream(lockedFormat, '/p/.upstream/VariableProximity/VariableProximity.css');
  assert.doesNotMatch(transformed, /fonts\.googleapis\.com/);
  assert.match(transformed, /@import url\("\.\/local-fonts\.css"\)/);
  assert.match(transformed, /font-weight: 500; color: #123456/);
  assert.equal(adaptUpstream(lockedFormat, '/p/.upstream/Other/Other.css'), null);
});

test('stock default images resolve to authored local assets consistently', () => {
  const source = `const a = 'https://images.unsplash.com/photo-123?w=640&fit=crop';\nconst b = "https://images.pexels.com/photos/1234/img.jpg";\nconst c = \`https://picsum.photos/500/600\`;\nconst docs = 'https://reactbits.dev/components/glass-surface';`;
  const transformed = adaptUpstream(source, '/p/.upstream/Components/Card/Card.tsx');
  assert.equal((transformed.match(/\/media\/scene-[1-6]\.svg/g) || []).length, 3);
  assert.doesNotMatch(transformed, /images\.unsplash|images\.pexels|picsum\.photos/);
  assert.match(transformed, /https:\/\/reactbits\.dev\/components\/glass-surface/);
  assert.equal(transformed, adaptUpstream(source, '/p/.upstream/Components/Card/Card.tsx'));
});

test('unrelated files and unrelated official source are not rewritten', () => {
  const source = `const image = 'https://images.unsplash.com/photo-example';`;
  assert.equal(adaptUpstream(source, '/project/src/demos/card.tsx'), null);
  assert.equal(adaptUpstream(gridScan, '/project/src/GridScan/GridScan.tsx'), null);
  const unrelated = 'export function example(value) { return value + 1; }';
  assert.equal(adaptUpstream(unrelated, '/project/.upstream/Components/Card/Card.tsx'), null);
});
