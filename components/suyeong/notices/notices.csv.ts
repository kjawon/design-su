import { downloadCsv } from "@/components/suyeong/utils/csv"
import type { NoticeRecord } from "./notices.types"

export function downloadNoticesCsv(records: readonly NoticeRecord[]) {
  downloadCsv({
    filename: "00_알림글.csv",
    headers: ["번호", "제목", "작성자", "작성일자", "내용", "첨부파일"],
    rows: records.map((record) => [
      record.number,
      record.title,
      record.author,
      record.createdDate,
      record.content,
      record.attachmentName,
    ]),
  })
}
