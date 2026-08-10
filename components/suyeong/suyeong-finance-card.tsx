import { ArrowRight } from "lucide-react"
import {
  formatCurrency,
  formatKoreanCurrency,
} from "@/components/suyeong/suyeong-formatters"

export type FinanceCardTone = "income" | "expense"

interface SuyeongFinanceCardProps {
  actionHref: string
  actionLabel: string
  detailAmount: number
  detailLabel: string
  heading: string
  headingId: string
  tone: FinanceCardTone
  totalAmount: number
  totalLabel: string
}

export function SuyeongFinanceCard({
  actionHref,
  actionLabel,
  detailAmount,
  detailLabel,
  heading,
  headingId,
  tone,
  totalAmount,
  totalLabel,
}: SuyeongFinanceCardProps) {
  return (
    <div className="sy-finance-column" data-tone={tone}>
      <div className="sy-finance-column__heading">
        <h2 id={headingId}>{heading}</h2>
        <a className="sy-finance-column__action" href={actionHref}>
          {actionLabel} <ArrowRight aria-hidden="true" />
        </a>
      </div>
      <article className="sy-cumulative-card" data-tone={tone} aria-labelledby={headingId}>
        <span className="sy-cumulative-card__label">{totalLabel}</span>
        <strong className="sy-cumulative-card__amount" title={formatCurrency(totalAmount)}>
          {formatKoreanCurrency(totalAmount)}
        </strong>
        <div className="sy-cumulative-card__detail">
          <span>{detailLabel}</span>
          <strong title={formatCurrency(detailAmount)}>
            {formatKoreanCurrency(detailAmount)}
          </strong>
        </div>
      </article>
    </div>
  )
}
