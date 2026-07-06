import { cn } from "@/lib/utils";
import type { ReactNode, MouseEventHandler } from "react";
import { Check, Pencil, X, Eye, type LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

/* ============================================================
 * IconAction — the ONLY sanctioned icon-only action button.
 * Unified sizing, tone, and tooltip across the whole app so
 * Approve / Edit / Reject etc. always read the same visually.
 * ============================================================ */

type IconActionTone = "primary" | "outline" | "ghost" | "destructive";

export function IconAction({
  icon: Icon,
  label,
  tone = "outline",
  onClick,
  disabled,
  className,
}: {
  icon: LucideIcon;
  label: string;                 // accessible + tooltip text
  tone?: IconActionTone;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
}) {
  const toneMap: Record<IconActionTone, string> = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm",
    outline:
      "bg-surface text-foreground border border-border hover:border-border-strong hover:bg-surface-muted",
    ghost:
      "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
    destructive:
      "bg-surface text-destructive border border-border hover:border-destructive/40 hover:bg-destructive-soft",
  };
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          aria-label={label}
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:pointer-events-none disabled:opacity-50",
            toneMap[tone],
            className,
          )}
        >
          <Icon className="h-4 w-4" strokeWidth={2.25} />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top">{label}</TooltipContent>
    </Tooltip>
  );
}

/* Semantic shortcuts — pages MUST use these instead of choosing tone manually. */
export function ApproveAction(props: { onClick?: MouseEventHandler<HTMLButtonElement>; disabled?: boolean; label?: string }) {
  return <IconAction icon={Check} tone="primary" label={props.label ?? "Approve"} {...props} />;
}
export function EditAction(props: { onClick?: MouseEventHandler<HTMLButtonElement>; disabled?: boolean; label?: string }) {
  return <IconAction icon={Pencil} tone="outline" label={props.label ?? "Edit"} {...props} />;
}
export function RejectAction(props: { onClick?: MouseEventHandler<HTMLButtonElement>; disabled?: boolean; label?: string }) {
  return <IconAction icon={X} tone="destructive" label={props.label ?? "Reject"} {...props} />;
}
export function PreviewAction(props: { onClick?: MouseEventHandler<HTMLButtonElement>; disabled?: boolean; label?: string }) {
  return <IconAction icon={Eye} tone="outline" label={props.label ?? "Preview"} {...props} />;
}

/* ============================================================
 * MOS Primitives — the ONLY sanctioned source of visual style.
 * All pages should compose these instead of writing raw
 * text-[..px] / rounded-xl / p-4 utility classes directly.
 * ============================================================ */

/* --------- Page-level ---------- */

export function PageHeader({
  title,
  description,
  actions,
}: {
  eyebrow?: string; // deprecated, ignored
  title: string;
  description?: string;
  actions?: ReactNode;
  showSearch?: boolean; // deprecated, ignored
}) {
  return (
    <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0">
        <h1 className="font-display text-[24px] leading-tight tracking-tight font-bold text-foreground md:text-display">{title}</h1>
        {description && (
          <p className="mt-2 max-w-2xl text-body text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function SectionTitle({
  children,
  aside,
  className,
}: {
  children: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-4 flex items-center justify-between", className)}>
      <h2 className="font-display text-title text-foreground">{children}</h2>
      {aside}
    </div>
  );
}

export function Section({
  title,
  aside,
  children,
  className,
}: {
  title?: string;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mb-8", className)}>
      {(title || aside) && <SectionTitle aside={aside}>{title}</SectionTitle>}
      {children}
    </section>
  );
}

/* --------- Text primitives ---------- */

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("text-eyebrow", className)}>{children}</div>
  );
}

export function Muted({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("text-caption text-muted-foreground", className)}>{children}</span>;
}

export function Mono({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("font-mono text-mono text-muted-foreground", className)}>{children}</span>
  );
}

/* --------- Status / chip primitives ---------- */

export type StatusTone =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "muted"
  | "gold"
  | "info"
  | "violet-strong"
  | "violet"
  | "violet-muted";

