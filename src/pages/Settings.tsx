import { PageHeader, Card, WorkflowBadge, IdText, StatusBadge } from "@/components/mos/Primitives";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Pencil, Plus } from "lucide-react";
import type { ReactNode } from "react";

/* ---------- data ---------- */

const mailboxes = [
  { addr: "sourcing@paisley-ec.com",  purpose: "Supplier inquiry / RFQ correspondence" },
  { addr: "quotation@paisley-ec.com", purpose: "Buyer quotation delivery" },
  { addr: "order@paisley-ec.com",     purpose: "Order tracking & shipment updates" },
];
const aliases = [
  { alias: "po@paisley-ec.com",     forwards: "order@paisley-ec.com" },
  { alias: "orders@paisley-ec.com", forwards: "order@paisley-ec.com" },
];

const ports: Array<{ name: string; country: string; flag: string }> = [
  { name: "Ningbo Beilun",     country: "CN", flag: "🇨🇳" },
  { name: "Shanghai Yangshan", country: "CN", flag: "🇨🇳" },
  { name: "Shenzhen Yantian",  country: "CN", flag: "🇨🇳" },
  { name: "Qingdao Qianwan",   country: "CN", flag: "🇨🇳" },
  { name: "Gothenburg",        country: "SE", flag: "🇸🇪" },
  { name: "Trieste",           country: "IT", flag: "🇮🇹" },
  { name: "Rotterdam",         country: "NL", flag: "🇳🇱" },
  { name: "Felixstowe",        country: "UK", flag: "🇬🇧" },
];

const categoryMargins: Array<[string, string]> = [
  ["Marine hardware",   "22%"],
  ["Electronics",       "28%"],
  ["Valves & fittings", "20%"],
  ["Packaging",         "18%"],
];

const currency: Array<[string, string]> = [
  ["Base currency",         "USD"],
  ["Buyer-facing default",  "EUR"],
  ["Rate source",           "ECB · daily"],
  ["Lock at",               "Quotation send"],
];

const templates = [
  "First contact — combined inquiry + background",
  "RFQ round 1 / 2 / 3",
  "Quote clarification",
  "Buyer quotation cover email",
  "Order confirmation",
  "Shipment notification",
];

type ApprovalRow = { mode: "auto" | "human"; condition: string; action: string };
const approvalRules: ApprovalRow[] = [
  { mode: "auto",  condition: "Quote parse confidence ≥ 90% and no missing fields", action: "Auto-approve" },
  { mode: "human", condition: "Supplier is a trading company or new to database",   action: "Human review" },
  { mode: "human", condition: "Buyer quotation total > € 50,000",                   action: "Human review" },
  { mode: "human", condition: "Delivery basis is DDP",                              action: "Human review" },
];

const sources = [
  "Alibaba Verified",
  "Made-in-China",
  "Global Sources",
  "Internal supplier CRM",
  "Historical order suppliers",
];

// Palette matches the dashboard donut: deep blue → bright blue → mid gray → light gray → pale gray
const ratingWeights: Array<{ label: string; pct: number; color: string }> = [
  { label: "On-time delivery",              pct: 30, color: "bg-[hsl(224_76%_38%)]" },
  { label: "Quote accuracy",                pct: 25, color: "bg-[hsl(217_91%_60%)]" },
  { label: "Quality (inspection pass)",     pct: 20, color: "bg-[hsl(220_13%_65%)]" },
  { label: "Response speed",                pct: 15, color: "bg-[hsl(220_13%_78%)]" },
  { label: "Communication clarity",         pct: 10, color: "bg-[hsl(220_14%_88%)]" },
];

/* ---------- shared shells ---------- */

function SectionCard({
  title,
  desc,
  status,
  onEdit,
  headerActions,
  children,
}: {
  title: string;
  desc?: string;
  status?: ReactNode;
  onEdit?: () => void;
  headerActions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Card>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-subtitle font-semibold">{title}</h3>
            {status}
          </div>
          {desc && <p className="mt-0.5 text-caption text-muted-foreground">{desc}</p>}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {headerActions}
          <Button size="sm" variant="outline" onClick={onEdit} className="h-8">
            <Pencil className="mr-1.5 h-3.5 w-3.5" /> Edit
          </Button>
        </div>
      </div>
      {children}
    </Card>
  );
}

/* ---------- page ---------- */

