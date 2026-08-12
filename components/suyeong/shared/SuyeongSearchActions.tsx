import type { ReactNode } from "react"
import { RotateCcw, Search } from "lucide-react"
import "./SuyeongSearch.css"

interface SuyeongSearchActionsProps {
  children?: ReactNode
  onReset: () => void
}

export function SuyeongSearchActions({ children, onReset }: SuyeongSearchActionsProps) {
  return (
    <div className={`sy-search-actions${children ? " sy-search-actions--with-leading" : ""}`}>
      {children}
      <button className="sy-button sy-button--secondary" type="button" onClick={onReset}>
        <RotateCcw aria-hidden="true" />
        초기화
      </button>
      <button className="sy-button sy-button--primary" type="submit">
        <Search aria-hidden="true" />
        조회
      </button>
    </div>
  )
}
