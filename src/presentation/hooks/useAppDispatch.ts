import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/presentation/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()