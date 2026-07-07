import { PageHeader, Card, WorkflowBadge, DeliveryBasisBadge, StatusBadge, KpiTile } from "@/components/mos/Primitives";
import { Button } from "@/components/ui/button";
import { FileDown, Send, Eye } from "lucide-react";

const lines = [
  { item: "M8 SS316 shackle", supplier: "Ningbo Ocean Fittings", cost: 4.2, qty: 500, override: null },
  { item: "LED nav kit 12V IP67", supplier: "Shenzhen Boya", cost: 6.2, qty: 300, override: 28 },
  { item: "3\" bronze ball valve", supplier: "Qingdao Steel Rig", cost: 21.4, qty: 100, override: null },
];

const globalRate = 0.22;

export default function BuyerQuotation() {
  return (
    <>
      <PageHeader
        title="Buyer Quotation"
        description="Step 7 of 8"
        actions={
          <>
            <Button size="sm" variant="outline" className="h-9 leading-none box-border"><Eye className="mr-1.5 h-4 w-4" /> Buyer preview</Button>
            <Button size="sm" variant="outline" className="h-9 leading-none box-border"><FileDown className="mr-1.5 h-4 w-4" /> Export PDF</Button>
            <Button size="sm" className="h-9 leading-none box-border border border-transparent"><Send className="mr-1.5 h-4 w-4" /> Send for approval</Button>
          </>
        }
      />

      {/* Global profit settings — 5 KPI tiles */}
      <div className="mb-4 grid gap-4 grid-cols-2 md:grid-cols-5">
        <KpiTile label="Default rate" value="22%" hint="all categories" />
        <KpiTile label="Marine hardware" value="22%" />
        <KpiTile label="Electronics" value="28%" />
        <KpiTile label="Valves & fittings" value="20%" />
        <KpiTile label="Packaging" value="18%" />
      </div>

      {/* Currency — 3 KPI tiles */}
      <div className="mb-6 grid gap-4 grid-cols-1 md:grid-cols-3">
        <KpiTile label="USD → EUR" value="0.9200" hint="Locked today 09:12" />
        <KpiTile label="CNY → USD" value="0.1380" hint="Locked today 09:12" />
        <KpiTile label="CNY → EUR" value="0.1270" hint="Locked today 09:12" />
      </div>

      {/* Unified quotation card */}
      <Card padded={false}>
        <div className="flex items-start justify-between gap-4 p-6 pb-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-label uppercase text-muted-foreground font-mono text-mono">Q-2041</span>
              <DeliveryBasisBadge>CIF Gothenburg</DeliveryBasisBadge>
              <DeliveryBasisBadge>EUR</DeliveryBasisBadge>
              <span className="text-caption text-muted-foreground">Valid to Aug 7 2026</span>
            </div>
            <h3 className="mt-1 font-display text-subtitle font-semibold">Nordic Marine AB — Project PH-004</h3>
          </div>
          <WorkflowBadge state="draft" />
        </div>

        {/* Unified quotation table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-body">
            <thead className="bg-surface-muted">
              <tr>
                <th className="px-4 py-2 text-left text-label uppercase text-muted-foreground">Item</th>
                <th className="px-4 py-2 text-right text-label uppercase text-muted-foreground">Cost</th>
                <th className="px-4 py-2 text-right text-label uppercase text-muted-foreground">Margin</th>
                <th className="px-4 py-2 text-right text-label uppercase text-muted-foreground">Qty</th>
                <th className="px-4 py-2 text-right text-label uppercase text-destructive">Buyer</th>
                <th className="px-4 py-2 text-right text-label uppercase text-destructive">Total</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((l) => {
                const rate = (l.override ?? globalRate * 100) / 100;
                const unitUsd = l.cost / (1 - rate);
                const unitEur = unitUsd * 0.92;
                const totalEur = unitEur * l.qty;
                return (
                  <tr key={l.item} className="border-t border-border/60">
                    <td className="px-4 py-2.5">
                      <div className="whitespace-nowrap font-medium text-foreground">{l.item}</div>
                      <div className="whitespace-nowrap text-caption text-muted-foreground">{l.supplier}</div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-right font-medium text-foreground">${l.cost.toFixed(2)}</td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-right">
                      <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                        {l.override && <StatusBadge tone="muted">override</StatusBadge>}
                        {(rate * 100).toFixed(0)}%
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-right font-medium text-foreground">{l.qty}</td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-right font-medium text-foreground">€ {unitEur.toFixed(2)}</td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-right font-medium text-foreground">€ {totalEur.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t border-border">
                <td colSpan={5} />
                <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-foreground">
                  € {lines.reduce((acc, l) => {
                    const rate = (l.override ?? globalRate * 100) / 100;
                    return acc + (l.cost / (1 - rate)) * 0.92 * l.qty;
                  }, 0).toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>


      </Card>
    </>
  );
}
