import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react"
import { useState } from "react"
import type { ProcurementPlanFilters } from "@/components/procurement/procurement-types"
import { DateRangeField } from "@/components/shared/date-range-field"
import { SearchActions } from "@/components/shared/search-actions"

type ProcurementSearchPanelProps = {
  filters: ProcurementPlanFilters
  isLoading: boolean
  onChange: (field: keyof ProcurementPlanFilters, value: string) => void
  onReset: () => void
  onSearch: () => void
}

export function ProcurementSearchPanel({
  filters,
  isLoading,
  onChange,
  onReset,
  onSearch,
}: ProcurementSearchPanelProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [dateError, setDateError] = useState("")

  const submitSearch = () => {
    const nextDateError =
      filters.startDate && filters.endDate && filters.startDate > filters.endDate
        ? "시작일은 종료일보다 늦을 수 없습니다."
        : ""
    setDateError(nextDateError)
    if (!nextDateError) onSearch()
  }

  const resetSearch = () => {
    setDateError("")
    setIsDetailOpen(false)
    onReset()
  }

  return (
    <form
      className="contract-search-panel contract-search-panel--contract procurement-search-panel"
      aria-label="발주계획 검색 조건"
      autoComplete="off"
      onSubmit={(event) => {
        event.preventDefault()
        submitSearch()
      }}
    >
      <div className="contract-search-basic">
        <label className="contract-field contract-search-name">
          <span>제목</span>
          <input
            type="text"
            value={filters.title}
            placeholder="제목을 입력하세요"
            onChange={(event) => onChange("title", event.target.value)}
          />
        </label>

        <DateRangeField
          label="작성일자"
          startLabel="작성일자 시작일"
          endLabel="작성일자 종료일"
          startDate={filters.startDate}
          endDate={filters.endDate}
          errorMessage={dateError}
          onStartDateChange={(value) => {
            setDateError("")
            onChange("startDate", value)
          }}
          onEndDateChange={(value) => {
            setDateError("")
            onChange("endDate", value)
          }}
        />
      </div>

      {isDetailOpen && (
        <div id="procurement-detail-search" className="contract-detail-panel">
          <div className="contract-detail-grid procurement-detail-grid">
            <label className="contract-field">
              <span>내용</span>
              <input
                type="text"
                value={filters.content}
                placeholder="내용을 입력하세요"
                onChange={(event) => onChange("content", event.target.value)}
              />
            </label>

            <label className="contract-field">
              <span>작성자</span>
              <input
                type="text"
                value={filters.author}
                placeholder="작성자를 입력하세요"
                onChange={(event) => onChange("author", event.target.value)}
              />
            </label>
          </div>
        </div>
      )}

      <div className="contract-search-controls">
        <button
          type="button"
          className={`contract-detail-toggle${isDetailOpen ? " is-open" : ""}`}
          aria-expanded={isDetailOpen}
          aria-controls="procurement-detail-search"
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
