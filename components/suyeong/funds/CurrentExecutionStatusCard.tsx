import {
  formatDisplayDate,
  formatExactWon,
  formatHundredMillionWon,
} from "./chart.utils"
import "./CurrentExecutionStatusCard.css"

interface CurrentExecutionStatusCardProps {
  budgetAmount: number
  cumulativeExpense: number
  referenceDate: string
}

function calculateExecutionRate(budgetAmount: number, cumulativeExpense: number) {
  if (budgetAmount <= 0) return 0
  return (cumulativeExpense / budgetAmount) * 100
}

export function CurrentExecutionStatusCard({
  budgetAmount,
  cumulativeExpense,
  referenceDate,
}: CurrentExecutionStatusCardProps) {
  const executionRate = calculateExecutionRate(budgetAmount, cumulativeExpense)
  const visualRate = Math.min(Math.max(executionRate, 0), 100)
  const displayRate = executionRate.toLocaleString("ko-KR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })

  return (
    <article className="sy-trend-card sy-current-execution-card">
      <div className="sy-trend-card__header">
        <div className="sy-trend-card__title">
          <h3>현재 예산 집행 현황</h3>
          <p>예산현액 대비 누계 지출 기준</p>
        </div>
      </div>

      <div className="sy-trend-card__body sy-current-execution-card__body">
        <div
          className="sy-execution-donut"
          role="img"
          aria-label={`현재 예산 집행률 ${displayRate}퍼센트`}
        >
          <svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">
            <circle className="sy-execution-donut__track" cx="100" cy="100" r="78" />
            <circle
              className="sy-execution-donut__value"
              cx="100"
              cy="100"
              r="78"
              pathLength="100"
              strokeDasharray={`${visualRate} ${100 - visualRate}`}
            />
          </svg>
          <div className="sy-execution-donut__label" aria-hidden="true">
            <strong>{displayRate}%</strong>
            <span>집행률</span>
          </div>
        </div>

        <dl className="sy-current-execution-card__summary">
          <div title={formatExactWon(budgetAmount)}>
            <dt>예산현액</dt>
            <dd>{formatHundredMillionWon(budgetAmount)}</dd>
          </div>
          <div title={formatExactWon(cumulativeExpense)}>
            <dt>누계 지출</dt>
            <dd>{formatHundredMillionWon(cumulativeExpense)}</dd>
          </div>
          <div>
            <dt>기준일</dt>
            <dd>{formatDisplayDate(referenceDate)}</dd>
          </div>
        </dl>
      </div>
    </article>
  )
}
