export function formatIncomeAxisAmount(value: number) {
  if (value === 0) return "0"
  return `${Math.round(value / 100_000_000).toLocaleString("ko-KR")}억`
}

export function formatIncomeBarAmount(value: number) {
  return `${(value / 100_000_000).toLocaleString("ko-KR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  })}억`
}

export function formatIncomeDate(value: string) {
  return value.replaceAll("-", ".")
}

export function formatIncomeMonth(value: string) {
  return `${Number(value.slice(5, 7))}월`
}

export function getIncomeAxisMax(maxValue: number) {
  if (maxValue <= 0) return 100_000_000

  const roughStep = maxValue / 5
  const magnitude = 10 ** Math.floor(Math.log10(roughStep))
  const normalizedStep = roughStep / magnitude
  const niceStep = normalizedStep <= 1 ? 1 : normalizedStep <= 2 ? 2 : normalizedStep <= 5 ? 5 : 10
  return niceStep * magnitude * 5
}
