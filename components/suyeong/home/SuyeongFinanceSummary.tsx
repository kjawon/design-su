import { suyeongLinks } from "@/components/suyeong/config/links"
import { useDatabaseTime } from "@/components/suyeong/shared"
import { cumulativeFinanceSnapshot } from "./home.data"
import { SuyeongFinanceCard } from "./SuyeongFinanceCard"
import "./SuyeongFinanceSummary.css"

export function SuyeongFinanceSummary() {
  const { currentDate } = useDatabaseTime()
  const summary = {
    ...cumulativeFinanceSnapshot,
    referenceDate: currentDate.replaceAll("-", "."),
  }
  const fiscalYear = summary.referenceDate.slice(0, 4)

  return (
    <div className="sy-cumulative-overview">
      <div className="sy-cumulative-overview__grid">
        <SuyeongFinanceCard
          actionHref={suyeongLinks.income}
          heading="현재 수영구의 세입"
          headingId="income-summary-title"
          tone="income"
          totalAmount={summary.income}
          totalLabel={`${fiscalYear}년 세입총액`}
        />
        <SuyeongFinanceCard
          actionHref={suyeongLinks.budgetExecution}
          heading="현재 수영구의 세출"
          headingId="expense-summary-title"
          tone="expense"
          totalAmount={summary.expense}
          totalLabel={`${fiscalYear}년 세출총액`}
        />
      </div>
    </div>
  )
}
