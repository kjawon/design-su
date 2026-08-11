import {
  ChartNoAxesColumnIncreasing,
  CircleDollarSign,
  FileChartColumnIncreasing,
  ListTree,
  ReceiptText,
  WalletCards,
} from "lucide-react"
import { suyeongLinks } from "@/components/suyeong/suyeong-links"

const mainServices = [
  {
    label: "자금운용현황",
    href: suyeongLinks.funds,
    icon: WalletCards,
  },
  {
    label: "세입정보",
    href: suyeongLinks.income,
    icon: CircleDollarSign,
  },
  {
    label: "예산집행현황",
    href: suyeongLinks.budgetExecution,
    icon: ChartNoAxesColumnIncreasing,
  },
  {
    label: "사업 및 예산정보",
    href: suyeongLinks.businessBudget,
    icon: FileChartColumnIncreasing,
  },
  {
    label: "지출현황",
    href: suyeongLinks.expenditure,
    icon: ReceiptText,
  },
  {
    label: "사업별 세부설명",
    href: suyeongLinks.businessDetails,
    icon: ListTree,
  },
] as const

export function SuyeongMainServicesCard() {
  return (
    <section className="sy-main-services-card" aria-labelledby="main-services-title">
      <h2 id="main-services-title">주요 재정정보</h2>
      <nav aria-label="자주 찾는 재정정보">
        <ul className="sy-main-services-list">
          {mainServices.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a href={href}>
                <span className="sy-main-services-list__icon" aria-hidden="true">
                  <Icon />
                </span>
                <span className="sy-main-services-list__label">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}
