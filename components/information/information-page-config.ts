import type { InformationPageConfig } from "@/components/information/information-types"

export const informationMenuGroups = [
  {
    id: "documents" as const,
    label: "계약자료",
    items: [
      { key: "laws" as const, label: "계약법규", path: "/information/laws" },
      { key: "forms" as const, label: "계약서식", path: "/information/forms" },
    ],
  },
] as const

export const relatedSitesMenuItem = {
  key: "sites" as const,
  label: "관련사이트",
  path: "/information/sites",
}

export const informationPageConfigs: InformationPageConfig[] = [
  {
    path: "/information/laws",
    title: "계약법규",
    menuKey: "laws",
    pageKind: "documents",
    dataKind: "laws",
    totalCount: 3,
    downloadFileName: "가평군_계약법규.xls",
    showStatuteColumn: true,
  },
  {
    path: "/information/forms",
    title: "계약서식",
    menuKey: "forms",
    pageKind: "documents",
    dataKind: "forms",
    totalCount: 4,
    downloadFileName: "가평군_계약서식.xls",
  },
  {
    path: "/information/sites",
    title: "관련사이트",
    menuKey: "sites",
    pageKind: "sites",
    dataKind: "none",
    totalCount: 0,
    downloadFileName: "",
  },
]

export function getInformationPageConfig(path: string) {
  return informationPageConfigs.find((config) => config.path === path)
}
