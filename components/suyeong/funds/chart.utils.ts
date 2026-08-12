export function formatAxisAmount(value: number) {
  if (value === 0) return "0"
  return `${Math.round(value / 100_000_000).toLocaleString("ko-KR")}억`
}

export function formatExactWon(value: number) {
  return `${value.toLocaleString("ko-KR")}원`
}

export function formatDisplayDate(value: string) {
  return value.replaceAll("-", ".")
}

export function formatHundredMillionWon(value: number) {
  return `${(value / 100_000_000).toLocaleString("ko-KR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}억원`
}

export function getRoundedAxisMax(maxValue: number, step: number) {
  return Math.max(Math.ceil(maxValue / step) * step, step)
}
