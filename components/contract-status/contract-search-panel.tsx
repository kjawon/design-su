import { RotateCcw, Search } from "lucide-react"
import type { ContractFilters } from "@/components/contract-status/contract-status-data"

type ContractSearchPanelProps = {
  filters: ContractFilters
  onChange: (field: keyof ContractFilters, value: string) => void
  onReset: () => void
  onSearch: () => void
}

export function ContractSearchPanel({
  filters,
  onChange,
  onReset,
  onSearch,
}: ContractSearchPanelProps) {
  return (
    <form
      className="contract-search-panel"
      aria-label="계약현황 검색 조건"
      onSubmit={(event) => {
        event.preventDefault()
        onSearch()
      }}
    >
      <div className="contract-search-grid">
        <label className="contract-field">
          <span>관서구분</span>
          <select
            value={filters.office}
            onChange={(event) => onChange("office", event.target.value)}
          >
            <option>전체</option>
            <option>본청 회계과</option>
            <option>보건정책과</option>
            <option>건설도시과</option>
            <option>문화체육과</option>
            <option>상하수도사업소</option>
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
              min="0"
              inputMode="numeric"
              aria-label="최소 계약금액"
              value={filters.minAmount}
              placeholder="최소 금액"
              onChange={(event) => onChange("minAmount", event.target.value)}
            />
            <span aria-hidden="true">~</span>
            <input
              type="number"
              min="0"
              inputMode="numeric"
              aria-label="최대 계약금액"
              value={filters.maxAmount}
              placeholder="최대 금액"
              onChange={(event) => onChange("maxAmount", event.target.value)}
            />
          </div>
        </fieldset>

        <fieldset className="contract-field">
          <legend>계약일자</legend>
          <div className="contract-range">
            <input
              type="date"
              aria-label="계약일자 시작일"
              value={filters.startDate}
              onChange={(event) => onChange("startDate", event.target.value)}
            />
            <span aria-hidden="true">~</span>
            <input
              type="date"
              aria-label="계약일자 종료일"
              value={filters.endDate}
              onChange={(event) => onChange("endDate", event.target.value)}
            />
          </div>
        </fieldset>
      </div>

      <div className="contract-search-actions">
        <button type="button" className="contract-button contract-button--outline" onClick={onReset}>
          <RotateCcw size={18} aria-hidden="true" />
          초기화
        </button>
        <button type="submit" className="contract-button contract-button--primary">
          <Search size={18} aria-hidden="true" />
          조회
        </button>
      </div>
    </form>
  )
}
