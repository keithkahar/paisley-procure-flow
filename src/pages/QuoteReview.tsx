import { PageHeader, KpiTile, ConfidenceBadge, DeliveryBasisBadge, MissingFieldBadge, Chip, ApproveAction, EditAction, RejectAction } from "@/components/mos/Primitives";

import { Button } from "@/components/ui/button";
import { ClipboardCheck } from "lucide-react";

const quotes = [
  { id: "Q-2038", supplier: "Shenzhen Boya Electronics", item: "LED nav kit 12V IP67", price: "$ 6.20", moq: 300, lead: "22 d", currency: "USD", basis: "FOB Shenzhen", validity: "30 d", conf: 92, missing: [] },
  { id: "Q-2039", supplier: "Ningbo Ocean Fittings", item: "M8 SS316 shackle", price: "$ 4.20", moq: 500, lead: "18 d", currency: "USD", basis: "FOB Ningbo", validity: "45 d", conf: 88, missing: ["Packaging spec"] },
  { id: "Q-2040", supplier: "Guangzhou Harbor Trading", item: "Marine deck cleats", price: "$ 8.90", moq: 200, lead: "35 d", currency: "CNY→USD", basis: "EXW Guangzhou", validity: "15 d", conf: 61, missing: ["HS code", "Weight"] },
  { id: "Q-2041", supplier: "Qingdao Steel Rig", item: "3\" bronze ball valve", price: "$ 21.40", moq: 100, lead: "28 d", currency: "USD", basis: "FOB Qingdao", validity: "30 d", conf: 94, missing: [] },
];

const rejectReasons = ["Unreasonable price", "Supplier refused quote", "Missing data", "Non-compliant terms", "Needs follow-up"];

export default function QuoteReview() {
  return (
    <>
      <PageHeader
        title="Quote Review"
        description="6/8"
        actions={<Button size="sm" variant="outline" className="h-9 leading-none box-border"><ClipboardCheck className="mr-1.5 h-4 w-4" /> Approval rules</Button>}
      />

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiTile label="Staged" value={11} tone="primary" />
        <KpiTile label="High confidence" value={6} tone="success" />
        <KpiTile label="Needs edit" value={3} tone="warning" />
        <KpiTile label="Rejected today" value={2} tone="muted" />
      </div>

      {/* Table on desktop */}
      <div className="card-surface hidden overflow-hidden md:block">
        <table className="w-full text-body">
          <thead className="bg-surface-muted">
            <tr>
              {["Quote", "Supplier / Item", "Price", "MOQ", "Lead", "Basis", "Validity", "Confidence", "Actions"].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left text-label uppercase text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {quotes.map((q) => (
              <tr key={q.id} className="border-t border-border/70 hover:bg-surface-muted/50">
                <td className="px-4 py-3">
                  <div className="font-mono text-mono font-semibold text-foreground">{q.id}</div>
                  <div className="text-caption text-muted-foreground">{q.currency}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium">{q.item}</div>
                  <div className="text-caption text-muted-foreground">{q.supplier}</div>
                  {q.missing.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {q.missing.map((m) => (
                        <MissingFieldBadge key={m} field={m} />
                      ))}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 font-display font-semibold">{q.price}</td>
                <td className="px-4 py-3">{q.moq}</td>
                <td className="px-4 py-3">{q.lead}</td>
                <td className="px-4 py-3"><DeliveryBasisBadge>{q.basis}</DeliveryBasisBadge></td>
                <td className="px-4 py-3">{q.validity}</td>
                <td className="px-4 py-3">
                  <ConfidenceBadge value={q.conf} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <ApproveAction />
                    <EditAction />
                    <RejectAction />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards on mobile */}
      <div className="space-y-3 md:hidden">
        {quotes.map((q) => (
          <article key={q.id} className="card-surface p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-label uppercase text-muted-foreground">Quote</div>
                <div className="mt-0.5 font-mono text-mono text-muted-foreground">{q.id}</div>
                <div className="mt-2 text-label uppercase text-muted-foreground">Supplier / Item</div>
                <div className="mt-0.5 font-semibold">{q.item}</div>
                <div className="text-caption text-muted-foreground">{q.supplier}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-label uppercase text-muted-foreground">Price</div>
                <div className="mt-0.5 font-display text-lg font-bold">{q.price}</div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <div>
                <div className="text-label uppercase text-muted-foreground">MOQ</div>
                <div className="mt-0.5 text-body">{q.moq}</div>
              </div>
              <div>
                <div className="text-label uppercase text-muted-foreground">Lead</div>
                <div className="mt-0.5 text-body">{q.lead}</div>
              </div>
              <div>
                <div className="text-label uppercase text-muted-foreground">Validity</div>
                <div className="mt-0.5 text-body">{q.validity}</div>
              </div>
            </div>
            <div className="mt-3">
              <div className="text-label uppercase text-muted-foreground">Basis</div>
              <div className="mt-1"><DeliveryBasisBadge>{q.basis}</DeliveryBasisBadge></div>
            </div>
            <div className="mt-3">
              <div className="text-label uppercase text-muted-foreground">Confidence</div>
              <div className="mt-1">
                <ConfidenceBadge value={q.conf} />
              </div>
            </div>
            {q.missing.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {q.missing.map((m) => (
                  <MissingFieldBadge key={m} field={m} />
                ))}
              </div>
            )}
            <div className="mt-3 flex items-center gap-1.5">
              <ApproveAction />
              <EditAction />
              <RejectAction />
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6">
        <div className="section-title mb-2">Reject reasons</div>
        <div className="flex flex-wrap gap-1.5">
          {rejectReasons.map((r) => (
            <Chip key={r}>{r}</Chip>
          ))}
        </div>
      </div>
    </>
  );
}
