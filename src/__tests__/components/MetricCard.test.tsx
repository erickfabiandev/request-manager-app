import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MetricCard } from '@/presentation/components/Dashboard/MetricCard'
import { Clock } from 'lucide-react'

describe('MetricCard', () => {
  it('should render label and value', () => {
    render(
      <MetricCard
        label="Pendientes"
        value={32}
        icon={Clock}
        status="pending"
      />
    )
    expect(screen.getByText('Pendientes')).toBeInTheDocument()
    expect(screen.getByText('32')).toBeInTheDocument()
  })

  it('should render zero value', () => {
    render(
      <MetricCard
        label="Aprobadas"
        value={0}
        icon={Clock}
        status="approved"
      />
    )
    expect(screen.getByText('0')).toBeInTheDocument()
  })
})