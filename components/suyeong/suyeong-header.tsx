import { Menu, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import suyeongIcon from "@/수영구 아이콘.svg"

const SYSTEM_BASE_URL = "http://contract.suyeong.go.kr/revtes"

const navigationItems = [
  { label: "자금운용현황", href: `${SYSTEM_BASE_URL}/basis/fundsMngList.do` },
  { label: "세입정보", href: `${SYSTEM_BASE_URL}/basis/revenueList.do` },
  { label: "세출정보", href: `${SYSTEM_BASE_URL}/basis/budgetExecutionList.do` },
  { label: "공지사항", href: `${SYSTEM_BASE_URL}/notice/noticeInfoListMenu.do` },
]

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
          <a className="sy-brand" href="/" aria-label="수영구 세입세출공개시스템 홈">
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
              {navigationItems.map((item) => (
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
            {navigationItems.map((item) => (
              <li key={item.label}>
                <a href={item.href} onClick={() => setMenuOpen(false)}>
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
