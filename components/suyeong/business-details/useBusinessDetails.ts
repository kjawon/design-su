import { usePaginatedSearch } from "@/components/suyeong/shared"
import {
  businessDetailRecords,
  initialBusinessDetailsCriteria,
} from "./business-details.data"
import type { BusinessDetailRecord, BusinessDetailsSearchCriteria } from "./business-details.types"

function filterBusinessDetailRecords(
  records: readonly BusinessDetailRecord[],
  criteria: BusinessDetailsSearchCriteria,
) {
  const normalizedName = criteria.businessName.trim().toLocaleLowerCase("ko-KR")

  return records.filter((record) => {
    const matchesField =
      criteria.selectedFields.length === 0 || criteria.selectedFields.includes(record.field)
    const matchesName =
      normalizedName.length === 0 ||
      record.businessName.toLocaleLowerCase("ko-KR").includes(normalizedName)
    const startsAfterBoundary = !criteria.startDate || record.endDate >= criteria.startDate
    const endsBeforeBoundary = !criteria.endDate || record.startDate <= criteria.endDate

    return (
      record.fiscalYear === criteria.fiscalYear &&
      matchesField &&
      matchesName &&
      startsAfterBoundary &&
      endsBeforeBoundary
    )
  })
}

export function useBusinessDetails() {
  return usePaginatedSearch({
    filterRecords: filterBusinessDetailRecords,
    initialCriteria: initialBusinessDetailsCriteria,
    initialPageSize: 100,
    records: businessDetailRecords,
  })
}
