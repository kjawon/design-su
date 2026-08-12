import { ChevronRight, Home } from "lucide-react"
import "@/components/suyeong/shared/SuyeongBreadcrumb.css"

interface SuyeongBreadcrumbProps {
  current: string
  parent?: {
    href: string
    label: string
  }
}

export function SuyeongBreadcrumb({ current, parent }: SuyeongBreadcrumbProps) {
  return (
    <nav className="sy-breadcrumb" aria-label="현재 위치">
      <div className="sy-container sy-breadcrumb__inner">
        <a href="/" aria-label="홈">
          <Home aria-hidden="true" />
          <span>홈</span>
        </a>
        <ChevronRight aria-hidden="true" />
        {parent && (
          <>
            <a href={parent.href}>{parent.label}</a>
            <ChevronRight aria-hidden="true" />
          </>
        )}
        <span aria-current="page">{current}</span>
      </div>
    </nav>
  )
}
