import type { RequestRepository, RequestFilters, PaginatedResponse } from '@/domain/ports/RequestRepository'
import type { Request, CreateRequestDTO, UpdateRequestDTO } from '@/domain/models/Request'

export class RequestApiAdapter implements RequestRepository {
  private readonly baseUrl = '/api/v1/requests'

  async getAll(filters: RequestFilters): Promise<PaginatedResponse<Request>> {
    const params = new URLSearchParams()

    if (filters.status) params.append('status', filters.status)
    if (filters.priority) params.append('priority', filters.priority)
    if (filters.search) params.append('search', filters.search)
    if (filters.page) params.append('page', String(filters.page))
    if (filters.limit) params.append('limit', String(filters.limit))

    const res = await fetch(`${this.baseUrl}?${params.toString()}`)
    if (!res.ok) throw new Error('Failed to fetch requests')
    return res.json() as Promise<PaginatedResponse<Request>>
  }

  async getById(id: string): Promise<Request> {
    const res = await fetch(`${this.baseUrl}/${id}`)
    if (!res.ok) throw new Error(`Request ${id} not found`)
    return res.json() as Promise<Request>
  }

  async create(data: CreateRequestDTO): Promise<Request> {
    const res = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to create request')
    return res.json() as Promise<Request>
  }

  async update(id: string, data: UpdateRequestDTO): Promise<Request> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to update request')
    return res.json() as Promise<Request>
  }

  async updatePriority(id: string, priority: Request['priority']): Promise<Request> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priority }),
    })
    if (!res.ok) throw new Error('Failed to update priority')
    return res.json() as Promise<Request>
  }

  async delete(id: string): Promise<void> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error('Failed to delete request')
  }
}