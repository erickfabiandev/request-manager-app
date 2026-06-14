'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ClipboardList, PlusCircle, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useAppDispatch } from '@/presentation/hooks/useAppDispatch'
import { closeDrawer } from '@/presentation/store/uiSlice'
import { tv } from 'tailwind-variants'
import { useState } from 'react'

const navItem = tv({
  base: 'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
  variants: {
    active: {
      true: 'bg-white/10 text-white',
      false: 'text-gray-400 hover:bg-white/5 hover:text-white',
    },
    collapsed: {
      true: 'justify-center px-2',
      false: '',
    },
  },
})

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/requests', label: 'Solicitudes', icon: ClipboardList },
  { href: '/requests/new', label: 'Nueva solicitud', icon: PlusCircle },
]

interface SidebarProps {
  isMobile?: boolean
  collapsible?: boolean
  collapsed?: boolean
}

export function Sidebar({
  isMobile = false,
  collapsible = false,
  collapsed: initialCollapsed = false,
}: SidebarProps) {
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed)

  return (
    <div className={`flex flex-col h-full bg-secondary text-white transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-60'
    }`}>
      {/* Header */}
      <div className={`flex items-center p-6 ${isCollapsed ? 'justify-center p-4' : 'justify-between'}`}>
        <div>
          <p className="text-xl font-bold text-white">RM</p>
          {!isCollapsed && (
            <p className="text-xs text-gray-400">Gestor de Solicitudes</p>
          )}
        </div>
        {isMobile && (
          <button
            onClick={() => dispatch(closeDrawer())}
            className="text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={() => isMobile && dispatch(closeDrawer())}
            className={navItem({ active: pathname === href, collapsed: isCollapsed })}
            title={isCollapsed ? label : undefined}
          >
            <Icon size={18} />
            {!isCollapsed && label}
          </Link>
        ))}
      </nav>

      {/* Botón collapse — solo cuando collapsible=true */}
      {collapsible && (
        <div className="p-3">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center p-2 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      )}
    </div>
  )
}