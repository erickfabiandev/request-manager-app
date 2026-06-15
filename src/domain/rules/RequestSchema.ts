import { z } from 'zod'
import { CATEGORY_LIST, PRIORITY_LIST, STATUS_LIST } from '@/config/constants'
import type { RequestCategory, RequestPriority, RequestStatus } from '@/domain/models/Request'

export const createRequestSchema = z.object({
  title: z.string().min(3, 'Mínimo 3 caracteres').max(100, 'Máximo 100 caracteres'),
  description: z.string().min(10, 'Mínimo 10 caracteres'),
  requester: z.string().min(1, 'El solicitante es requerido'),
  category: z.enum(CATEGORY_LIST as [RequestCategory, ...RequestCategory[]], { error: 'Seleccione una categoría' }),
  priority: z.enum(PRIORITY_LIST as [RequestPriority, ...RequestPriority[]], { error: 'Seleccione una prioridad' }),
})

export const editRequestSchema = createRequestSchema.extend({
  status: z.enum(STATUS_LIST as [RequestStatus, ...RequestStatus[]], { error: 'Seleccione un estado' }),
})

export type CreateRequestFormData = z.infer<typeof createRequestSchema>
export type EditRequestFormData = z.infer<typeof editRequestSchema>