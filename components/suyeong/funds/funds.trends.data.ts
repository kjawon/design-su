import type { FundsTrendSnapshot } from "./funds.trends.types"

// TODO: 자금운용 추이 API가 준비되면 이 fixture를 API 응답 매핑 결과로 교체합니다.
// 상세내역의 검색 상태와 의도적으로 분리된 연간 현황 전용 데이터입니다.
export const currentFundsTrendSnapshot: FundsTrendSnapshot = {
  monthlyCumulative: [
    { month: 1, cumulativeIncome: 42_380_000_000, cumulativeExpense: 35_920_000_000 },
    { month: 2, cumulativeIncome: 87_540_000_000, cumulativeExpense: 73_460_000_000 },
    { month: 3, cumulativeIncome: 133_870_000_000, cumulativeExpense: 116_280_000_000 },
    { month: 4, cumulativeIncome: 181_420_000_000, cumulativeExpense: 161_750_000_000 },
    { month: 5, cumulativeIncome: 236_990_000_000, cumulativeExpense: 211_340_000_000 },
    { month: 6, cumulativeIncome: 302_610_000_000, cumulativeExpense: 267_880_000_000 },
    { month: 7, cumulativeIncome: 373_480_000_000, cumulativeExpense: 331_220_000_000 },
    { month: 8, cumulativeIncome: 420_183_759_670, cumulativeExpense: 369_212_489_750 },
  ],
}
