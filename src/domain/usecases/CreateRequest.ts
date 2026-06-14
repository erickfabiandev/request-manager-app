import type { RequestRepository } from '@/domain/ports/RequestRepository'
import type { Request, CreateRequestDTO } from '@/domain/models/Request'

export class CreateRequest {
  constructor(private readonly repository: RequestRepository) {}

  async execute(data: CreateRequestDTO): Promise<Request> {
    return this.repository.create(data)
  }
}