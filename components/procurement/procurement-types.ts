export type ProcurementPlanRecord = {
  id: number
  title: string
  author: string
  content: string
  createdDate: string
  attachment: string
}

export type ProcurementPlanFilters = {
  title: string
  author: string
  content: string
  startDate: string
  endDate: string
}
