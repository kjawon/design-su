export type NoticeMenuKey = "list" | "guide" | "directions"
export type NoticePageKind = "list" | "guide" | "directions"

export type NoticePageConfig = {
  path: string
  title: string
  menuKey: NoticeMenuKey
  pageKind: NoticePageKind
  totalCount: number
  downloadFileName: string
}

export type NoticeFilters = {
  title: string
  content: string
  author: string
  startDate: string
  endDate: string
}

export type NoticeRecord = {
  id: number
  title: string
  content: string
  author: string
  createdDate: string
  attachment: string
}
