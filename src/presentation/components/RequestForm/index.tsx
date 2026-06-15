'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ChevronDown } from 'lucide-react'
import { createRequestSchema, type CreateRequestFormData } from '@/domain/rules/RequestSchema'
import { Button } from '@/shared/components'
import { CATEGORY_LABELS, PRIORITY_LABELS, CATEGORY_LIST, PRIORITY_LIST } from '@/config/constants'
import { input, label, errorMessage, textarea } from '@/shared/lib/variants/input.variants'
import { select } from '@/shared/lib/variants/select.variants'
import { RequestCategory, RequestPriority } from '@/domain/models/Request'

interface RequestFormProps {
  onSubmit: (data: CreateRequestFormData) => Promise<void>
  isLoading?: boolean
}

export function RequestForm({ onSubmit, isLoading = false }: RequestFormProps) {
  const router = useRouter()

  const { register, handleSubmit, reset, formState: { errors }, } = useForm<CreateRequestFormData>({
    resolver: zodResolver(createRequestSchema),
    mode: 'onTouched',
    defaultValues: {
      title: '',
      description: '',
      requester: '',
      category: '' as unknown as RequestCategory,
      priority: '' as unknown as RequestPriority,
    }
  })

  const handleFormSubmit = async (data: CreateRequestFormData) => {
    await onSubmit(data)
    reset()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/requests')}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-secondary">Nueva Solicitud</h1>
            <p className="text-xs text-neutral-900/75 mt-0.5">Complete la información para crear una nueva solicitud</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => router.push('/requests')}
          >
            Cancelar
          </Button>
          <Button
            size="sm"
            onClick={handleSubmit(handleFormSubmit)}
            disabled={isLoading}
          >
            {isLoading ? 'Creando...' : 'Crear Solicitud'}
          </Button>
        </div>
      </div>

   
      <div className="grid grid-cols-1 laptop:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900">Información General</h2>

          <div className="space-y-1">
            <label className={label({ required: true })}>Título</label>
            <input
              {...register('title')}
              className={input({ state: errors.title ? 'error' : 'default' })}
              placeholder="Ej. Solicitud de equipo de trabajo"
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className={label({ required: true })}>Categoría</label>
              <div className="relative flex items-center min-w-[140px]">
                <select {...register('category')} className={select({ state: errors.category ? 'error' : 'default' })}>
                    <option value="">Seleccione...</option>
                    {CATEGORY_LIST.map(cat => (
                    <option key={cat} value={cat}>{CATEGORY_LABELS[cat]}</option>
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
                  <option value="">Seleccione...</option>
                  {PRIORITY_LIST.map(pri => (
                    <option key={pri} value={pri}>{PRIORITY_LABELS[pri]}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 text-gray-400 pointer-events-none" />
              </div>
              {errors.priority && <p className={errorMessage()}>{errors.priority.message}</p>}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900">Descripción</h2>
          <div className="space-y-1">
            <label className={label({ required: true })}>Descripción</label>
            <textarea
              {...register('description')}
              rows={8}
              className={`${textarea({ state: errors.description ? 'error' : 'default' })} resize-none`}
              placeholder="Describe detalladamente la solicitud..."
            />
            {errors.description && <p className={errorMessage()}>{errors.description.message}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}