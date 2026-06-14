import { RequestApiAdapter } from '@/infrastructure/adapters/RequestApiAdapter'
import { GetRequests } from '@/domain/usecases/GetRequests'
import { GetRequestById } from '@/domain/usecases/GetRequestById'
import { CreateRequest } from '@/domain/usecases/CreateRequest'
import { UpdateRequest } from '@/domain/usecases/UpdateRequest'
import { DeleteRequest } from '@/domain/usecases/DeleteRequest'

const requestRepository = new RequestApiAdapter()

export const container = {
  getRequests: new GetRequests(requestRepository),
  getRequestById: new GetRequestById(requestRepository),
  createRequest: new CreateRequest(requestRepository),
  updateRequest: new UpdateRequest(requestRepository),
  deleteRequest: new DeleteRequest(requestRepository),
} as const