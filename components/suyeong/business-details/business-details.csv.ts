import { downloadCsv } from "@/components/suyeong/utils/csv"
import type { BusinessDetailRecord } from "./business-details.types"

const csvHeaders = [
  "번호",
  "회계구분",
  "부서명",
  "세부사업명",
  "사업목적",
  "총사업비",
  "사업시작일",
  "사업종료일",
  "분야",
]

export function downloadBusinessDetailsCsv(records: readonly BusinessDetailRecord[]) {
  const rows = records.map((record) => [
    record.number,
    record.accountingType,
    record.department,
    record.businessName,
    record.purpose,
    record.totalBudget,
    record.startDate,
    record.endDate,
    record.fieldLabel,
  ])
  downloadCsv({ filename: "사업별세부설명_2026.csv", headers: csvHeaders, rows })
}
