'use client'

import { Menu, User } from 'lucide-react'
import { useAppDispatch } from '@/presentation/hooks/useAppDispatch'
import { toggleDrawer } from '@/presentation/store/uiSlice'

export function TopBar() {
  const dispatch = useAppDispatch()

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">

      <button
        onClick={() => dispatch(toggleDrawer())}
        className="tablet:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
      >
        <Menu size={20} />
      </button>

      <div className="hidden tablet:block" />

      <div className="flex items-center gap-3">
        <div className="text-right hidden tablet:block">
          <p className="text-sm font-medium text-gray-900">Erick Carrasco</p>
          <p className="text-xs text-gray-500">Gestor</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
          <User size={18} className="text-primary" />
        </div>
      </div>
    </header>
  )
}