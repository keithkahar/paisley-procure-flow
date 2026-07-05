import { PageHeader, KpiTile, StatusBadge, Card } from "@/components/mos/Primitives";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ClipboardList,
  Clock,
  FileCheck2,
  Send,
  UserCheck,
  ArrowRight,
} from "lucide-react";

const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const actions = [
  {
    id: "SUP-CN-0083",
    kind: "Supplier Approval",
    title: "Approve supplier Ningbo Ocean Fittings Co., Ltd",
    meta: "RFQ-011 • Marine hardware • Ningbo, CN",
    due: "Due today",
    priority: "High",
    confidence: 92,
    primary: "Approve",
    tone: "primary" as const,
    icon: UserCheck,
  },
  {
    id: "Q-2038",
    kind: "Quote Review",
    title: "Review parsed quote from Shenzhen Boya Electronics",
    meta: "RFQ-014 • LED navigation kits • 3 items",
    due: "Due in 4h",
    priority: "Medium",
    confidence: 78,
    primary: "Review",
    tone: "gold" as const,
    icon: FileCheck2,
  },
  {
    id: "RFQ-016",
    kind: "RFQ Execution",
    title: "Send RFQ batch to 6 shortlisted suppliers",
    meta: "PH-004 • Industrial valves • FOB Shanghai",
    due: "Scheduled 15:00",
    priority: "Normal",
    confidence: 84,
    primary: "Execute",
    tone: "info" as const,
    icon: Send,
  },
];

export default function Dashboard() {
  return (
    <>
      <PageHeader
        eyebrow={today}
        title="Command center"
        description="Everything waiting for a decision from you, ranked by impact and confidence."
        actions={
          <>
            <Button variant="outline" size="sm">Export daily log</Button>
            <Button size="sm">
              <ClipboardList className="mr-1.5 h-4 w-4" /> Start review queue
            </Button>
          </>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        <KpiTile label="Need decision" value={12} delta="+3 vs yesterday" icon={<UserCheck className="h-4 w-4" />} tone="primary" />
        <KpiTile label="Need review" value={7} hint="3 quotes • 4 emails" icon={<FileCheck2 className="h-4 w-4" />} tone="warning" />
        <KpiTile label="Waiting on supplier" value={23} hint="Across 8 RFQs" icon={<Clock className="h-4 w-4" />} tone="muted" />
        <KpiTile label="Completed today" value={31} delta="+18%" icon={<CheckCircle2 className="h-4 w-4" />} tone="success" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-[15px] font-semibold">Action required</h3>
            <div className="flex items-center gap-2 text-[12px]">
              <StatusBadge tone="muted" dot>Auto-sorted by priority</StatusBadge>
            </div>
          </div>

          <div className="space-y-3">
            {actions.map((a) => (
              <article key={a.id} className="card-surface p-4 md:p-5 hover:shadow-md transition-shadow">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary md:flex">
                      <a.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge tone={a.tone}>{a.kind}</StatusBadge>
                        <span className="text-[11px] font-mono text-muted-foreground">{a.id}</span>
                        <StatusBadge tone={a.priority === "High" ? "danger" : a.priority === "Medium" ? "warning" : "muted"} dot>
                          {a.priority}
                        </StatusBadge>
                      </div>
                      <h4 className="mt-1.5 text-[15px] font-semibold text-foreground">{a.title}</h4>
                      <div className="mt-1 text-[12.5px] text-muted-foreground">
                        {a.meta} <span className="divider-dot" /> {a.due}
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="h-1.5 w-32 overflow-hidden rounded-full bg-border">
                          <div className="h-full rounded-full bg-gradient-brand" style={{ width: `${a.confidence}%` }} />
                        </div>
                        <span className="text-[11.5px] font-medium text-muted-foreground">
                          {a.confidence}% AI confidence
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 md:shrink-0">
                    <Button size="sm">{a.primary}</Button>
                    <Button size="sm" variant="outline">View</Button>
                    <Button size="sm" variant="ghost" className="text-muted-foreground">Defer</Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <div className="section-title mb-3">Pipeline flow</div>
            <ul className="space-y-2.5">
              {[
                ["Intake", 4, "primary"],
                ["Discovery", 9, "primary"],
                ["Candidates", 12, "gold"],
                ["First contact", 18, "info"],
                ["RFQ rounds", 23, "info"],
                ["Quote review", 7, "warning"],
                ["Buyer quotation", 5, "gold"],
                ["Orders", 14, "success"],
              ].map(([label, n, tone]) => (
                <li key={label as string} className="flex items-center justify-between text-[13px]">
                  <div className="flex items-center gap-2 text-foreground/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                    {label}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{n as number}</span>
                    <StatusBadge tone={tone as any}>active</StatusBadge>
                  </div>
                </li>
              ))}
            </ul>
            <Button variant="ghost" size="sm" className="mt-3 h-8 w-full justify-between">
              Open workflow board <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Card>

          <Card>
            <div className="section-title mb-3">This week</div>
            <div className="space-y-3">
              <RowStat label="RFQs sent" value="42" trend="+12" />
              <RowStat label="Quotes parsed" value="61" trend="+8" />
              <RowStat label="Avg turnaround" value="1.8 d" trend="-0.4 d" positive />
              <RowStat label="Auto-approvals" value="27" trend="+5" />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

function RowStat({ label, value, trend, positive }: { label: string; value: string; trend: string; positive?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0 last:pb-0">
      <span className="text-[13px] text-muted-foreground">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className="font-display text-[15px] font-semibold">{value}</span>
        <span className={`text-[11px] font-medium ${positive ? "text-success" : "text-primary"}`}>{trend}</span>
      </div>
    </div>
  );
}
