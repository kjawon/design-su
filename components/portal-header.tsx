"use client"

import { Menu, X } from "lucide-react"
import { useState } from "react"
import seongnamContractLogo from "@/성남시 계약정보 로고.png"
import { Button } from "@/components/ui/button"

const navItems = ["계약현황", "입찰공고", "수의계약", "계약업체현황", "계약통계", "이용안내"]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#" aria-label="성남시 계약정보공개시스템 홈" className="shrink-0">
          <img src={seongnamContractLogo} alt="성남시 계약정보공개시스템" className="h-10 w-auto object-contain md:h-12" />
        </a>
        <nav aria-label="주요 메뉴" className="hidden items-center gap-7 md:flex">
          {navItems.map((item, index) => (
            <a key={item} href={`#${index === 0 ? "recent" : "services"}`} className={index === 0 ? "border-b-2 border-purple-primary py-5 text-sm font-bold text-blue-dark" : "py-5 text-sm text-text-secondary transition-colors hover:text-blue-primary"}>{item}</a>
          ))}
        </nav>
        <Button variant="secondary" size="sm" className="hidden bg-sky-light text-blue-dark hover:bg-blue-light md:inline-flex">로그인</Button>
        <Button variant="ghost" size="icon" aria-label={open ? "메뉴 닫기" : "메뉴 열기"} onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav aria-label="모바일 메뉴" className="flex flex-col gap-1 border-t bg-card p-4 md:hidden">
          {navItems.map((item) => <a key={item} href="#services" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-text-secondary hover:bg-purple-light hover:text-purple-primary">{item}</a>)}
          <Button variant="secondary" className="mt-2">로그인</Button>
        </nav>
      )}
    </header>
  )
}
