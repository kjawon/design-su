import { ChevronRight, House } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import type { ContractPageConfig } from "@/components/contract/contract-page-config"
import { ContractPageHeader } from "@/components/contract/contract-page-header"
import { ContractPagination } from "@/components/contract/contract-pagination"
import { ContractResultToolbar } from "@/components/contract/contract-result-toolbar"
import { ContractSearchPanel } from "@/components/contract/contract-search-panel"
import { ContractSidebar } from "@/components/contract/contract-sidebar"
import { CompletionTable } from "@/components/contract/completion-table"
import {
  COMPLETION_RECORDS,
  CONTRACT_RECORDS,
  EMPTY_CONTRACT_FILTERS,
  EVALUATION_RECORDS,
} from "@/components/contract/contract-mock-data"
import type {
  CompletionRecord,
  ContractFilters,
  ContractRecord,
  EvaluationRecord,
} from "@/components/contract/contract-types"
import { ContractTable } from "@/components/contract/contract-table"
import { EvaluationTable } from "@/components/contract/evaluation-table"
import { Footer } from "@/components/portal-footer"
import { Header } from "@/components/navigation/portal-header"
import "@/components/contract/styles/contract.css"

function matchesContractFilters(record: ContractRecord, filters: ContractFilters) {
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

function matchesCompletionFilters(record: CompletionRecord, filters: ContractFilters) {
  const normalizedTitle = filters.title.trim().toLocaleLowerCase("ko-KR")
  return (
    (!normalizedTitle || record.title.toLocaleLowerCase("ko-KR").includes(normalizedTitle)) &&
    (!filters.startDate || record.completionDate >= filters.startDate) &&
    (!filters.endDate || record.completionDate <= filters.endDate)
  )
}

function matchesEvaluationFilters(record: EvaluationRecord, filters: ContractFilters) {
  const normalizedOffice =
    filters.office === "전체" ? "" : filters.office.trim().toLocaleLowerCase("ko-KR")
  const normalizedDepartment = filters.department.trim().toLocaleLowerCase("ko-KR")
  const normalizedTitle = filters.title.trim().toLocaleLowerCase("ko-KR")

  return (
    (!normalizedOffice || record.office.toLocaleLowerCase("ko-KR").includes(normalizedOffice)) &&
    (!normalizedDepartment ||
      record.department.toLocaleLowerCase("ko-KR").includes(normalizedDepartment)) &&
    (!normalizedTitle ||
      record.projectTitle.toLocaleLowerCase("ko-KR").includes(normalizedTitle))
  )
}

function createDisplayRecords<RecordType extends { id: number }>(
  source: RecordType[],
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

export function ContractPage({ config }: { config: ContractPageConfig }) {
  const [filters, setFilters] = useState<ContractFilters>(() => ({
    ...EMPTY_CONTRACT_FILTERS,
  }))
  const [appliedFilters, setAppliedFilters] =
    useState<ContractFilters>(() => ({ ...EMPTY_CONTRACT_FILTERS }))
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [formVersion, setFormVersion] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const searchTimerRef = useRef<number | null>(null)

  const contractSource = config.dataKind === "empty" ? [] : CONTRACT_RECORDS
  const completionSource = config.dataKind === "completion" ? COMPLETION_RECORDS : []
  const evaluationSource = config.dataKind === "evaluation" ? EVALUATION_RECORDS : []

  const filteredContractRecords = useMemo(
    () => contractSource.filter((record) => matchesContractFilters(record, appliedFilters)),
    [appliedFilters, contractSource],
  )
  const filteredCompletionRecords = useMemo(
    () => completionSource.filter((record) => matchesCompletionFilters(record, appliedFilters)),
    [appliedFilters, completionSource],
  )
  const filteredEvaluationRecords = useMemo(
    () => evaluationSource.filter((record) => matchesEvaluationFilters(record, appliedFilters)),
    [appliedFilters, evaluationSource],
  )
  const isFiltered = Object.entries(appliedFilters).some(
    ([key, value]) => value !== EMPTY_CONTRACT_FILTERS[key as keyof ContractFilters],
  )
  const filteredCount =
    config.pageKind === "completion"
      ? filteredCompletionRecords.length
      : config.pageKind === "evaluation"
        ? filteredEvaluationRecords.length
        : filteredContractRecords.length
  const totalCount = isFiltered ? filteredCount : config.totalCount
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))

  const displayContractRecords = useMemo(
    () =>
      isFiltered
        ? filteredContractRecords.slice((page - 1) * pageSize, page * pageSize)
        : createDisplayRecords(contractSource, totalCount, page, pageSize),
    [contractSource, filteredContractRecords, isFiltered, page, pageSize, totalCount],
  )
  const displayCompletionRecords = useMemo(
    () =>
      isFiltered
        ? filteredCompletionRecords.slice((page - 1) * pageSize, page * pageSize)
        : createDisplayRecords(completionSource, totalCount, page, pageSize),
    [completionSource, filteredCompletionRecords, isFiltered, page, pageSize, totalCount],
  )
  const displayEvaluationRecords = useMemo(
    () =>
      isFiltered
        ? filteredEvaluationRecords.slice((page - 1) * pageSize, page * pageSize)
        : createDisplayRecords(evaluationSource, totalCount, page, pageSize),
    [evaluationSource, filteredEvaluationRecords, isFiltered, page, pageSize, totalCount],
  )

  useEffect(() => {
    return () => {
      if (searchTimerRef.current !== null) window.clearTimeout(searchTimerRef.current)
    }
  }, [])

  const updateFilter = (field: keyof ContractFilters, value: string) => {
    setFilters((current) => ({ ...current, [field]: value }))
  }

  const resetFilters = () => {
    if (searchTimerRef.current !== null) window.clearTimeout(searchTimerRef.current)
    searchTimerRef.current = null
    setFilters({ ...EMPTY_CONTRACT_FILTERS })
    setAppliedFilters({ ...EMPTY_CONTRACT_FILTERS })
    setErrorMessage("")
    setIsLoading(false)
    setPage(1)
    setFormVersion((current) => current + 1)
  }

  const searchContracts = () => {
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
    const rows =
      config.pageKind === "completion"
        ? [
            ["번호", "계약명", "관서명", "계약금액", "계약일", "착공일", "준공기한", "준공일", "검수일"],
            ...displayCompletionRecords.map((record) => [
              record.id,
              record.title,
              record.office,
              record.amount,
              record.contractDate,
              record.startDate,
              record.deadlineDate,
              record.completionDate,
              record.inspectionDate,
            ]),
          ]
        : config.pageKind === "evaluation"
          ? [
              ["번호", "관서명", "부서명", "사업명", "평가일"],
              ...displayEvaluationRecords.map((record) => [
                record.id,
                record.office,
                record.department,
                record.projectTitle,
                record.evaluationDate,
              ]),
            ]
          : [
            ["번호", "구분", "관서명", "계약명", "계약금액", "계약일", "계약상대자"],
            ...displayContractRecords.map((record) => [
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
    link.download = config.downloadFileName
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
              <House size={20} aria-hidden="true" />
              <span>홈</span>
            </a>
            <ChevronRight size={18} aria-hidden="true" />
            <span>계약정보</span>
            {!config.standalone && (
              <>
                <ChevronRight size={18} aria-hidden="true" />
                <span>{config.accountLabel}</span>
              </>
            )}
            <ChevronRight size={18} aria-hidden="true" />
            <strong aria-current="page">{config.menuLabel}</strong>
          </div>
        </nav>

        <div className="contract-layout">
          <ContractSidebar
            accountType={config.accountType}
            activeMenu={config.menuKey}
          />

          <section className="contract-content" aria-labelledby="contract-page-title">
            <ContractPageHeader config={config} onPrint={() => window.print()} />

            <ContractSearchPanel
              key={formVersion}
              pageKind={config.pageKind}
              pageTitle={config.title}
              filters={filters}
              isLoading={isLoading}
              onChange={updateFilter}
              onReset={resetFilters}
              onSearch={searchContracts}
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

            {config.pageKind === "completion" ? (
              <CompletionTable records={displayCompletionRecords} isLoading={isLoading} />
            ) : config.pageKind === "evaluation" ? (
              <EvaluationTable records={displayEvaluationRecords} isLoading={isLoading} />
            ) : (
              <ContractTable records={displayContractRecords} isLoading={isLoading} />
            )}
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
