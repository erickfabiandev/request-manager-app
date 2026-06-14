import { format, formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

export const formatDate = (dateString: string): string =>
  format(new Date(dateString), 'dd/MM/yyyy HH:mm')

export const formatDateShort = (dateString: string): string =>
  format(new Date(dateString), 'dd MMM yyyy', { locale: es })

export const formatRelativeDate = (dateString: string): string =>
  formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: es })