export function formatNumericInput(value: string) {
  return value ? Number(value).toLocaleString("ko-KR") : ""
}

export function keepDigits(value: string) {
  return value.replace(/\D/g, "")
}
