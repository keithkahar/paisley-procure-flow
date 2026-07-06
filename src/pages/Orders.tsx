import { PageHeader, KpiTile, Card, WorkflowBadge, RefBadge, DeliveryBasisBadge, type WorkflowState } from "@/components/mos/Primitives";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const orders: Array<{
  id: string; project: string; buyer: string; suppliers: string[];
  basis: string; port: string; shipment: string; state: WorkflowState; stage: number;
}> = [
  { id: "ORD-0142", project: "PH-004", buyer: "Nordic Marine AB",     suppliers: ["Ningbo Ocean Fittings", "Shenzhen Boya"],  basis: "CIF Gothenburg", port: "Ningbo → Gothenburg",  shipment: "On the water",  state: "in_progress", stage: 5 },
  { id: "ORD-0143", project: "PH-003", buyer: "Baltic Trawlers OY",   suppliers: ["Qingdao Steel Rig"],                       basis: "FOB Qingdao",    port: "Qingdao",              shipment: "In production", state: "in_progress", stage: 3 },
  { id: "ORD-0144", project: "PH-002", buyer: "Adriatico Naval SRL",  suppliers: ["Guangzhou Harbor", "Zhuhai Marine LED"],   basis: "DDP Trieste",    port: "Shanghai → Trieste",   shipment: "Delivered",     state: "delivered",   stage: 8 },
];

const milestones = [
  "Buyer PO / Final confirmation",
  "Supplier order confirmation",
  "Payment arrangement",
  "Production / Preparation",
  "Inspection / Document check",
  "Shipment",
  "Delivery",
  "Order closeout",
];

export default function Orders() {
  return (
    <>
      <PageHeader
        title="Orders"
        description="Step 8 of 8"
        actions={<Button size="sm">New order</Button>}
      />

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiTile label="Active orders" value={14} tone="primary" />
        <KpiTile label="In production" value={5} tone="warning" />
        <KpiTile label="On the water" value={4} tone="primary" />
        <KpiTile label="Delivered (30d)" value={9} tone="success" />
      </div>

      <div className="space-y-4">
        {orders.map((o) => (
          <article key={o.id} className="card-surface overflow-hidden">
            <div className="flex flex-col gap-3 border-b border-border p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-mono font-semibold text-foreground">{o.id}</span>
                  <RefBadge>{o.project}</RefBadge>
                  <DeliveryBasisBadge>{o.basis}</DeliveryBasisBadge>
                  <WorkflowBadge state={o.state} label={o.shipment} />
                </div>
                <h4 className="mt-1.5 font-display text-subtitle font-semibold">{o.buyer}</h4>
                <div className="mt-0.5 text-caption text-muted-foreground">
                  Suppliers: {o.suppliers.join(", ")} <span className="divider-dot" /> {o.port}
                </div>
              </div>
              <div className="flex items-center gap-2 md:shrink-0">
                <Button size="sm" variant="outline">Documents</Button>
                <Button size="sm">Open order</Button>
              </div>
            </div>

            <div className="p-4">
              <div className="scroll-thin overflow-x-auto">
                <ol className="flex min-w-[720px] items-start gap-0">
                  {milestones.map((m, i) => {
                    const done = i < o.stage;
                    const current = i === o.stage;
                    return (
                      <li key={m} className="relative flex-1">
                        <div className="flex items-center">
                          <span
                            className={
                              "z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors " +
                              (done
                                ? "bg-primary text-primary-foreground"
                                : current
                                  ? "bg-surface text-primary ring-2 ring-inset ring-primary"
                                  : "bg-surface text-muted-foreground ring-1 ring-inset ring-border")
                            }
                          >
                            {done ? (
                              <Check className="h-3 w-3" strokeWidth={3} />
                            ) : (
                              <span className={"h-1.5 w-1.5 rounded-full " + (current ? "bg-primary" : "bg-border-strong")} />
                            )}
                          </span>
                          {i < milestones.length - 1 && (
                            <div className={"h-px flex-1 " + (i < o.stage - 1 ? "bg-primary/60" : "bg-border")} />
                          )}
                        </div>
                        <div className="mt-2 max-w-[110px] text-caption leading-tight text-muted-foreground">
                          <div className={current ? "font-medium text-foreground" : done ? "text-foreground/70" : ""}>{m}</div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
