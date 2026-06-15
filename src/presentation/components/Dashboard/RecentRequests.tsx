'use client'

import Link from 'next/link'
import { ArrowRight, Clock, ChevronRight, ClipboardList } from 'lucide-react'
import { StatusBadge } from '@/shared/components'
import { formatDateShort } from '@/shared/lib'
import type { Request } from '@/domain/models/Request'

interface RecentRequestsProps {
  requests: Request[]
}

const COLUMNS = [
  { key: 'id', label: 'N° Solicitud', hideOnTablet: false, alignCenter: false },
  { key: 'title', label: 'Título', hideOnTablet: true , alignCenter: false }, 
  { key: 'status', label: 'Estado', hideOnTablet: false , alignCenter: true },
  { key: 'date', label: 'Fecha', hideOnTablet: false, alignCenter: true  }, 
];

export function RecentRequests({ requests }: RecentRequestsProps) {
  const recent = [...requests]
    .sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())
    .slice(0, 5)

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-start gap-2">
          <Clock size={20} className="text-neutral-900/75" />
          <div>
            <h3 className="text-sm font-semibold text-secondary">Solicitudes recientes</h3>
            <p className="text-xs text-gray-400">Últimas 5 solicitudes creadas</p>
          </div>
        </div>
        <Link
          href="/requests"
          className="flex items-center gap-1 text-sm text-primary-emphasis hover:underline font-medium hidden tablet:flex"
        >
          Ver todas <ArrowRight size={12} />
        </Link>
      </div>

      <div className='border border-neutral-200 rounded-md overflow-hidden w-full hidden tablet:block'>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-neutral-100">
              {COLUMNS.map((column) => (
                <th
                  key={column.key}
                  className={`text-left py-2 px-3 text-xs font-semibold text-neutral-900/75 uppercase 
                    ${column.hideOnTablet ? 'tablet:hidden laptop:table-cell' : ''}
                    ${column.alignCenter ? 'text-center' : 'text-left'}`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recent.map(request => (
              <tr key={request.id} className="border-b border-neutral-100 hover:bg-gray-50">
                <td className="py-3 px-3 font-medium text-secondary">{request.id}</td>
                <td className="py-3 px-3 text-sm text-secondary tablet:hidden laptop:table-cell">{request.title}</td>
                <td className="py-3 px-3 text-center"><StatusBadge status={request.status} /></td>
                <td className="py-3 px-3 text-sm text-secondary text-center">{formatDateShort(request.creationDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="tablet:hidden space-y-3">
        {recent.map(request => (
          <Link
            key={request.id}
            href={`/requests/${request.id}`}
            className="flex items-center justify-between border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition-colors"
          >
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-800">{request.id}</p>
                <p className="text-sm text-gray-600">{request.title}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">{formatDateShort(request.creationDate)}</span>
                <StatusBadge status={request.status} />
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
          </Link>
        ))}
      </div>

      <div className="mt-4 tablet:hidden">
        <Link
          href="/requests"
          className="
            flex
            w-full
            items-center
            justify-between
            rounded-xl
            border
            border-blue-200
            bg-blue-50
            px-4
            py-4
            transition-all
            hover:border-blue-300
            hover:bg-blue-100
          "
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
              <ClipboardList className="h-4 w-4 text-blue-600" />
            </div>

            <span className="text-sm font-semibold text-blue-600">
              Ver todas las solicitudes
            </span>
          </div>

          <ChevronRight className="h-4 w-4 text-blue-600" />
        </Link>
      </div>
    </div>
  )
}