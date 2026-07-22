import { ArrowRight } from "lucide-react"
import { contracts } from "@/components/portal-data"
import { Badge } from "@/components/ui/badge"

export function StructuredContractList() {
  return (
    <section aria-labelledby="recent-contracts-title" className="min-w-0 lg:col-span-3 lg:border-r lg:border-border lg:pr-6">
      <div className="flex h-14 items-center justify-between border-b border-border">
        <h2 id="recent-contracts-title" className="text-xl font-extrabold text-text-primary">최근 계약정보</h2>
        <a href="#" className="krds-text-link inline-flex min-h-11 items-center gap-1 text-sm font-bold text-primary-700">
          전체 계약정보 보기<ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </div>
      <ul aria-label="최근 계약정보 목록" className="lg:flex lg:h-[calc(348px+2.5rem)] lg:flex-col">
        {contracts.slice(0, 5).map((contract, index) => {
          const type = contract.type || "-"
          const title = contract.title || "-"
          const amount = contract.amount || "-"
          const date = contract.date || "-"
          return (
            <li key={`${title}-${index}`} className="min-h-16 border-b border-gray-300 last:border-0 lg:min-h-0 lg:flex-1">
              <div className="contract-list-row grid h-full grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2 rounded-md px-2 py-2 sm:grid-cols-[4rem_minmax(0,1fr)_8.5rem_6rem] lg:py-0">
                <Badge data-contract-type={type} className="contract-tag aspect-square size-12 max-h-full max-w-full shrink-0 justify-self-center rounded-full px-0 py-0 text-sm font-bold leading-none lg:h-4/5 lg:w-auto">{type}</Badge>
                <a href="#" className="krds-contract-link min-w-0 text-[18px] font-medium text-text-primary sm:truncate" aria-label={`${title} 계약 상세보기`}>
                  {title}
                </a>
                <strong className="w-full text-right text-sm text-primary-700 max-sm:col-start-2">{amount}</strong>
                <time className="text-xs text-text-muted max-sm:col-start-2 sm:text-right">{date}</time>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
