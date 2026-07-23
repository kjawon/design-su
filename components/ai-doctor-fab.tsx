import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState, type MouseEvent } from "react"
import contractDoctorImage from "@/계약박사 리뉴얼.png"

export function AiDoctorFab() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const markerRef = useRef<HTMLSpanElement>(null)
  const [isPinned, setIsPinned] = useState(false)
  const [fixedMetrics, setFixedMetrics] = useState<{ left: number; width: number } | null>(null)

  useEffect(() => {
    const marker = markerRef.current
    const mobileQuery = window.matchMedia("(max-width: 639px)")
    if (!marker) return

    const observer = new IntersectionObserver(([entry]) => {
      const shouldPin = mobileQuery.matches && !entry.isIntersecting && entry.boundingClientRect.top < 68
      if (shouldPin && wrapperRef.current) {
        const { left, width } = wrapperRef.current.getBoundingClientRect()
        setFixedMetrics({ left, width })
      }
      setIsPinned(shouldPin)
    }, { rootMargin: "-68px 0px 0px 0px", threshold: 0 })

    const resetOnDesktop = () => {
      if (!mobileQuery.matches) setIsPinned(false)
    }

    observer.observe(marker)
    mobileQuery.addEventListener("change", resetOnDesktop)
    return () => {
      observer.disconnect()
      mobileQuery.removeEventListener("change", resetOnDesktop)
    }
  }, [])

  const openAssistant = (event: MouseEvent<HTMLButtonElement>) => {
    window.dispatchEvent(new CustomEvent("open-contract-assistant", {
      detail: { trigger: event.currentTarget },
    }))
  }

  return (
    <div ref={wrapperRef} className="relative flex min-h-11 w-full items-center sm:w-auto">
      <span ref={markerRef} className="pointer-events-none absolute top-0 h-px w-px" aria-hidden="true" />
      <button
        type="button"
        aria-label="AI 계약박사 열기"
        onClick={openAssistant}
        style={isPinned && fixedMetrics ? { left: fixedMetrics.left, width: fixedMetrics.width } : undefined}
        className={`ai-doctor-fab ai-doctor-float inline-flex min-h-11 w-full max-w-[560px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl border-2 px-3 text-sm font-bold transition-colors focus-visible:outline-offset-4 sm:w-auto ${isPinned ? "max-sm:fixed max-sm:top-[68px] max-sm:z-30 max-sm:max-w-none" : ""}`}
      >
        <span className="size-9 overflow-hidden rounded-lg bg-purple-50" aria-hidden="true">
          <img src={contractDoctorImage} alt="" className="size-full origin-top scale-[1.55] object-contain" />
        </span>
        <span>AI 계약박사에게 질문하기</span>
        <ArrowRight className="size-4" aria-hidden="true" />
      </button>
    </div>
  )
}
