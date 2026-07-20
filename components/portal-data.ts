import {
  Banknote,
  Bot,
  Building2,
  FileCheck2,
  FileText,
  Gavel,
  Handshake,
  Landmark,
  Link2,
  Megaphone,
  ScrollText,
} from "lucide-react"

export const contracts = [
  { type: "물품", date: "2026.03.15", title: "2026년 상반기 사무용품 및 전산소모품 구매", partner: "(주)오피스네트웍스", amount: "45,200,000원" },
  { type: "용역", date: "2026.03.14", title: "성남시 디지털 트윈 기반 지능형 방범 시스템 운영 유지보수", partner: "네트웍솔루션", amount: "284,000,000원" },
  { type: "공사", date: "2026.03.14", title: "분당구 보건소 방역용 소독 장비 및 소모품 긴급 구매", partner: "메디크린코리아", amount: "15,600,000원" },
]

export const services = [
  { title: "계약현황", description: "성남시에서 진행 중인 모든 계약의 상세 내역을 실시간으로 확인할 수 있습니다.", icon: FileCheck2 },
  { title: "입찰공고", description: "현재 공고 중인 입찰 정보 및 낙찰 결과를 투명하게 공개합니다.", icon: Gavel },
  { title: "수의계약현황", description: "수의계약 체결 내역을 상세 공개하여 공정한 계약 문화를 조성합니다.", icon: Handshake },
  { title: "대금지급현황", description: "계약에 따른 대금 지급 여부를 일자별로 신속하게 조회할 수 있습니다.", icon: Banknote },
  { title: "계약업체현황", description: "성남시와 협력하고 있는 업체들의 기본 정보 및 계약 실적을 제공합니다.", icon: Building2 },
  { title: "AI 계약 도우미", description: "자연어로 원하는 계약정보를 빠르게 검색하세요.", icon: Bot },
]

export const quickLinks = [
  { label: "계약서식", icon: FileText },
  { label: "계약법규", icon: Landmark },
  { label: "관련사이트", icon: Link2 },
  { label: "공지사항", icon: Megaphone },
]

export const notices = [
  ["2026년 하반기 용역 입찰 예정 정보 사전 안내", "2026.03.10"],
  ["성남시 계약정보포털 시스템 고도화에 따른 일시 중단 안내", "2026.03.05"],
  ["청렴계약 이행 서약서 양식 변경 고시", "2026.02.28"],
  ["성남시 관내 업체 우선 계약 제도 운영 지침 안내", "2026.02.15"],
]

export const frequentlyUsed = [
  { title: "입찰 참여는 어떻게 하나요?", description: "신규 업체를 위한 입찰 가이드", icon: ScrollText },
  { title: "계약 실적 증명 발급", description: "온라인 증명서 발급 서비스", icon: FileCheck2 },
  { title: "대금 지급 시기 확인", description: "대금 지급 절차 및 소요 기간 안내", icon: Banknote },
  { title: "부조리 신고 센터", description: "익명 신고 및 청렴 행정 안내", icon: Megaphone },
]
