# 业务组件覆盖对照

版本记录：2026-10-12。本目录包含 88 个业务核心能力，每项提供独立的使用场景与示例。

此次补充前：19 项存在相邻效果示例，69 项缺少独立业务运行示例。规范、CSS 和名称相似不能直接当作完整业务覆盖。此次每项均有独立自有实现和渐进指南；这是源码接入状态，不是浏览器验收结论。

| 能力 | 原有相邻示例 | 此次接入 |
|---|---|---|
| [AutoComplete](components/business-autocomplete.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/form/business-autocomplete.tsx) |
| [Checkbox](components/business-checkbox.md) | spring-check | [自有 React 示例](../../src/business/demos/form/business-checkbox.tsx) |
| [CheckboxGroup](components/business-checkboxgroup.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/form/business-checkboxgroup.tsx) |
| [DatePicker](components/business-datepicker.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/form/business-datepicker.tsx) |
| [FloatLabel](components/business-floatlabel.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/form/business-floatlabel.tsx) |
| [IconField](components/business-iconfield.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/form/business-iconfield.tsx) |
| [IftaLabel](components/business-iftalabel.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/form/business-iftalabel.tsx) |
| [InputColor](components/business-inputcolor.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/form/business-inputcolor.tsx) |
| [InputGroup](components/business-inputgroup.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/form/business-inputgroup.tsx) |
| [InputMask](components/business-inputmask.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/form/business-inputmask.tsx) |
| [InputNumber](components/business-inputnumber.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/form/business-inputnumber.tsx) |
| [InputOtp](components/business-inputotp.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/form/business-inputotp.tsx) |
| [InputPassword](components/business-inputpassword.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/form/business-inputpassword.tsx) |
| [InputTags](components/business-inputtags.md) | prompt-bar | [自有 React 示例](../../src/business/demos/form/business-inputtags.tsx) |
| [InputText](components/business-inputtext.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/form/business-inputtext.tsx) |
| [KeyFilter](components/business-keyfilter.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/form/business-keyfilter.tsx) |
| [Knob](components/business-knob.md) | comet-dial | [自有 React 示例](../../src/business/demos/form/business-knob.tsx) |
| [Label](components/business-label.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/form/business-label.tsx) |
| [Listbox](components/business-listbox.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/form/business-listbox.tsx) |
| [RadioButton](components/business-radiobutton.md) | jelly-radio | [自有 React 示例](../../src/business/demos/form/business-radiobutton.tsx) |
| [Rating](components/business-rating.md) | peek-rating | [自有 React 示例](../../src/business/demos/form/business-rating.tsx) |
| [Select](components/business-select.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/form/business-select.tsx) |
| [Slider](components/business-slider.md) | wake-slider、elastic-slider | [自有 React 示例](../../src/business/demos/form/business-slider.tsx) |
| [Textarea](components/business-textarea.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/form/business-textarea.tsx) |
| [ToggleButton](components/business-togglebutton.md) | bell-toggle | [自有 React 示例](../../src/business/demos/form/business-togglebutton.tsx) |
| [ToggleButtonGroup](components/business-togglebuttongroup.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/form/business-togglebuttongroup.tsx) |
| [ToggleSwitch](components/business-toggleswitch.md) | squish-switch | [自有 React 示例](../../src/business/demos/form/business-toggleswitch.tsx) |
| [Button](components/business-button.md) | sling-button、specular-button、hold-button | [自有 React 示例](../../src/business/demos/actions/business-button.tsx) |
| [ButtonGroup](components/business-buttongroup.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/actions/business-buttongroup.tsx) |
| [SpeedDial](components/business-speeddial.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/actions/business-speeddial.tsx) |
| [DataTable](components/business-datatable.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/data/business-datatable.tsx) |
| [DataView](components/business-dataview.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/data/business-dataview.tsx) |
| [OrderList](components/business-orderlist.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/data/business-orderlist.tsx) |
| [OrganizationChart](components/business-organizationchart.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/data/business-organizationchart.tsx) |
| [Paginator](components/business-paginator.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/data/business-paginator.tsx) |
| [PickList](components/business-picklist.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/data/business-picklist.tsx) |
| [Timeline](components/business-timeline.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/data/business-timeline.tsx) |
| [Tree](components/business-tree.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/data/business-tree.tsx) |
| [TreeTable](components/business-treetable.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/data/business-treetable.tsx) |
| [Accordion](components/business-accordion.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/cards/business-accordion.tsx) |
| [Card](components/business-card.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/cards/business-card.tsx) |
| [Divider](components/business-divider.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/layout/business-divider.tsx) |
| [Fieldset](components/business-fieldset.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/form/business-fieldset.tsx) |
| [Panel](components/business-panel.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/cards/business-panel.tsx) |
| [ScrollArea](components/business-scrollarea.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/layout/business-scrollarea.tsx) |
| [Splitter](components/business-splitter.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/layout/business-splitter.tsx) |
| [Stepper](components/business-stepper.md) | stepper | [自有 React 示例](../../src/business/demos/layout/business-stepper.tsx) |
| [Tabs](components/business-tabs.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/navigation/business-tabs.tsx) |
| [Toolbar](components/business-toolbar.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/actions/business-toolbar.tsx) |
| [Dialog](components/business-dialog.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/overlay/business-dialog.tsx) |
| [Drawer](components/business-drawer.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/overlay/business-drawer.tsx) |
| [OverlayManager](components/business-overlaymanager.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/overlay/business-overlaymanager.tsx) |
| [Popover](components/business-popover.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/overlay/business-popover.tsx) |
| [Tooltip](components/business-tooltip.md) | warm-tooltip | [自有 React 示例](../../src/business/demos/overlay/business-tooltip.tsx) |
| [FileUpload](components/business-fileupload.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/data/business-fileupload.tsx) |
| [Breadcrumb](components/business-breadcrumb.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/navigation/business-breadcrumb.tsx) |
| [ContextMenu](components/business-contextmenu.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/navigation/business-contextmenu.tsx) |
| [Menu](components/business-menu.md) | bubble-menu、card-nav、staggered-menu | [自有 React 示例](../../src/business/demos/navigation/business-menu.tsx) |
| [NavigationMenu](components/business-navigationmenu.md) | pill-nav、line-sidebar | [自有 React 示例](../../src/business/demos/navigation/business-navigationmenu.tsx) |
| [Sidebar](components/business-sidebar.md) | line-sidebar | [自有 React 示例](../../src/business/demos/navigation/business-sidebar.tsx) |
| [Message](components/business-message.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/feedback/business-message.tsx) |
| [Toast](components/business-toast.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/feedback/business-toast.tsx) |
| [Carousel · 基础轮播](components/business-carousel.md) | carousel | [自有 React 示例](../../src/business/demos/media/business-carousel.tsx) |
| [Compare](components/business-compare.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/media/business-compare.tsx) |
| [Gallery](components/business-gallery.md) | dome-gallery、circular-gallery | [自有 React 示例](../../src/business/demos/media/business-gallery.tsx) |
| [AnimateOnScroll](components/business-animateonscroll.md) | animated-content、fade-content | [自有 React 示例](../../src/business/demos/scroll/business-animateonscroll.tsx) |
| [Avatar](components/business-avatar.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/feedback/business-avatar.tsx) |
| [Badge](components/business-badge.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/feedback/business-badge.tsx) |
| [Chip](components/business-chip.md) | call-chip | [自有 React 示例](../../src/business/demos/feedback/business-chip.tsx) |
| [Fluid](components/business-fluid.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/layout/business-fluid.tsx) |
| [FocusTrap](components/business-focustrap.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/overlay/business-focustrap.tsx) |
| [Inplace](components/business-inplace.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/form/business-inplace.tsx) |
| [MeterGroup](components/business-metergroup.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/feedback/business-metergroup.tsx) |
| [ProgressBar](components/business-progressbar.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/feedback/business-progressbar.tsx) |
| [ProgressSpinner](components/business-progressspinner.md) | lattice-loader | [自有 React 示例](../../src/business/demos/feedback/business-progressspinner.tsx) |
| [Skeleton](components/business-skeleton.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/feedback/business-skeleton.tsx) |
| [Tag](components/business-tag.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/feedback/business-tag.tsx) |
| [Terminal](components/business-terminal.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/data/business-terminal.tsx) |
| [CascadeSelect](components/business-cascadeselect.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/form/business-cascadeselect.tsx) |
| [CommandMenu](components/business-commandmenu.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/navigation/business-commandmenu.tsx) |
| [SplitButton](components/business-splitbutton.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/actions/business-splitbutton.tsx) |
| [TreeSelect](components/business-treeselect.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/form/business-treeselect.tsx) |
| [StyleClass](components/business-styleclass.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/layout/business-styleclass.tsx) |
| [Backdrop](components/business-backdrop.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/overlay/business-backdrop.tsx) |
| [Collapsible](components/business-collapsible.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/cards/business-collapsible.tsx) |
| [Motion](components/business-motion.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/scroll/business-motion.tsx) |
| [Portal](components/business-portal.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/overlay/business-portal.tsx) |
| [VisuallyHidden](components/business-visuallyhidden.md) | 没有独立运行项 | [自有 React 示例](../../src/business/demos/overlay/business-visuallyhidden.tsx) |

不新增运行时依赖；原有 215 项效果组件身份与实现继续保留。
