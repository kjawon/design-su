import {
  Banknote,
  ClipboardList,
  FileText,
  Landmark,
  Link2,
  Megaphone,
  ReceiptText,
  SearchCheck,
  WalletCards,
} from "lucide-react"

export type ContractCategory = "자체발주계획" | "입찰정보" | "일반회계" | "특별회계" | "대금지급"

export const contracts = [
  { type: "물품", date: "2026.03.15", title: "2026년 상반기 사무용품 및 전산소모품 구매", partner: "(주)오피스네트웍스", amount: "45,200,000원", method: "제한경쟁", categories: ["자체발주계획", "일반회계", "대금지급"] as ContractCategory[] },
  { type: "용역", date: "2026.03.14", title: "성남시 디지털 트윈 기반 지능형 방범 시스템 운영 유지보수", partner: "네트웍솔루션", amount: "284,000,000원", method: "일반경쟁", categories: ["입찰정보", "일반회계", "특별회계"] as ContractCategory[] },
  { type: "공사", date: "2026.03.14", title: "분당구 보건소 방역용 소독 장비 및 소모품 긴급 구매", partner: "메디크린코리아", amount: "15,600,000원", method: "수의계약", categories: ["자체발주계획", "입찰정보", "특별회계", "대금지급"] as ContractCategory[] },
  { type: "공사", date: "2026.03.13", title: "성남중앙공원 산책로 및 편의시설 정비공사", partner: "(주)성남건설", amount: "128,400,000원", method: "제한경쟁", categories: ["자체발주계획", "입찰정보", "일반회계", "대금지급"] as ContractCategory[] },
  { type: "용역", date: "2026.03.12", title: "2026년 성남시 공공데이터 품질관리 및 개방 지원 용역", partner: "디지털파트너스", amount: "96,800,000원", method: "일반경쟁", categories: ["입찰정보", "일반회계", "특별회계"] as ContractCategory[] },
  { type: "물품", date: "2026.03.11", title: "수정구 행정복지센터 민원용 전산장비 구매", partner: "성남정보기술(주)", amount: "62,300,000원", method: "다수공급자계약", categories: ["자체발주계획", "일반회계", "대금지급"] as ContractCategory[] },
  { type: "용역", date: "2026.03.10", title: "탄천 수질 측정 및 생태환경 모니터링 용역", partner: "그린환경연구소", amount: "73,500,000원", method: "제한경쟁", categories: ["입찰정보", "일반회계", "특별회계", "대금지급"] as ContractCategory[] },
  { type: "공사", date: "2026.03.09", title: "판교 보행자도로 노후 포장 정비공사", partner: "대영건설산업", amount: "211,700,000원", method: "일반경쟁", categories: ["자체발주계획", "입찰정보", "특별회계"] as ContractCategory[] },
  { type: "물품", date: "2026.03.08", title: "도서관 전자자료 열람용 태블릿 구매", partner: "스마트에듀", amount: "38,900,000원", method: "수의계약", categories: ["자체발주계획", "일반회계", "특별회계", "대금지급"] as ContractCategory[] },
]

export const services = [
  { title: "자체발주계획", description: "발주 예정 사업을 미리 확인하세요.", icon: ClipboardList },
  { title: "입찰정보", description: "진행 중인 입찰과 결과를 확인하세요.", icon: SearchCheck },
  { title: "일반회계", description: "일반회계 계약 정보를 확인하세요.", icon: ReceiptText },
  { title: "특별회계", description: "특별회계 계약 정보를 확인하세요.", icon: WalletCards },
  { title: "대금지급", description: "계약 대금 지급 현황을 확인하세요.", icon: Banknote },
]

export const notices = [
  ["2026년 하반기 용역 입찰 예정 정보 사전 안내", "2026.03.10"],
  ["성남시 계약정보포털 시스템 고도화에 따른 일시 중단 안내", "2026.03.05"],
  ["청렴계약 이행 서약서 양식 변경 고시", "2026.02.28"],
  ["성남시 관내 업체 우선 계약 제도 운영 지침 안내", "2026.02.15"],
]

export const frequentlyUsed = [
  { title: "계약서식", description: "필요한 계약서식을 간편하게 확인하세요.", icon: FileText },
  { title: "계약법규", description: "계약 관련 법규를 한눈에 살펴보세요.", icon: Landmark },
  { title: "관련사이트", description: "유용한 관련 사이트를 모아 안내합니다.", icon: Link2 },
  { title: "공지사항", description: "최신 소식과 공지사항을 확인하세요.", icon: Megaphone },
]
