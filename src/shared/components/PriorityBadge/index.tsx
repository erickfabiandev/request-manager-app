import { priorityBadge } from '@/shared/lib/variants/badge.variants'
import { PRIORITY_LABELS } from '@/shared/lib/labels'
import type { RequestPriority } from '@/domain/models/Request'

interface PriorityBadgeProps {
  priority: RequestPriority
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <span className={priorityBadge({ priority })}>
      {PRIORITY_LABELS[priority]}
    </span>
  )
}