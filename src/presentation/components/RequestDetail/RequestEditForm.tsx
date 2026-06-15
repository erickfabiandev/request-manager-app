'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, ChevronDown } from 'lucide-react'
import { Button, StatusBadge } from '@/shared/components'
import { STATUS_LABELS, PRIORITY_LABELS, CATEGORY_LABELS } from '@/shared/lib'
import type { Request } from '@/domain/models/Request'
import Link from 'next/link'
import { formatDateShortTime } from '@/shared/lib/formatDate'
import { editRequestSchema , type EditRequestFormData} from '@/domain/rules/RequestSchema'
import { input, label, errorMessage, textarea } from '@/shared/lib/variants/input.variants'
import { select } from '@/shared/lib/variants/select.variants'


interface RequestEditFormProps {
  request: Request
  onSave: (data: EditRequestFormData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export function RequestEditForm({
  request,
  onSave,
  onCancel,
  isLoading = false,
}: RequestEditFormProps) {

  const { register, handleSubmit, formState: { errors } } = useForm<EditRequestFormData>({
    resolver: zodResolver(editRequestSchema),
    mode: 'onTouched',
    defaultValues: {
      title: request.title,
      requester: request.requester,
      category: request.category,
      priority: request.priority,
      status: request.status,
      description: request.description,
    },
  })
  
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
              ID: {request.id} • Creada el { formatDateShortTime(request.creationDate) }
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            size="sm"
            onClick={handleSubmit(onSave)}
            disabled={isLoading}
          >
            {isLoading ? 'Guardando...' : 'Guardar cambios'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 laptop:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-sm font-semibold text-secondary">Información General</h2>

          <div className="space-y-1">
            <label className={label({ required: true })}>Título</label>
            <input
              {...register('title')}
              className={input({ state: errors.title ? 'error' : 'default' })}
              placeholder="Título de la solicitud"
            />
            {errors.title && <p className={errorMessage()}>{errors.title.message}</p>}
          </div>

          <div className="space-y-1">
            <label className={label({ required: true })}>Solicitante</label>
            <input
              {...register('requester')}
              className={input({ state: errors.requester ? 'error' : 'default' })}
              placeholder="Nombre del solicitante"
            />
            {errors.requester && <p className={errorMessage()}>{errors.requester.message}</p>}
          </div>

          <div className="space-y-1">
            <label className={label({ required: true })}>Categoría</label>
            <div className="relative flex items-center min-w-[140px]">
              <select {...register('category')} className={select({ state: errors.category ? 'error' : 'default' })}>
                {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 text-gray-400 pointer-events-none" />
            </div>
            {errors.category && <p className={errorMessage()}>{errors.category.message}</p>}
          </div>

          <div className="space-y-1">
            <label className={label({ required: true })}>Prioridad</label>
            <div className="relative flex items-center min-w-[140px]">
              <select {...register('priority')} className={select({ state: errors.priority ? 'error' : 'default' })}>
                {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 text-gray-400 pointer-events-none" />
            </div>
            {errors.priority && <p className={errorMessage()}>{errors.priority.message}</p>}
          </div>

          <div className="space-y-1">
            <label className={label({ required: true })}>Estado</label>
            <div className="relative flex items-center min-w-[140px]">
              <select {...register('status')} className={select({ state: errors.status ? 'error' : 'default' })}>
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 text-gray-400 pointer-events-none" />
            </div>
            {errors.status && <p className={errorMessage()}>{errors.status.message}</p>}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className={label({ required: true })}>Descripción</h2>
            <textarea
              {...register('description')}
              rows={6}
              className={`${textarea({ state: errors.description ? 'error' : 'default' })} resize-none`}
              placeholder="Describe detalladamente la solicitud..."
            />
            {errors.description && <p className={errorMessage()}>{errors.description.message}</p>}
          </div>

          <div className="bg-gray-50 rounded-xl border border-gray-100 p-6 space-y-3">
            <h2 className="text-sm font-semibold text-gray-500">Información del sistema</h2>
            <div className="flex justify-between">
              <span className="text-xs text-gray-400">Fecha de creación</span>
              <span className="text-xs text-gray-600">{formatDateShortTime(request.creationDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-400">Última actualización</span>
              <span className="text-xs text-gray-600">{formatDateShortTime(request.lastChangeDate)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}