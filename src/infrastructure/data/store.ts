import type { Request } from '@/domain/models/Request'
import { seedRequests } from './seed'

let requests: Request[] = [...seedRequests]
let counter = seedRequests.length

export const db = {
  getAll: () => requests,

  getById: (id: string) =>
    requests.find(r => r.id === id) ?? null,

  create: (data: Omit<Request, 'id' | 'creationDate' | 'lastChangeDate'>): Request => {
    counter++
    const newRequest: Request = {
      ...data,
      id: `REQ-${String(counter).padStart(3, '0')}`,
      creationDate: new Date().toISOString(),
      lastChangeDate: new Date().toISOString(),
    }
    requests = [...requests, newRequest]
    return newRequest
  },

  update: (id: string, data: Partial<Request>): Request | null => {
    const index = requests.findIndex(r => r.id === id)
    if (index === -1) return null
    const updated: Request = {
      ...requests[index],
      ...data,
      lastChangeDate: new Date().toISOString(),
    }
    requests = requests.map(r => r.id === id ? updated : r)
    return updated
  },

  delete: (id: string): boolean => {
    const exists = requests.some(r => r.id === id)
    requests = requests.filter(r => r.id !== id)
    return exists
  },
}