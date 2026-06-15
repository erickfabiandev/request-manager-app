'use client'

import { ArrowLeft, Pencil } from 'lucide-react'
import Link from 'next/link'
import { Button, StatusBadge, PriorityBadge } from '@/shared/components'
import type { Request } from '@/domain/models/Request'
import { formatDateShortTime } from '@/shared/lib/formatDate'
import { isRequestEditable } from '@/domain/rules/RequestRules'

interface RequestDetailViewProps {
  request: Request
  onEdit: () => void
}

export function RequestDetailView({ request, onEdit }: RequestDetailViewProps) {

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/requests"
            className="p-2 rounded-lg hover:bg-gray-100 text-neutral-900"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-secondary">{request.title}</h1>
              <StatusBadge status={request.status} />
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              ID: {request.id} • Creada el {formatDateShortTime(request.creationDate)}
            </p>
          </div>
        </div>
        {isRequestEditable(request.status) && (
          <Button onClick={onEdit} variant="secondary" size="sm">
            <Pencil size={14} />
            Editar
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 laptop:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-sm font-semibold text-secondary">Información General</h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-neutral-50">
              <span className="text-sm text-gray-500">Solicitante</span>
              <span className="text-sm font-medium text-gray-800">{request.requester}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-neutral-50">
              <span className="text-sm text-gray-500">Categoría</span>
              <span className="text-sm text-gray-600">{request.category}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-neutral-50">
              <span className="text-sm text-gray-500">Prioridad</span>
              <PriorityBadge priority={request.priority} />
            </div>
            <div className="flex justify-between items-center py-2 border-b border-neutral-50">
              <span className="text-sm text-gray-500">Estado</span>
              <StatusBadge status={request.status} />
            </div>
            <div className="flex justify-between items-center py-2 border-b border-neutral-50">
              <span className="text-sm text-gray-500">Fecha de creación</span>
              <span className="text-sm text-gray-600">{formatDateShortTime(request.creationDate)}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-500">Última actualización</span>
              <span className="text-sm text-gray-600">{formatDateShortTime(request.lastChangeDate)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-sm font-semibold text-secondary mb-3">Descripción</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{request.description}</p>
        </div>
      </div>
    </div>
  )
}