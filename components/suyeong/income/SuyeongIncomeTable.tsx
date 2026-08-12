import { formatNumber } from "@/components/suyeong/utils/currency"
import type { IncomeSummaryRecord } from "./income.types"
import "@/components/suyeong/shared/SuyeongDataTable.css"
import "./SuyeongIncomeTable.css"

interface SuyeongIncomeTableProps {
  records: readonly IncomeSummaryRecord[]
}

export function SuyeongIncomeTable({ records }: SuyeongIncomeTableProps) {
  return (
    <div className="sy-data-table-wrap" role="region" aria-label="세입정보 표" tabIndex={0}>
      <table className="sy-data-table sy-income-table">
        <caption className="sy-visually-hidden">
          회계구분별 전일누계, 기간중 수입액 및 금일누계
        </caption>
        <colgroup>
          <col className="sy-income-table__accounting" />
          <col className="sy-income-table__previous" />
          <col className="sy-income-table__revenue" />
          <col className="sy-income-table__refund" />
          <col className="sy-income-table__correction" />
          <col className="sy-income-table__net" />
          <col className="sy-income-table__current" />
        </colgroup>
        <thead>
          <tr>
            <th rowSpan={2} scope="col">회계구분명</th>
            <th rowSpan={2} scope="col">전일누계</th>
            <th colSpan={4} scope="colgroup">기간중 수입액</th>
            <th rowSpan={2} scope="col">금일누계</th>
          </tr>
          <tr>
            <th scope="col">수입액</th>
            <th scope="col">과오납반환</th>
            <th scope="col">과목경정</th>
            <th scope="col">차액</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ? (
            records.map((record) => (
              <tr key={record.accountingName}>
                <th scope="row">{record.accountingName}</th>
                <td>{formatNumber(record.previousTotal)}</td>
                <td>{formatNumber(record.revenue)}</td>
                <td>{formatNumber(record.overpaymentRefund)}</td>
                <td>{formatNumber(record.subjectCorrection)}</td>
                <td>{formatNumber(record.netRevenue)}</td>
                <td className="sy-income-table__total">{formatNumber(record.currentTotal)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="sy-data-table__empty" colSpan={7}>
                선택한 조건에 해당하는 세입정보가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
