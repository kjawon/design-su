import { cumulativeFinanceSnapshot } from "@/components/suyeong/suyeong-data"
import { SuyeongFinanceCard } from "@/components/suyeong/suyeong-finance-card"
import { suyeongLinks } from "@/components/suyeong/suyeong-links"
import "@/components/suyeong/suyeong-finance-summary.css"

const financeBenchmarks = {
  income: 520_000_000_000,
  expense: 600_000_000_000,
} as const

export function SuyeongFinanceSummary() {
  const summary = cumulativeFinanceSnapshot
  const fiscalYear = summary.referenceDate.slice(0, 4)

  return (
    <div className="sy-cumulative-overview">
      <div className="sy-cumulative-overview__grid">
        <SuyeongFinanceCard
          actionHref={suyeongLinks.funds}
          actionLabel="세입 상세보기"
          benchmarkAmount={financeBenchmarks.income}
          benchmarkLabel="연간 세입예산"
          heading="세입"
          headingId="income-summary-title"
          tone="income"
          totalAmount={summary.income}
          totalLabel={`${fiscalYear}년 누적 세입`}
        />
        <SuyeongFinanceCard
          actionHref={suyeongLinks.funds}
          actionLabel="세출 상세보기"
          benchmarkAmount={financeBenchmarks.expense}
          benchmarkLabel="연간 세출예산"
          heading="세출"
          headingId="expense-summary-title"
          tone="expense"
          totalAmount={summary.expense}
          totalLabel={`${fiscalYear}년 누적 세출`}
        />
      </div>
    </div>
  )
}
