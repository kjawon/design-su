import type { FinancialSearchCriteria } from "@/components/suyeong/shared"
import type { IncomeSummaryRecord } from "./income.types"

export const initialIncomeSearchCriteria: FinancialSearchCriteria = {
  fiscalYear: "2026",
  accountingType: "all",
  startDate: "2026-01-01",
  endDate: "2026-08-11",
}

// TODO: 세입정보 API 연결 시 조회 조건에 따른 응답으로 교체합니다.
export const incomeSummaryRecords: readonly IncomeSummaryRecord[] = [
  {
    fiscalYear: "2026",
    accountingType: "general",
    accountingName: "일반회계",
    previousTotal: 0,
    revenue: 419_374_139_180,
    overpaymentRefund: 208_481_120,
    subjectCorrection: 0,
    netRevenue: 419_165_658_060,
    currentTotal: 419_165_658_060,
  },
  {
    fiscalYear: "2026",
    accountingType: "special",
    accountingName: "의료급여기금특별회계",
    previousTotal: 0,
    revenue: 667_201_840,
    overpaymentRefund: 0,
    subjectCorrection: 0,
    netRevenue: 667_201_840,
    currentTotal: 667_201_840,
  },
  {
    fiscalYear: "2026",
    accountingType: "special",
    accountingName: "지하수관리특별회계",
    previousTotal: 0,
    revenue: 350_899_770,
    overpaymentRefund: 0,
    subjectCorrection: 0,
    netRevenue: 350_899_770,
    currentTotal: 350_899_770,
  },
]
