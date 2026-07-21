import { ArrowRight } from "lucide-react"
import { frequentlyUsed, notices } from "@/components/portal-data"

const quickLinkStyles = [
  "bg-blue-light text-blue-primary",
  "bg-purple-light text-purple-primary",
  "bg-red-light text-red-strong",
]

export function NoticeSection() {
  return (
    <div className="min-w-0">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <h2 className="text-xl font-extrabold text-text-primary">공지사항</h2>
        <a href="#" className="flex items-center gap-1 text-xs font-bold text-blue-primary hover:text-blue-dark">전체보기<ArrowRight className="size-3.5" /></a>
      </div>
      <ul>
        {notices.map(([title, date]) => (
          <li key={title} className="border-b border-border/80 last:border-0">
            <a href="#" className="flex items-center justify-between gap-5 rounded-lg px-2 py-4 transition hover:bg-section">
              <span className="min-w-0 truncate text-sm font-medium text-text-primary">{title}</span>
              <time className="shrink-0 text-xs text-text-secondary">{date}</time>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ContractQuickLinks() {
  return (
    <div className="min-w-0 lg:border-l lg:border-border lg:pl-8">
      <h2 className="border-b border-border pb-4 text-xl font-extrabold text-text-primary">자주 찾는 정보</h2>
      <div className="mt-4 flex flex-col gap-3">
        {frequentlyUsed.slice(0, 3).map(({ title, description, icon: Icon }, index) => (
          <a href="#" key={title} className="group flex items-center gap-3 rounded-xl border border-border bg-card p-3.5 transition hover:-translate-y-0.5 hover:border-blue-primary/40 hover:bg-[#FBFDFF]">
            <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${quickLinkStyles[index]}`}><Icon className="size-5" /></span>
            <span className="min-w-0 flex-1">
              <strong className="block text-sm font-bold text-text-primary">{title}</strong>
              <span className="mt-0.5 block truncate text-xs text-text-secondary">{description}</span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-text-muted transition group-hover:translate-x-0.5 group-hover:text-blue-primary" />
          </a>
        ))}
      </div>
    </div>
  )
}

export function PortalInformation() {
  return (
    <section id="information" className="border-t border-border bg-card py-12 md:py-14">
      <div className="mx-auto grid max-w-[1200px] items-stretch gap-8 px-5 lg:grid-cols-[1.65fr_0.9fr] lg:px-8">
        <NoticeSection />
        <ContractQuickLinks />
      </div>
    </section>
  )
}
