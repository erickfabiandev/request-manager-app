import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Request, CreateRequestDTO, UpdateRequestDTO } from '@/domain/models/Request'
import type { RequestFilters, PaginatedResponse } from '@/domain/ports/RequestRepository'

export const requestsApi = createApi({
  reducerPath: 'requestsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  tagTypes: ['Request'],
  endpoints: (builder) => ({
    getRequests: builder.query<PaginatedResponse<Request>, RequestFilters>({
      query: (filters) => {
        const params = new URLSearchParams()
        if (filters.status) params.append('status', filters.status)
        if (filters.priority) params.append('priority', filters.priority)
        if (filters.search) params.append('search', filters.search)
        if (filters.page) params.append('page', String(filters.page))
        if (filters.limit) params.append('limit', String(filters.limit))
        return `requests?${params.toString()}`
      },
      providesTags: ['Request'],
    }),

    getRequestById: builder.query<Request, string>({
      query: (id) => `requests/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Request', id }],
    }),

    createRequest: builder.mutation<Request, CreateRequestDTO>({
      query: (body) => ({
        url: 'requests',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Request'],
    }),

    updateRequest: builder.mutation<Request, { id: string; data: UpdateRequestDTO }>({
      query: ({ id, data }) => ({
        url: `requests/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Request', id }, 'Request'],
    }),

    updatePriority: builder.mutation<Request, { id: string; priority: Request['priority'] }>({
      query: ({ id, priority }) => ({
        url: `requests/${id}`,
        method: 'PATCH',
        body: { priority },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Request', id }, 'Request'],
    }),

    deleteRequest: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `requests/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Request'],
    }),
  }),
})

export const {
  useGetRequestsQuery,
  useGetRequestByIdQuery,
  useCreateRequestMutation,
  useUpdateRequestMutation,
  useUpdatePriorityMutation,
  useDeleteRequestMutation,
} = requestsApi