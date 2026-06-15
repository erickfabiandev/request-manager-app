'use client'

import Link from 'next/link'
import { Eye, Trash2, ArrowUpDown } from 'lucide-react'
import { StatusBadge, PriorityBadge } from '@/shared/components'
import { formatDateShort } from '@/shared/lib'
import type { Request } from '@/domain/models/Request'
import { memo } from 'react'

interface RequestsTableProps {
  requests: Request[]
  onDelete: (id: string) => void
  onSort: (field: keyof Request) => void
  sortField: keyof Request
}

export const RequestsTable = memo(function RequestsTable({
  requests,
  onDelete,
  onSort,
  sortField
}: RequestsTableProps) {

  const SortButton = ({ field }: { field: keyof Request }) => (
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
    <div className="w-full overflow-x-auto rounded-lg">
      <table className="w-full text-sm rounded-lg">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-900/75 uppercase">
              N° Solicitud <SortButton field="id" />
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-900/75 uppercase">
              Título <SortButton field="title" />
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-900/75 uppercase hidden laptop:table-cell">
              Categoría
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-900/75 uppercase hidden tablet:table-cell">
              Prioridad
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-900/75 uppercase">
              Estado
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-900/75 uppercase hidden laptop:table-cell">
              Fecha <SortButton field="creationDate" />
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-900/75 uppercase">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr
              key={request.id}
              className="border-b border-neutral-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 px-4 font-medium text-gray-700">{request.id}</td>
              <td className="py-3 px-4 text-neutral-900/70 max-w-xs truncate">{request.title}</td>
              <td className="py-3 px-4 text-neutral-900/70 hidden laptop:table-cell">
                {request.category}
              </td>
              <td className="py-3 px-4 hidden tablet:table-cell">
                <PriorityBadge priority={request.priority} />
              </td>
              <td className="py-3 px-4">
                <StatusBadge status={request.status} />
              </td>
              <td className="py-3 px-4 text-neutral-900/70 hidden laptop:table-cell">
                {formatDateShort(request.creationDate)}
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  
                  <Link
                    href={`/requests/${request.id}`}
                    title="Ver detalle"
                    className="p-1.5 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Eye size={15} />
                  </Link>
                  <button
                    title="Eliminar solicitud"
                    onClick={() => onDelete(request.id)}
                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
})