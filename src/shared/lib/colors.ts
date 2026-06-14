import type { RequestStatus, RequestPriority } from '@/domain/models/Request'

export const STATUS_COLORS: Record<RequestStatus, {
  bg: string
  text: string
  lightBg: string
  chart: string
}> = {
  pending:   { bg: 'bg-yellow-50', text: 'text-yellow-500', lightBg: 'bg-yellow-100', chart: '#F59E0B' },
  in_review: { bg: 'bg-blue-50',   text: 'text-blue-500',   lightBg: 'bg-blue-100',   chart: '#3B82F6' },
  approved:  { bg: 'bg-green-50',  text: 'text-green-500',  lightBg: 'bg-green-100',  chart: '#10B981' },
  rejected:  { bg: 'bg-red-50',    text: 'text-red-500',    lightBg: 'bg-red-100',    chart: '#EF4444' },
  closed:    { bg: 'bg-gray-50',   text: 'text-gray-500',   lightBg: 'bg-gray-100',   chart: '#6B7280' },
}

export const PRIORITY_COLORS: Record<RequestPriority, {
  bg: string
  text: string
  lightBg: string
  chart: string
}> = {
  low:      { bg: 'bg-gray-50',   text: 'text-gray-700',   lightBg: 'bg-gray-100',   chart: '#3B82F6' },
  medium:   { bg: 'bg-yellow-50', text: 'text-yellow-700', lightBg: 'bg-yellow-100', chart: '#F59E0B' },
  high:     { bg: 'bg-orange-50', text: 'text-orange-700', lightBg: 'bg-orange-100', chart: '#EF4444' },
  critical: { bg: 'bg-red-50',    text: 'text-red-800',    lightBg: 'bg-red-100',    chart: '#8B5CF6' },
}