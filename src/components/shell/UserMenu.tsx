import { ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  PaperAirplaneIcon,
  StarIcon,
  ArrowLeftOnRectangleIcon,
  AtSymbolIcon,
} from "@heroicons/react/24/outline";

type Item = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  shortcut?: string;
  onClick?: () => void;
  danger?: boolean;
};

export function UserMenu({
  trigger,
  side = "top",
  align = "start",
  contentClassName,
  sideOffset = 8,
}: {
  trigger: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  contentClassName?: string;
  sideOffset?: number;
}) {
  const items: Item[] = [
    { icon: AtSymbolIcon, label: "keithknowai@gmail.com" },
  ];
  const items2: Item[] = [
    { icon: UserCircleIcon, label: "Profile" },
    { icon: Cog6ToothIcon, label: "Settings", shortcut: "⌘," },
    { icon: PaperAirplaneIcon, label: "Invite friends" },
    { icon: StarIcon, label: "Membership" },
  ];
  const items3: Item[] = [
    { icon: ArrowLeftOnRectangleIcon, label: "Log out" },
  ];

  const Row = ({ item }: { item: Item }) => (
    <button
      type="button"
      onClick={item.onClick}
      className="flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-left text-[13px] text-foreground hover:bg-muted"
    >
      <item.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
      <span className="flex-1 truncate">{item.label}</span>
      {item.shortcut && (
        <span className="text-[11px] text-muted-foreground">{item.shortcut}</span>
      )}
    </button>
  );

  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        sideOffset={8}
        className="w-64 p-1.5"
      >
        <div className="py-1">
          {items.map((i) => <Row key={i.label} item={i} />)}
        </div>
        <div className="my-1 h-px bg-border" />
        <div className="py-1">
          {items2.map((i) => <Row key={i.label} item={i} />)}
        </div>
        <div className="my-1 h-px bg-border" />
        <div className="py-1">
          {items3.map((i) => <Row key={i.label} item={i} />)}
        </div>
      </PopoverContent>
    </Popover>
  );
}
