
# 全站统一设计令牌 · Design Token System

## 目标

现在 `index.css` 已经有一部分颜色 token，但排版、间距、圆角、阴影几乎全散落在各页面的 `text-[10.5px]` / `text-[12.5px]` / `rounded-xl` / `rounded-2xl` / `tracking-widest` / `tracking-[0.14em]` 这类硬编码里。这就是"不统一、山寨"的根源。

本任务：**建立一套受控的、有限枚举的设计 token**，然后让全站页面只允许引用这些 token，禁止任意像素值。

---

## 一、Token 体系（写入 `src/index.css` + `tailwind.config.ts`）

### 1. 颜色（保留现有，补齐边界）
- 语义色：`background / foreground / surface / surface-muted / surface-sunken / card / border / border-strong / muted / muted-foreground / primary / primary-soft / primary-hover / gold / gold-soft / success / warning / destructive`（含各自 `-foreground` / `-soft`）
- Rail：`rail / rail-foreground / rail-active`
- 全部以 HSL 变量方式存在；组件里禁止再写 `text-white / bg-black / bg-[#xxxxxx]`

### 2. 圆角（收敛到 4 档）
```
--radius-sm: 6px      → rounded-sm-token   （标签、chip、小按钮）
--radius-md: 10px     → rounded-md-token   （输入框、次级按钮、迷你卡）
--radius-lg: 14px     → rounded-lg-token   （表格、内嵌区块、KPI）
--radius-xl: 18px     → rounded-xl-token   （主卡片、面板）
--radius-full: 9999px → rounded-full       （头像、状态圆点）
```
禁止再出现 `rounded-2xl / rounded-xl / rounded-lg` 混用。

### 3. 阴影（3 档 + focus）
```
--shadow-sm     卡片默认
--shadow-md     hover / 抬起
--shadow-lg     浮层 / drawer
--shadow-focus  聚焦环
```

### 4. 间距（约定使用 Tailwind 内置刻度，禁用 `p-[..]`）
```
组件内边距： p-4 (16px) / p-5 (20px) / p-6 (24px)
垂直节奏：  gap-2 / gap-3 / gap-4 / gap-6
分区间距：  mb-6 (section) / mb-8 (page block)
```

### 5. 字体层级（type scale — **本次改动核心**）

在 `tailwind.config.ts` 里注册命名字号，替换掉所有 `text-[..px]`：

```
text-display   28px / 700 / -0.02em   页面主标题
text-title     20px / 600 / -0.015em  分区标题
text-subtitle  16px / 600 / -0.01em   卡片标题
text-body      14px / 400              正文
text-caption   12.5px / 500 / muted    次要文本
text-label     11px / 600 / uppercase / tracking-[0.12em]  小标签（KPI label / eyebrow）
text-mono      12px / mono              ID / 编号
```

对应字体族：
```
font-display  Manrope   （display / title / subtitle）
font-sans     Inter     （body / caption / label）
font-mono     JetBrains Mono / ui-monospace （mono）
```

---

## 二、抽象组件（`src/components/mos/Primitives.tsx`）

统一由 Primitives 输出下列受控组件，页面只允许通过它们组合，不再自己写原子样式：

- `PageHeader` — 使用 `text-display` + `text-body/muted`
- `SectionTitle` — 使用 `text-title`
- `Card` / `CardMuted` / `CardTinted` — 统一 `rounded-xl-token` + `shadow-sm` + `p-6`
- `KpiTile` — 已统一（改用 `text-label` + `text-display`）
- `StatusBadge` — 使用 `rounded-sm-token` + `text-label`
- `Chip` (筛选/分类标签) — 新增，统一替代现在散落的 `rounded-full border px-3 py-1.5 text-[12px]`
- `Muted` / `Mono` / `Eyebrow` 文本原语 — 让页面写 `<Eyebrow>SUP-CN-0081</Eyebrow>` 而不是 `font-mono text-[11px] text-muted-foreground`

---

## 三、页面级重构（用 token 替换硬编码）

对以下页面做一次统一扫描替换：

```
src/pages/Dashboard.tsx
src/pages/PurchaseIntake.tsx
src/pages/SupplierDiscovery.tsx
src/pages/CandidateReview.tsx
src/pages/FirstContact.tsx
src/pages/RFQ.tsx
src/pages/QuoteReview.tsx
src/pages/BuyerQuotation.tsx
src/pages/Orders.tsx
src/pages/Settings.tsx
```

替换规则：
- 所有 `text-[..px]` → 换成 `text-display / text-title / text-subtitle / text-body / text-caption / text-label / text-mono` 之一
- 所有 `tracking-widest / tracking-[..em]` → 由 `text-label` 内建承担
- 所有 `rounded-lg / rounded-xl / rounded-2xl` → 换成 `rounded-{sm|md|lg|xl}-token`
- 所有 `p-3 / p-4 / p-5` 卡片内边距 → 统一 `p-6`（小组件 `p-4`）
- 所有 chip/tab/filter 按钮 → 替换为 `<Chip>`
- 所有 supplier id / order id 等编号 → 替换为 `<Mono>`

---

## 四、验证

1. `rg "text-\[" src/pages src/components` 应返回 **0 条**（除 primitive 内部映射）
2. `rg "rounded-2xl|rounded-xl(?!-token)|rounded-lg(?!-token)" src/pages` 应返回 **0 条**
3. Playwright 全 10 页截图对比，确认字号、圆角、卡片阴影视觉一致

---

## 交付物

- 更新 `src/index.css`（token 定义）
- 更新 `tailwind.config.ts`（注册 fontSize / borderRadius / boxShadow token）
- 更新 `src/components/mos/Primitives.tsx`（新增 Chip / Mono / Eyebrow / SectionTitle）
- 重构 10 个页面文件，全部改为引用 token 与 primitives
- 一次全站截图 QA
