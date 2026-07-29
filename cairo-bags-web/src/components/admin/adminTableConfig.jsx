import { cn } from "../../utils/cn.js";

/** Fixed column widths — use on th/td, not percentages */
export const ADMIN_COL = {
  index: "w-12",
  image: "w-[72px]",
  sort: "w-20",
  status: "w-28",
  price: "w-28",
  stock: "w-24",
  sku: "w-32",
  qty: "w-24",
  actions: "min-w-[11rem]",
};

export function adminHeaderClass(align = "start", extra) {
  return cn(
    "whitespace-nowrap pb-4 pt-5 align-bottom text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-muted",
    align === "center" && "text-center",
    align === "end" && "text-end",
    extra
  );
}

export function adminCellClass(align = "start", extra) {
  return cn(
    "py-4 align-middle",
    align === "center" && "text-center",
    align === "end" && "text-end",
    extra
  );
}

export function AdminTableImage({ src, alt, rounded = "full" }) {
  return (
    <div
      className={cn(
        "h-11 w-11 shrink-0 overflow-hidden border border-brand-border bg-brand-secondary",
        rounded === "full" ? "rounded-full" : "rounded-md"
      )}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full items-center justify-center text-[10px] font-semibold text-brand-muted">
          CB
        </div>
      )}
    </div>
  );
}

/** Primary title + optional subtitle stacked vertically */
export function AdminTableText({ title, subtitle }) {
  return (
    <div className="min-w-0">
      <p className="truncate text-sm font-medium leading-snug text-brand-text">{title}</p>
      {subtitle ? (
        <p className="mt-1 truncate text-xs leading-snug text-brand-muted">{subtitle}</p>
      ) : null}
    </div>
  );
}

export function AdminTableActions({ children }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">{children}</div>
  );
}

export const imageColumnShell = {
  headerClassName: cn(ADMIN_COL.image, "px-4 normal-case tracking-normal"),
  cellClassName: cn(ADMIN_COL.image, "px-4"),
};

export const dataColumnShell = {
  headerClassName: "px-6",
  cellClassName: "px-6",
};
