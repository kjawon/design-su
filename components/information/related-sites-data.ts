import {
  BadgeDollarSign,
  Building2,
  Database,
  Factory,
  Gavel,
  HardHat,
  Landmark,
  RadioTower,
  Recycle,
  Scale,
  ShieldCheck,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react"

export type RelatedSite = {
  name: string
  description: string
  url: string
  icon: LucideIcon
}

export const RELATED_SITES: RelatedSite[] = [
  {
    name: "법제처",
    description: "국가법령정보센터",
    url: "https://www.law.go.kr/",
    icon: Scale,
  },
  {
    name: "행정안전부",
    description: "행정 및 지방자치 정책정보",
    url: "https://www.mois.go.kr/",
    icon: Landmark,
  },
  {
    name: "나라장터",
    description: "국가종합전자조달",
    url: "https://www.g2b.go.kr/",
    icon: ShoppingCart,
  },
  {
    name: "기획재정부",
    description: "경제·재정 정책정보",
    url: "https://www.moef.go.kr/",
    icon: BadgeDollarSign,
  },
  {
    name: "공공구매종합정보",
    description: "중소기업제품 공공구매 정보",
    url: "https://www.smpp.go.kr/",
    icon: Building2,
  },
  {
    name: "대한건설협회",
    description: "건설업 관련 정보",
    url: "https://www.cak.or.kr/",
    icon: HardHat,
  },
  {
    name: "대한전문건설협회",
    description: "전문건설업 관련 정보",
    url: "https://www.kosca.or.kr/",
    icon: Gavel,
  },
  {
    name: "엔지니어링공제조합",
    description: "엔지니어링 보증·공제 정보",
    url: "https://www.egic.co.kr/",
    icon: ShieldCheck,
  },
  {
    name: "정보통신산업진흥원",
    description: "정보통신산업 지원정보",
    url: "https://www.nipa.kr/",
    icon: RadioTower,
  },
  {
    name: "한국폐기물협회",
    description: "폐기물·자원순환 정보",
    url: "https://www.kwaste.or.kr/",
    icon: Recycle,
  },
  {
    name: "서울보증보험",
    description: "보증보험 관련 정보",
    url: "https://www.sgic.co.kr/",
    icon: Factory,
  },
  {
    name: "건설산업지식정보시스템",
    description: "건설산업 행정정보",
    url: "https://www.kiscon.net/",
    icon: Database,
  },
]
