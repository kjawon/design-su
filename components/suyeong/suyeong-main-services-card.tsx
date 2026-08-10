import {
  ChartNoAxesColumnIncreasing,
  ChevronRight,
  CircleDollarSign,
  FileChartColumnIncreasing,
  LayoutGrid,
  ReceiptText,
  WalletCards,
} from "lucide-react"
import { suyeongLinks } from "@/components/suyeong/suyeong-links"

const mainServices = [
  { label: "자금운용현황", href: suyeongLinks.funds, icon: WalletCards },
  { label: "세입정보", href: suyeongLinks.income, icon: CircleDollarSign },
  {
    label: "예산집행현황",
    href: suyeongLinks.budgetExecution,
    icon: ChartNoAxesColumnIncreasing,
  },
  {
    label: "사업및예산정보",
    href: suyeongLinks.businessBudget,
    icon: FileChartColumnIncreasing,
  },
  { label: "지출현황", href: suyeongLinks.expenditure, icon: ReceiptText },
  { label: "사업별세부설명", href: suyeongLinks.businessDetails, icon: LayoutGrid },
] as const

export function SuyeongMainServicesCard() {
  return (
    <article className="sy-service-card sy-main-services-card">
      <div className="sy-main-services-card__heading">
        <span className="sy-main-services-card__icon" aria-hidden="true">
          <LayoutGrid />
        </span>
        <div>
          <span className="sy-card-eyebrow">빠른 서비스</span>
          <h3>자주 찾는 재정정보</h3>
        </div>
      </div>
      <nav aria-label="자주 찾는 재정정보">
        <ul className="sy-main-services-list">
          {mainServices.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a href={href}>
                <span className="sy-main-services-list__icon" aria-hidden="true">
                  <Icon />
                </span>
                <span>{label}</span>
                <ChevronRight aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  )
}
