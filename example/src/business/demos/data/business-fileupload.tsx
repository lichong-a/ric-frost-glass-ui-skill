import { useId, useRef, useState, type DragEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, FileText, Image as ImageIcon, Upload, X } from 'lucide-react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Button } from '../../components/Button';
import { useBusinessReducedMotion } from '../../motion-preference';
import { LOCAL_FILE_LIMIT, localFileKey, selectLocalFiles } from '../../components/local-file-selection';
import styles from '../../components/FileUpload.module.css';
import { useDemoConfig } from '../../../parameters/DemoConfig';

export default function BusinessFileUploadDemo() {
  const { props: demoProps } = useDemoConfig();
  const [selection, setSelection] = useState<{ files: File[]; message: string; hasWarnings: boolean }>({
    files: [], message: '请选择文件，每项最多 1 MiB、总数最多 5 项。', hasWarnings: false,
  });
  const [dragOver, setDragOver] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const dragDepth = useRef(0);
  const hintId = useId();
  const reduced = useBusinessReducedMotion();
  const { files, message, hasWarnings } = selection;
  function select(incoming: File[]) {
    if (!incoming.length) return;
    setSelection(current => {
      const result = selectLocalFiles(current.files, incoming);
      const details = [
        `新增 ${result.added} 项`,
        result.rejected ? `${result.rejected} 项类型或大小不符` : '',
        result.duplicates ? `${result.duplicates} 项重复` : '',
        result.overflow ? `${result.overflow} 项超过五项容量` : '',
      ].filter(Boolean).join('，');
      return { files: result.files, message: `${details}。文件仍仅保存在本地。`, hasWarnings: result.rejected > 0 || result.overflow > 0 };
    });
  }
  function enter(event: DragEvent<HTMLDivElement>) {
    if (!event.dataTransfer.types.includes('Files')) return;
    event.preventDefault();
    dragDepth.current++;
    setDragOver(true);
  }
  function leave() {
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (!dragDepth.current) setDragOver(false);
  }
  function drop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    dragDepth.current = 0;
    setDragOver(false);
    select(Array.from(event.dataTransfer.files));
  }
  function remove(file: File) {
    setSelection(current => ({ files: current.files.filter(item => localFileKey(item) !== localFileKey(file)), message: `已移除 ${file.name}，剩余文件仅保存在本地。`, hasWarnings: false }));
  }
  return (
    <BusinessDemo title="FileUpload" description="真实选择本地图片、文本或 CSV 文件，验证大小和类型，支持移除；文件保留在浏览器内。">
      <input ref={input} className={styles.nativeInput} type="file" accept="image/*,.txt,.csv" multiple aria-label="选择本地文件" tabIndex={-1} onChange={event => { select(Array.from(event.target.files ?? [])); event.target.value = ''; }} {...demoProps('t0')} />
      <motion.div className={styles.dropZone} data-dragover={dragOver} role="group" aria-label="选择或拖放本地文件" onDragEnter={enter} onDragLeave={leave} onDragOver={event => { event.preventDefault(); event.dataTransfer.dropEffect = 'copy'; }} onDrop={drop} animate={{ borderColor: dragOver ? 'var(--aw-color-action-primary)' : 'var(--aw-color-border-control)' }} transition={{ duration: reduced ? 0 : 0.18 }}>
        <span className={styles.uploadIcon}><Upload size={25} aria-hidden="true" /></span>
        <h3 className={styles.dropTitle}>{dragOver ? '松开以选择文件' : '将文件拖放到这里'}</h3>
        <p id={hintId} className={styles.hint}>图片、TXT 或 CSV · 每项最多 1 MiB · 最多 {LOCAL_FILE_LIMIT} 项</p>
        <Button variant="secondary" data-size="sm" aria-describedby={hintId} onClick={() => input.current?.click()} {...demoProps('t1')}>选择本地文件</Button>
        <span className={styles.localNote}>文件仅在本地，不会上传。</span>
      </motion.div>
      <div className={styles.listHeader}>
        <h3 className={styles.listTitle}>已选文件 <span className={styles.count}>{files.length} / {LOCAL_FILE_LIMIT}</span></h3>
        <Button variant="ghost" data-size="sm" disabled={!files.length} onClick={() => { setSelection({ files: [], message: '本地选择已清空。', hasWarnings: false }); }} {...demoProps('t2')}>移除全部</Button>
      </div>
      <ul className={styles.list} aria-label="已选文件">
        <AnimatePresence initial={false} mode="popLayout">
          {files.map(file => {
            const Icon = file.type.startsWith('image/') ? ImageIcon : FileText;
            return (
              <motion.li data-ui="aw-business-row" className={styles.file} key={localFileKey(file)} layout={!reduced} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: reduced ? 0 : 0.18 }}>
                <span className={styles.fileIcon}><Icon size={19} aria-hidden="true" /></span>
                <span className={styles.fileInfo}><span className={styles.fileName}>{file.name}</span><span className={styles.fileSize}>{Math.ceil(file.size / 1024)} KiB</span></span>
                <span className={styles.ready}><Check size={13} aria-hidden="true" />本地就绪</span>
                <Button variant="ghost" data-size="sm" data-icon-only="true" aria-label={'移除' + file.name} onClick={() => remove(file)} {...demoProps('t3')}><X size={16} aria-hidden="true" /></Button>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
      {!files.length ? <p className={styles.empty}>尚未选择文件。选择后可在这里查看和移除。</p> : null}
      <p data-ui="aw-business-status" className={styles.status} data-warning={hasWarnings} role="status">{message}</p>
    </BusinessDemo>
  );
}
