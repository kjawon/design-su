import { useEffect, useState } from "react"
import type { DailyFinanceRecord } from "@/components/suyeong/suyeong-data"
import {
  formatCurrency,
  formatKoreanCurrency,
} from "@/components/suyeong/suyeong-formatters"

interface SuyeongDailyFinanceTickerProps {
  records: readonly DailyFinanceRecord[]
}

export function SuyeongDailyFinanceTicker({ records }: SuyeongDailyFinanceTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [hasRotated, setHasRotated] = useState(false)

  useEffect(() => {
    if (
      isPaused ||
      records.length <= 1 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }

    const intervalId = window.setInterval(() => {
      setHasRotated(true)
      setCurrentIndex((index) => (index + 1) % records.length)
    }, 4000)

    return () => window.clearInterval(intervalId)
  }, [isPaused, records.length])

  const currentRecord = records[currentIndex] ?? records[0]
  if (!currentRecord) return null

  return (
    <aside
      className={`sy-daily-ticker${isPaused ? " is-paused" : ""}`}
      aria-label="최근 일별 세입·세출"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="sy-daily-ticker__label">
        <span>최근 일별 현황</span>
      </div>
      <div className="sy-daily-ticker__viewport" aria-live="polite" aria-atomic="true">
        <div
          className={`sy-daily-ticker__item${hasRotated ? "" : " is-initial"}`}
          key={`${currentRecord.date}-${currentIndex}`}
        >
          <span
            className="sy-daily-ticker__accounting"
            data-type={currentRecord.accountingType}
          >
            {currentRecord.accountingType}
          </span>
          <time dateTime={currentRecord.date.replaceAll(".", "-")}>
            {currentRecord.date.slice(5)}
          </time>
          <span className="sy-daily-ticker__metric" data-tone="income">
            세입
            <strong title={formatCurrency(currentRecord.income)}>
              {formatKoreanCurrency(currentRecord.income)}
            </strong>
          </span>
          <i aria-hidden="true" />
          <span className="sy-daily-ticker__metric" data-tone="expense">
            세출
            <strong title={formatCurrency(currentRecord.expense)}>
              {formatKoreanCurrency(currentRecord.expense)}
            </strong>
          </span>
        </div>
      </div>
    </aside>
  )
}
