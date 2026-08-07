import { OWN_PROCUREMENT_PLAN_ENABLED } from "@/lib/feature-flags"

export const G2B_URL = "https://www.g2b.go.kr/"

export type G2BServiceId = "plan" | "bid" | "opening"

export type G2BServiceLink = {
  label: string
  url: string
}

export type G2BServiceGroup = {
  id: G2BServiceId
  title: string
  description: string
  links: readonly G2BServiceLink[]
}

export const procurementPageConfig = {
  showOwnProcurementPlan: OWN_PROCUREMENT_PLAN_ENABLED,
} as const

export const g2bServiceGroups = [
  {
    id: "plan",
    title: "발주계획",
    description: "기관별 발주 예정 사업과 주요 계획 정보를 확인할 수 있습니다.",
    links: [{ label: "조달청 발주계획", url: G2B_URL }],
  },
  {
    id: "bid",
    title: "입찰공고",
    description: "현재 진행 중인 공사·용역·물품 입찰공고를 확인할 수 있습니다.",
    links: [
      { label: "공사입찰", url: G2B_URL },
      { label: "용역입찰", url: G2B_URL },
      { label: "물품입찰", url: G2B_URL },
    ],
  },
  {
    id: "opening",
    title: "개찰결과",
    description: "공사·용역·물품 입찰의 개찰 현황과 낙찰 결과를 확인할 수 있습니다.",
    links: [
      { label: "공사개찰", url: G2B_URL },
      { label: "용역개찰", url: G2B_URL },
      { label: "물품개찰", url: G2B_URL },
    ],
  },
] as const satisfies readonly G2BServiceGroup[]
