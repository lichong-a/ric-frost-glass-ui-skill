# 微交互

34 项 · Agent状态、消息输入、表单、按钮、选择和反馈。只在没有明确组件名或需要同类比较时读取本页；选定一项后直接到其文档，不顺序读取全部。

| 组件 | 中文意图 | 必须保留的特征 |
|---|---|---|
| [Shredder](../components/shredder.md) | 碎纸机 / 拖拽删除 | 拖入底部的行被分解成纸条 |
| [Paper Crumple](../components/paper-crumple.md) | 揉纸 / 纸张捏皱 | 图像在按住拖动时表现纸张褶皱 |
| [Tear Ticket](../components/tear-ticket.md) | 撕票 / 票根撕开 | 票根沿虚线逐步撕开并脱落 |
| [Flip Card](../components/flip-card.md) | 翻面卡片 / 双面卡 | 卡片通过点击或拖动在两面间翻转 |
| [Branched Menu](../components/branched-menu.md) | 树枝菜单 / 分支导航 | 分组菜单折叠展开并描绘选中分支 |
| [Folder Float](../components/folder-float.md) | 悬浮文件夹 / 纸条弹出 | 文件夹打开时内部便笺弹到周围 |
| [Refine Frame](../components/refine-frame.md) | 生成过程图片 / 图像阶段 / 生成预览 | 媒体框按生成阶段更新图像且尺寸稳定 |
| [Thought Line](../components/thought-line.md) | 思考状态 / 推理摘要 / 思考过程 | 公开步骤摘要与计时器在完成后折为单行 |
| [Voice Pill](../components/voice-pill.md) | 语音按钮 / 录音胶囊 / 音量条 | 按钮在录音状态展开为波形和计时胶囊 |
| [Slosh Gauge](../components/slosh-gauge.md) | 液体进度 / 水位进度 / 仪表 | 液体高度跟随数值并在变化时晃动 |
| [Prompt Bar](../components/prompt-bar.md) | 聊天输入 / 提示词输入 / 模型选择 | 消息输入整合来源命令模型与附件入口 |
| [Swipe Toast](../components/swipe-toast.md) | 滑动通知 / 可拖拽提示 | 通知支持滑动关闭并显示剩余时间 |
| [Sling Button](../components/sling-button.md) | 弹弓按钮 / 拖拽发送 | 拖拽蓄力并释放触发发送动作 |
| [Bell Toggle](../components/bell-toggle.md) | 铃铛开关 / 通知开关 | 按下后铃铛动画与标签状态同步变化 |
| [Call Chip](../components/call-chip.md) | 工具调用状态 / 工具执行 / 调用计时 | 调用条目展示真实计时与结果状态 |
| [Status Mark](../components/status-mark.md) | 任务状态 / 智能体状态 / 状态图标 | 图形在空闲进度和结果状态间变形 |
| [Glide Select](../components/glide-select.md) | 胶囊选择器 / 滑动选项 | 下拉从入口角部展开且高亮随选项移动 |
| [Swipe Row](../components/swipe-row.md) | 侧滑行 / 侧滑删除 / 行操作 | 行侧滑显露操作并按规则提交动作 |
| [Jelly Radio](../components/jelly-radio.md) | 果冻单选 / 弹性单选组 | 选中项膨起并带动相邻项让位 |
| [Comet Dial](../components/comet-dial.md) | 彗星旋钮 / 角度旋钮 | 角度选择器显示刻度与移动尾迹 |
| [Wake Slider](../components/wake-slider.md) | 波尾滑块 / 细条滑块 | 滑动范围控件以细条波尾表示拖动速度 |
| [Code Slots](../components/code-slots.md) | 验证码输入 / 一次性密码 / 数字输入槽 | 数字槽输入支持粘贴与可用的自动填充 |
| [Dodge Field](../components/dodge-field.md) | 躲避指针 / 避让元素 | 内容短暂避开指针后归位 |
| [Lattice Loader](../components/lattice-loader.md) | 网格加载 / 智能体加载 / 运行计时 | 网格亮度波与真实运行时间对应 |
| [Scrub Field](../components/scrub-field.md) | 拖拽数字 / 数值调节 / 数值输入 | 数字可横向拖动调整或点击输入 |
| [Fuse Button](../components/fuse-button.md) | 撤销按钮 / 限时撤销 | 动作完成后提供有期限的撤销入口 |
| [Warm Tooltip](../components/warm-tooltip.md) | 连续提示 / 暖启动提示 / 工具提示 | 第一项延迟提示后相邻项更快出现 |
| [Slide Commit](../components/slide-commit.md) | 滑动确认 / 滑块提交 | 滑至目标后提交并展示真实等待与结果 |
| [Rubber Segment](../components/rubber-segment.md) | 橡胶分段 / 弹性分段控件 | 分段选中底块在切换时拉伸并归位 |
| [Pulse Heart](../components/pulse-heart.md) | 点赞 / 心形按钮 | 点赞状态与计数同步并有短促形变 |
| [Spring Check](../components/spring-check.md) | 弹簧复选 / 完成勾选 / 待办勾选 | 复选状态驱动填色勾线与文本样式 |
| [Peek Rating](../components/peek-rating.md) | 星级评分 / 悬停评分 | 预览星级抬起，提交后固定真实评分 |
| [Hold Button](../components/hold-button.md) | 长按确认 / 按住完成 | 按住填充进度，提前放开则回退 |
| [Squish Switch](../components/squish-switch.md) | 弹性开关 / 挤压开关 | 开关圆钮随操作速度拉伸并回弹 |

动效默认：真实状态驱动的短动效；计时以任务事实为准。降级：使用原生或规范内控件表达同一状态和操作，保留键盘与可访问名称。

需要页面 / 业务行为时回到 [任务路由](../task-router.md)。
