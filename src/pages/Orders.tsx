import { Fragment } from "react";
import { PageHeader, KpiTile, WorkflowBadge, RefBadge, DeliveryBasisBadge, IdText, type WorkflowState } from "@/components/mos/Primitives";
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
        description="8/8"
        actions={<Button size="sm" className="h-9 leading-none box-border border border-transparent"><Plus className="mr-1.5 h-4 w-4" /> New order</Button>}
      />

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <KpiTile label="Active orders"    value={14} hint="in flight" />
        <KpiTile label="In production"    value={5}  hint="factory floor" />
        <KpiTile label="On the water"     value={4}  hint="in transit" />
        <KpiTile label="Delivered (30d)"  value={9}  delta="+2" hint=" vs prev" />
      </div>

      <div className="space-y-4">
        {orders.map((o) => (
          <article key={o.id} className="card-surface overflow-hidden">
            <div className="flex flex-col gap-3 p-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <IdText>{o.id}</IdText>
                  <RefBadge>{o.project}</RefBadge>
                  <DeliveryBasisBadge>{o.basis}</DeliveryBasisBadge>
                  {o.state === "delivered" && <WorkflowBadge state="delivered" />}
                  <span className="flex flex-wrap items-center gap-1.5 text-caption text-muted-foreground">
                    {o.suppliers.map((s) => <SupplierChip key={s} name={s} />)}
                  </span>
                </div>
                <h4 className="mt-1.5 font-display text-subtitle font-semibold">{o.buyer}</h4>
                <div className="mt-1.5 inline-flex items-center gap-1 text-caption text-foreground/70">
                  {o.from}
                  {o.to && (<><ArrowRight className="h-3 w-3 text-muted-foreground" /> {o.to}</>)}
                </div>
              </div>
              <div className="flex items-center gap-2 md:shrink-0">
                <Button size="sm" variant="outline">Documents</Button>
                <Button size="sm">Open order</Button>
              </div>
            </div>

            <div className="px-4 pb-5">
              {/* dots + connecting lines: first dot at left edge, last dot at right edge */}
              <div className="flex items-center">
                {milestones.map((label, i) => {
                  const done = i < o.stage;
                  const isCurrent = i === o.stage;
                  return (
                    <Fragment key={label}>
                      {i > 0 && (
                        <div className={cn("h-px flex-1", i <= o.stage ? "bg-primary/60" : "bg-border")} />
                      )}
                      <span
                        className={cn(
                          "h-2.5 w-2.5 shrink-0 rounded-full",
                          isCurrent
                            ? "border-2 border-primary bg-surface"
                            : done
                            ? "bg-primary"
                            : "bg-border-strong",
                        )}
                      />
                    </Fragment>
                  );
                })}
              </div>
              {/* labels aligned to their dots */}
              <div className="relative mt-2 h-4">
                {milestones.map((label, i) => {
                  const done = i < o.stage;
                  const isCurrent = i === o.stage;
                  const pct = (i / (milestones.length - 1)) * 100;
                  const transform =
                    i === 0 ? "none" : i === milestones.length - 1 ? "translateX(-100%)" : "translateX(-50%)";
                  return (
                    <span
                      key={label}
                      style={{ left: `${pct}%`, transform }}
                      className={cn(
                        "absolute top-0 whitespace-nowrap text-[11px] leading-tight tracking-tight",
                        done || isCurrent ? "font-medium text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {label}
                    </span>
                  );
                })}
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
