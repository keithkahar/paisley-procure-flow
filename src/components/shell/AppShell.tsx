import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { IconRail, useActiveNav, BrandMark, NAV } from "./Navigation";
import { UserMenu } from "./UserMenu";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function AppShell() {
  const active = useActiveNav();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen w-full bg-surface-sunken text-foreground">
      {/* Desktop left icon rail */}
      <aside className="sticky top-0 hidden h-screen w-[var(--rail-w)] shrink-0 bg-rail md:block">
        <IconRail />
      </aside>

      {/* Mobile drawer — right side, 50% viewport width */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 right-0 flex w-[50vw] flex-col bg-rail text-rail-foreground shadow-lg">
            <div className="flex items-center justify-end px-3 py-2.5">
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="rounded-md p-1.5 text-white/70 hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-2 py-2">
              <ul className="space-y-0.5">
                {NAV.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium",
                          isActive
                            ? "bg-white text-primary shadow-sm"
                            : "text-white/85 hover:bg-white/10",
                        )
                      }
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{item.full}</span>
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
          <div className="flex min-w-0 items-baseline gap-3">
            <BrandMark variant="wordmark" />
            <span className="hidden -translate-y-[10px] text-base font-extralight leading-none tracking-tight text-foreground/90 md:block">
              Mission Operating System for China Sourcing
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* Mobile menu button — right side */}
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-[18px] w-[18px]" />
            </button>
          </div>
        </header>

        {/* Content — full width, no right rail */}
        <main className="min-w-0 flex-1 overflow-x-hidden">
          <div className="mx-auto w-full max-w-[1280px] px-4 py-8 md:px-10 md:py-10 animate-fade-in">
            <Outlet context={{ active }} />
          </div>
        </main>
      </div>

      {/* Mobile floating user menu — bottom right */}
      <div className="fixed bottom-4 right-4 z-40 md:hidden">
        <UserMenu
          side="top"
          align="end"
          trigger={
            <button
              type="button"
              aria-label="Open account menu"
              className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white text-[13px] font-semibold text-foreground shadow-lg ring-2 ring-white"
            >
              KE
              <span className="absolute right-0.5 top-0.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
          }
        />
      </div>
    </div>
  );
}
