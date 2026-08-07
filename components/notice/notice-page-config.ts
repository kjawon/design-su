import type { NoticePageConfig } from "@/components/notice/notice-types"

export const noticeMenuGroups = [
  {
    id: "notice" as const,
    label: "공지안내",
    items: [
      { key: "list" as const, label: "알림글", path: "/notice/list" },
      { key: "guide" as const, label: "업무안내", path: "/notice/guide" },
      { key: "directions" as const, label: "오시는길", path: "/notice/directions" },
    ],
  },
] as const

export const noticePageConfigs: NoticePageConfig[] = [
  {
    path: "/notice/list",
    title: "알림글",
    menuKey: "list",
    pageKind: "list",
    totalCount: 9,
    downloadFileName: "가평군_알림글.xls",
  },
  {
    path: "/notice/guide",
    title: "업무안내",
    menuKey: "guide",
    pageKind: "guide",
    totalCount: 0,
    downloadFileName: "",
  },
  {
    path: "/notice/directions",
    title: "오시는길",
    menuKey: "directions",
    pageKind: "directions",
    totalCount: 0,
    downloadFileName: "",
  },
]

export function getNoticePageConfig(path: string) {
  return noticePageConfigs.find((config) => config.path === path)
}
