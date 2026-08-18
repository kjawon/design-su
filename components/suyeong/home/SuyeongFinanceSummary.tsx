import { suyeongLinks } from "@/components/suyeong/config/links"
import { useDatabaseTime } from "@/components/suyeong/shared"
import { cumulativeFinanceSnapshot, dailyFinanceRecords } from "./home.data"
import { SuyeongFinanceCard } from "./SuyeongFinanceCard"
import "./SuyeongFinanceSummary.css"

export function SuyeongFinanceSummary() {
  const { currentDate } = useDatabaseTime()
  const summary = {
    ...cumulativeFinanceSnapshot,
    referenceDate: currentDate.replaceAll("-", "."),
  }
  const fiscalYear = summary.referenceDate.slice(0, 4)
  const latestDailyFinance = dailyFinanceRecords[0]
  const latestDailyDate = latestDailyFinance.date.slice(5)

  return (
    <div className="sy-cumulative-overview">
      <div className="sy-cumulative-overview__grid">
        <SuyeongFinanceCard
          actionHref={suyeongLinks.income}
          detailAmount={latestDailyFinance.income}
          detailLabel={`${latestDailyDate} 세입`}
          heading="현재 수영구의 세입"
          headingId="income-summary-title"
          tone="income"
          totalAmount={summary.income}
          totalLabel={`${fiscalYear}년 세입총액`}
        />
        <SuyeongFinanceCard
          actionHref={suyeongLinks.expenditure}
          detailAmount={latestDailyFinance.expense}
          detailLabel={`${latestDailyDate} 세출`}
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
