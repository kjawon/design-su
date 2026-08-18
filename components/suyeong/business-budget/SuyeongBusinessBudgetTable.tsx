import { formatNumber } from "@/components/suyeong/utils/currency"
import type { BusinessBudgetRecord } from "./business-budget.types"
import "@/components/suyeong/shared/SuyeongDataTable.css"
import "./SuyeongBusinessBudgetTable.css"

interface SuyeongBusinessBudgetTableProps { records: readonly BusinessBudgetRecord[] }
export function SuyeongBusinessBudgetTable({ records }: SuyeongBusinessBudgetTableProps) {
  return (
    <div className="sy-data-table-wrap" role="region" aria-label="사업및예산정보 표" tabIndex={0}>
      <table className="sy-data-table sy-business-budget-table">
        <caption className="sy-visually-hidden">사업별 예산현액과 지출액 및 집행잔액</caption>
        <colgroup>
          <col className="sy-business-budget-table__number" />
          <col className="sy-business-budget-table__accounting" />
          <col className="sy-business-budget-table__department" />
          <col className="sy-business-budget-table__business" />
          <col className="sy-business-budget-table__type" />
          {Array.from({ length: 8 }, (_, index) => <col className="sy-business-budget-table__budget" key={index} />)}
          <col className="sy-business-budget-table__expense-col" />
          <col className="sy-business-budget-table__remaining" />
          <col className="sy-business-budget-table__field" />
        </colgroup>
        <thead>
          <tr>
            <th rowSpan={3} scope="col">번호</th><th rowSpan={3} scope="col">회계구분</th><th rowSpan={3} scope="col">부서명</th><th rowSpan={3} scope="col">세부사업명</th><th rowSpan={3} scope="col">사업구분</th>
            <th colSpan={8} scope="colgroup">예산현액</th>
            <th rowSpan={3} scope="col">지출액</th><th rowSpan={3} scope="col">집행잔액</th><th rowSpan={3} scope="col">분야</th>
          </tr>
          <tr><th colSpan={4} scope="colgroup">계</th><th rowSpan={2} scope="col">편성액</th><th rowSpan={2} scope="col">이월액</th><th rowSpan={2} scope="col">예산변경</th><th className="sy-business-budget-table__replacement-header" rowSpan={2} scope="col">수입대체<wbr />경비</th></tr>
          <tr><th scope="col">소계</th><th scope="col">국비</th><th scope="col">도비</th><th scope="col">시군구비</th></tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.number}>
              <td>{record.number}</td><td>{record.accountingLabel}</td><td>{record.department}</td>
              <th scope="row" title={record.businessName}>{record.businessName}</th><td>{record.businessType}</td>
              <td>{formatNumber(record.budgetSubtotal)}</td><td>{formatNumber(record.nationalFunding)}</td><td>{formatNumber(record.provincialFunding)}</td><td>{formatNumber(record.municipalFunding)}</td><td>{formatNumber(record.formedBudget)}</td><td>{formatNumber(record.carriedBudget)}</td><td>{formatNumber(record.changedBudget)}</td><td>{formatNumber(record.replacementRevenue)}</td><td className="sy-business-budget-table__expense">{formatNumber(record.expense)}</td><td>{formatNumber(record.remainingBudget)}</td><td>{record.field}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
