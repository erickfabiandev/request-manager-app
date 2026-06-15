'use client'

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { Request } from '@/domain/models/Request'
import { STATUS_LABELS } from '@/shared/lib/labels'
import { STATUS_COLORS } from '@/shared/lib/colors'

interface StatusChartProps {
  requests: Request[]
}

interface LegendEntry {
  payload: {
    value: number
    status: string
  }
}

export function StatusChart({ requests }: StatusChartProps) {
  const data = Object.entries(
    requests.reduce<Record<string, number>>((acc, r) => {
      acc[r.status] = (acc[r.status] ?? 0) + 1
      return acc
    }, {})
  ).map(([status, value]) => ({
    name: STATUS_LABELS[status as Request['status']],
    value,
    status,
    color: STATUS_COLORS[status as Request['status']].chart,
  }))

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-1">Solicitudes por estado</h3>
      <p className="text-xs text-gray-400 mb-4">Distribución actual</p>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="40%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell key={entry.status} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            formatter={(value, entry: unknown) =>{
              const legendEntry = entry as LegendEntry
              return (
                <span className="text-xs text-gray-600">
                  {value} — {legendEntry.payload.value}
                </span>
              )
            } }
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}