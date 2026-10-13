import type { ShapeWavesProps } from '../../../.upstream/src/ts-default/Backgrounds/ShapeWaves/ShapeWaves';
const clamp = (value: number) => Math.max(0, Math.min(1, value));

/** Rolling spatial waves retain the original three shapes and pointer charge behavior. */
export function shapeCell(column: number, row: number, time: number, props: ShapeWavesProps, width: number, height: number, charge = 0, introElapsed = 2) {
  const cellSize = Math.max(2, props.cellSize ?? 10), x = (column + 0.5) * cellSize, y = (row + 0.5) * cellSize;
  const scale = Math.max(0.05, props.scale ?? 1), t = time * (props.speed ?? 1);
  const direction = (props.direction ?? 0) * Math.PI / 180;
  const nx = (x + Math.cos(direction) * t * (props.flow ?? 0) * 25) / (130 * scale);
  const ny = (y + Math.sin(direction) * t * (props.flow ?? 0) * 25) / (130 * scale);
  const wave = (Math.sin(nx * 1.2 + t * 0.65) + Math.cos(ny * 1.6 - t * 0.45) + Math.sin((nx + ny) * 0.7 + t * 0.35)) / 3;
  const tone = clamp((wave * 0.5 + (props.brightness ?? 0.4)) * (props.contrast ?? 1));
  const band = Math.min(2, Math.floor(tone * 3)), step = (band + Math.floor(clamp(charge) * 2.999)) % 3;
  const shape = props.shapes && props.shapes !== 'mixed' ? props.shapes : (['triangle', 'circle', 'square'] as const)[step];
  const explicit = props.shapes && props.shapes !== 'mixed';
  const size = cellSize * 0.5 * (props.dotSize ?? 0.75) * (explicit ? 0.45 + step * 0.275 : 1);
  const qx = Math.abs(x / width * 2 - 1), qy = Math.abs(y / height * 2 - 1);
  const radial = Math.hypot(qx, qy) / Math.SQRT2, fade = props.fade ?? 0.25;
  const edge = fade ? clamp((1 - radial) / (fade * 2)) : 1;
  const progress = props.intro === false ? 2 : introElapsed / Math.max(0.1, props.introDuration ?? 1.6) * 2;
  return { x, y, shape, size, level: clamp((0.38 + tone * 0.62) * edge), hover: clamp(charge), reveal: clamp((progress - radial) / 0.2) };
}
