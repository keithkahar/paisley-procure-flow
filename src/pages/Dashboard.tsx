import { useState } from "react";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ArrowUpRight, ArrowDownRight, Search } from "lucide-react";
import { Slider } from "@/components/ui/slider";

/* ----------------------------- mock data ----------------------------- */

const spark1 = [12, 18, 14, 22, 19, 26, 24, 31, 28, 34, 33, 42].map((v, i) => ({ i, v }));
const spark2 = [8, 10, 9, 12, 11, 14, 13, 15, 14, 17, 16, 19].map((v, i) => ({ i, v }));

const pipeline = [
  { name: "RFQ in progress", value: 42, color: "hsl(214 99% 37%)" },
  { name: "Quotes under review", value: 18, color: "hsl(214 90% 62%)" },
  { name: "Awaiting supplier", value: 23, color: "hsl(218 20% 72%)" },
  { name: "Orders in production", value: 14, color: "hsl(218 24% 88%)" },
];
const pipelineTotal = pipeline.reduce((s, p) => s + p.value, 0);

const history = [
  { day: "12", mo: "NOV", label: "RFQ-014 · Quote approved", value: "$ 24,800" },
  { day: "12", mo: "NOV", label: "SUP-CN-0083 · Supplier onboarded", value: "—" },
  { day: "11", mo: "NOV", label: "PO-2041 · Sent to Nordic Marine", value: "$ 18,320" },
  { day: "11", mo: "NOV", label: "RFQ-011 · 6 suppliers contacted", value: "—" },
  { day: "10", mo: "NOV", label: "Q-2038 · Parsed & staged", value: "$ 9,470" },
];

/* ----------------------------- page ----------------------------- */

