"use client"

import { useEffect, useState } from "react"
import { ArrowRight, ChevronLeft, ChevronRight, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { contracts, frequentlyUsed, notices, quickLinks, services } from "@/components/portal-data"

function ContractCard({ contract, featured = false }: { contract: (typeof contracts)[number]; featured?: boolean }) {
  return (
    <Card className={featured ? "border-primary/20 shadow-sm" : "transition-all hover:-translate-y-0.5 hover:shadow-md"}>
      <CardHeader>
        <div className="flex items-center justify-between gap-3"><Badge variant="secondary">{contract.type}</Badge><span className="text-xs text-muted-foreground">{contract.date}</span></div>
        <CardTitle className="min-h-12 text-sm font-semibold">{contract.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1"><span className="text-xs text-muted-foreground">계약상대자</span><span className="text-xs">{contract.partner}</span></div>
        <div className="flex flex-col items-end gap-1"><span className="text-xs text-muted-foreground">계약금액</span><strong className="text-sm text-primary">{contract.amount}</strong></div>
      </CardContent>
    </Card>
  )
}

export function HeroSection() {
  const [index, setIndex] = useState(0)
  useEffect(() => { const timer = window.setInterval(() => setIndex((value) => (value + 1) % contracts.length), 5000); return () => window.clearInterval(timer) }, [])
  const move = (direction: number) => setIndex((index + direction + contracts.length) % contracts.length)

  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.25fr_0.75fr] md:items-center lg:px-8 lg:py-16">
        <div className="flex flex-col items-start gap-5">
          <Badge className="border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground">AI 인텔리전스 서비스</Badge>
          <h1 className="text-balance text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">성남시의 모든 계약을<br />지능적으로 검색하세요</h1>
          <form className="flex w-full max-w-2xl gap-2" onSubmit={(event) => event.preventDefault()}>
            <div className="relative flex-1"><Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" /><Input aria-label="계약 검색" placeholder="예) 최근 3개월 동안 1억 원 이상인 정보화 사업 계약을 찾아줘" className="h-12 border-primary-foreground bg-background pl-11 text-foreground" /></div>
            <Button type="submit" variant="secondary" className="h-12 px-6">검색</Button>
          </form>
          <div className="flex flex-wrap items-center gap-2 text-xs"><span className="font-semibold">추천 검색어:</span>{["지능형 교통체계", "탄천 정비사업", "노후 CCTV 교체"].map((term) => <button key={term} className="rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5 transition-colors hover:bg-primary-foreground/20">{term}</button>)}</div>
        </div>
        <div className="rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 p-5">
          <div className="mb-4 flex items-center justify-between"><h2 className="font-bold">오늘 계약정보</h2><div className="flex gap-2"><Button variant="ghost" size="icon-sm" aria-label="이전 계약" onClick={() => move(-1)} className="text-primary-foreground hover:bg-primary-foreground/10"><ChevronLeft /></Button><Button variant="ghost" size="icon-sm" aria-label="다음 계약" onClick={() => move(1)} className="text-primary-foreground hover:bg-primary-foreground/10"><ChevronRight /></Button></div></div>
          <ContractCard contract={contracts[index]} featured />
          <div className="mt-4 flex justify-center gap-1.5" aria-label="슬라이드 위치">{contracts.map((contract, dot) => <button key={contract.title} onClick={() => setIndex(dot)} aria-label={`${dot + 1}번째 계약 보기`} className={dot === index ? "h-1.5 w-5 rounded-full bg-primary-foreground" : "size-1.5 rounded-full bg-primary-foreground/40"} />)}</div>
        </div>
      </div>
    </section>
  )
}

