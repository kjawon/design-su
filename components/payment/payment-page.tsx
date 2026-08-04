import { ChevronRight, House } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { ContractPagination } from "@/components/contract/contract-pagination"
import { ContractResultToolbar } from "@/components/contract/contract-result-toolbar"
import { Footer } from "@/components/portal-footer"
import { Header } from "@/components/navigation/portal-header"
import {
  EMPTY_PAYMENT_FILTERS,
  PAYMENT_RECORDS,
} from "@/components/payment/payment-mock-data"
import type { PaymentPageConfig } from "@/components/payment/payment-page-config"
import { PaymentSearchPanel } from "@/components/payment/payment-search-panel"
import { PaymentSidebar } from "@/components/payment/payment-sidebar"
import { PaymentTable } from "@/components/payment/payment-table"
import type { PaymentFilters, PaymentRecord } from "@/components/payment/payment-types"
import "@/components/contract/styles/contract.css"
import "@/components/payment/styles/payment.css"

function matchesPaymentFilters(record: PaymentRecord, filters: PaymentFilters) {
  const normalizedName = filters.contractName.trim().toLocaleLowerCase("ko-KR")
  const minAmount = filters.minAmount ? Number(filters.minAmount) : 0
  const maxAmount = filters.maxAmount ? Number(filters.maxAmount) : Number.POSITIVE_INFINITY

  return (
    (filters.office === "전체" || record.office === filters.office) &&
    (!normalizedName ||
      record.contractName.toLocaleLowerCase("ko-KR").includes(normalizedName)) &&
    record.totalPayment >= minAmount &&
    record.totalPayment <= maxAmount &&
    (!filters.startDate || record.contractDate >= filters.startDate) &&
    (!filters.endDate || record.contractDate <= filters.endDate)
  )
}

function createDisplayRecords(
  source: PaymentRecord[],
  totalCount: number,
  page: number,
  pageSize: number,
) {
  if (source.length === 0 || totalCount === 0) return []

  const startIndex = (page - 1) * pageSize
  const remaining = Math.max(0, totalCount - startIndex)
  return Array.from({ length: Math.min(pageSize, remaining) }, (_, index) => {
    const template = source[(startIndex + index) % source.length]
    return {
      ...template,
      id: totalCount - startIndex - index,
    }
  })
}

export function PaymentPage({ config }: { config: PaymentPageConfig }) {
  const [filters, setFilters] = useState<PaymentFilters>(() => ({
    ...EMPTY_PAYMENT_FILTERS,
  }))
  const [appliedFilters, setAppliedFilters] = useState<PaymentFilters>(() => ({
    ...EMPTY_PAYMENT_FILTERS,
  }))
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [formVersion, setFormVersion] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const searchTimerRef = useRef<number | null>(null)

  const source = config.pageKind === "status" ? PAYMENT_RECORDS : []
  const filteredRecords = useMemo(
    () => source.filter((record) => matchesPaymentFilters(record, appliedFilters)),
    [appliedFilters, source],
  )
  const isFiltered = Object.entries(appliedFilters).some(
    ([key, value]) => value !== EMPTY_PAYMENT_FILTERS[key as keyof PaymentFilters],
  )
  const totalCount = isFiltered ? filteredRecords.length : config.totalCount
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))
  const displayRecords = useMemo(
    () =>
      isFiltered
        ? filteredRecords.slice((page - 1) * pageSize, page * pageSize)
        : createDisplayRecords(source, totalCount, page, pageSize),
    [filteredRecords, isFiltered, page, pageSize, source, totalCount],
  )

  useEffect(() => {
    return () => {
      if (searchTimerRef.current !== null) window.clearTimeout(searchTimerRef.current)
    }
  }, [])

  const updateFilter = (field: keyof PaymentFilters, value: string) => {
    setFilters((current) => ({ ...current, [field]: value }))
  }

  const resetFilters = () => {
    if (searchTimerRef.current !== null) window.clearTimeout(searchTimerRef.current)
    searchTimerRef.current = null
    setFilters({ ...EMPTY_PAYMENT_FILTERS })
    setAppliedFilters({ ...EMPTY_PAYMENT_FILTERS })
    setErrorMessage("")
    setIsLoading(false)
    setPage(1)
    setFormVersion((current) => current + 1)
  }

  const searchPayments = () => {
    if (searchTimerRef.current !== null) window.clearTimeout(searchTimerRef.current)
    setIsLoading(true)
    setErrorMessage("")

    searchTimerRef.current = window.setTimeout(() => {
      try {
        setAppliedFilters({ ...filters })
        setPage(1)
      } catch {
        setErrorMessage("조회 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.")
      } finally {
        setIsLoading(false)
        searchTimerRef.current = null
      }
    }, 180)
  }

  const downloadExcel = () => {
    const rows = [
      [
        "번호",
        "관서명",
        "계약명",
        "지급액총계",
        "선금지급",
        "기성금지급",
        "준공금지급",
        "노무비지급",
        "지급일",
      ],
      ...displayRecords.map((record) => [
        record.id,
        record.office,
        record.contractName,
        record.totalPayment,
        record.advancePayment,
        record.progressPayment,
        record.completionPayment,
        record.laborPayment,
        record.paymentDate,
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
    link.download = config.downloadFileName
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="contract-status-page payment-status-page">
      <Header />
      <main id="main-content" tabIndex={-1}>
        <nav className="contract-breadcrumb" aria-label="현재 위치">
          <div>
            <a href="/" aria-label="홈">
              <House size={20} aria-hidden="true" />
              <span>홈</span>
            </a>
            <ChevronRight size={18} aria-hidden="true" />
            <span>대금지급</span>
            <ChevronRight size={18} aria-hidden="true" />
            <span>{config.accountLabel}</span>
            <ChevronRight size={18} aria-hidden="true" />
            <strong aria-current="page">{config.menuLabel}</strong>
          </div>
        </nav>

        <div className="contract-layout">
          <PaymentSidebar accountType={config.accountType} activeMenu={config.menuKey} />

          <section className="contract-content" aria-label={config.title}>
            <PaymentSearchPanel
              key={formVersion}
              pageTitle={config.title}
              filters={filters}
              isLoading={isLoading}
              onChange={updateFilter}
              onReset={resetFilters}
              onSearch={searchPayments}
            />

            {errorMessage && (
              <p className="contract-results-error" role="alert">
                {errorMessage}
              </p>
            )}

            <ContractResultToolbar
              totalCount={totalCount}
              pageSize={pageSize}
              onPageSizeChange={(nextPageSize) => {
                setPageSize(nextPageSize)
                setPage(1)
              }}
              onDownload={downloadExcel}
            />

            <PaymentTable records={displayRecords} isLoading={isLoading} />
            <ContractPagination
              currentPage={Math.min(page, totalPages)}
              totalPages={totalPages}
              onChange={setPage}
              ariaLabel={`${config.title} 페이지`}
            />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
