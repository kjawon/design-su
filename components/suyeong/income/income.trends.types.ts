import type { IncomeAccountingType } from "./income.types"

export interface IncomeDailyTrendRecord {
  fiscalYear: string
  accountingType: IncomeAccountingType
  date: string
  amount: number
  cumulativeAmount: number
}

export interface IncomeDailyTrendPoint {
  date: string
  amount: number
  cumulativeAmount: number
}

export interface IncomeMonthlyTrendPoint {
  month: string
  amount: number
}
