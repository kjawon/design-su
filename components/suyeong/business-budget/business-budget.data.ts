import { getFiscalYear } from "@/components/suyeong/utils/date"
import type {
  BusinessBudgetRecord,
  BusinessBudgetSearchCriteria,
} from "./business-budget.types"

export const businessBudgetDepartments = ["00동", "00동 1", "00동 2", "00동 3", "00동 4"] as const

export function createInitialBusinessBudgetCriteria(
  referenceDate: string,
): BusinessBudgetSearchCriteria {
  return {
    fiscalYear: getFiscalYear(referenceDate),
    accountingType: "all",
    department: "all",
    businessName: "",
  }
}

const businessNames = [
  "행정복지센터 운영",
  "통반장 등 지원",
  "찾아가는 보건복지서비스",
  "주민자치회 운영",
  "우리동네 골목환경 개선",
  "민원창구 운영",
  "기본경비",
  "마을공동체 활성화",
  "지역사회보장협의체 운영",
  "생활민원 현장지원",
] as const

// TODO: 사업및예산정보 API 연결 시 생성 fixture를 실제 조회 응답으로 교체합니다.
export const businessBudgetRecords: readonly BusinessBudgetRecord[] = Array.from(
  { length: 998 },
  (_, index) => {
    const number = 998 - index
    const department = businessBudgetDepartments[Math.floor(index / 7) % businessBudgetDepartments.length]
    const businessName = businessNames[index % businessNames.length]
    const baseBudget = 1_880_000 + ((index * 7_913_000) % 215_000_000)
    const nationalFunding = index % 6 === 0 ? Math.round(baseBudget * 0.25) : 0
    const provincialFunding = index % 5 === 0 ? Math.round(baseBudget * 0.15) : 0
    const municipalFunding = baseBudget - nationalFunding - provincialFunding
    const expense = Math.round(baseBudget * (0.34 + (index % 8) * 0.055))

    return {
      number,
      fiscalYear: "2026",
      accountingType: "general",
      accountingLabel: "일반회계",
      department,
      businessName: `${businessName}${index >= businessNames.length ? ` ${Math.floor(index / businessNames.length) + 1}` : ""}`,
      businessType: index % 4 === 0 ? "보조" : "자체",
      budgetSubtotal: baseBudget,
      nationalFunding,
      provincialFunding,
      municipalFunding,
      formedBudget: baseBudget,
      carriedBudget: index % 17 === 0 ? 5_000_000 : 0,
      changedBudget: 0,
      replacementRevenue: 0,
      expense,
      remainingBudget: baseBudget - expense,
      field: index % 9 === 0 ? "기타" : "일반공공행정",
    }
  },
)
