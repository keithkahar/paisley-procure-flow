import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Inbox,
  Search,
  UserCheck,
  MailPlus,
  FileSpreadsheet,
  ClipboardCheck,
  Receipt,
  Package,
  Settings as SettingsIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const NAV = [
  { to: "/dashboard", label: "Today", full: "Dashboard", icon: LayoutDashboard, step: null },
  { to: "/intake", label: "Intake", full: "Purchase Intake", icon: Inbox, step: 1 },
  { to: "/discovery", label: "Discovery", full: "Supplier Discovery", icon: Search, step: 2 },
  { to: "/candidates", label: "Review", full: "Candidate Review", icon: UserCheck, step: 3 },
  { to: "/first-contact", label: "Contact", full: "First Contact", icon: MailPlus, step: 4 },
  { to: "/rfq", label: "RFQ", full: "RFQ Rounds", icon: FileSpreadsheet, step: 5 },
  { to: "/quote-review", label: "Quotes", full: "Quote Review", icon: ClipboardCheck, step: 6 },
  { to: "/buyer-quotation", label: "Buyer Qt", full: "Buyer Quotation", icon: Receipt, step: 7 },
  { to: "/orders", label: "Orders", full: "Orders", icon: Package, step: 8 },
  { to: "/settings", label: "Settings", full: "Settings", icon: SettingsIcon, step: null },
];

export function IconRail({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Primary" className="flex h-full flex-col items-stretch gap-1 px-2 py-3">
      <div className="mb-3 flex items-center justify-center py-1">
        <BrandMark />
      </div>
      <ul className="flex flex-1 flex-col gap-1">
        {NAV.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  "group relative flex flex-col items-center gap-1 rounded-lg px-2 py-2.5 text-[10.5px] font-medium transition-colors",
                  isActive
                    ? "bg-background text-primary shadow-sm"
                    : "text-rail-foreground/70 hover:bg-rail-hover hover:text-rail-foreground",
                )
              }
              end
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute -left-2 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-primary"
                    />
                  )}
                  <item.icon className={cn("h-[18px] w-[18px]", isActive ? "text-primary" : "")} strokeWidth={2} />
                  <span className="leading-tight tracking-tight">{item.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="mt-2 border-t border-rail-hover/60 pt-3">
        <div className="flex items-center justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-[11px] font-semibold text-primary-foreground ring-1 ring-primary/30">
            LK
          </div>
        </div>
      </div>
    </nav>
  );
}

export function BrandMark({ compact = true }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="relative flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-brand shadow-md"
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary-foreground" fill="none">
          <path
            d="M6 20c0-6 3-10 8-11 3.5-.6 6 1.4 6 4.5 0 3-2.5 5-5.5 5-2 0-3.5-1-3.5-2.7 0-1.5 1-2.6 2.4-2.6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="9" cy="19" r="1.2" fill="currentColor" />
        </svg>
      </div>
      {!compact && (
        <div className="leading-tight">
          <div className="font-display text-sm font-bold tracking-tight text-foreground">Paisley</div>
          <div className="text-[10px] font-semibold tracking-[0.2em] text-primary">MOS</div>
        </div>
      )}
    </div>
  );
}

export function useActiveNav() {
  const { pathname } = useLocation();
  return NAV.find((n) => pathname.startsWith(n.to)) ?? NAV[0];
}
