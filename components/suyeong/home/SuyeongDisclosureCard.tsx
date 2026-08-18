import { ExternalLink, type LucideIcon } from "lucide-react"
import "./SuyeongDisclosureCard.css"

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
        <a
          className="sy-text-link"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} 상세보기 (새 탭에서 열림)`}
        >
          상세보기 <ExternalLink aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}
