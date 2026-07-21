"use client"

import { Menu, X } from "lucide-react"
import { useState } from "react"
import seongnamContractLogo from "@/성남시 계약정보 로고.png"
import { Button } from "@/components/ui/button"

const navItems = ["발주·입찰", "계약현황", "대금지급", "계약자료", "이용안내"]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex h-[76px] max-w-[1530px] items-center gap-5 px-5 lg:px-8">
        <a href="#" aria-label="성남시 계약정보공개시스템 홈" className="shrink-0">
          <img src={seongnamContractLogo} alt="성남시 계약정보공개시스템" className="h-11 w-auto object-contain" />
        </a>

        <nav aria-label="주요 메뉴" className="ml-auto hidden h-full items-center gap-7 md:flex">
          {navItems.map((item, index) => (
            <a key={item} href="#services" className={index === 0 ? "flex h-full items-center border-b-2 border-red-primary pt-0.5 text-sm font-bold text-blue-primary" : "flex h-full items-center border-b-2 border-transparent pt-0.5 text-sm font-medium text-text-secondary transition hover:text-blue-primary"}>{item}</a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 md:ml-2">
          <Button variant="secondary" size="sm" className="hidden bg-[#EAF4FD] text-blue-dark hover:bg-blue-light sm:inline-flex">로그인</Button>
          <Button variant="ghost" size="icon" aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"} onClick={() => setMenuOpen((current) => !current)} className="md:hidden">
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {menuOpen && (
        <nav aria-label="모바일 메뉴" className="flex flex-col gap-1 border-t border-border bg-card p-4 md:hidden">
          {navItems.map((item) => <a key={item} href="#services" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-text-secondary hover:bg-[#EAF4FD] hover:text-blue-primary">{item}</a>)}
          <Button variant="secondary" className="mt-2 sm:hidden">로그인</Button>
        </nav>
      )}
    </header>
  )
}
