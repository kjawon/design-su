import { ArrowRight } from "lucide-react"
import { contracts } from "@/components/portal-data"
import { Badge } from "@/components/ui/badge"

export function StructuredContractList() {
  return (
    <section aria-labelledby="recent-contracts-title" className="min-w-0">
      <div className="flex h-14 items-center justify-between border-b border-border">
        <h2 id="recent-contracts-title" className="text-xl font-extrabold text-text-primary">최근 계약정보</h2>
        <a href="#" className="krds-text-link inline-flex min-h-11 items-center gap-1 text-sm font-bold text-primary-700">
          전체 계약정보 보기<ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </div>
      <ul aria-label="최근 계약정보 목록">
        {contracts.slice(0, 5).map((contract, index) => {
          const type = contract.type || "-"
          const title = contract.title || "-"
          const amount = contract.amount || "-"
          const date = contract.date || "-"
          return (
            <li key={`${title}-${index}`} className="border-b border-gray-300 last:border-0">
              <div className="contract-list-row grid min-h-14 grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2 rounded-md px-2 py-3 sm:grid-cols-[4rem_minmax(0,1fr)_8.5rem_6rem]">
                <Badge data-contract-type={type} className="contract-tag w-fit shrink-0 px-2.5 py-1 text-sm font-bold leading-none">{type}</Badge>
                <a href="#" className="krds-contract-link min-w-0 font-medium text-text-primary sm:truncate" aria-label={`${title} 계약 상세보기`}>
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
