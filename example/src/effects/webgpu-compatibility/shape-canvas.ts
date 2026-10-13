import type { ShapeWavesProps } from '../../../.upstream/src/ts-default/Backgrounds/ShapeWaves/ShapeWaves';
import { shapeCell } from './shape-model';
import { startCanvas, type CanvasFrame, type CanvasLifecycle } from './canvas-loop';

export function paintShapeWaves(context: CanvasRenderingContext2D, frame: CanvasFrame, props: ShapeWavesProps, mask?: Uint8ClampedArray, introElapsed = frame.time) {
  const { width, height, time, pointer } = frame;
  context.globalAlpha = 1; context.shadowBlur = 0;
  context.fillStyle = props.backgroundColor ?? '#090912'; context.fillRect(0, 0, width, height);
  // The compatibility path bounds CPU work on very fine grids.
  const cellSize = Math.max(2, props.cellSize ?? 10, Math.sqrt(width * height / 12000));
  const columns = Math.ceil(width / cellSize), rows = Math.ceil(height / cellSize), settings = { ...props, cellSize };
  for (let row = 0; row < rows; row++) for (let column = 0; column < columns; column++) {
    const x = (column + 0.5) * cellSize, y = (row + 0.5) * cellSize;
    if (mask && mask[(Math.min(Math.floor(height) - 1, Math.floor(y)) * Math.floor(width) + Math.min(Math.floor(width) - 1, Math.floor(x))) * 4 + 3] > 127) continue;
    let charge = 0;
    if (props.interactive !== false) {
      if (pointer.active) charge = Math.exp(-Math.pow(Math.hypot(x - pointer.x, y - pointer.y) / Math.max(8, props.splashRadius ?? 40), 2)) * (props.splashStrength ?? 0.4) * 2;
      for (const pulse of frame.pulses) charge += Math.exp(-Math.pow((Math.hypot(x - pulse.x, y - pulse.y) - pulse.age * 100) / 24, 2)) * Math.exp(-pulse.age * 1.8) * (props.splashStrength ?? 0.4) * 2;
    }
    const cell = shapeCell(column, row, time, settings, width, height, charge, props.paused ? Math.max(2, introElapsed) : introElapsed);
    if (cell.level * cell.reveal < 0.005) continue;
    context.globalAlpha = cell.level * cell.reveal;
    context.fillStyle = cell.hover > 0.2 ? (props.hoverColor ?? '#ffffff') : (props.color ?? '#929292');
    context.shadowColor = props.hoverColor ?? '#ffffff'; context.shadowBlur = cell.hover * (props.glow ?? 0.35) * 16;
    const size = Math.max(0.1, cell.size * cell.reveal);
    context.beginPath();
    if (cell.shape === 'circle') context.arc(x, y, size, 0, Math.PI * 2);
    else if (cell.shape === 'square') context.rect(x - size, y - size, size * 2, size * 2);
    else { context.moveTo(x, y - size); context.lineTo(x + size, y + size); context.lineTo(x - size, y + size); context.closePath(); }
    context.fill();
  }
  context.globalAlpha = 1; context.shadowBlur = 0;
}

export function createShapeWavesCanvas(canvas: HTMLCanvasElement, getProps: () => ShapeWavesProps, lifecycle?: CanvasLifecycle) {
  let mask: Uint8ClampedArray | undefined, signature = '', introStarted = 0, introKey: ShapeWavesProps['introKey'];
  return startCanvas(canvas, getProps, (context, frame, props) => {
    if (props.introKey !== introKey) { introKey = props.introKey; introStarted = frame.time; }
    const w = Math.max(1, Math.floor(frame.width)), h = Math.max(1, Math.floor(frame.height));
    const next = JSON.stringify([w, h, props.text, props.fontFamily, props.fontWeight, props.textSize]);
    if (signature !== next) {
      signature = next; mask = undefined;
      if (props.text) {
        const textCanvas = canvas.ownerDocument.createElement('canvas'); textCanvas.width = w; textCanvas.height = h;
        const text = textCanvas.getContext('2d');
        if (!text) throw new Error('无法创建 Shape Waves 文字遮罩。');
        let size = Math.max(10, h * (props.textSize ?? 0.6));
        const font = () => `${props.fontWeight ?? 500} ${size}px ${props.fontFamily ?? 'system-ui, sans-serif'}`;
        text.font = font(); size *= Math.min(1, w * 0.9 / Math.max(1, text.measureText(props.text).width)); text.font = font();
        text.textAlign = 'center'; text.textBaseline = 'middle'; text.fillStyle = '#ffffff'; text.fillText(props.text, w / 2, h / 2);
        mask = text.getImageData(0, 0, w, h).data;
      }
    }
    paintShapeWaves(context, frame, props, mask, frame.time - introStarted);
  }, undefined, lifecycle);
}
