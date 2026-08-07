import { useEffect, useMemo, useRef, useState } from "react"
import {
  EMPTY_PROCUREMENT_PLAN_FILTERS,
  PROCUREMENT_PLAN_RECORDS,
} from "@/components/procurement/procurement-mock-data"
import { ProcurementSearchPanel } from "@/components/procurement/procurement-search-panel"
import { ProcurementTable } from "@/components/procurement/procurement-table"
import type {
  ProcurementPlanFilters,
  ProcurementPlanRecord,
} from "@/components/procurement/procurement-types"
import { DataPagination } from "@/components/shared/data-pagination"
import { ResultToolbar } from "@/components/shared/result-toolbar"
import { downloadTable } from "@/lib/download-table"
import { createMockPage } from "@/lib/mock-page"

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

export function OwnProcurementPlanSection() {
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
    <section className="own-procurement-section" aria-labelledby="own-procurement-title">
      <header className="procurement-section-header">
        <h2 id="own-procurement-title">자체 발주계획</h2>
        <p>기관에서 자체적으로 등록한 발주 예정 사업을 확인할 수 있습니다.</p>
      </header>

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
        ariaLabel="자체 발주계획 페이지"
      />
    </section>
  )
}
