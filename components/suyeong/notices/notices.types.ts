export interface NoticeSearchCriteria {
  title: string
  author: string
  content: string
  startDate: string
  endDate: string
}

export interface NoticeRecord {
  number: number
  title: string
  author: string
  createdDate: string
  content: string
  attachmentName?: string
}
