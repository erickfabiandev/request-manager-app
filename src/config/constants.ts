import type { RequestStatus, RequestPriority, RequestCategory } from '@/domain/models/Request'

export const STATUS_LABELS: Record<RequestStatus, string> = {
  pending: 'Pendiente',
  in_review: 'En revisión',
  approved: 'Aprobada',
  rejected: 'Rechazada',
  closed: 'Cerrada',
}

export const PRIORITY_LABELS: Record<RequestPriority, string> = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
  critical: 'Crítica',
}

export const CATEGORY_LABELS: Record<RequestCategory, string> = {
  hardware: 'Hardware',
  software: 'Software',
  access: 'Acceso',
  license: 'Licencia',
  other: 'Otro',
}

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 5,
} as const