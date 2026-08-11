import { ArrowRight } from "lucide-react"
import { SuyeongDisclosureCard } from "@/components/suyeong/suyeong-disclosure-card"
import { suyeongLinks } from "@/components/suyeong/suyeong-links"
import { SuyeongMainServicesCard } from "@/components/suyeong/suyeong-main-services-card"
import "@/components/suyeong/suyeong-services.css"

export function SuyeongServices() {
  return (
    <div className="sy-primary-services-layout">
      <SuyeongMainServicesCard />

      <section className="sy-disclosure-section" aria-labelledby="disclosure-title">
        <h2 id="disclosure-title">재정공시</h2>
        <div className="sy-disclosure-list">
          <SuyeongDisclosureCard
            title="예산공시"
            description="2026년도 수영구 예산정보를 확인하세요."
            href={suyeongLinks.budgetDisclosure}
            tone="budget"
          />
          <SuyeongDisclosureCard
            title="결산공시"
            description="수영구 재정 결산정보를 확인하세요."
            href={suyeongLinks.settlementDisclosure}
            tone="settlement"
          />
        </div>
      </section>

      <section className="sy-notice-section" aria-labelledby="notice-title">
        <div className="sy-section-heading">
          <h2 id="notice-title">공지사항</h2>
          <a href={suyeongLinks.notices}>
            전체보기 <ArrowRight aria-hidden="true" />
          </a>
        </div>
        <a className="sy-notice-row" href={suyeongLinks.notices}>
          <span>수영구 재정정보 공지사항을 확인하세요.</span>
          <ArrowRight aria-hidden="true" />
        </a>
      </section>
    </div>
  )
}
