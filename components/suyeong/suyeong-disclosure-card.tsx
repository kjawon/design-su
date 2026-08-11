import { ArrowRight, type LucideIcon } from "lucide-react"

interface SuyeongDisclosureCardProps {
  description: string
  href: string
  icon: LucideIcon
  title: string
  tone: "budget" | "settlement"
}

export function SuyeongDisclosureCard({
  description,
  href,
  icon: Icon,
  title,
  tone,
}: SuyeongDisclosureCardProps) {
  return (
    <article className="sy-service-card sy-disclosure-card" data-tone={tone}>
      <div className="sy-disclosure-card__content">
        <span className="sy-card-eyebrow">재정공시</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="sy-disclosure-card__aside">
        <div className="sy-disclosure-card__graphic" aria-hidden="true">
          <span className="sy-disclosure-card__icon">
            <Icon />
          </span>
        </div>
        <a className="sy-text-link" href={href}>
          상세보기 <ArrowRight aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}
