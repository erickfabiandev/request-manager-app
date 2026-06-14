import { Clock, RefreshCw, CheckCircle, XCircle, Archive } from 'lucide-react'
import { MetricCard } from '@/presentation/components/Dashboard/MetricCard'
import { StatusChart } from '@/presentation/components/Dashboard/StatusChart'
import { PriorityChart } from '@/presentation/components/Dashboard/PriorityChart'
import { RecentRequests } from '@/presentation/components/Dashboard/RecentRequests'
import { env } from '@/config/env' 

async function getDashboardData() {
  const res = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/api/v1/requests?limit=100`,
    { cache: 'no-store' }
  )
  if (!res.ok) throw new Error('Failed to fetch dashboard data')
  const data = await res.json()
  return data.data
}

export default async function DashboardPage() {
  const requests = await getDashboardData()

  const metrics = {
    pending: requests.filter((r: any) => r.status === 'pending').length,
    in_review: requests.filter((r: any) => r.status === 'in_review').length,
    approved: requests.filter((r: any) => r.status === 'approved').length,
    rejected: requests.filter((r: any) => r.status === 'rejected').length,
    closed: requests.filter((r: any) => r.status === 'closed').length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Resumen general de solicitudes</p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-5 gap-4">
        <MetricCard label="Pendientes" value={metrics.pending} icon={Clock} status="pending" />
        <MetricCard label="En revisión" value={metrics.in_review} icon={RefreshCw} status="in_review" />
        <MetricCard label="Aprobadas" value={metrics.approved} icon={CheckCircle} status="approved" />
        <MetricCard label="Rechazadas" value={metrics.rejected} icon={XCircle} status="rejected" />
        <MetricCard label="Cerradas" value={metrics.closed} icon={Archive} status="closed" />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 laptop:grid-cols-2 gap-4">
        <StatusChart requests={requests} />
        <PriorityChart requests={requests} />
      </div>

      {/* Recientes */}
      <RecentRequests requests={requests} />
    </div>
  )
}
