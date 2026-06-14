export interface ApiError {
  error: string
  status?: number
}

export interface SelectOption<T extends string = string> {
  value: T
  label: string
}