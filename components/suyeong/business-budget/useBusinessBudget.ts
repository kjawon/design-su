import { useMemo } from "react"
import { useDatabaseTime, usePaginatedSearch } from "@/components/suyeong/shared"
import {
  businessBudgetRecords,
  createInitialBusinessBudgetCriteria,
} from "./business-budget.data"
import type { BusinessBudgetRecord, BusinessBudgetSearchCriteria } from "./business-budget.types"

function filterBusinessBudgetRecords(
  records: readonly BusinessBudgetRecord[],
  criteria: BusinessBudgetSearchCriteria,
) {
  const businessName = criteria.businessName.trim().toLocaleLowerCase("ko-KR")
  return records.filter(
    (record) =>
      record.fiscalYear === criteria.fiscalYear &&
      (criteria.accountingType === "all" || record.accountingType === criteria.accountingType) &&
      (criteria.department === "all" || record.department === criteria.department) &&
      (!businessName || record.businessName.toLocaleLowerCase("ko-KR").includes(businessName)),
  )
}

export function useBusinessBudget() {
  const { currentDate } = useDatabaseTime()
  const initialCriteria = useMemo(
    () => createInitialBusinessBudgetCriteria(currentDate),
    [currentDate],
  )

  return usePaginatedSearch({
    filterRecords: filterBusinessBudgetRecords,
    initialCriteria,
    records: businessBudgetRecords,
  })
}
