import { FormEvent, useState } from "react"
import { ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function IntroSection() {
  const [query, setQuery] = useState("")
  const openAssistant = () => window.dispatchEvent(new Event("open-contract-assistant"))
  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!query.trim()) return
    window.dispatchEvent(new CustomEvent("contract-search", { detail: { query: query.trim() } }))
  }

  return (
    <section className="bg-card">
      <div className="mx-auto flex min-h-[180px] max-w-[1200px] flex-col justify-center gap-7 px-5 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="border-l-4 border-blue-primary pl-5 md:pl-7">
          <h1 className="text-3xl font-extrabold tracking-tight text-text-primary md:text-[2.5rem]">성남시 계약정보공개시스템</h1>
          <p className="mt-3 text-base text-text-secondary md:text-lg">성남시의 발주, 입찰, 계약 및 대금지급 정보를 확인하세요.</p>
          <button type="button" onClick={openAssistant} className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-purple-primary transition hover:text-purple-dark">
            복잡한 조건은 AI 계약박사에게 물어보세요<ArrowRight className="size-3.5" />
          </button>
        </div>
        <form onSubmit={submit} className="flex w-full min-w-0 gap-2 lg:max-w-[430px]">
          <Input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="계약 검색어" placeholder="계약명 또는 업체명을 입력하세요." className="h-12 min-w-0 rounded-xl bg-[#F8FBFE] px-4" />
          <Button type="submit" className="h-12 shrink-0 rounded-xl px-5"><Search className="size-4" />검색</Button>
        </form>
      </div>
    </section>
  )
}
