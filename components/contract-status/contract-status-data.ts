export type ContractType = "공사" | "용역" | "물품"

export type ContractRecord = {
  id: number
  type: ContractType
  office: string
  title: string
  amount: number
  date: string
  contractor: string
}

export type ContractFilters = {
  office: string
  company: string
  title: string
  minAmount: string
  maxAmount: string
  startDate: string
  endDate: string
}

export const EMPTY_CONTRACT_FILTERS: ContractFilters = {
  office: "전체",
  company: "",
  title: "",
  minAmount: "",
  maxAmount: "",
  startDate: "",
  endDate: "",
}

export const TOTAL_CONTRACTS = 4352

export const CONTRACT_RECORDS: ContractRecord[] = [
  {
    id: 4352,
    type: "용역",
    office: "본청 회계과",
    title: "2026년 가평군 통합정보시스템 운영 및 유지관리 용역",
    amount: 284000000,
    date: "2026-03-25",
    contractor: "주식회사 가온시스템",
  },
  {
    id: 4351,
    type: "물품",
    office: "보건정책과",
    title: "2026년 상반기 예방접종 의약품 구매",
    amount: 48920000,
    date: "2026-03-24",
    contractor: "대한메디컬",
  },
  {
    id: 4350,
    type: "공사",
    office: "건설도시과",
    title: "청평면 생활도로 확장 및 포장 공사",
    amount: 1245600000,
    date: "2026-03-22",
    contractor: "한강건설 주식회사",
  },
  {
    id: 4349,
    type: "용역",
    office: "문화체육과",
    title: "자라섬 문화축제 홍보 대행 및 행사 운영 용역",
    amount: 85000000,
    date: "2026-03-20",
    contractor: "주식회사 더온기획",
  },
  {
    id: 4348,
    type: "물품",
    office: "교육정책과",
    title: "공공도서관 신입생 가방 및 학용품 세트 납품",
    amount: 32150000,
    date: "2026-03-18",
    contractor: "드림오피스",
  },
  {
    id: 4347,
    type: "공사",
    office: "상하수도사업소",
    title: "북면 급수관로 정비공사",
    amount: 672400000,
    date: "2026-03-16",
    contractor: "대성토건 주식회사",
  },
  {
    id: 4346,
    type: "용역",
    office: "관광과",
    title: "가평 관광 통합안내체계 개선 연구용역",
    amount: 96000000,
    date: "2026-03-14",
    contractor: "한국관광연구원",
  },
  {
    id: 4345,
    type: "물품",
    office: "산림과",
    title: "산불진화 개인보호장비 및 소모품 구매",
    amount: 41800000,
    date: "2026-03-12",
    contractor: "그린세이프티",
  },
  {
    id: 4344,
    type: "공사",
    office: "환경정책과",
    title: "조종천 생태하천 산책로 정비공사",
    amount: 358700000,
    date: "2026-03-10",
    contractor: "청림조경 주식회사",
  },
  {
    id: 4343,
    type: "용역",
    office: "안전재난과",
    title: "재난 예·경보시설 통합 유지관리 용역",
    amount: 142000000,
    date: "2026-03-08",
    contractor: "주식회사 세이프넷",
  },
  {
    id: 4342,
    type: "물품",
    office: "복지정책과",
    title: "취약계층 냉방용품 지원 물품 구매",
    amount: 27600000,
    date: "2026-03-06",
    contractor: "가평유통협동조합",
  },
  {
    id: 4341,
    type: "공사",
    office: "설악면",
    title: "설악면 행정복지센터 주차장 개선공사",
    amount: 118300000,
    date: "2026-03-04",
    contractor: "주식회사 우리건설",
  },
]
