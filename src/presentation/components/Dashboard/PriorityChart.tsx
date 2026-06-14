'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import type { Request } from '@/domain/models/Request'
import { PRIORITY_LABELS } from '@/shared/lib/labels'
import { PRIORITY_COLORS } from '@/shared/lib/colors'

interface PriorityChartProps {
  requests: Request[]
}

export function PriorityChart({ requests }: PriorityChartProps) {
  const data = Object.entries(
    requests.reduce<Record<string, number>>((acc, r) => {
      acc[r.priority] = (acc[r.priority] ?? 0) + 1
      return acc
    }, {})
  ).map(([priority, value]) => ({
    name: PRIORITY_LABELS[priority as Request['priority']],
    value,
    priority,
    color: PRIORITY_COLORS[priority as Request['priority']].chart,
  }))

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-1">Solicitudes por prioridad</h3>
      <p className="text-xs text-gray-400 mb-4">Distribución actual</p>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.priority} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}