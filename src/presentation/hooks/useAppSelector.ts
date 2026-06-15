import { useSelector, type TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/presentation/store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector