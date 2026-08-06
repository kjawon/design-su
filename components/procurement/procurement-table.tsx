import { Paperclip } from "lucide-react"
import type { ProcurementPlanRecord } from "@/components/procurement/procurement-types"

type ProcurementTableProps = {
  records: ProcurementPlanRecord[]
  isLoading?: boolean
}

export function ProcurementTable({ records, isLoading = false }: ProcurementTableProps) {
  return (
    <div className="contract-table-card">
      <div className="contract-table-scroll">
        <table className="procurement-data-table" aria-busy={isLoading}>
          <caption className="sr-only">발주계획 검색 결과</caption>
          <colgroup>
            <col className="procurement-table__col-number" />
            <col className="procurement-table__col-title" />
            <col className="procurement-table__col-author" />
            <col className="procurement-table__col-date" />
            <col className="procurement-table__col-attachment" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">번호</th>
              <th scope="col">제목</th>
              <th scope="col">작성자</th>
              <th scope="col">작성일자</th>
              <th scope="col">첨부파일</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map((record) => (
                <tr key={record.id}>
                  <td className="procurement-table__number">{record.id}</td>
                  <td className="procurement-table__title" title={record.title}>
                    <span>{record.title}</span>
                  </td>
                  <td className="procurement-table__author">{record.author}</td>
                  <td className="procurement-table__date">
                    {record.createdDate.replaceAll("-", ".")}
                  </td>
                  <td className="procurement-table__attachment">
                    <a
                      href={`data:text/plain;charset=utf-8,${encodeURIComponent("발주계획 첨부파일 샘플입니다.")}`}
                      download={record.attachment}
                      title={record.attachment}
                    >
                      <Paperclip size={16} aria-hidden="true" />
                      <span>{record.attachment}</span>
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="contract-table__empty">
                  {isLoading ? "조회 중입니다." : "조회된 자료가 없습니다."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
