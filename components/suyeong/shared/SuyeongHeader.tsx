import { Menu, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { primaryNavigationItems, suyeongLinks } from "@/components/suyeong/config/links"
import "@/components/suyeong/shared/SuyeongHeader.css"

interface SuyeongHeaderProps {
  activeItem?: string
}

export function SuyeongHeader({ activeItem }: SuyeongHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const currentPath = window.location.pathname.replace(/\/+$/, "") || "/"

  useEffect(() => {
    if (!menuOpen) return

    const closeMenu = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      setMenuOpen(false)
      menuButtonRef.current?.focus()
    }

    window.addEventListener("keydown", closeMenu)
    return () => window.removeEventListener("keydown", closeMenu)
  }, [menuOpen])

  return (
    <>
      <a className="sy-skip-link" href="#main-content">
        본문 바로가기
      </a>
      <header className="sy-header">
        <div className="sy-container sy-header__inner">
          <a
            className="sy-brand"
            href={suyeongLinks.home}
            aria-label="쏠텍주식회사 세입세출공개시스템 홈"
          >
            <span className="sy-brand__company" aria-hidden="true">
              <span className="sy-brand__company-highlight">쏠텍</span>주식회사
            </span>
            <span className="sy-brand__divider" aria-hidden="true" />
            <span className="sy-brand__service">
              세입·세출예산
              <strong>운영정보공개</strong>
            </span>
          </a>

          <nav className="sy-nav" aria-label="주요 메뉴">
            <ul>
              {primaryNavigationItems.map((item) => (
                <li
                  key={item.label}
                  className={"children" in item ? "sy-nav__item sy-nav__item--has-submenu" : "sy-nav__item"}
                >
                  <a
                    href={item.href}
                    aria-current={activeItem === item.label ? "page" : undefined}
                    aria-haspopup={"children" in item ? "menu" : undefined}
                  >
                    {item.label}
                  </a>
                  {"children" in item && (
                    <ul className="sy-nav__submenu" aria-label={`${item.label} 하위 메뉴`}>
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <a
                            href={child.href}
                            aria-current={currentPath === child.href ? "page" : undefined}
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={menuButtonRef}
            className="sy-menu-button"
            type="button"
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={menuOpen}
            aria-controls="suyeong-mobile-nav"
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        <nav
          id="suyeong-mobile-nav"
          className={`sy-mobile-nav${menuOpen ? " is-open" : ""}`}
          aria-label="모바일 주요 메뉴"
          aria-hidden={!menuOpen}
        >
          <ul className="sy-container">
            {primaryNavigationItems.map((item) => (
              <li
                key={item.label}
                className={"children" in item ? "sy-mobile-nav__item sy-mobile-nav__item--has-submenu" : "sy-mobile-nav__item"}
              >
                <a
                  href={item.href}
                  tabIndex={menuOpen ? undefined : -1}
                  aria-current={activeItem === item.label ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
                {"children" in item && (
                  <ul className="sy-mobile-subnav" aria-label={`${item.label} 하위 메뉴`}>
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <a
                          href={child.href}
                          tabIndex={menuOpen ? undefined : -1}
                          aria-current={currentPath === child.href ? "page" : undefined}
                          onClick={() => setMenuOpen(false)}
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  )
}
