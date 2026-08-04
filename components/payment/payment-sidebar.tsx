import {
  paymentMenuGroups,
  type PaymentAccountType,
  type PaymentMenuKey,
} from "@/components/payment/payment-page-config"
import { AccountSidebar } from "@/components/shared/account-sidebar"

type PaymentSidebarProps = {
  accountType: PaymentAccountType
  activeMenu: PaymentMenuKey
}

export function PaymentSidebar({ accountType, activeMenu }: PaymentSidebarProps) {
  return (
    <AccountSidebar
      title="대금지급"
      ariaLabel="대금지급"
      idPrefix="payment"
      groups={paymentMenuGroups}
      accountType={accountType}
      activeMenu={activeMenu}
    />
  )
}
