'use client'

import { useRouter } from 'next/navigation'
import { RequestForm } from '@/presentation/components/RequestForm'
import { useCreateRequestMutation } from '@/presentation/store/requestsApi'
import type { CreateRequestFormData } from '@/domain/rules/RequestSchema'
import { toast } from 'sonner'
import { getErrorMessage } from '@/shared/types/errors'

export default function NewRequestPage() {
  const router = useRouter()
  const [createRequest, { isLoading }] = useCreateRequestMutation()

  const handleSubmit = async (data: CreateRequestFormData) => {
    try {
        await createRequest(data).unwrap()
        toast.success('Solicitud creada correctamente')
        router.refresh()
    } catch (error) {
        toast.error(getErrorMessage(error))
    }
  }

  return (
    <RequestForm
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  )
}