import type { RequestRepository } from '@/domain/ports/RequestRepository'

export class DeleteRequest {
  constructor(private readonly repository: RequestRepository) {}

  async execute(id: string): Promise<void> {
    if (!id) throw new Error('Request ID is required')
    return this.repository.delete(id)
  }
}