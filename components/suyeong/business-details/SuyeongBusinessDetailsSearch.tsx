import { CalendarDays } from "lucide-react"
import { SuyeongSearchActions } from "@/components/suyeong/shared"
import {
  businessFieldOptions,
  type BusinessDetailsSearchCriteria,
  type BusinessField,
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
  const allFieldsSelected = criteria.selectedFields.length === businessFieldOptions.length

  const toggleAllFields = () => {
    onChange({
      ...criteria,
      selectedFields: allFieldsSelected
        ? []
        : businessFieldOptions.map((option) => option.value),
    })
  }

  const toggleField = (field: BusinessField) => {
    const isSelected = criteria.selectedFields.includes(field)
    onChange({
      ...criteria,
      selectedFields: isSelected
        ? criteria.selectedFields.filter((selectedField) => selectedField !== field)
        : [...criteria.selectedFields, field],
    })
  }

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
            <option value="2026">2026년</option>
            <option value="2025">2025년</option>
            <option value="2024">2024년</option>
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

      <fieldset className="sy-business-fields">
        <legend>분야선택</legend>
        <div className="sy-business-fields__options">
          <label>
            <input type="checkbox" checked={allFieldsSelected} onChange={toggleAllFields} />
            <span>전체</span>
          </label>
          {businessFieldOptions.map((option) => (
            <label key={option.value}>
              <input
                type="checkbox"
                checked={criteria.selectedFields.includes(option.value)}
                onChange={() => toggleField(option.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="sy-business-search__footer sy-search-panel__footer">
        <p>여러 분야를 선택하여 함께 조회할 수 있습니다.</p>
        <SuyeongSearchActions onReset={onReset} />
      </div>
    </form>
  )
}
