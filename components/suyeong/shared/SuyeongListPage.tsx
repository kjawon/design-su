import type { ReactNode } from "react"
import { SuyeongBreadcrumb } from "./SuyeongBreadcrumb"
import { SuyeongFooter } from "./SuyeongFooter"
import { SuyeongHeader } from "./SuyeongHeader"
import { SuyeongPageHeading } from "./SuyeongPageHeading"
import { SuyeongPagination } from "./SuyeongPagination"
import { SuyeongResultsToolbar } from "./SuyeongResultsToolbar"
import "./SuyeongLayout.css"
import "./SuyeongListPage.css"

interface BreadcrumbParent {
  href: string
  label: string
}

interface SuyeongListPageProps {
  activeItem: string
  current: string
  description: string
  parent?: BreadcrumbParent
  title: string
  className?: string
  children: ReactNode
}

export function SuyeongListPage({
  activeItem,
  current,
  description,
  parent,
  title,
  className,
  children,
}: SuyeongListPageProps) {
  return (
    <div className={["sy-page", className].filter(Boolean).join(" ")}>
      <SuyeongHeader activeItem={activeItem} />
      <SuyeongBreadcrumb current={current} parent={parent} />
      <main id="main-content" className="sy-list-main" tabIndex={-1}>
        <div className="sy-container">
          <SuyeongPageHeading description={description} title={title} />
          {children}
        </div>
      </main>
      <SuyeongFooter />
    </div>
  )
}

interface SuyeongResultsSectionProps {
  ariaLabel: string
  currentPage: number
  onDownload: () => void
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
  pageSize: number
  resultCount: number
  totalPages: number
  pageSizeOptions?: readonly number[]
  showPageSize?: boolean
  showPagination?: boolean
  children: ReactNode
}

export function SuyeongResultsSection({
  ariaLabel,
  children,
  currentPage,
  onDownload,
  onPageChange,
  onPageSizeChange,
  pageSize,
  pageSizeOptions,
  resultCount,
  showPageSize = true,
  showPagination = true,
  totalPages,
}: SuyeongResultsSectionProps) {
  return (
    <section className="sy-list-results" aria-label={ariaLabel}>
      <SuyeongResultsToolbar
        resultCount={resultCount}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        onPageSizeChange={onPageSizeChange}
        onDownload={onDownload}
        showPageSize={showPageSize}
      />
      {children}
      {showPagination && (
        <SuyeongPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={onPageChange}
        />
      )}
    </section>
  )
}
