'use client'

import { useRouter } from 'next/navigation'
import { Trash2, ChevronRight } from 'lucide-react'
import { StatusBadge, PriorityBadge } from '@/shared/components'
import { formatDateShort } from '@/shared/lib'
import type { Request } from '@/domain/models/Request'

interface RequestCardProps {
  request: Request
  onDelete: (id: string) => void
}

export function RequestCard({ request, onDelete }: RequestCardProps) {
  const router = useRouter()

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-400">{request.id}</span>
          <StatusBadge status={request.status} />
        </div>
        <button
          onClick={() => onDelete(request.id)}
          className="text-red-400 hover:text-red-600"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <p className="text-sm font-medium text-gray-800 mb-3">{request.title}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-xs text-gray-400">Prioridad</p>
            <PriorityBadge priority={request.priority} />
          </div>
          <div>
            <p className="text-xs text-gray-400">Fecha</p>
            <p className="text-xs text-gray-600">{formatDateShort(request.creationDate)}</p>
          </div>
        </div>
        <button
          onClick={() => router.push(`/requests/${request.id}`)}
          className="flex items-center gap-1 text-xs text-primary font-medium"
        >
          Ver <ChevronRight size={14} />
        </button>
      </div>
    </div>
  )
}