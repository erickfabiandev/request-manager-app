import { tv } from 'tailwind-variants'

export const select = tv({
  base: 'w-full text-sm border border-neutral-200 rounded-lg pl-3 pr-9 py-2 m-0 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white cursor-pointer transition-colors',
  variants: {
    state: {
      default: 'border-neutral-200 text-gray-700',
      error: 'border-danger focus:border-danger focus:ring-danger bg-danger-subtle',
      disabled: 'border-neutral-200 bg-gray-50 cursor-not-allowed text-gray-400 pointer-events-none',
    },
    size: {
      sm: 'py-1.5',
      md: 'py-2',
      lg: 'py-3',
    },
  },
  defaultVariants: {
    state: 'default',
    size: 'md',
  },
})