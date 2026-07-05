import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

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
    <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0">
        <h2 className="font-display text-[22px] font-semibold tracking-tight text-foreground md:text-[24px]">{title}</h2>
        {description && <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
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
    <section className={cn("mb-6", className)}>
      {(title || aside) && (
        <div className="mb-3 flex items-center justify-between">
          {title && <h3 className="font-display text-[15px] font-semibold text-foreground">{title}</h3>}
          {aside}
        </div>
      )}
      {children}
    </section>
  );
}

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
  // legacy props — ignored for visual consistency
  icon?: ReactNode;
  tone?: "primary" | "warning" | "success" | "muted";
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-border-strong">
      <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-3 font-display text-[30px] font-semibold leading-none tracking-tight text-foreground">
        {value}
      </div>
      {(delta || hint) && (
        <div className="mt-3 flex items-center gap-2 text-[11.5px] text-muted-foreground">
          {delta && <span className="font-medium text-success">{delta}</span>}
          {hint && <span>{hint}</span>}
        </div>
      )}
    </div>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("card-surface p-5", className)}>{children}</div>;
}
