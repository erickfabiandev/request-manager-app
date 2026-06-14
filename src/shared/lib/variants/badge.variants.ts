import { tv } from 'tailwind-variants'

export const statusBadge = tv({
  base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
  variants: {
    status: {
      pending: 'bg-yellow-100 text-yellow-800',
      in_review: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      closed: 'bg-gray-100 text-gray-800',
    },
  },
})

export const priorityBadge = tv({
  base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
  variants: {
    priority: {
      low: 'bg-gray-100 text-gray-700',
      medium: 'bg-yellow-100 text-yellow-700',
      high: 'bg-orange-100 text-orange-700',
      critical: 'bg-red-100 text-red-800',
    },
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
    },
  },
})