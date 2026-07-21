import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowRight, ChevronLeft, ChevronRight, Search } from "lucide-react"
import contractDoctorImage from "@/계약박사 리뉴얼.png"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { contracts, frequentlyUsed, notices, services } from "@/components/portal-data"

function ContractCard({ contract, featured = false, compact = false }: { contract: (typeof contracts)[number]; featured?: boolean; compact?: boolean }) {
  return (
    <Card size={compact ? "sm" : "default"} className={featured ? "h-full border-border-hover shadow-sm" : "contract-card h-full transition-all duration-200 hover:-translate-y-1"}>
      <CardHeader className={compact ? "gap-0" : undefined}>
        <div className="flex items-center justify-between gap-3"><Badge data-contract-type={contract.type} className="contract-tag">{contract.type}</Badge><span className="text-xs text-text-secondary">{contract.date}</span></div>
        <CardTitle className={compact ? "line-clamp-2 min-h-8 text-xs font-semibold leading-snug text-text-primary" : "line-clamp-3 min-h-16 text-sm font-semibold text-text-primary"}>{contract.title}</CardTitle>
      </CardHeader>
      <CardContent className={compact ? "mt-auto flex min-h-8 items-end justify-between gap-2" : "mt-auto flex min-h-14 items-end justify-between gap-3"}>
        <div className="flex min-w-0 flex-col gap-1"><span className="text-xs text-text-secondary">계약상대자</span><span className="line-clamp-2 text-xs text-text-primary">{contract.partner}</span></div>
        <div className="flex shrink-0 flex-col items-end gap-1"><span className="text-xs text-text-secondary">계약금액</span><strong className="whitespace-nowrap text-sm text-brand-primary-dark">{contract.amount}</strong></div>
      </CardContent>
    </Card>
  )
}

