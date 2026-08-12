import { CalendarDays } from "lucide-react"
import { formatDateInput } from "@/components/suyeong/utils/date"
import type { FinancialSearchCriteria } from "./financial-search.types"
import { SuyeongQuickRangeButtons } from "./SuyeongQuickRangeButtons"
import { SuyeongSearchActions } from "./SuyeongSearchActions"
import "./SuyeongFinancialSearch.css"

interface SuyeongFinancialSearchProps {
  criteria: FinancialSearchCriteria
  onChange: (nextCriteria: FinancialSearchCriteria) => void
  onReset: () => void
  onSubmit: () => void
}

type QuickRange = "daily" | "weekly" | "monthly" | "yearly"

const quickRanges: ReadonlyArray<{ label: string; value: QuickRange }> = [
  { label: "일간", value: "daily" },
  { label: "주간", value: "weekly" },
  { label: "월간", value: "monthly" },
  { label: "연간", value: "yearly" },
]

function getQuickStartDate(endDate: string, range: QuickRange) {
  const baseDate = new Date(`${endDate}T00:00:00`)
  if (Number.isNaN(baseDate.getTime())) return endDate

  if (range === "weekly") baseDate.setDate(baseDate.getDate() - 6)
  if (range === "monthly") baseDate.setMonth(baseDate.getMonth() - 1)
  if (range === "yearly") baseDate.setFullYear(baseDate.getFullYear() - 1)

  return formatDateInput(baseDate)
}

export function SuyeongFinancialSearch({
  criteria,
  onChange,
  onReset,
  onSubmit,
}: SuyeongFinancialSearchProps) {
  const updateCriteria = <Key extends keyof FinancialSearchCriteria>(
    key: Key,
    value: FinancialSearchCriteria[Key],
  ) => onChange({ ...criteria, [key]: value })

  const applyQuickRange = (range: QuickRange) => {
    const endDate = criteria.endDate || formatDateInput(new Date())
    onChange({ ...criteria, endDate, startDate: getQuickStartDate(endDate, range) })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className="sy-financial-search sy-search-panel" onSubmit={handleSubmit}>
      <div className="sy-financial-search__fields">
        <label className="sy-search-control">
          <span>회계연도</span>
          <select
            value={criteria.fiscalYear}
            onChange={(event) => updateCriteria("fiscalYear", event.target.value)}
          >
            <option value="2026">2026년</option>
            <option value="2025">2025년</option>
            <option value="2024">2024년</option>
          </select>
        </label>

        <label className="sy-search-control">
          <span>회계구분</span>
          <select
            value={criteria.accountingType}
            onChange={(event) => updateCriteria("accountingType", event.target.value)}
          >
            <option value="all">전체</option>
            <option value="general">일반회계</option>
            <option value="special">특별회계</option>
            <option value="fund">기금회계</option>
          </select>
        </label>

        <fieldset className="sy-date-field">
          <legend>기간</legend>
          <div className="sy-financial-search__period-ranges">
            <SuyeongQuickRangeButtons options={quickRanges} onSelect={applyQuickRange} />
          </div>
          <div className="sy-date-field__inputs">
            <label>
              <span className="sy-visually-hidden">조회 시작일</span>
              <input
                type="date"
                value={criteria.startDate}
                max={criteria.endDate}
                onChange={(event) => updateCriteria("startDate", event.target.value)}
              />
              <CalendarDays aria-hidden="true" />
            </label>
            <span aria-hidden="true">~</span>
            <label>
              <span className="sy-visually-hidden">조회 종료일</span>
              <input
                type="date"
                value={criteria.endDate}
                min={criteria.startDate}
                onChange={(event) => updateCriteria("endDate", event.target.value)}
              />
              <CalendarDays aria-hidden="true" />
            </label>
          </div>
        </fieldset>
      </div>

      <div className="sy-financial-search__footer sy-search-panel__footer">
        <SuyeongSearchActions onReset={onReset} />
      </div>
    </form>
  )
}
