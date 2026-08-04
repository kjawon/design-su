export type PaymentAccountType = "general" | "special"
export type PaymentPageKind = "status" | "notice"
export type PaymentMenuKey =
  | "general-status"
  | "general-notice"
  | "special-status"
  | "special-notice"

export type PaymentPageConfig = {
  path: string
  title: string
  menuLabel: string
  accountType: PaymentAccountType
  accountLabel: "일반회계" | "특별회계"
  menuKey: PaymentMenuKey
  pageKind: PaymentPageKind
  totalCount: number
  downloadFileName: string
}

export const paymentMenuGroups = [
  {
    id: "general" as const,
    label: "일반회계" as const,
    items: [
      { key: "general-status" as const, label: "대금지급현황", path: "/payment/status" },
      { key: "general-notice" as const, label: "대금지급예고", path: "/payment/notice" },
    ],
  },
  {
    id: "special" as const,
    label: "특별회계" as const,
    items: [
      { key: "special-status" as const, label: "대금지급현황", path: "/payment/special/status" },
      { key: "special-notice" as const, label: "대금지급예고", path: "/payment/special/notice" },
    ],
  },
]

export const paymentPageConfigs: PaymentPageConfig[] = [
  {
    path: "/payment/status",
    title: "대금지급현황",
    menuLabel: "대금지급현황",
    accountType: "general",
    accountLabel: "일반회계",
    menuKey: "general-status",
    pageKind: "status",
    totalCount: 32897,
    downloadFileName: "가평군_대금지급현황.xls",
  },
  {
    path: "/payment/notice",
    title: "대금지급예고",
    menuLabel: "대금지급예고",
    accountType: "general",
    accountLabel: "일반회계",
    menuKey: "general-notice",
    pageKind: "notice",
    totalCount: 0,
    downloadFileName: "가평군_대금지급예고.xls",
  },
  {
    path: "/payment/special/status",
    title: "대금지급현황",
    menuLabel: "대금지급현황",
    accountType: "special",
    accountLabel: "특별회계",
    menuKey: "special-status",
    pageKind: "status",
    totalCount: 326,
    downloadFileName: "가평군_특별회계_대금지급현황.xls",
  },
  {
    path: "/payment/special/notice",
    title: "대금지급예고",
    menuLabel: "대금지급예고",
    accountType: "special",
    accountLabel: "특별회계",
    menuKey: "special-notice",
    pageKind: "notice",
    totalCount: 0,
    downloadFileName: "가평군_특별회계_대금지급예고.xls",
  },
]

export function getPaymentPageConfig(path: string) {
  return paymentPageConfigs.find((config) => config.path === path)
}
