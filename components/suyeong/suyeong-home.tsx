import "@/components/suyeong/suyeong-theme.css"
import "@/components/suyeong/suyeong-home.css"
import {
  cumulativeFinanceSnapshot,
  dailyFinanceRecords,
} from "@/components/suyeong/suyeong-data"
import { SuyeongDailyFinanceTicker } from "@/components/suyeong/suyeong-daily-finance-ticker"
import { SuyeongFinanceSummary } from "@/components/suyeong/suyeong-finance-summary"
import { SuyeongFooter } from "@/components/suyeong/suyeong-footer"
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
            <div className="sy-hero-layout">
              <div className="sy-hero-heading">
                <div className="sy-hero-heading__logo" aria-hidden="true">
                  <img src={suyeongIcon} alt="" />
                </div>
                <h1 id="finance-summary-title">숫자로 보는 수영구의 재정</h1>
                <p>투명한 데이터로 수영구의 재정 현황을 제공합니다.</p>
                <time
                  className="sy-hero-heading__date"
                  dateTime={referenceDate.replaceAll(".", "-")}
                >
                  {referenceDate} 기준
                </time>
              </div>

              <SuyeongDailyFinanceTicker records={dailyFinanceRecords} />
              <SuyeongFinanceSummary />
            </div>
          </div>
        </section>

        <section className="sy-services" aria-label="재정정보 바로가기">
          <div className="sy-container">
            <SuyeongServices />
          </div>
        </section>
      </main>
      <SuyeongFooter />
    </div>
  )
}
