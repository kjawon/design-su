import { useEffect, useMemo, useRef, useState } from "react"
import {
  EMPTY_INFORMATION_FILTERS,
  FORM_RECORDS,
  LAW_RECORDS,
} from "@/components/information/information-mock-data"
import { InformationSearchPanel } from "@/components/information/information-search-panel"
import { InformationSidebar } from "@/components/information/information-sidebar"
import { InformationTable } from "@/components/information/information-table"
import { RelatedSitesGrid } from "@/components/information/related-sites-grid"
import type {
  InformationFilters,
  InformationPageConfig,
  InformationRecord,
} from "@/components/information/information-types"
import { Header } from "@/components/navigation/portal-header"
import { PortalFooter } from "@/components/navigation/portal-footer"
import { DataPagination } from "@/components/shared/data-pagination"
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb"
import { ResultToolbar } from "@/components/shared/result-toolbar"
import { downloadTable } from "@/lib/download-table"
import "@/components/contract/styles/contract.css"
import "@/components/information/styles/information.css"

const EMPTY_RECORDS: InformationRecord[] = []

function includesText(value: string, keyword: string) {
  return value.toLocaleLowerCase("ko-KR").includes(keyword.trim().toLocaleLowerCase("ko-KR"))
}

function matchesFilters(record: InformationRecord, filters: InformationFilters) {
  return (
    includesText(record.title, filters.title) &&
    includesText(record.author, filters.author) &&
    includesText(record.content, filters.content) &&
    (!filters.startDate || record.createdDate >= filters.startDate) &&
    (!filters.endDate || record.createdDate <= filters.endDate)
  )
}

export function InformationPage({ config }: { config: InformationPageConfig }) {
  const [filters, setFilters] = useState<InformationFilters>(() => ({
    ...EMPTY_INFORMATION_FILTERS,
  }))
  const [appliedFilters, setAppliedFilters] = useState<InformationFilters>(() => ({
    ...EMPTY_INFORMATION_FILTERS,
  }))
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [isLoading, setIsLoading] = useState(false)
  const searchTimerRef = useRef<number | null>(null)
  const source =
    config.dataKind === "laws"
      ? LAW_RECORDS
      : config.dataKind === "forms"
        ? FORM_RECORDS
        : EMPTY_RECORDS

  const filteredRecords = useMemo(
    () => source.filter((record) => matchesFilters(record, appliedFilters)),
    [appliedFilters, source],
  )
  const isFiltered = Object.entries(appliedFilters).some(
    ([key, value]) => value !== EMPTY_INFORMATION_FILTERS[key as keyof InformationFilters],
  )
  const totalCount = isFiltered ? filteredRecords.length : config.totalCount
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

  const updateFilter = (field: keyof InformationFilters, value: string) => {
    setFilters((current) => ({ ...current, [field]: value }))
  }

  const resetFilters = () => {
    if (searchTimerRef.current !== null) window.clearTimeout(searchTimerRef.current)
    searchTimerRef.current = null
    setFilters({ ...EMPTY_INFORMATION_FILTERS })
    setAppliedFilters({ ...EMPTY_INFORMATION_FILTERS })
    setIsLoading(false)
    setPage(1)
  }

  const searchDocuments = () => {
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
    const header = ["번호", "제목", "작성자", "작성일자", "첨부파일"]
    if (config.showStatuteColumn) header.push("법령보기")
    const rows = displayRecords.map((record) => {
      const row: Array<string | number> = [
        record.id,
        record.title,
        record.author,
        record.createdDate,
        record.attachment,
      ]
      if (config.showStatuteColumn) row.push(record.statuteLabel || "")
      return row
    })
    downloadTable([header, ...rows], config.downloadFileName)
  }

  return (
    <div className="contract-status-page information-page">
      <Header />
      <main id="main-content" tabIndex={-1}>
        <PageBreadcrumb
          items={[{ label: "관련정보" }, { label: config.title }]}
        />

        <div className="contract-layout">
          <InformationSidebar activeMenu={config.menuKey} />

          <section className="contract-content" aria-labelledby="information-page-title">
            <h1 id="information-page-title" className="sr-only">
              {config.title}
            </h1>

            {config.pageKind === "documents" ? (
              <>
                <InformationSearchPanel
                  pageTitle={config.title}
                  filters={filters}
                  isLoading={isLoading}
                  onChange={updateFilter}
                  onReset={resetFilters}
                  onSearch={searchDocuments}
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

                <InformationTable
                  records={displayRecords}
                  pageTitle={config.title}
                  showStatuteColumn={config.showStatuteColumn}
                  isLoading={isLoading}
                />
                <DataPagination
                  currentPage={Math.min(page, totalPages)}
                  totalPages={totalPages}
                  onChange={setPage}
                  ariaLabel={`${config.title} 페이지`}
                />
              </>
            ) : (
              <RelatedSitesGrid />
            )}
          </section>
        </div>
      </main>
      <PortalFooter />
    </div>
  )
}
