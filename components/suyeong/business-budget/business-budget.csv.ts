import { downloadCsv } from "@/components/suyeong/utils/csv"
import type { BusinessBudgetRecord } from "./business-budget.types"

export function downloadBusinessBudgetCsv(records: readonly BusinessBudgetRecord[]) {
  const headers = ["번호", "회계구분", "부서명", "세부사업명", "사업구분", "예산현액 소계", "국비", "도비", "시군구비", "편성액", "이월액", "예산변경", "수입대체경비", "지출액", "집행잔액", "분야"]
  const rows = records.map((record) => [record.number, record.accountingLabel, record.department, record.businessName, record.businessType, record.budgetSubtotal, record.nationalFunding, record.provincialFunding, record.municipalFunding, record.formedBudget, record.carriedBudget, record.changedBudget, record.replacementRevenue, record.expense, record.remainingBudget, record.field])
  downloadCsv({ filename: "사업및예산정보_2026.csv", headers, rows })
}
