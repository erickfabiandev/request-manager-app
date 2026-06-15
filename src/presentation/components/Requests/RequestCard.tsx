'use client'

import { useRouter } from 'next/navigation'
import { Trash2, ChevronRight, CalendarDays } from 'lucide-react'
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
      <div className="flex items-start justify-between gap-2 mb-5">
        <div className="flex flex-col gap-[4px] items-start">
          <span className="text-md font-medium text-secondary">{request.id}</span>
          <p className="text-xs text-neutral-900/75">{request.title}</p>
          <div className="flex items-center">
            <CalendarDays size={12} className="inline mr-1 text-neutral-900/75" />
            <p className="text-xs font-regular text-neutral-900/75">
              {formatDateShort(request.creationDate)}
            </p>
          </div>
        </div>
        <button
          onClick={() => onDelete(request.id)}
          className="text-red-400 hover:text-red-600"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <PriorityBadge priority={request.priority} />
          </div>
          <div>
            <StatusBadge status={request.status} />
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