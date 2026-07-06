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
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/paisley-mos-logo.png.asset.json";
const wordmarkUrl = logoAsset.url;

export const NAV: {
  to: string;
  label: string;
  full: string;
  icon: LucideIcon;
  step: number | null;
}[] = [
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
    <nav aria-label="Primary" className="flex h-full flex-col items-center py-6">
      {/* Top spacer — brand appears in top bar */}
      <div className="mb-6 h-2" aria-hidden />


      <ul className="flex flex-1 flex-col items-stretch gap-1.5 w-full">
        {NAV.map((item) => (
          <li key={item.to} className="w-full">
            <NavLink
              to={item.to}
              onClick={onNavigate}
              end
              className={({ isActive }) =>
                cn(
                  "group relative flex flex-col items-center gap-1.5 py-2.5 text-caption font-medium tracking-tight transition-colors",
                  isActive
                    ? "rail-tab-active ml-3 pl-1 pr-1"
                    : "mx-3 rounded-xl text-white/70 hover:text-white",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl transition-all",
                      isActive
                        ? "text-primary"
                        : "bg-white/10 text-white group-hover:bg-white/20",
                    )}
                  >
                    <item.icon
                      className="h-[18px] w-[18px]"
                      strokeWidth={2.25}
                      fill="currentColor"
                      fillOpacity={isActive ? 0.15 : 0.2}
                    />
                  </span>
                  <span className={cn("leading-tight", isActive && "font-semibold")}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>


      {/* Logout replaces avatar */}
      <button
        type="button"
        aria-label="Log out"
        className="mt-4 flex flex-col items-center gap-1.5 rounded-xl px-3 py-2.5 text-caption font-medium text-white/70 transition-colors hover:text-white"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20">
          <LogOut className="h-[18px] w-[18px]" strokeWidth={2.25} />
        </span>
        <span>Logout</span>
      </button>
    </nav>
  );
}

export function BrandMark({ variant = "wordmark" }: { variant?: "mark" | "wordmark" }) {
  return (
    <img
      src={wordmarkUrl}
      alt="Paisley MOS"
      style={{ height: variant === "wordmark" ? "var(--logo-h)" : "var(--logo-mark-h)" }}
      className="w-auto object-contain"
    />
  );
}


export function useActiveNav() {
  const { pathname } = useLocation();
  return NAV.find((n) => pathname.startsWith(n.to)) ?? NAV[0];
}
