import { useId, useMemo, useState } from "react"
import { formatNumber } from "@/components/suyeong/utils/currency"
import {
  createFieldExecutionRateChartData,
  formatExecutionRate,
  getExecutionRateAxisMax,
} from "./budget-execution.chart.utils"
import type { BudgetExecutionRecord } from "./budget-execution.types"
import "./FieldExecutionRateChart.css"

interface FieldExecutionRateChartProps {
  records: readonly BudgetExecutionRecord[]
}

const chartWidth = 1240
const chartHeight = 438
const margin = { top: 42, right: 24, bottom: 100, left: 64 }
const axisDivisionCount = 5
const plotWidth = chartWidth - margin.left - margin.right
const plotHeight = chartHeight - margin.top - margin.bottom

export function FieldExecutionRateChart({ records }: FieldExecutionRateChartProps) {
  const titleId = useId()
  const descriptionId = useId()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const chartData = useMemo(() => createFieldExecutionRateChartData(records), [records])
  const hasPositiveValue = chartData.some((item) => item.executionRate > 0)
  const maxExecutionRate = Math.max(...chartData.map((item) => item.executionRate), 0)
  const axisMax = getExecutionRateAxisMax(maxExecutionRate)
  const axisTicks = Array.from(
    { length: axisDivisionCount + 1 },
    (_, index) => (axisMax / axisDivisionCount) * index,
  )
  const xStep = plotWidth / chartData.length
  const barWidth = Math.min(xStep * 0.56, 54)
  const plotBottom = margin.top + plotHeight
  const getX = (index: number) => margin.left + xStep * (index + 0.5)
  const getY = (executionRate: number) =>
    margin.top + plotHeight - (executionRate / axisMax) * plotHeight
  const activeRecord = activeIndex === null ? null : chartData[activeIndex]
  const activeX = activeIndex === null ? null : getX(activeIndex)
  const activeY = activeRecord ? getY(activeRecord.executionRate) : null
  const rawTooltipLeft = activeX === null ? 50 : (activeX / chartWidth) * 100
  const tooltipLeft = Math.min(Math.max(rawTooltipLeft, 15), 85)
  const tooltipTop = activeY === null ? 50 : (activeY / chartHeight) * 100

  return (
    <section
      className="sy-field-execution-chart"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <header className="sy-field-execution-chart__header">
        <div>
          <h2 id={titleId}>분야별 예산 집행률</h2>
          <p id={descriptionId}>분야별 예산현액 대비 현재까지 집행된 누적 지출 비율</p>
        </div>
        <span>단위: %</span>
      </header>

      {!chartData.length || !hasPositiveValue ? (
        <div className="sy-field-execution-chart__empty" role="status">
          표시할 예산 집행률 데이터가 없습니다.
        </div>
      ) : (
        <div className="sy-field-execution-chart__viewport">
          <div className="sy-field-execution-chart__canvas">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              role="img"
              aria-label="분야별 예산 집행률 세로 막대그래프"
              onMouseLeave={() => setActiveIndex(null)}
            >
              {axisTicks.map((tick) => {
                const y = getY(tick)

                return (
                  <g key={tick}>
                    <line
                      className="sy-field-execution-chart__grid-line"
                      x1={margin.left}
                      x2={chartWidth - margin.right}
                      y1={y}
                      y2={y}
                    />
                    <text
                      className="sy-field-execution-chart__axis-label"
                      x={margin.left - 12}
                      y={y + 4}
                      textAnchor="end"
                    >
                      {formatExecutionRate(tick)}%
                    </text>
                  </g>
                )
              })}

              {chartData.map((item, index) => {
                const x = getX(index)
                const y = getY(item.executionRate)
                const height = plotBottom - y
                const isActive = activeIndex === index
                const categoryLengthClass = item.field.length >= 10
                  ? " is-very-long"
                  : item.field.length >= 7
                    ? " is-long"
                    : ""

                return (
                  <g key={item.field}>
                    <rect
                      className={`sy-field-execution-chart__bar${item.executionRate === 0 ? " is-zero" : ""}${isActive ? " is-active" : ""}`}
                      x={x - barWidth / 2}
                      y={item.executionRate === 0 ? plotBottom - 2 : y}
                      width={barWidth}
                      height={item.executionRate === 0 ? 2 : Math.max(height, 2)}
                      rx="5"
                    />
                    <text
                      className="sy-field-execution-chart__value"
                      x={x}
                      y={item.executionRate === 0 ? plotBottom - 9 : y - 9}
                      textAnchor="middle"
                    >
                      {formatExecutionRate(item.executionRate)}%
                    </text>
                    <text
                      className={`sy-field-execution-chart__category${categoryLengthClass}`}
                      x={x}
                      y={plotBottom + 52}
                      textAnchor="middle"
                      transform={`rotate(-42 ${x} ${plotBottom + 52})`}
                    >
                      {item.field}
                    </text>
                    <rect
                      className="sy-field-execution-chart__hit-area"
                      x={x - xStep / 2}
                      y={margin.top}
                      width={xStep}
                      height={plotHeight + 28}
                      tabIndex={0}
                      role="img"
                      aria-label={`${item.field}, 집행률 ${formatExecutionRate(item.executionRate)}%, 누계 ${formatNumber(item.cumulativeExpense)}원, 예산현액 ${formatNumber(item.budget)}원`}
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
                className="sy-field-execution-chart__tooltip"
                style={{ left: `${tooltipLeft}%`, top: `${tooltipTop}%` }}
                role="status"
              >
                <b>{activeRecord.field}</b>
                <span>집행률 <strong>{formatExecutionRate(activeRecord.executionRate)}%</strong></span>
                <span>누계(B) <strong>{formatNumber(activeRecord.cumulativeExpense)}원</strong></span>
                <span>예산현액(A) <strong>{formatNumber(activeRecord.budget)}원</strong></span>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
