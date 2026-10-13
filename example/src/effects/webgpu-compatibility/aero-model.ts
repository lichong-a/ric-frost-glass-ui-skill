import type { AeroShardsProps } from '../../../.upstream/src/ts-default/Backgrounds/AeroShards/AeroShards';

export type ShardPointer = { x: number; y: number; active: boolean; gather: number };
const fract = (value: number) => value - Math.floor(value);
const seed = (index: number, salt: number) => fract(Math.sin(index * 127.1 + salt * 311.7) * 43758.5453);

/** A bounded Canvas rendition of the original stream, vortex and ribbon formations. */
export function shardPose(index: number, count: number, time: number, props: AeroShardsProps, width: number, height: number, pointer?: ShardPointer) {
  const phase = seed(index, 1), lane = seed(index, 2), depth = seed(index, 3);
  const t = time * (props.speed ?? 0.5);
  const progress = fract(phase + t * (0.055 + depth * 0.025));
  const spread = Math.max(0.1, props.spread ?? 1), scale = Math.max(0.1, props.scale ?? 1);
  const turbulence = props.turbulence ?? 1;
  let x = (progress * 1.4 - 0.2) * width;
  let y = height * (0.5 + (lane - 0.5) * 0.72 * spread + Math.sin(progress * 7 + t + depth * 9) * 0.08 * turbulence);
  let angle = -0.5 + Math.sin(t * 0.8 + phase * 8) * 0.5 * (props.spin ?? 0.6);
  if (props.flow === 'vortex') {
    const theta = phase * Math.PI * 2 + t * 0.6;
    const radius = (0.12 + lane * 0.48) * spread;
    x = width * (0.5 + Math.cos(theta) * radius * 0.75);
    y = height * (0.5 + Math.sin(theta) * radius);
    angle += theta + Math.PI * 0.5;
  } else if (props.flow === 'ribbon') {
    y = height * (0.5 + Math.sin(progress * Math.PI * 3 + t * 0.3) * 0.24 * spread + (lane - 0.5) * 0.12);
    angle += Math.cos(progress * Math.PI * 3 + t * 0.3) * 0.65;
  }
  if (props.placement === 'left') x = x * 0.65 - width * 0.1;
  if (props.placement === 'right') x = width * 0.45 + x * 0.65;
  if (props.placement === 'center') x = width * 0.3 + x * 0.4;
  if (pointer?.active && props.interaction !== 'none') {
    let dx = x - pointer.x, dy = y - pointer.y;
    if (dx === 0 && dy === 0) { dx = Math.cos(phase * 6.28); dy = Math.sin(phase * 6.28); }
    const distance = Math.hypot(dx, dy), radius = Math.min(width, height) * 0.22 * (props.interactionRadius ?? 1.5);
    const force = Math.exp(-distance * distance / (radius * radius)) * (props.interactionStrength ?? 0.5) * 80;
    const direction = props.interaction === 'attract' ? -1 : 1;
    x += dx / distance * force * direction; y += dy / distance * force * direction;
  }
  if (pointer && props.interaction !== 'none' && props.holdToGather !== false && pointer.gather > 0) {
    const theta = phase * 6.28 + t * 0.2, radius = Math.sqrt(-2 * Math.log(Math.max(lane, 0.001))) * height * 0.045;
    const amount = Math.min(0.96, pointer.gather * 0.96);
    x += (pointer.x + Math.cos(theta) * radius - x) * amount;
    y += (pointer.y + Math.sin(theta) * radius - y) * amount;
  }
  const detailSize = props.detail === 'bold' ? 1.32 : props.detail === 'fine' ? 0.7 : 0.96;
  const size = (4 + depth * 7 * (props.depth ?? 1)) * scale * detailSize * (props.shardSize ?? 1.1);
  return { x, y, angle, depth, width: size, height: size * (2.6 + phase * 2.4) * Math.max(0.2, props.stretch ?? 1), brightness: 0.45 + depth * 0.55, phase: index / Math.max(1, count) };
}
