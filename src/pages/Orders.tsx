import {
  PageHeader,
  KpiTile,
  Card,
  WorkflowBadge,
  RefBadge,
  DeliveryBasisBadge,
  IconAction,
  type WorkflowState,
} from "@/components/mos/Primitives";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

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

function OrderProgress({ stage }: { stage: number }) {
  return (
    <div>
      <div className="flex items-center gap-1.5">
        {milestones.map((m, i) => {
          const done = i < stage;
          const current = i === stage;
          return (
            <Tooltip key={m}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "h-2 flex-1 rounded-full transition-colors",
                    done || current ? "bg-primary" : "bg-border",
                    current && "ring-2 ring-primary ring-offset-2 ring-offset-background",
                  )}
                  aria-label={m}
                />
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[200px] text-center">
                {m}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
      <div className="mt-2.5 flex items-center justify-between text-caption">
        <span className="text-muted-foreground">
          Current: <span className="font-medium text-foreground">{milestones[stage]}</span>
        </span>
        <span className="text-muted-foreground">
          Step {stage + 1} of {milestones.length}
        </span>
      </div>
    </div>
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

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <KpiTile label="Active orders" value={14} tone="primary" />
        <KpiTile label="In production" value={5} tone="warning" />
        <KpiTile label="On the water" value={4} tone="primary" />
        <KpiTile label="Delivered (30d)" value={9} tone="success" />
      </div>

      <div className="space-y-4">
        {orders.map((o) => (
          <article key={o.id}>
            <Card padded={false} className="transition-shadow hover:shadow-md">
              <div className="flex flex-col gap-4 border-b border-border p-5 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-mono font-semibold text-foreground">{o.id}</span>
                    <RefBadge>{o.project}</RefBadge>
                    <DeliveryBasisBadge>{o.basis}</DeliveryBasisBadge>
                    <WorkflowBadge state={o.state} label={o.shipment} />
                  </div>
                  <div>
                    <h4 className="font-display text-subtitle font-semibold">{o.buyer}</h4>
                    <div className="mt-0.5 text-caption text-muted-foreground">
                      Suppliers: {o.suppliers.join(", ")} <span className="divider-dot" /> {o.port}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:shrink-0">
                  <IconAction icon={FileText} label="Documents" tone="outline" />
                  <Button size="sm">Open order</Button>
                </div>
              </div>
              <div className="p-5">
                <OrderProgress stage={o.stage} />
              </div>
            </Card>
          </article>
        ))}
      </div>
    </>
  );
}
