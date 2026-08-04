import {
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
} from "lucide-react"
import { useState } from "react"
import type { PaymentFilters } from "@/components/payment/payment-types"
import { DateRangeField } from "@/components/shared/date-range-field"
import { OFFICE_OPTIONS } from "@/components/shared/office-options"
import { SearchActions } from "@/components/shared/search-actions"
import { formatNumericInput, keepDigits } from "@/lib/number-input"

type PaymentSearchPanelProps = {
  pageTitle: string
  filters: PaymentFilters
  isLoading: boolean
  onChange: (field: keyof PaymentFilters, value: string) => void
  onReset: () => void
  onSearch: () => void
}

export function PaymentSearchPanel({
  pageTitle,
  filters,
  isLoading,
  onChange,
  onReset,
  onSearch,
}: PaymentSearchPanelProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [dateError, setDateError] = useState("")
  const [amountError, setAmountError] = useState("")

  const changeFilter = (field: keyof PaymentFilters, value: string) => {
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

  return (
    <form
      className="contract-search-panel contract-search-panel--contract payment-search-panel"
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
        <div id="payment-detail-search" className="contract-detail-panel">
          <div className="contract-detail-grid payment-detail-grid">
            <label className="contract-field">
              <span>관서구분</span>
              <select
                value={filters.office}
                onChange={(event) => changeFilter("office", event.target.value)}
              >
                {OFFICE_OPTIONS.map((office) => (
                  <option key={office} value={office}>
                    {office}
                  </option>
                ))}
              </select>
            </label>

            <fieldset className="contract-field">
              <legend>계약금액</legend>
              <div className="contract-range contract-amount-range">
                <input
                  type="text"
                  inputMode="numeric"
                  aria-label="최소 계약금액"
                  aria-invalid={Boolean(amountError)}
                  aria-describedby={amountError ? "payment-amount-error" : undefined}
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
                  aria-label="최대 계약금액"
                  aria-invalid={Boolean(amountError)}
                  aria-describedby={amountError ? "payment-amount-error" : undefined}
                  value={formatNumericInput(filters.maxAmount)}
                  placeholder="최대금액"
                  onChange={(event) =>
                    changeFilter("maxAmount", keepDigits(event.target.value))
                  }
                />
              </div>
              {amountError && (
                <p id="payment-amount-error" className="contract-field-error" role="alert">
                  {amountError}
                </p>
              )}
            </fieldset>
          </div>
        </div>
      )}

      <div className="contract-search-controls">
        <button
          type="button"
          className={`contract-detail-toggle${isDetailOpen ? " is-open" : ""}`}
          aria-expanded={isDetailOpen}
          aria-controls="payment-detail-search"
          onClick={() => setIsDetailOpen((current) => !current)}
        >
          <SlidersHorizontal size={18} strokeWidth={1.8} aria-hidden="true" />
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
