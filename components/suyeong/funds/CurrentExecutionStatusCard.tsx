import { formatKoreanCurrency } from "@/components/suyeong/utils/currency"
import { formatDisplayDate, formatExactWon } from "./chart.utils"
import "./CurrentExecutionStatusCard.css"

interface CurrentExecutionStatusCardProps {
  budgetAmount: number
  cumulativeExpense: number
  currentMonthExpense: number
  referenceDate: string
}

function calculateExecutionRate(budgetAmount: number, cumulativeExpense: number) {
  if (budgetAmount <= 0) return 0
  return (cumulativeExpense / budgetAmount) * 100
}

export function CurrentExecutionStatusCard({
  budgetAmount,
  cumulativeExpense,
  currentMonthExpense,
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
          <p>예산현액 대비 세출 누계 기준</p>
        </div>
      </div>

      <div className="sy-trend-card__body sy-current-execution-card__body">
        <div
          className="sy-execution-donut"
          role="img"
          tabIndex={0}
          aria-label={`현재 예산 집행률 ${displayRate}퍼센트`}
        >
          <svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">
            <circle className="sy-execution-donut__track" cx="100" cy="100" r="82" />
            <circle
              className="sy-execution-donut__value"
              cx="100"
              cy="100"
              r="82"
              pathLength="100"
              strokeDasharray={`${visualRate} ${100 - visualRate}`}
            />
          </svg>
          <div className="sy-execution-donut__label" aria-hidden="true">
            <strong>{displayRate}%</strong>
            <span>집행률</span>
          </div>
        </div>

        <div className="sy-current-execution-card__info">
          <time
            className="sy-current-execution-card__reference-date"
            dateTime={referenceDate}
          >
            기준일 {formatDisplayDate(referenceDate)}
          </time>
          <dl className="sy-current-execution-card__summary">
            <div
              className="sy-current-execution-card__summary-primary"
              title={formatExactWon(budgetAmount)}
            >
              <dt>예산현액</dt>
              <dd>{formatKoreanCurrency(budgetAmount)}</dd>
            </div>
            <div title={formatExactWon(cumulativeExpense)}>
              <dt>세출 누계</dt>
              <dd>{formatKoreanCurrency(cumulativeExpense)}</dd>
            </div>
            <div title={formatExactWon(currentMonthExpense)}>
              <dt>당월 세출</dt>
              <dd>{formatKoreanCurrency(currentMonthExpense)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </article>
  )
}
