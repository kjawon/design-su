import { procurementMenuGroups } from "@/components/procurement/procurement-page-config"
import { AccountSidebar } from "@/components/shared/account-sidebar"

export function ProcurementSidebar() {
  return (
    <AccountSidebar
      title="발주·입찰정보"
      ariaLabel="발주·입찰정보"
      idPrefix="procurement"
      groups={procurementMenuGroups}
      accountType="plan"
      activeMenu="plan"
      groupSelectorLabel="발주·입찰정보 구분"
    />
  )
}
