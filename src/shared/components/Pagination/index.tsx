'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const visiblePages = pages.filter(p =>
    p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
  )

  return (
    <div className="flex items-center justify-end gap-1 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={16} />
      </button>

      {visiblePages.map((page, idx) => {
        const prev = visiblePages[idx - 1]
        const showEllipsis = prev && page - prev > 1

        return (
          <div key={page} className="flex items-center gap-1">
            {showEllipsis && (
              <span className="px-2 text-gray-400 text-sm">...</span>
            )}
            <button
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                currentPage === page
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {page}
            </button>
          </div>
        )
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}