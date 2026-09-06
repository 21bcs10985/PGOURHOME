import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField: keyof T;
  emptyMessage?: string;
  className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DataTable<T extends Record<string, any>>({
  columns,
  data,
  keyField,
  emptyMessage = "No records found.",
  className,
}: DataTableProps<T>) {
  return (
    <div className={cn("overflow-x-auto rounded-xl border border-outline-variant/20", className)}>
      <table className="w-full text-body-md">
        <thead className="bg-surface-container-low">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "px-lg py-md text-left text-label-md text-on-surface-variant font-semibold",
                  col.className
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/10">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-lg py-4xl text-center text-on-surface-variant text-body-md"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={String(row[keyField])}
                className="hover:bg-surface-container-low transition-colors"
              >
                {columns.map((col) => (
                  <td key={col.key} className={cn("px-lg py-md", col.className)}>
                    {col.render
                      ? col.render(row)
                      : String(row[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
