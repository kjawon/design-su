import { ChartNoAxesColumnIncreasing, FileChartColumnIncreasing } from "lucide-react"
import { suyeongLinks } from "@/components/suyeong/config/links"
import { SuyeongDisclosureCard } from "./SuyeongDisclosureCard"
import "./SuyeongDisclosures.css"

export function SuyeongDisclosures() {
  return (
    <div className="sy-disclosure-grid">
      <SuyeongDisclosureCard
        title="예산공시"
        description="예산공시 정보를 확인하세요."
        href={suyeongLinks.budgetDisclosure}
        icon={FileChartColumnIncreasing}
        tone="budget"
      />
      <SuyeongDisclosureCard
        title="결산공시"
        description="재정공시 정보를 확인하세요."
        href={suyeongLinks.settlementDisclosure}
        icon={ChartNoAxesColumnIncreasing}
        tone="settlement"
      />
    </div>
  )
}
