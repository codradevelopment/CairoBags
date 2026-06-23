import { Button } from "../ui/Button.jsx";
import { Skeleton } from "../ui/Skeleton.jsx";
import { useLocale } from "../layout/LanguageSwitcher.jsx";
import { getTotalPages } from "../../utils/pagination.js";
import { cn } from "../../utils/cn.js";

export function DataTable({
  columns,
  rows = [],
  loading = false,
  emptyMessage,
  page = 1,
  pageSize = 10,
  totalItems,
  onPageChange,
  className,
  getRowKey = (row, index) => row.id ?? row.Id ?? index,
}) {
  const { locale } = useLocale();
  const total = totalItems ?? rows.length;
  const totalPages = getTotalPages(total, pageSize);

  if (loading) {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-md" />
        ))}
      </div>
    );
  }

  if (!rows.length) {
    return (
      <p className={cn("py-10 text-center text-sm text-brand-muted", className)}>
        {emptyMessage || (locale === "ar" ? "لا توجد بيانات" : "No data found")}
      </p>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="overflow-x-auto rounded-lg border border-brand-border">
        <table className="min-w-full text-sm">
          <thead className="bg-brand-secondary/60">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-start font-medium text-brand-text"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={getRowKey(row, index)} className="border-t border-brand-border">
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 text-brand-text">
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {onPageChange && totalPages > 1 ? (
        <div className="flex items-center justify-between gap-3">
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
