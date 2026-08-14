import { AnnualCumulativeTrendChart } from "./AnnualCumulativeTrendChart"
import { CurrentExecutionStatusCard } from "./CurrentExecutionStatusCard"
import { latestFundsOperationRecord } from "./funds.data"
import { currentFundsTrendSnapshot } from "./funds.trends.data"
import "./FundsTrendSection.css"

export function FundsTrendSection() {
  const trendSnapshot = currentFundsTrendSnapshot
  const currentStatus = latestFundsOperationRecord
  const currentYear = Number(currentStatus.date.slice(0, 4))
  const latestDataMonth = Number(currentStatus.date.slice(5, 7))
  const availableMonthlyData = trendSnapshot.monthlyCumulative.filter(
    (record) => record.month <= latestDataMonth,
  )

  return (
    <section className="sy-funds-trends" aria-label="자금운용 추이">
      <div className="sy-funds-trends__grid">
        <AnnualCumulativeTrendChart
          fiscalYear={currentYear}
          data={availableMonthlyData}
        />
        <CurrentExecutionStatusCard
          budgetAmount={currentStatus.budget}
          cumulativeExpense={currentStatus.cumulativeExpense}
          referenceDate={currentStatus.date}
        />
      </div>
    </section>
  )
}
