import { LoaderCircle, RotateCcw, Search } from "lucide-react"
import { CONTRACT_OFFICES } from "@/components/contract/contract-options"
import type { ContractPageKind } from "@/components/contract/contract-page-config"
import type { ContractFilters } from "@/components/contract/contract-types"
import { DateRangeField } from "@/components/contract/date-range-field"

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
        {pageKind === "contract" ? (
          <>
            <label className="contract-field">
              <span>관서구분</span>
              <select
                value={filters.office}
                onChange={(event) => onChange("office", event.target.value)}
              >
                {CONTRACT_OFFICES.map((office) => (
                  <option key={office}>{office}</option>
                ))}
              </select>
            </label>

            <label className="contract-field">
              <span>업체명</span>
              <input
                type="text"
                value={filters.company}
                placeholder="업체명을 입력하세요"
                onChange={(event) => onChange("company", event.target.value)}
              />
            </label>

            <label className="contract-field">
              <span>계약명</span>
              <input
                type="text"
                value={filters.title}
                placeholder="계약명을 입력하세요"
                onChange={(event) => onChange("title", event.target.value)}
              />
            </label>

            <fieldset className="contract-field">
              <legend>계약금액</legend>
              <div className="contract-range">
                <input
                  type="number"
                  name="contract-min-amount"
                  min="0"
                  inputMode="numeric"
                  autoComplete="off"
                  aria-label="최소 계약금액"
                  value={filters.minAmount}
                  placeholder="최소 금액"
                  onChange={(event) => onChange("minAmount", event.target.value)}
                />
                <span aria-hidden="true">~</span>
                <input
                  type="number"
                  name="contract-max-amount"
                  min="0"
                  inputMode="numeric"
                  autoComplete="off"
                  aria-label="최대 계약금액"
                  value={filters.maxAmount}
                  placeholder="최대 금액"
                  onChange={(event) => onChange("maxAmount", event.target.value)}
                />
              </div>
            </fieldset>

            <DateRangeField
              label="계약일자"
              startLabel="계약일자 시작일"
              endLabel="계약일자 종료일"
              startDate={filters.startDate}
              endDate={filters.endDate}
              onStartDateChange={(value) => onChange("startDate", value)}
              onEndDateChange={(value) => onChange("endDate", value)}
            />
          </>
        ) : pageKind === "completion" ? (
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

        <div className={`contract-search-actions ${pageKind === "completion" ? "contract-search-actions--completion" : ""}`}>
          <button
            type="button"
            className="contract-button contract-button--outline"
            aria-label={`${pageTitle} 검색 조건 초기화`}
            disabled={isLoading}
            onClick={onReset}
          >
            <RotateCcw size={18} aria-hidden="true" />
            초기화
          </button>
          <button
            type="submit"
            className="contract-button contract-button--primary"
            aria-label={`${pageTitle} 조회`}
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderCircle className="contract-loading-spinner" size={18} aria-hidden="true" />
            ) : (
              <Search size={18} aria-hidden="true" />
            )}
            {isLoading ? "조회 중" : "조회"}
          </button>
        </div>
      </div>
    </form>
  )
}
