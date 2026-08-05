import { useEffect, useMemo, useRef, useState } from "react"
import { Header } from "@/components/navigation/portal-header"
import { PortalFooter } from "@/components/navigation/portal-footer"
import {
  EMPTY_PAYMENT_FILTERS,
  PAYMENT_RECORDS,
} from "@/components/payment/payment-mock-data"
import type { PaymentPageConfig } from "@/components/payment/payment-page-config"
import { PaymentSearchPanel } from "@/components/payment/payment-search-panel"
import { PaymentSidebar } from "@/components/payment/payment-sidebar"
import { PaymentTable } from "@/components/payment/payment-table"
import type { PaymentFilters, PaymentRecord } from "@/components/payment/payment-types"
import { DataPagination } from "@/components/shared/data-pagination"
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb"
import { ResultToolbar } from "@/components/shared/result-toolbar"
import { downloadTable } from "@/lib/download-table"
import { createMockPage } from "@/lib/mock-page"
import "@/components/contract/styles/contract.css"
import "@/components/payment/styles/payment.css"

const EMPTY_PAYMENT_RECORDS: PaymentRecord[] = []

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

export function PaymentPage({ config }: { config: PaymentPageConfig }) {
  const [filters, setFilters] = useState<PaymentFilters>(() => ({
    ...EMPTY_PAYMENT_FILTERS,
  }))
  const [appliedFilters, setAppliedFilters] = useState<PaymentFilters>(() => ({
    ...EMPTY_PAYMENT_FILTERS,
  }))
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [isLoading, setIsLoading] = useState(false)
  const searchTimerRef = useRef<number | null>(null)

  const source = config.pageKind === "status" ? PAYMENT_RECORDS : EMPTY_PAYMENT_RECORDS
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
        : createMockPage(source, totalCount, page, pageSize),
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
    setIsLoading(false)
    setPage(1)
  }

  const searchPayments = () => {
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
    downloadTable(rows, config.downloadFileName)
  }

  return (
    <div className="contract-status-page payment-status-page">
      <Header />
      <main id="main-content" tabIndex={-1}>
        <PageBreadcrumb
          items={[
            { label: "대금지급" },
            { label: config.accountLabel },
            { label: config.menuLabel },
          ]}
        />

        <div className="contract-layout">
          <PaymentSidebar accountType={config.accountType} activeMenu={config.menuKey} />

          <section className="contract-content" aria-label={config.title}>
            <PaymentSearchPanel
              pageTitle={config.title}
              filters={filters}
              isLoading={isLoading}
              onChange={updateFilter}
              onReset={resetFilters}
              onSearch={searchPayments}
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

            <PaymentTable
              records={displayRecords}
              detailBasePath={config.path}
              isLoading={isLoading}
            />
            <DataPagination
              currentPage={Math.min(page, totalPages)}
              totalPages={totalPages}
              onChange={setPage}
              ariaLabel={`${config.title} 페이지`}
            />
          </section>
        </div>
      </main>
      <PortalFooter />
    </div>
  )
}
