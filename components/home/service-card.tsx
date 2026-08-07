import { ArrowRight, ExternalLink, type LucideIcon } from "lucide-react"

export type ServiceItem = {
  title: string
  description: string
  links: Array<
    | string
    | {
        label: string
        href: string
        external?: boolean
        showArrow?: boolean
        agencyIcon?: string
      }
  >
  href: string
  icon: LucideIcon
  tone: "coral" | "blue" | "purple" | "teal"
  linkLayout?: "inline" | "list"
  hideCta?: boolean
}

export function ServiceCard({ service }: { service: ServiceItem }) {
  const Icon = service.icon
  const isLinkList = service.linkLayout === "list"

  return (
    <article
      data-service-tone={service.tone}
      className={`service-card grid overflow-hidden rounded-[18px] border border-t-[3px] px-[27px] pt-[27px] text-left transition ${
        service.hideCta ? "h-[310px]" : "h-full min-h-[310px]"
      } ${
        service.hideCta
          ? "grid-rows-[auto_72px_minmax(0,1fr)]"
          : "grid-rows-[auto_72px_minmax(0,1fr)_64px]"
      }`}
    >
      <header className="service-card__header flex min-h-[54px] items-center justify-between gap-[14px]">
        <h3 className="service-card__title text-left text-[24px] font-bold tracking-[-0.02em] text-text-primary">
          <a href={service.href}>{service.title}</a>
        </h3>
        <span className="service-card__icon service-card-icon flex size-[54px] shrink-0 items-center justify-center rounded-[18px] bg-white">
          <Icon className="size-7" strokeWidth={1.9} aria-hidden="true" />
        </span>
      </header>
      <p className="service-card__description service-card-description min-h-0 pt-[16px] whitespace-pre-line text-[16px]">{service.description}</p>
      <div
        className={`service-card__menu min-h-0 bg-transparent pt-[23px] ${
          isLinkList ? "pb-0" : "pb-[10px]"
        }`}
      >
        <nav
          className={`service-card__menu-links text-left ${
            isLinkList
              ? "service-card__menu-links--list grid gap-y-1"
              : "flex flex-wrap gap-x-4 gap-y-[10px]"
          }`}
          aria-label={`${service.title} 주요 메뉴`}
        >
          {service.links.map((link) => {
            const item = typeof link === "string"
              ? { label: link, href: "#information", external: false }
              : link

            return (
              <a
                key={item.label}
                href={item.href}
                className={`service-sub-link inline-flex min-w-0 items-center whitespace-nowrap text-[16px] font-bold ${
                  isLinkList
                    ? "service-sub-link--list min-h-[25px] w-full justify-between"
                    : "min-h-[30px] w-auto"
                }`}
                aria-label={item.external ? `${item.label} (새 창)` : undefined}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
              >
                <span className="service-sub-link__label">{item.label}</span>
                {(item.agencyIcon || item.external || item.showArrow) && (
                  <span className="service-sub-link__icons" aria-hidden="true">
                    {item.agencyIcon && (
                      <img
                        className="service-sub-link__agency-icon"
                        src={item.agencyIcon}
                        alt=""
                      />
                    )}
                    {item.external ? (
                      <ExternalLink
                        className="service-sub-link__icon"
                        size={15}
                        strokeWidth={1.8}
                      />
                    ) : item.showArrow ? (
                      <ArrowRight
                        className="service-sub-link__icon"
                        size={17}
                        strokeWidth={2}
                      />
                    ) : null}
                  </span>
                )}
              </a>
            )
          })}
        </nav>
      </div>
      {!service.hideCta && (
        <a href={service.href} className="service-card__cta service-card-link -mx-[27px] flex h-11 items-center justify-end gap-2 bg-transparent px-[27px] text-right text-[17px] font-bold">
          전체보기
          <span className="service-card-link-icon inline-flex size-[30px] shrink-0 items-center justify-center rounded-full border" aria-hidden="true">
            <ArrowRight className="size-4" />
          </span>
        </a>
      )}
    </article>
  )
}
