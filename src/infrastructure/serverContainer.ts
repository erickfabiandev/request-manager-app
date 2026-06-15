import { RequestStoreAdapter } from '@/infrastructure/adapters/RequestStoreAdapter'
import { GetRequests } from '@/domain/usecases/GetRequests'
import { GetRequestById } from '@/domain/usecases/GetRequestById'

const serverRepository = new RequestStoreAdapter()

export const serverContainer = {
  getRequests: new GetRequests(serverRepository),
  getRequestById: new GetRequestById(serverRepository),
} as const