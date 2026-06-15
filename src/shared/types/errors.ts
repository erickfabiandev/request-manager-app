export interface ApiError {
  status: number
  data: {
    error: string
  }
}

export const isApiError = (error: unknown): error is ApiError =>
  typeof error === 'object' &&
  error !== null &&
  'status' in error &&
  'data' in error

export const getErrorMessage = (error: unknown): string => {
  if (isApiError(error)) return error.data.error
  if (error instanceof Error) return error.message
  return 'Error desconocido'
}