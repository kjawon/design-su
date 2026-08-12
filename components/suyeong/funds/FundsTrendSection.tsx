import { AnnualCumulativeTrendChart } from "./AnnualCumulativeTrendChart"
import { CurrentExecutionStatusCard } from "./CurrentExecutionStatusCard"
import { formatDisplayDate } from "./chart.utils"
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
    <section className="sy-funds-trends" aria-labelledby="funds-trend-title">
      <div className="sy-funds-trends__heading">
        <div>
          <h2 id="funds-trend-title">자금운용 추이</h2>
          <p>현재 시점의 세입·세출 흐름을 확인할 수 있습니다.</p>
        </div>
        <span>최종 데이터 {formatDisplayDate(currentStatus.date)} 기준</span>
      </div>

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
