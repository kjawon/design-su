import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react"
import "@/components/suyeong/shared/SuyeongPagination.css"

interface SuyeongPaginationProps {
  currentPage: number
  totalPages: number
  onChange: (page: number) => void
  visiblePageCount?: number
}

export function SuyeongPagination({
  currentPage,
  totalPages,
  onChange,
  visiblePageCount = 10,
}: SuyeongPaginationProps) {
  const safeTotalPages = Math.max(totalPages, 1)
  const currentGroup = Math.floor((currentPage - 1) / visiblePageCount)
  const firstVisiblePage = currentGroup * visiblePageCount + 1
  const lastVisiblePage = Math.min(firstVisiblePage + visiblePageCount - 1, safeTotalPages)
  const pageNumbers = Array.from(
    { length: lastVisiblePage - firstVisiblePage + 1 },
    (_, index) => firstVisiblePage + index,
  )

  return (
    <nav className="sy-pagination" aria-label="목록 페이지">
      <button type="button" aria-label="첫 페이지" disabled={currentPage === 1} onClick={() => onChange(1)}>
        <ChevronsLeft aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="이전 페이지"
        disabled={currentPage === 1}
        onClick={() => onChange(Math.max(currentPage - 1, 1))}
      >
        <ChevronLeft aria-hidden="true" />
      </button>
      {pageNumbers.map((page) => (
        <button
          key={page}
          className={page === currentPage ? "is-current" : undefined}
          type="button"
          aria-current={page === currentPage ? "page" : undefined}
          onClick={() => onChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        aria-label="다음 페이지"
        disabled={currentPage === safeTotalPages}
        onClick={() => onChange(Math.min(currentPage + 1, safeTotalPages))}
      >
        <ChevronRight aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="마지막 페이지"
        disabled={currentPage === safeTotalPages}
        onClick={() => onChange(safeTotalPages)}
      >
        <ChevronsRight aria-hidden="true" />
      </button>
    </nav>
  )
}
