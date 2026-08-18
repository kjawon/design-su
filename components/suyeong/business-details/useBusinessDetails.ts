import { useMemo } from "react"
import { useDatabaseTime, usePaginatedSearch } from "@/components/suyeong/shared"
import {
  businessDetailRecords,
  createInitialBusinessDetailsCriteria,
} from "./business-details.data"
import type { BusinessDetailRecord, BusinessDetailsSearchCriteria } from "./business-details.types"

function filterBusinessDetailRecords(
  records: readonly BusinessDetailRecord[],
  criteria: BusinessDetailsSearchCriteria,
) {
  const normalizedName = criteria.businessName.trim().toLocaleLowerCase("ko-KR")

  return records.filter((record) => {
    const accountingType = criteria.accountingType ?? "all"
    const selectedField = criteria.selectedField ?? "all"
    const matchesAccountingType =
      accountingType === "all" ||
      (accountingType === "general" && record.accountingType === "일반회계") ||
      (accountingType === "special" && record.accountingType === "특별회계") ||
      (accountingType === "fund" && record.accountingType === "기금회계")
    const matchesField = selectedField === "all" || selectedField === record.field
    const matchesName =
      normalizedName.length === 0 ||
      record.businessName.toLocaleLowerCase("ko-KR").includes(normalizedName)
    const startsAfterBoundary = !criteria.startDate || record.endDate >= criteria.startDate
    const endsBeforeBoundary = !criteria.endDate || record.startDate <= criteria.endDate

    return (
      record.fiscalYear === criteria.fiscalYear &&
      matchesAccountingType &&
      matchesField &&
      matchesName &&
      startsAfterBoundary &&
      endsBeforeBoundary
    )
  })
}

export function useBusinessDetails() {
  const { currentDate } = useDatabaseTime()
  const initialCriteria = useMemo(
    () => createInitialBusinessDetailsCriteria(currentDate),
    [currentDate],
  )

  return usePaginatedSearch({
    filterRecords: filterBusinessDetailRecords,
    initialCriteria,
    records: businessDetailRecords,
  })
}
