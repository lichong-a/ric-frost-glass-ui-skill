# 业务表单

仅在需要按场景选型时读本页；精确名称可直接查询单项指南，不顺序读取整个类别。

| 组件 | 什么时候使用 | 什么时候换用其它能力 |
|---|---|---|
| [AutoComplete](../components/business-autocomplete.md) | 候选项较多且用户知道部分名称，需要边输入边筛选并选择明确对象 | 只有少量固定候选项时优先Select；自由文本不能强制选项 |
| [Checkbox](../components/business-checkbox.md) | 表单里的独立布尔选项，允许选中或取消 | 互斥选择用RadioButton；任务完成动效用Spring Check |
| [CheckboxGroup](../components/business-checkboxgroup.md) | 同一字段可同时选择多个候选，如通知渠道或权限组合 | 互斥项用RadioButton；大量候选用可搜索选择 |
| [DatePicker](../components/business-datepicker.md) | 用户选择单日或起止日，日期值与时区语义明确 | 纯时长用InputNumber；排班拖拽不属于本例 |
| [FloatLabel](../components/business-floatlabel.md) | 紧凑表单中需要输入前后始终可见的字段名称 | 说明较长或容易误解的字段用普通Label与帮助文字 |
| [IconField](../components/business-iconfield.md) | 用图标辅助识别搜索或字段用途，同时保留完整文本标签 | 图标不能代替可访问名称；普通字段不必装饰图标 |
| [IftaLabel](../components/business-iftalabel.md) | 需要常驻在输入框内部顶部的标签，适合密集设置页 | 长标签与长帮助文字改用Field普通布局 |
| [InputColor](../components/business-inputcolor.md) | 为对象标记、画布或允许自定义的配置选择颜色并即时预览 | 不随意修改全局Token；固定状态色用Tag |
| [InputGroup](../components/business-inputgroup.md) | 字段需要单位、地址前缀或紧邻动作，且输入值与说明分开 | 无关联的多个字段用表单网格，不挤进一个组合 |
| [InputMask](../components/business-inputmask.md) | 录入格式固定的文本标识，帮助用户看出位数与分组 | 掩码不是校验或安全边界；自由说明用InputText |
| [InputNumber](../components/business-inputnumber.md) | 录入带单位和上下限的数量，允许清空和精确增减 | 连续探索用Slider；金额业务使用精确单位与服务端校验 |
| [InputOtp](../components/business-inputotp.md) | 分段录入短验证码，自动移动焦点并支持整体粘贴 | 不能用本地位数检查假装身份验证成功 |
| [InputPassword](../components/business-inputpassword.md) | 敏感文本需要隐藏显示，并提供用户触发的显隐和规则提示 | 不记录密码到日志或持久化；普通文本用InputText |
| [InputTags](../components/business-inputtags.md) | 一个字段包含多个用户自定义短标签，需要添加去重和移除 | 固定标签目录用CheckboxGroup或Select |
| [InputText](../components/business-inputtext.md) | 普通短文本字段，需要标签、长度、必填和错误状态 | 多行说明用Textarea；候选对象选择用AutoComplete |
| [KeyFilter](../components/business-keyfilter.md) | 允许的字符集合明确，键入和粘贴使用同一体验规则 | 不能代替完整字段校验与可信服务端验证 |
| [Knob](../components/business-knob.md) | 通过圆形控件调整有界比例，同时提供键盘和精确值 | 精确批量编辑用InputNumber；不要仅允许拖拽 |
| [Label](../components/business-label.md) | 给输入或选择控件稳定命名，标签与控件通过id关联 | 不要仅以placeholder命名；装饰文字不应伪装成label |
| [Listbox](../components/business-listbox.md) | 候选项需要持续可见，用户反复比较和选择 | 候选项很多时用AutoComplete；表格数据用DataTable |
| [RadioButton](../components/business-radiobutton.md) | 少量互斥选项需要同时展示，保留原生组键盘操作 | 多项可并存用CheckboxGroup；大量选项用Select |
| [Rating](../components/business-rating.md) | 用户明确对体验或对象打分，并显示或清除当前评分 | 不能把评分当状态标签；纯展示状态用Tag |
| [Select](../components/business-select.md) | 从固定候选项中单选或多选，保存明确的对象值 | 自由输入用InputText；大量模糊查找用AutoComplete |
| [Slider](../components/business-slider.md) | 调整有界连续值或上下限区间，数字值始终可见 | 精确数量与金额用InputNumber；不要省略键盘入口 |
| [Textarea](../components/business-textarea.md) | 录入多行说明、反馈或备注，提供长度与错误反馈 | 短名称用InputText；富文本编辑不属于本例 |
| [ToggleButton](../components/business-togglebutton.md) | 单个按钮切换本地布尔状态，aria-pressed与显示一致 | 不可逆动作应使用普通Button加确认 |
| [ToggleButtonGroup](../components/business-togglebuttongroup.md) | 多个快捷筛选条件可以同时开启或取消 | 互斥选择用RadioButton或Tabs |
| [ToggleSwitch](../components/business-toggleswitch.md) | 本地二元设置切换立即反映当前状态 | 外部写入或危险配置仍需要业务授权与失败恢复 |
| [CascadeSelect](../components/business-cascadeselect.md) | 选择必须沿父子依赖逐层展开，父项变化清除子项 | 完整树可见时用TreeSelect；无层级关系用Select |
| [TreeSelect](../components/business-treeselect.md) | 表单字段从层级目录中选择明确节点，支持搜索或展开 | 浏览层级而不填字段时用Tree |

选定一个组件后只读它的文档、示例与必要共享符号。
