import { PageHeader, Card, RefBadge, DeliveryBasisBadge, Chip } from "@/components/mos/Primitives";
import { Button } from "@/components/ui/button";
import { Calculator, Plus } from "lucide-react";

const items = [
  {
    rfq: "RFQ-011",
    item: "M8 SS316 shackles",
    basis: "FOB Ningbo",
    suppliers: [
      { id: "SUP-CN-0081", name: "Ningbo Ocean Fittings", rounds: ["sent", "replied", "sent", "replied", "-", "-"] },
      { id: "SUP-CN-0082", name: "Xiamen Bluewave", rounds: ["sent", "replied", "sent", "-", "-", "-"] },
      { id: "SUP-CN-0083", name: "Guangzhou Harbor", rounds: ["sent", "-", "-", "-", "-", "-"] },
    ],
  },
  {
    rfq: "RFQ-014",
    item: "LED navigation kits 12V IP67",
    basis: "CIF Gothenburg",
    suppliers: [
      { id: "SUP-CN-0085", name: "Shenzhen Boya", rounds: ["sent", "replied", "sent", "replied", "sent", "replied"] },
      { id: "SUP-CN-0091", name: "Zhuhai Marine LED", rounds: ["sent", "replied", "sent", "-", "-", "-"] },
    ],
  },
];

const dot = (s: string) =>
  s === "sent" ? "bg-primary" : s === "replied" ? "bg-success" : "bg-border-strong";

export default function RFQ() {
  return (
    <>
      <PageHeader
        title="RFQ Rounds"
        description="Step 5 of 8"
        actions={
          <>
            <Button size="sm" variant="outline" className="h-9 leading-none box-border"><Calculator className="mr-1.5 h-4 w-4" /> Cost model</Button>
            <Button size="sm" className="h-9 leading-none box-border border border-transparent"><Plus className="mr-1.5 h-4 w-4" /> New RFQ</Button>
          </>
        }
      />

      <div className="mb-6 grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="section-title mb-3">Cost components (per unit)</div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              ["Supplier unit price", "$ 4.20"],
              ["China local cost", "$ 0.35"],
              ["International freight", "$ 0.62"],
              ["Destination delivery", "$ 0.28"],
              ["Duty / Tax", "$ 0.54"],
              ["Buffer", "$ 0.20"],
              ["Profit rate", "22%"],
              ["Buyer landed price", "$ 7.83"],
            ].map(([k, v], i) => (
              <div key={k} className={"rounded-lg border border-border p-3 " + (i === 7 ? "bg-primary-soft border-primary/20" : "bg-surface-muted")}>
                <div className="text-label uppercase text-muted-foreground">{k}</div>
                <div className={"mt-1 font-display text-subtitle font-bold " + (i === 7 ? "text-primary" : "text-foreground")}>{v}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className="section-title mb-3">Delivery basis</div>
          <div className="flex flex-wrap gap-1.5">
            {["EXW", "FOB", "CIF", "DAP", "DDP", "Delivered", "Other"].map((t, i) => (
              <Chip key={t} active={i === 1}>{t}</Chip>
            ))}
          </div>
          <div className="mt-4 section-title mb-2">Port / Warehouse</div>
          <div className="text-body text-foreground/85">
            FOB Ningbo Beilun · Backup FOB Shanghai Yangshan
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        {items.map((it) => (
          <div key={it.rfq} className="card-surface overflow-hidden">
            <div className="flex flex-col gap-2 border-b border-border p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <RefBadge>{it.rfq}</RefBadge>
                  <DeliveryBasisBadge>{it.basis}</DeliveryBasisBadge>
                </div>
                <h4 className="mt-1 font-display text-subtitle font-semibold">{it.item}</h4>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">Add supplier</Button>
                <Button size="sm">Send next round</Button>
              </div>
            </div>

            {/* Table for md+, cards for mobile */}
            <div className="hidden md:block">
              <table className="w-full text-body">
                <thead className="bg-surface-muted">
                  <tr>
                    <th className="px-4 py-2 text-left text-label uppercase text-muted-foreground">Supplier</th>
                    {["1st Email", "1st Reply", "2nd Email", "2nd Reply", "3rd Email", "3rd Reply"].map((h) => (
                      <th key={h} className="px-3 py-2 text-center text-label uppercase text-muted-foreground">{h}</th>
                    ))}
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
                      <td className="px-4 py-2.5 text-right">
                        <Button size="sm" variant="ghost">Details</Button>
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
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-label uppercase text-muted-foreground">Supplier</div>
                        <div className="mt-0.5 font-medium text-foreground text-body">{s.name}</div>
                        <div className="font-mono text-mono text-muted-foreground">{s.id}</div>
                      </div>
                      <Button size="sm" variant="ghost">Details</Button>
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
