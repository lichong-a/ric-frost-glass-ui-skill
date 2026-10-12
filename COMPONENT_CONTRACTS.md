# Agent Wan 前端组件交互与业务状态契约

本文件供编码 Agent 与评审者直接执行，与主 UI 规范、Token、参考图片共同使用。
外观依据参考图片；本文件中的键盘、异步、权限、错误、窄屏规则属于本次补充的产品约定，不能声称由静态图片验证。
建议接口用于约束数据和事件边界；接入现有项目时允许改名，不允许改变约定的用户行为。

## 目录

- [00．执行边界与公共约定](#00执行边界与公共约定)
- [01．AppShell](#01appshell)
- [02．Sidebar](#02sidebar)
- [03．Header](#03header)
- [04．Button](#04button)
- [05．Input 与 SearchInput](#05input-与-searchinput)
- [06．Select 与 MultiSelect](#06select-与-multiselect)
- [07．Segmented 与 Tabs](#07segmented-与-tabs)
- [08．TenantSwitcher](#08tenantswitcher)
- [09．TodoPopover](#09todopopover)
- [10．UserMenu](#10usermenu)
- [11．DataTable](#11datatable)
- [12．RowActions](#12rowactions)
- [13．ImportDialog](#13importdialog)
- [14．ConfirmDialog](#14confirmdialog)
- [15．Toast 与 InlineFeedback](#15toast-与-inlinefeedback)
- [16．Pagination](#16pagination)
- [17．Drawer 与 Tooltip](#17drawer-与-tooltip)
- [18．数据呈现与辅助控件](#18数据呈现与辅助控件)
- [19．浮层与键盘公共规则](#19浮层与键盘公共规则)
- [20．验收用例](#20验收用例)
- [21．官方技术依据](#21官方技术依据)

## 00．执行边界与公共约定

- “必须”表示交付约束；“建议接口”允许适配框架，但必须保留必要的数据与回调。
- 图片中的 25 条待办、50 条记录、版本号、用户名称仅为示例；组件必须由数据驱动，禁止把示例写成默认业务值。
- 沿用主规范尺寸：基准宽 1728、顶栏高 64、展开侧栏宽 256、控件高 40（大 48／小 32）、表格行高 52、正文字号 14。
- 浮层参考宽：普通菜单 200–240、租户 360、待办 420、用户 320、导入弹窗 520、确认弹窗 400；屏幕边缘留 16、触发器间距 8。
- 上述尺寸通过主规范 Token 引用；窄屏宽度上限为可用视口减左右边距，不允许复制成组件内的独立魔法数字。
- 业务 ID 必须稳定且与显示名称分离；以名称、数组下标或当前行位置作为请求主键不合格。
- 请求状态、业务状态和视觉交互状态分别管理；悬停不表示选中，加载不表示成功，权限禁用不表示网络错误。
- 全局异步响应必须携带组织／空间作用域与请求序号；过期响应不得写入当前视图或覆盖新请求结果。

## 01．AppShell

```ts
type Scope = { organizationId: string; spaceId: string };
interface AppShellProps {
  scope: Scope; routeId: string; navigationExpanded: boolean;
  contextState: "ready" | "switching" | "unavailable";
  onNavigationExpandedChange(next: boolean): void;
}
```

- DOM 顺序为跳过导航链接、Header、Sidebar、main；main 具有唯一标题关联和可作为跳转目标的 ID。
- 顶栏跨页面顶部，Logo 在左，右侧入口次序为待办、租户与空间、个人信息；侧栏从顶栏下开始。
- 桌面主内容为主要纵向滚动区；侧栏过长时可独立滚动，整页不得产生不必要的双纵向滚动条。
- 页面背景连续铺设；滚动、路由切换或打开下拉时，背景不得随每个玻璃组件分别重建。
- 窄屏进入主规范指定布局后，侧栏变为 Drawer；路由导航成功时关闭抽屉，将焦点移到新页标题。
- 刷新或深链进入时先恢复作用域与权限，再展示业务数据；无效空间显示明确恢复入口，不静默切换到别人的空间。

## 02．Sidebar

```ts
type NavItem = { id: string; label: string; href?: string; children?: NavItem[]; disabledReason?: string };
interface SidebarProps { items: NavItem[]; activeId: string; collapsed: boolean; onNavigate(id: string): void }
```

- 使用 nav 和普通链接；页面导航不是 menu，不添加 menuitem 键盘语义。
- 当前页面链接具有 aria-current="page"；展开组是 button，具有 aria-expanded 与 aria-controls。
- 展开组、当前路由、鼠标悬停、键盘焦点分别呈现；展开某组不改变路由，不强制关闭无关组。
- 折叠后保留可访问名称；图标 Tooltip 同时支持键盘焦点，不能作为名称的唯一来源。
- 权限决定可见入口；服务器拒绝深链时仍显示“无访问权限”，隐藏导航不代替权限校验。

## 03．Header

```ts
interface HeaderProps {
  openPanel: null | "todo" | "tenant" | "user";
  pendingCount: number | null; scopeLabel: string; userLabel: string;
  onPanelChange(panel: HeaderProps["openPanel"]): void;
}
```

- Logo 可导航到已配置首页；首页地址和用户信息由应用提供，不硬编码为示例内容。
- 三个入口使用真实 button；点击已打开入口关闭，打开另一入口关闭前一入口。
- 参考图同时展示多个下拉属于组件陈列；真实顶栏只允许一个上述浮层打开。
- 数量未知时显示加载占位或隐藏徽标，不伪造 0；徽标封顶显示形式由产品配置，完整数量保留在可访问名称中。
- 空间长名称允许两行或省略，完整值可获取；不能挤压待办与用户入口至不可点击。

## 04．Button

```ts
interface ButtonProps {
  variant: "primary" | "secondary" | "ghost" | "danger" | "danger-outline" | "warning";
  size?: "small" | "medium" | "large"; disabled?: boolean; loading?: boolean;
  accessibleLabel?: string; type?: "button" | "submit" | "reset";
  onPress(): void | Promise<void>;
}
```

- 默认 type="button"；只有明确提交表单的按钮使用 submit。图标按钮必须提供独立可访问名称。
- loading 保留原宽度和操作文案，显示忙碌提示并阻止重复提交；不能仅替换成无名称的旋转图标。
- 普通禁用采用原生 disabled；若加载时需保留焦点，可用 aria-disabled 与 aria-busy，并在事件层阻止触发。
- 禁用原因放在可关联的说明或邻近文本中；不能依赖无法获得焦点的禁用按钮触发 Tooltip。
- 异步操作以服务端结果决定成功反馈；组件不得因点击已发生就立即发出成功 Toast。

## 05．Input 与 SearchInput

```ts
interface InputProps { value: string; label: string; readOnly?: boolean; disabled?: boolean; error?: string; onChange(value: string): void }
interface SearchInputProps extends InputProps { onSearch(value: string): void; debounceMs?: number }
```

| 状态 | 必须行为 |
| --- | --- |
| default／focus | label 与输入框关联；placeholder 仅补充示例，不能代替 label |
| readOnly | 可聚焦、选择、复制，保留值与表单语义；用户不能修改 |
| disabled | 不可编辑，通常不进入 Tab 顺序；原生表单不提交该字段，需要保留值时由数据模型处理 |
| invalid | 显示具体修正建议，设置 aria-invalid，并用 aria-describedby 关联错误 |

- 搜索默认防抖 250 ms，这是项目交互约定；输入显示值实时更新，不能把防抖作用于输入框回显。
- compositionstart 时取消待执行搜索并进入组合态；组合过程中不查询、不提交、不拦截输入法候选 Enter。
- compositionend 后读取完整字符串并重新开始 250 ms 防抖；同轮重复 input/change 事件不得造成重复查询。
- 非组合态 Enter 立即提交并取消待执行定时器；同时检查事件 isComposing 和组件组合态标记。
- 清除按钮立即提交空查询并取消旧定时器；组件卸载、作用域变化时清除定时器和失效请求。
- 新查询可取消旧请求，但仍必须校验响应序号；仅 AbortController 不足以保证乱序结果不会覆盖。

## 06．Select 与 MultiSelect

```ts
type Option = { id: string; label: string; description?: string; disabled?: boolean };
interface SelectProps { value: string | null; options: Option[]; searchable?: boolean; onChange(id: string | null): void }
interface MultiSelectProps { values: string[]; options: Option[]; onChange(ids: string[]): void }
```

- Select 用于选择表单值；优先原生 select，定制时实现 combobox 与 listbox／option，不能套用动作 menu。[Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
- 当前已提交值与键盘活动选项分离；方向键浏览，Enter 提交，Escape 关闭且保留原已提交值。
- 定制输入保持名称、展开状态、弹层关联与活动选项关联；option 的 aria-selected 对应实际选择状态。
- 搜索型 Select 采用第 05 节输入法规则；“没有匹配选项”不是可选 option，不因输入任意文本自动创建业务值。
- MultiSelect 使用触发按钮、非模态浮层、独立搜索框和 aria-multiselectable="true" 的 listbox。
- 多选项使用 option 与 aria-selected；复选图形是展示层，option 内不再嵌套真实 checkbox 或链接。[Listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)
- 搜索框接收文字输入；焦点在列表时上下键浏览、Space 切换当前项，选择后保留浮层，Escape 关闭。
- 多选直接提交每次勾选；Escape 不撤销已提交值。“清空全部”放在列表外，并说明清除的是全部已选项。
- 长标签省略后保留完整可访问名称；移除标签按钮名称为“移除：标签名”。失效选项明确标注，不能静默删掉业务值。

## 07．Segmented 与 Tabs

```ts
interface SegmentedProps { value: string; items: { id: string; label: string; count?: number }[]; onChange(id: string): void }
interface TabsProps { activeId: string; activation: "automatic" | "manual"; onActivate(id: string): void }
```

| 组件 | 用途与语义 | 项目行为 |
| --- | --- | --- |
| Segmented | 对同一份数据做互斥筛选；默认采用有名称的 radiogroup／radio | 当前值 aria-checked；方向键选择；重置页码并清空表格选择 |
| 按钮式 Segmented | 仅在既有组件库采用按钮组时允许 | 每项 aria-pressed，恰好一项为 true；不要同时使用 tab 语义 |
| Tabs | 切换不同内容面板或导入来源表单 | tablist／tab／tabpanel 关联；当前项 aria-selected |

- 网络请求或重型面板采用手动 Tabs：方向键移动焦点，Enter／Space 激活；即时本地面板可自动激活。
- 状态筛选不会凭空创建独立 tabpanel；视觉样式相似不代表交互语义相同。
- 禁用项必须有原因；空结果不自动跳回“全部”，避免覆盖用户选择。

## 08．TenantSwitcher

```ts
interface TenantSwitcherProps {
  activeScope: Scope; state: "idle" | "loading-spaces" | "switching" | "failed";
  loadSpaces(organizationId: string, signal: AbortSignal): Promise<{ id: string; label: string }[]>;
  commitScope(next: Scope, requestId: string): Promise<{ scope: Scope; contextVersion: string }>;
  onCommitted(scope: Scope, contextVersion: string): void;
}
```

| 阶段 | 数据与反馈 | 是否改变当前作用域 |
| --- | --- | --- |
| 打开 | 当前组织／空间打勾，组织搜索可用 | 否 |
| 选择组织 | 只修改 draftOrganizationId，清空旧组织的候选空间并加载新列表 | 否 |
| 空间已加载 | 展示该组织可访问空间；原当前作用域与待选组织可辨认 | 否 |
| 选择空间 | 构造完整目标 Scope，开始一次切换事务 | 否 |
| 服务端验证成功 | 原子提交组织、空间、权限上下文和路由归属，关闭面板 | 是 |
| 失败／无权限 | 内联说明原因，保留原 Scope；允许换目标或重试 | 否 |

- 组织与空间是两步选择、一次提交；点击组织不能提前切换全局组织，也不能沿用前一组织的 spaceId。
- 选择已生效的组织与空间直接关闭，不重复请求；无空间时显示“该组织下暂无可访问空间”及获授权的管理入口。
- 连续点击组织 A、B 时，A 的迟到响应不能覆盖 B 的空间；请求需校验组织 ID 与序号。
- 切换中保留原租户标签并显示目标进度，暂停相关写入口；禁止出现新租户标题搭配旧租户业务内容。
- 取得目标上下文后再提交；目标列表未加载时显示目标作用域骨架，不把原数据暂借给目标空间。
- 查询键必须包含 Scope，例如 ["skills", organizationId, spaceId, filters]；切换后终止或忽略旧查询、清空行选择与浮层草稿。
- 旧缓存可按项目策略保留为独立分区；权限撤销与退出登录必须清理相关缓存，不能仅靠隐藏组件隔离。
- 异步任务保留创建时 Scope；旧空间任务完成后不得修改新空间列表，也不得在新空间自动重放写请求。
- 有未保存编辑时执行项目已有离开保护；无未保存编辑时不额外弹二次确认。切换失败必须恢复可操作状态。

## 09．TodoPopover

```ts
type Todo = { id: string; title: string; scopeLabel: string; statusLabel: string; href: string };
interface TodoPopoverProps { items: Todo[]; pendingTotal: number | null; filter: "pending" | "completed"; onFilterChange(value: "pending" | "completed"): void }
```

- 面板为带标题的 section／region，内部为状态筛选、ul／li 列表和“查看全部待办”链接；不使用 menu 或 aria-modal。
- 触发按钮设置 aria-expanded 与 aria-controls；面板不是 menu，不设置 aria-haspopup="menu"。
- 键盘打开时将焦点移到面板标题或首个筛选项；Tab 按自然顺序离开，不循环锁定焦点。
- Escape 关闭并返回触发器；焦点离开整组或点击外部时关闭，不抢走外部新目标的焦点。
- 标题、徽标和页脚分别使用服务端待处理总数与实际展示数量；加载失败不把总数改成 0。
- 点击事项打开所属上下文中的详情；涉及切换空间时复用 TenantSwitcher 事务，权限不足则说明原因。
- 打开面板不标记任务完成；“已完成”由后端状态驱动。完成操作失败时保留事项并显示行内原因。
- 长列表内部滚动，标题与底部入口可保持可见；刷新不无故重置正在浏览的位置。

## 10．UserMenu

```ts
interface UserMenuProps { user: { name: string; roleLabel: string }; onAction(action: "profile" | "security" | "preferences" | "help" | "logout"): void }
```

- 用户身份摘要放在菜单容器之外；动作区采用 menu／menuitem，分隔线采用 separator，避免把普通说明文字伪装成菜单项。
- 触发器具有 aria-haspopup="menu" 与 aria-expanded；Enter／Space 打开并聚焦第一项。[Menu Button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)
- 菜单内上下键浏览、Home／End 到首尾、Enter／Space 执行动作、Escape 返回触发器；Tab 离开时关闭。
- 偏好设置若使用真正子菜单，键盘 ArrowRight 进入、ArrowLeft 返回；主题单选使用 menuitemradio 与 aria-checked。
- 当前规范若尚未提供某主题实现，不能把该项做成点击无效的可用操作；由应用传入可用项与禁用说明。
- 退出登录失败需说明会话是否仍有效；退出成功清理身份、作用域缓存与待提交草稿，并导航至配置的登录页。

## 11．DataTable

```ts
interface DataTableProps<T> {
  rows: T[]; getRowId(row: T): string; selectable?: boolean;
  selectedIds: string[]; selectionScope: "page";
  isRowSelectable?(row: T): boolean;
  onSelectionChange(ids: string[], reason: "row" | "page" | "query-change" | "refresh"): void;
}
```

- 默认 selectable=false；仅需要批量操作时展示选择列，不为复刻图片无条件加入复选框。
- 使用原生 table、caption 或关联标题、thead、tbody、th scope="col"；无需电子表格式导航时不使用 role="grid"。
- 表头 checkbox 仅操作当前页可选择行；名称为“选择本页全部可选记录”，不暗示选择全部查询结果。
- 可选行数为 0 时表头复选框禁用；全部选中为 checked，部分选中为 indeterminate，读屏状态为 mixed。
- 行选择仅通过 checkbox 改变；名称链接负责查看，编辑按钮负责编辑，点击空白行默认不切换选择。
- 基准 selectionScope="page"：翻页、页大小、排序、关键词、筛选或 Scope 改变均清空选择，并移除过期批量操作条。
- 当前页刷新仅保留仍存在且仍可选的 ID；记录停用或权限变化使其不可选时也要移除。
- 批量操作条显示“已选择本页 N 项”；提交使用已选 ID 快照，返回后逐项呈现成功与失败，不能笼统宣称全部成功。
- 若以后扩展跨页选择，必须另建明确的选择模型和“选择全部筛选结果”确认入口；本规范不允许隐式跨页保留。
- 列排序用表头内 button；仅当前排序列设置 aria-sort，排序状态加入请求与 URL 状态。
- 表格行高基准 52，文本长时可按主规范增高；不能固定高度后遮挡多行说明。横向滚动只影响表格区域。
- 名称和状态不只依赖颜色；版本取实际数据，未知值显示约定占位，不默认填充图片中的版本。

## 12．RowActions

```ts
type RowAction = "view" | "edit" | "tags" | "duplicate" | "disable" | "delete";
interface RowActionsProps { rowId: string; rowName: string; actions: RowAction[]; pending?: RowAction; onAction(action: RowAction, rowId: string): Promise<void> }
```

- 图标或组合按钮名称包含对象，例如“编辑：会议纪要整理”“更多操作：会议纪要整理”。
- 行内按钮、链接、checkbox、菜单项不触发可选的整行详情事件；停止事件冒泡不能代替真实交互元素。
- 更多菜单使用标准 menu，Portal 到统一浮层容器；跟随触发器定位，不能被表格 overflow 或圆角裁切。
- 打开菜单不选择该行；操作对象取稳定 rowId，不取“当前选中行”或渲染索引。
- 停用和删除必须调用各自 ConfirmDialog；复制成功依据后端返回的新 ID／名称，不能仅复制展示行伪装成功。
- 菜单关闭时按关闭原因恢复焦点；原记录被删除后聚焦相邻记录的名称链接或表格标题。

## 13．ImportDialog

```ts
type ImportSource = { kind: "package"; file: File } | { kind: "git"; repositoryUrl: string; ref?: string } | { kind: "url"; resourceUrl: string };
type ImportPhase = "initial" | "validating" | "ready" | "uploading" | "importing" | "reconciling" | "succeeded" | "failed" | "cancelled";
type ScanPhase = "not_started" | "queued" | "scanning" | "passed" | "rejected" | "failed";
interface ImportDialogProps {
  scope: Scope; source: ImportSource | null; importPhase: ImportPhase; scanPhase: ScanPhase;
  allowedExtensions: string[]; maxBytes: number; operationId?: string;
  onSubmit(source: ImportSource, name: string, idempotencyKey: string): Promise<void>;
}
```

- package／git／url 是切换不同表单的 Tabs；来源切换清除不适用的校验结果，不自动发起导入。
- package 支持文件选择与拖放；后缀和大小限制来自应用／服务端配置，图片中的 ZIP、TAR.GZ 与 128 KB 不是固定业务规则。
- git 提供仓库地址和可选分支／标签／提交引用；url 提供资源地址；解析格式不等于服务端可以访问。
- 客户端只做格式、大小和必要字段初检；服务端负责真实性、解包安全、权限与完整校验。文件状态文案使用“初步校验通过”。

| 导入状态 | 进入条件与展示 | 可执行操作 |
| --- | --- | --- |
| initial | 尚无完整来源；显示输入和限制 | 编辑、取消 |
| validating | 本地初检中；非整页加载 | 取消检查／修改来源 |
| ready | 表单可提交；不是技能“可用” | 导入、修改、取消 |
| uploading | package 文件传输中 | 后端支持时取消；禁止重复提交 |
| importing | 服务端获取或解析内容并创建记录 | 查看进度、关闭面板后继续跟踪 |
| reconciling | 请求断连、超时，结果尚待确认 | 按操作标识查询状态；不自动重复创建 |
| succeeded | 服务端明确返回已创建记录与 ID | 查看技能；继续追踪扫描 |
| failed | 已确认失败；记录失败阶段与原因 | 修正后重试；保留可恢复输入 |
| cancelled | 本地或服务端明确确认取消 | 重新选择或重新提交 |

- package 路径为 ready → uploading → importing；git／url 为 ready → importing。传输进度只有真实可测时才显示百分比。
- 提交使用幂等键；服务端只返回“任务已接收”时仍为 importing，不可提前转 succeeded。
- 超时进入 reconciling，通过 operationId 或支持的幂等键查询；取消浏览器请求不等于取消服务端导入。
- 导入运行中关闭弹窗仅关闭视图；任务继续时提供待办／任务入口。只有后端确认取消才显示 cancelled。
- 扫描独立运行，不把 scanning 塞进导入成功之前以掩盖已创建的记录；两种状态分别保存、恢复。

| 扫描状态 | 用户文案与含义 | 启用能力 |
| --- | --- | --- |
| not_started／queued | 已导入，等待安全扫描 | 禁止 |
| scanning | 安全扫描中 | 禁止 |
| passed | 安全扫描通过 | 仍需用户权限及业务启用状态满足 |
| rejected | 扫描不通过；展示可理解的原因与报告入口 | 禁止 |
| failed | 扫描服务执行失败；支持有权限的重试 | 禁止，不能解释为“已发现风险” |

- 可启用条件至少为 importPhase === "succeeded" 且 scanPhase === "passed"，再叠加业务权限与启用规则。
- 导入成功 Toast 使用“导入完成，等待安全扫描”；扫描后技能能否可用依据实际业务状态显示，不能自动越过审批。
- 参考图中的“导入成功”和“尚未完成安全扫描”可以同时成立；扫描警告持续显示在记录或详情中，不能只存在于短暂 Toast。

## 14．ConfirmDialog

```ts
interface ConfirmDialogProps { kind: "disable" | "delete"; target: { id: string; name: string }; phase: "idle" | "submitting" | "failed"; onConfirm(): Promise<void>; onClose(): void }
```

| 操作 | 必须说明 | 成功后行为 |
| --- | --- | --- |
| disable | 对象名称、停止可用范围、是否可重新启用；运行中任务如何处理由后端策略提供 | 更新停用状态，保留记录；给出可恢复入口 |
| delete | 对象名称、实际删除范围、是否可恢复及已知依赖影响 | 以服务端结果移除或标记删除，不将其解释成停用 |

- 警告与危险操作采用不同文案和语义色；不能只更换按钮颜色而复用“确认操作”。
- 对话框具有可见标题与取消按钮；初始焦点放在取消或说明标题，避免误触破坏性确认。[Modal Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- submitting 阻止重复确认，保留原文案；失败保留对话框并显示原因，不能先移除行再悄悄恢复。
- Escape／关闭按钮关闭视图；请求已提交后关闭不表示撤销。若支持业务撤销，必须使用单独且有结果的操作。
- 类型名称二次输入只在业务明确要求时启用，不默认给所有停用和删除添加额外步骤。

## 15．Toast 与 InlineFeedback

```ts
interface ToastMessage { id: string; kind: "success" | "error" | "info"; title: string; description?: string; actionLabel?: string; onAction?(): void; onDismiss(): void }
interface InlineFeedbackProps { kind: "warning" | "error" | "info"; message: string; persistent: boolean; retry?(): void }
```

- 成功 Toast 默认 5 秒后关闭；鼠标悬停或焦点位于内部时暂停计时。这是项目约定，不是无障碍规范规定的固定时长。
- 错误 Toast 不自动隐藏；提供明确关闭与适用的重试入口。去重依据 operationId／错误标识，不能不断堆叠同一失败。
- 成功与普通信息使用 role="status"／礼貌播报；需要即时处理的错误使用 role="alert"，避免同一消息在多处重复播报。
- Toast 不抢焦点；关闭按钮名称包含目标消息。重试复用已确认安全的操作语义，不盲目重复可能已成功的导入。
- 表单字段错误留在字段附近；数据加载失败留在数据区；扫描警告留在记录上下文，Toast 不能代替这些反馈。
- 通知进入与离开遵守主规范动效和减少动效设置；出现 Toast 不挤动页面布局。

## 16．Pagination

```ts
interface PaginationProps { page: number; pageSize: number; total: number | null; pageSizeOptions: number[]; loading: boolean; onChange(page: number, pageSize: number): void }
```

- page 从 1 开始；pageSize 与选项由调用方明确提供，禁止以图片页数或记录数作为默认。
- 使用有名称的 nav；页码按钮标注“第 N 页”，当前页 aria-current="page"；省略号不是可点击按钮。
- 首页禁用上一页，已知末页禁用下一页；total 未知时不编造总页数，使用服务端游标／hasNext 的独立模式。
- 查询或页大小变化回到第 1 页并清空选择；删除导致当前页越界时请求最后有效页。
- 同作用域翻页可保留旧行并显示忙碌状态，成功后替换；失败显示重试与原数据状态，不能呈现为零结果。

## 17．Drawer 与 Tooltip

| 组件 | 建议状态 | 必须行为 |
| --- | --- | --- |
| Drawer | closed／opening／open／closing | 窄屏导航使用模态 dialog；有标题、关闭按钮、焦点约束与背景 inert |
| Tooltip | hidden／visible | hover 与 focus 可触发，Escape 可隐藏，内容本身不可交互，不吸收焦点 |

- Drawer 沿用对话框键盘规则；打开时聚焦标题或首项，关闭后返回原触发器；导航成功则移至新页标题。
- 大屏常驻详情区域不是模态 Drawer；若采用非模态抽屉，不设置 aria-modal、不锁焦点，也不让背景 inert。
- Tooltip 使用 role="tooltip" 与 aria-describedby；按钮自身仍有名称。信息必须可在键盘操作下获取。
- 可点击链接、确认按钮、长篇报告放在 Popover 或 Dialog，不能放进 Tooltip。

## 18．数据呈现与辅助控件

| 组件／状态 | 契约 |
| --- | --- |
| Skeleton／loading | 保持目标布局，装饰骨架 aria-hidden，内容容器 aria-busy；没有数据时不显示虚构数值 |
| Empty／no-data | “暂无技能”，提供权限允许的创建或导入入口 |
| Empty／filtered | “未找到匹配的技能”，保留关键词与筛选，提供清空筛选 |
| Error／load-failed | 说明加载失败、提供重试；若保留旧数据，明确其状态 |
| Forbidden | “无访问权限”，提供获授权的切换或申请入口；不能伪装成空列表 |
| Badge／Tag | 显示真实状态文本，颜色与图标作为辅助；非交互标签不加入 Tab |
| Checkbox | 原生优先；checked／mixed／disabled 与视觉一致，每个控件有名称 |
| Switch | checked／pending／failed 分离；有名称和 checked 语义，失败保留原值并解释 |

- 后端返回空数组、请求失败和没有权限是不同分支，不用同一空态组件文案吞并。
- Switch 若采用乐观更新，失败必须回滚且说明；涉及高影响业务的开关按业务约定确认，不能仅凭截图决定。

## 19．浮层与键盘公共规则

- 全部浮层共享层级 Token 和 Portal；挂载点不得位于会裁切菜单的表格、玻璃卡片或隐藏的祖先中。
- 使用锚点定位与视口碰撞计算；剩余高度不足时调整方向和最大高度，窄屏保留 edge 16，间距按 gap 8。
- 仅最上层处理 Escape；子菜单先关闭再返回父菜单，不能一次 Escape 同时退出所有父级。
- 模态框打开后使背景不可交互，Tab／Shift+Tab 限定在框内；只有真正模态行为才设置 aria-modal="true"。
- 模态框内打开的下拉虽可 Portal，仍必须属于模态焦点／可访问上下文；不得被外部 inert 或 aria-hidden 屏蔽。
- 关闭后的焦点依据原因处理：Escape 回触发器，动作完成去合理目标，点击外部不抢走新焦点。
- 不使用正数 tabindex；原生链接、button、input 优先。可视顺序与 DOM 阅读顺序保持一致。
- 所有互动有键盘等效路径；焦点环不被圆角与 overflow 裁切，状态不只靠颜色、透明度或动画传达。
- 文本缩放、减少动效和玻璃降级时功能一致；尺寸、对比度与移动端断点的具体目标以主规范为准。
- 列表搜索、选项更新和任务进度避免逐字／逐帧重复播报；只在有意义的状态变化时通知辅助技术。

## 20．验收用例

以下是待执行验收要求，不代表本交付已运行页面测试或取得无障碍认证。

1. 键盘打开三个顶部入口，确认互斥、焦点路径与 Escape；待办可自然 Tab 离开，菜单具备方向键。
2. 输入中文拼音并选择候选字，确认组合态不搜索；最终词语只按约定提交一次，清除后不被旧查询覆盖。
3. 快速选择组织 A、B 并让 A 请求晚返回，确认仅显示 B 的空间；切换失败后原 Scope 和数据保持一致。
4. 导入文件初检通过后模拟上传失败、导入断连和扫描拒绝，确认不存在“导入成功即自动可用”。
5. 开启表格选择后部分选中、全选、翻页、筛选及切换空间，确认选择范围始终与文案一致。
6. 从行操作菜单执行编辑和停用，确认不会误选行；删除完成后焦点仍位于合理目标。
7. 分别展示无数据、筛选无结果、加载失败、无权限和旧数据刷新失败，不混用提示。
8. 验证成功 Toast 5 秒计时及悬停暂停，错误 Toast 持续存在，重复失败不会刷屏。
9. 在主规范要求的窄屏及文本缩放条件下检查浮层碰撞、对话框滚动、表格横向滚动和按钮可达性。
10. 使用键盘与辅助技术检查名称、角色、展开／选择状态及焦点恢复；发现缺口后修正并记录实际结果。

## 21．官方技术依据

以下为语义和键盘行为的技术依据；业务流程、尺寸、250 ms 防抖和 Toast 时长属于本项目补充规则。

- [W3C WAI-ARIA APG：Menu Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)
- [W3C WAI-ARIA APG：Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [W3C WAI-ARIA APG：Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
- [W3C WAI-ARIA APG：Listbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)

APG 提供实现模式与指导；引用这些页面不等于完成兼容性验证或获得认证。使用组件库时仍须核对实际渲染、焦点与业务状态。