export function ServiceCards() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="mb-10 text-center"><h2 className="text-3xl font-bold tracking-tight">주요 서비스</h2><p className="mt-3 text-sm text-muted-foreground">시민을 위한 투명하고 신속한 계약 행정 서비스를 제공합니다.</p></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{services.map(({ title, description, icon: Icon }, index) => <Card key={title} className="items-center py-7 text-center transition-all hover:-translate-y-1 hover:shadow-md"><CardHeader className="items-center"><div className={index === 1 ? "mb-3 flex size-12 items-center justify-center rounded-xl bg-accent text-primary" : "mb-3 flex size-12 items-center justify-center rounded-xl bg-muted text-primary"}><Icon className="size-5" /></div><CardTitle className="whitespace-nowrap">{title}</CardTitle><CardDescription className="max-w-xs leading-relaxed">{description}</CardDescription></CardHeader></Card>)}</div>
    </section>
  )
}

export function RecentContractsSection() {
  const [filter, setFilter] = useState("전체")
  const visible = filter === "전체" ? contracts : contracts.filter((contract) => contract.type === filter)
  return (
    <section id="recent" className="bg-muted/60"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-3xl font-bold tracking-tight">최근 계약 내역</h2><p className="mt-2 text-sm text-muted-foreground">오늘 체결된 최신 계약 데이터를 확인하세요.</p></div><div className="flex rounded-lg border bg-background p-1" role="tablist">{["전체", "공사", "용역", "물품"].map((item) => <button key={item} role="tab" aria-selected={filter === item} onClick={() => setFilter(item)} className={filter === item ? "rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground" : "rounded-md px-4 py-2 text-xs text-muted-foreground hover:text-foreground"}>{item}</button>)}</div></div><div className="grid gap-4 md:grid-cols-3">{visible.map((contract) => <ContractCard key={contract.title} contract={contract} />)}</div><div className="mt-8 flex justify-center"><Button variant="outline">전체 계약 내역 더보기<ArrowRight data-icon="inline-end" /></Button></div></div></section>
  )
}

export function InformationSections() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><h2 className="mb-8 text-xl font-bold">계약 관련 정보를 한눈에 확인하세요</h2><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{quickLinks.map(({ label, icon: Icon }) => <a key={label} href="#" className="flex items-center gap-4 rounded-xl border bg-card p-5 font-semibold transition-colors hover:bg-muted"><span className="flex size-9 items-center justify-center rounded-full bg-muted text-primary"><Icon className="size-4" /></span>{label}<ArrowRight className="ml-auto size-4 text-muted-foreground" /></a>)}</div></section>
      <section className="border-t"><div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 lg:px-8"><div><div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-bold">공지사항</h2><a href="#" className="text-xs text-muted-foreground hover:text-foreground">전체보기 +</a></div><ul>{notices.map(([title, date]) => <li key={title} className="flex items-center justify-between gap-4 border-b py-4"><a href="#" className="truncate text-sm hover:text-primary">{title}</a><time className="shrink-0 text-xs text-muted-foreground">{date}</time></li>)}</ul></div><div><h2 className="mb-5 text-xl font-bold">자주 찾는 정보</h2><div className="grid gap-3 sm:grid-cols-2">{frequentlyUsed.map(({ title, description, icon: Icon }) => <a href="#" key={title} className="flex gap-3 rounded-xl bg-muted p-4 transition-colors hover:bg-accent"><Icon className="mt-0.5 size-4 shrink-0 text-primary" /><span><strong className="block text-sm">{title}</strong><span className="mt-1 block text-xs text-muted-foreground">{description}</span></span></a>)}</div></div></div></section>
    </>
  )
}

export function Footer() {
  return <footer className="bg-foreground text-background"><div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-5 py-12 text-center lg:px-8"><strong className="text-lg">성남시청</strong><nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs opacity-80"><a href="#">개인정보처리방침</a><a href="#">이용약관</a><a href="#">이메일무단수집거부</a><a href="#">찾아오시는 길</a></nav><p className="text-xs leading-relaxed opacity-70">(13437) 경기도 성남시 중원구 성남대로 997(여수동 200번지) 성남시청<br />대표전화: 1577-3100 · 평일 09:00 ~ 18:00</p><p className="text-xs opacity-60">Copyright © Seongnam City. All Rights Reserved.</p></div></footer>
}
