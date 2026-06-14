'use client'

import { useRouter } from 'next/navigation'
import { Eye, Trash2, ArrowUpDown } from 'lucide-react'
import { StatusBadge, PriorityBadge, CategoryBadge } from '@/shared/components'
import { formatDateShort } from '@/shared/lib'
import type { Request } from '@/domain/models/Request'

interface RequestsTableProps {
  requests: Request[]
  onDelete: (id: string) => void
  onSort: (field: string) => void
  sortField: string
  sortOrder: 'asc' | 'desc'
}

export function RequestsTable({
  requests,
  onDelete,
  onSort,
  sortField,
  sortOrder,
}: RequestsTableProps) {
  const router = useRouter()

  const SortButton = ({ field }: { field: string }) => (
    <button
      onClick={() => onSort(field)}
      className={`ml-1 inline-flex items-center ${
        sortField === field ? 'text-primary' : 'text-gray-300'
      }`}
    >
      <ArrowUpDown size={12} />
    </button>
  )

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
              N° Solicitud <SortButton field="id" />
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
              Título <SortButton field="title" />
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase hidden laptop:table-cell">
              Categoría
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase hidden tablet:table-cell">
              Prioridad <SortButton field="priority" />
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
              Estado <SortButton field="status" />
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase hidden laptop:table-cell">
              Fecha <SortButton field="creationDate" />
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr
              key={request.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 px-4 font-medium text-gray-700">{request.id}</td>
              <td className="py-3 px-4 text-gray-600 max-w-xs truncate">{request.title}</td>
              <td className="py-3 px-4 hidden laptop:table-cell">
                <CategoryBadge category={request.category} />
              </td>
              <td className="py-3 px-4 hidden tablet:table-cell">
                <PriorityBadge priority={request.priority} />
              </td>
              <td className="py-3 px-4">
                <StatusBadge status={request.status} />
              </td>
              <td className="py-3 px-4 text-gray-500 hidden laptop:table-cell">
                {formatDateShort(request.creationDate)}
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => router.push(`/requests/${request.id}`)}
                    className="text-primary hover:underline text-sm font-medium flex items-center gap-1"
                  >
                    <Eye size={14} />
                    Ver
                  </button>
                  <button
                    onClick={() => onDelete(request.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}