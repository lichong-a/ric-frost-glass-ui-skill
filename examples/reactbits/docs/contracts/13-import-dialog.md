# 13．ImportDialog

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

---

规范来源：[COMPONENT_CONTRACTS.md](../../../../COMPONENT_CONTRACTS.md)。本文件由主规范按章节生成；修改主规范后重新生成，不独立维护第二套规则。
