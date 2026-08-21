import { downloadCsv } from "@/components/suyeong/utils/csv"
import type { ExpenditureRecord } from "./expenditure.types"

export function downloadExpenditureCsv(records: readonly ExpenditureRecord[]) {
  const header = ["번호", "회계구분", "부서명", "세부사업명", "지출액", "지급일자", "사업개요", "통계목"]
  const rows = records.map((record) => [
    record.number,
    record.accountingLabel,
    record.department,
    record.businessName,
    record.expense,
    record.paymentDate,
    record.overview,
    record.statisticItem,
  ])
  downloadCsv({ filename: "00_세출현황.csv", headers: header, rows })
}
