'use client'

import { button } from '@/shared/lib/variants/button.variants'
import type { VariantProps } from 'tailwind-variants'

interface ButtonProps extends VariantProps<typeof button> {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
}

export function Button({
  children,
  variant,
  size,
  onClick,
  type = 'button',
  disabled = false,
  className,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={button({ variant, size, className })}
    >
      {children}
    </button>
  )
}