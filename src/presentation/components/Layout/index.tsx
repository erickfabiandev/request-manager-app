'use client'

import { useAppSelector } from '@/presentation/hooks/useAppSelector'
import { useAppDispatch } from '@/presentation/hooks/useAppDispatch'
import { closeDrawer } from '@/presentation/store/uiSlice'
import { Sidebar } from '@/presentation/components/Sidebar'
import { TopBar } from '@/presentation/components/TopBar'

interface LayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: LayoutProps) {
  const isDrawerOpen = useAppSelector(state => state.ui.isDrawerOpen)
  const dispatch = useAppDispatch()

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden">

      <aside className="hidden desktop:flex flex-shrink-0">
        <Sidebar collapsible/>
      </aside>

      <aside className="hidden laptop:flex desktop:hidden flex-shrink-0">
        <Sidebar collapsible collapsed/>
      </aside>

      <aside className="hidden tablet:flex laptop:hidden flex-shrink-0">
        <Sidebar collapsed />
      </aside>

      {isDrawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 tablet:hidden"
            onClick={() => dispatch(closeDrawer())}
          />
          <aside className="fixed left-0 top-0 h-full z-50 tablet:hidden">
            <Sidebar isMobile />
          </aside>
        </>
      )}

      {/* Contenido principal */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}