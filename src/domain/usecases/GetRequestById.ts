import type { RequestRepository } from '@/domain/ports/RequestRepository'
import type { Request } from '@/domain/models/Request'

export class GetRequestById {
  constructor(private readonly repository: RequestRepository) {}

  async execute(id: string): Promise<Request> {
    if (!id) throw new Error('Request ID is required')
    return this.repository.getById(id)
  }
}