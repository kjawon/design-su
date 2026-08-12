export interface ExpenditureSearchCriteria {
  fiscalYear: string
  accountingType: string
  department: string
  statisticItem: string
  businessName: string
  overview: string
  startDate: string
  endDate: string
}

export interface ExpenditureRecord {
  number: number
  fiscalYear: string
  accountingType: string
  accountingLabel: string
  department: string
  businessName: string
  expense: number
  paymentDate: string
  overview: string
  statisticItem: string
}
