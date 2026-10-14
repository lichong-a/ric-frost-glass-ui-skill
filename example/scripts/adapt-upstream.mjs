// Application-only integration transforms. Original cached source hashes stay intact.
// These transforms are small, explicit, and version-locked by upstream-manifest.json.
function replaceLocked(source, before, after, component) {
  if (source.split(before).length !== 2) throw new Error(`${component} integration patch no longer matches the locked version.`);
  return source.replace(before, after);
}

export function adaptUpstream(code, id, { base = '/' } = {}) {
  const file = id.split('?')[0].replaceAll('\\', '/');
  if (!file.includes('/.upstream/')) return null;
  const assetUrl = relative => `${base.endsWith('/') ? base : base + '/'}${relative.replace(/^\/+/, '')}`;
  let changed = code;
  if (file.endsWith('/LogoLoop/LogoLoop.css')) {
    // The official site supplies a list preflight. Supply that missing base
    // only to this component's own list instead of resetting every gallery ul.
    changed = replaceLocked(changed, '.logoloop__list {\n  display: flex;',
      '.logoloop__list {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;', 'LogoLoop');
  }
  if (file.endsWith('/ScrambledText/ScrambledText.tsx')) {
    // Keep word boundaries when SplitText creates individually animated chars.
    // The character refs and scrambling algorithm retain their original API.
    changed = replaceLocked(changed, "type: 'chars',\n      charsClass: 'char'",
      "type: 'words,chars',\n      charsClass: 'char'", 'ScrambledText');
  }
  if (file.endsWith('/GridScan/GridScan.tsx')) {
    const before = 'useEffect(() => {\n    let canceled = false;\n    const load = async () => {';
    changed = replaceLocked(changed, before, 'useEffect(() => {\n    if (!enableWebcam) return;\n    let canceled = false;\n    const load = async () => {', 'GridScan');
    changed = replaceLocked(changed, '}, [modelsPath]);', '}, [modelsPath, enableWebcam]);', 'GridScan');
    // The disabled webcam branch must not even download the face-api module.
    if (changed.includes("import * as faceapi from 'face-api.js';")) {
      changed = replaceLocked(changed, "import * as faceapi from 'face-api.js';", '', 'GridScan');
      changed = replaceLocked(changed, 'const videoRef = useRef<HTMLVideoElement | null>(null);',
        "const videoRef = useRef<HTMLVideoElement | null>(null);\n  const faceApiRef = useRef<typeof import('face-api.js') | null>(null);", 'GridScan');
      changed = replaceLocked(changed, 'if (!enableWebcam) return;\n    let canceled = false;',
        'setModelsReady(false);\n    if (!enableWebcam) return;\n    let canceled = false;', 'GridScan');
      changed = replaceLocked(changed, 'try {\n        await Promise.all([\n          faceapi.nets.tinyFaceDetector.loadFromUri(modelsPath),',
        "try {\n        const faceapi = await import('face-api.js');\n        if (canceled) return;\n        await Promise.all([\n          faceapi.nets.tinyFaceDetector.loadFromUri(modelsPath),", 'GridScan');
      changed = replaceLocked(changed, 'if (!canceled) setModelsReady(true);',
        'if (!canceled) { faceApiRef.current = faceapi; setModelsReady(true); }', 'GridScan');
      changed = replaceLocked(changed, 'if (!enableWebcam || !modelsReady) return;',
        'const faceapi = faceApiRef.current;\n      if (!enableWebcam || !modelsReady || !faceapi) return;', 'GridScan');
      changed = replaceLocked(changed, 'video.srcObject = stream;\n        await video.play();',
        'if (stop) { stream.getTracks().forEach(track => track.stop()); return; }\n        video.srcObject = stream;\n        await video.play();\n        if (stop) return;', 'GridScan');
      changed = replaceLocked(changed, "if ('requestVideoFrameCallback' in HTMLVideoElement.prototype)",
        "if (stop) return;\n        if ('requestVideoFrameCallback' in HTMLVideoElement.prototype)", 'GridScan');
    }
  }
  if (file.endsWith('/MaskedHeading/MaskedHeading.tsx')) {
    // Changing text geometry inside ResizeObserver delivers another layout
    // notification in the same frame. Defer the update to the next frame.
    changed = replaceLocked(changed, 'const ro = new ResizeObserver(sync);',
      'let resizeRaf = 0;\n    const ro = new ResizeObserver(() => {\n      cancelAnimationFrame(resizeRaf);\n      resizeRaf = requestAnimationFrame(sync);\n    });', 'MaskedHeading');
    changed = replaceLocked(changed, 'cancelAnimationFrame(raf);\n      ro.disconnect();',
      'cancelAnimationFrame(raf);\n      cancelAnimationFrame(resizeRaf);\n      ro.disconnect();', 'MaskedHeading');
  }
  if (file.endsWith('/VariableProximity/VariableProximity.css')) {
    changed = changed.replace(/@import\s+url\([^;]*fonts\.googleapis\.com[^;]*\);?/g, '');
  }
  if (file.endsWith('/MagicBento/MagicBento.tsx')) {
    const pattern = /const cardData: BentoCardProps\[\] = \[[\s\S]*?\n\];/;
    if (!pattern.test(changed)) throw new Error('MagicBento data integration no longer matches the locked version.');
    const cards = [
      ['技能总览', '每项技能都有清晰的职责与使用入口。', '概览'],
      ['工作空间', '将相关内容安放在同一处。', '组织'],
      ['自然色材质', '茶绿、暖灰与米白形成柔和层次。', '视觉'],
      ['交互节奏', '局部反馈帮助理解当前操作。', '动效'],
      ['组件组合', '使用独立示例搭建自己的界面。', '构建'],
      ['阅读与聚焦', '让主要信息保持清楚可读。', '内容'],
    ].map(([title, description, label]) => ({ color: 'var(--aw-surface-control)', title, description, label }));
    changed = changed.replace(pattern, `const cardData: BentoCardProps[] = ${JSON.stringify(cards, null, 2)};`);
  }
  if (file.endsWith('/FluidGlass/FluidGlass.tsx')) {
    if (changed.split('useGLTF(glb)').length !== 2 || changed.split('<Text\n').length !== 3) {
      throw new Error('FluidGlass resource integration no longer matches the locked version.');
    }
    changed = changed.replace('useGLTF(glb)', `useGLTF(glb, ${JSON.stringify(assetUrl('assets/draco/'))})`)
      .replaceAll('<Text\n', `<Text font=${JSON.stringify(assetUrl('assets/fonts/RobotoFlex.ttf'))}\n`)
      .replace('      React Bits\n', '      Agent Ric\n');
  }
  // Replace upstream's stock image defaults with authored, local demonstration media.
  // Props supplied by an individual wrapper remain the first choice.
  changed = changed.replace(/(['"`])(https:\/\/(?:images\.unsplash\.com|images\.pexels\.com|picsum\.photos)\/[^\s'"`<>)]*)\1/g, (_match, _quote, url) => {
    let number=0; for (const character of url) number=(number+character.charCodeAt(0))%6;
    return JSON.stringify(assetUrl(`media/scene-${number+1}.svg`));
  });
  // Local upstream GLB defaults and other public resources share Vite's base.
  if (base !== '/') {
    changed = changed.replace(/(['"`])(\/(?:assets|media)\/[^\s'"`<>)]*)\1/g,
      (_match, _quote, relative) => JSON.stringify(assetUrl(relative)));
  }
  return changed === code ? null : changed;
}
