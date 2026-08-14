import { useState } from "react"
import { CalendarDays, ChevronDown, SlidersHorizontal } from "lucide-react"
import { SuyeongQuickRangeButtons, SuyeongSearchActions } from "@/components/suyeong/shared"
import { formatDateInput } from "@/components/suyeong/utils/date"
import { expenditureDepartments, expenditureStatisticItems } from "./expenditure.data"
import type { ExpenditureSearchCriteria } from "./expenditure.types"
import "./SuyeongExpenditureSearch.css"

interface Props {
  criteria: ExpenditureSearchCriteria
  onChange: (criteria: ExpenditureSearchCriteria) => void
  onReset: () => void
  onSubmit: () => void
}

const quickRanges = [
  { label: "일간", value: 0 },
  { label: "주간", value: 6 },
  { label: "월간", value: 30 },
  { label: "연간", value: "yearly" },
] as const

export function SuyeongExpenditureSearch({ criteria, onChange, onReset, onSubmit }: Props) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)

  const applyRange = (range: (typeof quickRanges)[number]["value"]) => {
    const end = new Date(`${criteria.endDate}T00:00:00`)
    if (range === "yearly") {
      end.setFullYear(end.getFullYear() - 1)
    } else {
      end.setDate(end.getDate() - range)
    }
    onChange({ ...criteria, startDate: formatDateInput(end) })
  }

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className="sy-expenditure-search sy-search-panel" onSubmit={submit}>
      <div className="sy-expenditure-search__grid">
        <label className="sy-expenditure-search__year sy-search-control">
          <span>회계연도</span>
          <select
            value={criteria.fiscalYear}
            onChange={(event) => onChange({ ...criteria, fiscalYear: event.target.value })}
          >
            <option value="2026">2026년</option>
            <option value="2025">2025년</option>
          </select>
        </label>

        <label className="sy-expenditure-search__accounting sy-search-control">
          <span>회계구분</span>
          <select
            value={criteria.accountingType}
            onChange={(event) => onChange({ ...criteria, accountingType: event.target.value })}
          >
            <option value="all">전체</option>
            <option value="general">일반회계</option>
            <option value="special">특별회계</option>
          </select>
        </label>

        <div
          className="sy-expenditure-search__period"
          role="group"
          aria-labelledby="expenditure-period-label"
        >
          <div className="sy-expenditure-search__period-header">
            <strong id="expenditure-period-label">기간</strong>
            <SuyeongQuickRangeButtons options={quickRanges} onSelect={applyRange} />
          </div>
          <div className="sy-expenditure-search__dates">
            <label className="sy-search-control">
              <span className="sy-visually-hidden">조회 시작일</span>
              <input
                type="date"
                value={criteria.startDate}
                max={criteria.endDate}
                onChange={(event) => onChange({ ...criteria, startDate: event.target.value })}
              />
              <CalendarDays aria-hidden="true" />
            </label>
            <span aria-hidden="true">~</span>
            <label className="sy-search-control">
              <span className="sy-visually-hidden">조회 종료일</span>
              <input
                type="date"
                value={criteria.endDate}
                min={criteria.startDate}
                onChange={(event) => onChange({ ...criteria, endDate: event.target.value })}
              />
              <CalendarDays aria-hidden="true" />
            </label>
          </div>
        </div>
      </div>

      {isAdvancedOpen && (
        <div className="sy-expenditure-search__advanced" id="expenditure-advanced-search">
          <label className="sy-expenditure-search__department sy-search-control">
            <span>부서명</span>
            <select
              value={criteria.department}
              onChange={(event) => onChange({ ...criteria, department: event.target.value })}
            >
              <option value="all">전체</option>
              {expenditureDepartments.map((value) => <option key={value}>{value}</option>)}
            </select>
          </label>

          <label className="sy-expenditure-search__statistic sy-search-control">
            <span>통계목</span>
            <select
              value={criteria.statisticItem}
              onChange={(event) => onChange({ ...criteria, statisticItem: event.target.value })}
            >
              <option value="all">전체</option>
            {expenditureStatisticItems.map((value) => <option key={value}>{value}</option>)}
          </select>
        </label>

          <label className="sy-expenditure-search__business sy-search-control">
            <span>세부사업</span>
            <input
              type="search"
              value={criteria.businessName}
              placeholder="세부사업명을 입력해주세요."
              onChange={(event) => onChange({ ...criteria, businessName: event.target.value })}
            />
          </label>

          <label className="sy-expenditure-search__overview sy-search-control">
            <span>사업개요</span>
            <input
              type="search"
              value={criteria.overview}
              placeholder="사업개요를 입력해주세요."
              onChange={(event) => onChange({ ...criteria, overview: event.target.value })}
            />
          </label>
        </div>
      )}

      <div className="sy-expenditure-search__footer">
        <button
          className="sy-expenditure-search__advanced-toggle"
          type="button"
          aria-expanded={isAdvancedOpen}
          aria-controls="expenditure-advanced-search"
          onClick={() => setIsAdvancedOpen((isOpen) => !isOpen)}
        >
          <SlidersHorizontal aria-hidden="true" />
          상세검색
          <ChevronDown aria-hidden="true" className="sy-expenditure-search__advanced-chevron" />
        </button>
        <SuyeongSearchActions onReset={onReset} />
      </div>
    </form>
  )
}
