import { PageHeader, Card, RefBadge, DeliveryBasisBadge, IconAction } from "@/components/mos/Primitives";
import { NAV } from "@/components/shell/Navigation";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Calculator, Plus, Send, MoreVertical, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type RoundState = "sent" | "replied" | "empty" | "overdue";

type Supplier = {
  id: string;
  name: string;
  rounds: RoundState[];
  daysSinceLast?: number; // for overdue tooltip
  latestQuote?: string;   // inline latest quote
  timestamps?: (string | null)[]; // per-dot tooltip time
};

const items: {
  rfq: string;
  item: string;
  basis: string;
  suppliers: Supplier[];
}[] = [
  {
    rfq: "RFQ-011",
    item: "M8 SS316 shackles",
    basis: "FOB Ningbo",
    suppliers: [
      {
        id: "SUP-CN-0081",
        name: "Ningbo Ocean Fittings",
        rounds: ["sent", "replied", "sent", "replied", "empty", "empty"],
        latestQuote: "$ 4.20 / pc",
        timestamps: ["Jun 24", "Jun 25", "Jun 28", "Jun 30", null, null],
      },
      {
        id: "SUP-CN-0082",
        name: "Xiamen Bluewave",
        rounds: ["sent", "replied", "sent", "overdue", "empty", "empty"],
        daysSinceLast: 3,
        latestQuote: "$ 4.45 / pc",
        timestamps: ["Jun 24", "Jun 25", "Jun 28", null, null, null],
      },
      {
        id: "SUP-CN-0083",
        name: "Guangzhou Harbor",
        rounds: ["sent", "overdue", "empty", "empty", "empty", "empty"],
        daysSinceLast: 5,
        latestQuote: "—",
        timestamps: ["Jun 24", null, null, null, null, null],
      },
    ],
  },
  {
    rfq: "RFQ-014",
    item: "LED navigation kits 12V IP67",
    basis: "CIF Gothenburg",
    suppliers: [
      {
        id: "SUP-CN-0085",
        name: "Shenzhen Boya",
        rounds: ["sent", "replied", "sent", "replied", "sent", "replied"],
        latestQuote: "$ 18.60 / kit",
        timestamps: ["Jun 20", "Jun 21", "Jun 24", "Jun 25", "Jun 28", "Jun 29"],
      },
      {
        id: "SUP-CN-0091",
        name: "Zhuhai Marine LED",
        rounds: ["sent", "replied", "sent", "overdue", "empty", "empty"],
        daysSinceLast: 2,
        latestQuote: "$ 19.20 / kit",
        timestamps: ["Jun 20", "Jun 21", "Jun 27", null, null, null],
      },
    ],
  },
];

const ROUND_LABELS = ["1st Email", "1st Reply", "2nd Email", "2nd Reply", "3rd Email", "3rd Reply"];

function RoundDot({ state, label, time, daysSinceLast }: { state: RoundState; label: string; time: string | null | undefined; daysSinceLast?: number }) {
  const cls =
    state === "sent"
      ? "bg-primary"
      : state === "replied"
      ? "bg-success"
      : state === "overdue"
      ? "bg-destructive ring-2 ring-destructive/25"
      : "bg-border-strong/70";
  const tooltip =
    state === "overdue"
      ? `${label} · ${daysSinceLast ?? "?"} days without reply`
      : state === "empty"
      ? `${label} · not yet`
      : `${label}${time ? ` · ${time}` : ""}`;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className={cn("inline-block h-2.5 w-2.5 rounded-full", cls)} aria-label={tooltip} />
      </TooltipTrigger>
      <TooltipContent side="top">{tooltip}</TooltipContent>
    </Tooltip>
  );
}

function Timeline({ supplier }: { supplier: Supplier }) {
  return (
    <div className="inline-flex items-center gap-1.5">
      {supplier.rounds.map((r, i) => (
        <RoundDot
          key={i}
          state={r}
          label={ROUND_LABELS[i]}
          time={supplier.timestamps?.[i]}
          daysSinceLast={supplier.daysSinceLast}
        />
      ))}
    </div>
  );
}

