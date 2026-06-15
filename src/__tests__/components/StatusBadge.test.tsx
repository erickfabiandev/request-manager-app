import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatusBadge } from '@/shared/components/StatusBadge'

describe('StatusBadge', () => {
  it('should render pending status', () => {
    render(<StatusBadge status="pending" />)
    expect(screen.getByText('Pendiente')).toBeInTheDocument()
  })

  it('should render in_review status', () => {
    render(<StatusBadge status="in_review" />)
    expect(screen.getByText('En revisión')).toBeInTheDocument()
  })

  it('should render approved status', () => {
    render(<StatusBadge status="approved" />)
    expect(screen.getByText('Aprobada')).toBeInTheDocument()
  })

  it('should render rejected status', () => {
    render(<StatusBadge status="rejected" />)
    expect(screen.getByText('Rechazada')).toBeInTheDocument()
  })

  it('should render closed status', () => {
    render(<StatusBadge status="closed" />)
    expect(screen.getByText('Cerrada')).toBeInTheDocument()
  })
})