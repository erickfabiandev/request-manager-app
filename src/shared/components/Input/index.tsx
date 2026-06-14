'use client'

import { input } from '@/shared/lib/variants/input.variants'
import type { VariantProps } from 'tailwind-variants'

interface InputProps extends VariantProps<typeof input> {
  name: string
  label?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  disabled?: boolean
  type?: string
  className?: string
}

export function Input({
  name,
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  type = 'text',
  size,
  className,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={input({
          state: error ? 'error' : disabled ? 'disabled' : 'default',
          size,
          className,
        })}
      />
      {error && (
        <span className="text-xs text-red-500">{error}</span>
      )}
    </div>
  )
}