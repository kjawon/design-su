import type { FinancialSearchCriteria } from "@/components/suyeong/shared"
import { incomeDailyTrendRecords } from "./income.trends.data"
import type {
  IncomeDailyTrendPoint,
  IncomeMonthlyTrendPoint,
} from "./income.trends.types"

function isWithinSelectedPeriod(date: string, criteria: FinancialSearchCriteria) {
  const yearStart = `${criteria.fiscalYear}-01-01`
  const yearEnd = `${criteria.fiscalYear}-12-31`
  const startDate = criteria.startDate > yearStart ? criteria.startDate : yearStart
  const endDate = criteria.endDate < yearEnd ? criteria.endDate : yearEnd
  return startDate <= endDate && date >= startDate && date <= endDate
}

export function selectDailyIncomeTrend(criteria: FinancialSearchCriteria) {
  const pointsByDate = new Map<string, IncomeDailyTrendPoint>()

  incomeDailyTrendRecords.forEach((record) => {
    const matchesAccountingType =
      criteria.accountingType === "all" || record.accountingType === criteria.accountingType
    if (
      record.fiscalYear !== criteria.fiscalYear ||
      !matchesAccountingType ||
      !isWithinSelectedPeriod(record.date, criteria)
    ) {
      return
    }

    const current = pointsByDate.get(record.date)
    pointsByDate.set(record.date, {
      date: record.date,
      amount: (current?.amount ?? 0) + record.amount,
      cumulativeAmount: (current?.cumulativeAmount ?? 0) + record.cumulativeAmount,
    })
  })

  return Array.from(pointsByDate.values()).sort((a, b) => a.date.localeCompare(b.date))
}

export function selectYearToDateIncomeTrend(criteria: FinancialSearchCriteria) {
  return selectDailyIncomeTrend({
    ...criteria,
    startDate: `${criteria.fiscalYear}-01-01`,
  })
}

export function aggregateMonthlyIncomeTrend(
  dailyPoints: readonly IncomeDailyTrendPoint[],
) {
  const amountsByMonth = new Map<string, number>()

  dailyPoints.forEach((point) => {
    const month = point.date.slice(0, 7)
    amountsByMonth.set(month, (amountsByMonth.get(month) ?? 0) + point.amount)
  })

  return Array.from(amountsByMonth, ([month, amount]): IncomeMonthlyTrendPoint => ({
    month,
    amount,
  })).sort((a, b) => a.month.localeCompare(b.month))
}
