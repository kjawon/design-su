import { useMemo, useState } from "react"

interface PaginatedSearchOptions<TRecord, TCriteria> {
  filterRecords: (records: readonly TRecord[], criteria: TCriteria) => readonly TRecord[]
  initialCriteria: TCriteria
  records: readonly TRecord[]
  initialPageSize?: number
}

export function usePaginatedSearch<TRecord, TCriteria>({
  filterRecords,
  initialCriteria,
  records,
  initialPageSize = 10,
}: PaginatedSearchOptions<TRecord, TCriteria>) {
  const [criteria, setCriteria] = useState(initialCriteria)
  const [appliedCriteria, setAppliedCriteria] = useState(initialCriteria)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredRecords = useMemo(
    () => filterRecords(records, appliedCriteria),
    [appliedCriteria, filterRecords, records],
  )
  const totalPages = Math.max(Math.ceil(filteredRecords.length / pageSize), 1)
  const visibleRecords = filteredRecords.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  )

  const search = () => {
    setAppliedCriteria(criteria)
    setCurrentPage(1)
  }
  const reset = () => {
    setCriteria(initialCriteria)
    setAppliedCriteria(initialCriteria)
    setCurrentPage(1)
  }
  const changePageSize = (nextPageSize: number) => {
    setPageSize(nextPageSize)
    setCurrentPage(1)
  }

  return {
    appliedCriteria,
    changePageSize,
    criteria,
    currentPage,
    filteredRecords,
    pageSize,
    reset,
    search,
    setCriteria,
    setCurrentPage,
    totalPages,
    visibleRecords,
  }
}
