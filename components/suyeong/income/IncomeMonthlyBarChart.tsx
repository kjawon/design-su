import { useState } from "react"
import { formatKoreanCurrency } from "@/components/suyeong/utils/currency"
import {
  formatIncomeAxisAmount,
  formatIncomeBarAmount,
  formatIncomeMonth,
  getIncomeAxisMax,
} from "./income.chart.utils"
import type { IncomeMonthlyTrendPoint } from "./income.trends.types"

interface IncomeMonthlyBarChartProps {
  data: readonly IncomeMonthlyTrendPoint[]
}

const chartWidth = 1100
const chartHeight = 276
const margin = { top: 36, right: 12, bottom: 30, left: 64 }
const plotWidth = chartWidth - margin.left - margin.right
const plotHeight = chartHeight - margin.top - margin.bottom

export function IncomeMonthlyBarChart({ data }: IncomeMonthlyBarChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const maxValue = Math.max(...data.map((item) => item.amount), 0)
  const axisMax = getIncomeAxisMax(maxValue)
  const axisTicks = Array.from({ length: 6 }, (_, index) => (axisMax / 5) * index)
  const xStep = plotWidth / data.length
  const barWidth = Math.min(xStep * 0.58, 76)
  const getX = (index: number) => margin.left + xStep * (index + 0.5)
  const getY = (value: number) => margin.top + plotHeight - (value / axisMax) * plotHeight
  const activeRecord = activeIndex === null ? null : data[activeIndex]
  const activeX = activeIndex === null ? null : getX(activeIndex)
  const activeY = activeRecord ? getY(activeRecord.amount) : null
  const rawTooltipLeft = activeX === null ? 50 : (activeX / chartWidth) * 100
  const tooltipLeft = Math.min(Math.max(rawTooltipLeft, 14), 86)
  const tooltipTop = activeY === null ? 50 : (activeY / chartHeight) * 100

  const selectBarFromMouse = (event: React.MouseEvent<SVGSVGElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const viewX = ((event.clientX - bounds.left) / bounds.width) * chartWidth
    const index = Math.floor((viewX - margin.left) / xStep)
    setActiveIndex(Math.min(Math.max(index, 0), data.length - 1))
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return
    event.preventDefault()
    const direction = event.key === "ArrowRight" ? 1 : -1
    setActiveIndex((current) =>
      Math.min(Math.max((current ?? data.length - 1) + direction, 0), data.length - 1),
    )
  }

  return (
    <div className="sy-income-chart">
      <div
        className="sy-income-chart__canvas"
        tabIndex={0}
        aria-label="월별 세입 그래프. 좌우 방향키로 월별 금액을 확인할 수 있습니다."
        onFocus={() => setActiveIndex((current) => current ?? data.length - 1)}
        onBlur={() => setActiveIndex(null)}
        onKeyDown={handleKeyDown}
      >
        <div className="sy-income-chart__plot">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            role="img"
            aria-label="조회 기간의 월별 실제 세입 막대 그래프"
            onMouseMove={selectBarFromMouse}
            onMouseLeave={() => setActiveIndex(null)}
          >
          {axisTicks.map((tick) => {
            const y = getY(tick)
            return (
              <g key={tick}>
                <line
                  className="sy-income-chart__grid-line"
                  x1={margin.left}
                  x2={chartWidth - margin.right}
                  y1={y}
                  y2={y}
                />
                <text
                  className="sy-income-chart__axis-label"
                  x={margin.left - 12}
                  y={y + 4}
                  textAnchor="end"
                >
                  {formatIncomeAxisAmount(tick)}
                </text>
              </g>
            )
          })}

          {data.map((item, index) => {
            const x = getX(index)
            const y = getY(item.amount)
            const height = margin.top + plotHeight - y
            return (
              <g key={item.month}>
                <rect
                  className={`sy-income-chart__bar${activeIndex === index ? " is-active" : ""}`}
                  x={x - barWidth / 2}
                  y={y}
                  width={barWidth}
                  height={Math.max(height, 1)}
                  rx="5"
                />
                <text
                  className="sy-income-chart__value-label"
                  x={x}
                  y={Math.max(y - 9, 18)}
                  textAnchor="middle"
                >
                  {formatIncomeBarAmount(item.amount)}
                </text>
                <text
                  className="sy-income-chart__axis-label"
                  x={x}
                  y={chartHeight - 16}
                  textAnchor="middle"
                >
                  {formatIncomeMonth(item.month)}
                </text>
              </g>
            )
          })}
          </svg>

          {activeRecord && (
            <div
              className="sy-income-chart__tooltip"
              style={{ left: `${tooltipLeft}%`, top: `${tooltipTop}%` }}
              role="status"
            >
              <strong>{activeRecord.month.replace("-", "년 ")}월</strong>
              <span>월별 세입 <b>{formatKoreanCurrency(activeRecord.amount)}</b></span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
