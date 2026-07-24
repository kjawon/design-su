"use client"

import { Menu, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import gapyeongLogo from "@/가평군청 로고.svg"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "발주계획", href: "/#services" },
  { label: "입찰정보", href: "/#services" },
  { label: "계약현황", href: "/contract/status" },
  { label: "대금지급", href: "/#information" },
  { label: "관련정보", href: "/#information" },
  { label: "공지사항", href: "/#information" },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const isContractStatus = window.location.pathname.startsWith("/contract/status")

  useEffect(() => {
    if (!menuOpen) return
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      setMenuOpen(false)
      menuButtonRef.current?.focus()
    }
    window.addEventListener("keydown", closeWithEscape)
    return () => window.removeEventListener("keydown", closeWithEscape)
  }, [menuOpen])

  return (
    <>
      <a href="#main-content" className="skip-link">본문 바로가기</a>
      <header className="sticky top-0 z-40 border-b border-gray-300 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[60px] max-w-[1400px] items-center gap-5 px-5 lg:px-8">
          <a href="/" aria-label="가평군청 계약정보공개시스템 홈" className="shrink-0 rounded-sm">
            <span className="flex items-center gap-2.5">
              <img src={gapyeongLogo} alt="" className="size-10 object-contain" aria-hidden="true" />
              <span className="text-left leading-tight">
                <strong className="block text-sm font-extrabold text-primary-700">가평군청</strong>
                <span className="block text-xs font-bold text-text-primary">계약정보공개시스템</span>
              </span>
            </span>
          </a>

          <nav aria-label="주요 메뉴" className="ml-auto hidden h-full items-center gap-7 lg:flex">
            {navItems.map((item) => {
              const isCurrent = item.label === "계약현황" && isContractStatus
              return (
              <a key={item.label} href={item.href} aria-current={isCurrent ? "page" : undefined} className={isCurrent ? "flex h-full items-center border-b-2 border-primary-700 pt-0.5 text-sm font-bold text-primary-700 transition-colors duration-150 hover:border-coral-600 hover:text-primary-700" : "flex h-full items-center border-b-2 border-transparent pt-0.5 text-sm font-medium text-gray-700 transition-colors duration-150 hover:border-coral-600 hover:font-bold hover:text-primary-700"}>
                {item.label}
              </a>
              )
            })}
          </nav>

          <div className="ml-auto flex items-center lg:hidden">
            <Button ref={menuButtonRef} type="button" variant="ghost" size="icon" aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((current) => !current)} className="min-h-9 min-w-9">
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </div>
        </div>

        {menuOpen && (
          <div id="mobile-navigation" className="border-t border-border bg-card p-4 lg:hidden">
            <nav aria-label="모바일 주요 메뉴">
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} onClick={() => setMenuOpen(false)} className="flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-700">{item.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
