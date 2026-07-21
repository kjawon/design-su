import { FormEvent, useRef, useState } from "react"
import { ArrowRight, Bell, ChevronLeft, ChevronRight, ClipboardCheck, FileText, Landmark, Link2, Search, Scale, WalletCards } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { notices } from "@/components/portal-data"
import { RecentContractCarousel } from "@/components/recent-contract-carousel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type HubItem = { title: string; description: string; links?: string[]; icon: LucideIcon; accent: string; iconStyle: string; arrowStyle: string; actionStyle?: string }

const contractItems: HubItem[] = [
  { title: "발주·입찰정보", description: "예정된 발주와 진행 중인 입찰 내역입니다.", links: ["발주계획", "입찰공고", "개찰결과"], icon: ClipboardCheck, accent: "border-t-purple-primary", iconStyle: "bg-purple-light text-purple-primary", arrowStyle: "text-purple-primary", actionStyle: "border-purple-primary/25 bg-purple-light text-purple-primary hover:bg-purple-primary hover:text-white" },
  { title: "계약현황", description: "성남시에서 체결한 유형별 계약 내역입니다.", links: ["공사 계약", "용역 계약", "물품 계약"], icon: Landmark, accent: "border-t-[#3197A6]", iconStyle: "bg-[#E7F5F7] text-[#277D89]", arrowStyle: "text-[#3197A6]", actionStyle: "border-[#3197A6]/25 bg-[#E7F5F7] text-[#277D89] hover:bg-[#3197A6] hover:text-white" },
  { title: "대금지급", description: "계약별 대금지급과 업체별 지급 내역입니다.", links: ["지급현황", "업체별 지급조회", "대금지급 안내"], icon: WalletCards, accent: "border-t-blue-primary", iconStyle: "bg-[#EAF4FD] text-blue-primary", arrowStyle: "text-blue-primary", actionStyle: "border-blue-primary/25 bg-[#EAF4FD] text-blue-dark hover:bg-blue-primary hover:text-white" },
]

const resourceItems: HubItem[] = [
  { title: "계약서식", description: "계약업무에 자주 사용하는 서식을 확인하세요.", links: ["표준계약서", "청렴계약 서식", "기타 계약서식"], icon: FileText, accent: "border-t-blue-primary", iconStyle: "bg-[#EAF4FD] text-blue-primary", arrowStyle: "text-blue-primary", actionStyle: "border-blue-primary/25 bg-[#EAF4FD] text-blue-dark hover:bg-blue-primary hover:text-white" },
  { title: "계약법규", description: "계약 관련 법령과 업무 지침을 확인하세요.", links: ["지방계약법", "지방계약법 시행령", "계약예규"], icon: Scale, accent: "border-t-purple-primary", iconStyle: "bg-purple-light text-purple-primary", arrowStyle: "text-purple-primary", actionStyle: "border-purple-primary/25 bg-purple-light text-purple-primary hover:bg-purple-primary hover:text-white" },
  { title: "관련사이트", description: "계약업무와 관련된 유관기관 사이트로 이동하세요.", links: ["나라장터", "성남시청", "국가법령정보센터"], icon: Link2, accent: "border-t-red-primary", iconStyle: "bg-red-light text-red-strong", arrowStyle: "text-red-primary", actionStyle: "border-red-primary/25 bg-red-light text-red-strong hover:bg-red-primary hover:text-white" },
]

const noticeItems: HubItem[] = notices.map(([title, date]) => ({
  title,
  description: date,
  links: ["공지 내용 확인"],
  icon: Bell,
  accent: "border-t-blue-primary",
  iconStyle: "bg-[#EAF4FD] text-blue-primary",
  arrowStyle: "text-blue-primary",
  actionStyle: "border-blue-primary/25 bg-[#EAF4FD] text-blue-dark hover:bg-blue-primary hover:text-white",
}))

const hubTabs = [
  { title: "계약정보", description: "성남시의 발주, 계약 및 대금지급 서비스를 확인하세요.", items: contractItems },
  { title: "계약자료", description: "계약업무에 필요한 서식과 법규, 관련 사이트를 확인하세요.", items: resourceItems },
  { title: "공지사항", description: "계약정보공개시스템의 새로운 소식을 확인하세요.", items: noticeItems },
]

