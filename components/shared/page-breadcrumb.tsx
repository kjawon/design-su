import { ChevronRight, House } from "lucide-react"

export type BreadcrumbItem = {
  label: string
  href?: string
}

export function PageBreadcrumb({ items }: { items: readonly BreadcrumbItem[] }) {
  return (
    <nav className="contract-breadcrumb" aria-label="현재 위치">
      <div>
        <a href="/" aria-label="홈">
          <House size={20} aria-hidden="true" />
          <span>홈</span>
        </a>
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1
          return (
            <span className="contract-breadcrumb__item" key={`${item.label}-${index}`}>
              <ChevronRight size={18} aria-hidden="true" />
              {isCurrent ? (
                <strong aria-current="page">{item.label}</strong>
              ) : item.href ? (
                <a href={item.href}>{item.label}</a>
              ) : (
                <span>{item.label}</span>
              )}
            </span>
          )
        })}
      </div>
    </nav>
  )
}
