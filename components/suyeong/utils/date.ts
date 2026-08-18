export function formatDateInput(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function getFiscalYear(referenceDate: string) {
  return referenceDate.slice(0, 4)
}

export function getFiscalYearStart(referenceDate: string) {
  return `${getFiscalYear(referenceDate)}-01-01`
}

export function shiftDate(referenceDate: string, days: number) {
  const [year, month, day] = referenceDate.split("-").map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))

  if (Number.isNaN(date.getTime())) return referenceDate

  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString().slice(0, 10)
}

export function getFiscalYearOptions(referenceDate: string, count = 3) {
  const currentYear = Number(getFiscalYear(referenceDate))
  return Array.from({ length: count }, (_, index) => String(currentYear - index))
}
