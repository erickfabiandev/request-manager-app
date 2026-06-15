import { Clock, RefreshCw, CheckCircle, XCircle, Archive, LucideIcon } from 'lucide-react'
import { MetricCard } from '@/presentation/components/Dashboard/MetricCard'
import { StatusChart } from '@/presentation/components/Dashboard/StatusChart'
import { PriorityChart } from '@/presentation/components/Dashboard/PriorityChart'
import { RecentRequests } from '@/presentation/components/Dashboard/RecentRequests'
import { env } from '@/config/env' 
import { Request as RequestModel, RequestStatus} from '@/domain/models/Request'
import { STATUS_LABELS } from '@/shared/lib/labels'
import { STATUS_LIST } from '@/config/constants'

async function getDashboardData(): Promise<RequestModel[]> {
  const res = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/api/v1/requests?limit=100`,
    { cache: 'no-store' }
  )
  if (!res.ok) throw new Error('Failed to fetch dashboard data')
  const data = await res.json() as { data: RequestModel[] }
  return data.data ?? []
}

const countByStatus = (requests: RequestModel[], status: RequestStatus): number =>
  requests.filter(r => r.status === status).length

export default async function DashboardPage() {
  const requests = await getDashboardData()

  const metrics = {
    pending: countByStatus(requests, 'pending'),
    in_review: countByStatus(requests, 'in_review'),
    approved: countByStatus(requests, 'approved'),
    rejected: countByStatus(requests, 'rejected'),
    closed: countByStatus(requests, 'closed'),
  }

  const STATUS_ICONS: Record<RequestStatus, LucideIcon> = {
    pending: Clock,
    in_review: RefreshCw,
    approved: CheckCircle,
    rejected: XCircle,
    closed: Archive,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-secondary">Dashboard</h1>
        <p className="text-sm text-neutral-900/75 font-medium mt-1">Resumen general de solicitudes</p>
      </div>

      
      <div className="grid grid-cols-2 tablet:grid-cols-5 desktop:grid-cols-5 gap-4">
        {STATUS_LIST.map(status => (
          <MetricCard
            key={status}
            label={STATUS_LABELS[status]}
            value={metrics[status]}
            icon={STATUS_ICONS[status]}
            status={status}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 laptop:grid-cols-2 gap-4">
        <StatusChart requests={requests} />
        <PriorityChart requests={requests} />
      </div>

      <RecentRequests requests={requests} />
    </div>
  )
}
