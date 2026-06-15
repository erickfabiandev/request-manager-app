import { statusBadge } from '@/shared/lib/variants/badge.variants'
import { STATUS_LABELS } from '@/shared/lib/labels'
import type { RequestStatus } from '@/domain/models/Request'

interface StatusBadgeProps {
  status: RequestStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={statusBadge({ status })}>
      {STATUS_LABELS[status]}
    </span>
  )
}