import { ChevronDown, ChevronUp, FileText } from "lucide-react"
import { useState } from "react"

const menuGroups = [
  {
    id: "general",
    label: "일반회계",
    items: ["계약현황", "수의계약현황", "하도급계약현황", "준공검사"],
  },
  {
    id: "special",
    label: "특별회계",
    items: ["계약현황", "수의계약현황", "하도급계약현황", "준공검사"],
  },
]

export function ContractSidebar() {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    general: true,
    special: true,
  })

  return (
    <aside className="contract-sidebar" aria-label="계약정보 메뉴">
      <h2>계약정보</h2>
      <nav>
        {menuGroups.map((group) => {
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
                    const selected = group.id === "general" && item === "계약현황"
                    return (
                      <li key={item}>
                        <a
                          href={selected ? "/contract/status" : "#"}
                          className={selected ? "is-current" : undefined}
                          aria-current={selected ? "page" : undefined}
                        >
                          {item}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              )}
            </section>
          )
        })}
        <a href="#" className="contract-sidebar__single">
          협상계약평가결과
        </a>
      </nav>
    </aside>
  )
}
