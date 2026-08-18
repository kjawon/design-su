import { useMemo } from "react"
import {
  useDatabaseTime,
  usePaginatedSearch,
  type FinancialSearchCriteria,
} from "@/components/suyeong/shared"
import { createInitialIncomeSearchCriteria, incomeSummaryRecords } from "./income.data"
import type { IncomeSummaryRecord } from "./income.types"

function filterIncomeRecords(
  records: readonly IncomeSummaryRecord[],
  criteria: FinancialSearchCriteria,
) {
  return records.filter(
    (record) =>
      record.fiscalYear === criteria.fiscalYear &&
      (criteria.accountingType === "all" || record.accountingType === criteria.accountingType),
  )
}

export function useIncomeInformation() {
  const { currentDate } = useDatabaseTime()
  const initialCriteria = useMemo(
    () => createInitialIncomeSearchCriteria(currentDate),
    [currentDate],
  )

  return usePaginatedSearch({
    filterRecords: filterIncomeRecords,
    initialCriteria,
    records: incomeSummaryRecords,
  })
}
