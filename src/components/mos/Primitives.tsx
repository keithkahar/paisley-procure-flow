import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && <div className="section-title mb-1.5">{eyebrow}</div>}
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-[26px]">{title}</h2>
        {description && <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>}
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
  icon,
  tone = "primary",
}: {
  label: string;
  value: string | number;
  delta?: string;
  hint?: string;
  icon?: ReactNode;
  tone?: "primary" | "warning" | "success" | "muted";
}) {
  const toneWrap: Record<string, string> = {
    primary: "card-tinted p-5 relative overflow-hidden transition-all hover:shadow-md",
    warning: "kpi-tile",
    success: "kpi-tile",
    muted: "kpi-tile",
  };
  const toneBar: Record<string, string> = {
    primary: "from-primary/0 to-primary",
    warning: "from-warning/60 to-warning",
    success: "from-success/60 to-success",
    muted: "from-border to-border-strong",
  };
  const iconWrap: Record<string, string> = {
    primary: "bg-white text-primary ring-1 ring-primary/15",
    warning: "bg-warning-soft text-warning-foreground",
    success: "bg-success-soft text-success",
    muted: "bg-muted text-muted-foreground",
  };
  return (
    <div className={cn(toneWrap[tone], "group")}>
      {tone !== "primary" && (
        <div className={cn("absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r", toneBar[tone])} />
      )}
      <div className="flex items-start justify-between">
        <div>
          <div className="section-title">{label}</div>
          <div className="mt-2 font-display text-3xl font-bold leading-none tracking-tight text-foreground">
            {value}
          </div>
          {(delta || hint) && (
            <div className="mt-2 flex items-center gap-2 text-[11.5px] text-muted-foreground">
              {delta && <span className="font-medium text-success">{delta}</span>}
              {hint && <span>{hint}</span>}
            </div>
          )}
        </div>
        {icon && (
          <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", iconWrap[tone])}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("card-surface p-5", className)}>{children}</div>;
}
