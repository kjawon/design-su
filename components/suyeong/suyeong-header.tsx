import { Menu, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { primaryNavigationItems, suyeongLinks } from "@/components/suyeong/suyeong-links"
import suyeongIcon from "@/수영구 아이콘.svg"
import "@/components/suyeong/suyeong-header.css"

export function SuyeongHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

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
          <a className="sy-brand" href={suyeongLinks.home} aria-label="수영구 세입세출공개시스템 홈">
            <span className="sy-brand__municipality" aria-hidden="true">
              <img className="sy-brand__logo" src={suyeongIcon} alt="" />
              <strong>수영구</strong>
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
                <li key={item.label}>
                  <a href={item.href}>{item.label}</a>
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
              <li key={item.label}>
                <a
                  href={item.href}
                  tabIndex={menuOpen ? undefined : -1}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  )
}
