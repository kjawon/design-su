import { useState } from "react"
import {
  formatAxisAmount,
  formatExactWon,
  getRoundedAxisMax,
} from "./chart.utils"
import type { MonthlyCumulativeFundTrend } from "./funds.trends.types"
import "./AnnualCumulativeTrendChart.css"

interface AnnualCumulativeTrendChartProps {
  fiscalYear: number
  data: readonly MonthlyCumulativeFundTrend[]
}

const chartWidth = 760
const chartHeight = 341
const margin = { top: 40, right: 18, bottom: 42, left: 66 }
const plotWidth = chartWidth - margin.left - margin.right
const plotHeight = chartHeight - margin.top - margin.bottom

function createLinePath(points: ReadonlyArray<{ x: number; y: number }>) {
  return points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ")
}

export function AnnualCumulativeTrendChart({ fiscalYear, data }: AnnualCumulativeTrendChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const maxValue = Math.max(
    ...data.flatMap((item) => [item.cumulativeIncome, item.cumulativeExpense]),
    0,
  )
  const axisMax = getRoundedAxisMax(maxValue, 100_000_000_000)
  const axisTicks = Array.from({ length: 6 }, (_, index) => (axisMax / 5) * index)
  const xStep = data.length > 1 ? plotWidth / (data.length - 1) : plotWidth
  const getX = (index: number) => margin.left + xStep * index
  const getY = (value: number) => margin.top + plotHeight - (value / axisMax) * plotHeight
  const incomePoints = data.map((item, index) => ({ x: getX(index), y: getY(item.cumulativeIncome) }))
  const expensePoints = data.map((item, index) => ({ x: getX(index), y: getY(item.cumulativeExpense) }))
  const activeRecord = activeIndex === null ? null : data[activeIndex]
  const rawTooltipLeft =
    activeIndex === null ? 50 : (getX(activeIndex) / chartWidth) * 100
  const tooltipLeft = Math.min(Math.max(rawTooltipLeft, 16), 84)
  const activeAnchorY =
    activeIndex === null
      ? margin.top
      : Math.min(incomePoints[activeIndex].y, expensePoints[activeIndex].y)
  const tooltipTop = (activeAnchorY / chartHeight) * 100

  return (
    <article className="sy-trend-card sy-annual-trend-card">
      <div className="sy-trend-card__header">
        <div className="sy-trend-card__title">
          <h3>{fiscalYear}년 세입·세출 누계 추이</h3>
          <p>월별 누계 기준</p>
        </div>
      </div>

      <div className="sy-trend-card__body">
        <div className="sy-chart-meta">
          <ul className="sy-chart-legend" aria-label="범례">
            <li><i className="sy-chart-legend__income" />세입 누계</li>
            <li><i className="sy-chart-legend__expense" />세출 누계</li>
          </ul>
          <span className="sy-chart-unit">단위: 억원</span>
        </div>

        <div className="sy-chart-canvas" onMouseLeave={() => setActiveIndex(null)}>
          <div className="sy-chart-plot">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-label={`${fiscalYear}년 월별 세입 및 세출 누계 선 그래프`}>
            {axisTicks.map((tick) => {
              const y = getY(tick)
              return (
                <g key={tick}>
                  <line className="sy-chart-grid-line" x1={margin.left} x2={chartWidth - margin.right} y1={y} y2={y} />
                  <text className="sy-chart-axis-label" x={margin.left - 10} y={y + 3} textAnchor="end">
                    {formatAxisAmount(tick)}
                  </text>
                </g>
              )
            })}

            <path className="sy-cumulative-line sy-cumulative-line--income" d={createLinePath(incomePoints)} />
            <path className="sy-cumulative-line sy-cumulative-line--expense" d={createLinePath(expensePoints)} />

            {data.map((item, index) => {
              const x = getX(index)
              const incomeY = getY(item.cumulativeIncome)
              const expenseY = getY(item.cumulativeExpense)
              const hitAreaWidth = index === 0 || index === data.length - 1 ? xStep / 2 : xStep
              const hitAreaX = index === 0 ? x : x - xStep / 2

              return (
                <g key={item.month}>
                  <circle className={`sy-cumulative-point sy-cumulative-point--income${activeIndex === index ? " is-active" : ""}`} cx={x} cy={incomeY} r={activeIndex === index ? 5 : 3} />
                  <circle className={`sy-cumulative-point sy-cumulative-point--expense${activeIndex === index ? " is-active" : ""}`} cx={x} cy={expenseY} r={activeIndex === index ? 5 : 3} />
                  <text className="sy-chart-axis-label" x={x} y={chartHeight - 16} textAnchor="middle">
                    {item.month}월
                  </text>
                  <rect
                    className="sy-chart-hit-area"
                    x={hitAreaX}
                    y={margin.top}
                    width={hitAreaWidth}
                    height={plotHeight}
                    tabIndex={0}
                    role="img"
                    aria-label={`${fiscalYear}년 ${item.month}월, 세입 누계 ${formatExactWon(item.cumulativeIncome)}, 세출 누계 ${formatExactWon(item.cumulativeExpense)}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onBlur={() => setActiveIndex(null)}
                  />
                </g>
              )
            })}
            </svg>

            {activeRecord && (
              <div
                className="sy-chart-tooltip"
                style={{ left: `${tooltipLeft}%`, top: `${tooltipTop}%` }}
                role="status"
              >
                <strong>{fiscalYear}년 {activeRecord.month}월</strong>
                <span>세입 누계 <b>{formatExactWon(activeRecord.cumulativeIncome)}</b></span>
                <span>세출 누계 <b>{formatExactWon(activeRecord.cumulativeExpense)}</b></span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
