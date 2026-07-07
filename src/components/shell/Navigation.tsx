import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import type { ComponentType, SVGProps } from "react";
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
} from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import { UserMenu } from "./UserMenu";
import logoAsset from "@/assets/paisley-mos-logo.png.asset.json";
const wordmarkUrl = logoAsset.url;

export const NAV: {
  to: string;
  label: string;
  full: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
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
  const { pathname } = useLocation();
  const [instantPath, setInstantPath] = useState<string | null>(null);

  useEffect(() => {
    setInstantPath(null);
  }, [pathname]);

  const visualPath = instantPath ?? pathname;
  const activeIndex = Math.max(
    0,
    NAV.findIndex((item) => visualPath === item.to || visualPath.startsWith(`${item.to}/`)),
  );

  return (
    <nav aria-label="Primary" className="flex h-full flex-col pt-[var(--topbar-h)] pb-4">
      <ul
        className="rail-tab-track flex flex-1 flex-col items-stretch gap-0 w-full overflow-y-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <span
          aria-hidden="true"
          className="rail-tab-indicator"
          style={{ transform: `translate3d(0, calc(${activeIndex} * var(--rail-tab-h)), 0)` }}
        />
        {NAV.map((item) => (
          <li key={item.to} className="relative z-[2] w-full">
            <NavLink
              to={item.to}
              onPointerDown={() => setInstantPath(item.to)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") setInstantPath(item.to);
              }}
              onClick={onNavigate}
              end
              className={() =>
                cn(
                  "group relative flex h-[var(--rail-tab-h)] flex-row items-center gap-3 pl-5 pr-4 text-[13px] font-semibold tracking-tight transition-colors",
                  visualPath === item.to
                    ? "rail-tab-current"
                    : "text-white hover:text-white",
                )
              }
            >
              {() => {
                const isVisuallyActive = visualPath === item.to;

                return (
                <>
                    <span
                      className={cn(
                        "flex h-6 w-6 items-center justify-center transition-colors",
                        isVisuallyActive ? "text-foreground" : "text-white",
                      )}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                    </span>
                  <span className="truncate leading-tight">
                    {item.full}
                  </span>
                </>
                );
              }}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* User menu — divider + avatar/name/plan */}
      <div className="mt-2 border-t border-white/15 pt-2 px-2">
          <UserMenu
          side="top"
          align="start"
          trigger={
            <button
              type="button"
              aria-label="Open account menu"
              className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-white/10"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[12px] font-semibold text-foreground">
                KE
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold text-white leading-tight">
                  Keith
                </span>
                <span className="block truncate text-[11px] text-white/60 leading-tight">
                  Pro
                </span>
              </span>
            </button>
          }
        />
      </div>
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
