import { PageHeader, Card, WorkflowBadge } from "@/components/mos/Primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Warehouse, Percent, Coins, FileText, ShieldCheck, Library, Star } from "lucide-react";
import type { ReactNode } from "react";

const mailboxes = [
  { addr: "sourcing@paisley-ec.com",  purpose: "Supplier inquiry / RFQ correspondence" },
  { addr: "quotation@paisley-ec.com", purpose: "Buyer quotation delivery" },
  { addr: "order@paisley-ec.com",     purpose: "Order tracking & shipment updates" },
];

const aliases = [
  { alias: "po@paisley-ec.com", forwards: "order@paisley-ec.com" },
  { alias: "orders@paisley-ec.com", forwards: "order@paisley-ec.com" },
];

export default function Settings() {
  return (
    <>
      <PageHeader
        eyebrow="Configuration"
        title="Settings"
        description="Operational configuration for mailboxes, ports, pricing, currency, templates, approval rules, and rating."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <SettingsCard icon={<Mail className="h-4 w-4" />} title="Mailboxes" desc="Dedicated inboxes per workflow stage.">
          <ul className="space-y-2">
            {mailboxes.map((m) => (
              <li key={m.addr} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <div className="font-mono text-body font-semibold">{m.addr}</div>
                  <div className="text-caption text-muted-foreground">{m.purpose}</div>
                </div>
                <StatusBadge tone={m.tone} dot>Active</StatusBadge>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <div className="section-title mb-1.5">Aliases</div>
            <ul className="space-y-1.5">
              {aliases.map((a) => (
                <li key={a.alias} className="flex items-center justify-between text-body">
                  <span className="font-mono">{a.alias}</span>
                  <span className="text-muted-foreground">→ {a.forwards}</span>
                </li>
              ))}
            </ul>
          </div>
        </SettingsCard>

        <SettingsCard icon={<Warehouse className="h-4 w-4" />} title="Port / Warehouse master" desc="Canonical origin and destination points.">
          <div className="grid grid-cols-2 gap-2 text-body">
            {[
              ["Ningbo Beilun", "CN"],
              ["Shanghai Yangshan", "CN"],
              ["Shenzhen Yantian", "CN"],
              ["Qingdao Qianwan", "CN"],
              ["Gothenburg", "SE"],
              ["Trieste", "IT"],
              ["Rotterdam", "NL"],
              ["Felixstowe", "UK"],
            ].map(([n, c]) => (
              <div key={n} className="flex items-center justify-between rounded-md border border-border px-3 py-2">
                <span>{n}</span>
                <span className="text-caption text-muted-foreground">{c}</span>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="mt-3">Add location</Button>
        </SettingsCard>

        <SettingsCard icon={<Percent className="h-4 w-4" />} title="Pricing settings" desc="Default margins and buffers by category.">
          <div className="space-y-2">
            {[
              ["Global default", "22%"],
              ["Marine hardware", "22%"],
              ["Electronics", "28%"],
              ["Valves & fittings", "20%"],
              ["Packaging", "18%"],
              ["Buffer", "3%"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-body">
                <span>{k}</span>
                <Input defaultValue={v as string} className="h-8 w-20 text-right" />
              </div>
            ))}
          </div>
        </SettingsCard>

        <SettingsCard icon={<Coins className="h-4 w-4" />} title="Currency settings" desc="Base currency, rate source and lock policy.">
          <div className="space-y-2 text-body">
            <RowLine label="Base currency">USD</RowLine>
            <RowLine label="Buyer-facing default">EUR</RowLine>
            <RowLine label="Rate source">ECB · daily</RowLine>
            <RowLine label="Lock at">Quotation send</RowLine>
          </div>
        </SettingsCard>

        <SettingsCard icon={<FileText className="h-4 w-4" />} title="Email templates" desc="Templates for each workflow stage.">
          <ul className="space-y-1.5 text-body">
            {["First contact — combined inquiry + background", "RFQ round 1 / 2 / 3", "Quote clarification", "Buyer quotation cover email", "Order confirmation", "Shipment notification"].map((t) => (
              <li key={t} className="flex items-center justify-between rounded-md border border-border px-3 py-2">
                <span>{t}</span>
                <Button size="sm" variant="ghost">Edit</Button>
              </li>
            ))}
          </ul>
        </SettingsCard>

        <SettingsCard icon={<ShieldCheck className="h-4 w-4" />} title="Approval rules" desc="When AI auto-approves vs. requires human.">
          <ul className="space-y-2 text-body">
            <li className="flex items-start gap-2"><StatusBadge tone="success">Auto</StatusBadge><span>Quote parse confidence &ge; 90% and no missing fields</span></li>
            <li className="flex items-start gap-2"><StatusBadge tone="warning">Human</StatusBadge><span>Supplier is a trading company or new to database</span></li>
            <li className="flex items-start gap-2"><StatusBadge tone="danger">Human</StatusBadge><span>Buyer quotation total &gt; € 50,000</span></li>
            <li className="flex items-start gap-2"><StatusBadge tone="warning">Human</StatusBadge><span>Delivery basis is DDP</span></li>
          </ul>
        </SettingsCard>

        <SettingsCard icon={<Library className="h-4 w-4" />} title="Supplier sourcing library" desc="Connected sources for discovery.">
          <ul className="space-y-1.5 text-body">
            {["Alibaba Verified", "Made-in-China", "Global Sources", "Internal supplier CRM", "Historical order suppliers"].map((s) => (
              <li key={s} className="flex items-center justify-between rounded-md border border-border px-3 py-2">
                <span>{s}</span>
                <StatusBadge tone="success" dot>Connected</StatusBadge>
              </li>
            ))}
          </ul>
        </SettingsCard>

        <SettingsCard icon={<Star className="h-4 w-4" />} title="Rating rules" desc="How supplier ratings are computed.">
          <ul className="space-y-1.5 text-body">
            <li>• On-time delivery — 30%</li>
            <li>• Quote accuracy — 25%</li>
            <li>• Response speed — 15%</li>
            <li>• Quality (inspection pass rate) — 20%</li>
            <li>• Communication clarity — 10%</li>
          </ul>
        </SettingsCard>
      </div>
    </>
  );
}

function SettingsCard({ icon, title, desc, children }: { icon: ReactNode; title: string; desc: string; children: ReactNode }) {
  return (
    <Card>
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">{icon}</div>
          <div>
            <h3 className="font-display text-subtitle font-semibold">{title}</h3>
            <p className="text-caption text-muted-foreground">{desc}</p>
          </div>
        </div>
      </div>
      {children}
    </Card>
  );
}

function RowLine({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-border px-3 py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{children}</span>
    </div>
  );
}
