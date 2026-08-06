export const G2B_URL = "https://www.g2b.go.kr/"

export type ProcurementGroupKey = "plan" | "bid" | "opening"
export type ProcurementMenuKey =
  | "g2b-plan"
  | "plan"
  | "construction-bid"
  | "service-bid"
  | "goods-bid"
  | "construction-opening"
  | "service-opening"
  | "goods-opening"

const externalMenuItem = (key: ProcurementMenuKey, label: string) => ({
  key,
  label,
  path: G2B_URL,
  external: true as const,
})

export const procurementMenuGroups = [
  {
    id: "plan" as const,
    label: "발주계획",
    items: [
      externalMenuItem("g2b-plan", "조달청 발주계획"),
      { key: "plan" as const, label: "자체 발주계획", path: "/procurement/plan" },
    ],
  },
  {
    id: "bid" as const,
    label: "조달청 입찰공고",
    items: [
      externalMenuItem("construction-bid", "공사입찰"),
      externalMenuItem("service-bid", "용역입찰"),
      externalMenuItem("goods-bid", "물품입찰"),
    ],
  },
  {
    id: "opening" as const,
    label: "조달청 개찰결과",
    items: [
      externalMenuItem("construction-opening", "공사개찰"),
      externalMenuItem("service-opening", "용역개찰"),
      externalMenuItem("goods-opening", "물품개찰"),
    ],
  },
] as const
