import Component from '../../../.upstream/src/ts-default/Animations/GradualBlur/GradualBlur';
import artwork from '../../assets/restoration/nocturne-orbit.svg';
import secondArtwork from '../../assets/restoration/mineral-tide.svg';
import styles from './gradual-blur.module.css';
import { useDemoConfig } from '../../parameters/DemoConfig';

export default function GradualBlurDemo() {
  const { props: demoProps } = useDemoConfig();
  return (
    <section className={styles.stage} data-visual-demo="gradual-blur" aria-label="带底部渐进模糊的滚动内容">
      <div className={styles.scroll} tabIndex={0} aria-label="滚动阅读色彩札记">
        <span className={styles.eyebrow}>FIELD NOTES / 01</span>
        <h2 className={styles.title}>光与色彩之间</h2>
        <p className={styles.lead}>向下滚动，图像与文字逐层经过柔和的模糊边界。</p>
        <img className={styles.image} src={artwork} alt="蓝紫色球体与亮黄色轨道构成的原创纹理图" {...demoProps('t0')} />
        <h3 className={styles.subtitle}>清晰，逐渐融入远处</h3>
        <p className={styles.copy}>清晰的阅读区留在上方，底部用多层模糊营造深度。移动内容时，细节缓慢消散，边界仍然柔和。</p>
        <p className={styles.copy}>光、纹理和留白共同决定一幅画的节奏。把注意力放在当前的内容上，继续滚动发现下一处颜色。</p>
        <img className={styles.image} src={secondArtwork} alt="蓝、紫、粉红和青色组成的原创矿物潮汐纹理图" {...demoProps('t1')} />
        <h3 className={styles.subtitle}>流动的色彩</h3>
        <p className={styles.copy}>另一幅图像经过相同边界，在滚动中观察纹理如何从锐利过渡到模糊，再回到清晰的阅读区域。</p>
        <p className={styles.copy}>这段内容可以继续阅读。每一层模糊只覆盖下边缘，始终保留足够的清晰区域。</p>
      </div>
      <Component target="parent" position="bottom" height="8rem" strength={2}
        divCount={8} curve="bezier" exponential opacity={1} zIndex={2} {...demoProps('t2')} />
    </section>
  );
}
