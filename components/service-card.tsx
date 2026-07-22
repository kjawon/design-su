import { ArrowRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type ServiceItem = {
  title: string
  description: string
  links: string[]
  icon: LucideIcon
  tone: "coral" | "blue" | "purple" | "teal"
}

export function ServiceCard({ service }: { service: ServiceItem }) {
  const Icon = service.icon

  return (
    <article data-service-tone={service.tone} className="service-card flex min-h-[310px] flex-col rounded-[18px] border border-t-[3px] px-[27px] pb-[10px] pt-[27px] text-left transition">
      <header className="service-card__header flex min-h-[54px] items-center justify-between gap-[14px]">
        <h3 className="service-card__title text-left text-[24px] font-bold tracking-[-0.02em] text-text-primary">{service.title}</h3>
        <span className="service-card__icon service-card-icon flex size-[54px] shrink-0 items-center justify-center rounded-xl bg-white">
          <Icon className="size-[29px]" strokeWidth={1.9} aria-hidden="true" />
        </span>
      </header>
      <p className="service-card__description service-card-description mt-[16px] min-h-[72px] whitespace-pre-line text-[16px]">{service.description}</p>
      <div className="service-card__menu mt-[16px] min-h-[64px]">
        <span className="service-card__menu-label block text-[18px] font-bold text-gray-500">주요 메뉴</span>
        <nav className="service-card__menu-links mt-1 flex min-h-[44px] flex-wrap items-center gap-x-4 gap-y-1 text-left" aria-label={`${service.title} 주요 메뉴`}>
          {service.links.map((link) => (
            <a key={link} href="#information" className="service-sub-link inline-flex min-h-[44px] items-center whitespace-nowrap text-[18px] font-semibold">
              {link}
            </a>
          ))}
        </nav>
      </div>
      <a href="#information" className="service-card__cta service-card-link mt-auto inline-flex min-h-[44px] items-center gap-1 self-end text-right text-[17px] font-bold">
        바로가기
        <ArrowRight className="size-4" aria-hidden="true" />
      </a>
    </article>
  )
}
