import { usePaginatedSearch, type FinancialSearchCriteria } from "@/components/suyeong/shared"
import {
  budgetExecutionRecords,
  initialBudgetExecutionCriteria,
} from "./budget-execution.data"
import type { BudgetExecutionRecord } from "./budget-execution.types"

function filterBudgetExecutionRecords(
  records: readonly BudgetExecutionRecord[],
  _criteria: FinancialSearchCriteria,
) {
  return records
}

export function useBudgetExecution() {
  return usePaginatedSearch({
    filterRecords: filterBudgetExecutionRecords,
    initialCriteria: initialBudgetExecutionCriteria,
    initialPageSize: 50,
    records: budgetExecutionRecords,
  })
}
