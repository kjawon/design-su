import {
  ChartNoAxesColumnIncreasing,
  CircleDollarSign,
  FileChartColumnIncreasing,
  LayoutGrid,
  ReceiptText,
  WalletCards,
} from "lucide-react"
import { suyeongLinks } from "@/components/suyeong/suyeong-links"
import "@/components/suyeong/suyeong-quick-services.css"

const quickServices = [
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

export function SuyeongQuickServices() {
  return (
    <nav className="sy-quick-services" aria-label="자주 찾는 재정정보">
      <ul>
        {quickServices.map(({ label, href, icon: Icon }) => (
          <li key={label}>
            <a href={href}>
              <span className="sy-quick-services__icon" aria-hidden="true">
                <Icon />
              </span>
              <span>{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
