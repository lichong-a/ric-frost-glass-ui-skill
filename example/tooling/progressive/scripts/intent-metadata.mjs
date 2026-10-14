// The preview catalog and progressive docs share one authored Chinese index.
import { readFile } from 'node:fs/promises';

export const intentMetadata = JSON.parse(await readFile(
  new URL('../../../catalog/intent-metadata.json', import.meta.url), 'utf8'
));

export const categories = {
  'text-animations': { label: '文字效果', intent: '字符、标题、数字、滚动和阅读揭示', baseMotion: '按触发播放；循环、乱码与大幅字形变换需明确场景', fallback: '输出完整可选择的静态文本；数值直接显示真实终值。' },
  animations: { label: '交互动效', intent: '入场、悬停、点击、光标、图像过渡和边缘', baseMotion: '按交互激活；指针装饰和持续效果只在选中示例挂载', fallback: '恢复原始内容和原生指针，保持按钮、链接与点击区域可用。' },
  components: { label: '组合组件', intent: '导航、列表、卡片、布局、画廊和选择控制', baseMotion: '行为驱动；三维、物理与持续轮播按需启用', fallback: '保留等价的列表、图片、链接或原生控制器；真实功能不能依赖动效。' },
  micro: { label: '微交互', intent: 'Agent状态、消息输入、表单、按钮、选择和反馈', baseMotion: '真实状态驱动的短动效；计时以任务事实为准', fallback: '使用原生或规范内控件表达同一状态和操作，保留键盘与可访问名称。' },
  backgrounds: { label: '背景效果', intent: '渐变、线场、网格、光束、粒子、流体与空间', baseMotion: '装饰性持续动效；默认单个预览按需启用', fallback: '使用 Agent Ric 静态茶绿 / 沙米环境渐变，主体内容和交互不变。' }
};
