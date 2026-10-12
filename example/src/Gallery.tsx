import { useEffect, useMemo, useRef, useState } from 'react';
import { categories, entries } from './gallery-catalog';
import { IsolatedPreview } from './runtime/IsolatedPreview';
import type { MotionMode } from './runtime/types';

const usageFiles = import.meta.glob(['./demos/*.tsx', './business/demos/*.tsx'], { query: '?raw', import: 'default' });
const guideFiles = import.meta.glob(['../docs/components/*.md', '../docs/business/components/*.md'], { query: '?raw', import: 'default' });
const initialEntry = () => entries.find(entry => entry.id === window.location.hash.slice(1))?.id ?? 'glass-surface';
const subtitleFor = (item: (typeof entries)[number]) => item.subtitle ?? item.aliases[0];
type View = 'preview' | 'code' | 'guide';

function Icon({ name }: { name: 'search' | 'pause' | 'play' | 'copy' }) {
  const paths = { search: 'm21 21-4.4-4.4M19 10.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0', pause: 'M8 5v14M16 5v14', play: 'm8 5 11 7-11 7z', copy: 'M9 9h12v12H9zM15 9V3H3v12h6' };
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}

export function Gallery() {
  const [selected, setSelected] = useState(initialEntry);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [view, setView] = useState<View>('preview');
  const [active, setActive] = useState(true);
  const [motion, setMotion] = useState<MotionMode>('system');
  const [text, setText] = useState('');
  const [textState, setTextState] = useState('');
  const [copied, setCopied] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const entry = entries.find(item => item.id === selected)!;
  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return entries.filter(item => (category === 'all' || item.category === category) &&
      (!needle || [item.name, item.id, item.description, ...item.aliases].join(' ').toLocaleLowerCase().includes(needle)));
  }, [category, query]);
  const position = entries.findIndex(item => item.id === selected);

  useEffect(() => {
    const update = () => { setSelected(initialEntry()); setCopied(''); };
    const search = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); searchRef.current?.focus(); }
    };
    window.addEventListener('hashchange', update);
    window.addEventListener('keydown', search);
    return () => { window.removeEventListener('hashchange', update); window.removeEventListener('keydown', search); };
  }, []);

  useEffect(() => {
    document.title = `${entry.name} · Agent Wan 组件示例`;
    if (view === 'preview') return;
    let cancelled = false;
    setText(''); setTextState('正在读取…');
    const loader = view === 'code' ? usageFiles[`./${entry.demoPath.replace(/^src\//, '')}`] : guideFiles[`../${entry.guidePath ?? `docs/components/${entry.id}.md`}`];
    if (!loader) { setTextState('当前文件未包含在本次构建中，请在完整规范包中查看。'); return; }
    loader().then(value => { if (!cancelled) { setText(String(value)); setTextState(''); } }).catch(() => { if (!cancelled) setTextState('读取失败，请切换后重试。'); });
    return () => { cancelled = true; };
  }, [entry, view]);

  function select(id: string) {
    if (id !== selected) window.location.hash = id;
    setSelected(id); setCopied(''); setActive(true);
  }
  async function copy(value: string) {
    try { await navigator.clipboard.writeText(value); setCopied('已复制'); }
    catch { setCopied('复制未成功，请选择文本后手动复制'); }
  }

  return <div className="aw-gallery">
    <a className="aw-skip" href="#example" onClick={event => {
      event.preventDefault();
      const workspace = document.getElementById('example');
      workspace?.focus({ preventScroll: true });
      workspace?.scrollIntoView({ block: 'start' });
    }}>跳到组件示例</a>
    <header className="aw-gallery-header aw-glass" data-material="frame">
      <a className="aw-gallery-brand" href="#glass-surface" onClick={() => select('glass-surface')} aria-label="Agent Wan 组件示例首页">
        <img src={`${import.meta.env.BASE_URL}media/agent-wan-mark.svg`} alt="" width="34" height="34" />
        <span>Agent Wan<span className="aw-brand-caption">自然色霜玻璃 · 组件示例</span></span>
      </a>
      <div className="aw-header-end"><span className="aw-release">{entries.length} 个组件 · v1.1</span></div>
    </header>

    <div className="aw-gallery-body">
      <aside className="aw-library-sidebar aw-glass" aria-label="组件目录">
        <div className="aw-sidebar-heading"><p>COMPONENT LIBRARY</p><span>{entries.length}</span></div>
        <label className="aw-library-search"><Icon name="search" /><span className="aw-sr-only">搜索组件名称、效果或中文意图</span><input ref={searchRef} value={query} onChange={event => setQuery(event.target.value)} placeholder="搜索组件、效果…" type="search" /><kbd>⌘ K</kbd></label>
        <nav className="aw-category-filters" aria-label="组件类别">
          <button type="button" aria-pressed={category === 'all'} onClick={() => setCategory('all')}>全部组件<span>{entries.length}</span></button>
          {categories.map(item => <button type="button" key={item.id} aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>{item.name}<span>{item.count}</span></button>)}
        </nav>
        <div className="aw-results-heading"><span>目录</span><span role="status" aria-live="polite">{filtered.length} 项</span></div>
        <nav className="aw-component-list" aria-label="匹配的组件">
          {filtered.length ? filtered.map(item => <button className="aw-component-link" key={item.id} type="button" aria-current={item.id === entry.id ? 'page' : undefined} onClick={() => select(item.id)}><span className="aw-list-dot" aria-hidden="true" /><span><strong>{item.name}</strong><small>{subtitleFor(item)}</small></span><span className="aw-list-arrow" aria-hidden="true">↗</span></button>) : <div className="aw-no-results"><p>没有找到对应组件</p><button className="aw-button" data-variant="secondary" type="button" onClick={() => { setQuery(''); setCategory('all'); }}>清除筛选</button></div>}
        </nav>
        <div className="aw-sidebar-footer"><span className="aw-status-dot" />按需加载 · 独立预览</div>
      </aside>

      <main id="example" className="aw-example-workspace" tabIndex={-1}>
        <div className="aw-page-eyebrow"><span>DESIGN / INTERACTION</span><span>{String(position + 1).padStart(3, '0')} / {entries.length}</span></div>
        <section className="aw-selected-heading">
          <div><p className="aw-selected-category">{categories.find(item => item.id === entry.category)?.name}</p><h1>{entry.name}</h1><p className="aw-effect-description">{entry.description}</p></div>
          <div className="aw-neighbor-controls"><button className="aw-icon-button" type="button" aria-label="上一个组件" disabled={position === 0} onClick={() => select(entries[position - 1].id)}>←</button><button className="aw-icon-button" type="button" aria-label="下一个组件" disabled={position === entries.length - 1} onClick={() => select(entries[position + 1].id)}>→</button></div>
        </section>
        <div className="aw-example-meta"><span>{entry.aliases[0]}</span><span>TypeScript + CSS</span><span>{entry.id.startsWith('business-') ? '业务交互' : entry.webgl === 'none' ? 'DOM / Canvas' : entry.webgl.toUpperCase()}</span><span>自然色主题</span></div>

        <section className="aw-example-card aw-glass">
          <div className="aw-example-controls">
            <div className="aw-example-tabs" role="tablist" aria-label="组件内容">
              {([['preview', '交互预览'], ['code', '用法源码'], ['guide', '接入说明']] as const).map(([id, label], index, all) => <button id={`tab-${id}`} key={id} type="button" role="tab" aria-selected={view === id} aria-controls={`panel-${id}`} tabIndex={view === id ? 0 : -1} onClick={() => setView(id)} onKeyDown={event => { if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) { event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? all.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + all.length) % all.length; setView(all[next][0]); document.getElementById(`tab-${all[next][0]}`)?.focus(); } }}>{label}</button>)}
            </div>
            {view === 'preview' ? <div className="aw-playback-controls"><select aria-label="动态效果偏好" value={motion} onChange={event => setMotion(event.target.value as MotionMode)}><option value="system">跟随系统动效</option><option value="reduce">减少动态效果</option><option value="allow">允许本次动效</option></select><button type="button" className="aw-icon-button" aria-label={active ? '暂停预览并释放资源' : '继续预览'} onClick={() => setActive(value => !value)}><Icon name={active ? 'pause' : 'play'} /></button></div> : <button className="aw-copy-button" type="button" disabled={!text} onClick={() => copy(text)}><Icon name="copy" />复制</button>}
          </div>
          <div className="aw-example-content-panel" id={`panel-${view}`} role="tabpanel" aria-labelledby={`tab-${view}`} tabIndex={0}>
            {view === 'preview' ? <IsolatedPreview entry={entry} previewUrl={`${import.meta.env.BASE_URL}preview.html`} motion={motion} active={active} /> : <div className="aw-source-view">{textState ? <p role="status">{textState}</p> : <pre className={view === 'guide' ? 'aw-guide-text' : ''}><code>{text}</code></pre>}</div>}
          </div>
          <div className="aw-example-footer"><span>{view === 'preview' ? '在预览区域内移动、点击或滚动，体验当前组件。' : entry.demoPath}</span></div>
        </section>

        <section className="aw-integration-grid" aria-label="组件集成信息">
          <article className="aw-detail-card aw-glass"><span className="aw-section-number">01</span><h2>带入你的界面</h2><p>从当前示例保留结构、Props 和交互，将内容替换为产品数据。颜色与材质继续使用 Agent Wan tokens。</p><button type="button" onClick={() => setView('code')}>查看独立用法 <span aria-hidden="true">↗</span></button></article>
          <article className="aw-detail-card aw-glass"><span className="aw-section-number">02</span><h2>按需交给 Agent</h2><p>Skill 先读取核心视觉规则，再定位当前组件文档；只继续加载该组件需要的规范章节与源文件。</p><button type="button" onClick={() => copy(`使用 Agent Wan 自然色霜玻璃规范实现 ${entry.name}。先查询 ${entry.id} 对应组件指南，再读取必要的 token、契约和示例文件，保留该组件的关键交互。`)}>复制 Agent 指令 <span aria-hidden="true">↗</span></button></article>
          <article className="aw-detail-card aw-glass"><span className="aw-section-number">03</span><h2>使用边界</h2><p>只接入当前任务需要的组件。保留真实数据、状态与操作，必要时提供减少动效、错误提示和恢复入口。</p></article>
        </section>
        <p className="aw-gallery-footnote">演示采用本地素材与本地状态。摄像头组件由明确操作开启；模拟语音与任务状态会在示例中标注。</p>
        <span className="aw-copy-status" role="status" aria-live="polite">{copied}</span>
      </main>
    </div>
  </div>;
}
