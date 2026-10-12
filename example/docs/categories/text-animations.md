# 文字效果

33 项 · 字符、标题、数字、滚动和阅读揭示。只在没有明确组件名或需要同类比较时读取本页；选定一项后直接到其文档，不顺序读取全部。

| 组件 | 中文意图 | 必须保留的特征 |
|---|---|---|
| [Tech Text](../components/tech-text.md) | 科技文字 / 虚线文字 / 矢量字标 | 指针经过时字形变为虚线矢量路径 |
| [Text Loop](../components/text-loop.md) | 文字循环 / 曲线路径文字 / 曲线跑马灯 | 文本沿曲线连续循环流动 |
| [Masked Heading](../components/masked-heading.md) | 遮罩标题 / 图片文字 / 网格渐变标题 | 标题内部的图像或色网移动并逐词揭示 |
| [Particle Text](../components/particle-text.md) | 粒子文字 / 文字聚散 | 粒子散开后重新组成可读文字 |
| [Split Flap Text](../components/split-flap-text.md) | 翻牌文字 / 机场翻牌 / 机械字符牌 | 翻片逐格转到新的字符或短句 |
| [Warp Text](../components/warp-text.md) | 扭曲文字 / 文字折射 | 指针附近的文字局部弯曲与折射 |
| [Stroke Text](../components/stroke-text.md) | 描边文字 / 文字描绘 / 描边填充 | 先描绘字形轮廓再填充文字 |
| [Depth Text](../components/depth-text.md) | 立体文字 / 文字视差 / 挤出字 | 多层立体字随指针产生深度视差 |
| [Fold Text](../components/fold-text.md) | 折叠文字 / 纸张展开文字 | 文字行沿折痕展开到阅读位置 |
| [Echo Text](../components/echo-text.md) | 重影文字 / 回声文字 | 文字残影跟随并收敛为单一词形 |
| [Split Text](../components/split-text.md) | 逐字出现 / 拆分文字 / 标题逐字出现 | 按字符或单词错开播放入场 |
| [Blur Text](../components/blur-text.md) | 模糊揭示 / 文字变清晰 / 柔焦文字 | 文字从柔焦过渡到清晰终态 |
| [Circular Text](../components/circular-text.md) | 圆形文字 / 环绕文字 / 旋转字环 | 字符围绕圆排列并按配置旋转 |
| [Text Type](../components/text-type.md) | 打字机 / 逐字输入 / 打字效果 | 按节奏键入文字并呈现输入光标 |
| [Shuffle](../components/shuffle.md) | 字符洗牌 / 乱序揭示 | 字符变化后稳定成目标文案 |
| [Shiny Text](../components/shiny-text.md) | 扫光文字 / 文字微光 / 文字反光 | 轻微光带沿文字表面扫过 |
| [Text Pressure](../components/text-pressure.md) | 文字压力 / 字形压缩 | 字符随指针接近产生缩放或字形变化 |
| [Curved Loop](../components/curved-loop.md) | 可拖拽曲线文字 / 曲线循环 | 文字沿可调曲线循环并响应拖拽 |
| [Fuzzy Text](../components/fuzzy-text.md) | 毛刺文字 / 抖动文字 / 噪点字 | 文字边缘产生可调节的细小噪动 |
| [Gradient Text](../components/gradient-text.md) | 渐变文字 / 文字流色 | 文字填充内的渐变按配置流动 |
| [Falling Text](../components/falling-text.md) | 文字掉落 / 物理文字 / 拖拽散字 | 文字散落、响应拖拽并可回到原排版 |
| [Text Cursor](../components/text-cursor.md) | 文字光标 / 文字拖尾 | 文字副本或字母链跟随指针 |
| [Decrypted Text](../components/decrypted-text.md) | 解密文字 / 乱码还原 | 随机字符逐步解析成目标文本 |
| [True Focus](../components/true-focus.md) | 焦点文字 / 单词聚焦 | 一组单词依次在模糊与清晰之间切换 |
| [Scroll Float](../components/scroll-float.md) | 滚动漂浮文字 / 滚动字移 | 文字随滚动轻微漂浮或产生视差 |
| [Scroll Reveal](../components/scroll-reveal.md) | 滚动文字揭示 / 滚动变清晰 | 滚动进度逐步显现并清晰化文本 |
| [ASCII Text](../components/ascii-text.md) | 字符画文字 / ASCII字 | 字符化文字响应指针倾斜、扰动和点击 |
| [Scrambled Text](../components/scrambled-text.md) | 悬停乱码 / 局部字符扰动 | 指针附近的文本局部扰动并还原 |
| [Rotating Text](../components/rotating-text.md) | 轮换文字 / 翻转短句 / 动态关键词 | 多个短句按顺序旋转或翻转切换 |
| [Glitch Text](../components/glitch-text.md) | 故障文字 / 错位文字 | 文字产生短暂通道错位和抖动 |
| [Scroll Velocity](../components/scroll-velocity.md) | 滚动速度文字 / 速度跑马灯 | 文字移动速度随滚动速度变化 |
| [Variable Proximity](../components/variable-proximity.md) | 可变字体 / 距离字重 / 指针字形 | 字形参数随与指针的距离连续变化 |
| [Count Up](../components/count-up.md) | 数字增长 / 数据计数 / 数字递增 | 数值按目标与格式规则过渡到终值 |

动效默认：按触发播放；循环、乱码与大幅字形变换需明确场景。降级：输出完整可选择的静态文本；数值直接显示真实终值。

需要页面 / 业务行为时回到 [任务路由](../task-router.md)。
