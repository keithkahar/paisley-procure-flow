import { PageHeader, KpiTile, WorkflowBadge, RefBadge, DeliveryBasisBadge, StatusBadge, type WorkflowState } from "@/components/mos/Primitives";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Check, Plus, ArrowRight, AlertTriangle, Clock, MinusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type MilestoneFlag = "delayed" | "stuck" | "skipped";

const orders: Array<{
  id: string; project: string; buyer: string; suppliers: string[];
  basis: string; from?: string; to?: string; shipment: string;
  state: WorkflowState; stage: number;
  flags?: Record<number, MilestoneFlag>;
  abnormal?: { tone: "warning" | "danger"; label: string };
}> = [
  { id: "ORD-0142", project: "PH-004", buyer: "Nordic Marine AB",     suppliers: ["Ningbo Ocean Fittings", "Shenzhen Boya"],  basis: "CIF Gothenburg", from: "Ningbo",   to: "Gothenburg", shipment: "On the water",  state: "in_progress", stage: 5 },
  { id: "ORD-0143", project: "PH-003", buyer: "Baltic Trawlers OY",   suppliers: ["Qingdao Steel Rig"],                       basis: "FOB Qingdao",    from: "Qingdao",                    shipment: "In production", state: "in_progress", stage: 3, flags: { 2: "delayed" }, abnormal: { tone: "warning", label: "Payment delayed" } },
  { id: "ORD-0144", project: "PH-002", buyer: "Adriatico Naval SRL",  suppliers: ["Guangzhou Harbor", "Zhuhai Marine LED"],   basis: "DDP Trieste",    from: "Shanghai", to: "Trieste",   shipment: "Delivered",     state: "delivered",   stage: 8 },
];

const milestones = [
  { short: "Buyer PO",   full: "Buyer PO / Final confirmation" },
  { short: "Confirmed",  full: "Supplier order confirmation" },
  { short: "Payment",    full: "Payment arrangement" },
  { short: "Production", full: "Production / Preparation" },
  { short: "Inspection", full: "Inspection / Document check" },
  { short: "Shipment",   full: "Shipment" },
  { short: "Delivery",   full: "Delivery" },
  { short: "Closeout",   full: "Order closeout" },
];

function SupplierChip({ name }: { name: string }) {
  return (
    <span className="badge-soft ring-1 ring-inset bg-surface text-foreground ring-border">
      {name}
    </span>
  );
}

export default function Orders() {
  return (
    <>
      <PageHeader
        title="Orders"
        description="Step 8 of 8"
        actions={<Button size="sm" className="h-9 leading-none box-border border border-transparent"><Plus className="mr-1.5 h-4 w-4" /> New order</Button>}
      />

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiTile label="Active orders"    value={14} hint="in flight" />
        <KpiTile label="In production"    value={5}  hint="factory floor" />
        <KpiTile label="On the water"     value={4}  hint="in transit" />
        <KpiTile label="Delivered (30d)"  value={9}  delta="+2" hint=" vs prev" />
      </div>

      <div className="space-y-4">
        {orders.map((o) => {
          const current = milestones[Math.min(o.stage, milestones.length - 1)];
          return (
          <article key={o.id} className="card-surface overflow-hidden">
            <div className="flex flex-col gap-3 border-b border-border p-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-mono font-semibold text-foreground">{o.id}</span>
                  <RefBadge>{o.project}</RefBadge>
                  <DeliveryBasisBadge>{o.basis}</DeliveryBasisBadge>
                  {o.abnormal && (
                    <StatusBadge tone={o.abnormal.tone} dot>{o.abnormal.label}</StatusBadge>
                  )}
                  {o.state === "delivered" && <WorkflowBadge state="delivered" />}
                </div>
                <h4 className="mt-1.5 font-display text-subtitle font-semibold">{o.buyer}</h4>
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-caption text-muted-foreground">
                  {o.suppliers.map((s) => <SupplierChip key={s} name={s} />)}
                  <span className="divider-dot" />
                  <span className="inline-flex items-center gap-1 text-foreground/70">
                    {o.from}
                    {o.to && (<><ArrowRight className="h-3 w-3 text-muted-foreground" /> {o.to}</>)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 md:shrink-0">
                <Button size="sm" variant="ghost">Documents</Button>
                <Button size="sm">Open order</Button>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4">
              <ol className="flex flex-1 items-center gap-0">
                {milestones.map((m, i) => {
                  const flag = o.flags?.[i];
                  const done = i < o.stage && !flag;
                  const isCurrent = i === o.stage;

                  let dotClass = "bg-surface text-muted-foreground ring-1 ring-inset ring-border";
                  let inner: React.ReactNode = <span className="h-1.5 w-1.5 rounded-full bg-border-strong" />;
                  let tipSuffix = "";

                  if (flag === "stuck") {
                    dotClass = "bg-destructive-soft text-destructive ring-1 ring-inset ring-destructive/30";
                    inner = <AlertTriangle className="h-3 w-3" strokeWidth={2.5} />;
                    tipSuffix = " · stuck";
                  } else if (flag === "delayed") {
                    dotClass = "bg-warning-soft text-warning-foreground ring-1 ring-inset ring-warning/30";
                    inner = <Clock className="h-3 w-3" strokeWidth={2.5} />;
                    tipSuffix = " · delayed";
                  } else if (flag === "skipped") {
                    dotClass = "bg-muted text-muted-foreground ring-1 ring-inset ring-border";
                    inner = <MinusCircle className="h-3 w-3" strokeWidth={2.25} />;
                    tipSuffix = " · skipped";
                  } else if (done) {
                    dotClass = "bg-primary text-primary-foreground";
                    inner = <Check className="h-3 w-3" strokeWidth={3} />;
                  } else if (isCurrent) {
                    dotClass = "bg-surface text-primary ring-2 ring-inset ring-primary";
                    inner = <span className="h-1.5 w-1.5 rounded-full bg-primary" />;
                  }

                  return (
                    <li key={m.short} className={cn("flex items-center", i < milestones.length - 1 && "flex-1")}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            aria-label={m.full + tipSuffix}
                            className={cn(
                              "z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                              dotClass,
                            )}
                          >
                            {inner}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top">{m.full}{tipSuffix}</TooltipContent>
                      </Tooltip>
                      {i < milestones.length - 1 && (
                        <div className={cn("h-px flex-1", i < o.stage - 1 ? "bg-primary/60" : "bg-border")} />
                      )}
                    </li>
                  );
                })}
              </ol>
              <div className="shrink-0 text-right">
                <div className="text-caption text-muted-foreground">Current step</div>
                <div className="text-caption font-medium text-foreground">{current.short} <span className="text-muted-foreground">· {o.stage}/{milestones.length}</span></div>
              </div>
            </div>
          </article>
          );
        })}
      </div>
    </>
  );
}
