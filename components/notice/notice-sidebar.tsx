import { noticeMenuGroups } from "@/components/notice/notice-page-config"
import type { NoticeMenuKey } from "@/components/notice/notice-types"
import { AccountSidebar } from "@/components/shared/account-sidebar"

export function NoticeSidebar({ activeMenu }: { activeMenu: NoticeMenuKey }) {
  return (
    <AccountSidebar
      title="공지사항"
      ariaLabel="공지사항"
      idPrefix="notice"
      groups={noticeMenuGroups}
      accountType="notice"
      activeMenu={activeMenu}
      groupSelectorLabel="공지사항 메뉴"
    />
  )
}
