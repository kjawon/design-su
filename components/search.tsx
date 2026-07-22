import { FormEvent, useState } from "react"
import { SearchIcon } from "lucide-react"
import { AiDoctorFab } from "@/components/ai-doctor-fab"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Search() {
  const [query, setQuery] = useState("")

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const normalizedQuery = query.trim()
    if (!normalizedQuery) return
    window.dispatchEvent(new CustomEvent("contract-search", { detail: { query: normalizedQuery } }))
  }

  return (
    <section aria-labelledby="contract-search-title" className="w-full shrink-0 bg-transparent">
      <h2 id="contract-search-title" className="sr-only">계약정보 검색</h2>
      <div className="portal-search-layout mx-auto flex w-full max-w-[940px] flex-col items-center justify-center gap-3 px-5 sm:flex-row">
        <form role="search" onSubmit={submit} className="portal-search-form flex w-full max-w-[560px] items-center gap-2 rounded-full border border-gray-300 bg-white p-1 pl-5 transition focus-within:border-primary-600 focus-within:ring-2 focus-within:ring-primary-600/20">
          <label htmlFor="contract-search-input" className="sr-only">계약명 또는 업체명</label>
          <Input
            id="contract-search-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="계약명 또는 업체명을 입력하세요."
            className="h-10 min-w-0 border-0 bg-transparent pr-2 text-sm text-gray-900 shadow-none outline-none placeholder:text-gray-500 focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0"
          />
          <Button type="submit" size="icon" aria-label="계약정보 검색" className="size-11 shrink-0 rounded-full bg-primary-700 text-white hover:bg-primary-600">
            <SearchIcon className="size-5" aria-hidden="true" />
          </Button>
        </form>
        <AiDoctorFab />
      </div>
    </section>
  )
}
