import {
  FileText,
  Landmark,
  Link2,
} from "lucide-react"

export const contracts = [
  { type: "물품", date: "2026.03.15", title: "2026년 상반기 사무용품 및 전산소모품 구매", amount: "45,200,000원" },
  { type: "용역", date: "2026.03.14", title: "성남시 디지털 트윈 기반 지능형 방범 시스템 운영 유지보수", amount: "284,000,000원" },
  { type: "공사", date: "2026.03.14", title: "분당구 보건소 방역용 소독 장비 및 소모품 긴급 구매", amount: "15,600,000원" },
  { type: "공사", date: "2026.03.13", title: "성남중앙공원 산책로 및 편의시설 정비공사", amount: "128,400,000원" },
  { type: "용역", date: "2026.03.12", title: "2026년 성남시 공공데이터 품질관리 및 개방 지원 용역", amount: "96,800,000원" },
]

export const frequentlyUsed = [
  { title: "계약서식", description: "필요한 계약서식을 간편하게 확인하세요.", icon: FileText },
  { title: "계약법규", description: "계약 관련 법규를 한눈에 살펴보세요.", icon: Landmark },
  { title: "관련사이트", description: "유용한 관련 사이트를 모아 안내합니다.", icon: Link2 },
]
