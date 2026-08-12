import { downloadCsv } from "@/components/suyeong/utils/csv"
import type { IncomeSummaryRecord } from "./income.types"

const csvHeaders = [
  "회계구분명",
  "전일누계",
  "기간중 수입액-수입액",
  "기간중 수입액-과오납반환",
  "기간중 수입액-과목경정",
  "기간중 수입액-차액",
  "금일누계",
]

export function downloadIncomeCsv(records: readonly IncomeSummaryRecord[]) {
  const rows = records.map((record) => [
    record.accountingName,
    record.previousTotal,
    record.revenue,
    record.overpaymentRefund,
    record.subjectCorrection,
    record.netRevenue,
    record.currentTotal,
  ])
  downloadCsv({ filename: "세입정보_2026.csv", headers: csvHeaders, rows })
}
