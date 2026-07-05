import { PageHeader, StatusBadge, KpiTile } from "@/components/mos/Primitives";
import { Button } from "@/components/ui/button";
import { Mail, Send, Pencil, Check } from "lucide-react";

const emails = [
  { id: "FC-2201", rfq: "RFQ-011", supplier: "Ningbo Ocean Fittings", item: "M8 stainless shackles (500 pcs)", subject: "Inquiry: M8 SS316 shackles + brief company intro request", status: "Awaiting approval", tone: "warning" as const, missing: [] },
  { id: "FC-2202", rfq: "RFQ-011", supplier: "Xiamen Bluewave Marine", item: "M8 stainless shackles (500 pcs)", subject: "Inquiry: M8 SS316 shackles for EU marine buyer", status: "Draft", tone: "muted" as const, missing: ["Direct contact person"] },
  { id: "FC-2203", rfq: "RFQ-014", supplier: "Shenzhen Boya Electronics", item: "LED navigation light kit, 12V, IP67", subject: "Inquiry: LED nav light kits + company profile", status: "Sent", tone: "primary" as const, missing: [] },
  { id: "FC-2204", rfq: "RFQ-014", supplier: "Qingdao Steel Rig", item: "3\" bronze ball valve", subject: "Inquiry: bronze ball valves — spec + capability", status: "Replied", tone: "success" as const, missing: [] },
  { id: "FC-2205", rfq: "RFQ-016", supplier: "Guangzhou Harbor Trading", item: "Marine deck cleats, cast aluminum", subject: "Inquiry: aluminum deck cleats — please confirm factory", status: "Needs follow-up", tone: "danger" as const, missing: ["Factory address"] },
];

export default function FirstContact() {
  return (
    <>
      <PageHeader
        eyebrow="Step 4 of 8"
        title="First contact"
        description="Combined product inquiry and light supplier background request. Never sent as a cold investigation email."
        actions={
          <>
            <Button size="sm" variant="outline">Edit template</Button>
            <Button size="sm"><Send className="mr-1.5 h-4 w-4" /> Send approved batch</Button>
          </>
        }
      />

      <div className="mb-4 rounded-xl border border-primary/20 bg-primary-soft p-4">
        <div className="text-[11px] font-semibold uppercase tracking-widest text-primary">Rule</div>
        <p className="mt-1 text-[13px] text-foreground/85">
          First email must combine a <strong>real product inquiry</strong> and a <strong>light background request</strong>
          (factory type, main product line, export markets). It should read like an inquiry from a real buyer's agency, not a compliance survey.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiTile label="In queue" value={14} icon={<Mail className="h-4 w-4" />} />
        <KpiTile label="Awaiting approval" value={5} tone="warning" />
        <KpiTile label="Sent (24h)" value={22} tone="primary" />
        <KpiTile label="Replied" value={9} tone="success" />
      </div>

      <div className="space-y-3">
        {emails.map((e) => (
          <article key={e.id} className="card-surface p-4 md:p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[11px] text-muted-foreground">{e.id}</span>
                  <StatusBadge tone="info">{e.rfq}</StatusBadge>
                  <StatusBadge tone={e.tone} dot>{e.status}</StatusBadge>
                </div>
                <h4 className="mt-1.5 font-display text-[15px] font-semibold">{e.subject}</h4>
                <div className="mt-1 text-[12.5px] text-muted-foreground">
                  To: {e.supplier} <span className="divider-dot" /> {e.item}
                </div>
                {e.missing.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {e.missing.map((m) => (
                      <StatusBadge key={m} tone="warning">Missing: {m}</StatusBadge>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2 md:shrink-0">
                <Button size="sm"><Check className="mr-1 h-3.5 w-3.5" /> Approve</Button>
                <Button size="sm" variant="outline"><Pencil className="mr-1 h-3.5 w-3.5" /> Edit draft</Button>
                <Button size="sm" variant="ghost">Preview</Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
