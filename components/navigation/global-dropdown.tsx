import type { GlobalMenu } from "@/components/navigation/global-menu-data"

const dropdownClasses: Record<string, string> = {
  발주계획: "left-1/2 w-[210px] -translate-x-1/2 p-2",
  입찰정보: "left-1/2 w-[440px] -translate-x-1/2 p-5",
  계약현황: "right-[-16rem] w-[min(800px,calc(100vw-64px))] p-6",
  대금지급: "right-0 w-[480px] p-5",
  관련정보: "left-1/2 w-[210px] -translate-x-1/2 p-2",
  공지사항: "right-0 w-[210px] p-2",
}

const gridClasses: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2 gap-x-8",
  3: "grid-cols-[220px_220px_240px] gap-x-6",
}

type GlobalDropdownProps = {
  id: string
  menu: GlobalMenu
  onNavigate: () => void
}

export function GlobalDropdown({ id, menu, onNavigate }: GlobalDropdownProps) {
  return (
    <div
      id={id}
      role="region"
      aria-label={`${menu.label} 하위 메뉴`}
      className={`absolute top-full z-30 rounded-lg border border-primary-100 bg-white shadow-[0_8px_20px_rgba(15,45,75,0.08)] ${dropdownClasses[menu.label]}`}
    >
      <nav aria-label={`${menu.label} 상세 메뉴`}>
        <div className={`grid items-start justify-start gap-y-4 ${gridClasses[menu.columns] ?? gridClasses[1]}`}>
          {menu.groups.map((group, groupIndex) => (
            <div key={`${menu.label}-${group.title ?? groupIndex}`} className="min-w-0">
              {group.title && (
                <h2 className="mb-3 px-2.5 text-[17px] font-bold leading-5 text-brand-navy-900">
                  {group.title}
                </h2>
              )}
              <ul className="space-y-1">
                {group.items.map((item, itemIndex) => (
                  <li key={`${item.label}-${itemIndex}`}>
                    <a
                      href={item.path}
                      onClick={onNavigate}
                      className="flex min-h-[38px] items-center rounded-md px-2.5 text-[15px] font-medium text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-700 focus-visible:bg-primary-50 focus-visible:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-1"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    </div>
  )
}
