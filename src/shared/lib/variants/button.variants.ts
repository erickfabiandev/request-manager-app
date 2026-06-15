import { tv } from 'tailwind-variants'

export const button = tv({
  base: 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  variants: {
    variant: {
      primary: 'bg-primary text-neutral-50 hover:bg-primary/95 focus:ring-primary-solid',
      secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-300',
      danger: 'bg-danger text-white hover:bg-danger/90 focus:ring-danger-solid',
      ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-300',
    },
    size: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})