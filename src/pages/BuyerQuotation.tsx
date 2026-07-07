import { PageHeader, Card, WorkflowBadge, Chip } from "@/components/mos/Primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

      {/* Top settings strip — 3 compact cards */}
      <div className="mb-6 grid gap-4 lg:grid-cols-3">
        <Card>
          <div className="section-title mb-3">Global profit settings</div>
          <label className="block">
            <span className="text-caption text-muted-foreground">Default rate (all categories)</span>
            <Input defaultValue="22" className="mt-1 h-9" />
          </label>
          <div className="mt-3 space-y-2">
            <RateRow label="Marine hardware" value="22%" />
            <RateRow label="Electronics" value="28%" />
            <RateRow label="Valves & fittings" value="20%" />
            <RateRow label="Packaging" value="18%" />
          </div>
        </Card>
        <Card>
          <div className="section-title mb-3">Currency</div>
          <div className="text-body space-y-1.5">
            <div className="flex justify-between"><span>USD → EUR</span><span className="font-mono text-mono text-foreground">0.9200</span></div>
            <div className="flex justify-between"><span>CNY → USD</span><span className="font-mono text-mono text-foreground">0.1380</span></div>
            <div className="flex justify-between"><span>Locked at</span><span className="text-caption text-muted-foreground">Today, 09:12</span></div>
          </div>
        </Card>
        <Card>
          <div className="section-title mb-3">Delivery basis</div>
          <div className="flex flex-wrap gap-1.5">
            {["EXW", "FOB", "CIF", "DAP", "DDP"].map((t) => (
              <Chip key={t} active={t === "CIF"}>{t}</Chip>
            ))}
          </div>
        </Card>
      </div>

      {/* Unified quotation card — internal cost + buyer preview side by side */}
      <Card>
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <div className="text-label uppercase text-muted-foreground font-mono text-mono">Quotation Q-2041</div>
            <h3 className="mt-1 font-display text-subtitle font-semibold">Nordic Marine AB — Project PH-004</h3>
            <div className="text-caption text-muted-foreground">CIF Gothenburg · EUR · Valid 30 days</div>
          </div>
          <WorkflowBadge state="draft" />
        </div>

        {/* Legend */}
        <div className="mb-3 flex flex-wrap items-center gap-2 text-caption text-muted-foreground">
          <span>Column visibility:</span>
          <WorkflowBadge state="hidden" />
          <span>Cost · Margin</span>
          <span className="text-border">·</span>
          <WorkflowBadge state="visible" />
          <span>Unit · Total</span>
        </div>

        {/* Unified quotation table */}
        <div className="-mx-1 overflow-x-auto">
          <table className="w-full min-w-[640px] text-body">
            <thead>
              <tr>
                <th className="py-2 pr-3 text-left text-label uppercase text-muted-foreground">Item</th>
                <th className="py-2 pr-3 text-right text-label uppercase text-muted-foreground">Cost</th>
                <th className="py-2 pr-3 text-right text-label uppercase text-muted-foreground">Margin</th>
                <th className="py-2 pr-3 text-right text-label uppercase text-muted-foreground">Qty</th>
                <th className="bg-surface-sunken py-2 px-3 text-right text-label uppercase text-muted-foreground first:rounded-tl-lg">
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Unit</span>
                    <WorkflowBadge state="visible" />
                  </div>
                </th>
                <th className="bg-surface-sunken py-2 pl-3 pr-3 text-right text-label uppercase text-muted-foreground rounded-tr-lg">
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Total</span>
                    <WorkflowBadge state="visible" />
                  </div>
                </th>
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
                    <td className="py-2 pr-3">
                      <div className="whitespace-nowrap font-medium">{l.item}</div>
                      <div className="whitespace-nowrap text-caption text-muted-foreground">{l.supplier}</div>
                    </td>
                    <td className="whitespace-nowrap py-2 pr-3 text-right font-mono text-mono">${l.cost.toFixed(2)}</td>
                    <td className="whitespace-nowrap py-2 pr-3 text-right">
                      <span className={l.override ? "font-mono text-mono text-foreground" : "font-mono text-mono text-muted-foreground"}>
                        {(rate * 100).toFixed(0)}%{l.override ? " · override" : ""}
                      </span>
                    </td>
                    <td className="whitespace-nowrap py-2 pr-3 text-right font-mono text-mono">{l.qty}</td>
                    <td className="whitespace-nowrap bg-surface-sunken py-2 px-3 text-right font-mono text-mono text-foreground">€ {unitEur.toFixed(2)}</td>
                    <td className="whitespace-nowrap bg-surface-sunken py-2 pl-3 pr-3 text-right font-mono text-mono text-foreground">€ {totalEur.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t border-border">
                <td colSpan={4} className="py-3 pr-3 text-right text-label uppercase text-muted-foreground">Total (EUR)</td>
                <td className="bg-surface-sunken" />
                <td className="whitespace-nowrap bg-surface-sunken py-3 pl-3 pr-3 text-right font-mono text-mono text-foreground font-semibold rounded-b-lg">
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


function RateRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-body">
      <span className="text-foreground/85">{label}</span>
      <span className="font-mono text-mono text-foreground">{value}</span>
    </div>
  );
}
