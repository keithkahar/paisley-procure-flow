import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Bell, Menu, X, Search } from "lucide-react";
import { IconRail, useActiveNav, BrandMark, NAV } from "./Navigation";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function AppShell() {
  const active = useActiveNav();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  return (
    <div className="flex min-h-screen w-full bg-surface-sunken text-foreground">
      {/* Desktop left icon rail */}
      <aside className="sticky top-0 hidden h-screen w-[var(--rail-w)] shrink-0 bg-rail md:block">
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
        {/* Top bar — logo left, notifications + avatar right. Clean, no greeting text, no redundant search. */}
        <header className="sticky top-0 z-30 flex h-[var(--topbar-h)] items-center gap-4 border-b border-border bg-surface/85 px-[var(--topbar-px)] backdrop-blur">
          <button
            className="rounded-md p-2 text-foreground hover:bg-muted md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex min-w-0 items-center">
            <BrandMark variant="wordmark" />
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* Expanding search — icon collapses into a pill input on click */}
            <div className="flex items-center">
              <div
                className={cn(
                  "relative overflow-hidden transition-[width,opacity] duration-200 ease-out",
                  searchOpen ? "w-[220px] md:w-[320px] opacity-100 mr-1" : "w-0 opacity-0",
                )}
              >
                <input
                  ref={searchInputRef}
                  placeholder="Search RFQs, suppliers, orders…"
                  onBlur={(e) => { if (!e.currentTarget.value) setSearchOpen(false); }}
                  onKeyDown={(e) => { if (e.key === "Escape") setSearchOpen(false); }}
                  className="h-9 w-full rounded-full border border-border bg-surface-muted pl-4 pr-9 text-caption text-foreground placeholder:text-muted-foreground/70 outline-none focus:border-primary/30 focus:bg-surface focus:ring-2 focus:ring-primary/15"
                />
              </div>
              <button
                aria-label="Search"
                onClick={() => setSearchOpen((v) => !v)}
                className={cn(
                  "inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors",
                  searchOpen
                    ? "bg-primary-soft text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Search className="h-[18px] w-[18px]" strokeWidth={2} />
              </button>
            </div>

            <button
              aria-label="Notifications"
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Bell className="h-[18px] w-[18px]" strokeWidth={2} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
            </button>

            <div className="ml-1 hidden md:flex items-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-brand text-caption font-semibold text-primary-foreground ring-2 ring-white shadow-sm">
                LK
              </div>
            </div>
          </div>
        </header>

        {/* Content — full width, no right rail */}
        <main className="min-w-0 flex-1 overflow-x-hidden">
          <div className="mx-auto w-full max-w-[1280px] px-4 py-8 md:px-10 md:py-10 animate-fade-in">
            <Outlet context={{ active }} />
          </div>
        </main>
      </div>
    </div>
  );
}
