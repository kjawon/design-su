import { useEffect, useMemo, useRef, useState } from "react"
import {
  EMPTY_PROCUREMENT_PLAN_FILTERS,
  PROCUREMENT_PLAN_RECORDS,
} from "@/components/procurement/procurement-mock-data"
import { ProcurementSearchPanel } from "@/components/procurement/procurement-search-panel"
import { ProcurementSidebar } from "@/components/procurement/procurement-sidebar"
import { ProcurementTable } from "@/components/procurement/procurement-table"
import type {
  ProcurementPlanFilters,
  ProcurementPlanRecord,
} from "@/components/procurement/procurement-types"
import { Header } from "@/components/navigation/portal-header"
import { PortalFooter } from "@/components/navigation/portal-footer"
import { DataPagination } from "@/components/shared/data-pagination"
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb"
import { ResultToolbar } from "@/components/shared/result-toolbar"
import { downloadTable } from "@/lib/download-table"
import { createMockPage } from "@/lib/mock-page"
import "@/components/contract/styles/contract.css"
import "@/components/procurement/styles/procurement.css"

const TOTAL_COUNT = 65

function includesText(value: string, keyword: string) {
  return value.toLocaleLowerCase("ko-KR").includes(keyword.trim().toLocaleLowerCase("ko-KR"))
}

function matchesFilters(record: ProcurementPlanRecord, filters: ProcurementPlanFilters) {
  return (
    includesText(record.title, filters.title) &&
    includesText(record.author, filters.author) &&
    includesText(record.content, filters.content) &&
    (!filters.startDate || record.createdDate >= filters.startDate) &&
    (!filters.endDate || record.createdDate <= filters.endDate)
  )
}

export function ProcurementPage() {
  const [filters, setFilters] = useState<ProcurementPlanFilters>(() => ({
    ...EMPTY_PROCUREMENT_PLAN_FILTERS,
  }))
  const [appliedFilters, setAppliedFilters] = useState<ProcurementPlanFilters>(() => ({
    ...EMPTY_PROCUREMENT_PLAN_FILTERS,
  }))
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [isLoading, setIsLoading] = useState(false)
  const searchTimerRef = useRef<number | null>(null)

  const filteredRecords = useMemo(
    () => PROCUREMENT_PLAN_RECORDS.filter((record) => matchesFilters(record, appliedFilters)),
    [appliedFilters],
  )
  const isFiltered = Object.entries(appliedFilters).some(
    ([key, value]) => value !== EMPTY_PROCUREMENT_PLAN_FILTERS[key as keyof ProcurementPlanFilters],
  )
  const totalCount = isFiltered ? filteredRecords.length : TOTAL_COUNT
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))
  const displayRecords = useMemo(
    () =>
      isFiltered
        ? filteredRecords.slice((page - 1) * pageSize, page * pageSize)
        : createMockPage(PROCUREMENT_PLAN_RECORDS, totalCount, page, pageSize),
    [filteredRecords, isFiltered, page, pageSize, totalCount],
  )

  useEffect(() => {
    return () => {
      if (searchTimerRef.current !== null) window.clearTimeout(searchTimerRef.current)
    }
  }, [])

  const updateFilter = (field: keyof ProcurementPlanFilters, value: string) => {
    setFilters((current) => ({ ...current, [field]: value }))
  }

  const resetFilters = () => {
    if (searchTimerRef.current !== null) window.clearTimeout(searchTimerRef.current)
    searchTimerRef.current = null
    setFilters({ ...EMPTY_PROCUREMENT_PLAN_FILTERS })
    setAppliedFilters({ ...EMPTY_PROCUREMENT_PLAN_FILTERS })
    setIsLoading(false)
    setPage(1)
  }

  const searchPlans = () => {
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
    const rows = [
      ["번호", "제목", "작성자", "작성일자", "첨부파일"],
      ...displayRecords.map((record) => [
        record.id,
        record.title,
        record.author,
        record.createdDate,
        record.attachment,
      ]),
    ]
    downloadTable(rows, "가평군_발주계획.xls")
  }

  return (
    <div className="contract-status-page procurement-page">
      <Header />
      <main id="main-content" tabIndex={-1}>
        <PageBreadcrumb
          items={[{ label: "발주·입찰정보" }, { label: "자체 발주계획" }]}
        />

        <div className="contract-layout">
          <ProcurementSidebar />

          <section className="contract-content" aria-label="자체 발주계획">
            <ProcurementSearchPanel
              filters={filters}
              isLoading={isLoading}
              onChange={updateFilter}
              onReset={resetFilters}
              onSearch={searchPlans}
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

            <ProcurementTable records={displayRecords} isLoading={isLoading} />
            <DataPagination
              currentPage={Math.min(page, totalPages)}
              totalPages={totalPages}
              onChange={setPage}
              ariaLabel="발주계획 페이지"
            />
          </section>
        </div>
      </main>
      <PortalFooter />
    </div>
  )
}
