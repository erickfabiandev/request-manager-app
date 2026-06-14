'use client'

import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { StatusBadge } from '@/shared/components'
import { formatDateShort } from '@/shared/lib'
import type { Request } from '@/domain/models/Request'

interface RecentRequestsProps {
  requests: Request[]
}

export function RecentRequests({ requests }: RecentRequestsProps) {
  const recent = [...requests]
    .sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())
    .slice(0, 5)

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-gray-400" />
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Solicitudes recientes</h3>
            <p className="text-xs text-gray-400">Últimas 5 solicitudes creadas</p>
          </div>
        </div>
        <Link
          href="/requests"
          className="flex items-center gap-1 text-xs text-primary hover:underline font-medium"
        >
          Ver todas <ArrowRight size={12} />
        </Link>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left py-2 px-3 text-xs font-semibold text-gray-400 uppercase">N° Solicitud</th>
            <th className="text-left py-2 px-3 text-xs font-semibold text-gray-400 uppercase">Título</th>
            <th className="text-left py-2 px-3 text-xs font-semibold text-gray-400 uppercase">Estado</th>
            <th className="text-left py-2 px-3 text-xs font-semibold text-gray-400 uppercase">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {recent.map(request => (
            <tr key={request.id} className="border-b border-gray-50 hover:bg-gray-50">
              <td className="py-3 px-3 font-medium text-gray-700">{request.id}</td>
              <td className="py-3 px-3 text-gray-600">{request.title}</td>
              <td className="py-3 px-3"><StatusBadge status={request.status} /></td>
              <td className="py-3 px-3 text-gray-500">{formatDateShort(request.creationDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}