export type RequestStatus =
  | 'pending'
  | 'in_review'
  | 'approved'
  | 'rejected'
  | 'closed'


export type RequestPriority =
  | 'low'
  | 'medium'
  | 'high'
  | 'critical'

export type RequestCategory =
  | 'hardware'
  | 'software'
  | 'access'
  | 'license'
  | 'other'

export interface Request {
  readonly id: string
  title: string
  description: string
  requester: string
  category: RequestCategory
  priority: RequestPriority
  status: RequestStatus
  readonly creationDate: string
  lastChangeDate: string
}

export interface CreateRequestDTO {
  title: string
  description: string
  requester: string
  category: RequestCategory
  priority: RequestPriority
}

export interface UpdateRequestDTO {
  title?: string
  description?: string
  category?: RequestCategory
  priority?: RequestPriority
  status?: RequestStatus
}