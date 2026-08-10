import "@/components/suyeong/suyeong-home.css"
import { SuyeongFinanceSummary } from "@/components/suyeong/suyeong-finance-summary"
import { SuyeongFooter } from "@/components/suyeong/suyeong-footer"
import { SuyeongHeader } from "@/components/suyeong/suyeong-header"
import { SuyeongServices } from "@/components/suyeong/suyeong-services"
import suyeongIcon from "@/수영구 아이콘.svg"

export function SuyeongHome() {
  return (
    <div className="sy-page">
      <SuyeongHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="sy-finance-summary" aria-labelledby="finance-summary-title">
          <div className="sy-container">
            <div className="sy-hero-heading">
              <img src={suyeongIcon} alt="" aria-hidden="true" />
              <div className="sy-hero-heading__text">
                <h1 id="finance-summary-title">수영구 재정정보를 한눈에 확인하세요</h1>
                <p>세입·세출과 주요 재정정보를 한곳에서 빠르게 확인할 수 있습니다.</p>
              </div>
            </div>

            <SuyeongFinanceSummary />
          </div>
        </section>

        <section className="sy-services" aria-label="주요 재정 서비스">
          <div className="sy-container">
            <SuyeongServices />
          </div>
        </section>
      </main>
      <SuyeongFooter />
    </div>
  )
}
