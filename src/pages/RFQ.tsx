import { PageHeader, KpiTile, RefBadge, IconAction, DeliveryBasisBadge } from "@/components/mos/Primitives";
import { Button } from "@/components/ui/button";
import { Calculator, Plus, ArrowRight } from "lucide-react";

const items = [
  {
    rfq: "RFQ-011",
    item: "M8 SS316 shackles",
    basis: "FOB Ningbo",
    suppliers: [
      { id: "SUP-CN-0081", name: "Ningbo Ocean Fittings", latest: "$ 4.20 / pc", rounds: ["sent", "replied", "sent", "replied", "-", "-"] },
      { id: "SUP-CN-0082", name: "Xiamen Bluewave",       latest: "$ 4.45 / pc", rounds: ["sent", "replied", "sent", "overdue", "-", "-"] },
      { id: "SUP-CN-0083", name: "Guangzhou Harbor",      latest: "—",           rounds: ["sent", "overdue", "-", "-", "-", "-"] },
    ],
  },
  {
    rfq: "RFQ-014",
    item: "LED navigation kits 12V IP67",
    basis: "CIF Gothenburg",
    suppliers: [
      { id: "SUP-CN-0085", name: "Shenzhen Boya",     latest: "$ 26.10 / pc", rounds: ["sent", "replied", "sent", "replied", "sent", "replied"] },
      { id: "SUP-CN-0091", name: "Zhuhai Marine LED", latest: "$ 27.80 / pc", rounds: ["sent", "replied", "sent", "overdue", "-", "-"] },
    ],
  },
];

const dot = (s: string) =>
  s === "sent"
    ? "bg-primary"
    : s === "replied"
    ? "bg-success"
    : s === "overdue"
    ? "bg-destructive"
    : "bg-border-strong";



export default function RFQ() {
  return (
    <>
      <PageHeader
        title="RFQ Rounds"
        description="5/8"
        actions={
          <>
            <Button size="sm" variant="outline" className="h-9 leading-none box-border"><Calculator className="mr-1.5 h-4 w-4" /> Cost model</Button>
            <Button size="sm" className="h-9 leading-none box-border border border-transparent"><Plus className="mr-1.5 h-4 w-4" /> New RFQ</Button>
          </>
        }
      />

      <div className="mb-6">
        <div className="section-title mb-3">Cost components (per unit)</div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {[
            ["Supplier", "$ 4.20", false],
            ["China local", "$ 0.35", false],
            ["Int'l freight", "$ 0.62", false],
            ["Destination", "$ 0.28", false],
            ["Duty / Tax", "$ 0.54", false],
            ["Buffer", "$ 0.20", false],
            ["Profit", "22%", false],
            ["Buyer landed", "$ 7.83", true],
          ].map(([k, v, highlight]) => (
            <div key={k as string} className={highlight ? "[&_.kpi-tile]:ring-1 [&_.kpi-tile]:ring-primary/25 [&_.kpi-tile_.font-display]:text-primary" : ""}>
              <KpiTile label={k as string} value={v as string} />
            </div>
          ))}
        </div>
      </div>




      <div className="space-y-4">
        {items.map((it) => (
          <div key={it.rfq} className="card-surface overflow-hidden">
            <div className="flex flex-col gap-3 border-b border-border p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <RefBadge>{it.rfq}</RefBadge>
                  <DeliveryBasisBadge>{it.basis}</DeliveryBasisBadge>
                </div>
                <h4 className="mt-1 font-display text-subtitle font-semibold">{it.item}</h4>
              </div>
              <div className="flex items-center gap-3">
                <Button size="sm" variant="outline">Add supplier</Button>
                <Button size="sm">Send next round</Button>
              </div>
            </div>

            <div className="hidden md:block">
              <table className="w-full text-body">
                <thead className="bg-surface-muted">
                  <tr>
                    <th className="px-4 py-2 text-left text-label uppercase text-muted-foreground">Supplier</th>
                    {["1st Email", "1st Reply", "2nd Email", "2nd Reply", "3rd Email", "3rd Reply"].map((h) => (
                      <th key={h} className="px-3 py-2 text-center text-label uppercase text-muted-foreground">{h}</th>
                    ))}
                    <th className="px-4 py-2 text-right text-label uppercase text-muted-foreground">Latest quote</th>
                    <th className="px-4 py-2 text-right text-label uppercase text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {it.suppliers.map((s) => (
                    <tr key={s.id} className="border-t border-border/70">
                      <td className="px-4 py-2.5">
                        <div className="font-medium text-foreground">{s.name}</div>
                        <div className="font-mono text-mono text-muted-foreground">{s.id}</div>
                      </td>
                      {s.rounds.map((r, i) => (
                        <td key={i} className="px-3 py-2.5 text-center">
                          <span className={`inline-block h-2.5 w-2.5 rounded-full ${dot(r)}`} />
                        </td>
                      ))}
                      <td className="whitespace-nowrap px-4 py-2.5 text-right font-medium text-foreground">
                        {s.latest}
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <div className="inline-flex">
                          <IconAction icon={ArrowRight} label="Details" tone="outline" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="md:hidden divide-y divide-border">
              {it.suppliers.map((s) => {
                const roundLabels = ["1st Email", "1st Reply", "2nd Email", "2nd Reply", "3rd Email", "3rd Reply"];
                return (
                  <div key={s.id} className="p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-label uppercase text-muted-foreground">Supplier</div>
                        <div className="mt-0.5 font-medium text-foreground text-body">{s.name}</div>
                        <div className="font-mono text-mono text-muted-foreground">{s.id}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-label uppercase text-muted-foreground">Latest</div>
                          <div className="font-mono text-mono text-foreground">{s.latest}</div>
                        </div>
                        <IconAction icon={ArrowRight} label="Details" tone="outline" />
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {s.rounds.map((r, i) => (
                        <div key={i} className="flex flex-col items-start">
                          <div className="text-label uppercase text-muted-foreground">{roundLabels[i]}</div>
                          <span className={`mt-1 inline-block h-2.5 w-2.5 rounded-full ${dot(r)}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
