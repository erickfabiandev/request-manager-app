import type { LucideIcon } from 'lucide-react'
import type { RequestStatus } from '@/domain/models/Request'
import { STATUS_COLORS } from '@/shared/lib/colors'

interface MetricCardProps {
  label: string
  value: number
  icon: LucideIcon
  status: RequestStatus
}

export function MetricCard({ label, value, icon: Icon, status }: MetricCardProps) {
  const colors = STATUS_COLORS[status]

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-4 flex flex-row tablet:flex-col laptop:flex-row items-start tablet:items-center laptop:items-start gap-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colors.bg} ${colors.text}`}>
        <Icon size={24} />
      </div>
      <div className="text-left tablet:text-center laptop:text-left">
        <p className={`text-3xl font-bold ${colors.text}`}>{value}</p>
        <p className="text-sm text-neutral-900/75">{label}</p>
      </div>
    </div>
  )
}