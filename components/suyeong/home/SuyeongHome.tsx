import { SuyeongFooter, SuyeongHeader } from "@/components/suyeong/shared"
import { SuyeongDisclosures } from "./SuyeongDisclosures"
import { SuyeongFinanceSummary } from "./SuyeongFinanceSummary"
import { SuyeongServices } from "./SuyeongServices"
import "@/components/suyeong/shared/SuyeongLayout.css"
import "./SuyeongHome.css"

export function SuyeongHome() {
  return (
    <div className="sy-page">
      <SuyeongHeader />
      <main id="main-content" tabIndex={-1}>
        <div className="sy-home-first-view">
          <section className="sy-finance-summary" aria-labelledby="finance-summary-title">
            <div className="sy-container">
              <div className="sy-hero-heading">
                <div className="sy-hero-heading__text">
                  <h1 id="finance-summary-title">00 재정정보를 한눈에 확인하세요</h1>
                  <p>세입·세출과 주요 재정정보를 한곳에서 빠르게 확인할 수 있습니다.</p>
                </div>
              </div>

              <SuyeongFinanceSummary />
            </div>
          </section>

          <section className="sy-quick-services" aria-label="빠른 서비스">
            <div className="sy-container">
              <SuyeongServices />
            </div>
          </section>
        </div>

        <section className="sy-services" aria-label="재정공시">
          <div className="sy-container">
            <SuyeongDisclosures />
          </div>
        </section>
      </main>
      <SuyeongFooter />
    </div>
  )
}
