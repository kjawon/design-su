export type CsvCell = string | number | null | undefined

interface DownloadCsvOptions {
  filename: string
  headers: readonly string[]
  rows: readonly (readonly CsvCell[])[]
}

function escapeCsvCell(value: CsvCell) {
  const text = value == null ? "" : String(value)
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
}

export function downloadCsv({ filename, headers, rows }: DownloadCsvOptions) {
  const csv = [headers, ...rows]
    .map((row) => row.map(escapeCsvCell).join(","))
    .join("\n")
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")

  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
