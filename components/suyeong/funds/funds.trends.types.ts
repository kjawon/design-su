export interface MonthlyCumulativeFundTrend {
  month: number
  cumulativeIncome: number
  cumulativeExpense: number
}

export interface FundsTrendSnapshot {
  monthlyCumulative: readonly MonthlyCumulativeFundTrend[]
}