export function HeroSection() {
  const [recentIndex, setRecentIndex] = useState(0)
  const [recentPaused, setRecentPaused] = useState(false)
  const openAssistant = () => window.dispatchEvent(new Event("open-contract-assistant"))

  useEffect(() => {
    if (recentPaused) return
    const timer = window.setInterval(() => setRecentIndex((current) => (current + 1) % contracts.length), 3000)
    return () => window.clearInterval(timer)
  }, [recentPaused])

  const moveRecent = (direction: number) => {
    setRecentIndex((current) => (current + direction + contracts.length) % contracts.length)
  }

  const getSlidePosition = (index: number) => {
    const distance = (index - recentIndex + contracts.length) % contracts.length
    if (distance === 0) return "left-1/2 z-30 w-[78%] -translate-x-1/2 scale-100 opacity-100 blur-none"
    if (distance === 1) return "right-0 z-20 w-[60%] translate-x-[18%] scale-[0.86] opacity-40 blur-[2px]"
    if (distance === contracts.length - 1) return "left-0 z-20 w-[60%] -translate-x-[18%] scale-[0.86] opacity-40 blur-[2px]"
    return "left-1/2 z-0 w-[50%] -translate-x-1/2 scale-75 opacity-0 blur-sm pointer-events-none"
  }

  return (
    <section id="services" className="bg-background">
      <div className="mx-auto max-w-7xl px-5 pb-5 pt-6 lg:px-8 lg:pb-6">
        <div className="grid items-stretch gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(14rem,0.28fr)]">
          <div className="brand-search flex flex-col overflow-hidden rounded-2xl text-primary-foreground lg:col-start-1">
            <div className="flex px-5 py-4 md:px-7">
              <div className="flex w-full flex-col justify-center gap-3 md:flex-row md:items-center md:gap-6">
                <h1 className="shrink-0 text-xl font-extrabold tracking-tight md:whitespace-nowrap md:text-2xl">성남시 계약정보, 한 번에 찾아보세요</h1>
                <form className="brand-search-field flex min-w-0 flex-1 items-center rounded-full bg-card p-1 pl-4 shadow-sm transition-shadow" onSubmit={(event) => event.preventDefault()}>
                  <select aria-label="검색 분야" className="h-9 shrink-0 border-0 bg-transparent pr-3 text-sm font-semibold text-foreground outline-none">
                    <option>계약정보</option>
                    <option>입찰정보</option>
                    <option>대금지급</option>
                  </select>
                  <span className="mx-2 h-6 w-px bg-border" aria-hidden="true" />
                  <Input aria-label="계약 검색" placeholder="검색어를 입력해주세요." className="h-9 min-w-0 border-0 bg-transparent text-foreground shadow-none focus-visible:ring-0" />
                  <Button type="submit" size="icon-lg" aria-label="검색" className="size-10 shrink-0 rounded-full bg-blue-primary hover:bg-blue-dark"><Search className="size-5" /></Button>
                </form>
              </div>
            </div>
            <nav aria-label="계약 서비스 바로가기" className="grid flex-1 grid-cols-2 gap-3 border-t border-blue-primary/20 bg-sky-light px-3 py-3 sm:grid-cols-5">
                {services.map(({ title, description, icon: Icon }, index) => (
                  <a key={title} href="#" aria-current={index === 1 ? "page" : undefined} title={description} className="service-shortcut group flex min-w-0 flex-col items-center justify-center gap-2 rounded-2xl border px-3 py-3 text-center transition-all hover:-translate-y-0.5">
                    <span className="service-icon flex size-14 items-center justify-center rounded-full transition-transform group-hover:scale-105">
                      <Icon className="size-7" strokeWidth={1.8} />
                    </span>
                    <strong className="whitespace-nowrap text-xs font-bold text-text-primary">{title}</strong>
                  </a>
                ))}
            </nav>
          </div>

          <aside className="flex min-h-72 flex-col items-center justify-center rounded-2xl border-2 border-[var(--ai-border)] bg-purple-light p-5 text-center shadow-[var(--shadow-chatbot)] lg:col-start-2 lg:row-start-1">
            <img src={contractDoctorImage} alt="계약박사" className="w-full max-w-48 rounded-2xl object-contain" />
            <button type="button" onClick={openAssistant} className="ai-action mt-5 w-full rounded-xl px-4 py-3 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5">
              AI계약박사에게 물어보기
            </button>
          </aside>

          <aside className="hidden" aria-hidden="true" aria-label="최근 계약 내역" onMouseEnter={() => setRecentPaused(true)} onMouseLeave={() => setRecentPaused(false)}>
            <div className="mb-1 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-text-primary">최근 계약 내역</h2>
                <p className="mt-0.5 text-xs text-text-secondary">최신 계약 정보를 확인하세요.</p>
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="icon-sm" aria-label="이전 계약" onClick={() => moveRecent(-1)} className="rounded-full bg-card"><ChevronLeft /></Button>
                <Button type="button" variant="outline" size="icon-sm" aria-label="다음 계약" onClick={() => moveRecent(1)} className="rounded-full bg-card"><ChevronRight /></Button>
              </div>
            </div>
            <div className="relative min-h-44 flex-1 overflow-hidden py-1" aria-live="polite">
              {contracts.map((contract, index) => {
                const distance = (index - recentIndex + contracts.length) % contracts.length
                const isPrevious = distance === contracts.length - 1
                const isNext = distance === 1
                return (
                  <button key={contract.title} type="button" aria-label={`${contract.title}${distance === 0 ? ", 현재 계약" : ""}`} aria-hidden={distance !== 0 && !isPrevious && !isNext} tabIndex={distance === 0 || isPrevious || isNext ? 0 : -1} onClick={() => { if (isPrevious) moveRecent(-1); if (isNext) moveRecent(1) }} className={`absolute top-1 h-[calc(100%-0.5rem)] text-left transition-all duration-500 ease-out ${getSlidePosition(index)} ${distance === 0 ? "cursor-default shadow-[var(--shadow-contract-hover)]" : "cursor-pointer shadow-lg"}`}>
                    <ContractCard contract={contract} featured={distance === 0} compact />
                  </button>
                )
              })}
            </div>
            <div className="mt-1 flex justify-center gap-1.5" aria-label="최근 계약 위치">
              {contracts.map((contract, index) => <span key={contract.title} className={index === recentIndex ? "h-2 w-5 rounded-full bg-brand-primary-hover transition-all" : "size-2 rounded-full bg-border-strong transition-all"} />)}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

export function RecentContractsSection() {
  const [filter, setFilter] = useState("전체")
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const settleTimerRef = useRef<number | undefined>(undefined)
  const visible = filter === "전체" ? contracts : contracts.filter((contract) => contract.type === filter)
  const carouselItems = visible.length > 1 ? [...visible, ...visible] : visible
  const cardWidthClass = visible.length === 1
    ? "min-w-full"
    : visible.length === 2
      ? "min-w-full sm:min-w-1/2"
      : visible.length >= 5
        ? "min-w-full sm:min-w-1/2 lg:min-w-1/3 xl:min-w-1/5"
        : "min-w-full sm:min-w-1/2 lg:min-w-1/3"

  const selectFilter = (item: string) => {
    setFilter(item)
    setActiveIndex(0)
  }

  const syncInfinitePosition = useCallback(() => {
    const carousel = carouselRef.current
    if (!carousel || visible.length <= 1) return

    const loopWidth = carousel.scrollWidth / 2
    if (carousel.scrollLeft >= loopWidth - 1) carousel.scrollLeft -= loopWidth

    const cardWidth = loopWidth / visible.length
    setActiveIndex(Math.round(carousel.scrollLeft / cardWidth) % visible.length)
  }, [visible.length])

  const move = useCallback((direction: number) => {
    const carousel = carouselRef.current
    if (!carousel || visible.length <= 1) return

    const loopWidth = carousel.scrollWidth / 2
    const cardWidth = loopWidth / visible.length

    if (direction < 0 && carousel.scrollLeft <= 1) carousel.scrollLeft = loopWidth
    carousel.scrollBy({ left: direction * cardWidth, behavior: "smooth" })

    window.clearTimeout(settleTimerRef.current)
    settleTimerRef.current = window.setTimeout(syncInfinitePosition, 600)
  }, [syncInfinitePosition, visible.length])

  useEffect(() => {
    carouselRef.current?.scrollTo({ left: 0 })
    setActiveIndex(0)
  }, [filter])

  useEffect(() => {
    if (paused || visible.length <= 1) return
    const timer = window.setInterval(() => move(1), 3000)
    return () => window.clearInterval(timer)
  }, [move, paused, visible.length])

  useEffect(() => () => window.clearTimeout(settleTimerRef.current), [])

  return (
    <section id="recent" className="bg-section">
      <div className="mx-auto max-w-7xl px-5 py-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:pr-[4.25rem]">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">최근 계약 내역</h2>
            <p className="mt-2 text-sm text-text-secondary">오늘 체결된 최신 계약 데이터를 확인하세요.</p>
          </div>
          <div className="flex self-start rounded-lg border bg-card p-1 sm:self-auto" role="tablist">
            {["전체", "공사", "용역", "물품"].map((item) => (
              <button key={item} role="tab" aria-selected={filter === item} onClick={() => selectFilter(item)} className={filter === item ? "rounded-md bg-brand-primary px-4 py-2 text-xs font-semibold text-primary-foreground" : "rounded-md px-4 py-2 text-xs text-text-secondary hover:bg-brand-primary-light hover:text-brand-primary-dark"}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="relative" role="region" aria-roledescription="carousel" aria-label="최근 계약 내역" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false) }}>
          <div className="flex items-center gap-1 sm:gap-3">
            {visible.length > 1 && (
              <Button type="button" variant="outline" size="icon-lg" aria-label="이전 계약" onClick={() => move(-1)} className="size-12 shrink-0 rounded-full bg-card shadow-sm">
                <ChevronLeft className="size-6" />
              </Button>
            )}

            <div ref={carouselRef} className="min-w-0 flex-1 overflow-hidden rounded-xl">
              <div className="flex items-stretch">
                {carouselItems.map((contract, index) => (
                  <div
                    key={`${contract.title}-${index}`}
                    className={`${cardWidthClass} self-stretch px-2 py-2 transition-all duration-300 ${hoveredIndex !== null && hoveredIndex !== index % visible.length ? "scale-[0.97] opacity-45 blur-[2px]" : "relative z-10 opacity-100 blur-none"}`}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${(index % visible.length) + 1} / ${visible.length}`}
                    aria-hidden={index >= visible.length}
                    onMouseEnter={() => setHoveredIndex(index % visible.length)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <ContractCard contract={contract} />
                  </div>
                ))}
              </div>
            </div>

            {visible.length > 1 && (
              <Button type="button" variant="outline" size="icon-lg" aria-label="다음 계약" onClick={() => move(1)} className="size-12 shrink-0 rounded-full bg-card shadow-sm">
                <ChevronRight className="size-6" />
              </Button>
            )}
          </div>
        </div>

        <div className="mt-5 flex min-h-3 items-center justify-center gap-2" aria-label="현재 슬라이드">
          {visible.map((contract, index) => (
            <span key={contract.title} aria-label={`${index + 1}번째 계약`} aria-current={activeIndex === index ? "true" : undefined} className={activeIndex === index ? "h-2.5 w-7 rounded-full bg-brand-primary-hover transition-all" : "size-2.5 rounded-full bg-border-strong transition-all"} />
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <Button variant="outline">전체 계약 내역 더보기<ArrowRight data-icon="inline-end" /></Button>
        </div>
      </div>
    </section>
  )
}

export function InformationSections() {
  const featuredResources = frequentlyUsed
    .filter(({ title }) => title === "계약법규" || title === "계약서식")
    .sort((a) => (a.title === "계약법규" ? -1 : 1))

  return (
    <section className="border-t bg-card">
      <div className="mx-auto grid max-w-7xl items-stretch gap-6 px-5 py-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(14rem,0.7fr)] lg:px-8">
        <div className="flex flex-col">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold">공지사항</h2>
            <a href="#" className="text-xs font-semibold text-purple-primary hover:text-purple-dark">전체보기 +</a>
          </div>
          <ul className="flex flex-1 flex-col">
            {notices.map(([title, date]) => (
              <li key={title} className="flex flex-1 items-center justify-between gap-4 border-b py-4">
                <a href="#" className="truncate text-sm text-text-primary hover:text-brand-primary">{title}</a>
                <time className="shrink-0 text-xs text-text-secondary">{date}</time>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid auto-rows-fr gap-3">
          {featuredResources.map(({ title, description, icon: Icon }, index) => (
            <a href="#" key={title} className={index === 0 ? "resource-law group relative flex min-h-36 overflow-hidden rounded-2xl p-6 text-primary-foreground transition-all hover:-translate-y-0.5" : "resource-form group relative flex min-h-36 overflow-hidden rounded-2xl p-6 text-text-primary transition-all hover:-translate-y-0.5"}>
              <Icon className={index === 0 ? "absolute -bottom-4 -right-3 size-28 text-primary-foreground/15 transition-transform group-hover:scale-105" : "absolute -bottom-4 -right-3 size-28 text-blue-dark/15 transition-transform group-hover:scale-105"} />
              <span className="relative z-10 flex w-full flex-col">
                <strong className="text-2xl font-extrabold">{title}</strong>
                <span className={index === 0 ? "mt-2 text-sm leading-relaxed text-primary-foreground/85" : "mt-2 text-sm leading-relaxed text-text-primary/75"}>{description}</span>
                <span className="mt-auto w-fit rounded-lg bg-card px-4 py-2 text-xs font-bold text-brand-primary-dark">상세보기</span>
              </span>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}

export function Footer() {
  return <footer className="bg-text-primary text-primary-foreground"><div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-5 py-12 text-center lg:px-8"><strong className="text-lg">성남시청</strong><nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-footer-text"><a href="#" className="hover:text-ai-secondary">개인정보처리방침</a><a href="#" className="hover:text-ai-secondary">이용약관</a><a href="#" className="hover:text-ai-secondary">이메일무단수집거부</a><a href="#" className="hover:text-ai-secondary">찾아오시는 길</a></nav><p className="text-xs leading-relaxed text-footer-text">(13437) 경기도 성남시 중원구 성남대로 997(여수동 200번지) 성남시청<br />대표전화: 1577-3100 · 평일 09:00 ~ 18:00</p><p className="text-xs text-footer-text">Copyright © Seongnam City. All Rights Reserved.</p></div></footer>
}
