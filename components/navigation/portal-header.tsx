"use client"

import { Menu, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import gapyeongLogo from "@/가평군청 로고.svg"
import {
  globalMenus,
  type GlobalMenu,
} from "@/components/navigation/global-menu-data"
import { Button } from "@/components/ui/button"

function isCurrentMenu(menu: GlobalMenu, currentPath: string) {
  if (menu.label === "계약정보") return currentPath.startsWith("/contract/")
  if (menu.label === "대금지급") return currentPath.startsWith("/payment/")
  if (menu.label === "관련정보") return currentPath.startsWith("/information/")
  if (menu.label === "공지사항") return currentPath.startsWith("/notice/")

  const menuPath = menu.path?.split("#")[0].replace(/\/+$/, "") || "/"
  return menuPath !== "/" && currentPath.startsWith(menuPath)
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const currentPath = window.location.pathname.replace(/\/+$/, "") || "/"

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
      <a href="#main-content" className="skip-link">
        본문 바로가기
      </a>
      <header className="sticky top-0 z-40 border-b border-gray-300 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[60px] max-w-[1400px] items-center gap-5 px-5 lg:px-8">
          <a
            href="/"
            aria-label="가평군청 계약정보공개시스템 홈"
            className="shrink-0 rounded-sm"
          >
            <span className="flex items-center gap-2.5">
              <img
                src={gapyeongLogo}
                alt=""
                className="size-10 object-contain"
                aria-hidden="true"
              />
              <span className="text-left leading-tight">
                <strong className="block text-sm font-extrabold text-primary-700">
                  가평군청
                </strong>
                <span className="block text-xs font-bold text-text-primary">
                  계약정보공개시스템
                </span>
              </span>
            </span>
          </a>

          <nav
            aria-label="주요 메뉴"
            className="ml-auto hidden h-full items-center lg:flex"
          >
            <ul className="flex h-full items-center gap-7">
              {globalMenus.map((menu) => {
                const isCurrent = isCurrentMenu(menu, currentPath)

                return (
                  <li key={menu.label} className="flex h-full items-center">
                    <a
                      href={menu.path}
                      aria-current={isCurrent ? "page" : undefined}
                      className={`relative flex h-full items-center px-1 pt-0.5 text-sm transition-colors duration-150 after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:rounded-t after:content-[''] hover:after:bg-coral-600 ${
                        isCurrent
                          ? "font-bold text-primary-700 after:bg-primary-700"
                          : "font-medium text-gray-700 after:bg-transparent hover:bg-primary-50 hover:text-primary-700"
                      }`}
                    >
                      {menu.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center lg:hidden">
            <Button
              ref={menuButtonRef}
              type="button"
              variant="ghost"
              size="icon"
              aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((current) => !current)}
              className="min-h-9 min-w-9"
            >
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </div>
        </div>

        {menuOpen && (
          <div
            id="mobile-navigation"
            className="max-h-[calc(100dvh-60px)] overflow-y-auto border-t border-border bg-card p-4 lg:hidden"
          >
            <nav aria-label="모바일 주요 메뉴">
              <ul className="flex flex-col gap-1">
                {globalMenus.map((menu) => {
                  const isCurrent = isCurrentMenu(menu, currentPath)

                  return (
                    <li key={menu.label}>
                      <a
                        href={menu.path}
                        aria-current={isCurrent ? "page" : undefined}
                        onClick={() => setMenuOpen(false)}
                        className={`flex min-h-11 items-center rounded-md px-3 text-sm ${
                          isCurrent
                            ? "bg-primary-50 font-bold text-primary-700"
                            : "font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                        }`}
                      >
                        {menu.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
