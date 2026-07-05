import { PageHeader, StatusBadge, Card, WorkflowBadge, SupplierTypeBadge, RiskBadge, ConfidenceBadge, Chip } from "@/components/mos/Primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Globe, ShieldCheck, Plus } from "lucide-react";

const libs = [
  { name: "Alibaba Verified", status: "active", results: 214 },
  { name: "Made-in-China", status: "active", results: 96 },
  { name: "Global Sources", status: "active", results: 41 },
  { name: "Internal supplier CRM", status: "active", results: 128 },
];

const cats = ["All", "Marine hardware", "Electronics", "Textiles", "Valves & fittings", "Packaging"];

const suppliers = [
  { id: "SUP-CN-0081", name: "Ningbo Ocean Fittings Co., Ltd", city: "Ningbo, Zhejiang", type: "Factory", conf: 94, contact: "Complete", risk: "Low", cat: "Marine hardware", site: "oceanfittings.cn" },
  { id: "SUP-CN-0082", name: "Xiamen Bluewave Marine Supplies", city: "Xiamen, Fujian", type: "Factory", conf: 88, contact: "Partial", risk: "Low", cat: "Marine hardware", site: "bluewave-marine.com" },
  { id: "SUP-CN-0083", name: "Guangzhou Harbor Trading Co.", city: "Guangzhou, Guangdong", type: "Trader", conf: 71, contact: "Complete", risk: "Medium", cat: "Marine hardware", site: "gzharbor.com.cn" },
  { id: "SUP-CN-0084", name: "Qingdao Steel Rig Manufacture", city: "Qingdao, Shandong", type: "Factory", conf: 91, contact: "Complete", risk: "Low", cat: "Valves & fittings", site: "qdsteelrig.com" },
  { id: "SUP-CN-0085", name: "Shenzhen Boya Electronics", city: "Shenzhen, Guangdong", type: "Factory", conf: 89, contact: "Complete", risk: "Low", cat: "Electronics", site: "boya-elec.com" },
];

export default function SupplierDiscovery() {
  return (
    <>
      <PageHeader
        eyebrow="Step 2 of 8"
        title="Supplier discovery"
        description="Search across verified libraries and generate a ranked candidate list for each RFQ item."
        actions={
          <>
            <Button variant="outline" size="sm">Discovery settings</Button>
            <Button size="sm">Generate candidates</Button>
          </>
        }
      />

      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {libs.map((l) => (
          <div key={l.name} className="card-surface p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-caption font-medium text-muted-foreground">{l.name}</div>
                <div className="mt-1 font-display text-xl font-bold">{l.results}</div>
                <div className="text-caption text-muted-foreground">matches this week</div>
              </div>
              <WorkflowBadge state="active" />
              <span className="sr-only">{l.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4 card-surface p-3 md:p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search item, category, HS code, region…" className="h-10 pl-9" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {cats.map((c, i) => (
              <Chip key={c} active={i === 0}>{c}</Chip>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {suppliers.map((s) => (
          <article key={s.id} className="card-surface p-4 flex flex-col">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-mono text-muted-foreground">{s.id}</span>
                  <SupplierTypeBadge type={s.type} />
                </div>
                <h4 className="mt-1 font-display text-subtitle font-semibold leading-snug">{s.name}</h4>
              </div>
              <div className="flex flex-col items-end gap-1">
                <ConfidenceBadge value={s.conf} showLabel />
                <div className="text-label uppercase text-muted-foreground">Match</div>
              </div>
            </div>
            <div className="mt-2 space-y-1 text-caption text-muted-foreground">
              <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {s.city}</div>
              <div className="flex items-center gap-1.5"><Globe className="h-3.5 w-3.5" /> {s.site}</div>
              <div className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Contact: {s.contact}</div>
              <div className="flex items-center gap-1.5"><RiskBadge level={s.risk} /></div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
              <StatusBadge tone="muted">{s.cat}</StatusBadge>
              <Button size="sm" variant="outline"><Plus className="mr-1 h-3.5 w-3.5" /> Add to review</Button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
