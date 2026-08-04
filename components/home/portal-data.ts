import { FileText, Landmark, Link2 } from "lucide-react"

export type RecentContentType = "contract" | "payment" | "notice"

export interface RecentListItemData {
  badge: string
  title: string
  value: string
  date: string
}

export const recentInformation: Record<RecentContentType, RecentListItemData[]> = {
  contract: [
    { badge: "물품", date: "2026.03.15", title: "2026년 상반기 사무용품 및 전산소모품 구매", value: "45,200,000원" },
    { badge: "용역", date: "2026.03.14", title: "가평군 디지털 트윈 기반 지능형 방범 시스템 운영 유지보수", value: "284,000,000원" },
    { badge: "공사", date: "2026.03.14", title: "분당구 보건소 방역용 소독 장비 및 소모품 긴급 구매", value: "15,600,000원" },
    { badge: "공사", date: "2026.03.13", title: "가평중앙공원 산책로 및 편의시설 정비공사", value: "128,400,000원" },
    { badge: "용역", date: "2026.03.12", title: "2026년 가평군 공공데이터 품질관리 및 개방 지원 용역", value: "96,800,000원" },
  ],
  payment: [
    { badge: "준공", date: "2026.03.15", title: "가평중앙공원 산책로 및 편의시설 정비공사", value: "64,200,000원" },
    { badge: "기성", date: "2026.03.14", title: "가평군 디지털 트윈 기반 지능형 방범 시스템 운영 유지보수", value: "71,000,000원" },
    { badge: "선금", date: "2026.03.13", title: "2026년 가평군 공공데이터 품질관리 및 개방 지원 용역", value: "38,720,000원" },
    { badge: "준공", date: "2026.03.12", title: "분당구 보건소 방역용 소독 장비 및 소모품 긴급 구매", value: "15,600,000원" },
    { badge: "기성", date: "2026.03.11", title: "2026년 상반기 사무용품 및 전산소모품 구매", value: "22,600,000원" },
  ],
  notice: [
    { badge: "안내", date: "2026.03.15", title: "2026년 계약업무 처리 기준 및 유의사항 안내", value: "계약안내" },
    { badge: "공고", date: "2026.03.14", title: "가평군 지역업체 우선계약 참여 안내", value: "계약공고" },
    { badge: "자료", date: "2026.03.13", title: "전자계약 시스템 사용자 매뉴얼 개정 안내", value: "업무자료" },
    { badge: "안내", date: "2026.03.12", title: "계약서류 온라인 제출 절차 변경 안내", value: "시스템" },
    { badge: "공고", date: "2026.03.11", title: "2026년 상반기 계약 관련 교육 일정 공지", value: "교육안내" },
  ],
}

export const frequentlyUsed = [
  { title: "계약서식", description: "필요한 계약서식을 간편하게 확인하세요.", icon: FileText },
  { title: "계약법규", description: "계약 관련 법규를 한눈에 살펴보세요.", icon: Landmark },
  { title: "관련사이트", description: "유용한 관련 사이트를 모아 안내합니다.", icon: Link2 },
]
