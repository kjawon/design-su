import { Paperclip } from "lucide-react"
import type { NoticeRecord } from "@/components/notice/notice-types"

export function NoticeTable({
  records,
  isLoading,
}: {
  records: NoticeRecord[]
  isLoading: boolean
}) {
  return (
    <div className="contract-table-card">
      <div className="contract-table-scroll">
        <table className="notice-data-table" aria-busy={isLoading}>
          <caption className="sr-only">알림글 검색 결과</caption>
          <colgroup>
            <col className="notice-table__col-number" />
            <col className="notice-table__col-title" />
            <col className="notice-table__col-author" />
            <col className="notice-table__col-date" />
            <col className="notice-table__col-attachment" />
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
                  <td className="notice-table__number">{record.id}</td>
                  <td className="notice-table__title" title={record.title}>
                    <span>{record.title}</span>
                  </td>
                  <td className="notice-table__author">{record.author || "-"}</td>
                  <td className="notice-table__date">
                    {record.createdDate.replaceAll("-", ".")}
                  </td>
                  <td className="notice-table__attachment">
                    {record.attachment ? (
                      <a
                        href={`data:text/plain;charset=utf-8,${encodeURIComponent("알림글 첨부파일 샘플입니다.")}`}
                        download={record.attachment}
                        title={record.attachment}
                      >
                        <Paperclip size={16} aria-hidden="true" />
                        <span>{record.attachment}</span>
                      </a>
                    ) : (
                      <span aria-label="첨부파일 없음">-</span>
                    )}
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
