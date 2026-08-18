import { useMemo } from "react"
import { useDatabaseTime, usePaginatedSearch } from "@/components/suyeong/shared"
import { createInitialExpenditureCriteria, expenditureRecords } from "./expenditure.data"
import type { ExpenditureRecord, ExpenditureSearchCriteria } from "./expenditure.types"

function filterExpenditureRecords(
  records: readonly ExpenditureRecord[],
  criteria: ExpenditureSearchCriteria,
) {
  const name = criteria.businessName.trim().toLocaleLowerCase("ko-KR")
  const overview = criteria.overview.trim().toLocaleLowerCase("ko-KR")

  return records.filter(
    (record) =>
      record.fiscalYear === criteria.fiscalYear &&
      (criteria.accountingType === "all" || record.accountingType === criteria.accountingType) &&
      (criteria.department === "all" || record.department === criteria.department) &&
      (criteria.statisticItem === "all" || record.statisticItem === criteria.statisticItem) &&
      (!name || record.businessName.toLocaleLowerCase("ko-KR").includes(name)) &&
      (!overview || record.overview.toLocaleLowerCase("ko-KR").includes(overview)) &&
      record.paymentDate >= criteria.startDate &&
      record.paymentDate <= criteria.endDate,
  )
}

export function useExpenditure() {
  const { currentDate } = useDatabaseTime()
  const initialCriteria = useMemo(
    () => createInitialExpenditureCriteria(currentDate),
    [currentDate],
  )

  return usePaginatedSearch({
    filterRecords: filterExpenditureRecords,
    initialCriteria,
    records: expenditureRecords,
  })
}
