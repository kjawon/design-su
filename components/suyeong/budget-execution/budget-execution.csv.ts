import { downloadCsv } from "@/components/suyeong/utils/csv"
import type { BudgetExecutionRecord } from "./budget-execution.types"

export function downloadBudgetExecutionCsv(records: readonly BudgetExecutionRecord[]) {
  const headers = ["분야별", "예산현액(A)", "조회기간전까지", "조회기간내", "누계(B)", "비율(B/A)"]
  const rows = records.map((record) => [
    record.field,
    record.budget,
    record.expenseBeforePeriod,
    record.expenseDuringPeriod,
    record.cumulativeExpense,
    record.executionRate.toFixed(2),
  ])
  downloadCsv({ filename: "예산집행현황_2026.csv", headers, rows })
}
