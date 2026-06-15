import type { RequestRepository, RequestFilters, PaginatedResponse } from '@/domain/ports/RequestRepository'
import type { Request, CreateRequestDTO, UpdateRequestDTO } from '@/domain/models/Request'
import { db } from '@/infrastructure/data/store'
import { PAGINATION } from '@/config/constants'

export class RequestStoreAdapter implements RequestRepository {
  async getAll(filters: RequestFilters): Promise<PaginatedResponse<Request>> {
    let data = db.getAll()

    if (filters.status) data = data.filter(r => r.status === filters.status)
    if (filters.priority) data = data.filter(r => r.priority === filters.priority)
    if (filters.search) {
      const search = filters.search.toLowerCase()
      data = data.filter(r =>
        r.title.toLowerCase().includes(search) ||
        r.id.toLowerCase().includes(search)
      )
    }

    const page = filters.page ?? PAGINATION.DEFAULT_PAGE
    const limit = filters.limit ?? 100
    const total = data.length
    const totalPages = Math.ceil(total / limit)
    const paginated = data.slice((page - 1) * limit, page * limit)

    return { data: paginated, total, page, limit, totalPages }
  }

  async getById(id: string): Promise<Request> {
    const request = db.getById(id)
    if (!request) throw new Error(`Request ${id} not found`)
    return request
  }

  async create(data: CreateRequestDTO): Promise<Request> {
    return db.create({ ...data, status: 'pending' })
  }

  async update(id: string, data: UpdateRequestDTO): Promise<Request> {
    const updated = db.update(id, data)
    if (!updated) throw new Error(`Request ${id} not found`)
    return updated
  }

  async updatePriority(id: string, priority: Request['priority']): Promise<Request> {
    const updated = db.update(id, { priority })
    if (!updated) throw new Error(`Request ${id} not found`)
    return updated
  }

  async delete(id: string): Promise<void> {
    const deleted = db.delete(id)
    if (!deleted) throw new Error(`Request ${id} not found`)
  }
}