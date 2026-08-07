export type InformationMenuKey = "laws" | "forms" | "sites"
export type InformationPageKind = "documents" | "sites"
export type InformationDataKind = "laws" | "forms" | "none"

export type InformationPageConfig = {
  path: string
  title: string
  menuKey: InformationMenuKey
  pageKind: InformationPageKind
  dataKind: InformationDataKind
  totalCount: number
  downloadFileName: string
  showStatuteColumn?: boolean
}

export type InformationFilters = {
  title: string
  author: string
  content: string
  startDate: string
  endDate: string
}

export type InformationRecord = {
  id: number
  title: string
  author: string
  content: string
  createdDate: string
  attachment: string
  statuteLabel?: string
}
