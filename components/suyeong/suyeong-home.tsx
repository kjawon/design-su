import "@/components/suyeong/suyeong-theme.css"
import "@/components/suyeong/suyeong-home.css"
import { cumulativeFinanceSnapshot } from "@/components/suyeong/suyeong-data"
import { SuyeongFinanceSummary } from "@/components/suyeong/suyeong-finance-summary"
import { SuyeongFooter } from "@/components/suyeong/suyeong-footer"
import { SuyeongMainServicesCard } from "@/components/suyeong/suyeong-main-services-card"
import { SuyeongServices } from "@/components/suyeong/suyeong-services"
import suyeongIcon from "@/수영구 아이콘.svg"

export type SuyeongTheme = "blue" | "teal" | "forest"

const DEFAULT_SUYEONG_THEME: SuyeongTheme = "teal"

export function SuyeongHome() {
  const referenceDate = cumulativeFinanceSnapshot.referenceDate

  return (
    <div className="sy-page" data-theme={DEFAULT_SUYEONG_THEME}>
      <main id="main-content" tabIndex={-1}>
        <section className="sy-finance-summary" aria-labelledby="finance-summary-title">
          <div className="sy-container">
            <div className="sy-hero-composition">
              <div className="sy-hero-brand-row">
                <div className="sy-hero-brand">
                  <span className="sy-hero-brand__mark" aria-hidden="true">
                    <img src={suyeongIcon} alt="" />
                  </span>
                  <span>수영구 재정정보</span>
                </div>

                <time
                  className="sy-hero-date"
                  dateTime={referenceDate.replaceAll(".", "-")}
                >
                  {referenceDate} 기준
                </time>
              </div>

              <h1 className="sy-hero-title" id="finance-summary-title">
                투명한 행정, 열린 재정
              </h1>

              <div className="sy-hero-left">
                <SuyeongFinanceSummary />
              </div>

              <div className="sy-hero-navigation">
                <SuyeongMainServicesCard />
              </div>
            </div>
          </div>
        </section>

        <section className="sy-services" aria-label="예산 및 결산 공개 정보">
          <div className="sy-container">
            <SuyeongServices />
          </div>
        </section>
      </main>
      <SuyeongFooter />
    </div>
  )
}
