import { formatCurrency, formatKoreanCurrency } from "@/components/suyeong/suyeong-formatters"
import type { FinanceCardTone } from "@/components/suyeong/suyeong-finance-card"

interface SuyeongFinanceProgressProps {
  benchmarkAmount: number
  benchmarkLabel: string
  tone: FinanceCardTone
  value: number
}

export function SuyeongFinanceProgress({
  benchmarkAmount,
  benchmarkLabel,
  tone,
  value,
}: SuyeongFinanceProgressProps) {
  const roundedValue = Math.round(value * 10) / 10
  const boundedValue = Math.min(Math.max(roundedValue, 0), 100)

  return (
    <div className="sy-finance-progress" data-tone={tone}>
      <div className="sy-finance-progress__meta">
        <span>
          {benchmarkLabel}
          <strong title={formatCurrency(benchmarkAmount)}>
            {formatKoreanCurrency(benchmarkAmount)}
          </strong>
        </span>
        <strong>{roundedValue.toFixed(1)}%</strong>
      </div>
      <div
        className="sy-finance-progress__track"
        role="progressbar"
        aria-label={`${benchmarkLabel} 대비`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={roundedValue}
      >
        <span style={{ width: `${boundedValue}%` }} />
      </div>
    </div>
  )
}
