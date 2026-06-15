import { tv } from 'tailwind-variants'
import { STATUS_COLORS, PRIORITY_COLORS } from '@/shared/lib/colors'
import type { RequestStatus, RequestPriority, RequestCategory } from '@/domain/models/Request'

export const statusBadge = tv({
  base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
  variants: {
    status: Object.fromEntries(
      Object.entries(STATUS_COLORS).map(([key, val]) => [
        key,
        `${val.lightBg} ${val.text}`,
      ])
    ) as Record<RequestStatus, string>,
  },
})

export const priorityBadge = tv({
  base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
  variants: {
    priority: Object.fromEntries(
      Object.entries(PRIORITY_COLORS).map(([key, val]) => [
        key,
        `${val.lightBg} ${val.text}`,
      ])
    ) as Record<RequestPriority, string>,
  },
})

export const categoryBadge = tv({
  base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
  variants: {
    category: {
      hardware: 'bg-blue-100 text-blue-700',
      software: 'bg-purple-100 text-purple-700',
      access: 'bg-teal-100 text-teal-700',
      license: 'bg-indigo-100 text-indigo-700',
      other: 'bg-gray-100 text-gray-700',
    } as Record<RequestCategory, string>,
  },
})