// Central route and navigation configuration for every contract page.
export type AccountType = "general" | "special"
export type ContractPageKind = "contract" | "completion" | "evaluation"
export type ContractDataKind = "contract" | "empty" | "completion" | "evaluation"

export type ContractMenuKey =
  | "general-status"
  | "general-private"
  | "general-subcontract"
  | "general-completion"
  | "special-status"
  | "special-private"
  | "special-subcontract"
  | "special-completion"
  | "negotiation-evaluation"

export type ContractPageConfig = {
  path: string
  title: string
  menuLabel: string
  accountType: AccountType
  accountLabel: "일반회계" | "특별회계"
  menuKey: ContractMenuKey
  pageKind: ContractPageKind
  dataKind: ContractDataKind
  totalCount: number
  downloadFileName: string
  standalone?: boolean
}

export const contractMenuGroups = [
  {
    id: "general" as const,
    label: "일반회계" as const,
    items: [
      { key: "general-status" as const, label: "계약현황", path: "/contract/status" },
      { key: "general-private" as const, label: "수의계약현황", path: "/contract/private" },
      { key: "general-subcontract" as const, label: "하도급계약현황", path: "/contract/subcontract" },
      { key: "general-completion" as const, label: "준공검사", path: "/contract/completion" },
    ],
  },
  {
    id: "special" as const,
    label: "특별회계" as const,
    items: [
      { key: "special-status" as const, label: "계약현황", path: "/contract/special/status" },
      { key: "special-private" as const, label: "수의계약현황", path: "/contract/special/private" },
      { key: "special-subcontract" as const, label: "하도급계약현황", path: "/contract/special/subcontract" },
      { key: "special-completion" as const, label: "준공검사", path: "/contract/special/completion" },
    ],
  },
]

export const contractPageConfigs: ContractPageConfig[] = [
  {
    path: "/contract/status",
    title: "계약현황",
    menuLabel: "계약현황",
    accountType: "general",
    accountLabel: "일반회계",
    menuKey: "general-status",
    pageKind: "contract",
    dataKind: "contract",
    totalCount: 4352,
    downloadFileName: "가평군_계약현황.xls",
  },
  {
    path: "/contract/private",
    title: "수의계약현황",
    menuLabel: "수의계약현황",
    accountType: "general",
    accountLabel: "일반회계",
    menuKey: "general-private",
    pageKind: "contract",
    dataKind: "contract",
    totalCount: 684,
    downloadFileName: "가평군_수의계약현황.xls",
  },
  {
    path: "/contract/subcontract",
    title: "하도급 계약현황",
    menuLabel: "하도급계약현황",
    accountType: "general",
    accountLabel: "일반회계",
    menuKey: "general-subcontract",
    pageKind: "contract",
    dataKind: "empty",
    totalCount: 0,
    downloadFileName: "가평군_하도급계약현황.xls",
  },
  {
    path: "/contract/completion",
    title: "준공검사",
    menuLabel: "준공검사",
    accountType: "general",
    accountLabel: "일반회계",
    menuKey: "general-completion",
    pageKind: "completion",
    dataKind: "completion",
    totalCount: 236,
    downloadFileName: "가평군_준공검사.xls",
  },
  {
    path: "/contract/special/status",
    title: "계약현황",
    menuLabel: "계약현황",
    accountType: "special",
    accountLabel: "특별회계",
    menuKey: "special-status",
    pageKind: "contract",
    dataKind: "contract",
    totalCount: 491,
    downloadFileName: "가평군_특별회계_계약현황.xls",
  },
  {
    path: "/contract/special/private",
    title: "수의계약현황",
    menuLabel: "수의계약현황",
    accountType: "special",
    accountLabel: "특별회계",
    menuKey: "special-private",
    pageKind: "contract",
    dataKind: "contract",
    totalCount: 112,
    downloadFileName: "가평군_특별회계_수의계약현황.xls",
  },
  {
    path: "/contract/special/subcontract",
    title: "하도급 계약현황",
    menuLabel: "하도급계약현황",
    accountType: "special",
    accountLabel: "특별회계",
    menuKey: "special-subcontract",
    pageKind: "contract",
    dataKind: "empty",
    totalCount: 0,
    downloadFileName: "가평군_특별회계_하도급계약현황.xls",
  },
  {
    path: "/contract/special/completion",
    title: "준공검사",
    menuLabel: "준공검사",
    accountType: "special",
    accountLabel: "특별회계",
    menuKey: "special-completion",
    pageKind: "completion",
    dataKind: "completion",
    totalCount: 58,
    downloadFileName: "가평군_특별회계_준공검사.xls",
  },
  {
    path: "/contract/negotiation-evaluation",
    title: "협상계약평가결과",
    menuLabel: "협상계약평가결과",
    accountType: "general",
    accountLabel: "일반회계",
    menuKey: "negotiation-evaluation",
    pageKind: "evaluation",
    dataKind: "evaluation",
    totalCount: 11,
    downloadFileName: "가평군_협상계약평가결과.xls",
    standalone: true,
  },
]

export function getContractPageConfig(path: string) {
  return contractPageConfigs.find((config) => config.path === path)
}
