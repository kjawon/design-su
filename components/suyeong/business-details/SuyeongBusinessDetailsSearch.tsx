import { useState } from "react"
import { CalendarDays, ChevronDown, SlidersHorizontal } from "lucide-react"
import { SuyeongSearchActions, useDatabaseTime } from "@/components/suyeong/shared"
import { getFiscalYearOptions } from "@/components/suyeong/utils/date"
import {
  businessAccountingTypeOptions,
  businessFieldOptions,
  type BusinessDetailsSearchCriteria,
} from "./business-details.types"
import "./SuyeongBusinessDetailsSearch.css"

interface SuyeongBusinessDetailsSearchProps {
  criteria: BusinessDetailsSearchCriteria
  onChange: (nextCriteria: BusinessDetailsSearchCriteria) => void
  onReset: () => void
  onSubmit: () => void
}

export function SuyeongBusinessDetailsSearch({
  criteria,
  onChange,
  onReset,
  onSubmit,
}: SuyeongBusinessDetailsSearchProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  const { currentDate } = useDatabaseTime()
  const fiscalYearOptions = getFiscalYearOptions(currentDate)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className="sy-business-search sy-search-panel" onSubmit={handleSubmit}>
      <div className="sy-business-search__fields">
        <label className="sy-search-control">
          <span>회계연도</span>
          <select
            value={criteria.fiscalYear}
            onChange={(event) => onChange({ ...criteria, fiscalYear: event.target.value })}
          >
            {fiscalYearOptions.map((year) => (
              <option key={year} value={year}>{year}년</option>
            ))}
          </select>
        </label>

        <label className="sy-search-control">
          <span>회계구분</span>
          <select
            value={criteria.accountingType ?? "all"}
            onChange={(event) => onChange({
              ...criteria,
              accountingType: event.target.value as BusinessDetailsSearchCriteria["accountingType"],
            })}
          >
            {businessAccountingTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <fieldset className="sy-business-period-field">
          <legend>사업기간</legend>
          <div>
            <label>
              <span className="sy-visually-hidden">사업 시작일</span>
              <input
                type="date"
                value={criteria.startDate}
                max={criteria.endDate || undefined}
                onChange={(event) => onChange({ ...criteria, startDate: event.target.value })}
              />
              <CalendarDays aria-hidden="true" />
            </label>
            <span aria-hidden="true">~</span>
            <label>
              <span className="sy-visually-hidden">사업 종료일</span>
              <input
                type="date"
                value={criteria.endDate}
                min={criteria.startDate || undefined}
                onChange={(event) => onChange({ ...criteria, endDate: event.target.value })}
              />
              <CalendarDays aria-hidden="true" />
            </label>
          </div>
        </fieldset>
      </div>

      {isAdvancedOpen && (
        <div className="sy-business-search__advanced" id="business-details-advanced-search">
          <label className="sy-search-control">
            <span>분야</span>
            <select
              value={criteria.selectedField ?? "all"}
              onChange={(event) => onChange({
                ...criteria,
                selectedField: event.target.value as BusinessDetailsSearchCriteria["selectedField"],
              })}
            >
              <option value="all">전체</option>
              {businessFieldOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>

          <label className="sy-business-name-field sy-search-control">
            <span>세부사업</span>
            <input
              type="search"
              value={criteria.businessName}
              placeholder="세부사업명을 입력해주세요."
              onChange={(event) => onChange({ ...criteria, businessName: event.target.value })}
            />
          </label>
        </div>
      )}

      <div className="sy-business-search__footer sy-search-panel__footer">
        <button
          className="sy-business-search__advanced-toggle"
          type="button"
          aria-expanded={isAdvancedOpen}
          aria-controls="business-details-advanced-search"
          onClick={() => setIsAdvancedOpen((isOpen) => !isOpen)}
        >
          <SlidersHorizontal aria-hidden="true" />
          상세검색
          <ChevronDown aria-hidden="true" className="sy-business-search__advanced-chevron" />
        </button>
        <SuyeongSearchActions onReset={onReset} />
      </div>
    </form>
  )
}
