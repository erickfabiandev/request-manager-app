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
    <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colors.bg} ${colors.text}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className={`text-2xl font-bold ${colors.text}`}>{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  )
}