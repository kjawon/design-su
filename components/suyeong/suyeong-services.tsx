import {
  ChartNoAxesColumnIncreasing,
  FileChartColumnIncreasing,
} from "lucide-react"
import { SuyeongDisclosureCard } from "@/components/suyeong/suyeong-disclosure-card"
import { suyeongLinks } from "@/components/suyeong/suyeong-links"
import { SuyeongMainServicesCard } from "@/components/suyeong/suyeong-main-services-card"
import "@/components/suyeong/suyeong-services.css"

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

export function SuyeongServices() {
  return (
    <div className="sy-primary-services-layout">
      <SuyeongMainServicesCard />
    </div>
  )
}
