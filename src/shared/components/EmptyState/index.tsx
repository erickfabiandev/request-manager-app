import { Inbox } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  description?: string
}

export function EmptyState({
  title = 'Sin resultados',
  description = 'No se encontraron datos para mostrar.',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <Inbox className="text-gray-300" size={48} />
      <p className="text-gray-700 font-medium">{title}</p>
      <p className="text-gray-400 text-sm text-center max-w-xs">{description}</p>
    </div>
  )
}