import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

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
        <h1 className="font-display text-display text-foreground">{title}</h1>
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
  | "info";

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
  const map: Record<StatusTone, string> = {
    primary: "bg-primary-soft text-primary ring-primary/15",
    success: "bg-success-soft text-success ring-success/20",
    warning: "bg-warning-soft text-warning-foreground ring-warning/30",
    danger: "bg-destructive-soft text-destructive ring-destructive/20",
    muted: "bg-muted text-muted-foreground ring-border",
    gold: "bg-gold-soft text-gold-foreground ring-gold/40",
    info: "bg-accent text-accent-foreground ring-primary/15",
  };
  const dotMap: Record<StatusTone, string> = {
    primary: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-destructive",
    muted: "bg-muted-foreground",
    gold: "bg-gold",
    info: "bg-primary",
  };
  return (
    <span className={cn("badge-soft ring-1 ring-inset", map[tone], className)}>
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", dotMap[tone])} />}
      {children}
    </span>
  );
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
        "inline-flex items-center rounded-full border px-3 py-1.5 text-caption font-medium transition-colors",
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
    <div className="kpi-tile">
      <div className="text-eyebrow">{label}</div>
      <div className="mt-3 font-display text-[30px] font-semibold leading-none tracking-tight text-foreground">
        {value}
      </div>
      {(delta || hint) && (
        <div className="mt-3 flex items-center gap-2 text-caption text-muted-foreground">
          {delta && <span className="font-medium text-success">{delta}</span>}
          {hint && <span>{hint}</span>}
        </div>
      )}
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
