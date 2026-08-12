import { usePaginatedSearch, type FinancialSearchCriteria } from "@/components/suyeong/shared"
import { incomeSummaryRecords, initialIncomeSearchCriteria } from "./income.data"
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
  return usePaginatedSearch({
    filterRecords: filterIncomeRecords,
    initialCriteria: initialIncomeSearchCriteria,
    records: incomeSummaryRecords,
  })
}
