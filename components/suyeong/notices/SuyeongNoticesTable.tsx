import { Paperclip } from "lucide-react"
import type { NoticeRecord } from "./notices.types"
import "@/components/suyeong/shared/SuyeongDataTable.css"
import "./SuyeongNoticesTable.css"

interface SuyeongNoticesTableProps {
  records: readonly NoticeRecord[]
}

export function SuyeongNoticesTable({ records }: SuyeongNoticesTableProps) {
  return (
    <div className="sy-data-table-wrap" role="region" aria-label="알림글 표" tabIndex={0}>
      <table className="sy-data-table sy-notices-table">
        <caption className="sy-visually-hidden">00 운영정보공개시스템 알림글 목록</caption>
        <colgroup>
          <col className="sy-notices-table__number" />
          <col className="sy-notices-table__title" />
          <col className="sy-notices-table__author" />
          <col className="sy-notices-table__date" />
          <col className="sy-notices-table__attachment" />
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
          {records.length > 0 ? records.map((record) => (
            <tr key={record.number}>
              <td>{record.number}</td>
              <th scope="row" title={record.title}>{record.title}</th>
              <td>{record.author}</td>
              <td>{record.createdDate.replaceAll("-", ".")}</td>
              <td>
                {record.attachmentName ? (
                  <span className="sy-notices-table__file" title={record.attachmentName}>
                    <Paperclip aria-hidden="true" />
                    <span>{record.attachmentName}</span>
                  </span>
                ) : (
                  <span className="sy-notices-table__no-file">-</span>
                )}
              </td>
            </tr>
          )) : (
            <tr>
              <td className="sy-data-table__empty" colSpan={5}>조회된 알림글이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
