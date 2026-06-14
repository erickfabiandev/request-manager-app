import { tv } from 'tailwind-variants'

const spinner = tv({
  base: 'animate-spin rounded-full border-2 border-gray-200 border-t-primary',
  variants: {
    size: {
      sm: 'w-4 h-4',
      md: 'w-8 h-8',
      lg: 'w-12 h-12',
    },
  },
  defaultVariants: { size: 'md' },
})

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  fullScreen?: boolean
}

export function LoadingSpinner({ size, fullScreen = false }: LoadingSpinnerProps) {
  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className={spinner({ size })} />
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center py-8">
      <div className={spinner({ size })} />
    </div>
  )
}