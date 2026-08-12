import { formatNumber } from "@/components/suyeong/utils/currency"
import type { FundsOperationRecord } from "./funds.types"
import "@/components/suyeong/shared/SuyeongDataTable.css"
import "./SuyeongFundsTable.css"

interface SuyeongFundsTableProps {
  records: readonly FundsOperationRecord[]
}

export function SuyeongFundsTable({ records }: SuyeongFundsTableProps) {
  return (
    <div className="sy-data-table-wrap" role="region" aria-label="자금운용현황 표" tabIndex={0}>
      <table className="sy-data-table sy-funds-table">
        <caption className="sy-visually-hidden">
          기간별 예산현액, 총 수입액, 총 지출액 및 자금잔액
        </caption>
        <colgroup>
          <col className="sy-funds-table__date" />
          <col className="sy-funds-table__budget" />
          <col className="sy-funds-table__period-amount" />
          <col className="sy-funds-table__cumulative-amount" />
          <col className="sy-funds-table__period-amount" />
          <col className="sy-funds-table__cumulative-amount" />
          <col className="sy-funds-table__balance-col" />
        </colgroup>
        <thead>
          <tr>
            <th rowSpan={2} scope="col">기간</th>
            <th rowSpan={2} scope="col">예산현액</th>
            <th colSpan={2} scope="colgroup">총 수입액</th>
            <th colSpan={2} scope="colgroup">총 지출액</th>
            <th rowSpan={2} scope="col">자금잔액합계(A-B)</th>
          </tr>
          <tr>
            <th scope="col">기간중</th>
            <th scope="col">누계(A)</th>
            <th scope="col">기간중</th>
            <th scope="col">누계(B)</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ? (
            records.map((record) => (
              <tr key={record.date}>
                <th scope="row">{record.date.replaceAll("-", ".")}</th>
                <td>{formatNumber(record.budget)}</td>
                <td>{formatNumber(record.incomeForPeriod)}</td>
                <td>{formatNumber(record.cumulativeIncome)}</td>
                <td>{formatNumber(record.expenseForPeriod)}</td>
                <td>{formatNumber(record.cumulativeExpense)}</td>
                <td className="sy-funds-table__balance">{formatNumber(record.balance)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="sy-data-table__empty" colSpan={7}>
                선택한 조건에 해당하는 자금운용 내역이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
