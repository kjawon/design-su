import { formatNumber } from "@/components/suyeong/utils/currency"
import type { BusinessDetailRecord } from "./business-details.types"
import "@/components/suyeong/shared/SuyeongDataTable.css"
import "./SuyeongBusinessDetailsTable.css"

interface SuyeongBusinessDetailsTableProps {
  records: readonly BusinessDetailRecord[]
}

export function SuyeongBusinessDetailsTable({ records }: SuyeongBusinessDetailsTableProps) {
  return (
    <div className="sy-data-table-wrap" role="region" aria-label="사업별 세부설명 표" tabIndex={0}>
      <table className="sy-data-table sy-business-table">
        <caption className="sy-visually-hidden">
          회계구분별 세부사업명, 사업목적, 총사업비 및 사업기간
        </caption>
        <colgroup>
          <col className="sy-business-table__number-col" />
          <col className="sy-business-table__accounting" />
          <col className="sy-business-table__department" />
          <col className="sy-business-table__business" />
          <col className="sy-business-table__purpose" />
          <col className="sy-business-table__budget-col" />
          <col className="sy-business-table__date" />
          <col className="sy-business-table__date" />
          <col className="sy-business-table__field" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">번호</th>
            <th scope="col">회계구분</th>
            <th scope="col">부서명</th>
            <th scope="col">세부사업명</th>
            <th scope="col">사업목적</th>
            <th scope="col">총사업비</th>
            <th scope="col">사업시작일</th>
            <th scope="col">사업종료일</th>
            <th scope="col">분야</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ? (
            records.map((record) => (
              <tr key={record.number}>
                <td className="sy-business-table__number">{record.number}</td>
                <td>{record.accountingType}</td>
                <td>{record.department}</td>
                <th scope="row">
                  <span className="sy-business-table__clamp" title={record.businessName}>
                    {record.businessName}
                  </span>
                </th>
                <td>
                  <span className="sy-business-table__clamp" title={record.purpose}>
                    {record.purpose}
                  </span>
                </td>
                <td className="sy-business-table__budget">{formatNumber(record.totalBudget)}</td>
                <td>{record.startDate.replaceAll("-", ".")}</td>
                <td>{record.endDate.replaceAll("-", ".")}</td>
                <td>{record.fieldLabel}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="sy-data-table__empty" colSpan={9}>
                선택한 조건에 해당하는 사업별 세부설명이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
