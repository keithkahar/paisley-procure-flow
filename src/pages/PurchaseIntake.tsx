import { PageHeader, Card, WorkflowBadge, MissingFieldBadge, type WorkflowState } from "@/components/mos/Primitives";
import { Button } from "@/components/ui/button";
import { AlertCircle, Inbox, Upload, ArrowRight, CheckCircle2, Clock, Info } from "lucide-react";

const lists: Array<{
  id: string;
  buyer: string;
  country: string;
  items: number;
  missing: string[];
  state: WorkflowState;
}> = [
  { id: "PH-004", buyer: "Nordic Marine AB",    country: "Sweden",  items: 18, missing: ["Delivery basis", "Target currency"], state: "needs_info" },
  { id: "PH-005", buyer: "Baltic Trawlers OY",  country: "Finland", items: 6,  missing: [],                                    state: "ready" },
  { id: "PH-006", buyer: "Adriatico Naval SRL", country: "Italy",   items: 12, missing: ["Contact person", "Delivery location"], state: "needs_info" },
  { id: "PH-007", buyer: "Coastline Yachts Ltd", country: "UK",     items: 9,  missing: ["Buyer company registration"],        state: "blocked" },
];

const kpis = [
  { label: "Open intakes",         value: "11", icon: Inbox,        tone: "text-primary" },
  { label: "Missing information",  value: "7",  icon: AlertCircle,  tone: "text-warning" },
  { label: "Ready to discover",    value: "3",  icon: CheckCircle2, tone: "text-success" },
  { label: "Avg completion",       value: "2h", icon: Clock,        tone: "text-muted-foreground", hint: "From email arrival" },
];

const requiredFields = [
  "Buyer company (legal name)",
  "Contact person & email",
  "Country / port of delivery",
  "Delivery basis (EXW / FOB / CIF / DAP / DDP)",
  "Delivery location or warehouse",
  "Target currency",
  "Item list with specs & quantities",
];

export default function PurchaseIntake() {
  return (
    <>
      <PageHeader
        title="Purchase Intake"
        description="Ingest buyer purchase lists, capture missing information, and hand off to supplier discovery."
        actions={
          <>
            <Button variant="outline" size="sm"><Upload className="mr-1.5 h-4 w-4" /> Import CSV</Button>
            <Button size="sm"><Inbox className="mr-1.5 h-4 w-4" /> New intake</Button>
          </>
        }
      />

      {/* Compact horizontal KPI strip */}
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="card-surface flex items-center gap-3 px-4 py-3">
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted ${k.tone}`}>
              <k.icon className="h-4 w-4" strokeWidth={2.25} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-caption text-muted-foreground">{k.label}</div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-[20px] font-semibold leading-none tracking-tight text-foreground tabular-nums">
                  {k.value}
                </span>
                {k.hint && <span className="truncate text-[11px] text-muted-foreground">{k.hint}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Helper strip — replaces the oversized right sidebar */}
      <div className="mb-5 flex flex-col gap-2 rounded-xl border border-primary/15 bg-primary-soft/50 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-2.5 md:items-center">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary md:mt-0" />
          <p className="text-caption text-foreground/85">
            Paisley AI auto-detects <strong className="font-semibold">5 of 7</strong> required fields from buyer emails and PDFs.
          </p>
        </div>
        <details className="group text-caption">
          <summary className="cursor-pointer list-none rounded-md px-2 py-1 font-medium text-primary hover:bg-primary/10">
            View required fields
            <span className="ml-1 inline-block transition-transform group-open:rotate-180">▾</span>
          </summary>
          <ul className="mt-2 grid grid-cols-1 gap-x-6 gap-y-1 rounded-lg bg-surface p-3 text-foreground/85 sm:grid-cols-2 md:absolute md:right-4 md:mt-1 md:w-[420px] md:shadow-lg md:ring-1 md:ring-border">
            {requiredFields.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </details>
      </div>

      {/* Single-column list — full width, unified card rhythm */}
      <div className="space-y-3">
        {lists.map((l) => (
          <article key={l.id} className="card-surface p-4 md:p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Left: identity */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-mono text-muted-foreground">{l.id}</span>
                  <WorkflowBadge state={l.state} />
                </div>
                <h4 className="mt-1.5 font-display text-subtitle font-semibold text-foreground">{l.buyer}</h4>
                <div className="mt-1 text-caption text-muted-foreground">
                  {l.country} <span className="divider-dot" /> {l.items} items
                </div>
              </div>

              {/* Middle: missing fields inline (only when present) */}
              {l.missing.length > 0 && (
                <div className="min-w-0 md:max-w-[360px] md:flex-1">
                  <div className="text-label uppercase text-muted-foreground/80">Missing</div>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {l.missing.map((m) => (
                      <MissingFieldBadge key={m} field={m} />
                    ))}
                  </div>
                </div>
              )}

              {/* Right: actions */}
              <div className="flex flex-wrap items-center gap-2 md:shrink-0">
                {l.missing.length > 0 && (
                  <Button size="sm" variant="outline">Request missing info</Button>
                )}
                <Button size="sm" disabled={l.state !== "ready"}>
                  Start supplier discovery <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
