import { tv } from 'tailwind-variants'

const tableRow = tv({
  base: 'border-b border-gray-100 transition-colors',
  variants: {
    hoverable: {
      true: 'hover:bg-gray-50 cursor-pointer',
    },
  },
})

export interface Column<T> {
  key: keyof T | string
  header: string
  render?: (row: T) => React.ReactNode
  className?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyExtractor: (row: T) => string
  onRowClick?: (row: T) => void
  emptyMessage?: string
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
}: DataTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map(col => (
              <th
                key={String(col.key)}
                className={`text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider ${col.className ?? ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr
              key={keyExtractor(row)}
              className={tableRow({ hoverable: !!onRowClick })}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map(col => (
                <td key={String(col.key)} className={`py-3 px-4 text-gray-700 ${col.className ?? ''}`}>
                  {col.render
                    ? col.render(row)
                    : String((row as Record<string, unknown>)[String(col.key)] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}