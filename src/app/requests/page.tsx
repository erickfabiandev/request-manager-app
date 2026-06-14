'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import { useGetRequestsQuery, useDeleteRequestMutation } from '@/presentation/store/requestsApi'
import { RequestsTable } from '@/presentation/components/Requests/RequestsTable'
import { RequestsFilters } from '@/presentation/components/Requests/RequestsFilters'
import { RequestCard } from '@/presentation/components/Requests/RequestCard'
import { Pagination, EmptyState, LoadingSpinner, Modal, Button } from '@/shared/components'
import { useAppDispatch } from '@/presentation/hooks/useAppDispatch'
import {  useAppSelector } from '@/presentation/hooks/useAppSelector'
import { openDeleteModal, closeDeleteModal } from '@/presentation/store/uiSlice'
import { PAGINATION } from '@/config/constants'
import type { Request } from '@/domain/models/Request'
import { useDebounce } from '@/shared/hooks/useDebounce'

export default function RequestsPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const isDeleteModalOpen = useAppSelector(state => state.ui.isDeleteModalOpen)
  const selectedRequestId = useAppSelector(state => state.ui.selectedRequestId)

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')
  const [page, setPage] = useState(1)
  const [sortField, setSortField] = useState('creationDate')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const debouncedSearch = useDebounce(search, 300)

  const { data, isLoading, isError } = useGetRequestsQuery({
    search: debouncedSearch,
    status: status as Request['status'] | undefined,
    priority: priority as Request['priority'] | undefined,
    page,
    limit: PAGINATION.DEFAULT_LIMIT,
  })

  const [deleteRequest, { isLoading: isDeleting }] = useDeleteRequestMutation()

  const handleSort = useCallback((field: string) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }, [sortField])

  const handleClear = useCallback(() => {
    setSearch('')
    setStatus('')
    setPriority('')
    setPage(1)
  }, [])

  const handleDelete = useCallback(async () => {
    if (!selectedRequestId) return
    await deleteRequest(selectedRequestId)
    dispatch(closeDeleteModal())
  }, [selectedRequestId, deleteRequest, dispatch])

  const sortedRequests = [...(data?.data ?? [])].sort((a, b) => {
    const aVal = String(a[sortField as keyof Request] ?? '')
    const bVal = String(b[sortField as keyof Request] ?? '')
    return sortOrder === 'asc'
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal)
  })

  if (isLoading) return <LoadingSpinner fullScreen />
  if (isError) return (
    <EmptyState
      title="Error al cargar solicitudes"
      description="No se pudo conectar con el servidor. Intenta nuevamente."
    />
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Solicitudes</h1>
          <p className="text-sm text-gray-500 mt-1">Consulta y gestión de solicitudes</p>
        </div>
        <Button onClick={() => router.push('/requests/new')}>
          <Plus size={16} />
          Nueva Solicitud
        </Button>
      </div>

      {/* Filters */}
      <RequestsFilters
        search={search}
        status={status}
        priority={priority}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onPriorityChange={setPriority}
        onClear={handleClear}
      />

      {/* Table — tablet+ */}
      {sortedRequests.length === 0 ? (
        <EmptyState
          title="Sin solicitudes"
          description="No se encontraron solicitudes con los filtros aplicados."
        />
      ) : (
        <>
          <div className="hidden tablet:block bg-white rounded-xl border border-gray-100">
            <RequestsTable
              requests={sortedRequests}
              onDelete={(id) => dispatch(openDeleteModal(id))}
              onSort={handleSort}
              sortField={sortField}
              sortOrder={sortOrder}
            />
          </div>

          {/* Cards — mobile */}
          <div className="tablet:hidden space-y-3">
            {sortedRequests.map(request => (
              <RequestCard
                key={request.id}
                request={request}
                onDelete={(id) => dispatch(openDeleteModal(id))}
              />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={data?.totalPages ?? 1}
            onPageChange={setPage}
          />

          <p className="text-xs text-gray-400 text-center">
            Mostrando {sortedRequests.length} de {data?.total ?? 0} solicitudes
          </p>
        </>
      )}

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        title="Eliminar solicitud"
        description="¿Estás seguro que deseas eliminar esta solicitud? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        onConfirm={handleDelete}
        onCancel={() => dispatch(closeDeleteModal())}
        isLoading={isDeleting}
      />
    </div>
  )
}