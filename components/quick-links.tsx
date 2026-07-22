import { ArrowRight } from "lucide-react"
import { frequentlyUsed } from "@/components/portal-data"

const quickLinks = [
  frequentlyUsed.find(({ title }) => title === "계약법규")!,
  frequentlyUsed.find(({ title }) => title === "계약서식")!,
  frequentlyUsed.find(({ title }) => title === "관련사이트")!,
]

export function QuickLinks() {
  return (
    <section aria-labelledby="quick-links-title" className="flex min-w-0 flex-col lg:border-l lg:border-border lg:pl-8">
      <div className="flex h-14 items-center border-b border-border">
        <h2 id="quick-links-title" className="text-xl font-extrabold text-text-primary">자주 찾는 정보</h2>
      </div>
      <ul className="mt-4 flex flex-1 flex-col gap-3">
        {quickLinks.map(({ title, description, icon: Icon }, index) => (
          <li key={title} className="flex flex-1">
            <a href="#" data-quick-link={index + 1} className="quick-link group flex min-h-11 w-full items-center gap-3 rounded-xl border border-border bg-card p-3.5 transition">
              <span className="quick-link-icon flex size-11 shrink-0 items-center justify-center rounded-xl"><Icon className="size-5" aria-hidden="true" /></span>
              <span className="min-w-0 flex-1">
                <strong className="block text-sm font-bold text-text-primary">{title} 확인하기</strong>
                <span className="mt-0.5 block text-xs text-text-secondary">{description}</span>
              </span>
              <ArrowRight className="quick-link-arrow size-4 shrink-0 transition group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
