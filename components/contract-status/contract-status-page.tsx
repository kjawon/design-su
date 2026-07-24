import { ChevronRight, Download, House, Printer } from "lucide-react"
import { useMemo, useState } from "react"
import { ContractSearchPanel } from "@/components/contract-status/contract-search-panel"
import { ContractSidebar } from "@/components/contract-status/contract-sidebar"
import {
  CONTRACT_RECORDS,
  EMPTY_CONTRACT_FILTERS,
  TOTAL_CONTRACTS,
  type ContractFilters,
  type ContractRecord,
} from "@/components/contract-status/contract-status-data"
import {
  ContractPagination,
  ContractTable,
} from "@/components/contract-status/contract-table"
import { Footer } from "@/components/portal-footer"
import { Header } from "@/components/portal-header"
import "@/src/contract-status.css"

function matchesFilters(record: ContractRecord, filters: ContractFilters) {
  const normalizedTitle = filters.title.trim().toLocaleLowerCase("ko-KR")
  const normalizedCompany = filters.company.trim().toLocaleLowerCase("ko-KR")
  const minAmount = filters.minAmount ? Number(filters.minAmount) : 0
  const maxAmount = filters.maxAmount ? Number(filters.maxAmount) : Number.POSITIVE_INFINITY

  return (
    (filters.office === "전체" || record.office === filters.office) &&
    (!normalizedTitle || record.title.toLocaleLowerCase("ko-KR").includes(normalizedTitle)) &&
    (!normalizedCompany ||
      record.contractor.toLocaleLowerCase("ko-KR").includes(normalizedCompany)) &&
    record.amount >= minAmount &&
    record.amount <= maxAmount &&
    (!filters.startDate || record.date >= filters.startDate) &&
    (!filters.endDate || record.date <= filters.endDate)
  )
}

export function ContractStatusPage() {
  const [filters, setFilters] = useState<ContractFilters>(EMPTY_CONTRACT_FILTERS)
  const [appliedFilters, setAppliedFilters] =
    useState<ContractFilters>(EMPTY_CONTRACT_FILTERS)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const filteredRecords = useMemo(
    () => CONTRACT_RECORDS.filter((record) => matchesFilters(record, appliedFilters)),
    [appliedFilters],
  )
  const isFiltered = Object.entries(appliedFilters).some(
    ([key, value]) => value !== EMPTY_CONTRACT_FILTERS[key as keyof ContractFilters],
  )
  const totalCount = isFiltered ? filteredRecords.length : TOTAL_CONTRACTS
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))
  const displayRecords = useMemo(() => {
    const startIndex = (page - 1) * pageSize
    if (isFiltered) return filteredRecords.slice(startIndex, startIndex + pageSize)

    const remaining = Math.max(0, TOTAL_CONTRACTS - startIndex)
    return Array.from({ length: Math.min(pageSize, remaining) }, (_, index) => {
      const template = CONTRACT_RECORDS[(startIndex + index) % CONTRACT_RECORDS.length]
      return {
        ...template,
        id: TOTAL_CONTRACTS - startIndex - index,
      }
    })
  }, [filteredRecords, isFiltered, page, pageSize])

  const updateFilter = (field: keyof ContractFilters, value: string) => {
    setFilters((current) => ({ ...current, [field]: value }))
  }

  const resetFilters = () => {
    setFilters(EMPTY_CONTRACT_FILTERS)
    setAppliedFilters(EMPTY_CONTRACT_FILTERS)
    setPage(1)
  }

  const searchContracts = () => {
    setAppliedFilters({ ...filters })
    setPage(1)
  }

  const downloadExcel = () => {
    const rows = [
      ["번호", "구분", "관서명", "계약명", "계약금액", "계약일", "계약상대자"],
      ...displayRecords.map((record) => [
        record.id,
        record.type,
        record.office,
        record.title,
        record.amount,
        record.date,
        record.contractor,
      ]),
    ]
    const tabSeparated = rows
      .map((row) => row.map((cell) => String(cell).replaceAll("\t", " ")).join("\t"))
      .join("\n")
    const blob = new Blob([`\uFEFF${tabSeparated}`], {
      type: "application/vnd.ms-excel;charset=utf-8",
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "가평군_계약현황.xls"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="contract-status-page">
      <Header />
      <main id="main-content" tabIndex={-1}>
        <nav className="contract-breadcrumb" aria-label="현재 위치">
          <div>
            <a href="/" aria-label="홈">
              <House size={17} aria-hidden="true" />
              <span>홈</span>
            </a>
            <ChevronRight size={15} aria-hidden="true" />
            <span>계약정보</span>
            <ChevronRight size={15} aria-hidden="true" />
            <span>일반회계</span>
            <ChevronRight size={15} aria-hidden="true" />
            <strong aria-current="page">계약현황</strong>
          </div>
        </nav>

        <div className="contract-layout">
          <ContractSidebar />

          <section className="contract-content" aria-labelledby="contract-status-title">
            <header className="contract-page-header">
              <div>
                <h1 id="contract-status-title">계약현황</h1>
                <p>조건을 설정해 원하는 계약 정보를 조회할 수 있습니다.</p>
              </div>
              <button
                type="button"
                className="contract-button contract-button--outline contract-print-button"
                onClick={() => window.print()}
              >
                <Printer size={18} aria-hidden="true" />
                인쇄
              </button>
            </header>

            <ContractSearchPanel
              filters={filters}
              onChange={updateFilter}
              onReset={resetFilters}
              onSearch={searchContracts}
            />

            <div className="contract-results-tools">
              <p aria-live="polite">
                총 <strong>{totalCount.toLocaleString("ko-KR")}</strong>건
              </p>
              <div>
                <label>
                  <span className="sr-only">페이지당 목록 개수</span>
                  <select
                    value={pageSize}
                    onChange={(event) => {
                      setPageSize(Number(event.target.value))
                      setPage(1)
                    }}
                  >
                    <option value={10}>10개씩 보기</option>
                    <option value={20}>20개씩 보기</option>
                    <option value={50}>50개씩 보기</option>
                  </select>
                </label>
                <button
                  type="button"
                  className="contract-button contract-button--excel"
                  onClick={downloadExcel}
                >
                  <Download size={18} aria-hidden="true" />
                  엑셀 다운로드
                </button>
              </div>
            </div>

            <ContractTable records={displayRecords} />
            <ContractPagination
              currentPage={Math.min(page, totalPages)}
              totalPages={totalPages}
              onChange={setPage}
            />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
