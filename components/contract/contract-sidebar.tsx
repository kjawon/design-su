import {
  contractMenuGroups,
  type AccountType,
  type ContractMenuKey,
} from "@/components/contract/contract-page-config"
import { AccountSidebar } from "@/components/shared/account-sidebar"

type ContractSidebarProps = {
  accountType: AccountType
  activeMenu: ContractMenuKey
}

const evaluationMenu = {
  key: "negotiation-evaluation" as const,
  label: "협상계약평가결과",
  path: "/contract/negotiation-evaluation",
}

export function ContractSidebar({ accountType, activeMenu }: ContractSidebarProps) {
  return (
    <AccountSidebar
      title="계약정보"
      ariaLabel="계약정보"
      idPrefix="contract"
      groups={contractMenuGroups}
      accountType={accountType}
      activeMenu={activeMenu}
      singleItem={evaluationMenu}
    />
  )
}
