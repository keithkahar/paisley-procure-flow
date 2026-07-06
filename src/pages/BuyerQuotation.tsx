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
        eyebrow="Step 7 of 8"
        title="Buyer Quotation"
        description="Generate buyer-facing quotation from approved supplier quotes. Internal costs and margins stay hidden from the buyer."
        actions={
          <>
            <Button size="sm" variant="outline"><Eye className="mr-1.5 h-4 w-4" /> Buyer preview</Button>
            <Button size="sm" variant="outline"><FileDown className="mr-1.5 h-4 w-4" /> Export PDF</Button>
            <Button size="sm"><Send className="mr-1.5 h-4 w-4" /> Send for approval</Button>
          </>
        }
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="section-title">Quotation Q-2041</div>
                <h3 className="mt-1 font-display text-subtitle font-semibold">Nordic Marine AB — Project PH-004</h3>
                <div className="text-caption text-muted-foreground">CIF Gothenburg · EUR · Valid 30 days</div>
              </div>
              <WorkflowBadge state="draft" />
            </div>

            {/* Internal cost builder — hidden from buyer */}
            <div className="rounded-lg border border-border bg-surface-muted p-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-label uppercase text-muted-foreground">Internal cost builder</div>
                <WorkflowBadge state="hidden" />
              </div>
              <div className="-mx-1 overflow-x-auto">
                <table className="w-full min-w-[520px] text-body">
                  <thead>
                    <tr>
                      <th className="py-2 pr-3 text-left text-label uppercase text-muted-foreground">Item</th>
                      <th className="py-2 pr-3 text-right text-label uppercase text-muted-foreground">Cost</th>
                      <th className="py-2 pr-3 text-right text-label uppercase text-muted-foreground">Qty</th>
                      <th className="py-2 pr-3 text-right text-label uppercase text-muted-foreground">Margin</th>
                      <th className="py-2 pl-3 text-right text-label uppercase text-muted-foreground">Buyer unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lines.map((l) => {
                      const rate = (l.override ?? globalRate * 100) / 100;
                      const buyer = l.cost / (1 - rate);
                      return (
                        <tr key={l.item} className="border-t border-border/60">
                          <td className="py-2 pr-3">
                            <div className="whitespace-nowrap font-medium">{l.item}</div>
                            <div className="whitespace-nowrap text-caption text-muted-foreground">{l.supplier}</div>
                          </td>
                          <td className="whitespace-nowrap py-2 pr-3 text-right">${l.cost.toFixed(2)}</td>
                          <td className="whitespace-nowrap py-2 pr-3 text-right">{l.qty}</td>
                          <td className="whitespace-nowrap py-2 pr-3 text-right">
                            <span className={l.override ? "text-primary font-semibold" : "text-muted-foreground"}>
                              {(rate * 100).toFixed(0)}%{l.override ? " · override" : ""}
                            </span>
                          </td>
                          <td className="whitespace-nowrap py-2 pl-3 text-right font-display font-semibold">${buyer.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          <Card>
            <div className="mb-3 flex items-center justify-between">
              <div className="section-title">Buyer-facing preview</div>
              <WorkflowBadge state="visible" />
            </div>
            <div className="rounded-lg border border-border p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="font-display text-lg font-bold">Quotation Q-2041</div>
                  <div className="text-caption text-muted-foreground">To: Nordic Marine AB · CIF Gothenburg · EUR</div>
                </div>
                <div className="text-right">
                  <div className="text-label uppercase text-muted-foreground">Prepared by</div>
                  <div className="text-body font-semibold">Paisley Sourcing</div>
                </div>
              </div>
              <div className="-mx-1 overflow-x-auto">
              <table className="w-full min-w-[480px] text-body">
                <thead className="border-b border-border">
                  <tr>
                    <th className="py-2 text-left text-label uppercase text-muted-foreground">Description</th>
                    <th className="py-2 text-right text-label uppercase text-muted-foreground">Qty</th>
                    <th className="py-2 text-right text-label uppercase text-muted-foreground">Unit</th>
                    <th className="py-2 text-right text-label uppercase text-muted-foreground">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map((l) => {
                    const rate = (l.override ?? globalRate * 100) / 100;
                    const buyer = l.cost / (1 - rate);
                    return (
                      <tr key={l.item} className="border-b border-border/60">
                        <td className="whitespace-nowrap py-2.5">{l.item}</td>
                        <td className="whitespace-nowrap py-2.5 text-right">{l.qty}</td>
                        <td className="whitespace-nowrap py-2.5 text-right">€ {(buyer * 0.92).toFixed(2)}</td>
                        <td className="whitespace-nowrap py-2.5 text-right font-semibold">€ {(buyer * 0.92 * l.qty).toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="py-3 text-right font-semibold">Total (EUR)</td>
                    <td className="whitespace-nowrap py-3 text-right font-display text-lg font-bold text-primary">
                      € {lines.reduce((acc, l) => {
                        const rate = (l.override ?? globalRate * 100) / 100;
                        return acc + (l.cost / (1 - rate)) * 0.92 * l.qty;
                      }, 0).toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
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
              <div className="flex justify-between"><span>USD → EUR</span><span className="font-medium">0.9200</span></div>
              <div className="flex justify-between"><span>CNY → USD</span><span className="font-medium">0.1380</span></div>
              <div className="flex justify-between"><span>Locked at</span><span className="text-muted-foreground">Today, 09:12</span></div>
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
      </div>
    </>
  );
}

function RateRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-body">
      <span className="text-foreground/85">{label}</span>
      <span className="font-semibold text-primary">{value}</span>
    </div>
  );
}
