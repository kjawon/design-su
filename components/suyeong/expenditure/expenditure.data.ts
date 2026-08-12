import type { ExpenditureRecord, ExpenditureSearchCriteria } from "./expenditure.types"

export const expenditureDepartments = ["민락동", "광안4동", "광안3동", "광안2동", "남천1동"] as const
export const expenditureStatisticItems = ["사무관리비", "공공운영비", "재료비", "기관운영업무추진비", "정원가산업무추진비"] as const

export const initialExpenditureCriteria: ExpenditureSearchCriteria = {
  fiscalYear: "2026",
  accountingType: "all",
  department: "all",
  statisticItem: "all",
  businessName: "",
  overview: "",
  startDate: "2026-08-11",
  endDate: "2026-08-11",
}

const businessNames = ["기본경비", "행정복지센터 시설 및 장비 확충", "읍면동 맞춤형 통합서비스 지원(보조사업)", "주민자율방역단 지원(보조사업)"] as const
const overviewSeeds = ["직원 급식비 지급", "우편요금 납부(카드결제)", "행정차량 LPG 충전(카드결제)", "통신요금 납부", "사무용품 구입", "위원회 간담회 개최 경비"] as const

// TODO: 지출현황 API 연결 시 생성 fixture를 실제 조회 응답으로 교체합니다.
export const expenditureRecords: readonly ExpenditureRecord[] = Array.from({ length: 137 }, (_, index) => {
  const department = expenditureDepartments[Math.floor(index / 4) % expenditureDepartments.length]
  const businessName = businessNames[index % businessNames.length]
  const statisticItem = expenditureStatisticItems[index % expenditureStatisticItems.length]
  return {
    number: 137 - index,
    fiscalYear: "2026",
    accountingType: "general",
    accountingLabel: "일반회계",
    department,
    businessName: `${businessName}${businessName === "기본경비" ? `(${department})` : ""}`,
    expense: 50_000 + ((index * 73_270) % 1_350_000),
    paymentDate: index < 10 ? "2026-08-11" : `2026-08-${String(10 - (index % 7)).padStart(2, "0")}`,
    overview: `2026년 ${index % 2 === 0 ? "8월" : "7월"} ${overviewSeeds[index % overviewSeeds.length]}`,
    statisticItem,
  }
})
