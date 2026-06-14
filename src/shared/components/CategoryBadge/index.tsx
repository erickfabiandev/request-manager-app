import { categoryBadge } from '@/shared/lib/variants/badge.variants'
import { CATEGORY_LABELS } from '@/shared/lib/labels'
import type { RequestCategory } from '@/domain/models/Request'

interface CategoryBadgeProps {
  category: RequestCategory
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span className={categoryBadge({ category })}>
      {CATEGORY_LABELS[category]}
    </span>
  )
}