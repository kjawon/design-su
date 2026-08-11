import { ArrowRight } from "lucide-react"
import {
  formatCurrency,
  formatKoreanCurrency,
} from "@/components/suyeong/suyeong-formatters"
import { SuyeongFinanceProgress } from "@/components/suyeong/suyeong-finance-progress"

export type FinanceCardTone = "income" | "expense"

interface SuyeongFinanceCardProps {
  actionHref: string
  actionLabel: string
  benchmarkAmount: number
  benchmarkLabel: string
  heading: string
  headingId: string
  tone: FinanceCardTone
  totalAmount: number
  totalLabel: string
}

export function SuyeongFinanceCard({
  actionHref,
  actionLabel,
  benchmarkAmount,
  benchmarkLabel,
  heading,
  headingId,
  tone,
  totalAmount,
  totalLabel,
}: SuyeongFinanceCardProps) {
  const progressValue = (totalAmount / benchmarkAmount) * 100

  return (
    <div className="sy-finance-column" data-tone={tone}>
      <div className="sy-finance-column__heading">
        <h2 id={headingId}>{heading}</h2>
        <a className="sy-finance-column__action" href={actionHref}>
          {actionLabel} <ArrowRight aria-hidden="true" />
        </a>
      </div>
      <article className="sy-cumulative-card" data-tone={tone} aria-labelledby={headingId}>
        <strong className="sy-cumulative-card__amount" title={formatCurrency(totalAmount)}>
          {formatKoreanCurrency(totalAmount)}
        </strong>
        <span className="sy-cumulative-card__label">{totalLabel}</span>
        <SuyeongFinanceProgress
          benchmarkAmount={benchmarkAmount}
          benchmarkLabel={benchmarkLabel}
          tone={tone}
          value={progressValue}
        />
      </article>
    </div>
  )
}
