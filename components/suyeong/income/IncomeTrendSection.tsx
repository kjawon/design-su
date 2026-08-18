import { useMemo } from "react"
import { useDatabaseTime, type FinancialSearchCriteria } from "@/components/suyeong/shared"
import { formatKoreanCurrency } from "@/components/suyeong/utils/currency"
import { IncomeMonthlyBarChart } from "./IncomeMonthlyBarChart"
import { formatIncomeDate } from "./income.chart.utils"
import {
  aggregateMonthlyIncomeTrend,
  selectYearToDateIncomeTrend,
} from "./income.trends.selectors"
import "./IncomeTrendSection.css"

interface IncomeTrendSectionProps {
  criteria: FinancialSearchCriteria
}

const accountingTypeLabels: Record<string, string> = {
  all: "전체 회계",
  general: "일반회계",
  special: "특별회계",
  fund: "기금회계",
}

function getPreviousMonth(month: string) {
  const [year, monthNumber] = month.split("-").map(Number)
  return monthNumber === 1
    ? `${year - 1}-12`
    : `${year}-${String(monthNumber - 1).padStart(2, "0")}`
}

export function IncomeTrendSection({ criteria }: IncomeTrendSectionProps) {
  const { currentDate } = useDatabaseTime()
  const yearToDateData = useMemo(() => selectYearToDateIncomeTrend(criteria), [criteria])
  const monthlyData = useMemo(() => aggregateMonthlyIncomeTrend(yearToDateData), [yearToDateData])
  const latestRecord = yearToDateData.at(-1)
  const currentMonthRecord = monthlyData.at(-1)
  const previousMonthRecord = currentMonthRecord
    ? monthlyData.find((item) => item.month === getPreviousMonth(currentMonthRecord.month))
    : undefined
  const hasData = monthlyData.length > 0
  const selectedAccountingType = accountingTypeLabels[criteria.accountingType] ?? "선택 회계"

  return (
    <section className="sy-income-trends" aria-label="세입 현황 시각화">
      <div className="sy-income-trends__grid">
        <div className="sy-income-trends__graph-card">
          <div className="sy-income-trends__toolbar">
            <div className="sy-income-trends__chart-heading">
              <h3>{criteria.fiscalYear} 월별 세입</h3>
              <p>각 월에 발생한 실제 세입액</p>
            </div>
            <span className="sy-income-chart__unit">단위: 억원</span>
          </div>

          <div
            id="income-trend-panel"
            className="sy-income-trends__panel"
            aria-label="월별 세입 그래프"
          >
            {hasData ? (
              <IncomeMonthlyBarChart data={monthlyData} />
            ) : (
              <div className="sy-income-trends__empty" role="status">
                <strong>표시할 세입 추이 데이터가 없습니다.</strong>
                <span>회계연도, 회계구분 또는 조회 기간을 다시 확인해 주세요.</span>
              </div>
            )}
          </div>
        </div>

        <aside className="sy-income-trends__summary-card" aria-labelledby="income-summary-card-title">
          <div className="sy-income-trends__summary-heading">
            <div>
              <h3 id="income-summary-card-title">현재 세입 현황</h3>
              <p>{criteria.fiscalYear}년 · {selectedAccountingType}</p>
            </div>
            <time className="sy-income-trends__reference-date" dateTime={currentDate}>
              기준일 {formatIncomeDate(currentDate)}
            </time>
          </div>

          <dl className="sy-income-trends__summary">
            <div>
              <dt>전월 세입</dt>
              <dd title={currentMonthRecord ? `${(previousMonthRecord?.amount ?? 0).toLocaleString("ko-KR")}원` : undefined}>
                {currentMonthRecord ? formatKoreanCurrency(previousMonthRecord?.amount ?? 0) : "-"}
              </dd>
            </div>
            <div>
              <dt>현월 세입</dt>
              <dd title={currentMonthRecord ? `${currentMonthRecord.amount.toLocaleString("ko-KR")}원` : undefined}>
                {currentMonthRecord ? formatKoreanCurrency(currentMonthRecord.amount) : "-"}
              </dd>
            </div>
            <div className="sy-income-trends__summary-primary">
              <dt>누적 세입</dt>
              <dd title={latestRecord ? `${latestRecord.cumulativeAmount.toLocaleString("ko-KR")}원` : undefined}>
                {latestRecord ? formatKoreanCurrency(latestRecord.cumulativeAmount) : "-"}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  )
}