export default function Settings() {
  return (
    <>
      <PageHeader title="Settings" />



      <Tabs defaultValue="channels" className="w-full">
        <TabsList className="mb-6 flex h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
          {[
            ["channels",   "Channels"],
            ["masters",    "Masters"],
            ["pricing",    "Pricing & Currency"],
            ["automation", "Automation"],
            ["suppliers",  "Suppliers"],
          ].map(([v, l]) => (
            <TabsTrigger
              key={v}
              value={v}
              className="rounded-full border border-border bg-surface px-4 py-1.5 text-body data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
            >
              {l}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* --------- Channels --------- */}
        <TabsContent value="channels" className="mt-0">
          <SectionCard
            title="Mailbox"
            desc="Dedicated inboxes per workflow stage."
          >
            <ul className="divide-y divide-border rounded-lg border border-border">
              {mailboxes.map((m) => (
                <li key={m.addr} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <IdText>{m.addr}</IdText>
                    <div className="mt-0.5 text-caption text-muted-foreground">{m.purpose}</div>
                  </div>
                  <StatusBadge tone="success" dot>Active</StatusBadge>
                </li>
              ))}
            </ul>

            <div className="mt-5">
              <div className="mb-2 text-eyebrow text-muted-foreground">Aliases</div>
              <ul className="divide-y divide-border rounded-lg border border-border">
                {aliases.map((a) => (
                  <li key={a.alias} className="flex items-center justify-between px-4 py-2.5">
                    <IdText>{a.alias}</IdText>
                    <span className="text-caption text-muted-foreground">
                      → <IdText>{a.forwards}</IdText>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </SectionCard>
        </TabsContent>

        {/* --------- Masters --------- */}
        <TabsContent value="masters" className="mt-0">
          <SectionCard
            title="Port / Warehouse master"
            desc="Canonical origin and destination points."
            headerActions={
              <Button variant="outline" size="sm" className="h-8">
                <Plus className="mr-1.5 h-3.5 w-3.5" /> Add location
              </Button>
            }
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 md:grid-cols-3">
              {ports.map((p) => (
                <div key={p.name} className="flex items-center justify-between py-2">
                  <span className="flex items-center gap-2 text-body">
                    <span aria-hidden className="text-[16px] leading-none">{p.flag}</span>
                    {p.name}
                  </span>
                  <span className="text-caption text-muted-foreground">{p.country}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </TabsContent>

        {/* --------- Pricing & Currency --------- */}
        <TabsContent value="pricing" className="mt-0 space-y-5">
          <SectionCard title="Pricing settings" desc="Default margins and buffers by category.">
            <ul className="divide-y divide-border">
              <li className="flex items-center justify-between py-2.5">
                <span className="text-body">Global default</span>
                <span className="font-mono text-body font-semibold tabular-nums text-primary">22%</span>
              </li>
              {categoryMargins.map(([k, v]) => (
                <li key={k} className="flex items-center justify-between py-2.5">
                  <span className="text-body">{k}</span>
                  <span className="font-mono text-body tabular-nums">{v}</span>
                </li>
              ))}
              <li className="flex items-center justify-between py-2.5">
                <span className="text-body text-muted-foreground">Buffer</span>
                <span className="font-mono text-body tabular-nums text-muted-foreground">3%</span>
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Currency settings" desc="Base currency, rate source and lock policy.">
            <ul className="divide-y divide-border">
              {currency.map(([k, v]) => (
                <li key={k} className="flex items-center justify-between py-2.5">
                  <span className="text-body text-muted-foreground">{k}</span>
                  <span className="text-body font-medium">{v}</span>
                </li>
              ))}
            </ul>
          </SectionCard>
        </TabsContent>

        {/* --------- Automation --------- */}
        <TabsContent value="automation" className="mt-0 space-y-5">
          <SectionCard title="Email templates" desc="Templates for each workflow stage.">
            <ul className="divide-y divide-border">
              {templates.map((t) => (
                <li key={t} className="flex items-center justify-between py-2.5">
                  <span className="text-body">{t}</span>
                  <Button size="sm" variant="ghost" className="h-7 px-2 text-caption">Edit</Button>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard title="Approval rules" desc="When AI auto-approves vs. requires human.">
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full text-body">
                <thead className="bg-surface-muted">
                  <tr>
                    <th className="px-4 py-2 text-left text-label uppercase text-muted-foreground">Condition</th>
                    <th className="w-40 px-4 py-2 text-left text-label uppercase text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {approvalRules.map((r) => (
                    <tr key={r.condition} className="border-t border-border/60">
                      <td className="px-4 py-2.5 text-foreground">{r.condition}</td>
                      <td className="px-4 py-2.5">
                        <WorkflowBadge state={r.mode} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </TabsContent>

        {/* --------- Suppliers --------- */}
        <TabsContent value="suppliers" className="mt-0 space-y-5">
          <SectionCard title="Supplier sourcing library" desc="Connected sources for discovery.">
            <ul className="divide-y divide-border">
              {sources.map((s) => (
                <li key={s} className="flex items-center justify-between py-2.5">
                  <span className="text-body">{s}</span>
                  <WorkflowBadge state="connected" />
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard title="Rating rules" desc="How supplier ratings are computed.">
            {/* Stacked weight bar */}
            <div className="flex h-2.5 w-full overflow-hidden rounded-full">
              {ratingWeights.map((w) => (
                <div key={w.label} className={w.color} style={{ width: `${w.pct}%` }} />
              ))}
            </div>
            <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
              {ratingWeights.map((w) => (
                <li key={w.label} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-body">
                    <span className={`h-2.5 w-2.5 rounded-sm ${w.color}`} />
                    {w.label}
                  </span>
                  <span className="font-mono text-body font-medium tabular-nums">{w.pct}%</span>
                </li>
              ))}
            </ul>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </>
  );
}
