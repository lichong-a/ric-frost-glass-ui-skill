import type { AeroShardsProps } from '../../../.upstream/src/ts-default/Backgrounds/AeroShards/AeroShards';
import { shardPose } from './aero-model';
import { startCanvas, type CanvasFrame, type CanvasLifecycle } from './canvas-loop';

export function paintAeroShards(context: CanvasRenderingContext2D, frame: CanvasFrame, props: AeroShardsProps) {
  const { width, height, time, pointer } = frame;
  context.globalAlpha = 1; context.shadowBlur = 0;
  context.fillStyle = props.backgroundColor ?? '#090912'; context.fillRect(0, 0, width, height);
  const detail = props.detail === 'bold' ? 0.58 : props.detail === 'fine' ? 1.15 : 1;
  const count = Math.max(40, Math.min(800, Math.round(350 * (props.density ?? 1) * detail)));
  const poses = Array.from({ length: count }, (_, index) => shardPose(index, count, time, props, width, height, pointer)).sort((a, b) => a.depth - b.depth);
  for (const pose of poses) {
    for (const pulse of props.interaction === 'none' ? [] : frame.pulses) {
      const dx = pose.x - pulse.x, dy = pose.y - pulse.y, distance = Math.max(1, Math.hypot(dx, dy));
      const force = Math.exp(-Math.pow((distance - pulse.age * 220) / 34, 2)) * Math.exp(-pulse.age) * 26 * (props.rippleIntensity ?? 1);
      pose.x += dx / distance * force; pose.y += dy / distance * force;
    }
    context.save(); context.translate(pose.x, pose.y); context.rotate(pose.angle);
    const pearl = props.material === 'chrome' ? 1 : props.material === 'satin' ? 0.67 : 0.85;
    context.globalAlpha = pose.brightness * pearl;
    context.shadowColor = props.accentColor ?? '#af9bff';
    context.shadowBlur = (props.glow ?? 0.54) * 12 + (props.bloom ?? 0.35) * 16 + (props.edgeSoftness ?? 2);
    context.fillStyle = props.shardColor ?? '#a5b7f4';
    if (props.effect === 'ascii') {
      context.font = `${Math.max(8, pose.width * 1.5)}px monospace`;
      context.fillText('@%#*+='[Math.min(5, Math.floor(pose.depth * 6))], 0, 0);
    } else {
      const unit = props.effect === 'dither' ? 4 : 0;
      const w = unit ? Math.max(unit, Math.round(pose.width / unit) * unit) : pose.width;
      context.beginPath(); context.moveTo(-w * 0.5, -pose.height * 0.5);
      context.lineTo(w * 0.55, -pose.height * 0.25); context.lineTo(w * 0.28, pose.height * 0.5);
      context.lineTo(-w * 0.35, pose.height * 0.2); context.closePath(); context.fill();
      context.shadowBlur = 0; context.globalAlpha *= 0.35 + Math.abs(Math.sin(time * (props.spin ?? 0.6) + pose.phase * 20)) * 0.65;
      context.fillStyle = props.accentColor ?? '#ece9ff';
      context.beginPath(); context.moveTo(-w * 0.5, -pose.height * 0.5); context.lineTo(w * 0.04, -pose.height * 0.15);
      context.lineTo(w * 0.28, pose.height * 0.5); context.closePath(); context.fill();
      const aberration = props.chromaticAberration ?? 0;
      if (aberration > 0) {
        context.globalAlpha = 0.22; context.strokeStyle = '#ef719d'; context.lineWidth = 1;
        context.translate(aberration * 2, 0); context.stroke();
      }
    }
    context.restore();
  }
  if (props.grain) {
    context.shadowBlur = 0; context.fillStyle = '#ffffff'; context.globalAlpha = Math.min(0.2, props.grain);
    for (let i = 0; i < 100; i++) context.fillRect((Math.sin(i * 127.1 + time) * 0.5 + 0.5) * width, (Math.cos(i * 311.7 - time) * 0.5 + 0.5) * height, 1, 1);
    context.globalAlpha = 1;
  }
}

export function createAeroShardsCanvas(canvas: HTMLCanvasElement, getProps: () => AeroShardsProps, lifecycle?: CanvasLifecycle) {
  let displayed: AeroShardsProps | undefined;
  return startCanvas(canvas, getProps, (context, frame, props) => {
    // Smooth numeric controls when changing presets, preserving live configuration.
    const amount = 1 - Math.exp(-frame.elapsed * 6 / Math.max(0.02, props.transitionDuration ?? 1));
    displayed = { ...props, spread: displayed ? (displayed.spread ?? 1) + ((props.spread ?? 1) - (displayed.spread ?? 1)) * amount : props.spread };
    paintAeroShards(context, frame, displayed);
  }, undefined, lifecycle);
}
