import {
  BadgeCheck,
  ClipboardList,
  ExternalLink,
  Megaphone,
  type LucideIcon,
} from "lucide-react"
import {
  g2bServiceGroups,
  type G2BServiceGroup,
  type G2BServiceId,
} from "@/components/procurement/procurement-page-config"

const SERVICE_ICONS: Record<G2BServiceId, LucideIcon> = {
  plan: ClipboardList,
  bid: Megaphone,
  opening: BadgeCheck,
}

function G2BServiceCard({ service }: { service: G2BServiceGroup }) {
  const Icon = SERVICE_ICONS[service.id]

  return (
    <article className="g2b-service-card">
      <div className="g2b-service-card__heading">
        <span className="g2b-service-card__icon" aria-hidden="true">
          <Icon size={25} strokeWidth={1.8} />
        </span>
        <h3>{service.title}</h3>
      </div>
      <p>{service.description}</p>
      <ul className="g2b-service-card__links">
        {service.links.map((link) => (
          <li key={link.label}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label} (새 창)`}
            >
              <span>{link.label}</span>
              <ExternalLink size={16} strokeWidth={1.9} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </article>
  )
}

export function G2BLinkedServices() {
  return (
    <section className="procurement-linked-services" aria-labelledby="g2b-services-title">
      <header className="procurement-section-header">
        <h2 id="g2b-services-title">조달청 연계서비스</h2>
        <p>
          나라장터의 발주·입찰·개찰 정보를 빠르게 확인할 수 있습니다.
          <br />
          각 서비스를 선택하면 새 창으로 이동합니다.
        </p>
      </header>

      <div className="g2b-service-grid">
        {g2bServiceGroups.map((service) => (
          <G2BServiceCard key={service.id} service={service} />
        ))}
      </div>

      <p className="procurement-linked-services__notice">
        ※ 조달청 나라장터에서 제공되는 외부 연계 서비스입니다.
      </p>
    </section>
  )
}
