import { useMemo } from "react"
import {
  useDatabaseTime,
  usePaginatedSearch,
  type FinancialSearchCriteria,
} from "@/components/suyeong/shared"
import { createInitialFundsSearchCriteria, fundsOperationRecords } from "./funds.data"
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
  const { currentDate } = useDatabaseTime()
  const initialCriteria = useMemo(
    () => createInitialFundsSearchCriteria(currentDate),
    [currentDate],
  )

  return usePaginatedSearch({
    filterRecords: filterFundsRecords,
    initialCriteria,
    records: fundsOperationRecords,
  })
}
