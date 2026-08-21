import { getFiscalYear, getFiscalYearStart } from "@/components/suyeong/utils/date"
import type {
  BusinessDetailRecord,
  BusinessDetailsSearchCriteria,
  BusinessField,
} from "./business-details.types"

export function createInitialBusinessDetailsCriteria(
  referenceDate: string,
): BusinessDetailsSearchCriteria {
  return {
    fiscalYear: getFiscalYear(referenceDate),
    accountingType: "all",
    businessName: "",
    startDate: getFiscalYearStart(referenceDate),
    endDate: referenceDate,
    selectedField: "all",
  }
}

interface BusinessSeed {
  department: string
  businessName: string
  purpose: string
  totalBudget: number
  endDate: string
  field: BusinessField
  fieldLabel: string
}

const businessSeeds: readonly BusinessSeed[] = [
  {
    department: "관광스포츠과",
    businessName: "해양레포츠(SUP) 활성화 지원",
    purpose: "해양레포츠 저변확대 및 00해수욕장의 SUP 특화 관광 기반 조성",
    totalBudget: 3_033_640_000,
    endDate: "2030-12-31",
    field: "cultureTourism",
    fieldLabel: "문화및관광",
  },
  {
    department: "관광스포츠과",
    businessName: "해양레포츠 교육프로그램 지원(보조사업)(전환사업)",
    purpose: "해양레포츠 활성화와 시민 체험 기회 확대",
    totalBudget: 87_960_000,
    endDate: "2028-12-31",
    field: "cultureTourism",
    fieldLabel: "문화및관광",
  },
  {
    department: "관광스포츠과",
    businessName: "전국 해양스포츠 SUP대회 지원(보조사업)",
    purpose: "천혜의 해양 관광 자원인 00 해변을 활용한 전국 규모 대회 개최",
    totalBudget: 40_000_000,
    endDate: "2026-12-31",
    field: "cultureTourism",
    fieldLabel: "문화및관광",
  },
  {
    department: "관광스포츠과",
    businessName: "보조사업 집행 잔액 반환(관광스포츠과)",
    purpose: "국시비보조사업 반환금 편성",
    totalBudget: 0,
    endDate: "2030-12-31",
    field: "cultureTourism",
    fieldLabel: "문화및관광",
  },
  {
    department: "관광스포츠과",
    businessName: "00 해양레포츠센터 관리",
    purpose: "00 해양레포츠센터의 안정적인 운영 및 관리",
    totalBudget: 109_049_000,
    endDate: "2030-12-31",
    field: "cultureTourism",
    fieldLabel: "문화및관광",
  },
  {
    department: "관광스포츠과",
    businessName: "00 레이저쇼",
    purpose: "상설 드론쇼에 이은 상설 레이저쇼 도입으로 00 야간관광 활성화",
    totalBudget: 10_112_981_000,
    endDate: "2030-12-31",
    field: "cultureTourism",
    fieldLabel: "문화및관광",
  },
  {
    department: "관광스포츠과",
    businessName: "관광진흥 지원사업",
    purpose: "사계절 관광 콘텐츠를 개발하고 다양한 관광 홍보사업 추진",
    totalBudget: 5_574_592_000,
    endDate: "2030-12-31",
    field: "cultureTourism",
    fieldLabel: "문화및관광",
  },
  {
    department: "관광스포츠과",
    businessName: "게임 및 음악산업 진흥",
    purpose: "노래연습장과 게임제공업소 지도 및 건전한 영업환경 조성",
    totalBudget: 57_787_000,
    endDate: "2030-12-31",
    field: "cultureTourism",
    fieldLabel: "문화및관광",
  },
  {
    department: "관광스포츠과",
    businessName: "SUP 레저존 운영 및 관리",
    purpose: "SUP 레저존의 안전한 운영과 이용 활성화",
    totalBudget: 2_039_691_000,
    endDate: "2030-12-31",
    field: "cultureTourism",
    fieldLabel: "문화및관광",
  },
  {
    department: "문화예술과",
    businessName: "향사비(보조사업)",
    purpose: "지역의 역사적 위인 추모제향을 통한 지역 정체성 확립",
    totalBudget: 20_000_000,
    endDate: "2030-12-31",
    field: "cultureTourism",
    fieldLabel: "문화및관광",
  },
  {
    department: "문화예술과",
    businessName: "해변 축제 컨벤션(보조사업)",
    purpose: "콘텐츠 중심의 골목·바다 연결을 통한 원도심 문화관광 활성화",
    totalBudget: 4_723_776_000,
    endDate: "2030-12-31",
    field: "cultureTourism",
    fieldLabel: "문화및관광",
  },
  {
    department: "문화예술과",
    businessName: "해변 전시 컨벤션(보조사업)",
    purpose: "지역 문화적 생산성을 높이는 복합 전시와 시민 참여 프로그램 운영",
    totalBudget: 10_497_280_000,
    endDate: "2030-12-31",
    field: "cultureTourism",
    fieldLabel: "문화및관광",
  },
  {
    department: "안전관리과",
    businessName: "재난안전관리 체계 강화",
    purpose: "재난 예방시설 유지관리와 현장 대응 역량 강화",
    totalBudget: 1_284_450_000,
    endDate: "2029-12-31",
    field: "publicSafety",
    fieldLabel: "공공질서및안전",
  },
  {
    department: "평생교육과",
    businessName: "평생학습도시 활성화",
    purpose: "생애주기별 학습기회 제공과 지역 평생학습 공동체 구축",
    totalBudget: 845_320_000,
    endDate: "2028-12-31",
    field: "education",
    fieldLabel: "교육",
  },
  {
    department: "건강증진과",
    businessName: "지역사회 통합건강증진사업",
    purpose: "주민 건강수준 향상을 위한 예방 중심 통합건강서비스 제공",
    totalBudget: 2_148_600_000,
    endDate: "2027-12-31",
    field: "health",
    fieldLabel: "보건",
  },
  {
    department: "일자리경제과",
    businessName: "도시농업 활성화 지원",
    purpose: "생활 속 도시농업 기반 확충과 주민 참여 프로그램 운영",
    totalBudget: 312_750_000,
    endDate: "2026-12-31",
    field: "agricultureFisheries",
    fieldLabel: "농림해양수산",
  },
]

// TODO: 사업별세부설명 API 연결 시 생성 fixture를 실제 조회 응답으로 교체합니다.
export const businessDetailRecords: readonly BusinessDetailRecord[] = Array.from(
  { length: 147 },
  (_, index) => {
    const seed = businessSeeds[index % businessSeeds.length]
    const iteration = Math.floor(index / businessSeeds.length)

    return {
      number: 147 - index,
      fiscalYear: "2026",
      accountingType: "일반회계",
      department: seed.department,
      businessName:
        iteration === 0 ? seed.businessName : `${seed.businessName} ${iteration + 1}단계`,
      purpose: seed.purpose,
      totalBudget: seed.totalBudget + iteration * 3_500_000,
      startDate: "2026-01-01",
      endDate: seed.endDate,
      field: seed.field,
      fieldLabel: seed.fieldLabel,
    }
  },
)
