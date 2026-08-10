export function formatCurrency(value: number) {
  return `${value.toLocaleString("ko-KR")}원`
}

export function formatKoreanCurrency(value: number) {
  const absoluteValue = Math.abs(value)
  const eok = Math.floor(absoluteValue / 100_000_000)
  const man = Math.floor((absoluteValue % 100_000_000) / 10_000)
  const prefix = value < 0 ? "-" : ""

  if (eok > 0 && man > 0) {
    return `${prefix}${eok.toLocaleString("ko-KR")}억 ${man.toLocaleString("ko-KR")}만원`
  }
  if (eok > 0) return `${prefix}${eok.toLocaleString("ko-KR")}억원`
  if (man > 0) return `${prefix}${man.toLocaleString("ko-KR")}만원`
  return formatCurrency(value)
}
