import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Bell, HelpCircle, Menu, Search, Sparkles, X } from "lucide-react";
import { IconRail, useActiveNav, BrandMark, NAV } from "./Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function AppShell() {
  const active = useActiveNav();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
    setAiOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen w-full bg-surface-sunken text-foreground">
      {/* Desktop left icon rail */}
      <aside className="sticky top-0 hidden h-screen w-[96px] shrink-0 bg-rail md:block">
        <IconRail />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col bg-rail text-rail-foreground shadow-lg">
            <div className="flex items-center justify-between border-b border-rail-hover/60 px-4 py-3">
              <BrandMark compact={false} />
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="rounded-md p-1.5 text-rail-muted hover:bg-rail-hover"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-3">
              <ul className="space-y-1">
                {NAV.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
                          isActive
                            ? "bg-background text-primary shadow-sm"
                            : "text-rail-foreground/80 hover:bg-rail-hover",
                        )
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.full}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-surface/85 px-4 backdrop-blur md:px-6">
          <button
            className="rounded-md p-2 text-foreground hover:bg-muted md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex min-w-0 items-center gap-2">
            <div className="hidden md:block">
              <div className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                {active.step ? `Step ${active.step} / 8` : "Workspace"}
              </div>
              <h1 className="font-display text-[15px] font-semibold leading-none text-foreground">{active.full}</h1>
            </div>
            <div className="md:hidden">
              <h1 className="font-display text-base font-semibold text-foreground">{active.full}</h1>
            </div>
          </div>

          <div className="relative ml-auto hidden max-w-md flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search projects, suppliers, RFQs, orders…"
              className="h-9 pl-9 bg-surface-muted border-border focus-visible:ring-primary/30"
            />
          </div>

          <div className="ml-auto flex items-center gap-1 md:ml-0">
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:inline-flex text-muted-foreground hover:text-foreground"
              onClick={() => setAiOpen((v) => !v)}
            >
              <Sparkles className="h-4 w-4 mr-1.5 text-primary" />
              Assistant
            </Button>
            <button
              className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={() => setAiOpen((v) => !v)}
              aria-label="AI Assistant"
            >
              <Sparkles className="h-4 w-4 text-primary" />
            </button>
            <button className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground">
              <HelpCircle className="h-4 w-4" />
            </button>
            <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
            </button>
            <div className="ml-1 hidden items-center gap-2 rounded-full border border-border bg-surface pl-1 pr-3 py-1 md:flex">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-brand text-[11px] font-semibold text-primary-foreground">
                LK
              </div>
              <div className="leading-tight">
                <div className="text-[12px] font-semibold text-foreground">Lena K.</div>
                <div className="text-[10px] text-muted-foreground">Ops Manager</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content + AI panel */}
        <div className="flex min-w-0 flex-1">
          <main className="min-w-0 flex-1 overflow-x-hidden">
            <div className="mx-auto w-full max-w-[1400px] px-4 py-5 md:px-6 md:py-6 animate-fade-in">
              <Outlet context={{ setAiOpen }} />
            </div>
          </main>

          {/* Desktop AI panel */}
          <aside
            className={cn(
              "sticky top-14 hidden h-[calc(100vh-3.5rem)] w-[340px] shrink-0 border-l border-border bg-surface",
              "lg:block",
              !aiOpen && "lg:block",
            )}
          >
            <AIPanel />
          </aside>

          {/* Mobile/tablet AI drawer */}
          {aiOpen && (
            <div className="fixed inset-0 z-40 lg:hidden">
              <div className="absolute inset-0 bg-foreground/40" onClick={() => setAiOpen(false)} />
              <aside className="absolute inset-y-0 right-0 flex w-[92vw] max-w-[380px] flex-col border-l border-border bg-surface shadow-lg">
                <AIPanel onClose={() => setAiOpen(false)} />
              </aside>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AIPanel({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-brand">
            <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <div className="text-[13px] font-semibold text-foreground">Paisley AI</div>
            <div className="text-[10px] text-muted-foreground">Insights for this view</div>
          </div>
        </div>
        {onClose && (
          <button className="rounded-md p-1.5 text-muted-foreground hover:bg-muted" onClick={onClose}>
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="scroll-thin flex-1 space-y-3 overflow-y-auto p-4">
        <PanelCard tone="warning" title="Risk Alert" body="Supplier SUP-CN-0083 shows two shipment delays in the last 60 days. Consider adding backup supplier for RFQ-014." />
        <PanelCard tone="primary" title="Recommendation" body="Batch-approve 4 first-contact emails for RFQ-011 to shorten lead time by ~1.5 days." />
        <div className="rounded-xl border border-border bg-surface-muted p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-[12px] font-semibold text-foreground">Automation confidence</div>
            <div className="text-[12px] font-semibold text-primary">86%</div>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
            <div className="h-full rounded-full bg-gradient-brand" style={{ width: "86%" }} />
          </div>
          <div className="mt-2 text-[11px] text-muted-foreground">Based on 14 signals across quote parsing and supplier match.</div>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary-soft p-4">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-primary">Next best action</div>
          <div className="mt-1 text-[13px] font-semibold text-foreground">Approve buyer quotation Q-2041</div>
          <p className="mt-1 text-[12px] text-muted-foreground">Margin 22.4% • 3 items • Ready to send to Nordic Marine AB.</p>
          <Button size="sm" className="mt-3 h-8 w-full">Open quotation</Button>
        </div>
      </div>
    </div>
  );
}

function PanelCard({ tone, title, body }: { tone: "warning" | "primary" | "success"; title: string; body: string }) {
  const toneMap = {
    warning: "border-warning/30 bg-warning-soft text-warning-foreground",
    primary: "border-primary/20 bg-primary-soft text-foreground",
    success: "border-success/30 bg-success-soft text-foreground",
  } as const;
  const dot = {
    warning: "bg-warning",
    primary: "bg-primary",
    success: "bg-success",
  } as const;
  return (
    <div className={cn("rounded-xl border p-4", toneMap[tone])}>
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest">
        <span className={cn("inline-block h-1.5 w-1.5 rounded-full", dot[tone])} />
        {title}
      </div>
      <p className="mt-1.5 text-[12.5px] leading-relaxed text-foreground/85">{body}</p>
    </div>
  );
}
