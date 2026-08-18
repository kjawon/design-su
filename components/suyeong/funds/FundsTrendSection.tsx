import { useDatabaseTime } from "@/components/suyeong/shared"
import { AnnualCumulativeTrendChart } from "./AnnualCumulativeTrendChart"
import { CurrentExecutionStatusCard } from "./CurrentExecutionStatusCard"
import { latestFundsOperationRecord } from "./funds.data"
import { currentFundsTrendSnapshot } from "./funds.trends.data"
import "./FundsTrendSection.css"

export function FundsTrendSection() {
  const { currentDate } = useDatabaseTime()
  const trendSnapshot = currentFundsTrendSnapshot
  const currentStatus = latestFundsOperationRecord
  const currentYear = Number(currentDate.slice(0, 4))
  const latestDataMonth = Number(currentDate.slice(5, 7))
  const availableMonthlyData = trendSnapshot.monthlyCumulative.filter(
    (record) => record.month <= latestDataMonth,
  )
  const latestMonth = availableMonthlyData.at(-1)
  const previousMonth = availableMonthlyData.at(-2)
  const currentMonthExpense = latestMonth
    ? latestMonth.cumulativeExpense - (previousMonth?.cumulativeExpense ?? 0)
    : 0

  return (
    <section className="sy-funds-trends" aria-label="자금운용 추이">
      <div className="sy-funds-trends__grid">
        <AnnualCumulativeTrendChart
          budgetAmount={currentStatus.budget}
          fiscalYear={currentYear}
          data={availableMonthlyData}
        />
        <CurrentExecutionStatusCard
          budgetAmount={currentStatus.budget}
          cumulativeExpense={currentStatus.cumulativeExpense}
          currentMonthExpense={currentMonthExpense}
          referenceDate={currentDate}
        />
      </div>
    </section>
  )
}
