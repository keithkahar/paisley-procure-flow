import { PageHeader, StatusBadge, KpiTile, Card } from "@/components/mos/Primitives";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle } from "lucide-react";

const orders = [
  {
    id: "ORD-0142",
    project: "PH-004",
    buyer: "Nordic Marine AB",
    suppliers: ["Ningbo Ocean Fittings", "Shenzhen Boya"],
    basis: "CIF Gothenburg",
    port: "Ningbo → Gothenburg",
    shipment: "On the water",
    tone: "primary" as const,
    stage: 5,
  },
  {
    id: "ORD-0143",
    project: "PH-003",
    buyer: "Baltic Trawlers OY",
    suppliers: ["Qingdao Steel Rig"],
    basis: "FOB Qingdao",
    port: "Qingdao",
    shipment: "In production",
    tone: "gold" as const,
    stage: 3,
  },
  {
    id: "ORD-0144",
    project: "PH-002",
    buyer: "Adriatico Naval SRL",
    suppliers: ["Guangzhou Harbor", "Zhuhai Marine LED"],
    basis: "DDP Trieste",
    port: "Shanghai → Trieste",
    shipment: "Delivered",
    tone: "success" as const,
    stage: 8,
  },
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
        eyebrow="Step 8 of 8"
        title="Orders"
        description="Accepted quotations converted into orders. Milestones adapt to the chosen delivery basis."
        actions={<Button size="sm">New order</Button>}
      />

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiTile label="Active orders" value={14} tone="primary" />
        <KpiTile label="In production" value={5} tone="gold" />
        <KpiTile label="On the water" value={4} tone="primary" />
        <KpiTile label="Delivered (30d)" value={9} tone="success" />
      </div>

      <div className="space-y-4">
        {orders.map((o) => (
          <article key={o.id} className="card-surface overflow-hidden">
            <div className="flex flex-col gap-3 border-b border-border p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[12px] font-semibold text-foreground">{o.id}</span>
                  <StatusBadge tone="info">{o.project}</StatusBadge>
                  <StatusBadge tone="gold">{o.basis}</StatusBadge>
                  <StatusBadge tone={o.tone} dot>{o.shipment}</StatusBadge>
                </div>
                <h4 className="mt-1.5 font-display text-[16px] font-semibold">{o.buyer}</h4>
                <div className="mt-0.5 text-[12.5px] text-muted-foreground">
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
                              "z-10 flex h-7 w-7 items-center justify-center rounded-full ring-4 ring-surface " +
                              (done
                                ? "bg-primary text-primary-foreground"
                                : current
                                  ? "bg-gold text-gold-foreground"
                                  : "bg-border text-muted-foreground")
                            }
                          >
                            {done ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-3 w-3" />}
                          </span>
                          {i < milestones.length - 1 && (
                            <div className={"h-0.5 flex-1 " + (i < o.stage - 1 ? "bg-primary" : "bg-border")} />
                          )}
                        </div>
                        <div className="mt-2 max-w-[110px] text-[11px] leading-tight text-muted-foreground">
                          <div className={done || current ? "font-semibold text-foreground" : ""}>{m}</div>
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
