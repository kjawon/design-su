import { ArrowRight } from "lucide-react"
import { formatCurrency, formatKoreanCurrency } from "@/components/suyeong/utils/currency"
import "./SuyeongFinanceCard.css"

export type FinanceCardTone = "income" | "expense"

interface SuyeongFinanceCardProps {
  actionHref: string
  heading: string
  headingId: string
  tone: FinanceCardTone
  totalAmount: number
  totalLabel: string
}

export function SuyeongFinanceCard({
  actionHref,
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
      </div>
      <article className="sy-cumulative-card" data-tone={tone} aria-labelledby={headingId}>
        <span className="sy-cumulative-card__label">{totalLabel}</span>
        <strong className="sy-cumulative-card__amount" title={formatCurrency(totalAmount)}>
          {formatKoreanCurrency(totalAmount)}
        </strong>
        <div className="sy-cumulative-card__footer">
          <a
            className="sy-cumulative-card__action"
            href={actionHref}
            aria-label={`${heading} 상세보기`}
          >
            상세보기
            <span className="sy-cumulative-card__action-icon" aria-hidden="true">
              <ArrowRight strokeWidth={2.8} />
            </span>
          </a>
        </div>
      </article>
    </div>
  )
}
