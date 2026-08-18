import { useMemo } from "react"
import {
  useDatabaseTime,
  usePaginatedSearch,
  type FinancialSearchCriteria,
} from "@/components/suyeong/shared"
import {
  budgetExecutionRecords,
  createInitialBudgetExecutionCriteria,
} from "./budget-execution.data"
import type { BudgetExecutionRecord } from "./budget-execution.types"

function filterBudgetExecutionRecords(
  records: readonly BudgetExecutionRecord[],
  _criteria: FinancialSearchCriteria,
) {
  return records
}

export function useBudgetExecution() {
  const { currentDate } = useDatabaseTime()
  const initialCriteria = useMemo(
    () => createInitialBudgetExecutionCriteria(currentDate),
    [currentDate],
  )

  return usePaginatedSearch({
    filterRecords: filterBudgetExecutionRecords,
    initialCriteria,
    records: budgetExecutionRecords,
  })
}
