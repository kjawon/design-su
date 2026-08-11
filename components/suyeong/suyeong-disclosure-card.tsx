import { ArrowRight } from "lucide-react"

interface SuyeongDisclosureCardProps {
  description: string
  href: string
  title: string
  tone: "budget" | "settlement"
}

export function SuyeongDisclosureCard({
  description,
  href,
  title,
  tone,
}: SuyeongDisclosureCardProps) {
  return (
    <a className="sy-disclosure-card" data-tone={tone} href={href}>
      <div className="sy-disclosure-card__content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <ArrowRight aria-hidden="true" />
    </a>
  )
}
