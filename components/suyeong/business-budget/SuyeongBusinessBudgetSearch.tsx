import { SuyeongSearchActions, useDatabaseTime } from "@/components/suyeong/shared"
import { getFiscalYearOptions } from "@/components/suyeong/utils/date"
import { businessBudgetDepartments } from "./business-budget.data"
import type { BusinessBudgetSearchCriteria } from "./business-budget.types"
import "./SuyeongBusinessBudgetSearch.css"

interface SuyeongBusinessBudgetSearchProps {
  criteria: BusinessBudgetSearchCriteria
  onChange: (criteria: BusinessBudgetSearchCriteria) => void
  onReset: () => void
  onSubmit: () => void
}

export function SuyeongBusinessBudgetSearch({ criteria, onChange, onReset, onSubmit }: SuyeongBusinessBudgetSearchProps) {
  const { currentDate } = useDatabaseTime()
  const fiscalYearOptions = getFiscalYearOptions(currentDate)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className="sy-business-budget-search sy-search-panel" onSubmit={handleSubmit}>
      <div className="sy-business-budget-search__fields">
        <label className="sy-search-control"><span>회계연도</span><select value={criteria.fiscalYear} onChange={(event) => onChange({ ...criteria, fiscalYear: event.target.value })}>{fiscalYearOptions.map((year) => <option key={year} value={year}>{year}년</option>)}</select></label>
        <label className="sy-search-control"><span>회계구분</span><select value={criteria.accountingType} onChange={(event) => onChange({ ...criteria, accountingType: event.target.value })}><option value="all">전체</option><option value="general">일반회계</option><option value="special">특별회계</option></select></label>
        <label className="sy-search-control"><span>부서명</span><select value={criteria.department} onChange={(event) => onChange({ ...criteria, department: event.target.value })}><option value="all">전체</option>{businessBudgetDepartments.map((department) => <option key={department} value={department}>{department}</option>)}</select></label>
        <label className="sy-search-control"><span>세부사업</span><input type="search" value={criteria.businessName} placeholder="세부사업명을 입력해주세요." onChange={(event) => onChange({ ...criteria, businessName: event.target.value })} /></label>
      </div>
      <div className="sy-business-budget-search__footer sy-search-panel__footer">
        <span />
        <SuyeongSearchActions onReset={onReset} />
      </div>
    </form>
  )
}
