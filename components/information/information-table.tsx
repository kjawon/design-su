import { Paperclip } from "lucide-react"
import type { InformationRecord } from "@/components/information/information-types"

type InformationTableProps = {
  records: InformationRecord[]
  pageTitle: string
  showStatuteColumn?: boolean
  isLoading?: boolean
}

export function InformationTable({
  records,
  pageTitle,
  showStatuteColumn = false,
  isLoading = false,
}: InformationTableProps) {
  const columnCount = showStatuteColumn ? 6 : 5

  return (
    <div className="contract-table-card">
      <div className="contract-table-scroll">
        <table className="information-data-table" aria-busy={isLoading}>
          <caption className="sr-only">{pageTitle} 검색 결과</caption>
          <colgroup>
            <col className="information-table__col-number" />
            <col className="information-table__col-title" />
            <col className="information-table__col-author" />
            <col className="information-table__col-date" />
            <col className="information-table__col-attachment" />
            {showStatuteColumn && <col className="information-table__col-statute" />}
          </colgroup>
          <thead>
            <tr>
              <th scope="col">번호</th>
              <th scope="col">제목</th>
              <th scope="col">작성자</th>
              <th scope="col">작성일자</th>
              <th scope="col">첨부파일</th>
              {showStatuteColumn && <th scope="col">법령보기</th>}
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map((record) => (
                <tr key={record.id}>
                  <td className="information-table__number">{record.id}</td>
                  <td className="information-table__title" title={record.title}>
                    <span>{record.title}</span>
                  </td>
                  <td className="information-table__author">{record.author || "-"}</td>
                  <td className="information-table__date">
                    {record.createdDate.replaceAll("-", ".")}
                  </td>
                  <td className="information-table__attachment">
                    <a
                      href={`data:text/plain;charset=utf-8,${encodeURIComponent(`${pageTitle} 첨부파일 샘플입니다.`)}`}
                      download={record.attachment}
                      title={record.attachment}
                    >
                      <Paperclip size={16} aria-hidden="true" />
                      <span>{record.attachment}</span>
                    </a>
                  </td>
                  {showStatuteColumn && (
                    <td className="information-table__statute">
                      {record.statuteLabel || "-"}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columnCount} className="contract-table__empty">
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
