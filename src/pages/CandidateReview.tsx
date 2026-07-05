import { PageHeader, StatusBadge, KpiTile, SupplierTypeBadge } from "@/components/mos/Primitives";
import { Button } from "@/components/ui/button";
import { Check, X, Pencil, ShieldAlert, MapPin, Factory } from "lucide-react";

const queue = [
  { id: "SUP-CN-0081", name: "Ningbo Ocean Fittings Co., Ltd", type: "Factory", addr: "No. 128 Zhenhai Rd, Ningbo, Zhejiang, CN", cat: "Marine hardware", export: "12 yrs", contact: "Full", risks: ["No ISO 9001 certificate listed"] },
  { id: "SUP-CN-0083", name: "Guangzhou Harbor Trading Co.", type: "Trader", addr: "Room 908, Tianhe District, Guangzhou, CN", cat: "Marine hardware", export: "4 yrs", contact: "Full", risks: ["Trading company — factory unverified", "2 late shipments (past 12m)"] },
  { id: "SUP-CN-0084", name: "Qingdao Steel Rig Manufacture", type: "Factory", addr: "Jiaozhou Industrial Park, Qingdao, CN", cat: "Valves & fittings", export: "9 yrs", contact: "Partial", risks: ["Missing WeChat contact"] },
];

export default function CandidateReview() {
  return (
    <>
      <PageHeader
        eyebrow="Step 3 of 8"
        title="Candidate review"
        description="Human approval gate before suppliers move to first contact. Approve, reject, or edit each candidate."
        actions={<Button size="sm" variant="outline">Batch approve safe candidates</Button>}
      />

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiTile label="In review" value={12} tone="primary" />
        <KpiTile label="High confidence" value={7} tone="success" />
        <KpiTile label="Needs verification" value={3} tone="warning" />
        <KpiTile label="Approved today" value={9} tone="muted" />
      </div>

      <div className="space-y-3">
        {queue.map((s) => (
          <article key={s.id} className="card-surface p-4 md:p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-3 md:gap-4 min-w-0">
                <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary md:flex">
                  <Factory className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-mono text-muted-foreground">{s.id}</span>
                    <StatusBadge tone={s.type === "Factory" ? "primary" : "gold"}>{s.type}</StatusBadge>
                    <StatusBadge tone="muted">{s.cat}</StatusBadge>
                  </div>
                  <h4 className="mt-1.5 font-display text-subtitle font-semibold">{s.name}</h4>
                  <div className="mt-1 flex items-start gap-1.5 text-caption text-muted-foreground">
                    <MapPin className="mt-0.5 h-3.5 w-3.5" /> {s.addr}
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
                    <MiniField label="Export experience" value={s.export} />
                    <MiniField label="Contact completeness" value={s.contact} />
                    <MiniField label="Category match" value="Strong" />
                  </div>
                  {s.risks.length > 0 && (
                    <div className="mt-3 rounded-lg border border-warning/30 bg-warning-soft/50 p-3">
                      <div className="flex items-center gap-1.5 text-label uppercase text-warning-foreground/80">
                        <ShieldAlert className="h-3.5 w-3.5" /> Verification notes
                      </div>
                      <ul className="mt-1.5 space-y-0.5 text-caption text-foreground/85">
                        {s.risks.map((r) => (
                          <li key={r}>• {r}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 md:shrink-0">
                <Button size="sm"><Check className="mr-1 h-3.5 w-3.5" /> Approve</Button>
                <Button size="sm" variant="outline"><Pencil className="mr-1 h-3.5 w-3.5" /> Edit</Button>
                <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive-soft hover:text-destructive">
                  <X className="mr-1 h-3.5 w-3.5" /> Reject
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function MiniField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-label uppercase text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-body font-medium text-foreground">{value}</div>
    </div>
  );
}
