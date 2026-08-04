export function createMockPage<RecordType extends { id: number }>(
  source: readonly RecordType[],
  totalCount: number,
  page: number,
  pageSize: number,
) {
  if (source.length === 0 || totalCount === 0) return []

  const startIndex = (page - 1) * pageSize
  const remaining = Math.max(0, totalCount - startIndex)

  return Array.from({ length: Math.min(pageSize, remaining) }, (_, index) => {
    const template = source[(startIndex + index) % source.length]
    return {
      ...template,
      id: totalCount - startIndex - index,
    }
  })
}
