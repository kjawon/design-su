"use client"

import { ChevronDown, Menu, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import gapyeongLogo from "@/가평군청 로고.svg"
import { GlobalDropdown } from "@/components/navigation/global-dropdown"
import { globalMenus } from "@/components/navigation/global-menu-data"
import { Button } from "@/components/ui/button"

const CLOSE_DELAY = 150

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileContractOpen, setMobileContractOpen] = useState(false)
  const [mobileContractGroups, setMobileContractGroups] = useState<Record<number, boolean>>({})
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const desktopNavigationRef = useRef<HTMLDivElement>(null)
  const desktopMenuButtonRefs = useRef<Array<HTMLButtonElement | null>>([])
  const closeTimerRef = useRef<number | null>(null)
  const currentPath = window.location.pathname.replace(/\/+$/, "") || "/"

  const clearCloseTimer = () => {
    if (closeTimerRef.current === null) return
    window.clearTimeout(closeTimerRef.current)
    closeTimerRef.current = null
  }

  const closeMegaMenu = () => {
    clearCloseTimer()
    setIsMegaMenuOpen(false)
    setActiveMenuIndex(null)
  }

  const openMegaMenu = (index: number) => {
    clearCloseTimer()
    setActiveMenuIndex(index)
    setIsMegaMenuOpen(true)
  }

  const scheduleMegaMenuClose = () => {
    clearCloseTimer()
    closeTimerRef.current = window.setTimeout(closeMegaMenu, CLOSE_DELAY)
  }

  useEffect(() => {
    return () => clearCloseTimer()
  }, [])

  useEffect(() => {
    if (!menuOpen && !isMegaMenuOpen) return

    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return

      if (isMegaMenuOpen) {
        const buttonToFocus = activeMenuIndex === null ? null : desktopMenuButtonRefs.current[activeMenuIndex]
        closeMegaMenu()
        buttonToFocus?.focus()
      }

      if (menuOpen) {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    const closeWithOutsideClick = (event: PointerEvent) => {
      if (desktopNavigationRef.current?.contains(event.target as Node)) return
      closeMegaMenu()
    }

    window.addEventListener("keydown", closeWithEscape)
    window.addEventListener("pointerdown", closeWithOutsideClick)
    return () => {
      window.removeEventListener("keydown", closeWithEscape)
      window.removeEventListener("pointerdown", closeWithOutsideClick)
    }
  }, [activeMenuIndex, isMegaMenuOpen, menuOpen])

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

          <div
            ref={desktopNavigationRef}
            className="ml-auto hidden h-full items-center lg:flex"
            onMouseEnter={clearCloseTimer}
            onMouseLeave={scheduleMegaMenuClose}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                scheduleMegaMenuClose()
              }
            }}
            onFocus={clearCloseTimer}
          >
            <nav aria-label="주요 메뉴" className="flex h-full items-center gap-7">
              {globalMenus.map((menu, index) => {
                const menuPath = menu.path?.split("#")[0]
                const isCurrent =
                  menu.label === "계약정보"
                    ? currentPath.startsWith("/contract/")
                    : Boolean(menuPath && menuPath !== "/" && currentPath.startsWith(menuPath))
                const isHighlighted = isCurrent || (isMegaMenuOpen && activeMenuIndex === index)
                const dropdownId = `global-dropdown-${index}`

                return (
                  <div key={menu.label} className="relative flex h-full items-center">
                    <button
                      ref={(element) => {
                        desktopMenuButtonRefs.current[index] = element
                      }}
                      type="button"
                      aria-expanded={isMegaMenuOpen && activeMenuIndex === index}
                      aria-controls={dropdownId}
                      aria-current={isCurrent ? "page" : undefined}
                      onMouseEnter={() => openMegaMenu(index)}
                      onFocus={() => openMegaMenu(index)}
                      onClick={() => {
                        if (isMegaMenuOpen && activeMenuIndex === index) {
                          closeMegaMenu()
                          return
                        }
                        openMegaMenu(index)
                      }}
                      className={`flex h-full items-center border-b-2 bg-transparent pt-0.5 text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-inset ${
                        isHighlighted
                          ? "border-primary-700 font-bold text-primary-700 hover:border-coral-600"
                          : "border-transparent font-medium text-gray-700 hover:border-coral-600 hover:font-bold hover:text-primary-700"
                      }`}
                    >
                      {menu.label}
                    </button>

                    {isMegaMenuOpen && activeMenuIndex === index && (
                      <GlobalDropdown
                        id={dropdownId}
                        menu={menu}
                        onNavigate={closeMegaMenu}
                      />
                    )}
                  </div>
                )
              })}
            </nav>
          </div>

          <div className="ml-auto flex items-center lg:hidden">
            <Button ref={menuButtonRef} type="button" variant="ghost" size="icon" aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((current) => !current)} className="min-h-9 min-w-9">
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </div>
        </div>

        {menuOpen && (
          <div id="mobile-navigation" className="max-h-[calc(100dvh-60px)] overflow-y-auto border-t border-border bg-card p-4 lg:hidden">
            <nav aria-label="모바일 주요 메뉴">
              <ul className="flex flex-col gap-1">
                {globalMenus.map((menu) => {
                  const isContractMenu = menu.label === "계약정보"

                  if (!isContractMenu) {
                    return (
                      <li key={menu.label}>
                        <a href={menu.path} onClick={() => setMenuOpen(false)} className="flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-700">
                          {menu.label}
                        </a>
                      </li>
                    )
                  }

                  return (
                    <li key={menu.label}>
                      <button
                        type="button"
                        className={`flex min-h-11 w-full items-center justify-between rounded-md px-3 text-sm font-bold ${
                          currentPath.startsWith("/contract/")
                            ? "bg-primary-50 text-primary-700"
                            : "text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                        }`}
                        aria-expanded={mobileContractOpen}
                        aria-controls="mobile-contract-navigation"
                        onClick={() => {
                          const nextOpen = !mobileContractOpen
                          setMobileContractOpen(nextOpen)
                          if (nextOpen) {
                            const activeGroupIndex = menu.groups.findIndex((group) =>
                              group.items.some(
                                (item) => (item.path.replace(/\/+$/, "") || "/") === currentPath,
                              ),
                            )
                            if (activeGroupIndex >= 0) {
                              setMobileContractGroups((current) => ({
                                ...current,
                                [activeGroupIndex]: true,
                              }))
                            }
                          }
                        }}
                      >
                        {menu.label}
                        <ChevronDown
                          className={`size-4 transition-transform ${mobileContractOpen ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        />
                      </button>

                      {mobileContractOpen && (
                        <div id="mobile-contract-navigation" className="ml-2 mt-1 border-l border-primary-100 pl-2">
                          {menu.groups.map((group, groupIndex) => {
                            const groupTitle = group.title ?? "기타"
                            const isGroupOpen = Boolean(mobileContractGroups[groupIndex])
                            const groupId = `mobile-contract-group-${groupIndex}`

                            return (
                              <section key={groupTitle}>
                                <button
                                  type="button"
                                  className="flex min-h-11 w-full items-center justify-between rounded-md px-3 text-sm font-semibold text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                                  aria-expanded={isGroupOpen}
                                  aria-controls={groupId}
                                  onClick={() =>
                                    setMobileContractGroups((current) => ({
                                      ...current,
                                      [groupIndex]: !current[groupIndex],
                                    }))
                                  }
                                >
                                  {groupTitle}
                                  <ChevronDown
                                    className={`size-4 transition-transform ${isGroupOpen ? "rotate-180" : ""}`}
                                    aria-hidden="true"
                                  />
                                </button>

                                {isGroupOpen && (
                                  <ul id={groupId} className="pb-1 pl-2">
                                    {group.items.map((item) => {
                                      const itemPath = item.path.replace(/\/+$/, "") || "/"
                                      const isCurrent = itemPath === currentPath
                                      return (
                                        <li key={`${groupTitle}-${item.label}`}>
                                          <a
                                            href={item.path}
                                            aria-current={isCurrent ? "page" : undefined}
                                            onClick={() => setMenuOpen(false)}
                                            className={`flex min-h-11 items-center rounded-md px-3 text-sm ${
                                              isCurrent
                                                ? "bg-primary-50 font-bold text-primary-700"
                                                : "font-medium text-gray-600 hover:bg-primary-50 hover:text-primary-700"
                                            }`}
                                          >
                                            {item.label}
                                          </a>
                                        </li>
                                      )
                                    })}
                                  </ul>
                                )}
                              </section>
                            )
                          })}
                        </div>
                      )}
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
