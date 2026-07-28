import { ChevronDown, ChevronUp, FileText } from "lucide-react"
import { useEffect, useState } from "react"
import {
  contractMenuGroups,
  type AccountType,
  type ContractMenuKey,
} from "@/components/contract/contract-page-config"

type ContractSidebarProps = {
  accountType: AccountType
  activeMenu: ContractMenuKey
}

export function ContractSidebar({ accountType, activeMenu }: ContractSidebarProps) {
  const isEvaluationPage = activeMenu === "negotiation-evaluation"
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    general: true,
    special: true,
  })
  const [mobileGroupId, setMobileGroupId] = useState<AccountType>(accountType)
  const mobileGroup =
    contractMenuGroups.find((group) => group.id === mobileGroupId) ?? contractMenuGroups[0]

  useEffect(() => {
    setMobileGroupId(accountType)
  }, [accountType])

  return (
    <aside className="contract-sidebar" aria-label="계약정보 메뉴">
      <h2>계약정보</h2>
      <nav className="contract-sidebar__desktop" aria-label="계약정보 데스크톱 메뉴">
        {contractMenuGroups.map((group) => {
          const isOpen = openGroups[group.id]
          return (
            <section key={group.id} className="contract-sidebar__group">
              <button
                type="button"
                className="contract-sidebar__toggle"
                aria-expanded={isOpen}
                aria-controls={`contract-menu-${group.id}`}
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
                <ul id={`contract-menu-${group.id}`}>
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
        <a
          href="/contract/negotiation-evaluation"
          className={`contract-sidebar__single ${isEvaluationPage ? "is-current" : ""}`}
          aria-current={isEvaluationPage ? "page" : undefined}
        >
          <FileText size={18} strokeWidth={1.8} aria-hidden="true" />
          <span>협상계약평가결과</span>
        </a>
      </nav>

      <nav className="contract-sidebar__mobile" aria-label="계약정보 모바일 메뉴">
        <div className="contract-sidebar__tabs" role="tablist" aria-label="회계구분">
          {contractMenuGroups.map((group) => {
            const isSelected = group.id === mobileGroup.id
            return (
              <button
                key={group.id}
                id={`contract-account-tab-${group.id}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={`contract-account-panel-${group.id}`}
                onClick={() => setMobileGroupId(group.id)}
              >
                {group.label}
              </button>
            )
          })}
        </div>

        <div
          key={mobileGroup.id}
          id={`contract-account-panel-${mobileGroup.id}`}
          className="contract-sidebar__mobile-panel"
          role="tabpanel"
          aria-labelledby={`contract-account-tab-${mobileGroup.id}`}
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

        <div className="contract-sidebar__mobile-single">
          <a
            href="/contract/negotiation-evaluation"
            className={isEvaluationPage ? "is-current" : undefined}
            aria-current={isEvaluationPage ? "page" : undefined}
          >
            <FileText size={18} strokeWidth={1.8} aria-hidden="true" />
            <span>협상계약평가결과</span>
          </a>
        </div>
      </nav>
    </aside>
  )
}
