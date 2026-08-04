type TableCell = string | number

export function downloadTable(rows: readonly (readonly TableCell[])[], fileName: string) {
  const tabSeparated = rows
    .map((row) => row.map((cell) => String(cell).replaceAll("\t", " ")).join("\t"))
    .join("\n")
  const blob = new Blob([`\uFEFF${tabSeparated}`], {
    type: "application/vnd.ms-excel;charset=utf-8",
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")

  link.href = url
  link.download = fileName
  link.click()
  URL.revokeObjectURL(url)
}
