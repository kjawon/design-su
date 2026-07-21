import { Badge } from "@/components/ui/badge"
import type { contracts } from "@/components/portal-data"

export function ContractDataCard({ contract }: { contract: (typeof contracts)[number] }) {
  return (
    <a href="#" className="contract-data-card group flex min-h-[11.25rem] flex-col rounded-[14px] border border-border bg-card p-5 transition duration-200 hover:-translate-y-0.5 hover:border-blue-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-primary/30">
      <div className="flex items-center justify-between gap-3">
        <Badge data-contract-type={contract.type} className="contract-tag border-0">{contract.type}</Badge>
        <time className="text-xs text-text-secondary">{contract.date}</time>
      </div>
      <h3 className="mt-4 line-clamp-2 min-h-[3.25rem] text-base font-bold leading-relaxed text-text-primary">{contract.title}</h3>
      <dl className="mt-5">
        <dt className="text-xs text-text-secondary">계약상대자</dt>
        <dd className="mt-1 truncate text-sm text-text-primary">{contract.partner}</dd>
      </dl>
      <div className="mt-auto border-t border-border/70 pt-4">
        <strong className="block text-lg font-extrabold text-blue-dark">{contract.amount}</strong>
      </div>
    </a>
  )
}
