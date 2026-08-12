import { formatCurrency } from "@/components/suyeong/utils/currency"
import type { ExpenditureRecord } from "./expenditure.types"
import "@/components/suyeong/shared/SuyeongDataTable.css"
import "./SuyeongExpenditureTable.css"

interface SuyeongExpenditureTableProps {
  records: readonly ExpenditureRecord[]
}

export function SuyeongExpenditureTable({ records }: SuyeongExpenditureTableProps) {
  return (
    <div className="sy-data-table-wrap" role="region" aria-label="지출현황 표" tabIndex={0}>
      <table className="sy-data-table sy-expenditure-table">
        <colgroup>
          <col className="sy-expenditure-table__number" />
          <col className="sy-expenditure-table__accounting" />
          <col className="sy-expenditure-table__department" />
          <col className="sy-expenditure-table__business" />
          <col className="sy-expenditure-table__expense" />
          <col className="sy-expenditure-table__date" />
          <col className="sy-expenditure-table__overview" />
          <col className="sy-expenditure-table__statistic" />
        </colgroup>
        <thead><tr><th scope="col">번호</th><th scope="col">회계구분</th><th scope="col">부서명</th><th scope="col">세부사업명</th><th scope="col">지출액</th><th scope="col">지급일자</th><th scope="col">사업개요</th><th scope="col">통계목</th></tr></thead>
        <tbody>
          {records.length > 0 ? records.map((record) => (
            <tr key={record.number}>
              <td>{record.number}</td>
              <td>{record.accountingLabel}</td>
              <td>{record.department}</td>
              <th scope="row" title={record.businessName}>{record.businessName}</th>
              <td className="sy-expenditure-table__amount">{formatCurrency(record.expense)}</td>
              <td>{record.paymentDate.replaceAll("-", ".")}</td>
              <td className="sy-expenditure-table__overview-cell" title={record.overview}>{record.overview}</td>
              <td>{record.statisticItem}</td>
            </tr>
          )) : <tr><td className="sy-data-table__empty" colSpan={8}>조회된 지출 내역이 없습니다.</td></tr>}
        </tbody>
      </table>
    </div>
  )
}