export function StatusBadge({
  tone = "muted",
  children,
  dot = false,
  className,
}: {
  tone?: StatusTone;
  children: ReactNode;
  dot?: boolean;
  className?: string;
}) {
  // Unified 5-tone palette. `info` is an alias of `primary` and `gold` is
  // reserved for domain identity (logistics basis, trader supplier) only.
  // Every tone follows the same formula: bg-*-soft / text-* / ring-*/20.
  const map: Record<StatusTone, string> = {
    primary: "bg-primary-soft text-primary ring-primary/20",
    info:    "bg-primary-soft text-primary ring-primary/20",
    success: "bg-success-soft text-success ring-success/20",
    warning: "bg-warning-soft text-warning-foreground ring-warning/25",
    danger:  "bg-destructive-soft text-destructive ring-destructive/20",
    muted:   "bg-muted text-muted-foreground ring-border",
    gold:    "bg-gold-soft text-gold-foreground ring-gold/30",
    "violet-strong": "bg-violet-soft text-violet-strong ring-violet/20",
    violet:          "bg-violet-soft text-violet ring-violet/20",
    "violet-muted":  "bg-violet-soft text-violet-muted ring-violet/20",
  };
  const dotMap: Record<StatusTone, string> = {
    primary: "bg-primary",
    info:    "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    danger:  "bg-destructive",
    muted:   "bg-muted-foreground",
    gold:    "bg-gold",
    "violet-strong": "bg-violet-strong",
    violet:          "bg-violet",
    "violet-muted":  "bg-violet-muted",
  };

  return (
    <span className={cn("badge-soft ring-1 ring-inset", map[tone], className)}>
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", dotMap[tone])} />}
      {children}
    </span>
  );
}

/* ============================================================
 * Semantic badge system — the ONLY sanctioned mapping between
 * domain concepts and visual tone/label. Pages MUST use these
 * instead of choosing tone= manually.
 * ============================================================ */

// --- Risk ---
export type RiskLevel = "low" | "medium" | "high" | "unknown";
const RISK_MAP: Record<RiskLevel, { tone: StatusTone; label: string }> = {
  low:     { tone: "success", label: "Low risk" },
  medium:  { tone: "warning", label: "Medium risk" },
  high:    { tone: "danger",  label: "High risk" },
  unknown: { tone: "muted",   label: "Risk unknown" },
};
export function normalizeRisk(v: string | RiskLevel | undefined): RiskLevel {
  const s = (v ?? "").toString().toLowerCase();
  if (s.startsWith("low")) return "low";
  if (s.startsWith("med")) return "medium";
  if (s.startsWith("high")) return "high";
  return "unknown";
}
export function RiskBadge({ level, compact = false }: { level: string | RiskLevel; compact?: boolean }) {
  const key = normalizeRisk(level);
  const { tone, label } = RISK_MAP[key];
  return <StatusBadge tone={tone} dot>{compact ? label.replace(" risk", "") : label}</StatusBadge>;
}

// --- Priority ---
export type PriorityLevel = "low" | "normal" | "high" | "urgent";
const PRIORITY_MAP: Record<PriorityLevel, { tone: StatusTone; label: string }> = {
  low:    { tone: "muted",   label: "Low priority" },
  normal: { tone: "info",    label: "Normal" },
  high:   { tone: "warning", label: "High priority" },
  urgent: { tone: "danger",  label: "Urgent" },
};
export function PriorityBadge({ level }: { level: PriorityLevel }) {
  const { tone, label } = PRIORITY_MAP[level];
  return <StatusBadge tone={tone} dot>{label}</StatusBadge>;
}

// --- Confidence (0-100) — High=green, Good=orange, Fair=red. No "Low" tier. ---
export function confidenceTone(value: number): { tone: StatusTone; label: string } {
  if (value >= 90) return { tone: "success", label: "High" };
  if (value >= 75) return { tone: "warning", label: "Good" };
  return { tone: "danger", label: "Fair" };
}
export function ConfidenceBadge({ value, showLabel = false }: { value: number; showLabel?: boolean }) {
  const { tone, label } = confidenceTone(value);
  return (
    <StatusBadge tone={tone}>
      {showLabel ? `${label} · ${value}%` : `${value}%`}
    </StatusBadge>
  );
}

// --- Workflow state (unified vocabulary across pages) ---
export type WorkflowState =
  | "draft"
  | "pending"       // awaiting approval / awaiting review
  | "sent"          // in flight
  | "in_progress"   // active work, on the water, in production
  | "replied"       // response received
  | "ready"         // ready to advance
  | "approved"
  | "connected"
  | "delivered"
  | "active"
  | "auto"          // AI auto-handled
  | "human"         // needs human touch (non-critical)
  | "needs_info"
  | "needs_edit"
  | "needs_followup"
  | "hidden"        // hidden from buyer
  | "visible"       // visible to buyer
  | "blocked"
  | "rejected";

