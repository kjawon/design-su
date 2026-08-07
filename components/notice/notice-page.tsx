import { useEffect, useMemo, useRef, useState } from "react"
import { Header } from "@/components/navigation/portal-header"
import { PortalFooter } from "@/components/navigation/portal-footer"
import { NoticeInformationPanel } from "@/components/notice/notice-information-panel"
import {
  EMPTY_NOTICE_FILTERS,
  NOTICE_RECORDS,
} from "@/components/notice/notice-mock-data"
import { NoticeSearchPanel } from "@/components/notice/notice-search-panel"
import { NoticeSidebar } from "@/components/notice/notice-sidebar"
import { NoticeTable } from "@/components/notice/notice-table"
import type { NoticeFilters, NoticePageConfig } from "@/components/notice/notice-types"
import { DataPagination } from "@/components/shared/data-pagination"
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb"
import { ResultToolbar } from "@/components/shared/result-toolbar"
import { downloadTable } from "@/lib/download-table"
import "@/components/contract/styles/contract.css"
import "@/components/notice/styles/notice.css"

function includesText(value: string, keyword: string) {
  return value.toLocaleLowerCase("ko-KR").includes(keyword.trim().toLocaleLowerCase("ko-KR"))
}

function matchesFilters(record: (typeof NOTICE_RECORDS)[number], filters: NoticeFilters) {
  return (
    includesText(record.title, filters.title) &&
    includesText(record.content, filters.content) &&
    includesText(record.author, filters.author) &&
    (!filters.startDate || record.createdDate >= filters.startDate) &&
    (!filters.endDate || record.createdDate <= filters.endDate)
  )
}

export function NoticePage({ config }: { config: NoticePageConfig }) {
  const [filters, setFilters] = useState<NoticeFilters>(() => ({ ...EMPTY_NOTICE_FILTERS }))
  const [appliedFilters, setAppliedFilters] = useState<NoticeFilters>(() => ({
    ...EMPTY_NOTICE_FILTERS,
  }))
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [isLoading, setIsLoading] = useState(false)
  const searchTimerRef = useRef<number | null>(null)

  const filteredRecords = useMemo(
    () => NOTICE_RECORDS.filter((record) => matchesFilters(record, appliedFilters)),
    [appliedFilters],
  )
  const totalCount = filteredRecords.length
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))
  const displayRecords = useMemo(
    () => filteredRecords.slice((page - 1) * pageSize, page * pageSize),
    [filteredRecords, page, pageSize],
  )

  useEffect(() => {
    return () => {
      if (searchTimerRef.current !== null) window.clearTimeout(searchTimerRef.current)
    }
  }, [])

  const updateFilter = (field: keyof NoticeFilters, value: string) => {
    setFilters((current) => ({ ...current, [field]: value }))
  }

  const resetFilters = () => {
    if (searchTimerRef.current !== null) window.clearTimeout(searchTimerRef.current)
    searchTimerRef.current = null
    setFilters({ ...EMPTY_NOTICE_FILTERS })
    setAppliedFilters({ ...EMPTY_NOTICE_FILTERS })
    setIsLoading(false)
    setPage(1)
  }

  const searchNotices = () => {
    if (searchTimerRef.current !== null) window.clearTimeout(searchTimerRef.current)
    setIsLoading(true)
    searchTimerRef.current = window.setTimeout(() => {
      setAppliedFilters({ ...filters })
      setPage(1)
      setIsLoading(false)
      searchTimerRef.current = null
    }, 180)
  }

  const downloadExcel = () => {
    downloadTable(
      [
        ["번호", "제목", "작성자", "작성일자", "첨부파일"],
        ...displayRecords.map((record) => [
          record.id,
          record.title,
          record.author,
          record.createdDate,
          record.attachment,
        ]),
      ],
      config.downloadFileName,
    )
  }

  return (
    <div className="contract-status-page notice-page">
      <Header />
      <main id="main-content" tabIndex={-1}>
        <PageBreadcrumb items={[{ label: "공지사항" }, { label: config.title }]} />

        <div className="contract-layout">
          <NoticeSidebar activeMenu={config.menuKey} />

          <section className="contract-content" aria-labelledby="notice-page-title">
            <h1 id="notice-page-title" className="sr-only">
              {config.title}
            </h1>

            {config.pageKind === "list" ? (
              <>
                <NoticeSearchPanel
                  filters={filters}
                  isLoading={isLoading}
                  onChange={updateFilter}
                  onReset={resetFilters}
                  onSearch={searchNotices}
                />

                <ResultToolbar
                  totalCount={totalCount}
                  pageSize={pageSize}
                  onPageSizeChange={(nextPageSize) => {
                    setPageSize(nextPageSize)
                    setPage(1)
                  }}
                  onDownload={downloadExcel}
                />

                <NoticeTable records={displayRecords} isLoading={isLoading} />
                <DataPagination
                  currentPage={Math.min(page, totalPages)}
                  totalPages={totalPages}
                  onChange={setPage}
                  ariaLabel="알림글 페이지"
                />
              </>
            ) : (
              <NoticeInformationPanel pageKind={config.pageKind} />
            )}
          </section>
        </div>
      </main>
      <PortalFooter />
    </div>
  )
}