function HubCard({ item }: { item: HubItem }) {
  const Icon = item.icon
  return (
    <article className={`hub-carousel-card hub-carousel-card-detailed group relative rounded-2xl border border-border border-t-4 ${item.accent} bg-card p-5 transition duration-200 hover:-translate-y-0.5 hover:border-blue-primary/35 md:p-6`}>
      <a href="#" aria-label={`${item.title} 바로가기`} className="absolute inset-0 z-0 rounded-2xl" />
      <div className="pointer-events-none relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <span className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${item.iconStyle}`}><Icon className="size-6" strokeWidth={1.9} /></span>
          <ArrowRight className={`size-5 shrink-0 transition-transform group-hover:translate-x-0.5 ${item.arrowStyle}`} />
        </div>
        <h3 className="mt-5 line-clamp-2 text-xl font-extrabold text-text-primary">{item.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-secondary">{item.description}</p>
        {item.links && (
          <div className="mt-auto flex flex-col gap-2.5 pt-6">
            {item.links.map((link) => (
              <a key={link} href="#" className={`pointer-events-auto flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-bold transition ${item.actionStyle}`}>
                {link}<ArrowRight className="size-4" />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export function ServiceBoard() {
  const [activeTab, setActiveTab] = useState(0)
  const [searchType, setSearchType] = useState("계약정보")
  const [query, setQuery] = useState("")
  const [searchRequest, setSearchRequest] = useState({ field: "계약정보", query: "" })
  const carouselRef = useRef<HTMLDivElement>(null)
  const activeContent = hubTabs[activeTab]

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!query.trim()) return
    setSearchRequest({ field: searchType, query: query.trim() })
    window.dispatchEvent(new CustomEvent("contract-search", { detail: { field: searchType, query: query.trim() } }))
  }

  const selectTab = (index: number) => {
    setActiveTab(index)
    window.requestAnimationFrame(() => carouselRef.current?.scrollTo({ left: 0, behavior: "smooth" }))
  }

  const moveCarousel = (direction: number) => {
    const carousel = carouselRef.current
    if (!carousel) return
    carousel.scrollBy({ left: direction * carousel.clientWidth * 0.82, behavior: "smooth" })
  }

  return (
    <section id="services" aria-labelledby="services-title" className="bg-page py-8 md:py-10">
      <div className="mx-auto max-w-[1530px] px-5 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="brand-search flex flex-col gap-3 px-5 py-3 text-primary-foreground lg:flex-row lg:items-center lg:justify-between md:px-7">
            <h1 id="services-title" className="shrink-0 text-xl font-extrabold tracking-tight md:text-2xl">성남시 계약정보, 한 번에 찾아보세요.</h1>
            <form onSubmit={submit} className="flex min-w-0 flex-1 items-center rounded-full bg-card p-0.5 pl-4 shadow-sm lg:max-w-[42rem]">
              <select value={searchType} onChange={(event) => setSearchType(event.target.value)} aria-label="검색 유형" className="h-9 shrink-0 border-0 bg-transparent pr-3 text-xs font-bold text-text-primary outline-none">
                <option>계약정보</option>
                <option>업체명</option>
              </select>
              <span className="mx-2 h-6 w-px bg-border" aria-hidden="true" />
              <Input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="계약 검색어" placeholder="검색어를 입력해주세요." className="h-9 min-w-0 border-0 bg-transparent text-sm text-text-primary shadow-none focus-visible:ring-0" />
              <Button type="submit" size="icon" aria-label="검색" className="size-9 shrink-0 rounded-full"><Search className="size-4" /></Button>
            </form>
          </div>

          <div className="bg-[#EAF6FE] px-4 pb-5 pt-4 md:px-6 md:pb-6">
            <div role="tablist" aria-label="주요 서비스 선택" className="hub-tabs flex gap-2 overflow-x-auto overflow-y-hidden px-1 pt-1">
              {hubTabs.map((tab, index) => (
                <button key={tab.title} type="button" role="tab" aria-selected={activeTab === index} aria-controls="hub-tab-panel" onClick={() => selectTab(index)} className={activeTab === index ? "relative z-10 -mb-px min-w-max rounded-t-xl border border-blue-primary border-b-card bg-card px-6 py-3 text-sm font-bold text-blue-dark" : "min-w-max rounded-t-xl border border-border bg-[#F4F8FC] px-6 py-3 text-sm font-bold text-text-secondary transition hover:bg-card hover:text-blue-primary"}>
                  {tab.title}
                </button>
              ))}
            </div>

            <div id="hub-tab-panel" role="tabpanel" className="rounded-b-2xl rounded-tr-2xl border border-border bg-[#F8FBFE] p-4 md:p-5">
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-sm text-text-secondary">{activeContent.description}</p>
                <div className="flex shrink-0 gap-1">
                  <Button type="button" variant="outline" size="icon-sm" aria-label="이전 항목" onClick={() => moveCarousel(-1)} className="rounded-full bg-card"><ChevronLeft /></Button>
                  <Button type="button" variant="outline" size="icon-sm" aria-label="다음 항목" onClick={() => moveCarousel(1)} className="rounded-full bg-card"><ChevronRight /></Button>
                </div>
              </div>
              <div ref={carouselRef} className="hub-carousel flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1">
                {activeContent.items.map((item) => <HubCard key={item.title} item={item} />)}
              </div>
            </div>
          </div>

          <RecentContractCarousel search={searchRequest} />
        </div>
      </div>
    </section>
  )
}
