import { ChevronDown, ChevronUp, FileText } from "lucide-react"
import { useEffect, useState } from "react"
import {
  paymentMenuGroups,
  type PaymentAccountType,
  type PaymentMenuKey,
} from "@/components/payment/payment-page-config"

type PaymentSidebarProps = {
  accountType: PaymentAccountType
  activeMenu: PaymentMenuKey
}

export function PaymentSidebar({ accountType, activeMenu }: PaymentSidebarProps) {
  const [openGroups, setOpenGroups] = useState<Record<PaymentAccountType, boolean>>({
    general: true,
    special: true,
  })
  const [mobileGroupId, setMobileGroupId] = useState<PaymentAccountType>(accountType)
  const mobileGroup =
    paymentMenuGroups.find((group) => group.id === mobileGroupId) ?? paymentMenuGroups[0]

  useEffect(() => {
    setMobileGroupId(accountType)
  }, [accountType])

  return (
    <aside className="contract-sidebar" aria-label="대금지급 메뉴">
      <h2>대금지급</h2>
      <nav className="contract-sidebar__desktop" aria-label="대금지급 데스크톱 메뉴">
        {paymentMenuGroups.map((group) => {
          const isOpen = openGroups[group.id]
          return (
            <section key={group.id} className="contract-sidebar__group">
              <button
                type="button"
                className="contract-sidebar__toggle"
                aria-expanded={isOpen}
                aria-controls={`payment-menu-${group.id}`}
                onClick={() =>
                  setOpenGroups((current) => ({
                    ...current,
                    [group.id]: !current[group.id],
                  }))
                }
              >
                <span>
                  <FileText size={18} strokeWidth={1.8} aria-hidden="true" />
                  {group.label}
                </span>
                {isOpen ? (
                  <ChevronUp size={17} aria-hidden="true" />
                ) : (
                  <ChevronDown size={17} aria-hidden="true" />
                )}
              </button>
              {isOpen && (
                <ul id={`payment-menu-${group.id}`}>
                  {group.items.map((item) => {
                    const selected = item.key === activeMenu
                    return (
                      <li key={item.key}>
                        <a
                          href={item.path}
                          className={selected ? "is-current" : undefined}
                          aria-current={selected ? "page" : undefined}
                        >
                          {item.label}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              )}
            </section>
          )
        })}
      </nav>

      <nav className="contract-sidebar__mobile" aria-label="대금지급 모바일 메뉴">
        <div className="contract-sidebar__tabs" role="tablist" aria-label="회계구분">
          {paymentMenuGroups.map((group) => {
            const isSelected = group.id === mobileGroup.id
            return (
              <button
                key={group.id}
                id={`payment-account-tab-${group.id}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={`payment-account-panel-${group.id}`}
                onClick={() => setMobileGroupId(group.id)}
              >
                {group.label}
              </button>
            )
          })}
        </div>

        <div
          key={mobileGroup.id}
          id={`payment-account-panel-${mobileGroup.id}`}
          className="contract-sidebar__mobile-panel"
          role="tabpanel"
          aria-labelledby={`payment-account-tab-${mobileGroup.id}`}
        >
          <ul>
            {mobileGroup.items.map((item) => {
              const selected = item.key === activeMenu
              return (
                <li key={item.key}>
                  <a
                    href={item.path}
                    className={selected ? "is-current" : undefined}
                    aria-current={selected ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </aside>
  )
}
