import { formatNumber } from "@/components/suyeong/utils/currency"
import type { BudgetExecutionRecord } from "./budget-execution.types"
import "@/components/suyeong/shared/SuyeongDataTable.css"
import "./SuyeongBudgetExecutionTable.css"

interface SuyeongBudgetExecutionTableProps {
  records: readonly BudgetExecutionRecord[]
}

export function SuyeongBudgetExecutionTable({ records }: SuyeongBudgetExecutionTableProps) {
  return (
    <div className="sy-data-table-wrap" role="region" aria-label="예산집행현황 표" tabIndex={0}>
      <table className="sy-data-table sy-budget-execution-table">
        <caption className="sy-visually-hidden">분야별 예산현액과 지출액 및 집행 비율</caption>
        <colgroup>
          <col className="sy-budget-execution-table__field" />
          <col className="sy-budget-execution-table__budget" />
          <col className="sy-budget-execution-table__before" />
          <col className="sy-budget-execution-table__during" />
          <col className="sy-budget-execution-table__cumulative" />
          <col className="sy-budget-execution-table__rate-col" />
        </colgroup>
        <thead>
          <tr>
            <th rowSpan={2} scope="col">분야별</th>
            <th rowSpan={2} scope="col">예산현액(A)</th>
            <th colSpan={3} scope="colgroup">지출액</th>
            <th rowSpan={2} scope="col">비율(B/A)</th>
          </tr>
          <tr>
            <th scope="col">조회기간전까지</th>
            <th scope="col">조회기간내</th>
            <th className="sy-budget-execution-table__cumulative-header" scope="col">누계(B)</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.field} className={record.field === "합계" ? "is-total" : undefined}>
              <th scope="row">{record.field}</th>
              <td>{formatNumber(record.budget)}</td>
              <td>{formatNumber(record.expenseBeforePeriod)}</td>
              <td>{formatNumber(record.expenseDuringPeriod)}</td>
              <td>{formatNumber(record.cumulativeExpense)}</td>
              <td className="sy-budget-execution-table__rate">
                {record.executionRate.toLocaleString("ko-KR", { maximumFractionDigits: 2 })}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
