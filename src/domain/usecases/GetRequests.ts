import type { RequestRepository, RequestFilters, PaginatedResponse } from '@/domain/ports/RequestRepository'
import type { Request } from '@/domain/models/Request'

export class GetRequests {
  constructor(private readonly repository: RequestRepository) {}

  async execute(filters: RequestFilters): Promise<PaginatedResponse<Request>> {
    return this.repository.getAll(filters)
  }
}