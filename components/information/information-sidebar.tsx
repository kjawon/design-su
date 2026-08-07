import {
  informationMenuGroups,
  relatedSitesMenuItem,
} from "@/components/information/information-page-config"
import type { InformationMenuKey } from "@/components/information/information-types"
import { AccountSidebar } from "@/components/shared/account-sidebar"

export function InformationSidebar({ activeMenu }: { activeMenu: InformationMenuKey }) {
  return (
    <AccountSidebar
      title="관련정보"
      ariaLabel="관련정보"
      idPrefix="information"
      groups={informationMenuGroups}
      accountType="documents"
      activeMenu={activeMenu}
      singleItem={relatedSitesMenuItem}
      groupSelectorLabel="관련정보 구분"
    />
  )
}
