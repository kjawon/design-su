import { useState } from "react"
import {
  formatAxisAmount,
  formatExactWon,
  getRoundedAxisMax,
} from "./chart.utils"
import type { MonthlyCumulativeFundTrend } from "./funds.trends.types"
import "./AnnualCumulativeTrendChart.css"

interface AnnualCumulativeTrendChartProps {
  budgetAmount: number
  fiscalYear: number
  data: readonly MonthlyCumulativeFundTrend[]
}

const chartWidth = 760
const chartHeight = 341
const margin = { top: 40, right: 58, bottom: 42, left: 66 }
const plotWidth = chartWidth - margin.left - margin.right
const plotHeight = chartHeight - margin.top - margin.bottom

function createLinePath(points: ReadonlyArray<{ x: number; y: number }>) {
  return points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ")
}

function calculateExecutionRate(budgetAmount: number, cumulativeExpense: number) {
  if (budgetAmount <= 0) return 0
  return (cumulativeExpense / budgetAmount) * 100
}

function formatExecutionRate(value: number) {
  return `${value.toLocaleString("ko-KR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}%`
}

export function AnnualCumulativeTrendChart({
  budgetAmount,
  fiscalYear,
  data,
}: AnnualCumulativeTrendChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const rateAxisMax = 100
  const monthlyExpenses = data.map((item, index) =>
    index === 0
      ? item.cumulativeExpense
      : item.cumulativeExpense - data[index - 1].cumulativeExpense,
  )
  const maxMonthlyExpense = Math.max(...monthlyExpenses, 0)
  const expenseAxisMax = getRoundedAxisMax(maxMonthlyExpense, 20_000_000_000)
  const axisTicks = Array.from({ length: 6 }, (_, index) => ({
    expense: (expenseAxisMax / 5) * index,
    rate: index * 20,
  }))
  const xStep = data.length > 0 ? plotWidth / data.length : plotWidth
  const barWidth = Math.min(46, Math.max(26, xStep * 0.54))
  const getX = (index: number) => margin.left + xStep * (index + 0.5)
  const getRateY = (value: number) =>
    margin.top + plotHeight - (value / rateAxisMax) * plotHeight
  const getExpenseY = (value: number) =>
    margin.top + plotHeight - (value / expenseAxisMax) * plotHeight
  const executionRates = data.map((item) =>
    calculateExecutionRate(budgetAmount, item.cumulativeExpense),
  )
  const executionRatePoints = executionRates.map((rate, index) => ({
    x: getX(index),
    y: getRateY(Math.min(Math.max(rate, 0), rateAxisMax)),
  }))
  const monthlyExpenseBarTops = monthlyExpenses.map((expense) => getExpenseY(expense))
  const activeRecord = activeIndex === null ? null : data[activeIndex]
  const activeExecutionRate = activeIndex === null ? null : executionRates[activeIndex]
  const activeMonthlyExpense = activeIndex === null ? null : monthlyExpenses[activeIndex]
  const rawTooltipLeft =
    activeIndex === null ? 50 : (getX(activeIndex) / chartWidth) * 100
  const tooltipLeft = Math.min(Math.max(rawTooltipLeft, 16), 84)
  const activeAnchorY =
    activeIndex === null
      ? margin.top
      : Math.min(executionRatePoints[activeIndex].y, monthlyExpenseBarTops[activeIndex])
  const tooltipTop = (activeAnchorY / chartHeight) * 100

  return (
    <article className="sy-trend-card sy-annual-trend-card">
      <div className="sy-trend-card__header">
        <div className="sy-trend-card__title">
          <h3>{fiscalYear}년 월별 예산 집행 추이</h3>
          <p>당월 세출액과 예산현액 대비 누적 집행률</p>
        </div>
      </div>

      <div className="sy-trend-card__body">
        <div className="sy-chart-meta">
          <ul className="sy-chart-legend" aria-label="범례">
            <li><i className="sy-chart-legend__monthly-expense" />당월 세출 (억원)</li>
            <li><i className="sy-chart-legend__execution-rate" />집행률 (%)</li>
          </ul>
        </div>

        <div className="sy-chart-canvas" onMouseLeave={() => setActiveIndex(null)}>
          <div className="sy-chart-plot">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-label={`${fiscalYear}년 당월 세출액 막대 및 누적 예산 집행률 꺾은선 복합 그래프`}>
            {axisTicks.map((tick) => {
              const y = getRateY(tick.rate)
              return (
                <g key={tick.rate}>
                  <line className="sy-chart-grid-line" x1={margin.left} x2={chartWidth - margin.right} y1={y} y2={y} />
                  <text className="sy-chart-axis-label" x={margin.left - 10} y={y + 3} textAnchor="end">
                    {formatAxisAmount(tick.expense)}
                  </text>
                  <text className="sy-chart-axis-label" x={chartWidth - margin.right + 10} y={y + 3} textAnchor="start">
                    {tick.rate}%
                  </text>
                </g>
              )
            })}

            {data.map((item, index) => {
              const x = getX(index)
              const y = monthlyExpenseBarTops[index]

              return (
                <rect
                  key={`expense-${item.month}`}
                  className={`sy-monthly-expense-bar${activeIndex === index ? " is-active" : ""}`}
                  x={x - barWidth / 2}
                  y={y}
                  width={barWidth}
                  height={margin.top + plotHeight - y}
                  rx={5}
                />
              )
            })}

            <path className="sy-execution-rate-line" d={createLinePath(executionRatePoints)} />

            {data.map((item, index) => {
              const x = getX(index)
              const executionRate = executionRates[index]
              const y = executionRatePoints[index].y
              const hitAreaX = margin.left + xStep * index

              return (
                <g key={item.month}>
                  <circle className={`sy-execution-rate-point${activeIndex === index ? " is-active" : ""}`} cx={x} cy={y} r={activeIndex === index ? 5 : 3} />
                  <text className="sy-chart-axis-label" x={x} y={chartHeight - 16} textAnchor="middle">
                    {item.month}월
                  </text>
                  <rect
                    className="sy-chart-hit-area"
                    x={hitAreaX}
                    y={margin.top}
                    width={xStep}
                    height={plotHeight}
                    tabIndex={0}
                    role="img"
                    aria-label={`${fiscalYear}년 ${item.month}월, 당월 세출 ${formatExactWon(monthlyExpenses[index])}, 누적 집행률 ${formatExecutionRate(executionRate)}, 세출 누계 ${formatExactWon(item.cumulativeExpense)}, 예산현액 ${formatExactWon(budgetAmount)}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onBlur={() => setActiveIndex(null)}
                  />
                </g>
              )
            })}
            </svg>

            {activeRecord && activeExecutionRate !== null && activeMonthlyExpense !== null && (
              <div
                className="sy-chart-tooltip"
                style={{ left: `${tooltipLeft}%`, top: `${tooltipTop}%` }}
                role="status"
              >
                <strong>{fiscalYear}년 {activeRecord.month}월</strong>
                <span>당월 세출 <b>{formatExactWon(activeMonthlyExpense)}</b></span>
                <span>누적 집행률 <b>{formatExecutionRate(activeExecutionRate)}</b></span>
                <span>세출 누계 <b>{formatExactWon(activeRecord.cumulativeExpense)}</b></span>
                <span>예산현액 <b>{formatExactWon(budgetAmount)}</b></span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