function progress(s: Supplier) {
  const sent = s.rounds.filter((r) => r === "sent" || r === "replied" || r === "overdue").length;
  const replied = s.rounds.filter((r) => r === "replied").length;
  const rounds = Math.ceil(sent / 2); // pairs (email, reply)
  const repliedRounds = Math.floor(replied);
  return { rounds: Math.max(rounds, 1), repliedRounds };
}

function ProcessStepper() {
  const steps = NAV.filter((n) => n.step !== null);
  const currentStep = 5;
  return (
    <div className="mb-6 hidden md:block">
      <ol className="flex items-center gap-1">
        {steps.map((s, i) => {
          const isDone = (s.step ?? 0) < currentStep;
          const isCurrent = s.step === currentStep;
          return (
            <li key={s.to} className="flex flex-1 items-center gap-1">
              <div
                className={cn(
                  "flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors",
                  isCurrent && "bg-primary text-primary-foreground",
                  isDone && "text-foreground",
                  !isCurrent && !isDone && "text-muted-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold",
                    isCurrent && "bg-primary-foreground/20 text-primary-foreground",
                    isDone && "bg-success text-success-foreground",
                    !isCurrent && !isDone && "bg-muted text-muted-foreground",
                  )}
                >
                  {isDone ? <Check className="h-3 w-3" strokeWidth={3} /> : s.step}
                </span>
                <span className="whitespace-nowrap">{s.full}</span>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-border-strong" />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function CostTile({ label, value, emphasis = false }: { label: string; value: string; emphasis?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-lg border p-3",
        emphasis ? "border-primary/25 bg-primary-soft" : "border-border bg-surface-muted",
      )}
    >
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div
        className={cn(
          "mt-1 font-display font-bold leading-tight",
          emphasis ? "text-[22px] text-primary" : "text-[20px] text-primary",
        )}
      >
        {value}
      </div>
    </div>
  );
}

function BasisSegmented() {
  const options = ["EXW", "FOB", "CIF", "DAP", "DDP", "Delivered", "Other"];
  const active = "FOB";
  return (
    <div className="inline-flex rounded-lg border border-border bg-surface-muted p-0.5">
      {options.map((o) => {
        const isActive = o === active;
        return (
          <button
            key={o}
            type="button"
            className={cn(
              "rounded-md px-2.5 py-1 text-[12px] font-medium transition-colors",
              isActive
                ? "bg-surface text-foreground shadow-sm ring-1 ring-border"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

export default function RFQ() {
  // KPI aggregates
  const allSuppliers = items.flatMap((i) => i.suppliers);
  const sentCount = allSuppliers.reduce(
    (n, s) => n + s.rounds.filter((r) => r !== "empty").length,
    0,
  );
  const repliedCount = allSuppliers.reduce(
    (n, s) => n + s.rounds.filter((r) => r === "replied").length,
    0,
  );
  const overdueCount = allSuppliers.reduce(
    (n, s) => n + s.rounds.filter((r) => r === "overdue").length,
    0,
  );

  return (
    <>
      <PageHeader
        title="RFQ Rounds"
        description="Step 5 of 8 · Send quotes, track replies across rounds"
        actions={
          <Button size="sm" className="h-9 leading-none">
            <Plus className="mr-1.5 h-4 w-4" /> New RFQ
          </Button>
        }
      />

      <ProcessStepper />

      {/* Toolbar: cost model summary + delivery basis segmented */}
      <Card className="mb-5" padded={false}>
        <div className="flex flex-col gap-4 border-b border-border p-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="h-4 w-4 text-primary" />
            <span className="text-[13px] font-semibold text-foreground">Cost model (per unit)</span>
            <span className="text-[12px] text-muted-foreground">· FOB Ningbo Beilun · backup Shanghai Yangshan</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-wide text-muted-foreground">Delivery basis</span>
            <BasisSegmented />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 p-4 md:grid-cols-4">
          <CostTile label="Supplier unit price" value="$ 4.20" />
          <CostTile label="China local cost" value="$ 0.35" />
          <CostTile label="Intl. freight" value="$ 0.62" />
          <CostTile label="Destination delivery" value="$ 0.28" />
          <CostTile label="Duty / Tax" value="$ 0.54" />
          <CostTile label="Buffer" value="$ 0.20" />
          <CostTile label="Profit rate" value="22%" />
          <CostTile label="Buyer landed price" value="$ 7.83" emphasis />
        </div>
      </Card>

      {/* This-round KPIs */}
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { label: "Emails sent", value: sentCount },
          { label: "Replies received", value: repliedCount },
          { label: "Avg quote", value: "$ 4.32" },
          { label: "Lowest quote", value: "$ 4.20" },
        ].map((k) => (
          <div key={k.label} className="rounded-lg border border-border bg-surface p-3">
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{k.label}</div>
            <div className="mt-1 font-display text-[22px] font-bold leading-tight text-foreground">{k.value}</div>
          </div>
        ))}
      </div>

      {overdueCount > 0 && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-destructive/25 bg-destructive-soft px-3 py-2 text-[12px] text-destructive">
          <span className="inline-block h-2 w-2 rounded-full bg-destructive" />
          {overdueCount} supplier{overdueCount > 1 ? "s" : ""} overdue on reply. Consider a follow-up.
        </div>
      )}

      <div className="space-y-4">
        {items.map((it) => {
          const totalSuppliers = it.suppliers.length;
          const repliedThisRound = it.suppliers.filter(
            (s) => progress(s).repliedRounds >= progress(s).rounds,
          ).length;
          return (
            <div key={it.rfq} className="card-surface overflow-hidden">
              {/* Header */}
              <div className="flex flex-col gap-3 border-b border-border p-4 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <RefBadge>{it.rfq}</RefBadge>
                    <DeliveryBasisBadge>{it.basis}</DeliveryBasisBadge>
                  </div>
                  <h4 className="mt-1.5 font-display text-subtitle font-semibold text-foreground">
                    {it.item}
                  </h4>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden min-w-[160px] flex-col gap-1 sm:flex">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>Round progress</span>
                      <span className="font-medium text-foreground">
                        {repliedThisRound}/{totalSuppliers} replied
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${(repliedThisRound / totalSuppliers) * 100}%` }}
                      />
                    </div>
                  </div>
                  <Button size="sm" className="h-9 leading-none">
                    <Send className="mr-1.5 h-4 w-4" /> Send next round
                  </Button>
                  <IconAction icon={MoreVertical} tone="ghost" label="More actions" />
                </div>
              </div>

              {/* Table for md+ */}
              <div className="hidden md:block">
                <table className="w-full text-body">
                  <thead className="bg-surface-muted">
                    <tr>
                      <th className="px-4 py-2 text-left text-label uppercase text-muted-foreground">
                        Supplier
                      </th>
                      <th className="px-4 py-2 text-left text-label uppercase text-muted-foreground">
                        Timeline
                      </th>
                      <th className="px-4 py-2 text-right text-label uppercase text-muted-foreground">
                        Latest quote
                      </th>
                      <th className="w-16 px-4 py-2 text-right text-label uppercase text-muted-foreground">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {it.suppliers.map((s) => (
                      <tr key={s.id} className="border-t border-border/70">
                        <td className="px-4 py-3">
                          <div className="font-medium text-foreground">{s.name}</div>
                          <div className="font-mono text-mono text-muted-foreground">{s.id}</div>
                        </td>
                        <td className="px-4 py-3">
                          <Timeline supplier={s} />
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-[13px] text-foreground">
                          {s.latestQuote}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="inline-flex">
                            <IconAction icon={ArrowRight} tone="outline" label="Open details" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex items-center justify-between border-t border-border bg-surface-muted px-4 py-2">
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-primary" /> Sent
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-success" /> Replied
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-destructive" /> Overdue
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-border-strong/70" /> Empty
                    </span>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8">
                    <Plus className="mr-1 h-3.5 w-3.5" /> Add supplier
                  </Button>
                </div>
              </div>

              {/* Mobile */}
              <div className="divide-y divide-border md:hidden">
                {it.suppliers.map((s) => (
                  <div key={s.id} className="p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-body font-medium text-foreground">{s.name}</div>
                        <div className="font-mono text-mono text-muted-foreground">{s.id}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Latest</div>
                        <div className="font-mono text-[13px] text-foreground">{s.latestQuote}</div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <Timeline supplier={s} />
                      <IconAction icon={ArrowRight} tone="outline" label="Open details" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
