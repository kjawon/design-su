import type { BudgetExecutionRecord } from "./budget-execution.types"

export interface FieldExecutionRateChartDatum {
  field: string
  budget: number
  cumulativeExpense: number
  executionRate: number
}

export function createFieldExecutionRateChartData(
  records: readonly BudgetExecutionRecord[],
): FieldExecutionRateChartDatum[] {
  return records
    .filter((record) => record.field.trim() !== "합계")
    .map((record) => ({
      field: record.field,
      budget: record.budget,
      cumulativeExpense: record.cumulativeExpense,
      executionRate: record.budget > 0
        ? (record.cumulativeExpense / record.budget) * 100
        : 0,
    }))
}

export function formatExecutionRate(executionRate: number) {
  return executionRate.toLocaleString("ko-KR", {
    maximumFractionDigits: 1,
  })
}

export function getExecutionRateAxisMax(maxExecutionRate: number) {
  return Math.max(100, Math.ceil(maxExecutionRate / 20) * 20)
}
