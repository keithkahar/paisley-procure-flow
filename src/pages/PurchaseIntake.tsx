import { PageHeader, KpiTile, Card, WorkflowBadge, MissingFieldBadge, type WorkflowState } from "@/components/mos/Primitives";
import { Button } from "@/components/ui/button";
import { AlertCircle, Inbox, Upload, Sparkles, ArrowRight } from "lucide-react";

const lists: Array<{
  id: string;
  buyer: string;
  country: string;
  items: number;
  missing: string[];
  state: WorkflowState;
}> = [
  { id: "PH-004", buyer: "Nordic Marine AB",    country: "Sweden",  items: 18, missing: ["Delivery basis", "Target currency"], state: "needs_info" },
  { id: "PH-005", buyer: "Baltic Trawlers OY",  country: "Finland", items: 6,  missing: [],                                    state: "ready" },
  { id: "PH-006", buyer: "Adriatico Naval SRL", country: "Italy",   items: 12, missing: ["Contact person", "Delivery location"], state: "needs_info" },
  { id: "PH-007", buyer: "Coastline Yachts Ltd", country: "UK",     items: 9,  missing: ["Buyer company registration"],        state: "blocked" },
];

export default function PurchaseIntake() {
  return (
    <>
      <PageHeader
        eyebrow="Step 1 of 8"
        title="Purchase intake"
        description="Ingest buyer purchase lists, capture missing information, and hand off to supplier discovery."
        actions={
          <>
            <Button variant="outline" size="sm"><Upload className="mr-1.5 h-4 w-4" /> Import CSV</Button>
            <Button size="sm"><Inbox className="mr-1.5 h-4 w-4" /> New intake</Button>
          </>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiTile label="Open intakes" value={11} icon={<Inbox className="h-4 w-4" />} />
        <KpiTile label="Missing information" value={7} tone="warning" icon={<AlertCircle className="h-4 w-4" />} />
        <KpiTile label="Ready to discover" value={3} tone="success" />
        <KpiTile label="Avg completion time" value="2h" hint="From email arrival" tone="muted" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-3">
          {lists.map((l) => (
            <article key={l.id} className="card-surface p-4 md:p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-mono text-muted-foreground">{l.id}</span>
                    <WorkflowBadge state={l.state} />
                  </div>
                  <h4 className="mt-1.5 font-display text-subtitle font-semibold">{l.buyer}</h4>
                  <div className="mt-1 text-caption text-muted-foreground">
                    {l.country} <span className="divider-dot" /> {l.items} items
                  </div>
                  {l.missing.length > 0 && (
                    <div className="mt-3 rounded-lg border border-warning/30 bg-warning-soft/60 p-3">
                      <div className="text-label uppercase text-warning-foreground/80">
                        Missing fields
                      </div>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {l.missing.map((m) => (
                          <MissingFieldBadge key={m} field={m} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 md:shrink-0">
                  {l.missing.length > 0 ? (
                    <Button size="sm" variant="outline">Request missing info</Button>
                  ) : null}
                  <Button size="sm" disabled={l.state !== "ready"}>
                    Start supplier discovery <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <Card>
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <div className="section-title">Required intake fields</div>
          </div>
          <ul className="mt-2 space-y-2 text-body">
            {[
              "Buyer company (legal name)",
              "Contact person & email",
              "Country / port of delivery",
              "Delivery basis (EXW / FOB / CIF / DAP / DDP)",
              "Delivery location or warehouse",
              "Target currency",
              "Item list with specs & quantities",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-foreground/85">{f}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-lg bg-primary-soft p-3 text-caption text-foreground/80">
            Paisley AI auto-detects 5 of 7 fields from typical buyer emails and PDFs.
          </div>
        </Card>
      </div>
    </>
  );
}
