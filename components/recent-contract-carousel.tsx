import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { ContractDataCard } from "@/components/contract-data-card"
import { contracts } from "@/components/portal-data"
import { Button } from "@/components/ui/button"

type ContractType = "전체" | "공사" | "용역" | "물품"
type SearchRequest = { field: string; query: string }

const filters: ContractType[] = ["전체", "공사", "용역", "물품"]

export function RecentContractCarousel({ search }: { search: SearchRequest }) {
  const [filter, setFilter] = useState<ContractType>("전체")
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const settleTimerRef = useRef<number | undefined>(undefined)

  const visible = contracts.filter((contract) => {
    if (filter !== "전체" && contract.type !== filter) return false
    const query = search.query.trim().toLowerCase()
    if (!query) return true
    return (search.field === "업체명" ? contract.partner : `${contract.title} ${contract.type} ${contract.partner}`).toLowerCase().includes(query)
  })
  const carouselItems = visible.length > 1 ? [...visible, ...visible] : visible

  useEffect(() => {
    setActiveIndex(0)
    carouselRef.current?.scrollTo({ left: 0 })
  }, [filter, search])

  const syncInfinitePosition = useCallback(() => {
    const carousel = carouselRef.current
    const firstCard = carousel?.firstElementChild as HTMLElement | null
    if (!carousel || !firstCard || visible.length <= 1) return
    const cardWidth = firstCard.offsetWidth + 16
    const loopWidth = cardWidth * visible.length
    if (carousel.scrollLeft >= loopWidth - 1) carousel.scrollLeft -= loopWidth
    setActiveIndex(Math.round(carousel.scrollLeft / cardWidth) % visible.length)
  }, [visible.length])

  const move = useCallback((direction: number) => {
    const carousel = carouselRef.current
    const firstCard = carousel?.firstElementChild as HTMLElement | null
    if (!carousel || !firstCard || visible.length <= 1) return
    const cardWidth = firstCard.offsetWidth + 16
    const loopWidth = cardWidth * visible.length
    if (direction < 0 && carousel.scrollLeft <= 1) carousel.scrollLeft = loopWidth
    carousel.scrollBy({ left: direction * cardWidth, behavior: "smooth" })
    window.clearTimeout(settleTimerRef.current)
    settleTimerRef.current = window.setTimeout(syncInfinitePosition, 650)
  }, [syncInfinitePosition, visible.length])

  useEffect(() => {
    if (paused || visible.length <= 1) return
    const timer = window.setInterval(() => move(1), 3000)
    return () => window.clearInterval(timer)
  }, [move, paused, visible.length])

  useEffect(() => () => window.clearTimeout(settleTimerRef.current), [])

  return (
    <section aria-labelledby="recent-contracts-title" className="border-t border-border bg-section px-4 py-7 md:px-6 md:py-8">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="recent-contracts-title" className="text-2xl font-extrabold tracking-tight text-text-primary">최근 계약 내역</h2>
          <p className="mt-1.5 text-sm text-text-secondary">오늘 체결된 최신 계약 데이터를 확인하세요.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <div role="tablist" aria-label="계약 유형 필터" className="flex rounded-xl border border-border bg-card p-1">
            {filters.map((item) => (
              <button key={item} type="button" role="tab" aria-selected={filter === item} onClick={() => setFilter(item)} className={filter === item ? "rounded-lg bg-blue-primary px-4 py-2 text-xs font-bold text-primary-foreground" : "rounded-lg px-4 py-2 text-xs font-semibold text-text-secondary transition hover:bg-[#EAF4FD] hover:text-blue-primary"}>{item}</button>
            ))}
          </div>
          <div className="flex gap-1">
            <Button type="button" variant="outline" size="icon-sm" aria-label="이전 계약" onClick={() => move(-1)} className="rounded-full bg-card"><ChevronLeft /></Button>
            <Button type="button" variant="outline" size="icon-sm" aria-label="다음 계약" onClick={() => move(1)} className="rounded-full bg-card"><ChevronRight /></Button>
          </div>
        </div>
      </div>

      {visible.length > 0 ? (
        <>
          <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => { setPaused(false); setHoveredIndex(null) }} onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false) }}>
            <div ref={carouselRef} className="recent-contract-carousel flex snap-x snap-mandatory gap-4 overflow-x-auto py-1">
              {carouselItems.map((contract, index) => (
                <div key={`${contract.title}-${index}`} aria-hidden={index >= visible.length} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} className={`recent-contract-slide transition-all duration-300 ${hoveredIndex !== null && hoveredIndex !== index ? "scale-[0.97] opacity-45 blur-[2px]" : "relative z-10 opacity-100 blur-none"}`}>
                  <ContractDataCard contract={contract} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex justify-center gap-2" aria-label="최근 계약 위치">
            {visible.map((contract, index) => <span key={contract.title} className={activeIndex === index ? "h-2.5 w-7 rounded-full bg-blue-dark transition-all" : "size-2.5 rounded-full bg-sky-primary transition-all"} />)}
          </div>
        </>
      ) : (
        <div className="flex min-h-48 items-center justify-center rounded-2xl border border-dashed border-border bg-card text-sm text-text-secondary">검색 조건에 맞는 최근 계약이 없습니다.</div>
      )}

      <div className="mt-6 flex justify-center">
        <Button variant="outline" className="border-blue-primary/40 bg-card text-blue-dark hover:bg-[#EAF4FD]">전체 계약 내역 더보기<ArrowRight className="size-4" /></Button>
      </div>
    </section>
  )
}
