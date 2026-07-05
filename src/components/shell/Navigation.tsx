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
import logoUrl from "@/assets/paisley-mos-logo.png";

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
    <nav aria-label="Primary" className="flex h-full flex-col items-stretch py-5">
      <div className="mb-6 flex items-center justify-center px-2">
        <BrandMark />
      </div>
      <ul className="flex flex-1 flex-col gap-1.5 pl-3">
        {NAV.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              onClick={onNavigate}
              end
              className={({ isActive }) =>
                cn(
                  "group flex flex-col items-center gap-1 py-3 pl-1 pr-1 text-[10.5px] font-medium transition-colors",
                  isActive
                    ? "rail-pill-active"
                    : "text-rail-foreground/85 hover:text-white rounded-xl hover:bg-rail-hover mr-3",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={cn("h-[19px] w-[19px]", isActive ? "text-primary" : "text-current")}
                    strokeWidth={2}
                  />
                  <span className={cn("leading-tight tracking-tight", isActive ? "font-semibold" : "")}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-center pr-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-[11px] font-semibold text-white ring-1 ring-white/25 backdrop-blur">
          LK
        </div>
      </div>
    </nav>
  );
}

export function BrandMark({ compact = true }: { compact?: boolean }) {
  if (compact) {
    return (
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-md"
        aria-label="Paisley MOS"
      >
        <img src={logoAsset.url} alt="" className="h-8 w-8 object-contain" />
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <img src={logoAsset.url} alt="Paisley MOS" className="h-8 w-auto" />
    </div>
  );
}

export function useActiveNav() {
  const { pathname } = useLocation();
  return NAV.find((n) => pathname.startsWith(n.to)) ?? NAV[0];
}
