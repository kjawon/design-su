import { ExternalLink } from "lucide-react"
import { RELATED_SITES } from "@/components/information/related-sites-data"

export function RelatedSitesGrid() {
  return (
    <section className="related-sites-grid" aria-label="관련사이트 목록">
      {RELATED_SITES.map((site) => {
        const Icon = site.icon

        return (
          <a
            key={site.name}
            href={site.url}
            className="related-site-card"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${site.name} ${site.description} (새 창)`}
          >
            <span className="related-site-card__external" aria-hidden="true">
              <ExternalLink size={16} strokeWidth={1.9} />
            </span>
            <span className="related-site-card__icon" aria-hidden="true">
              <Icon size={28} strokeWidth={1.7} />
            </span>
            <strong>{site.name}</strong>
            <span className="related-site-card__description">{site.description}</span>
          </a>
        )
      })}
    </section>
  )
}
