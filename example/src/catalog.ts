// Generated from frozen identities, authored intent metadata and catalog/use-categories.json.
import type { PreviewEntry } from './runtime/types';
export type CatalogEntry = PreviewEntry & { sourceName:string; sourceCategory:string; provider:'react-bits'|'business'; tags:string[]; exportName:string; aliases:string[]; dependencies:string[]; docsUrl:string; demoPath:string; guidePath?:string; subtitle?:string };
export const entries: CatalogEntry[] = [
  {
    "id": "tech-text",
    "name": "Tech Text",
    "sourceName": "Tech Text",
    "category": "text",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "TechText",
    "description": "指针经过时字形变为虚线矢量路径",
    "aliases": [
      "科技文字",
      "虚线文字",
      "矢量字标"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/TechText/TechText.tsx",
    "demoPath": "src/demos/text/tech-text.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "text-loop",
    "name": "Text Loop",
    "sourceName": "Text Loop",
    "category": "text",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "TextLoop",
    "description": "文本沿曲线连续循环流动",
    "aliases": [
      "文字循环",
      "曲线路径文字",
      "曲线跑马灯"
    ],
    "dependencies": [
      "gsap",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/TextLoop/TextLoop.tsx",
    "demoPath": "src/demos/text/text-loop.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "masked-heading",
    "name": "Masked Heading",
    "sourceName": "Masked Heading",
    "category": "text",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "MaskedHeading",
    "description": "标题内部的图像或色网移动并逐词揭示",
    "aliases": [
      "遮罩标题",
      "图片文字",
      "网格渐变标题"
    ],
    "dependencies": [
      "gsap",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/MaskedHeading/MaskedHeading.tsx",
    "demoPath": "src/demos/text/masked-heading.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "particle-text",
    "name": "Particle Text",
    "sourceName": "Particle Text",
    "category": "text",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "ParticleText",
    "description": "粒子散开后重新组成可读文字",
    "aliases": [
      "粒子文字",
      "文字聚散"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/ParticleText/ParticleText.tsx",
    "demoPath": "src/demos/text/particle-text.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "split-flap-text",
    "name": "Split Flap Text",
    "sourceName": "Split Flap Text",
    "category": "text",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "SplitFlapText",
    "description": "翻片逐格转到新的字符或短句",
    "aliases": [
      "翻牌文字",
      "机场翻牌",
      "机械字符牌"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/SplitFlapText/SplitFlapText.tsx",
    "demoPath": "src/demos/text/split-flap-text.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "warp-text",
    "name": "Warp Text",
    "sourceName": "Warp Text",
    "category": "text",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "WarpText",
    "description": "指针附近的文字局部弯曲与折射",
    "aliases": [
      "扭曲文字",
      "文字折射"
    ],
    "dependencies": [
      "ogl",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/WarpText/WarpText.tsx",
    "demoPath": "src/demos/text/warp-text.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "stroke-text",
    "name": "Stroke Text",
    "sourceName": "Stroke Text",
    "category": "text",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "StrokeText",
    "description": "先描绘字形轮廓再填充文字",
    "aliases": [
      "描边文字",
      "文字描绘",
      "描边填充"
    ],
    "dependencies": [
      "gsap",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/StrokeText/StrokeText.tsx",
    "demoPath": "src/demos/text/stroke-text.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "depth-text",
    "name": "Depth Text",
    "sourceName": "Depth Text",
    "category": "text",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "DepthText",
    "description": "多层立体字随指针产生深度视差",
    "aliases": [
      "立体文字",
      "文字视差",
      "挤出字"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/DepthText/DepthText.tsx",
    "demoPath": "src/demos/text/depth-text.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "fold-text",
    "name": "Fold Text",
    "sourceName": "Fold Text",
    "category": "text",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "FoldText",
    "description": "文字行沿折痕展开到阅读位置",
    "aliases": [
      "折叠文字",
      "纸张展开文字"
    ],
    "dependencies": [
      "gsap",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/FoldText/FoldText.tsx",
    "demoPath": "src/demos/text/fold-text.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "echo-text",
    "name": "Echo Text",
    "sourceName": "Echo Text",
    "category": "text",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "EchoText",
    "description": "文字残影跟随并收敛为单一词形",
    "aliases": [
      "重影文字",
      "回声文字"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/EchoText/EchoText.tsx",
    "demoPath": "src/demos/text/echo-text.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "split-text",
    "name": "Split Text",
    "sourceName": "Split Text",
    "category": "text",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "SplitText",
    "description": "按字符或单词错开播放入场",
    "aliases": [
      "逐字出现",
      "拆分文字",
      "标题逐字出现",
      "交错文字"
    ],
    "dependencies": [
      "@gsap/react",
      "gsap",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/SplitText/SplitText.tsx",
    "demoPath": "src/demos/text/split-text.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "blur-text",
    "name": "Blur Text",
    "sourceName": "Blur Text",
    "category": "text",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "BlurText",
    "description": "文字从柔焦过渡到清晰终态",
    "aliases": [
      "模糊揭示",
      "文字变清晰",
      "柔焦文字"
    ],
    "dependencies": [
      "motion",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/BlurText/BlurText.tsx",
    "demoPath": "src/demos/text/blur-text.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "circular-text",
    "name": "Circular Text",
    "sourceName": "Circular Text",
    "category": "text",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "CircularText",
    "description": "字符围绕圆排列并按配置旋转",
    "aliases": [
      "圆形文字",
      "环绕文字",
      "旋转字环"
    ],
    "dependencies": [
      "motion",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/CircularText/CircularText.tsx",
    "demoPath": "src/demos/text/circular-text.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "text-type",
    "name": "Text Type",
    "sourceName": "Text Type",
    "category": "text",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "TextType",
    "description": "按节奏键入文字并呈现输入光标",
    "aliases": [
      "打字机",
      "逐字输入",
      "打字效果"
    ],
    "dependencies": [
      "gsap",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/TextType/TextType.tsx",
    "demoPath": "src/demos/text/text-type.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "shuffle",
    "name": "Shuffle",
    "sourceName": "Shuffle",
    "category": "text",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "Shuffle",
    "description": "字符变化后稳定成目标文案",
    "aliases": [
      "字符洗牌",
      "乱序揭示"
    ],
    "dependencies": [
      "@gsap/react",
      "gsap",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/Shuffle/Shuffle.tsx",
    "demoPath": "src/demos/text/shuffle.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "shiny-text",
    "name": "Shiny Text",
    "sourceName": "Shiny Text",
    "category": "text",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "ShinyText",
    "description": "轻微光带沿文字表面扫过",
    "aliases": [
      "扫光文字",
      "文字微光",
      "文字反光"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/ShinyText/ShinyText.tsx",
    "demoPath": "src/demos/text/shiny-text.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "text-pressure",
    "name": "Text Pressure",
    "sourceName": "Text Pressure",
    "category": "text",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "TextPressure",
    "description": "字符随指针接近产生缩放或字形变化",
    "aliases": [
      "文字压力",
      "字形压缩"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/TextPressure/TextPressure.tsx",
    "demoPath": "src/demos/text/text-pressure.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "curved-loop",
    "name": "Curved Loop",
    "sourceName": "Curved Loop",
    "category": "text",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "CurvedLoop",
    "description": "文字沿可调曲线循环并响应拖拽",
    "aliases": [
      "可拖拽曲线文字",
      "曲线循环"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/CurvedLoop/CurvedLoop.tsx",
    "demoPath": "src/demos/text/curved-loop.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "fuzzy-text",
    "name": "Fuzzy Text",
    "sourceName": "Fuzzy Text",
    "category": "text",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "FuzzyText",
    "description": "文字边缘产生可调节的细小噪动",
    "aliases": [
      "毛刺文字",
      "抖动文字",
      "噪点字"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/FuzzyText/FuzzyText.tsx",
    "demoPath": "src/demos/text/fuzzy-text.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "gradient-text",
    "name": "Gradient Text",
    "sourceName": "Gradient Text",
    "category": "text",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "GradientText",
    "description": "文字填充内的渐变按配置流动",
    "aliases": [
      "渐变文字",
      "文字流色"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/GradientText/GradientText.tsx",
    "demoPath": "src/demos/text/gradient-text.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "falling-text",
    "name": "Falling Text",
    "sourceName": "Falling Text",
    "category": "text",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "FallingText",
    "description": "文字散落、响应拖拽并可回到原排版",
    "aliases": [
      "文字掉落",
      "物理文字",
      "拖拽散字"
    ],
    "dependencies": [
      "matter-js",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/FallingText/FallingText.tsx",
    "demoPath": "src/demos/text/falling-text.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "text-cursor",
    "name": "Text Cursor",
    "sourceName": "Text Cursor",
    "category": "pointer",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "TextCursor",
    "description": "文字副本或字母链跟随指针",
    "aliases": [
      "文字光标",
      "文字拖尾"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/TextCursor/TextCursor.tsx",
    "demoPath": "src/demos/pointer/text-cursor.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "decrypted-text",
    "name": "Decrypted Text",
    "sourceName": "Decrypted Text",
    "category": "text",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "DecryptedText",
    "description": "随机字符逐步解析成目标文本",
    "aliases": [
      "解密文字",
      "乱码还原"
    ],
    "dependencies": [
      "motion",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/DecryptedText/DecryptedText.tsx",
    "demoPath": "src/demos/text/decrypted-text.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "true-focus",
    "name": "True Focus",
    "sourceName": "True Focus",
    "category": "text",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "TrueFocus",
    "description": "一组单词依次在模糊与清晰之间切换",
    "aliases": [
      "焦点文字",
      "单词聚焦"
    ],
    "dependencies": [
      "motion",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/TrueFocus/TrueFocus.tsx",
    "demoPath": "src/demos/text/true-focus.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "scroll-float",
    "name": "Scroll Float",
    "sourceName": "Scroll Float",
    "category": "scroll",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "ScrollFloat",
    "description": "文字随滚动轻微漂浮或产生视差",
    "aliases": [
      "滚动漂浮文字",
      "滚动字移"
    ],
    "dependencies": [
      "gsap",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/ScrollFloat/ScrollFloat.tsx",
    "demoPath": "src/demos/scroll/scroll-float.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "scroll-reveal",
    "name": "Scroll Reveal",
    "sourceName": "Scroll Reveal",
    "category": "scroll",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "ScrollReveal",
    "description": "滚动进度逐步显现并清晰化文本",
    "aliases": [
      "滚动文字揭示",
      "滚动变清晰"
    ],
    "dependencies": [
      "gsap",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/ScrollReveal/ScrollReveal.tsx",
    "demoPath": "src/demos/scroll/scroll-reveal.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "ascii-text",
    "name": "ASCII Text",
    "sourceName": "ASCII Text",
    "category": "text",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "ASCIIText",
    "description": "字符化文字响应指针倾斜、扰动和点击",
    "aliases": [
      "字符画文字",
      "ASCII字"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/ASCIIText/ASCIIText.tsx",
    "demoPath": "src/demos/text/ascii-text.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "scrambled-text",
    "name": "Scrambled Text",
    "sourceName": "Scrambled Text",
    "category": "text",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "ScrambledText",
    "description": "指针附近的文本局部扰动并还原",
    "aliases": [
      "悬停乱码",
      "局部字符扰动"
    ],
    "dependencies": [
      "gsap",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/ScrambledText/ScrambledText.tsx",
    "demoPath": "src/demos/text/scrambled-text.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "rotating-text",
    "name": "Rotating Text",
    "sourceName": "Rotating Text",
    "category": "text",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "RotatingText",
    "description": "多个短句按顺序旋转或翻转切换",
    "aliases": [
      "轮换文字",
      "翻转短句",
      "动态关键词"
    ],
    "dependencies": [
      "motion",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/RotatingText/RotatingText.tsx",
    "demoPath": "src/demos/text/rotating-text.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "glitch-text",
    "name": "Glitch Text",
    "sourceName": "Glitch Text",
    "category": "text",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "GlitchText",
    "description": "文字产生短暂通道错位和抖动",
    "aliases": [
      "故障文字",
      "错位文字"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/GlitchText/GlitchText.tsx",
    "demoPath": "src/demos/text/glitch-text.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "scroll-velocity",
    "name": "Scroll Velocity",
    "sourceName": "Scroll Velocity",
    "category": "scroll",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "ScrollVelocity",
    "description": "文字移动速度随滚动速度变化",
    "aliases": [
      "滚动速度文字",
      "速度跑马灯"
    ],
    "dependencies": [
      "motion",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/ScrollVelocity/ScrollVelocity.tsx",
    "demoPath": "src/demos/scroll/scroll-velocity.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "variable-proximity",
    "name": "Variable Proximity",
    "sourceName": "Variable Proximity",
    "category": "text",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "VariableProximity",
    "description": "字形参数随与指针的距离连续变化",
    "aliases": [
      "可变字体",
      "距离字重",
      "指针字形"
    ],
    "dependencies": [
      "motion",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/VariableProximity/VariableProximity.tsx",
    "demoPath": "src/demos/text/variable-proximity.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "count-up",
    "name": "Count Up",
    "sourceName": "Count Up",
    "category": "data",
    "sourceCategory": "text-animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "text-animations",
      "文字动画"
    ],
    "exportName": "CountUp",
    "description": "数值按目标与格式规则过渡到终值",
    "aliases": [
      "数字增长",
      "数据计数",
      "数字递增"
    ],
    "dependencies": [
      "motion",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/TextAnimations/CountUp/CountUp.tsx",
    "demoPath": "src/demos/data/count-up.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "crystalized-ball",
    "name": "Crystalized Ball",
    "sourceName": "Crystalized Ball",
    "category": "background",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "CrystalizedBall",
    "description": "玻璃球保留边缘电弧与内部微粒响应",
    "aliases": [
      "玻璃球",
      "电弧球",
      "晶体球"
    ],
    "dependencies": [
      "ogl",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/CrystalizedBall/CrystalizedBall.tsx",
    "demoPath": "src/demos/background/crystalized-ball.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "electric-logo",
    "name": "Electric Logo",
    "sourceName": "Electric Logo",
    "category": "media",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "ElectricLogo",
    "description": "标志轮廓形成游走电弧",
    "aliases": [
      "电弧标志",
      "闪电Logo"
    ],
    "dependencies": [
      "ogl",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/ElectricLogo/ElectricLogo.tsx",
    "demoPath": "src/demos/media/electric-logo.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "dither-veil",
    "name": "Dither Veil",
    "sourceName": "Dither Veil",
    "category": "background",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "DitherVeil",
    "description": "单色抖点照片在指针处显露原图再恢复",
    "aliases": [
      "抖色图片揭示",
      "指针擦除遮罩"
    ],
    "dependencies": [
      "ogl",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/DitherVeil/DitherVeil.tsx",
    "demoPath": "src/demos/background/dither-veil.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "glow-cursor",
    "name": "Glow Cursor",
    "sourceName": "Glow Cursor",
    "category": "pointer",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "GlowCursor",
    "description": "指针留下逐渐衰减的柔和光迹",
    "aliases": [
      "发光光标",
      "柔光拖尾"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/GlowCursor/GlowCursor.tsx",
    "demoPath": "src/demos/pointer/glow-cursor.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "scroll-expand",
    "name": "Scroll Expand",
    "sourceName": "Scroll Expand",
    "category": "scroll",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "ScrollExpand",
    "description": "圆角媒体框随滚动扩展到全幅",
    "aliases": [
      "滚动放大媒体",
      "全幅图片展开"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/ScrollExpand/ScrollExpand.tsx",
    "demoPath": "src/demos/scroll/scroll-expand.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "ripple-distortion",
    "name": "Ripple Distortion",
    "sourceName": "Ripple Distortion",
    "category": "media",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "RippleDistortion",
    "description": "指针驱动的水纹使内容发生衰减位移",
    "aliases": [
      "水波折射",
      "内容涟漪"
    ],
    "dependencies": [
      "ogl",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/RippleDistortion/RippleDistortion.tsx",
    "demoPath": "src/demos/media/ripple-distortion.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "elastic-mesh",
    "name": "Elastic Mesh",
    "sourceName": "Elastic Mesh",
    "category": "media",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "ElasticMesh",
    "description": "文字或标志表面支持按压和拉伸",
    "aliases": [
      "弹性网格",
      "果冻字标",
      "捏压标志"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/ElasticMesh/ElasticMesh.tsx",
    "demoPath": "src/demos/media/elastic-mesh.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "swarm-cursor",
    "name": "Swarm Cursor",
    "sourceName": "Swarm Cursor",
    "category": "pointer",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "SwarmCursor",
    "description": "群集粒子追随指针并在静止时分散",
    "aliases": [
      "群集光标",
      "群聚粒子"
    ],
    "dependencies": [
      "ogl",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/SwarmCursor/SwarmCursor.tsx",
    "demoPath": "src/demos/pointer/swarm-cursor.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "halftone-reveal",
    "name": "Halftone Reveal",
    "sourceName": "Halftone Reveal",
    "category": "scroll",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "HalftoneReveal",
    "description": "图片网点在指针附近扩张并显露图像",
    "aliases": [
      "网点图片",
      "半调揭示"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/HalftoneReveal/HalftoneReveal.tsx",
    "demoPath": "src/demos/scroll/halftone-reveal.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "pixel-swap",
    "name": "Pixel Swap",
    "sourceName": "Pixel Swap",
    "category": "media",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "PixelSwap",
    "description": "像素先覆盖内容，交换后再散去",
    "aliases": [
      "像素切换",
      "像素覆盖换图"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/PixelSwap/PixelSwap.tsx",
    "demoPath": "src/demos/media/pixel-swap.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "cursor-grid",
    "name": "Cursor Grid",
    "sourceName": "Cursor Grid",
    "category": "pointer",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "CursorGrid",
    "description": "网格单元围绕指针渐次点亮并响应点击",
    "aliases": [
      "光标网格",
      "网格点亮"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/CursorGrid/CursorGrid.tsx",
    "demoPath": "src/demos/pointer/cursor-grid.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "animated-content",
    "name": "Animated Content",
    "sourceName": "Animated Content",
    "category": "scroll",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "AnimatedContent",
    "description": "内容在挂载或进入视口时按方向入场",
    "aliases": [
      "内容入场",
      "滚动入场",
      "容器入场"
    ],
    "dependencies": [
      "gsap",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/AnimatedContent/AnimatedContent.tsx",
    "demoPath": "src/demos/scroll/animated-content.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "fade-content",
    "name": "Fade Content",
    "sourceName": "Fade Content",
    "category": "scroll",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "FadeContent",
    "description": "内容按门槛触发淡入淡出或轻微位移",
    "aliases": [
      "淡入内容",
      "淡出内容",
      "轻过渡"
    ],
    "dependencies": [
      "gsap",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/FadeContent/FadeContent.tsx",
    "demoPath": "src/demos/scroll/fade-content.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "electric-border",
    "name": "Electric Border",
    "sourceName": "Electric Border",
    "category": "cards",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "ElectricBorder",
    "description": "容器边缘以可调电弧描绘并闪动",
    "aliases": [
      "电弧边框",
      "电流描边"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/ElectricBorder/ElectricBorder.tsx",
    "demoPath": "src/demos/cards/electric-border.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "orbit-images",
    "name": "Orbit Images",
    "sourceName": "Orbit Images",
    "category": "media",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "OrbitImages",
    "description": "图像沿给定路径循环运行",
    "aliases": [
      "轨道图片",
      "图片环绕"
    ],
    "dependencies": [
      "motion",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/OrbitImages/OrbitImages.tsx",
    "demoPath": "src/demos/media/orbit-images.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "pixel-transition",
    "name": "Pixel Transition",
    "sourceName": "Pixel Transition",
    "category": "scroll",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "PixelTransition",
    "description": "卡片由像素遮盖完成内容切换再显露",
    "aliases": [
      "像素转场",
      "像素溶解"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/PixelTransition/PixelTransition.tsx",
    "demoPath": "src/demos/scroll/pixel-transition.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "glare-hover",
    "name": "Glare Hover",
    "sourceName": "Glare Hover",
    "category": "cards",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "GlareHover",
    "description": "亮斑按指针方向掠过表面",
    "aliases": [
      "悬停扫光",
      "高光掠过"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/GlareHover/GlareHover.tsx",
    "demoPath": "src/demos/cards/glare-hover.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "antigravity",
    "name": "Antigravity",
    "sourceName": "Antigravity",
    "category": "background",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "Antigravity",
    "description": "三维粒子避开指针并平滑回归",
    "aliases": [
      "反重力粒子",
      "排斥粒子"
    ],
    "dependencies": [
      "@react-three/fiber",
      "react",
      "three"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/Antigravity/Antigravity.tsx",
    "demoPath": "src/demos/background/antigravity.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "logo-loop",
    "name": "Logo Loop",
    "sourceName": "Logo Loop",
    "category": "media",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "LogoLoop",
    "description": "标志无缝重复滚动并可暂停",
    "aliases": [
      "Logo循环",
      "品牌跑马灯"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/LogoLoop/LogoLoop.tsx",
    "demoPath": "src/demos/media/logo-loop.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "target-cursor",
    "name": "Target Cursor",
    "sourceName": "Target Cursor",
    "category": "pointer",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "TargetCursor",
    "description": "指针装饰框贴合可交互目标边缘",
    "aliases": [
      "目标光标",
      "括号光标",
      "锁定指针"
    ],
    "dependencies": [
      "react",
      "react-dom"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/TargetCursor/TargetCursor.tsx",
    "demoPath": "src/demos/pointer/target-cursor.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "magic-rings",
    "name": "Magic Rings",
    "sourceName": "Magic Rings",
    "category": "background",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "MagicRings",
    "description": "多个可配置圆环保留互动变化",
    "aliases": [
      "魔法环",
      "交互光环"
    ],
    "dependencies": [
      "react",
      "three"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/MagicRings/MagicRings.tsx",
    "demoPath": "src/demos/background/magic-rings.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "laser-flow",
    "name": "Laser Flow",
    "sourceName": "Laser Flow",
    "category": "background",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "LaserFlow",
    "description": "光束照射内容并沿转角流动",
    "aliases": [
      "流光光束",
      "边角流光"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/LaserFlow/LaserFlow.tsx",
    "demoPath": "src/demos/background/laser-flow.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "magnet-lines",
    "name": "Magnet Lines",
    "sourceName": "Magnet Lines",
    "category": "pointer",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "MagnetLines",
    "description": "线场朝指针方向弯转",
    "aliases": [
      "磁力线",
      "指针线场"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/MagnetLines/MagnetLines.tsx",
    "demoPath": "src/demos/pointer/magnet-lines.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "ghost-cursor",
    "name": "Ghost Cursor",
    "sourceName": "Ghost Cursor",
    "category": "pointer",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "GhostCursor",
    "description": "半透明装饰指针平滑滞后跟随",
    "aliases": [
      "幽灵光标",
      "延迟指针"
    ],
    "dependencies": [
      "react",
      "three"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/GhostCursor/GhostCursor.tsx",
    "demoPath": "src/demos/pointer/ghost-cursor.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "gradual-blur",
    "name": "Gradual Blur",
    "sourceName": "Gradual Blur",
    "category": "scroll",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "GradualBlur",
    "description": "内容根据滚动或触发条件逐渐解除模糊",
    "aliases": [
      "渐进模糊",
      "逐层清晰"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/GradualBlur/GradualBlur.tsx",
    "demoPath": "src/demos/scroll/gradual-blur.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "click-spark",
    "name": "Click Spark",
    "sourceName": "Click Spark",
    "category": "pointer",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "ClickSpark",
    "description": "点击位置触发短促粒子扩散",
    "aliases": [
      "点击火花",
      "点击粒子"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/ClickSpark/ClickSpark.tsx",
    "demoPath": "src/demos/pointer/click-spark.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "magnet",
    "name": "Magnet",
    "sourceName": "Magnet",
    "category": "pointer",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "Magnet",
    "description": "元素向指针轻移并弹性归位",
    "aliases": [
      "磁吸悬停",
      "按钮吸附"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/Magnet/Magnet.tsx",
    "demoPath": "src/demos/pointer/magnet.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "strands",
    "name": "Strands",
    "sourceName": "Strands",
    "category": "background",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "Strands",
    "description": "透明画布上的细带交织起伏",
    "aliases": [
      "光丝",
      "透明丝带"
    ],
    "dependencies": [
      "ogl",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/Strands/Strands.tsx",
    "demoPath": "src/demos/background/strands.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "sticker-peel",
    "name": "Sticker Peel",
    "sourceName": "Sticker Peel",
    "category": "media",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "StickerPeel",
    "description": "贴纸边角翘起并随操作揭开",
    "aliases": [
      "贴纸揭角",
      "贴纸撕开"
    ],
    "dependencies": [
      "gsap",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/StickerPeel/StickerPeel.tsx",
    "demoPath": "src/demos/media/sticker-peel.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "pixel-trail",
    "name": "Pixel Trail",
    "sourceName": "Pixel Trail",
    "category": "pointer",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "PixelTrail",
    "description": "指针后方像素融合为短暂流动轨迹",
    "aliases": [
      "像素拖尾",
      "像素流体"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/PixelTrail/PixelTrail.tsx",
    "demoPath": "src/demos/pointer/pixel-trail.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "cubes",
    "name": "Cubes",
    "sourceName": "Cubes",
    "category": "background",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "Cubes",
    "description": "方块朝向指针转动并响应扫过和点击",
    "aliases": [
      "交互方块",
      "三维方块阵列"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/Cubes/Cubes.tsx",
    "demoPath": "src/demos/background/cubes.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "metallic-paint",
    "name": "Metallic Paint",
    "sourceName": "Metallic Paint",
    "category": "media",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "MetallicPaint",
    "description": "标志表面保留随动的金属流纹",
    "aliases": [
      "金属涂层",
      "流动字标"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/MetallicPaint/MetallicPaint.tsx",
    "demoPath": "src/demos/media/metallic-paint.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "noise",
    "name": "Noise",
    "sourceName": "Noise",
    "category": "background",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "Noise",
    "description": "表面增加细颗粒或选定的噪声质感",
    "aliases": [
      "噪点覆盖",
      "细颗粒",
      "胶片颗粒"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/Noise/Noise.tsx",
    "demoPath": "src/demos/background/noise.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "shape-blur",
    "name": "Shape Blur",
    "sourceName": "Shape Blur",
    "category": "media",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "ShapeBlur",
    "description": "图形在指针处局部失焦后恢复",
    "aliases": [
      "形状模糊",
      "标志失焦"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/ShapeBlur/ShapeBlur.tsx",
    "demoPath": "src/demos/media/shape-blur.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "crosshair",
    "name": "Crosshair",
    "sourceName": "Crosshair",
    "category": "pointer",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "Crosshair",
    "description": "准星、坐标与测量框跟随指针和目标",
    "aliases": [
      "十字光标",
      "坐标准星"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/Crosshair/Crosshair.tsx",
    "demoPath": "src/demos/pointer/crosshair.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "image-trail",
    "name": "Image Trail",
    "sourceName": "Image Trail",
    "category": "pointer",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "ImageTrail",
    "description": "图像副本按指针轨迹依次显现",
    "aliases": [
      "图片拖尾",
      "光标图片"
    ],
    "dependencies": [
      "gsap",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/ImageTrail/ImageTrail.tsx",
    "demoPath": "src/demos/pointer/image-trail.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "ribbons",
    "name": "Ribbons",
    "sourceName": "Ribbons",
    "category": "pointer",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "Ribbons",
    "description": "具有弹性惯性的丝带跟随指针",
    "aliases": [
      "丝带拖尾",
      "弹性丝带"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/Ribbons/Ribbons.tsx",
    "demoPath": "src/demos/pointer/ribbons.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "splash-cursor",
    "name": "Splash Cursor",
    "sourceName": "Splash Cursor",
    "category": "pointer",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "SplashCursor",
    "description": "指针扰动产生液体波纹与水花",
    "aliases": [
      "水花光标",
      "流体光标"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/SplashCursor/SplashCursor.tsx",
    "demoPath": "src/demos/pointer/splash-cursor.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "meta-balls",
    "name": "Meta Balls",
    "sourceName": "Meta Balls",
    "category": "background",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "MetaBalls",
    "description": "液态球靠近合并、拉长和分离",
    "aliases": [
      "融合球",
      "液态球"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/MetaBalls/MetaBalls.tsx",
    "demoPath": "src/demos/background/meta-balls.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "blob-cursor",
    "name": "Blob Cursor",
    "sourceName": "Blob Cursor",
    "category": "pointer",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "BlobCursor",
    "description": "液滴随指针伸展并产生滴落或点击扩散",
    "aliases": [
      "液滴光标",
      "果冻指针"
    ],
    "dependencies": [
      "react",
      "three"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/BlobCursor/BlobCursor.tsx",
    "demoPath": "src/demos/pointer/blob-cursor.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "star-border",
    "name": "Star Border",
    "sourceName": "Star Border",
    "category": "cards",
    "sourceCategory": "animations",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "animations",
      "动画效果"
    ],
    "exportName": "StarBorder",
    "description": "光点沿真实边界移动并留下短暂光迹",
    "aliases": [
      "星光边框",
      "轨道描边"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Animations/StarBorder/StarBorder.tsx",
    "demoPath": "src/demos/cards/star-border.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "holo-card",
    "name": "Holo Card",
    "sourceName": "Holo Card",
    "category": "cards",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "HoloCard",
    "description": "卡片倾斜时保留全息膜与细闪光变化",
    "aliases": [
      "全息卡片",
      "收藏卡"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/HoloCard/HoloCard.tsx",
    "demoPath": "src/demos/cards/holo-card.tsx",
    "motion": "interactive",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "circular-carousel",
    "name": "Circular Carousel",
    "sourceName": "Circular Carousel",
    "category": "media",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "CircularCarousel",
    "description": "图片围绕三维环排列并支持拖动吸附",
    "aliases": [
      "环形轮播",
      "三维环形相册"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/CircularCarousel/CircularCarousel.tsx",
    "demoPath": "src/demos/media/circular-carousel.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "flex-carousel",
    "name": "Flex Carousel",
    "sourceName": "Flex Carousel",
    "category": "media",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "FlexCarousel",
    "description": "无限图片行在边缘产生玻璃扭曲过渡",
    "aliases": [
      "柔性轮播",
      "玻璃边缘轮播"
    ],
    "dependencies": [
      "ogl",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/FlexCarousel/FlexCarousel.tsx",
    "demoPath": "src/demos/media/flex-carousel.tsx",
    "motion": "interactive",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "infinite-spiral",
    "name": "Infinite Spiral",
    "sourceName": "Infinite Spiral",
    "category": "media",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "InfiniteSpiral",
    "description": "图片沿三维螺旋连续循环",
    "aliases": [
      "无限螺旋",
      "螺旋相册"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/InfiniteSpiral/InfiniteSpiral.tsx",
    "demoPath": "src/demos/media/infinite-spiral.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "depth-carousel",
    "name": "Depth Carousel",
    "sourceName": "Depth Carousel",
    "category": "media",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "DepthCarousel",
    "description": "卡片沿深度轨道切换并支持操作",
    "aliases": [
      "景深轮播",
      "纵深卡片"
    ],
    "dependencies": [
      "gsap",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/DepthCarousel/DepthCarousel.tsx",
    "demoPath": "src/demos/media/depth-carousel.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "morph-slider",
    "name": "Morph Slider",
    "sourceName": "Morph Slider",
    "category": "media",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "MorphSlider",
    "description": "相邻图片通过位移形变完成切换",
    "aliases": [
      "变形轮播",
      "图像融合转场"
    ],
    "dependencies": [
      "gsap",
      "ogl",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/MorphSlider/MorphSlider.tsx",
    "demoPath": "src/demos/media/morph-slider.tsx",
    "motion": "interactive",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "drift-wall",
    "name": "Drift Wall",
    "sourceName": "Drift Wall",
    "category": "media",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "DriftWall",
    "description": "连续图块墙透视漂移并悬停抬起",
    "aliases": [
      "漂移照片墙",
      "透视图片墙"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/DriftWall/DriftWall.tsx",
    "demoPath": "src/demos/media/drift-wall.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "accordion-gallery",
    "name": "Accordion Gallery",
    "sourceName": "Accordion Gallery",
    "category": "media",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "AccordionGallery",
    "description": "面板悬停或聚焦时扩展并显示说明",
    "aliases": [
      "手风琴画廊",
      "展开照片"
    ],
    "dependencies": [
      "gsap",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/AccordionGallery/AccordionGallery.tsx",
    "demoPath": "src/demos/media/accordion-gallery.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "specular-button",
    "name": "Specular Button",
    "sourceName": "Specular Button",
    "category": "actions",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "SpecularButton",
    "description": "按钮高光沿边缘响应指针",
    "aliases": [
      "玻璃按钮",
      "镜面按钮"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/SpecularButton/SpecularButton.tsx",
    "demoPath": "src/demos/actions/specular-button.tsx",
    "motion": "interactive",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "option-wheel",
    "name": "Option Wheel",
    "sourceName": "Option Wheel",
    "category": "form",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "OptionWheel",
    "description": "选项在弧面轮盘中通过滚动拖拽或键盘选择",
    "aliases": [
      "滚轮选择",
      "弧形选项"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/OptionWheel/OptionWheel.tsx",
    "demoPath": "src/demos/form/option-wheel.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "curved-input",
    "name": "Curved Input",
    "sourceName": "Curved Input",
    "category": "form",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "CurvedInput",
    "description": "输入文本、光标和提交入口沿弧线布局",
    "aliases": [
      "弧形输入",
      "弯曲输入框"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/CurvedInput/CurvedInput.tsx",
    "demoPath": "src/demos/form/curved-input.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "line-sidebar",
    "name": "Line Sidebar",
    "sourceName": "Line Sidebar",
    "category": "navigation",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "LineSidebar",
    "description": "导航条目在指针附近轻移和强调",
    "aliases": [
      "线性侧栏",
      "指针邻近导航"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/LineSidebar/LineSidebar.tsx",
    "demoPath": "src/demos/navigation/line-sidebar.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "animated-list",
    "name": "Animated List",
    "sourceName": "Animated List",
    "category": "data",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "AnimatedList",
    "description": "列表行依次入场且选择高亮平滑移动",
    "aliases": [
      "动画列表",
      "选择列表",
      "列表入场"
    ],
    "dependencies": [
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/AnimatedList/AnimatedList.tsx",
    "demoPath": "src/demos/data/animated-list.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "scroll-stack",
    "name": "Scroll Stack",
    "sourceName": "Scroll Stack",
    "category": "scroll",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "ScrollStack",
    "description": "卡片随滚动固定并逐层堆叠",
    "aliases": [
      "滚动卡片堆叠",
      "吸顶堆栈"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/ScrollStack/ScrollStack.tsx",
    "demoPath": "src/demos/scroll/scroll-stack.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "bubble-menu",
    "name": "Bubble Menu",
    "sourceName": "Bubble Menu",
    "category": "navigation",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "BubbleMenu",
    "description": "圆形菜单入口展开并错开显现选项",
    "aliases": [
      "气泡菜单",
      "展开圆形菜单"
    ],
    "dependencies": [
      "gsap",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/BubbleMenu/BubbleMenu.tsx",
    "demoPath": "src/demos/navigation/bubble-menu.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "magic-bento",
    "name": "Magic Bento",
    "sourceName": "Magic Bento",
    "category": "cards",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "MagicBento",
    "description": "不同尺寸卡片保留各自展开与互动效果",
    "aliases": [
      "便当网格",
      "互动卡片网格"
    ],
    "dependencies": [
      "gsap",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/MagicBento/MagicBento.tsx",
    "demoPath": "src/demos/cards/magic-bento.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 660
  },
  {
    "id": "circular-gallery",
    "name": "Circular Gallery",
    "sourceName": "Circular Gallery",
    "category": "media",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "CircularGallery",
    "description": "图片沿圆弧或环形空间旋转浏览",
    "aliases": [
      "环形画廊",
      "旋转图片"
    ],
    "dependencies": [
      "ogl",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/CircularGallery/CircularGallery.tsx",
    "demoPath": "src/demos/media/circular-gallery.tsx",
    "motion": "interactive",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "reflective-card",
    "name": "Reflective Card",
    "sourceName": "Reflective Card",
    "category": "cards",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "ReflectiveCard",
    "description": "卡片保留反射层与指针高光变化",
    "aliases": [
      "反射卡片",
      "摄像头镜面"
    ],
    "dependencies": [
      "lucide-react",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/ReflectiveCard/ReflectiveCard.tsx",
    "demoPath": "src/demos/cards/reflective-card.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "card-nav",
    "name": "Card Nav",
    "sourceName": "Card Nav",
    "category": "navigation",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "CardNav",
    "description": "导航展开卡片分区并显示子链接",
    "aliases": [
      "卡片导航",
      "导航展开面板"
    ],
    "dependencies": [
      "gsap",
      "react",
      "react-icons"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/CardNav/CardNav.tsx",
    "demoPath": "src/demos/navigation/card-nav.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "stack",
    "name": "Stack",
    "sourceName": "Stack",
    "category": "cards",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "Stack",
    "description": "卡片可拖拽甩动或点击并移到堆底",
    "aliases": [
      "卡片堆",
      "甩动卡片"
    ],
    "dependencies": [
      "motion",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/Stack/Stack.tsx",
    "demoPath": "src/demos/cards/stack.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "fluid-glass",
    "name": "Fluid Glass",
    "sourceName": "Fluid Glass",
    "category": "cards",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "FluidGlass",
    "description": "玻璃容器保留液体位移与背景折射",
    "aliases": [
      "流体玻璃",
      "动态玻璃"
    ],
    "dependencies": [
      "@react-three/drei",
      "@react-three/fiber",
      "maath",
      "react",
      "three"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/FluidGlass/FluidGlass.tsx",
    "demoPath": "src/demos/cards/fluid-glass.tsx",
    "motion": "interactive",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "pill-nav",
    "name": "Pill Nav",
    "sourceName": "Pill Nav",
    "category": "navigation",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "PillNav",
    "description": "导航的选中底板平滑滑动到目标项",
    "aliases": [
      "胶囊导航",
      "滑动导航高亮"
    ],
    "dependencies": [
      "gsap",
      "react",
      "react-router-dom"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/PillNav/PillNav.tsx",
    "demoPath": "src/demos/navigation/pill-nav.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "tilted-card",
    "name": "Tilted Card",
    "sourceName": "Tilted Card",
    "category": "cards",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "TiltedCard",
    "description": "卡片随指针改变三维倾角",
    "aliases": [
      "倾斜卡片",
      "指针视差卡"
    ],
    "dependencies": [
      "motion",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/TiltedCard/TiltedCard.tsx",
    "demoPath": "src/demos/cards/tilted-card.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "masonry",
    "name": "Masonry",
    "sourceName": "Masonry",
    "category": "media",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "Masonry",
    "description": "不等高内容响应式排布并平滑重排",
    "aliases": [
      "瀑布流",
      "不等高图片布局"
    ],
    "dependencies": [
      "gsap",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/Masonry/Masonry.tsx",
    "demoPath": "src/demos/media/masonry.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "glass-surface",
    "name": "Glass Surface",
    "sourceName": "Glass Surface",
    "category": "cards",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "GlassSurface",
    "description": "圆角表面保留对背后内容的局部折射",
    "aliases": [
      "毛玻璃",
      "磨砂玻璃",
      "玻璃表面",
      "毛玻璃卡片"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/GlassSurface/GlassSurface.tsx",
    "demoPath": "src/demos/cards/glass-surface.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "dome-gallery",
    "name": "Dome Gallery",
    "sourceName": "Dome Gallery",
    "category": "media",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "DomeGallery",
    "description": "图像映射到半球空间并可浏览",
    "aliases": [
      "穹顶画廊",
      "半球相册"
    ],
    "dependencies": [
      "@use-gesture/react",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/DomeGallery/DomeGallery.tsx",
    "demoPath": "src/demos/media/dome-gallery.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "chroma-grid",
    "name": "Chroma Grid",
    "sourceName": "Chroma Grid",
    "category": "cards",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "ChromaGrid",
    "description": "图片网格在移动光斑内恢复颜色",
    "aliases": [
      "色彩聚光网格",
      "灰度照片揭色"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/ChromaGrid/ChromaGrid.tsx",
    "demoPath": "src/demos/cards/chroma-grid.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "folder",
    "name": "Folder",
    "sourceName": "Folder",
    "category": "data",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "Folder",
    "description": "文件夹展开后可选择内部页面",
    "aliases": [
      "文件夹",
      "翻开文件夹"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/Folder/Folder.tsx",
    "demoPath": "src/demos/data/folder.tsx",
    "motion": "interactive",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "staggered-menu",
    "name": "Staggered Menu",
    "sourceName": "Staggered Menu",
    "category": "navigation",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "StaggeredMenu",
    "description": "菜单按顺序展示和退出各选项",
    "aliases": [
      "交错菜单",
      "菜单逐项展开"
    ],
    "dependencies": [
      "gsap",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/StaggeredMenu/StaggeredMenu.tsx",
    "demoPath": "src/demos/navigation/staggered-menu.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "model-viewer",
    "name": "Model Viewer",
    "sourceName": "Model Viewer",
    "category": "media",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "ModelViewer",
    "description": "三维模型自动构图并提供观察操作",
    "aliases": [
      "三维模型",
      "3D模型查看"
    ],
    "dependencies": [
      "@react-three/drei",
      "@react-three/fiber",
      "react",
      "three"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/ModelViewer/ModelViewer.tsx",
    "demoPath": "src/demos/media/model-viewer.tsx",
    "motion": "interactive",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "lanyard",
    "name": "Lanyard",
    "sourceName": "Lanyard",
    "category": "media",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "Lanyard",
    "description": "卡牌与带子保留拖拽摆动和翻转",
    "aliases": [
      "挂绳卡片",
      "工牌物理"
    ],
    "dependencies": [
      "react",
      "three"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/Lanyard/Lanyard.tsx",
    "demoPath": "src/demos/media/lanyard.tsx",
    "motion": "interactive",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "profile-card",
    "name": "Profile Card",
    "sourceName": "Profile Card",
    "category": "cards",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "ProfileCard",
    "description": "资料卡保留指针倾斜与图案反光",
    "aliases": [
      "个人资料卡",
      "用户卡片"
    ],
    "dependencies": [
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/ProfileCard/ProfileCard.tsx",
    "demoPath": "src/demos/cards/profile-card.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 680
  },
  {
    "id": "dock",
    "name": "Dock",
    "sourceName": "Dock",
    "category": "navigation",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "Dock",
    "description": "图标在指针靠近时放大并保留动作状态",
    "aliases": [
      "底部Dock",
      "图标停靠栏",
      "放大菜单"
    ],
    "dependencies": [
      "react",
      "react-dom"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/Dock/Dock.tsx",
    "demoPath": "src/demos/navigation/dock.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "gooey-nav",
    "name": "Gooey Nav",
    "sourceName": "Gooey Nav",
    "category": "navigation",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "GooeyNav",
    "description": "选中底板以液态融合方式移动",
    "aliases": [
      "液态导航",
      "融合选中块"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/GooeyNav/GooeyNav.tsx",
    "demoPath": "src/demos/navigation/gooey-nav.tsx",
    "motion": "interactive",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "pixel-card",
    "name": "Pixel Card",
    "sourceName": "Pixel Card",
    "category": "cards",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "PixelCard",
    "description": "像素从中心或指针处点亮卡片",
    "aliases": [
      "像素卡片",
      "像素悬停"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/PixelCard/PixelCard.tsx",
    "demoPath": "src/demos/cards/pixel-card.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "carousel",
    "name": "Carousel · React Bits",
    "sourceName": "Carousel",
    "category": "media",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "Carousel",
    "description": "卡片支持滑动与切换并可配置自动播放",
    "aliases": [
      "轮播",
      "滑动卡片",
      "导览轮播"
    ],
    "dependencies": [
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/Carousel/Carousel.tsx",
    "demoPath": "src/demos/media/carousel.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "spotlight-card",
    "name": "Spotlight Card",
    "sourceName": "Spotlight Card",
    "category": "cards",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "SpotlightCard",
    "description": "柔和光斑跟随指针并照亮边缘",
    "aliases": [
      "聚光卡片",
      "悬停聚光"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/SpotlightCard/SpotlightCard.tsx",
    "demoPath": "src/demos/cards/spotlight-card.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "border-glow",
    "name": "Border Glow",
    "sourceName": "Border Glow",
    "category": "cards",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "BorderGlow",
    "description": "边框的光色随指针方向和距离变化",
    "aliases": [
      "边缘发光",
      "网格光边"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/BorderGlow/BorderGlow.tsx",
    "demoPath": "src/demos/cards/border-glow.tsx",
    "motion": "interactive",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "flying-posters",
    "name": "Flying Posters",
    "sourceName": "Flying Posters",
    "category": "media",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "FlyingPosters",
    "description": "海报在连续列中随滚动或拖动翻转",
    "aliases": [
      "飞行海报",
      "翻转海报"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/FlyingPosters/FlyingPosters.tsx",
    "demoPath": "src/demos/media/flying-posters.tsx",
    "motion": "interactive",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "card-swap",
    "name": "Card Swap",
    "sourceName": "Card Swap",
    "category": "cards",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "CardSwap",
    "description": "前卡片按计时或甩动操作移到后方",
    "aliases": [
      "卡片交换",
      "自动卡片堆"
    ],
    "dependencies": [
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/CardSwap/CardSwap.tsx",
    "demoPath": "src/demos/cards/card-swap.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 640
  },
  {
    "id": "glass-icons",
    "name": "Glass Icons",
    "sourceName": "Glass Icons",
    "category": "media",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "GlassIcons",
    "description": "图标玻璃层保留背景透色与折射",
    "aliases": [
      "玻璃图标",
      "毛玻璃图标"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/GlassIcons/GlassIcons.tsx",
    "demoPath": "src/demos/media/glass-icons.tsx",
    "motion": "interactive",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "decay-card",
    "name": "Decay Card",
    "sourceName": "Decay Card",
    "category": "cards",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "DecayCard",
    "description": "图片响应指针撕裂形变后复原",
    "aliases": [
      "撕裂卡片",
      "消融图片"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/DecayCard/DecayCard.tsx",
    "demoPath": "src/demos/cards/decay-card.tsx",
    "motion": "interactive",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "flowing-menu",
    "name": "Flowing Menu",
    "sourceName": "Flowing Menu",
    "category": "navigation",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "FlowingMenu",
    "description": "激活指示在菜单条目之间连续流动",
    "aliases": [
      "流动菜单",
      "跟随选中指示"
    ],
    "dependencies": [
      "gsap",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/FlowingMenu/FlowingMenu.tsx",
    "demoPath": "src/demos/navigation/flowing-menu.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "elastic-slider",
    "name": "Elastic Slider",
    "sourceName": "Elastic Slider",
    "category": "form",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "ElasticSlider",
    "description": "滑块拉伸后通过弹性运动归位",
    "aliases": [
      "弹性滑块",
      "弹簧滑块"
    ],
    "dependencies": [
      "@chakra-ui/react",
      "motion",
      "react",
      "react-icons"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/ElasticSlider/ElasticSlider.tsx",
    "demoPath": "src/demos/form/elastic-slider.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "counter",
    "name": "Counter",
    "sourceName": "Counter",
    "category": "data",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "Counter",
    "description": "数值变化以可配置的滚动或缓动呈现",
    "aliases": [
      "滚动数字",
      "数字计数器"
    ],
    "dependencies": [
      "motion",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/Counter/Counter.tsx",
    "demoPath": "src/demos/data/counter.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "infinite-menu",
    "name": "Infinite Menu",
    "sourceName": "Infinite Menu",
    "category": "navigation",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "InfiniteMenu",
    "description": "可拖拽图片球体吸附到前方并显示名称",
    "aliases": [
      "球形菜单",
      "无限图片菜单"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/InfiniteMenu/InfiniteMenu.tsx",
    "demoPath": "src/demos/navigation/infinite-menu.tsx",
    "motion": "interactive",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "stepper",
    "name": "Stepper",
    "sourceName": "Stepper",
    "category": "layout",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "Stepper",
    "description": "步骤状态与内容切换保持同步并可回退",
    "aliases": [
      "步骤器",
      "多步流程",
      "步骤导航"
    ],
    "dependencies": [
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/Stepper/Stepper.tsx",
    "demoPath": "src/demos/layout/stepper.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "bounce-cards",
    "name": "Bounce Cards",
    "sourceName": "Bounce Cards",
    "category": "cards",
    "sourceCategory": "components",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "components",
      "组合组件"
    ],
    "exportName": "BounceCards",
    "description": "照片扇面弹入且聚焦卡片展开扶正",
    "aliases": [
      "弹入照片",
      "扇形卡片"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Components/BounceCards/BounceCards.tsx",
    "demoPath": "src/demos/cards/bounce-cards.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "shredder",
    "name": "Shredder",
    "sourceName": "Shredder",
    "category": "data",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "Shredder",
    "description": "拖入底部的行被分解成纸条",
    "aliases": [
      "碎纸机",
      "拖拽删除"
    ],
    "dependencies": [
      "react",
      "react-dom"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/Shredder/Shredder.tsx",
    "demoPath": "src/demos/data/shredder.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 720
  },
  {
    "id": "paper-crumple",
    "name": "Paper Crumple",
    "sourceName": "Paper Crumple",
    "category": "media",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "PaperCrumple",
    "description": "图像在按住拖动时表现纸张褶皱",
    "aliases": [
      "揉纸",
      "纸张捏皱"
    ],
    "dependencies": [
      "react",
      "three"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/PaperCrumple/PaperCrumple.tsx",
    "demoPath": "src/demos/media/paper-crumple.tsx",
    "motion": "interactive",
    "webgl": "webgl2",
    "minHeight": 720
  },
  {
    "id": "tear-ticket",
    "name": "Tear Ticket",
    "sourceName": "Tear Ticket",
    "category": "cards",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "TearTicket",
    "description": "票根沿虚线逐步撕开并脱落",
    "aliases": [
      "撕票",
      "票根撕开"
    ],
    "dependencies": [
      "motion",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/TearTicket/TearTicket.tsx",
    "demoPath": "src/demos/cards/tear-ticket.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "flip-card",
    "name": "Flip Card",
    "sourceName": "Flip Card",
    "category": "cards",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "FlipCard",
    "description": "卡片通过点击或拖动在两面间翻转",
    "aliases": [
      "翻面卡片",
      "双面卡"
    ],
    "dependencies": [
      "motion",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/FlipCard/FlipCard.tsx",
    "demoPath": "src/demos/cards/flip-card.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 640
  },
  {
    "id": "branched-menu",
    "name": "Branched Menu",
    "sourceName": "Branched Menu",
    "category": "navigation",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "BranchedMenu",
    "description": "分组菜单折叠展开并描绘选中分支",
    "aliases": [
      "树枝菜单",
      "分支导航"
    ],
    "dependencies": [
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/BranchedMenu/BranchedMenu.tsx",
    "demoPath": "src/demos/navigation/branched-menu.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "folder-float",
    "name": "Folder Float",
    "sourceName": "Folder Float",
    "category": "data",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "FolderFloat",
    "description": "文件夹打开时内部便笺弹到周围",
    "aliases": [
      "悬浮文件夹",
      "纸条弹出"
    ],
    "dependencies": [
      "matter-js",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/FolderFloat/FolderFloat.tsx",
    "demoPath": "src/demos/data/folder-float.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 640
  },
  {
    "id": "refine-frame",
    "name": "Refine Frame",
    "sourceName": "Refine Frame",
    "category": "media",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "RefineFrame",
    "description": "媒体框按生成阶段更新图像且尺寸稳定",
    "aliases": [
      "生成过程图片",
      "图像阶段",
      "生成预览"
    ],
    "dependencies": [
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/RefineFrame/RefineFrame.tsx",
    "demoPath": "src/demos/media/refine-frame.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 640
  },
  {
    "id": "thought-line",
    "name": "Thought Line",
    "sourceName": "Thought Line",
    "category": "feedback",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "ThoughtLine",
    "description": "公开步骤摘要与计时器在完成后折为单行",
    "aliases": [
      "思考状态",
      "推理摘要",
      "思考过程",
      "步骤折叠"
    ],
    "dependencies": [
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "motion",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/ThoughtLine/ThoughtLine.tsx",
    "demoPath": "src/demos/feedback/thought-line.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "voice-pill",
    "name": "Voice Pill",
    "sourceName": "Voice Pill",
    "category": "actions",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "VoicePill",
    "description": "按钮在录音状态展开为波形和计时胶囊",
    "aliases": [
      "语音按钮",
      "录音胶囊",
      "音量条"
    ],
    "dependencies": [
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/VoicePill/VoicePill.tsx",
    "demoPath": "src/demos/actions/voice-pill.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "slosh-gauge",
    "name": "Slosh Gauge",
    "sourceName": "Slosh Gauge",
    "category": "feedback",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "SloshGauge",
    "description": "液体高度跟随数值并在变化时晃动",
    "aliases": [
      "液体进度",
      "水位进度",
      "仪表"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/SloshGauge/SloshGauge.tsx",
    "demoPath": "src/demos/feedback/slosh-gauge.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "prompt-bar",
    "name": "Prompt Bar",
    "sourceName": "Prompt Bar",
    "category": "form",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "PromptBar",
    "description": "消息输入整合来源命令模型与附件入口",
    "aliases": [
      "聊天输入",
      "提示词输入",
      "模型选择",
      "附件输入"
    ],
    "dependencies": [
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "motion",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/PromptBar/PromptBar.tsx",
    "demoPath": "src/demos/form/prompt-bar.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 640
  },
  {
    "id": "swipe-toast",
    "name": "Swipe Toast",
    "sourceName": "Swipe Toast",
    "category": "feedback",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "SwipeToast",
    "description": "通知支持滑动关闭并显示剩余时间",
    "aliases": [
      "滑动通知",
      "可拖拽提示"
    ],
    "dependencies": [
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "motion",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/SwipeToast/SwipeToast.tsx",
    "demoPath": "src/demos/feedback/swipe-toast.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "sling-button",
    "name": "Sling Button",
    "sourceName": "Sling Button",
    "category": "actions",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "SlingButton",
    "description": "拖拽蓄力并释放触发发送动作",
    "aliases": [
      "弹弓按钮",
      "拖拽发送"
    ],
    "dependencies": [
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "motion",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/SlingButton/SlingButton.tsx",
    "demoPath": "src/demos/actions/sling-button.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "bell-toggle",
    "name": "Bell Toggle",
    "sourceName": "Bell Toggle",
    "category": "actions",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "BellToggle",
    "description": "按下后铃铛动画与标签状态同步变化",
    "aliases": [
      "铃铛开关",
      "通知开关"
    ],
    "dependencies": [
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "motion",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/BellToggle/BellToggle.tsx",
    "demoPath": "src/demos/actions/bell-toggle.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "call-chip",
    "name": "Call Chip",
    "sourceName": "Call Chip",
    "category": "feedback",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "CallChip",
    "description": "调用条目展示真实计时与结果状态",
    "aliases": [
      "工具调用状态",
      "工具执行",
      "调用计时"
    ],
    "dependencies": [
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/CallChip/CallChip.tsx",
    "demoPath": "src/demos/feedback/call-chip.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "status-mark",
    "name": "Status Mark",
    "sourceName": "Status Mark",
    "category": "feedback",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "StatusMark",
    "description": "图形在空闲进度和结果状态间变形",
    "aliases": [
      "任务状态",
      "智能体状态",
      "状态图标"
    ],
    "dependencies": [
      "motion",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/StatusMark/StatusMark.tsx",
    "demoPath": "src/demos/feedback/status-mark.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "glide-select",
    "name": "Glide Select",
    "sourceName": "Glide Select",
    "category": "form",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "GlideSelect",
    "description": "下拉从入口角部展开且高亮随选项移动",
    "aliases": [
      "胶囊选择器",
      "滑动选项"
    ],
    "dependencies": [
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/GlideSelect/GlideSelect.tsx",
    "demoPath": "src/demos/form/glide-select.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 640
  },
  {
    "id": "swipe-row",
    "name": "Swipe Row",
    "sourceName": "Swipe Row",
    "category": "data",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "SwipeRow",
    "description": "行侧滑显露操作并按规则提交动作",
    "aliases": [
      "侧滑行",
      "侧滑删除",
      "行操作"
    ],
    "dependencies": [
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "motion",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/SwipeRow/SwipeRow.tsx",
    "demoPath": "src/demos/data/swipe-row.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "jelly-radio",
    "name": "Jelly Radio",
    "sourceName": "Jelly Radio",
    "category": "form",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "JellyRadio",
    "description": "选中项膨起并带动相邻项让位",
    "aliases": [
      "果冻单选",
      "弹性单选组"
    ],
    "dependencies": [
      "motion",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/JellyRadio/JellyRadio.tsx",
    "demoPath": "src/demos/form/jelly-radio.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "comet-dial",
    "name": "Comet Dial",
    "sourceName": "Comet Dial",
    "category": "form",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "CometDial",
    "description": "角度选择器显示刻度与移动尾迹",
    "aliases": [
      "彗星旋钮",
      "角度旋钮"
    ],
    "dependencies": [
      "motion",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/CometDial/CometDial.tsx",
    "demoPath": "src/demos/form/comet-dial.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "wake-slider",
    "name": "Wake Slider",
    "sourceName": "Wake Slider",
    "category": "form",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "WakeSlider",
    "description": "滑动范围控件以细条波尾表示拖动速度",
    "aliases": [
      "波尾滑块",
      "细条滑块"
    ],
    "dependencies": [
      "motion",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/WakeSlider/WakeSlider.tsx",
    "demoPath": "src/demos/form/wake-slider.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "code-slots",
    "name": "Code Slots",
    "sourceName": "Code Slots",
    "category": "form",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "CodeSlots",
    "description": "数字槽输入支持粘贴与可用的自动填充",
    "aliases": [
      "验证码输入",
      "一次性密码",
      "数字输入槽"
    ],
    "dependencies": [
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "motion",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/CodeSlots/CodeSlots.tsx",
    "demoPath": "src/demos/form/code-slots.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "dodge-field",
    "name": "Dodge Field",
    "sourceName": "Dodge Field",
    "category": "pointer",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "DodgeField",
    "description": "内容短暂避开指针后归位",
    "aliases": [
      "躲避指针",
      "避让元素"
    ],
    "dependencies": [
      "motion",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/DodgeField/DodgeField.tsx",
    "demoPath": "src/demos/pointer/dodge-field.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "lattice-loader",
    "name": "Lattice Loader",
    "sourceName": "Lattice Loader",
    "category": "feedback",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "LatticeLoader",
    "description": "网格亮度波与真实运行时间对应",
    "aliases": [
      "网格加载",
      "智能体加载",
      "运行计时"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/LatticeLoader/LatticeLoader.tsx",
    "demoPath": "src/demos/feedback/lattice-loader.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "scrub-field",
    "name": "Scrub Field",
    "sourceName": "Scrub Field",
    "category": "form",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "ScrubField",
    "description": "数字可横向拖动调整或点击输入",
    "aliases": [
      "拖拽数字",
      "数值调节",
      "数值输入"
    ],
    "dependencies": [
      "motion",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/ScrubField/ScrubField.tsx",
    "demoPath": "src/demos/form/scrub-field.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "fuse-button",
    "name": "Fuse Button",
    "sourceName": "Fuse Button",
    "category": "actions",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "FuseButton",
    "description": "动作完成后提供有期限的撤销入口",
    "aliases": [
      "撤销按钮",
      "限时撤销"
    ],
    "dependencies": [
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/FuseButton/FuseButton.tsx",
    "demoPath": "src/demos/actions/fuse-button.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "warm-tooltip",
    "name": "Warm Tooltip",
    "sourceName": "Warm Tooltip",
    "category": "overlay",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "WarmTooltip",
    "description": "第一项延迟提示后相邻项更快出现",
    "aliases": [
      "连续提示",
      "暖启动提示",
      "工具提示"
    ],
    "dependencies": [
      "motion",
      "react",
      "react-dom"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/WarmTooltip/WarmTooltip.tsx",
    "demoPath": "src/demos/overlay/warm-tooltip.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "slide-commit",
    "name": "Slide Commit",
    "sourceName": "Slide Commit",
    "category": "actions",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "SlideCommit",
    "description": "滑至目标后提交并展示真实等待与结果",
    "aliases": [
      "滑动确认",
      "滑块提交"
    ],
    "dependencies": [
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "motion",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/SlideCommit/SlideCommit.tsx",
    "demoPath": "src/demos/actions/slide-commit.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "rubber-segment",
    "name": "Rubber Segment",
    "sourceName": "Rubber Segment",
    "category": "form",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "RubberSegment",
    "description": "分段选中底块在切换时拉伸并归位",
    "aliases": [
      "橡胶分段",
      "弹性分段控件"
    ],
    "dependencies": [
      "motion",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/RubberSegment/RubberSegment.tsx",
    "demoPath": "src/demos/form/rubber-segment.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "pulse-heart",
    "name": "Pulse Heart",
    "sourceName": "Pulse Heart",
    "category": "actions",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "PulseHeart",
    "description": "点赞状态与计数同步并有短促形变",
    "aliases": [
      "点赞",
      "心形按钮"
    ],
    "dependencies": [
      "@hugeicons/core-free-icons",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/PulseHeart/PulseHeart.tsx",
    "demoPath": "src/demos/actions/pulse-heart.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "spring-check",
    "name": "Spring Check",
    "sourceName": "Spring Check",
    "category": "form",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "SpringCheck",
    "description": "复选状态驱动填色勾线与文本样式",
    "aliases": [
      "弹簧复选",
      "完成勾选",
      "待办勾选"
    ],
    "dependencies": [
      "@hugeicons/core-free-icons",
      "motion",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/SpringCheck/SpringCheck.tsx",
    "demoPath": "src/demos/form/spring-check.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "peek-rating",
    "name": "Peek Rating",
    "sourceName": "Peek Rating",
    "category": "form",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "PeekRating",
    "description": "预览星级抬起，提交后固定真实评分",
    "aliases": [
      "星级评分",
      "悬停评分"
    ],
    "dependencies": [
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/PeekRating/PeekRating.tsx",
    "demoPath": "src/demos/form/peek-rating.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "hold-button",
    "name": "Hold Button",
    "sourceName": "Hold Button",
    "category": "actions",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "HoldButton",
    "description": "按住填充进度，提前放开则回退",
    "aliases": [
      "长按确认",
      "按住完成"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/HoldButton/HoldButton.tsx",
    "demoPath": "src/demos/actions/hold-button.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "squish-switch",
    "name": "Squish Switch",
    "sourceName": "Squish Switch",
    "category": "form",
    "sourceCategory": "micro",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "micro",
      "微交互"
    ],
    "exportName": "SquishSwitch",
    "description": "开关圆钮随操作速度拉伸并回弹",
    "aliases": [
      "弹性开关",
      "挤压开关"
    ],
    "dependencies": [
      "motion",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Micro/SquishSwitch/SquishSwitch.tsx",
    "demoPath": "src/demos/form/squish-switch.tsx",
    "motion": "interactive",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "flux-lines",
    "name": "Flux Lines",
    "sourceName": "Flux Lines",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "FluxLines",
    "description": "线条勾勒流动场并被指针扰动",
    "aliases": [
      "磁流线",
      "磁场背景"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/FluxLines/FluxLines.tsx",
    "demoPath": "src/demos/background/flux-lines.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "pattern-waves",
    "name": "Pattern Waves",
    "sourceName": "Pattern Waves",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "PatternWaves",
    "description": "点线或字符纹样随丝绸般波面起伏",
    "aliases": [
      "网点波浪",
      "纹样波浪"
    ],
    "dependencies": [
      "ogl",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/PatternWaves/PatternWaves.tsx",
    "demoPath": "src/demos/background/pattern-waves.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "micro-slats",
    "name": "Micro Slats",
    "sourceName": "Micro Slats",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "MicroSlats",
    "description": "细片阵列以透视波浪呈现",
    "aliases": [
      "细片波浪",
      "薄片墙"
    ],
    "dependencies": [
      "ogl",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/MicroSlats/MicroSlats.tsx",
    "demoPath": "src/demos/background/micro-slats.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "shape-waves",
    "name": "Shape Waves",
    "sourceName": "Shape Waves",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "ShapeWaves",
    "description": "几何图形沿波面改变亮度与大小",
    "aliases": [
      "图形波浪",
      "几何波场"
    ],
    "dependencies": [
      "react",
      "vgpu"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/ShapeWaves/ShapeWaves.tsx",
    "demoPath": "src/demos/background/shape-waves.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "aero-shards",
    "name": "Aero Shards",
    "sourceName": "Aero Shards",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "AeroShards",
    "description": "折叠碎片形成受指针影响的风场",
    "aliases": [
      "风中碎片",
      "箔片背景"
    ],
    "dependencies": [
      "react",
      "vgpu"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/AeroShards/AeroShards.tsx",
    "demoPath": "src/demos/background/aero-shards.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "ghost-fibers",
    "name": "Ghost Fibers",
    "sourceName": "Ghost Fibers",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "GhostFibers",
    "description": "纤维场保留光带扭转与空间深度",
    "aliases": [
      "纤维光带",
      "递归纤维"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/GhostFibers/GhostFibers.tsx",
    "demoPath": "src/demos/background/ghost-fibers.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "crt-warp",
    "name": "CRT Warp",
    "sourceName": "CRT Warp",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "CRTWarp",
    "description": "扫描线与弯曲画面形成复古显示效果",
    "aliases": [
      "CRT曲面",
      "显像管背景"
    ],
    "dependencies": [
      "react",
      "three"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/CRTWarp/CRTWarp.tsx",
    "demoPath": "src/demos/background/crt-warp.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "molten-metal",
    "name": "Molten Metal",
    "sourceName": "Molten Metal",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "MoltenMetal",
    "description": "流体细丝与亮核保留融化般纹理",
    "aliases": [
      "熔融金属",
      "熔流背景"
    ],
    "dependencies": [
      "ogl",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/MoltenMetal/MoltenMetal.tsx",
    "demoPath": "src/demos/background/molten-metal.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "gradient-waves",
    "name": "Gradient Waves",
    "sourceName": "Gradient Waves",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "GradientWaves",
    "description": "正弦波向柔和地平线滚动",
    "aliases": [
      "渐变波浪",
      "朦胧地平线"
    ],
    "dependencies": [
      "ogl",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/GradientWaves/GradientWaves.tsx",
    "demoPath": "src/demos/background/gradient-waves.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "web-threads",
    "name": "Web Threads",
    "sourceName": "Web Threads",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "WebThreads",
    "description": "丝线汇聚并形成交织的发光场",
    "aliases": [
      "交织光线",
      "蛛网丝线"
    ],
    "dependencies": [
      "ogl",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/WebThreads/WebThreads.tsx",
    "demoPath": "src/demos/background/web-threads.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "topography",
    "name": "Topography",
    "sourceName": "Topography",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "Topography",
    "description": "等高线随高度变化构成动态地形",
    "aliases": [
      "等高线",
      "地形背景"
    ],
    "dependencies": [
      "ogl",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/Topography/Topography.tsx",
    "demoPath": "src/demos/background/topography.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "light-tunnel",
    "name": "Light Tunnel",
    "sourceName": "Light Tunnel",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "LightTunnel",
    "description": "径向光线朝空间深处推进",
    "aliases": [
      "光隧道",
      "径向光纤"
    ],
    "dependencies": [
      "ogl",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/LightTunnel/LightTunnel.tsx",
    "demoPath": "src/demos/background/light-tunnel.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "sliced-waves",
    "name": "Sliced Waves",
    "sourceName": "Sliced Waves",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "SlicedWaves",
    "description": "光条切片形成有深度的连续波面",
    "aliases": [
      "切片波浪",
      "光条波浪"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/SlicedWaves/SlicedWaves.tsx",
    "demoPath": "src/demos/background/sliced-waves.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "acid-squares",
    "name": "Acid Squares",
    "sourceName": "Acid Squares",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "AcidSquares",
    "description": "堆叠方框与光环形成前后纵深",
    "aliases": [
      "方形隧道",
      "层叠方框"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/AcidSquares/AcidSquares.tsx",
    "demoPath": "src/demos/background/acid-squares.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "scanner",
    "name": "Scanner",
    "sourceName": "Scanner",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "Scanner",
    "description": "干涉条带持续平缓扫描",
    "aliases": [
      "扫描波",
      "示波器纹理"
    ],
    "dependencies": [
      "ogl",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/Scanner/Scanner.tsx",
    "demoPath": "src/demos/background/scanner.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "ferrofluid",
    "name": "Ferrofluid",
    "sourceName": "Ferrofluid",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "Ferrofluid",
    "description": "磁流体尖峰随波面和指针变化",
    "aliases": [
      "磁流体",
      "液体尖峰"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/Ferrofluid/Ferrofluid.tsx",
    "demoPath": "src/demos/background/ferrofluid.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "lightfall",
    "name": "Lightfall",
    "sourceName": "Lightfall",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "Lightfall",
    "description": "光线沿弯曲空间下落并响应指针",
    "aliases": [
      "下落光线",
      "弯曲光雨"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/Lightfall/Lightfall.tsx",
    "demoPath": "src/demos/background/lightfall.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "liquid-ether",
    "name": "Liquid Ether",
    "sourceName": "Liquid Ether",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "LiquidEther",
    "description": "可调颜色的液态场保持流动扭曲",
    "aliases": [
      "流体渐变",
      "液态背景"
    ],
    "dependencies": [
      "react",
      "three"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/LiquidEther/LiquidEther.tsx",
    "demoPath": "src/demos/background/liquid-ether.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "prism",
    "name": "Prism",
    "sourceName": "Prism",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "Prism",
    "description": "棱镜保持旋转、光强与形态变化",
    "aliases": [
      "棱镜",
      "旋转棱镜"
    ],
    "dependencies": [
      "ogl",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/Prism/Prism.tsx",
    "demoPath": "src/demos/background/prism.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "dark-veil",
    "name": "Dark Veil",
    "sourceName": "Dark Veil",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "DarkVeil",
    "description": "光纱缓慢漂移并绕过指针",
    "aliases": [
      "暗幕光",
      "流动薄纱"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/DarkVeil/DarkVeil.tsx",
    "demoPath": "src/demos/background/dark-veil.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "light-pillar",
    "name": "Light Pillar",
    "sourceName": "Light Pillar",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "LightPillar",
    "description": "光柱加载展开并响应指针与点击",
    "aliases": [
      "光柱",
      "脉冲光柱"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/LightPillar/LightPillar.tsx",
    "demoPath": "src/demos/background/light-pillar.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "silk",
    "name": "Silk",
    "sourceName": "Silk",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "Silk",
    "description": "缎面褶皱的高光和波纹响应操作",
    "aliases": [
      "丝绸背景",
      "缎面褶皱"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/Silk/Silk.tsx",
    "demoPath": "src/demos/background/silk.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "floating-lines",
    "name": "Floating Lines",
    "sourceName": "Floating Lines",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "FloatingLines",
    "description": "线条在空间漂浮并响应指针",
    "aliases": [
      "漂浮线条",
      "三维线条"
    ],
    "dependencies": [
      "react",
      "three"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/FloatingLines/FloatingLines.tsx",
    "demoPath": "src/demos/background/floating-lines.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "side-rays",
    "name": "Side Rays",
    "sourceName": "Side Rays",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "SideRays",
    "description": "光束从侧面持续射入",
    "aliases": [
      "侧面光线",
      "侧向光束"
    ],
    "dependencies": [
      "ogl",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/SideRays/SideRays.tsx",
    "demoPath": "src/demos/background/side-rays.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "light-rays",
    "name": "Light Rays",
    "sourceName": "Light Rays",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "LightRays",
    "description": "光线沿指定方向形成体积感",
    "aliases": [
      "体积光",
      "定向光束"
    ],
    "dependencies": [
      "ogl",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/LightRays/LightRays.tsx",
    "demoPath": "src/demos/background/light-rays.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "pixel-blast",
    "name": "Pixel Blast",
    "sourceName": "Pixel Blast",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "PixelBlast",
    "description": "像素粒子受触发后扩散并可带流动形变",
    "aliases": [
      "像素爆发",
      "粒子冲击"
    ],
    "dependencies": [
      "postprocessing",
      "react",
      "three"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/PixelBlast/PixelBlast.tsx",
    "demoPath": "src/demos/background/pixel-blast.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "color-bends",
    "name": "Color Bends",
    "sourceName": "Color Bends",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "ColorBends",
    "description": "颜色条带连续弯曲流动",
    "aliases": [
      "弯曲色带",
      "流动色彩"
    ],
    "dependencies": [
      "react",
      "three"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/ColorBends/ColorBends.tsx",
    "demoPath": "src/demos/background/color-bends.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "line-waves",
    "name": "Line Waves",
    "sourceName": "Line Waves",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "LineWaves",
    "description": "线条波面保留可调扭曲",
    "aliases": [
      "线波背景",
      "扭曲线波"
    ],
    "dependencies": [
      "ogl",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/LineWaves/LineWaves.tsx",
    "demoPath": "src/demos/background/line-waves.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "radar",
    "name": "Radar",
    "sourceName": "Radar",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "Radar",
    "description": "扫描线留下余辉并呈现示例目标",
    "aliases": [
      "雷达",
      "扫描盘"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/Radar/Radar.tsx",
    "demoPath": "src/demos/background/radar.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "soft-aurora",
    "name": "Soft Aurora",
    "sourceName": "Soft Aurora",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "SoftAurora",
    "description": "低频柔和色场表现极光流动",
    "aliases": [
      "柔和极光",
      "轻极光"
    ],
    "dependencies": [
      "ogl",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/SoftAurora/SoftAurora.tsx",
    "demoPath": "src/demos/background/soft-aurora.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "aurora",
    "name": "Aurora",
    "sourceName": "Aurora",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "Aurora",
    "description": "顶部柔和极光缓慢流动并响应指针",
    "aliases": [
      "极光",
      "顶部极光"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/Aurora/Aurora.tsx",
    "demoPath": "src/demos/background/aurora.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "plasma",
    "name": "Plasma",
    "sourceName": "Plasma",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "Plasma",
    "description": "光幕褶皱缓慢扭转并响应指针",
    "aliases": [
      "等离子背景",
      "光幕褶皱"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/Plasma/Plasma.tsx",
    "demoPath": "src/demos/background/plasma.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "plasma-wave",
    "name": "Plasma Wave",
    "sourceName": "Plasma Wave",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "PlasmaWave",
    "description": "两条发光带相互盘旋",
    "aliases": [
      "等离子波",
      "双光带"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/PlasmaWave/PlasmaWave.tsx",
    "demoPath": "src/demos/background/plasma-wave.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "particles",
    "name": "Particles",
    "sourceName": "Particles",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "Particles",
    "description": "粒子空间保留漂移与配置的连线互动",
    "aliases": [
      "粒子背景",
      "星点场"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/Particles/Particles.tsx",
    "demoPath": "src/demos/background/particles.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "gradient-blinds",
    "name": "Gradient Blinds",
    "sourceName": "Gradient Blinds",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "GradientBlinds",
    "description": "渐变条带形成百叶和移动聚光",
    "aliases": [
      "渐变百叶",
      "百叶光影"
    ],
    "dependencies": [
      "ogl",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/GradientBlinds/GradientBlinds.tsx",
    "demoPath": "src/demos/background/gradient-blinds.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "grainient",
    "name": "Grainient",
    "sourceName": "Grainient",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "Grainient",
    "description": "柔和渐变保留细颗粒和低频波动",
    "aliases": [
      "颗粒渐变",
      "噪点渐变"
    ],
    "dependencies": [
      "ogl",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/Grainient/Grainient.tsx",
    "demoPath": "src/demos/background/grainient.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "grid-scan",
    "name": "Grid Scan",
    "sourceName": "Grid Scan",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "GridScan",
    "description": "三维网格空间保留扫描推进",
    "aliases": [
      "网格扫描",
      "空间扫描"
    ],
    "dependencies": [
      "face-api.js",
      "postprocessing",
      "react",
      "three"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/GridScan/GridScan.tsx",
    "demoPath": "src/demos/background/grid-scan.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "beams",
    "name": "Beams",
    "sourceName": "Beams",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "Beams",
    "description": "带状曲面波动并捕捉指针方向的光",
    "aliases": [
      "光带背景",
      "反光丝带"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/Beams/Beams.tsx",
    "demoPath": "src/demos/background/beams.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "pixel-snow",
    "name": "Pixel Snow",
    "sourceName": "Pixel Snow",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "PixelSnow",
    "description": "不同深度的像素雪片下落并受扰动",
    "aliases": [
      "像素雪",
      "像素雪花"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/PixelSnow/PixelSnow.tsx",
    "demoPath": "src/demos/background/pixel-snow.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "lightning",
    "name": "Lightning",
    "sourceName": "Lightning",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "Lightning",
    "description": "电光分叉并随点击位置触发",
    "aliases": [
      "闪电背景",
      "分叉电光"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/Lightning/Lightning.tsx",
    "demoPath": "src/demos/background/lightning.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "prismatic-burst",
    "name": "Prismatic Burst",
    "sourceName": "Prismatic Burst",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "PrismaticBurst",
    "description": "径向光束保留数量和扭曲变化",
    "aliases": [
      "径向光芒",
      "棱彩光束"
    ],
    "dependencies": [
      "ogl",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/PrismaticBurst/PrismaticBurst.tsx",
    "demoPath": "src/demos/background/prismatic-burst.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "galaxy",
    "name": "Galaxy",
    "sourceName": "Galaxy",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "Galaxy",
    "description": "星点空间保持飞行与可配置的速度变化",
    "aliases": [
      "银河背景",
      "星空穿梭"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/Galaxy/Galaxy.tsx",
    "demoPath": "src/demos/background/galaxy.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "dither",
    "name": "Dither",
    "sourceName": "Dither",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "Dither",
    "description": "网点纹样构成动态波面",
    "aliases": [
      "抖色背景",
      "复古网点"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/Dither/Dither.tsx",
    "demoPath": "src/demos/background/dither.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "faulty-terminal",
    "name": "Faulty Terminal",
    "sourceName": "Faulty Terminal",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "FaultyTerminal",
    "description": "终端状网格保留扫描与轻微扰动",
    "aliases": [
      "故障终端",
      "终端扫描线"
    ],
    "dependencies": [
      "ogl",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/FaultyTerminal/FaultyTerminal.tsx",
    "demoPath": "src/demos/background/faulty-terminal.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "ripple-grid",
    "name": "Ripple Grid",
    "sourceName": "Ripple Grid",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "RippleGrid",
    "description": "规则网格随波纹弯曲和亮度变化",
    "aliases": [
      "波纹网格",
      "水纹线网"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/RippleGrid/RippleGrid.tsx",
    "demoPath": "src/demos/background/ripple-grid.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "dot-field",
    "name": "Dot Field",
    "sourceName": "Dot Field",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "DotField",
    "description": "点阵随指针鼓起并响应波纹",
    "aliases": [
      "点阵场",
      "点阵鼓起"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/DotField/DotField.tsx",
    "demoPath": "src/demos/background/dot-field.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "dot-grid",
    "name": "Dot Grid",
    "sourceName": "Dot Grid",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "DotGrid",
    "description": "点阵受指针推动、拖拽并回弹",
    "aliases": [
      "弹性点阵",
      "点阵拖拽"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/DotGrid/DotGrid.tsx",
    "demoPath": "src/demos/background/dot-grid.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "threads",
    "name": "Threads",
    "sourceName": "Threads",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "Threads",
    "description": "细线在指针处散开后重新合拢",
    "aliases": [
      "丝线背景",
      "轮廓线背景"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/Threads/Threads.tsx",
    "demoPath": "src/demos/background/threads.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "hyperspeed",
    "name": "Hyperspeed",
    "sourceName": "Hyperspeed",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "Hyperspeed",
    "description": "光迹沿弯曲道路行进并可加速",
    "aliases": [
      "极速公路",
      "高速穿梭"
    ],
    "dependencies": [
      "react",
      "three"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/Hyperspeed/Hyperspeed.tsx",
    "demoPath": "src/demos/background/hyperspeed.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "iridescence",
    "name": "Iridescence",
    "sourceName": "Iridescence",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "Iridescence",
    "description": "液面褶皱随指针搅动",
    "aliases": [
      "虹彩液面",
      "柔光液面"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/Iridescence/Iridescence.tsx",
    "demoPath": "src/demos/background/iridescence.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "waves",
    "name": "Waves",
    "sourceName": "Waves",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "Waves",
    "description": "密集线条随流场和指针起伏后归位",
    "aliases": [
      "波浪线",
      "流动线阵"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/Waves/Waves.tsx",
    "demoPath": "src/demos/background/waves.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "grid-distortion",
    "name": "Grid Distortion",
    "sourceName": "Grid Distortion",
    "category": "media",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "GridDistortion",
    "description": "图片网格在指针处错位后复原",
    "aliases": [
      "网格扭曲图片",
      "方块位移"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/GridDistortion/GridDistortion.tsx",
    "demoPath": "src/demos/media/grid-distortion.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "ballpit",
    "name": "Ballpit",
    "sourceName": "Ballpit",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "Ballpit",
    "description": "球体保持碰撞与弹跳",
    "aliases": [
      "物理球池",
      "弹跳小球"
    ],
    "dependencies": [
      "gsap",
      "react",
      "three"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/Ballpit/Ballpit.tsx",
    "demoPath": "src/demos/background/ballpit.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "orb",
    "name": "Orb",
    "sourceName": "Orb",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "Orb",
    "description": "光环保留呼吸、环绕光点与指针响应",
    "aliases": [
      "发光球环",
      "呼吸光环"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/Orb/Orb.tsx",
    "demoPath": "src/demos/background/orb.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "letter-glitch",
    "name": "Letter Glitch",
    "sourceName": "Letter Glitch",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "LetterGlitch",
    "description": "字母阵列持续变化形成背景",
    "aliases": [
      "字符矩阵",
      "字母故障"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/LetterGlitch/LetterGlitch.tsx",
    "demoPath": "src/demos/background/letter-glitch.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "grid-motion",
    "name": "Grid Motion",
    "sourceName": "Grid Motion",
    "category": "media",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "GridMotion",
    "description": "倾斜图块墙漂移并在指针处强调",
    "aliases": [
      "漂移网格",
      "倾斜图墙"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/GridMotion/GridMotion.tsx",
    "demoPath": "src/demos/media/grid-motion.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "shape-grid",
    "name": "Shape Grid",
    "sourceName": "Shape Grid",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "ShapeGrid",
    "description": "图形网格漂移并响应指针",
    "aliases": [
      "几何网格",
      "形状网格"
    ],
    "dependencies": [
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/ShapeGrid/ShapeGrid.tsx",
    "demoPath": "src/demos/background/shape-grid.tsx",
    "motion": "continuous",
    "webgl": "none",
    "minHeight": 560
  },
  {
    "id": "liquid-chrome",
    "name": "Liquid Chrome",
    "sourceName": "Liquid Chrome",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "LiquidChrome",
    "description": "反射表面保留流动的液态纹理",
    "aliases": [
      "液态铬",
      "金属液面"
    ],
    "dependencies": [
      "ogl",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/LiquidChrome/LiquidChrome.tsx",
    "demoPath": "src/demos/background/liquid-chrome.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  },
  {
    "id": "balatro",
    "name": "Balatro",
    "sourceName": "Balatro",
    "category": "background",
    "sourceCategory": "backgrounds",
    "provider": "react-bits",
    "tags": [
      "react-bits",
      "React Bits",
      "backgrounds",
      "动态背景"
    ],
    "exportName": "Balatro",
    "description": "保留旋转流纹与可调交互的着色器效果",
    "aliases": [
      "漩涡背景",
      "Balatro背景"
    ],
    "dependencies": [
      "ogl",
      "react"
    ],
    "docsUrl": "",
    "sourcePath": ".upstream/src/ts-default/Backgrounds/Balatro/Balatro.tsx",
    "demoPath": "src/demos/background/balatro.tsx",
    "motion": "continuous",
    "webgl": "webgl",
    "minHeight": 560
  }
];
export const categories = [
  {
    "id": "text",
    "name": "文字动效",
    "description": "标题、正文、字符与字形的动态表达",
    "count": 28
  },
  {
    "id": "background",
    "name": "背景与光效",
    "description": "页面背景、纹理、粒子与空间光效",
    "count": 66
  },
  {
    "id": "pointer",
    "name": "指针与轨迹",
    "description": "指针形态、悬停响应与移动轨迹",
    "count": 16
  },
  {
    "id": "scroll",
    "name": "滚动与转场",
    "description": "滚动触发、进入视口与状态转场",
    "count": 10
  },
  {
    "id": "media",
    "name": "媒体与轮播",
    "description": "图片、图集、轮播、模型与媒体比较",
    "count": 28
  },
  {
    "id": "cards",
    "name": "卡片与面板",
    "description": "对象卡片、阅读面与内容面板",
    "count": 20
  },
  {
    "id": "form",
    "name": "表单与选择",
    "description": "文本输入、数值调整、选项与字段语义",
    "count": 14
  },
  {
    "id": "actions",
    "name": "按钮与操作",
    "description": "动作入口、提交、快捷操作与撤销",
    "count": 8
  },
  {
    "id": "navigation",
    "name": "导航与菜单",
    "description": "页面导航、命令查找与菜单选择",
    "count": 10
  },
  {
    "id": "data",
    "name": "数据与文件",
    "description": "记录、层级、列表、文件与结果浏览",
    "count": 7
  },
  {
    "id": "layout",
    "name": "布局与流程",
    "description": "工作区分隔、内容布局与顺序流程",
    "count": 1
  },
  {
    "id": "feedback",
    "name": "状态与反馈",
    "description": "等待、进度、通知与结果状态",
    "count": 6
  },
  {
    "id": "overlay",
    "name": "弹层与辅助",
    "description": "对话框、提示、浮层与焦点辅助",
    "count": 1
  }
];
