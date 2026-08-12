import { usePaginatedSearch, type FinancialSearchCriteria } from "@/components/suyeong/shared"
import { fundsOperationRecords, initialFundsSearchCriteria } from "./funds.data"
import type { FundsOperationRecord } from "./funds.types"

function filterFundsRecords(
  records: readonly FundsOperationRecord[],
  criteria: FinancialSearchCriteria,
) {
  return records.filter(
    (record) =>
      record.date.startsWith(criteria.fiscalYear) &&
      record.date >= criteria.startDate &&
      record.date <= criteria.endDate,
  )
}

export function useFundsOperations() {
  return usePaginatedSearch({
    filterRecords: filterFundsRecords,
    initialCriteria: initialFundsSearchCriteria,
    records: fundsOperationRecords,
  })
}
