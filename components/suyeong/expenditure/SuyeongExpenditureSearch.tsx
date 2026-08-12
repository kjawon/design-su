import { CalendarDays } from "lucide-react"
import { SuyeongQuickRangeButtons, SuyeongSearchActions } from "@/components/suyeong/shared"
import { formatDateInput } from "@/components/suyeong/utils/date"
import { expenditureDepartments, expenditureStatisticItems } from "./expenditure.data"
import type { ExpenditureSearchCriteria } from "./expenditure.types"
import "./SuyeongExpenditureSearch.css"

interface Props { criteria: ExpenditureSearchCriteria; onChange: (criteria: ExpenditureSearchCriteria) => void; onReset: () => void; onSubmit: () => void }

const quickRanges = [
  { label: "일간", value: 0 },
  { label: "주간", value: 6 },
  { label: "월간", value: 30 },
] as const

export function SuyeongExpenditureSearch({ criteria, onChange, onReset, onSubmit }: Props) {
  const applyRange = (days: number) => {
    const end = new Date(`${criteria.endDate}T00:00:00`)
    end.setDate(end.getDate() - days)
    onChange({ ...criteria, startDate: formatDateInput(end) })
  }
  const submit = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); onSubmit() }
  return (
    <form className="sy-expenditure-search sy-search-panel" onSubmit={submit}>
      <div className="sy-expenditure-search__grid">
        <label className="sy-search-control"><span>회계연도</span><select value={criteria.fiscalYear} onChange={(e) => onChange({ ...criteria, fiscalYear: e.target.value })}><option value="2026">2026년</option><option value="2025">2025년</option></select></label>
        <label className="sy-search-control"><span>회계구분</span><select value={criteria.accountingType} onChange={(e) => onChange({ ...criteria, accountingType: e.target.value })}><option value="all">전체</option><option value="general">일반회계</option><option value="special">특별회계</option></select></label>
        <label className="sy-search-control"><span>부서명</span><select value={criteria.department} onChange={(e) => onChange({ ...criteria, department: e.target.value })}><option value="all">전체</option>{expenditureDepartments.map((value) => <option key={value}>{value}</option>)}</select></label>
        <label className="sy-search-control"><span>통계목</span><select value={criteria.statisticItem} onChange={(e) => onChange({ ...criteria, statisticItem: e.target.value })}><option value="all">전체</option>{expenditureStatisticItems.map((value) => <option key={value}>{value}</option>)}</select></label>
        <label className="sy-search-control"><span>세부사업</span><input type="search" value={criteria.businessName} placeholder="세부사업명을 입력해주세요." onChange={(e) => onChange({ ...criteria, businessName: e.target.value })} /></label>
        <label className="sy-search-control"><span>사업개요</span><input type="search" value={criteria.overview} placeholder="사업개요를 입력해주세요." onChange={(e) => onChange({ ...criteria, overview: e.target.value })} /></label>
      </div>
      <div className="sy-expenditure-search__period">
        <strong>기간</strong>
        <div className="sy-expenditure-search__dates"><label className="sy-search-control"><input type="date" value={criteria.startDate} max={criteria.endDate} onChange={(e) => onChange({ ...criteria, startDate: e.target.value })} /><CalendarDays aria-hidden="true" /></label><span>~</span><label className="sy-search-control"><input type="date" value={criteria.endDate} min={criteria.startDate} onChange={(e) => onChange({ ...criteria, endDate: e.target.value })} /><CalendarDays aria-hidden="true" /></label></div>
      </div>
      <div className="sy-expenditure-search__footer">
        <SuyeongSearchActions onReset={onReset}>
          <SuyeongQuickRangeButtons options={quickRanges} onSelect={applyRange} />
        </SuyeongSearchActions>
      </div>
    </form>
  )
}
