import type { RequestStatus, RequestPriority } from '@/domain/models/Request'

export const STATUS_COLORS: Record<RequestStatus, {
  bg: string
  text: string
  lightBg: string
  chart: string
}> = {
  pending:   { bg: 'bg-warning-subtle', text: 'text-warning-emphasis', lightBg: 'bg-warning-subtle', chart: '#F59E0B' },
  in_review: { bg: 'bg-primary-subtle',   text: 'text-primary-emphasis',   lightBg: 'bg-primary-subtle',   chart: '#3B82F6' },
  approved:  { bg: 'bg-success-subtle',  text: 'text-success-emphasis',  lightBg: 'bg-success-subtle',  chart: '#10B981' },
  rejected:  { bg: 'bg-danger-subtle',    text: 'text-danger-emphasis',    lightBg: 'bg-danger-subtle',    chart: '#EF4444' },
  closed:    { bg: 'bg-closed-subtle',   text: 'text-closed-emphasis',   lightBg: 'bg-closed-subtle',   chart: '#6B7280' },
}

export const PRIORITY_COLORS: Record<RequestPriority, {
  bg: string
  text: string
  lightBg: string
  chart: string
}> = {
  low:      { bg: 'bg-secondary-subtle',   text: 'text-secondary-emphasis',   lightBg: 'bg-secondary-subtle',   chart: '#3B82F6' },
  medium:   { bg: 'bg-warning-subtle', text: 'text-warning-emphasis', lightBg: 'bg-warning-subtle', chart: '#F59E0B' },
  high:     { bg: 'bg-danger-subtle', text: 'text-danger-emphasis', lightBg: 'bg-danger-subtle', chart: '#EF4444' },
  critical: { bg: 'bg-critical-subtle',    text: 'text-critical-emphasis',    lightBg: 'bg-critical-subtle',    chart: '#8B5CF6' },
}