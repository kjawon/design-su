import { dailyFinanceRecords, cumulativeFinanceSnapshot } from "@/components/suyeong/suyeong-data"
import { SuyeongDailyFinanceTicker } from "@/components/suyeong/suyeong-daily-finance-ticker"
import { SuyeongFinanceCard } from "@/components/suyeong/suyeong-finance-card"
import { suyeongLinks } from "@/components/suyeong/suyeong-links"
import "@/components/suyeong/suyeong-finance-summary.css"

export function SuyeongFinanceSummary() {
  const summary = cumulativeFinanceSnapshot
  const fiscalYear = summary.referenceDate.slice(0, 4)

  return (
    <div className="sy-cumulative-overview">
      <div className="sy-cumulative-overview__meta">
        <time
          dateTime={summary.referenceDate.replaceAll(".", "-")}
          aria-label={`${summary.referenceDate} 기준`}
        >
          {summary.referenceDate} 기준
        </time>
      </div>

      <div className="sy-cumulative-overview__grid">
        <SuyeongFinanceCard
          actionHref={suyeongLinks.funds}
          actionLabel="세입 상세보기"
          detailAmount={summary.budget}
          detailLabel={`${fiscalYear}년 예산현액`}
          heading="현재 수영구의 세입"
          headingId="income-summary-title"
          tone="income"
          totalAmount={summary.income}
          totalLabel={`${fiscalYear}년 세입총액`}
        />
        <SuyeongFinanceCard
          actionHref={suyeongLinks.funds}
          actionLabel="세출 상세보기"
          detailAmount={summary.balance}
          detailLabel={`${fiscalYear}년 자금잔액`}
          heading="현재 수영구의 세출"
          headingId="expense-summary-title"
          tone="expense"
          totalAmount={summary.expense}
          totalLabel={`${fiscalYear}년 세출총액`}
        />
      </div>

      <SuyeongDailyFinanceTicker records={dailyFinanceRecords} />
    </div>
  )
}
