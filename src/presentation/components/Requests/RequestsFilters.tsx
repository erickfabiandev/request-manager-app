'use client'

import { Search, X, ChevronDown } from 'lucide-react'
import { tv } from 'tailwind-variants'
import { STATUS_LABELS, PRIORITY_LABELS } from '@/shared/lib/labels'
import { Button } from '@/shared/components'
import { RequestPriority, RequestStatus } from '@/domain/models/Request'

const searchInput = tv({
  base: 'w-full pl-9 pr-4 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
})

const filterSelect = tv({
  base: 'w-full text-sm border border-neutral-200 rounded-lg pl-3 pr-9 py-2 m-0 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white cursor-pointer',
})

interface RequestsFiltersProps {
  search: string
  status: RequestStatus | ''
  priority: RequestPriority | ''
  onSearchChange: (value: string) => void
  onStatusChange: (value: RequestStatus) => void
  onPriorityChange: (value: RequestPriority) => void
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

      <div className="flex gap-2 flex-wrap">
        <div className="relative flex items-center min-w-[140px]">
          <select
           id='select-status'
            value={status}
            onChange={e => onStatusChange(e.target.value as RequestStatus)}
            className={filterSelect()}
          >
            <option value="">Estado: Todos</option>
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 text-gray-400 pointer-events-none" />
        </div>

        <div className="relative flex items-center min-w-[140px]">
          <select
           id='select-priority'
            value={priority}
            onChange={e => onPriorityChange(e.target.value as RequestPriority)}
            className={filterSelect()}
          >
            <option value="">Prioridad: Todas</option>
            {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 text-gray-400 pointer-events-none" />
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