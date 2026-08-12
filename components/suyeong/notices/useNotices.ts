import { usePaginatedSearch } from "@/components/suyeong/shared"
import { initialNoticeCriteria, noticeRecords } from "./notices.data"
import type { NoticeRecord, NoticeSearchCriteria } from "./notices.types"

function normalize(value: string) {
  return value.trim().toLocaleLowerCase("ko-KR")
}

function filterNoticeRecords(
  records: readonly NoticeRecord[],
  criteria: NoticeSearchCriteria,
) {
  const title = normalize(criteria.title)
  const author = normalize(criteria.author)
  const content = normalize(criteria.content)

  return records.filter(
    (record) =>
      (!title || normalize(record.title).includes(title)) &&
      (!author || normalize(record.author).includes(author)) &&
      (!content || normalize(record.content).includes(content)) &&
      (!criteria.startDate || record.createdDate >= criteria.startDate) &&
      (!criteria.endDate || record.createdDate <= criteria.endDate),
  )
}

export function useNotices() {
  return usePaginatedSearch({
    filterRecords: filterNoticeRecords,
    initialCriteria: initialNoticeCriteria,
    records: noticeRecords,
  })
}
