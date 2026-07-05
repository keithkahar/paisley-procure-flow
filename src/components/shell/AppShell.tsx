import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Bell, Menu, Search, X } from "lucide-react";
import { IconRail, useActiveNav, BrandMark, NAV } from "./Navigation";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function AppShell() {
  const active = useActiveNav();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
    setAiOpen(false);
    setSearchOpen(false);
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
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <BrandMark variant="mark" />
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="rounded-md p-1.5 text-white/70 hover:bg-white/10"
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
                            ? "bg-white text-primary shadow-sm"
                            : "text-white/80 hover:bg-white/10",
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
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-surface/85 px-4 backdrop-blur md:px-8">
          <button
            className="rounded-md p-2 text-foreground hover:bg-muted md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Wordmark logo replaces step / title text */}
          <div className="flex min-w-0 items-center">
            <BrandMark variant="wordmark" />
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* Compact search — magnifier only, expands on demand */}
            <div className="relative hidden md:flex items-center">
              {searchOpen ? (
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    autoFocus
                    onBlur={() => setSearchOpen(false)}
                    placeholder="Search…"
                    className="h-9 w-56 rounded-full border border-border bg-surface-muted pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary/25"
                  />
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  aria-label="Search"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-muted text-muted-foreground hover:text-foreground"
                >
                  <Search className="h-4 w-4" />
                </button>
              )}
            </div>

            <button
              aria-label="Notifications"
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Bell className="h-[18px] w-[18px]" strokeWidth={2} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
            </button>

            {/* Greeting profile like reference image 6 */}
            <div className="hidden items-center gap-2.5 pl-2 md:flex">
              <div className="leading-tight text-right">
                <div className="text-[13px] text-muted-foreground">Hi!</div>
                <div className="font-display text-[14px] font-semibold text-foreground -mt-0.5">Lena K.</div>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand text-[12px] font-semibold text-primary-foreground ring-2 ring-white shadow-sm">
                LK
              </div>
            </div>
          </div>
        </header>

        {/* Content + AI panel */}
        <div className="flex min-w-0 flex-1">
          <main className="min-w-0 flex-1 overflow-x-hidden">
            <div className="mx-auto w-full max-w-[1400px] px-4 py-6 md:px-8 md:py-8 animate-fade-in">
              <Outlet context={{ setAiOpen, active }} />
            </div>
          </main>

          {/* Desktop AI panel */}
          <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-[340px] shrink-0 border-l border-border bg-surface lg:block">
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
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="leading-tight">
          <div className="text-[13px] font-semibold text-foreground">Paisley AI</div>
          <div className="text-[11px] text-muted-foreground">Insights for this view</div>
        </div>
        {onClose && (
          <button className="rounded-md p-1.5 text-muted-foreground hover:bg-muted" onClick={onClose}>
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="scroll-thin flex-1 space-y-3 overflow-y-auto p-5">
        <PanelCard tone="warning" title="Risk Alert" body="Supplier SUP-CN-0083 shows two shipment delays in the last 60 days. Consider adding a backup supplier for RFQ-014." />
        <PanelCard tone="primary" title="Recommendation" body="Batch-approve 4 first-contact emails for RFQ-011 to shorten lead time by ~1.5 days." />
        <div className="rounded-2xl border border-border bg-surface-muted p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-[12px] font-semibold text-foreground">Automation confidence</div>
            <div className="text-[12px] font-semibold text-primary">86%</div>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
            <div className="h-full rounded-full bg-gradient-brand" style={{ width: "86%" }} />
          </div>
          <div className="mt-2 text-[11px] text-muted-foreground">Based on 14 signals across quote parsing and supplier match.</div>
        </div>
        <div className="rounded-2xl border border-primary/15 bg-primary-soft p-4">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-primary">Next best action</div>
          <div className="mt-1 text-[13.5px] font-semibold text-foreground">Approve buyer quotation Q-2041</div>
          <p className="mt-1 text-[12px] text-muted-foreground">Margin 22.4% · 3 items · Ready to send to Nordic Marine AB.</p>
          <button className="mt-3 h-8 w-full rounded-md bg-primary text-[12px] font-medium text-primary-foreground hover:bg-primary-hover">
            Open quotation
          </button>
        </div>
      </div>
    </div>
  );
}

function PanelCard({ tone, title, body }: { tone: "warning" | "primary" | "success"; title: string; body: string }) {
  const toneMap = {
    warning: "border-warning/25 bg-warning-soft",
    primary: "border-primary/15 bg-primary-soft",
    success: "border-success/25 bg-success-soft",
  } as const;
  const dot = {
    warning: "bg-warning",
    primary: "bg-primary",
    success: "bg-success",
  } as const;
  return (
    <div className={cn("rounded-2xl border p-4", toneMap[tone])}>
      <div className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-foreground/70">
        <span className={cn("inline-block h-1.5 w-1.5 rounded-full", dot[tone])} />
        {title}
      </div>
      <p className="mt-1.5 text-[12.5px] leading-relaxed text-foreground/85">{body}</p>
    </div>
  );
}
