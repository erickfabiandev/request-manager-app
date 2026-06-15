'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useGetRequestByIdQuery, useUpdateRequestMutation } from '@/presentation/store/requestsApi'
import { RequestDetailView } from '@/presentation/components/RequestDetail/RequestDetailView'
import { RequestEditForm } from '@/presentation/components/RequestDetail/RequestEditForm'
import { LoadingSpinner, EmptyState } from '@/shared/components'
import { toast } from 'sonner'
import { EditRequestFormData } from '@/domain/rules/RequestSchema'
import { getErrorMessage } from '@/shared/types/errors'


export default function RequestDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [isEditing, setIsEditing] = useState<boolean>(false)

    const router = useRouter()

  const { data: request, isLoading, isError } = useGetRequestByIdQuery(id)
  const [updateRequest, { isLoading: isUpdating }] = useUpdateRequestMutation()

  const handleSave = async (data: EditRequestFormData) => {
  try {
    await updateRequest({ id, data }).unwrap()
    toast.success('Solicitud actualizada correctamente')
    setIsEditing(false)
    router.refresh()
  } catch (error) {
    toast.error(getErrorMessage(error))
  }
}

  if (isLoading) return <LoadingSpinner fullScreen />
  if (isError || !request) return (
    <EmptyState
      title="Solicitud no encontrada"
      description="La solicitud que buscas no existe o fue eliminada."
    />
  )

  return isEditing ? (
    <RequestEditForm
      request={request}
      onSave={handleSave}
      onCancel={() => setIsEditing(false)}
      isLoading={isUpdating}
    />
  ) : (
    <RequestDetailView
      request={request}
      onEdit={() => setIsEditing(true)}
    />
  )
}