const WORKFLOW_MAP: Record<WorkflowState, { tone: StatusTone; label: string; dot: boolean }> = {
  draft:          { tone: "muted",   label: "Draft",             dot: true  },
  pending:        { tone: "warning", label: "Awaiting approval", dot: true  },
  sent:           { tone: "primary", label: "Sent",              dot: true  },
  in_progress:    { tone: "primary", label: "In progress",       dot: true  },
  replied:        { tone: "success", label: "Replied",           dot: true  },
  ready:          { tone: "success", label: "Ready",             dot: true  },
  approved:       { tone: "success", label: "Approved",          dot: true  },
  connected:      { tone: "success", label: "Connected",         dot: true  },
  delivered:      { tone: "success", label: "Delivered",         dot: true  },
  active:         { tone: "success", label: "Active",            dot: true  },
  auto:           { tone: "success", label: "Auto",              dot: false },
  human:          { tone: "warning", label: "Human",             dot: false },
  needs_info:     { tone: "warning", label: "Needs info",        dot: true  },
  needs_edit:     { tone: "warning", label: "Needs edit",        dot: true  },
  needs_followup: { tone: "warning", label: "Needs follow-up",   dot: true  },
  hidden:         { tone: "danger",  label: "Hidden from buyer", dot: false },
  visible:        { tone: "success", label: "Visible to buyer",  dot: false },
  blocked:        { tone: "danger",  label: "Blocked",           dot: true  },
  rejected:       { tone: "danger",  label: "Rejected",          dot: true  },
};
export function WorkflowBadge({
  state,
  label,
  dot,
}: {
  state: WorkflowState;
  label?: string;      // override display text but keep semantic tone
  dot?: boolean;
}) {
  const cfg = WORKFLOW_MAP[state];
  return (
    <StatusBadge tone={cfg.tone} dot={dot ?? cfg.dot}>
      {label ?? cfg.label}
    </StatusBadge>
  );
}

// --- Domain identity tags ---
export function SupplierTypeBadge({ type }: { type: "Factory" | "Trader" | string }) {
  // Factory = primary (verified manufacturer), Trader = gold (intermediary — needs care)
  const tone: StatusTone = type === "Factory" ? "primary" : type === "Trader" ? "gold" : "muted";
  return <StatusBadge tone={tone}>{type}</StatusBadge>;
}

export function DeliveryBasisBadge({ children }: { children: ReactNode }) {
  // Delivery basis (EXW/FOB/CIF/DAP/DDP + location) — always gold to signal logistics dimension.
  return <StatusBadge tone="gold">{children}</StatusBadge>;
}

export function RefBadge({ children }: { children: ReactNode }) {
  // Project/RFQ reference id — neutral info accent, never colored as status.
  return <StatusBadge tone="info">{children}</StatusBadge>;
}

export function MissingFieldBadge({ field }: { field: string }) {
  return <StatusBadge tone="warning">Missing: {field}</StatusBadge>;
}

export function Chip({
  active = false,
  onClick,
  children,
  className,
}: {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[12px] font-medium leading-4 tracking-normal normal-case transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-surface text-foreground hover:border-border-strong hover:bg-surface-muted",
        className,
      )}
    >

      {children}
    </button>
  );
}

/* --------- KPI ---------- */

export function KpiTile({
  label,
  value,
  delta,
  hint,
}: {
  label: string;
  value: string | number;
  delta?: string;
  hint?: string;
  // legacy props — kept for API compatibility
  icon?: ReactNode;
  tone?: "primary" | "warning" | "success" | "muted";
}) {
  return (
    <div className="kpi-tile flex h-full min-h-[96px] flex-col justify-between md:min-h-[128px]">
      <div className="text-eyebrow line-clamp-2">{label}</div>
      <div className="mt-2 flex flex-col gap-1 md:mt-3">
        <div className="font-display text-[22px] font-semibold leading-none tracking-tight text-foreground md:text-display">
          {value}
        </div>
        {(hint || delta) && (
          <div className="flex items-center gap-2 text-caption">
            {delta && <span className="font-medium text-success">{delta}</span>}
            {hint && <span className="text-muted-foreground">{hint}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

/* --------- Card ---------- */

export function Card({
  children,
  className,
  padded = true,
  elevated = false,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
  elevated?: boolean;
}) {
  return (
    <div
      className={cn(
        elevated ? "card-elevated" : "card-surface",
        padded && "p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
