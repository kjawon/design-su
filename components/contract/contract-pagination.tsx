import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import type { ReactNode } from "react"

type ContractPaginationProps = {
  currentPage: number
  totalPages: number
  onChange: (page: number) => void
  ariaLabel?: string
}

export function ContractPagination({
  currentPage,
  totalPages,
  onChange,
  ariaLabel = "계약현황 페이지",
}: ContractPaginationProps) {
  const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4))
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, index) => start + index)

  const pageButton = (
    label: string,
    page: number,
    icon: ReactNode,
    disabled = false,
  ) => (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(page)}
    >
      {icon}
    </button>
  )

  return (
    <nav className="contract-pagination" aria-label={ariaLabel}>
      {pageButton("첫 페이지", 1, <ChevronsLeft size={17} aria-hidden="true" />, currentPage === 1)}
      {pageButton(
        "이전 페이지",
        Math.max(1, currentPage - 1),
        <ChevronLeft size={17} aria-hidden="true" />,
        currentPage === 1,
      )}
      {pages.map((page) => (
        <button
          type="button"
          key={page}
          className={page === currentPage ? "is-current" : undefined}
          aria-current={page === currentPage ? "page" : undefined}
          aria-label={`${page}페이지`}
          onClick={() => onChange(page)}
        >
          {page}
        </button>
      ))}
      {pageButton(
        "다음 페이지",
        Math.min(totalPages, currentPage + 1),
        <ChevronRight size={17} aria-hidden="true" />,
        currentPage === totalPages,
      )}
      {pageButton(
        "마지막 페이지",
        totalPages,
        <ChevronsRight size={17} aria-hidden="true" />,
        currentPage === totalPages,
      )}
    </nav>
  )
}
