import { SuyeongDisclosureCard } from "@/components/suyeong/suyeong-disclosure-card"
import { suyeongLinks } from "@/components/suyeong/suyeong-links"
import "@/components/suyeong/suyeong-services.css"

export function SuyeongServices() {
  return (
    <div className="sy-primary-services-layout">
      <section className="sy-disclosure-section" aria-label="재정공시">
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
    </div>
  )
}
