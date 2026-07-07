import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeaderSearch({ placeholder = "Search…" }: { placeholder?: string }) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  return (
    <div className="flex items-center">
      <div
        className={cn(
          "relative overflow-hidden transition-[width,opacity] duration-200 ease-out",
          open ? "w-[180px] md:w-[280px] opacity-100 mr-1" : "w-0 opacity-0",
        )}
      >
        <input
          ref={inputRef}
          placeholder={placeholder}
          onBlur={(e) => { if (!e.currentTarget.value) setOpen(false); }}
          onKeyDown={(e) => { if (e.key === "Escape") setOpen(false); }}
          className="h-9 w-full rounded-full border border-border bg-surface-muted pl-4 pr-9 text-caption text-foreground placeholder:text-muted-foreground/70 outline-none focus:border-primary/40 focus:bg-surface"
        />
      </div>
      <button
        type="button"
        aria-label="Search"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors",
          open
            ? "bg-primary-soft text-primary border-primary/30"
            : "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
      >
        <Search className="h-[18px] w-[18px]" strokeWidth={2} />
      </button>
    </div>
  );
}
