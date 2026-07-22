import { ArrowRight } from "lucide-react"
import type { MouseEvent } from "react"
import contractDoctorImage from "@/계약박사 리뉴얼.png"

export function AiDoctorFab() {
  const openAssistant = (event: MouseEvent<HTMLButtonElement>) => {
    window.dispatchEvent(new CustomEvent("open-contract-assistant", {
      detail: { trigger: event.currentTarget },
    }))
  }

  return (
    <button
      type="button"
      aria-label="AI 계약박사 열기"
      onClick={openAssistant}
      className="ai-doctor-fab ai-doctor-float inline-flex min-h-11 w-full max-w-[560px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl border-2 px-3 text-sm font-bold transition-colors focus-visible:outline-offset-4 sm:w-auto"
    >
      <span className="size-9 overflow-hidden rounded-lg bg-purple-50" aria-hidden="true">
        <img src={contractDoctorImage} alt="" className="size-full origin-top scale-[1.55] object-contain" />
      </span>
      <span>AI 계약박사에게 질문하기</span>
      <ArrowRight className="size-4" aria-hidden="true" />
    </button>
  )
}
