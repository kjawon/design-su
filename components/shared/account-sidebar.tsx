import { ChevronDown, ChevronUp, ExternalLink, FileText } from "lucide-react"
import { useEffect, useState } from "react"

type SidebarMenuItem<MenuKey extends string> = {
  key: MenuKey
  label: string
  path: string
  external?: boolean
}

type SidebarMenuGroup<AccountType extends string, MenuKey extends string> = {
  id: AccountType
  label: string
  items: readonly SidebarMenuItem<MenuKey>[]
}

type AccountSidebarProps<AccountType extends string, MenuKey extends string> = {
  title: string
  ariaLabel: string
  idPrefix: string
  groups: readonly SidebarMenuGroup<AccountType, MenuKey>[]
  accountType: AccountType
  activeMenu: MenuKey
  singleItem?: SidebarMenuItem<MenuKey>
  groupSelectorLabel?: string
}

export function AccountSidebar<AccountType extends string, MenuKey extends string>({
  title,
  ariaLabel,
  idPrefix,
  groups,
  accountType,
  activeMenu,
  singleItem,
  groupSelectorLabel = "회계구분",
}: AccountSidebarProps<AccountType, MenuKey>) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(groups.map((group) => [group.id, true])),
  )
  const [mobileGroupId, setMobileGroupId] = useState<AccountType>(accountType)
  const mobileGroup = groups.find((group) => group.id === mobileGroupId) ?? groups[0]
  const isSingleItemActive = singleItem?.key === activeMenu

  useEffect(() => {
    setMobileGroupId(accountType)
  }, [accountType])

  if (!mobileGroup) return null

  return (
    <aside className="contract-sidebar" aria-label={`${ariaLabel} 메뉴`}>
      <h2>{title}</h2>
      <nav className="contract-sidebar__desktop" aria-label={`${ariaLabel} 데스크톱 메뉴`}>
        {groups.map((group) => {
          const isOpen = openGroups[group.id]
          return (
            <section key={group.id} className="contract-sidebar__group">
              <button
                type="button"
                className="contract-sidebar__toggle"
                aria-expanded={isOpen}
                aria-controls={`${idPrefix}-menu-${group.id}`}
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
                <ul id={`${idPrefix}-menu-${group.id}`}>
                  {group.items.map((item) => {
                    const selected = item.key === activeMenu
                    return (
                      <li key={item.key}>
                        <a
                          href={item.path}
                          className={selected ? "is-current" : undefined}
                          aria-current={selected ? "page" : undefined}
                          aria-label={item.external ? `${item.label} (새 창)` : undefined}
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noopener noreferrer" : undefined}
                        >
                          <span className="contract-sidebar__item-label">
                            <span>{item.label}</span>
                          </span>
                          {item.external && (
                            <span className="contract-sidebar__external-icons" aria-hidden="true">
                              <ExternalLink
                                className="contract-sidebar__external-icon"
                                size={15}
                                strokeWidth={1.9}
                              />
                            </span>
                          )}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              )}
            </section>
          )
        })}
        {singleItem && (
          <a
            href={singleItem.path}
            className={`contract-sidebar__single ${isSingleItemActive ? "is-current" : ""}`}
            aria-current={isSingleItemActive ? "page" : undefined}
          >
            <FileText size={18} strokeWidth={1.8} aria-hidden="true" />
            <span>{singleItem.label}</span>
          </a>
        )}
      </nav>

      <nav className="contract-sidebar__mobile" aria-label={`${ariaLabel} 모바일 메뉴`}>
        <div className="contract-sidebar__tabs" role="tablist" aria-label={groupSelectorLabel}>
          {groups.map((group) => {
            const isSelected = group.id === mobileGroup.id
            return (
              <button
                key={group.id}
                id={`${idPrefix}-account-tab-${group.id}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={`${idPrefix}-account-panel-${group.id}`}
                onClick={() => setMobileGroupId(group.id)}
              >
                {group.label}
              </button>
            )
          })}
        </div>

        <div
          key={mobileGroup.id}
          id={`${idPrefix}-account-panel-${mobileGroup.id}`}
          className="contract-sidebar__mobile-panel"
          role="tabpanel"
          aria-labelledby={`${idPrefix}-account-tab-${mobileGroup.id}`}
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
                    aria-label={item.external ? `${item.label} (새 창)` : undefined}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                  >
                    <span className="contract-sidebar__item-label">
                      <span>{item.label}</span>
                    </span>
                    {item.external && (
                      <span className="contract-sidebar__external-icons" aria-hidden="true">
                        <ExternalLink
                          className="contract-sidebar__external-icon"
                          size={15}
                          strokeWidth={1.9}
                        />
                      </span>
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        {singleItem && (
          <div className="contract-sidebar__mobile-single">
            <a
              href={singleItem.path}
              className={isSingleItemActive ? "is-current" : undefined}
              aria-current={isSingleItemActive ? "page" : undefined}
            >
              <FileText size={18} strokeWidth={1.8} aria-hidden="true" />
              <span>{singleItem.label}</span>
            </a>
          </div>
        )}
      </nav>
    </aside>
  )
}
