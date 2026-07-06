import { NavLink, useLocation } from "react-router-dom";
import {
  Squares2X2Icon,
  InboxIcon,
  MagnifyingGlassIcon,
  UsersIcon,
  EnvelopeIcon,
  TableCellsIcon,
  ClipboardDocumentCheckIcon,
  ReceiptPercentIcon,
  CubeIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/paisley-mos-logo.png.asset.json";
const wordmarkUrl = logoAsset.url;

export const NAV: {
  to: string;
  label: string;
  full: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  step: number | null;
}[] = [
  { to: "/dashboard", label: "Today", full: "Dashboard", icon: Squares2X2Icon, step: null },
  { to: "/intake", label: "Intake", full: "Purchase Intake", icon: InboxIcon, step: 1 },
  { to: "/discovery", label: "Discovery", full: "Supplier Discovery", icon: MagnifyingGlassIcon, step: 2 },
  { to: "/candidates", label: "Review", full: "Candidate Review", icon: UsersIcon, step: 3 },
  { to: "/first-contact", label: "Contact", full: "First Contact", icon: EnvelopeIcon, step: 4 },
  { to: "/rfq", label: "RFQ", full: "RFQ Rounds", icon: TableCellsIcon, step: 5 },
  { to: "/quote-review", label: "Quotes", full: "Quote Review", icon: ClipboardDocumentCheckIcon, step: 6 },
  { to: "/buyer-quotation", label: "Buyer Qt", full: "Buyer Quotation", icon: ReceiptPercentIcon, step: 7 },
  { to: "/orders", label: "Orders", full: "Orders", icon: CubeIcon, step: 8 },
  { to: "/settings", label: "Settings", full: "Settings", icon: Cog6ToothIcon, step: null },
];

export function IconRail({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Primary" className="flex h-full flex-col items-center py-4">
      <ul
        className="flex flex-1 flex-col items-stretch gap-0 w-full overflow-y-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {NAV.map((item) => (
          <li key={item.to} className="w-full">
            <NavLink
              to={item.to}
              onClick={onNavigate}
              end
              className={({ isActive }) =>
                cn(
                  "group relative flex flex-col items-center gap-1 py-2 text-[11px] font-semibold tracking-tight transition-colors",
                  isActive
                    ? "rail-tab-active"
                    : "mx-3 rounded-xl text-white hover:text-white",
                )
              }
            >
              {({ isActive }) => (
                <>
                    <span
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg transition-all",
                        isActive
                          ? "text-foreground"
                          : "text-white",
                      )}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                    </span>
                  <span className="text-[11px] leading-tight">
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
        className="mt-2 flex flex-col items-center gap-[1px] rounded-xl px-3 py-2 text-[11px] font-semibold text-white transition-colors hover:text-white"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl text-white">
          <ArrowLeftOnRectangleIcon className="h-[18px] w-[18px]" />
        </span>
        <span className="text-[11px] leading-tight">Logout</span>
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
