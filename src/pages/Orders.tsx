import { PageHeader, KpiTile, WorkflowBadge, RefBadge, DeliveryBasisBadge, type WorkflowState } from "@/components/mos/Primitives";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const orders: Array<{
  id: string; project: string; buyer: string; suppliers: string[];
  basis: string; from?: string; to?: string; shipment: string;
  state: WorkflowState; stage: number;
}> = [
  { id: "ORD-0142", project: "PH-004", buyer: "Nordic Marine AB",     suppliers: ["Ningbo Ocean Fittings", "Shenzhen Boya"],  basis: "CIF Gothenburg", from: "Ningbo",   to: "Gothenburg", shipment: "On the water",  state: "in_progress", stage: 5 },
  { id: "ORD-0143", project: "PH-003", buyer: "Baltic Trawlers OY",   suppliers: ["Qingdao Steel Rig"],                       basis: "FOB Qingdao",    from: "Qingdao",                    shipment: "In production", state: "in_progress", stage: 3 },
  { id: "ORD-0144", project: "PH-002", buyer: "Adriatico Naval SRL",  suppliers: ["Guangzhou Harbor", "Zhuhai Marine LED"],   basis: "DDP Trieste",    from: "Shanghai", to: "Trieste",   shipment: "Delivered",     state: "delivered",   stage: 8 },
];

const milestones = [
  "Buyer PO",
  "Confirmed",
  "Payment",
  "Production",
  "Inspection",
  "Shipment",
  "Delivery",
  "Closeout",
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
        {orders.map((o) => (
          <article key={o.id} className="card-surface overflow-hidden">
            <div className="flex flex-col gap-3 border-b border-border p-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-mono font-semibold text-foreground">{o.id}</span>
                  <RefBadge>{o.project}</RefBadge>
                  <DeliveryBasisBadge>{o.basis}</DeliveryBasisBadge>
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

            <div className="p-4">
              <ol className="flex items-start gap-0">
                {milestones.map((label, i) => {
                  const done = i < o.stage;
                  const isCurrent = i === o.stage;
                  return (
                    <li key={label} className={cn("flex flex-col items-center", i < milestones.length - 1 && "flex-1")}>
                      <div className="flex w-full items-center">
                        <div className={cn("h-px flex-1", i === 0 ? "opacity-0" : done ? "bg-primary/60" : "bg-border")} />
                        <span
                          className={cn(
                            "h-2 w-2 shrink-0 rounded-full",
                            done ? "bg-primary" : isCurrent ? "bg-primary ring-2 ring-primary/25" : "bg-border-strong",
                          )}
                        />
                        <div className={cn("h-px flex-1", i === milestones.length - 1 ? "opacity-0" : i < o.stage - 1 ? "bg-primary/60" : "bg-border")} />
                      </div>
                      <span
                        className={cn(
                          "mt-2 text-[11px] leading-tight tracking-tight",
                          done || isCurrent ? "font-medium text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {label}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
