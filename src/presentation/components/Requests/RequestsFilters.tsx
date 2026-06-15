'use client'

import { Search, X, ChevronDown } from 'lucide-react'
import { STATUS_LABELS, PRIORITY_LABELS } from '@/shared/lib/labels'
import { Button } from '@/shared/components'
import { RequestPriority, RequestStatus } from '@/domain/models/Request'
import { select } from '@/shared/lib/variants/select.variants'
import { input } from '@/shared/lib/variants/input.variants'

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
          className={input({ state: 'default', size: 'md' }) + ' pl-9 pr-4'}
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        <div className="relative flex items-center min-w-[140px]">
          <select
           id='select-status'
            value={status}
            onChange={e => onStatusChange(e.target.value as RequestStatus)}
            className={select({ state: 'default' })}
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
            className={select({ state: 'default' })}
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