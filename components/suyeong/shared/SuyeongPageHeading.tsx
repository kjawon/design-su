import { Printer } from "lucide-react"
import "./SuyeongPageHeading.css"

interface SuyeongPageHeadingProps {
  description: string
  title: string
}

export function SuyeongPageHeading({ description, title }: SuyeongPageHeadingProps) {
  return (
    <div className="sy-page-heading">
      <div>
        <p>{description}</p>
        <h1>{title}</h1>
      </div>
      <button className="sy-print-button" type="button" onClick={() => window.print()}>
        <Printer aria-hidden="true" />
        프린트
      </button>
    </div>
  )
}
