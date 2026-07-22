import { FormEvent, useState } from "react"
import { ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export type ContractSearch = {
  field: "전체" | "계약명" | "업체명"
  query: string
}

export function ContractSearchPanel({ onSearch }: { onSearch: (search: ContractSearch) => void }) {
  const [field, setField] = useState<ContractSearch["field"]>("전체")
  const [query, setQuery] = useState("")

  const submit = (event?: FormEvent) => {
    event?.preventDefault()
    onSearch({ field, query: query.trim() })
  }

  const openAssistant = () => window.dispatchEvent(new Event("open-contract-assistant"))

  return (
    <section aria-labelledby="contract-search-title" className="bg-page pt-7">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
        <div className="rounded-2xl border border-border border-l-4 border-l-blue-primary bg-card px-5 py-5 md:px-7 md:py-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="lg:max-w-[27rem]">
              <h1 id="contract-search-title" className="text-2xl font-extrabold tracking-tight text-text-primary">계약정보 검색</h1>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">계약명, 업체명, 기간 또는 금액 조건으로 원하는 계약정보를 찾아보세요.</p>
            </div>
            <form onSubmit={submit} className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row lg:max-w-[36rem]">
              <div className="flex min-w-0 flex-1 items-center rounded-xl border border-border bg-primary-50 p-1 transition focus-within:border-primary-600 focus-within:ring-2 focus-within:ring-primary-600/20">
                <select value={field} onChange={(event) => setField(event.target.value as ContractSearch["field"])} aria-label="검색 유형" className="h-10 shrink-0 border-0 bg-transparent pl-3 pr-3 text-xs font-semibold text-text-primary outline-none">
                  <option value="전체">통합검색</option>
                  <option value="계약명">계약명</option>
                  <option value="업체명">업체명</option>
                </select>
                <span className="h-5 w-px bg-border" aria-hidden="true" />
                <Input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="계약 검색어" placeholder="검색어를 입력해주세요." className="h-10 min-w-0 border-0 bg-transparent text-sm shadow-none focus-visible:ring-0" />
              </div>
              <Button type="submit" className="h-12 rounded-xl px-5"><Search className="size-4" />검색</Button>
            </form>
          </div>
          <button type="button" onClick={openAssistant} className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-purple-primary transition hover:text-purple-dark">
            복잡한 조건은 AI 계약박사에게 물어보세요<ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>
    </section>
  )
}
