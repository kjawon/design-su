import { cumulativeFinanceSnapshot } from "@/components/suyeong/suyeong-data"
import { SuyeongFinanceCard } from "@/components/suyeong/suyeong-finance-card"
import { suyeongLinks } from "@/components/suyeong/suyeong-links"
import "@/components/suyeong/suyeong-finance-summary.css"

export function SuyeongFinanceSummary() {
  const summary = cumulativeFinanceSnapshot

  return (
    <section className="sy-cumulative-overview" aria-label="세입 및 세출 현황">
      <div className="sy-cumulative-overview__grid">
        <SuyeongFinanceCard
          actionHref={suyeongLinks.funds}
          actionLabel="세입 상세보기"
          heading="세입"
          headingId="income-summary-title"
          tone="income"
          totalAmount={summary.income}
        />
        <SuyeongFinanceCard
          actionHref={suyeongLinks.funds}
          actionLabel="세출 상세보기"
          heading="세출"
          headingId="expense-summary-title"
          tone="expense"
          totalAmount={summary.expense}
        />
      </div>
    </section>
  )
}
