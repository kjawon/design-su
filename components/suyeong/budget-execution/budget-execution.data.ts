import type { FinancialSearchCriteria } from "@/components/suyeong/shared"
import type { BudgetExecutionRecord } from "./budget-execution.types"

export const initialBudgetExecutionCriteria: FinancialSearchCriteria = {
  fiscalYear: "2026",
  accountingType: "all",
  startDate: "2026-08-11",
  endDate: "2026-08-11",
}

const budgetExecutionValues = [
  ["합계", 699_960_898_560, 368_554_958_740],
  ["일반공공행정", 131_071_105_080, 38_483_802_890],
  ["공공질서및안전", 22_086_859_510, 5_797_300_160],
  ["교육", 723_728_000, 321_880_850],
  ["문화및관광", 29_366_788_550, 10_232_708_530],
  ["환경", 20_794_326_000, 11_273_631_280],
  ["사회복지", 336_491_644_820, 204_042_423_800],
  ["보건", 14_170_209_000, 7_143_068_270],
  ["농림해양수산", 7_296_284_000, 2_977_029_120],
  ["산업·중소기업및에너지", 26_105_185_000, 21_985_123_020],
  ["교통및물류", 20_281_942_620, 12_879_858_240],
  ["국토및지역개발", 15_694_639_980, 7_496_607_220],
  ["예비비", 3_174_703_000, 0],
  ["기타", 72_163_483_000, 45_921_525_360],
] as const

// TODO: 예산집행현황 API 연결 시 현재 fixture를 조회 응답으로 교체합니다.
export const budgetExecutionRecords: readonly BudgetExecutionRecord[] =
  budgetExecutionValues.map(([field, budget, expense]) => ({
    field,
    budget,
    expenseBeforePeriod: expense,
    expenseDuringPeriod: 0,
    cumulativeExpense: expense,
    executionRate: (expense / budget) * 100,
  }))
