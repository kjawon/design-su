import { downloadCsv } from "@/components/suyeong/utils/csv"
import type { FundsOperationRecord } from "./funds.types"

const csvHeaders = [
  "기간",
  "예산현액",
  "총 수입액 기간중",
  "총 수입액 누계(A)",
  "총 지출액 기간중",
  "총 지출액 누계(B)",
  "자금잔액합계(A-B)",
]

export function downloadFundsCsv(records: readonly FundsOperationRecord[]) {
  const rows = records.map((record) => [
    record.date,
    record.budget,
    record.incomeForPeriod,
    record.cumulativeIncome,
    record.expenseForPeriod,
    record.cumulativeExpense,
    record.balance,
  ])
  downloadCsv({ filename: "자금운용현황_2026.csv", headers: csvHeaders, rows })
}
