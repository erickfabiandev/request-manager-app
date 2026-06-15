import { tv } from 'tailwind-variants'

export const input = tv({
  base: 'w-full rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 placeholder:text-gray-400',
  variants: {
    state: {
      default: 'border-gray-200 focus:border-primary focus:ring-primary/20',
      error: 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50',
      disabled: 'border-gray-200 bg-gray-50 cursor-not-allowed text-gray-400',
    },
    size: {
      sm: 'px-3 py-1.5',
      md: 'px-3 py-2',
      lg: 'px-4 py-3',
    },
  },
  defaultVariants: {
    state: 'default',
    size: 'md',
  },
})

export const label = tv({
  base: 'text-sm font-medium text-gray-700',
  variants: {
    required: {
      true: "after:content-['*'] after:ml-0.5 after:text-red-500",
    },
  },
})

export const errorMessage = tv({
  base: 'text-xs text-red-500 mt-1',
})

export const textarea = tv({
  base: 'w-full rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 placeholder:text-gray-400 resize-none',
  variants: {
    state: {
      default: 'border-gray-200 focus:border-primary focus:ring-primary/20',
      error: 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50',
    },
    size: {
      sm: 'px-3 py-1.5',
      md: 'px-3 py-2',
      lg: 'px-4 py-3',
    },
  },
  defaultVariants: {
    state: 'default',
    size: 'md',
  },
})