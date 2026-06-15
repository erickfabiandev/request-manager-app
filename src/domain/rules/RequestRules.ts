import type { RequestStatus } from '@/domain/models/Request'

export const EDITABLE_STATUSES: RequestStatus[] = ['pending', 'in_review']

export const isRequestEditable = (status: RequestStatus): boolean => EDITABLE_STATUSES.includes(status)