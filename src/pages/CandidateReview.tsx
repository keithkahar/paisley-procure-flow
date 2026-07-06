import { PageHeader, StatusBadge, SupplierTypeBadge, ConfidenceBadge, MissingFieldBadge, ApproveAction, EditAction, RejectAction } from "@/components/mos/Primitives";
import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";

const kpis = [
  { label: "In review", value: 12, hint: "candidates" },
  { label: "High confidence", value: 7, hint: "auto-approve ready" },
  { label: "Needs verification", value: 3, hint: "manual review" },
  { label: "Approved today", value: 9, hint: "this session" },
];

const queue = [
  { id: "SUP-CN-0081", name: "Ningbo Ocean Fittings Co., Ltd", type: "Factory", addr: "No. 128 Zhenhai Rd, Ningbo, Zhejiang, CN", cat: "Marine hardware", export: "12 yrs", contact: "Full", match: "Strong", conf: 94, risks: ["No ISO 9001 certificate listed"] },
  { id: "SUP-CN-0083", name: "Guangzhou Harbor Trading Co.", type: "Trader", addr: "Room 908, Tianhe District, Guangzhou, CN", cat: "Marine hardware", export: "4 yrs", contact: "Full", match: "Moderate", conf: 71, risks: ["Trading company — factory unverified", "2 late shipments (past 12m)"] },
  { id: "SUP-CN-0084", name: "Qingdao Steel Rig Manufacture", type: "Factory", addr: "Jiaozhou Industrial Park, Qingdao, CN", cat: "Valves & fittings", export: "9 yrs", contact: "Partial", match: "Strong", conf: 86, risks: ["Missing WeChat contact"] },
];

export default function CandidateReview() {
  return (
    <>
      <PageHeader
        title="Candidate Review"
        description="Step 3 of 8"
        actions={
          <Button size="sm" className="h-9 leading-none box-border">
            <CheckCheck className="mr-1.5 h-4 w-4" /> Batch approve safe candidates
          </Button>
        }
      />

      {/* Compact KPI strip — matches Supplier Discovery height */}
      <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="card-surface flex items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0 flex-1">
              <div className="truncate text-caption text-muted-foreground">{k.label}</div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-[20px] font-semibold leading-none tracking-tight text-foreground tabular-nums">
                  {k.value}
                </span>
                <span className="truncate text-[11px] text-muted-foreground">{k.hint}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {queue.map((s) => (
          <article
            key={s.id}
            className="card-surface relative overflow-hidden p-4 md:p-5"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Left: identity */}
              <div className="flex items-start gap-4 min-w-0 md:flex-1">
                <ConfidenceBadge value={s.conf} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-mono text-muted-foreground">{s.id}</span>
                    <SupplierTypeBadge type={s.type} />
                    <StatusBadge tone="muted">{s.cat}</StatusBadge>
                  </div>
                  <h4 className="mt-1.5 font-display text-subtitle font-semibold leading-snug">{s.name}</h4>
                  <div className="mt-0.5 text-caption text-muted-foreground">{s.addr}</div>

                  {/* Inline metrics row */}
                  <dl className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-caption">
                    <InlineMetric label="Export" value={s.export} />
                    <InlineMetric label="Contact" value={s.contact} />
                    <InlineMetric label="Match" value={s.match} />
                  </dl>

                  {s.risks.length > 0 && (
                    <div className="mt-3 flex items-start gap-2 text-caption text-warning-foreground">
                      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" />
                      <div className="text-foreground/80">
                        {s.risks.join(" · ")}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: icon actions */}
              <div className="flex items-center gap-2 md:shrink-0 md:self-center">
                <ApproveAction />
                <EditAction />
                <RejectAction />
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function InlineMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <dt className="text-label uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="text-body font-medium text-foreground">{value}</dd>
    </div>
  );
}
