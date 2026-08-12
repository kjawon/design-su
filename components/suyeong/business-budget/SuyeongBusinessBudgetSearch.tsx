import { SuyeongSearchActions } from "@/components/suyeong/shared"
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
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className="sy-business-budget-search sy-search-panel" onSubmit={handleSubmit}>
      <div className="sy-business-budget-search__fields">
        <label className="sy-search-control"><span>회계연도</span><select value={criteria.fiscalYear} onChange={(event) => onChange({ ...criteria, fiscalYear: event.target.value })}><option value="2026">2026년</option><option value="2025">2025년</option><option value="2024">2024년</option></select></label>
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
