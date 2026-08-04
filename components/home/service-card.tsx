import { ArrowRight, type LucideIcon } from "lucide-react"

export type ServiceItem = {
  title: string
  description: string
  links: string[]
  href: string
  icon: LucideIcon
  tone: "coral" | "blue" | "purple" | "teal"
}

export function ServiceCard({ service }: { service: ServiceItem }) {
  const Icon = service.icon

  return (
    <article data-service-tone={service.tone} className="service-card grid h-full min-h-[310px] grid-rows-[auto_72px_minmax(0,1fr)_64px] overflow-hidden rounded-[18px] border border-t-[3px] px-[27px] pt-[27px] text-left transition">
      <header className="service-card__header flex min-h-[54px] items-center justify-between gap-[14px]">
        <h3 className="service-card__title text-left text-[24px] font-bold tracking-[-0.02em] text-text-primary">
          <a href={service.href}>{service.title}</a>
        </h3>
        <span className="service-card__icon service-card-icon flex size-[54px] shrink-0 items-center justify-center rounded-[18px] bg-white">
          <Icon className="size-7" strokeWidth={1.9} aria-hidden="true" />
        </span>
      </header>
      <p className="service-card__description service-card-description min-h-0 pt-[16px] whitespace-pre-line text-[16px]">{service.description}</p>
      <div className="service-card__menu min-h-0 bg-transparent pb-[10px] pt-[23px]">
        <nav className="service-card__menu-links flex flex-wrap gap-x-4 gap-y-[10px] text-left" aria-label={`${service.title} 주요 메뉴`}>
          {service.links.map((link) => (
            <a key={link} href="#information" className="service-sub-link inline-flex min-h-[30px] w-auto min-w-0 items-center whitespace-nowrap text-[16px] font-bold">
              {link}
            </a>
          ))}
        </nav>
      </div>
      <a href={service.href} className="service-card__cta service-card-link -mx-[27px] flex h-11 items-center justify-end gap-2 bg-transparent px-[27px] text-right text-[17px] font-bold">
        전체보기
        <span className="service-card-link-icon inline-flex size-[30px] shrink-0 items-center justify-center rounded-full border" aria-hidden="true">
          <ArrowRight className="size-4" />
        </span>
      </a>
    </article>
  )
}
