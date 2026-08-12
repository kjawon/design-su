export type IncomeAccountingType = "general" | "special"

export interface IncomeSummaryRecord {
  fiscalYear: string
  accountingType: IncomeAccountingType
  accountingName: string
  previousTotal: number
  revenue: number
  overpaymentRefund: number
  subjectCorrection: number
  netRevenue: number
  currentTotal: number
}
