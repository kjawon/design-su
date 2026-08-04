import {
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
} from "lucide-react"
import { useState } from "react"
import type { ContractPageKind } from "@/components/contract/contract-page-config"
import type { ContractFilters } from "@/components/contract/contract-types"
import { DateRangeField } from "@/components/shared/date-range-field"
import { OFFICE_OPTIONS } from "@/components/shared/office-options"
import { SearchActions } from "@/components/shared/search-actions"
import { formatNumericInput, keepDigits } from "@/lib/number-input"

const CONTRACT_CATEGORIES = ["공사", "용역", "물품"] as const
const CONTRACT_METHODS = ["일반경쟁", "제한경쟁", "지명경쟁", "수의계약"] as const

type ContractSearchPanelProps = {
  pageKind: ContractPageKind
  pageTitle: string
  filters: ContractFilters
  isLoading: boolean
  onChange: (field: keyof ContractFilters, value: string) => void
  onReset: () => void
  onSearch: () => void
}

export function ContractSearchPanel({
  pageKind,
  pageTitle,
  filters,
  isLoading,
  onChange,
  onReset,
  onSearch,
}: ContractSearchPanelProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [dateError, setDateError] = useState("")
  const [amountError, setAmountError] = useState("")

  const changeFilter = (field: keyof ContractFilters, value: string) => {
    onChange(field, value)
    if (field === "startDate" || field === "endDate") setDateError("")
    if (field === "minAmount" || field === "maxAmount") setAmountError("")
  }

  const submitSearch = () => {
    const nextDateError =
      filters.startDate && filters.endDate && filters.startDate > filters.endDate
        ? "시작일은 종료일보다 늦을 수 없습니다."
        : ""
    const nextAmountError =
      filters.minAmount &&
      filters.maxAmount &&
      Number(filters.minAmount) > Number(filters.maxAmount)
        ? "최소금액은 최대금액보다 클 수 없습니다."
        : ""

    setDateError(nextDateError)
    setAmountError(nextAmountError)
    if (nextDateError || nextAmountError) return

    onSearch()
  }

  const resetSearch = () => {
    setDateError("")
    setAmountError("")
    setIsDetailOpen(false)
    onReset()
  }

  if (pageKind !== "contract") {
    return (
      <form
        className="contract-search-panel"
        aria-label={`${pageTitle} 검색 조건`}
        autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault()
          onSearch()
        }}
      >
        <div className="contract-search-grid">
          {pageKind === "completion" ? (
            <>
              <label className="contract-field">
                <span>계약명</span>
                <input
                  type="text"
                  value={filters.title}
                  placeholder="계약명을 입력하세요"
                  onChange={(event) => onChange("title", event.target.value)}
                />
              </label>

              <DateRangeField
                label="준공일"
                startLabel="준공일 시작일"
                endLabel="준공일 종료일"
                startDate={filters.startDate}
                endDate={filters.endDate}
                onStartDateChange={(value) => onChange("startDate", value)}
                onEndDateChange={(value) => onChange("endDate", value)}
              />
            </>
          ) : (
            <>
              <label className="contract-field">
                <span>관서명</span>
                <input
                  type="text"
                  value={filters.office === "전체" ? "" : filters.office}
                  placeholder="관서명을 입력하세요"
                  onChange={(event) => onChange("office", event.target.value)}
                />
              </label>

              <label className="contract-field">
                <span>부서명</span>
                <input
                  type="text"
                  value={filters.department}
                  placeholder="부서명을 입력하세요"
                  onChange={(event) => onChange("department", event.target.value)}
                />
              </label>

              <label className="contract-field">
                <span>사업명</span>
                <input
                  type="text"
                  value={filters.title}
                  placeholder="사업명을 입력하세요"
                  onChange={(event) => onChange("title", event.target.value)}
                />
              </label>
            </>
          )}
        </div>
      </form>
    )
  }

  return (
    <form
      className="contract-search-panel contract-search-panel--contract"
      aria-label={`${pageTitle} 검색 조건`}
      autoComplete="off"
      onSubmit={(event) => {
        event.preventDefault()
        submitSearch()
      }}
    >
      <div className="contract-search-basic">
        <label className="contract-field contract-search-name">
          <span>계약명</span>
          <input
            type="text"
            value={filters.contractName}
            placeholder="계약명을 입력하세요"
            onChange={(event) => changeFilter("contractName", event.target.value)}
          />
        </label>

        <DateRangeField
          label="계약일자"
          startLabel="계약일자 시작일"
          endLabel="계약일자 종료일"
          startDate={filters.startDate}
          endDate={filters.endDate}
          errorMessage={dateError}
          onStartDateChange={(value) => changeFilter("startDate", value)}
          onEndDateChange={(value) => changeFilter("endDate", value)}
        />
      </div>

      {isDetailOpen && (
        <div id="contract-detail-search" className="contract-detail-panel">
          <div className="contract-detail-grid">
              <label className="contract-field">
                <span>구분</span>
                <select
                  value={filters.category}
                  onChange={(event) => changeFilter("category", event.target.value)}
                >
                  <option value="">전체</option>
                  {CONTRACT_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <label className="contract-field">
                <span>관서명</span>
                <select
                  value={filters.department}
                  onChange={(event) => changeFilter("department", event.target.value)}
                >
                  <option value="">전체</option>
                  {OFFICE_OPTIONS.filter((office) => office !== "전체").map((office) => (
                    <option key={office} value={office}>
                      {office}
                    </option>
                  ))}
                </select>
              </label>

              <label className="contract-field">
                <span>계약상대자</span>
                <input
                  type="text"
                  value={filters.contractor}
                  placeholder="계약상대자를 입력하세요"
                  onChange={(event) => changeFilter("contractor", event.target.value)}
                />
              </label>

              <fieldset className="contract-field contract-field--amount">
                <legend>계약금액</legend>
                <div className="contract-range contract-amount-range">
                  <input
                    type="text"
                    inputMode="numeric"
                    aria-label="최소금액"
                    aria-invalid={Boolean(amountError)}
                    aria-describedby={amountError ? "contract-amount-error" : undefined}
                    value={formatNumericInput(filters.minAmount)}
                    placeholder="최소금액"
                    onChange={(event) =>
                      changeFilter("minAmount", keepDigits(event.target.value))
                    }
                  />
                  <span aria-hidden="true">~</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    aria-label="최대금액"
                    aria-invalid={Boolean(amountError)}
                    aria-describedby={amountError ? "contract-amount-error" : undefined}
                    value={formatNumericInput(filters.maxAmount)}
                    placeholder="최대금액"
                    onChange={(event) =>
                      changeFilter("maxAmount", keepDigits(event.target.value))
                    }
                  />
                </div>
                {amountError && (
                  <p id="contract-amount-error" className="contract-field-error" role="alert">
                    {amountError}
                  </p>
                )}
              </fieldset>

              <label className="contract-field">
                <span>계약방법</span>
                <select
                  value={filters.contractMethod}
                  onChange={(event) => changeFilter("contractMethod", event.target.value)}
                >
                  <option value="">전체</option>
                  {CONTRACT_METHODS.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </label>
          </div>
        </div>
      )}

      <div className="contract-search-controls">
        <button
          type="button"
          className={`contract-detail-toggle${isDetailOpen ? " is-open" : ""}`}
          aria-expanded={isDetailOpen}
          aria-controls="contract-detail-search"
          onClick={() => setIsDetailOpen((current) => !current)}
        >
          <SlidersHorizontal
            size={18}
            strokeWidth={1.8}
            aria-hidden="true"
          />
          <span>상세검색</span>
          {isDetailOpen ? (
            <ChevronUp size={16} aria-hidden="true" />
          ) : (
            <ChevronDown size={16} aria-hidden="true" />
          )}
        </button>
        <SearchActions isLoading={isLoading} onReset={resetSearch} />
      </div>
    </form>
  )
}
