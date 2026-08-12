export interface BudgetExecutionRecord {
  field: string
  budget: number
  expenseBeforePeriod: number
  expenseDuringPeriod: number
  cumulativeExpense: number
  executionRate: number
}
