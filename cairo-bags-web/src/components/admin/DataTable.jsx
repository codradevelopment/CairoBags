import { Button } from "../ui/Button.jsx";
import { Skeleton } from "../ui/Skeleton.jsx";
import { useLocale } from "../layout/LanguageSwitcher.jsx";
import { getTotalPages } from "../../utils/pagination.js";
import { cn } from "../../utils/cn.js";
import { ADMIN_COL, adminCellClass, adminHeaderClass } from "./adminTableConfig.jsx";

export function DataTable({
  columns,
  rows = [],
  loading = false,
  emptyMessage,
  page = 1,
  pageSize = 10,
  totalItems,
  onPageChange,
  showIndex = false,
  className,
  tableClassName,
  getRowKey = (row, index) => row.id ?? row.Id ?? index,
}) {
  const { locale } = useLocale();
  const total = totalItems ?? rows.length;
  const totalPages = getTotalPages(total, pageSize);

  const indexColumn = showIndex
    ? {
        key: "__index",
        header: "#",
        align: "center",
        headerClassName: cn(ADMIN_COL.index, "px-4"),
        cellClassName: cn(ADMIN_COL.index, "px-4 text-xs text-brand-muted"),
        render: (_row, rowIndex) => (page - 1) * pageSize + rowIndex + 1,
      }
    : null;

  const displayColumns = indexColumn ? [indexColumn, ...columns] : columns;

  if (loading) {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-[4.25rem] w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (!rows.length) {
    return (
      <p
        className={cn(
          "rounded-lg border border-brand-border bg-brand-surface py-12 text-center text-sm text-brand-muted",
          className
        )}
      >
        {emptyMessage || (locale === "ar" ? "لا توجد بيانات" : "No data found")}
      </p>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="overflow-hidden rounded-xl border border-brand-border bg-brand-surface">
        <div className="overflow-x-auto">
          <table className={cn("w-full min-w-[800px] border-collapse text-sm", tableClassName)}>
            <thead>
              <tr className="border-b border-brand-border bg-brand-secondary/40">
                {displayColumns.map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    className={adminHeaderClass(column.align, column.headerClassName)}
                  >
                    {column.header ?? "\u00A0"}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, rowIndex) => (
                <tr
                  key={getRowKey(row, rowIndex)}
                  className="border-b border-brand-border last:border-b-0 hover:bg-brand-secondary/20"
                >
                  {displayColumns.map((column) => (
                    <td
                      key={column.key}
                      className={adminCellClass(column.align, column.cellClassName)}
                    >
                      {column.render
                        ? column.render(row, rowIndex)
                        : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {onPageChange && totalPages > 1 ? (
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-brand-muted">
            {locale === "ar"
              ? `صفحة ${page} من ${totalPages}`
              : `Page ${page} of ${totalPages}`}
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
            >
              {locale === "ar" ? "السابق" : "Prev"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
            >
              {locale === "ar" ? "التالي" : "Next"}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
