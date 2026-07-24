import type { GlobalMenu } from "@/components/navigation/global-menu-data"

const dropdownClasses: Record<string, string> = {
  발주계획: "left-1/2 w-[210px] -translate-x-1/2 p-2",
  입찰정보: "left-1/2 w-[440px] -translate-x-1/2 p-5",
  계약정보: "right-[clamp(-16rem,calc(50vw_-_764px),-4rem)] w-[min(960px,calc(100vw_-_48px))] rounded-t-none px-8 py-7",
  대금지급: "right-0 w-[480px] p-5",
  관련정보: "left-1/2 w-[210px] -translate-x-1/2 p-2",
  공지사항: "right-0 w-[210px] p-2",
}

const gridClasses: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2 gap-x-8",
  3: "grid-cols-3 gap-x-12",
}

type GlobalDropdownProps = {
  id: string
  menu: GlobalMenu
  onNavigate: () => void
}

export function GlobalDropdown({ id, menu, onNavigate }: GlobalDropdownProps) {
  const currentPath = window.location.pathname.replace(/\/+$/, "") || "/"
  const activeItem = menu.groups
    .flatMap((group) => group.items)
    .find((item) => {
      const itemPath = item.path.split("#")[0].replace(/\/+$/, "") || "/"
      return itemPath !== "/" && itemPath === currentPath
    })

  return (
    <div
      id={id}
      role="region"
      aria-label={`${menu.label} 하위 메뉴`}
      className={`absolute top-full z-30 rounded-lg border border-gray-200 bg-white shadow-[0_8px_20px_rgba(15,45,75,0.06)] ${dropdownClasses[menu.label]}`}
    >
      <nav aria-label={`${menu.label} 상세 메뉴`}>
        <div className={`grid items-start justify-start gap-y-4 ${gridClasses[menu.columns] ?? gridClasses[1]}`}>
          {menu.groups.map((group, groupIndex) => {
            const groupTitle =
              group.title ?? (menu.label === "계약정보" && groupIndex === 2 ? "기타" : undefined)

            return (
              <div key={`${menu.label}-${groupTitle ?? groupIndex}`} className="min-w-0">
                {groupTitle && (
                  <h2 className="mb-3 border-b border-primary-100 px-3 pb-2.5 text-[17px] font-bold leading-5 text-primary-700">
                    {groupTitle}
                  </h2>
                )}
                <ul className="space-y-1">
                  {group.items.map((item, itemIndex) => {
                    const isCurrent = item === activeItem
                    return (
                      <li key={`${item.label}-${itemIndex}`}>
                        <a
                          href={item.path}
                          aria-current={isCurrent ? "page" : undefined}
                          onClick={onNavigate}
                          className={`flex min-h-10 items-center rounded-lg px-3 text-[15px] text-gray-700 transition-[color,background-color,transform] duration-150 hover:translate-x-0.5 hover:bg-primary-50 hover:text-primary-700 focus-visible:translate-x-0.5 focus-visible:bg-primary-50 focus-visible:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-1 ${
                            isCurrent ? "bg-primary-50 font-bold text-primary-700" : "font-medium"
                          }`}
                        >
                          {item.label}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
