import { PageHeader, StatusBadge, KpiTile, ConfidenceBadge, DeliveryBasisBadge, MissingFieldBadge, confidenceTone } from "@/components/mos/Primitives";
import { Button } from "@/components/ui/button";
import { Check, X, Pencil, ClipboardCheck } from "lucide-react";

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
        eyebrow="Step 6 of 8"
        title="Quote review"
        description="Parsed supplier quotes staged for approval. Approve to promote into quote database, or reject with reason."
        actions={<Button size="sm" variant="outline"><ClipboardCheck className="mr-1.5 h-4 w-4" /> Approval rules</Button>}
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
          <thead className="bg-surface-muted text-muted-foreground">
            <tr>
              {["Quote", "Supplier / Item", "Price", "MOQ", "Lead", "Basis", "Validity", "Confidence", "Actions"].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left font-medium">{h}</th>
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
                        <StatusBadge key={m} tone="warning">Missing: {m}</StatusBadge>
                      ))}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 font-display font-semibold">{q.price}</td>
                <td className="px-4 py-3">{q.moq}</td>
                <td className="px-4 py-3">{q.lead}</td>
                <td className="px-4 py-3"><StatusBadge tone="gold">{q.basis}</StatusBadge></td>
                <td className="px-4 py-3">{q.validity}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-border">
                      <div className={`h-full rounded-full ${q.conf > 85 ? "bg-success" : q.conf > 70 ? "bg-primary" : "bg-warning"}`} style={{ width: `${q.conf}%` }} />
                    </div>
                    <span className="text-caption font-medium">{q.conf}%</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Button size="sm" className="h-8 px-2"><Check className="h-3.5 w-3.5" /></Button>
                    <Button size="sm" variant="outline" className="h-8 px-2"><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button size="sm" variant="ghost" className="h-8 px-2 text-destructive hover:bg-destructive-soft"><X className="h-3.5 w-3.5" /></Button>
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
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-mono text-muted-foreground">{q.id}</div>
                <div className="mt-1 font-semibold">{q.item}</div>
                <div className="text-caption text-muted-foreground">{q.supplier}</div>
              </div>
              <div className="text-right">
                <div className="font-display text-lg font-bold">{q.price}</div>
                <div className="text-caption text-muted-foreground">MOQ {q.moq}</div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <StatusBadge tone="gold">{q.basis}</StatusBadge>
              <StatusBadge tone="muted">Lead {q.lead}</StatusBadge>
              <StatusBadge tone="muted">{q.validity}</StatusBadge>
              <StatusBadge tone={q.conf > 85 ? "success" : "warning"}>{q.conf}%</StatusBadge>
            </div>
            <div className="mt-3 flex gap-2">
              <Button size="sm" className="flex-1">Approve</Button>
              <Button size="sm" variant="outline">Edit</Button>
              <Button size="sm" variant="ghost" className="text-destructive">Reject</Button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-border bg-surface p-4">
        <div className="section-title mb-2">Reject reasons</div>
        <div className="flex flex-wrap gap-1.5">
          {rejectReasons.map((r) => (
            <StatusBadge key={r} tone="muted">{r}</StatusBadge>
          ))}
        </div>
      </div>
    </>
  );
}