export default function Dashboard() {
  const [qty, setQty] = useState([1200]);
  const [target, setTarget] = useState([18]);
  const [lead, setLead] = useState([35]);

  const estOrder = qty[0] * target[0];
  const estMargin = Math.max(8, Math.round(28 - (target[0] - 12) * 0.6));

  return (
    <div className="space-y-6">
      {/* Top: search bar row (kept subtle to match template feel) */}
      <div className="flex items-center justify-between">
        <h1 className="font-display text-title font-semibold tracking-tight text-foreground">
          Dashboard
        </h1>
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search RFQs, suppliers, orders…"
            className="h-11 w-[380px] rounded-full border border-transparent bg-surface-muted pl-11 pr-4 text-body text-foreground placeholder:text-muted-foreground/70 outline-none focus:border-primary/30 focus:bg-surface focus:ring-2 focus:ring-primary/15"
          />
        </div>
      </div>

      {/* Row 1: two sparkline KPIs (left, stacked) + donut (right) */}
      <div className="grid gap-5 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-5">
          <SparkKpi
            label="Active RFQs"
            value="42"
            delta="+3.56%"
            positive
            data={spark1}
            stroke="hsl(214 99% 37%)"
            fill="hsl(214 99% 37% / 0.14)"
          />
          <SparkKpi
            label="Quotes parsed · MTD"
            value="19"
            delta="+1.62%"
            positive
            data={spark2}
            stroke="hsl(30 36% 55%)"
            fill="hsl(30 36% 68% / 0.22)"
          />
        </div>

        <div className="lg:col-span-3 rounded-2xl border border-border/70 bg-surface p-6 shadow-[var(--shadow-sm)]">
          <div className="text-label uppercase text-muted-foreground">
            Pipeline status
          </div>

          <div className="mt-4 flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">
            <div className="relative h-[220px] w-[220px] shrink-0">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pipeline}
                    dataKey="value"
                    innerRadius={80}
                    outerRadius={104}
                    paddingAngle={2}
                    stroke="none"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {pipeline.map((p) => (
                      <Cell key={p.name} fill={p.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 10,
                      border: "1px solid hsl(var(--border))",
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-label uppercase text-muted-foreground">
                  Active items
                </div>
                <div className="mt-1 font-display text-display font-bold text-foreground">
                  {pipelineTotal}
                </div>
              </div>
            </div>

            <ul className="w-full space-y-3 md:max-w-[240px]">
              {pipeline.map((p) => (
                <li key={p.name} className="flex items-center justify-between text-body">
                  <div className="flex items-center gap-2.5 text-foreground/85">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: p.color }}
                    />
                    {p.name}
                  </div>
                  <span className="font-display text-body font-semibold text-foreground">
                    {p.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Row 2: sourcing simulator + recent activity */}
      <div className="grid gap-5 lg:grid-cols-5">
        <div className="lg:col-span-3 flex h-full flex-col rounded-2xl border border-border/70 bg-surface p-6 shadow-[var(--shadow-sm)]">
          <div className="flex items-center justify-between">
            <div className="text-label uppercase text-muted-foreground">
              Sourcing simulator
            </div>
            <span className="text-caption text-muted-foreground">
              Estimates for planning · non-binding
            </span>
          </div>

          <div className="mt-5 flex-1 space-y-5">
            <SliderRow
              label="Order quantity"
              value={`${qty[0].toLocaleString()} units`}
              min={100}
              max={5000}
              step={100}
              val={qty}
              onChange={setQty}
            />
            <SliderRow
              label="Target unit price"
              value={`$ ${target[0].toFixed(2)}`}
              min={5}
              max={80}
              step={1}
              val={target}
              onChange={setTarget}
            />
            <SliderRow
              label="Lead time"
              value={`${lead[0]} days`}
              min={14}
              max={90}
              step={1}
              val={lead}
              onChange={setLead}
            />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <SoftStat label="Estimated order value" value={`$ ${estOrder.toLocaleString()}`} />
            <SoftStat label="Projected gross margin" value={`${estMargin}%`} />
          </div>
        </div>

        <div className="lg:col-span-2 flex h-full flex-col rounded-2xl border border-border/70 bg-surface p-6 shadow-[var(--shadow-sm)]">
          <div className="flex items-center justify-between">
            <div className="text-label uppercase text-muted-foreground">
              Recent activity
            </div>
            <button className="text-caption font-medium text-primary hover:underline">
              View all
            </button>
          </div>
          <ul className="mt-4 flex-1 space-y-2.5">

            {history.map((h, i) => (
              <li
                key={i}
                className="flex items-center gap-3 rounded-xl bg-primary-soft/60 px-3 py-2.5"
              >
                <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg bg-surface text-primary shadow-[var(--shadow-sm)]">
                  <span className="font-display text-body font-bold leading-none">{h.day}</span>
                  <span className="text-mono font-semibold tracking-wider text-muted-foreground">
                    {h.mo}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-caption font-medium text-foreground">
                    {h.label}
                  </div>
                </div>
                <div className="shrink-0 font-display text-body font-semibold text-foreground">
                  {h.value}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- pieces ----------------------------- */

function SparkKpi({
  label,
  value,
  delta,
  positive,
  data,
  stroke,
  fill,
}: {
  label: string;
  value: string;
  delta: string;
  positive?: boolean;
  data: { i: number; v: number }[];
  stroke: string;
  fill: string;
}) {
  const id = label.replace(/\s+/g, "-");
  return (
    <div className="rounded-2xl border border-border/70 bg-surface p-5 shadow-[var(--shadow-sm)]">
      <div className="text-label uppercase text-muted-foreground">
        {label}
      </div>
      <div className="mt-3 flex items-end justify-between gap-4">
        <div className="h-[54px] flex-1">
          <ResponsiveContainer>
            <AreaChart data={data} margin={{ top: 6, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`g-${id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={stroke} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={stroke} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={stroke}
                strokeWidth={2}
                fill={`url(#g-${id})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="text-right">
          <div className="font-display text-display font-bold leading-none tracking-tight text-foreground">
            {value}
          </div>
          <div
            className={`mt-2 inline-flex items-center gap-1 text-caption font-semibold ${
              positive ? "text-success" : "text-destructive"
            }`}
          >
            {positive ? (
              <ArrowUpRight className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" />
            )}
            {delta}
          </div>
        </div>
      </div>
    </div>
  );
}

function SliderRow({
  label,
  value,
  val,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  value: string;
  val: number[];
  onChange: (v: number[]) => void;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <div className="rounded-xl bg-surface-muted px-4 py-3.5">
      <div className="flex items-center justify-between gap-4">
        <span className="whitespace-nowrap text-label uppercase text-muted-foreground">
          {label}
        </span>
        <span className="whitespace-nowrap font-display text-body font-semibold text-foreground">{value}</span>
      </div>
      <div className="mt-2.5">
        <Slider value={val} onValueChange={onChange} min={min} max={max} step={step} />
      </div>
    </div>
  );
}

function SoftStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-primary-soft px-4 py-4 text-center">
      <div className="text-label uppercase text-primary/80">
        {label}
      </div>
      <div className="mt-1.5 font-display text-title font-bold text-primary">{value}</div>
    </div>
  );
}
