import type { Request, CreateRequestDTO, UpdateRequestDTO } from '@/domain/models/Request'

export interface RequestFilters {
  status?: Request['status']
  priority?: Request['priority']
  search?: string
  page?: number
  limit?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface RequestRepository {
  getAll(filters: RequestFilters): Promise<PaginatedResponse<Request>>
  getById(id: string): Promise<Request>
  create(data: CreateRequestDTO): Promise<Request>
  update(id: string, data: UpdateRequestDTO): Promise<Request>
  updatePriority(id: string, priority: Request['priority']): Promise<Request>
  delete(id: string): Promise<void>
}