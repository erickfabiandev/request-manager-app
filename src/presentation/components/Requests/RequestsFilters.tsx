'use client'

import { Search, Filter, X } from 'lucide-react'
import { tv } from 'tailwind-variants'
import { STATUS_LABELS, PRIORITY_LABELS } from '@/shared/lib/labels'
import { Button } from '@/shared/components'

const searchInput = tv({
  base: 'w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
})

const filterSelect = tv({
  base: 'text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white',
})

interface RequestsFiltersProps {
  search: string
  status: string
  priority: string
  onSearchChange: (value: string) => void
  onStatusChange: (value: string) => void
  onPriorityChange: (value: string) => void
  onClear: () => void
}

export function RequestsFilters({
  search,
  status,
  priority,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onClear,
}: RequestsFiltersProps) {
  const hasFilters = search || status || priority

  return (
    <div className="flex flex-col tablet:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por número o título..."
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          className={searchInput()}
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <div className="flex items-center gap-1.5">
          <Filter size={14} className="text-gray-400" />
          <select
            value={status}
            onChange={e => onStatusChange(e.target.value)}
            className={filterSelect()}
          >
            <option value="">Estado: Todos</option>
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1.5">
          <Filter size={14} className="text-gray-400" />
          <select
            value={priority}
            onChange={e => onPriorityChange(e.target.value)}
            className={filterSelect()}
          >
            <option value="">Prioridad: Todas</option>
            {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={onClear}>
            <X size={14} />
            Limpiar
          </Button>
        )}
      </div>
    </div>
  )
}