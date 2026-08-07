import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react"
import { useState } from "react"
import type { InformationFilters } from "@/components/information/information-types"
import { DateRangeField } from "@/components/shared/date-range-field"
import { SearchActions } from "@/components/shared/search-actions"

type InformationSearchPanelProps = {
  pageTitle: string
  filters: InformationFilters
  isLoading: boolean
  onChange: (field: keyof InformationFilters, value: string) => void
  onReset: () => void
  onSearch: () => void
}

export function InformationSearchPanel({
  pageTitle,
  filters,
  isLoading,
  onChange,
  onReset,
  onSearch,
}: InformationSearchPanelProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [dateError, setDateError] = useState("")

  const changeFilter = (field: keyof InformationFilters, value: string) => {
    setDateError("")
    onChange(field, value)
  }

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
      className="contract-search-panel contract-search-panel--contract information-search-panel"
      aria-label={`${pageTitle} 검색 조건`}
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
            onChange={(event) => changeFilter("title", event.target.value)}
          />
        </label>

        <DateRangeField
          label="작성일자"
          startLabel="작성일자 시작일"
          endLabel="작성일자 종료일"
          startDate={filters.startDate}
          endDate={filters.endDate}
          errorMessage={dateError}
          onStartDateChange={(value) => changeFilter("startDate", value)}
          onEndDateChange={(value) => changeFilter("endDate", value)}
        />
      </div>

      {isDetailOpen && (
        <div id="information-detail-search" className="contract-detail-panel">
          <div className="contract-detail-grid information-detail-grid">
            <label className="contract-field">
              <span>내용</span>
              <input
                type="text"
                value={filters.content}
                placeholder="내용을 입력하세요"
                onChange={(event) => changeFilter("content", event.target.value)}
              />
            </label>

            <label className="contract-field">
              <span>작성자</span>
              <input
                type="text"
                value={filters.author}
                placeholder="작성자를 입력하세요"
                onChange={(event) => changeFilter("author", event.target.value)}
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
          aria-controls="information-detail-search"
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
