import type { RequestRepository } from '@/domain/ports/RequestRepository'
import type { Request, UpdateRequestDTO } from '@/domain/models/Request'

export class UpdateRequest {
  constructor(private readonly repository: RequestRepository) {}

  async execute(id: string, data: UpdateRequestDTO): Promise<Request> {
    if (!id) throw new Error('Request ID is required')
    return this.repository.update(id, data)
  }
}