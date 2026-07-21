import { useMemo, useState } from "react"
import { ArrowRight, SearchX } from "lucide-react"
import { BookmarkTabs, categoryDescriptions } from "@/components/bookmark-tabs"
import { ContractDataCard } from "@/components/contract-data-card"
import type { ContractSearch } from "@/components/contract-search-panel"
import { contracts, type ContractCategory } from "@/components/portal-data"
import { Button } from "@/components/ui/button"

type ContractType = "전체" | "공사" | "용역" | "물품"
const contractTypes: ContractType[] = ["전체", "공사", "용역", "물품"]

function amountToNumber(amount: string) {
  return Number(amount.replace(/[^0-9]/g, ""))
}

function matchesSearch(contract: (typeof contracts)[number], search: ContractSearch) {
  const query = search.query.toLowerCase()
  if (!query) return true
  if (query === "최근 3개월 정보화 사업") return /디지털|데이터|전산|정보/.test(contract.title)
  if (query === "1억 원 이상 계약") return amountToNumber(contract.amount) >= 100_000_000
  if (query === "수의계약 현황") return contract.method === "수의계약"
  if (query === "분당구 공사 계약") return contract.type === "공사" && contract.title.includes("분당구")

  const haystack = search.field === "계약명"
    ? contract.title
    : search.field === "업체명"
      ? contract.partner
      : `${contract.title} ${contract.partner} ${contract.type} ${contract.method} ${contract.amount}`
  return haystack.toLowerCase().includes(query)
}

function ContractCardGrid({ items }: { items: typeof contracts }) {
  if (items.length === 0) {
    return <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-section/60 text-center"><SearchX className="size-8 text-text-muted" /><strong className="mt-3 text-sm text-text-primary">조건에 맞는 계약이 없습니다.</strong><span className="mt-1 text-xs text-text-secondary">검색어나 필터를 변경해보세요.</span></div>
  }
  return <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{items.map((contract) => <ContractDataCard key={`${contract.title}-${contract.date}`} contract={contract} />)}</div>
}

export function ContractWorkspace({ search }: { search: ContractSearch }) {
  const [activeCategory, setActiveCategory] = useState<ContractCategory>("입찰정보")
  const [activeType, setActiveType] = useState<ContractType>("전체")

  const filteredContracts = useMemo(() => {
    const categoryItems = contracts.filter(({ categories }) => categories.includes(activeCategory))
    return categoryItems
      .filter((contract) => (activeType === "전체" || contract.type === activeType) && matchesSearch(contract, search))
      .sort((a, b) => b.date.localeCompare(a.date))
  }, [activeCategory, activeType, search])

  const changeCategory = (category: ContractCategory) => {
    setActiveCategory(category)
    setActiveType("전체")
  }

  return (
    <section id="workspace" aria-labelledby="workspace-title" className="bg-page py-8 md:py-10">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
        <BookmarkTabs activeCategory={activeCategory} onChange={changeCategory} />

        <div className="rounded-2xl border border-border bg-card p-5 md:p-7">
          <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="workspace-title" className="text-2xl font-extrabold tracking-tight text-text-primary">{activeCategory}</h2>
              <p className="mt-1.5 text-sm text-text-secondary">{categoryDescriptions[activeCategory]}</p>
            </div>
            <div role="tablist" aria-label="계약 유형 필터" className="flex gap-1 overflow-x-auto">
              {contractTypes.map((type) => (
                <button key={type} type="button" role="tab" aria-selected={activeType === type} onClick={() => setActiveType(type)} className={activeType === type ? "shrink-0 rounded-lg bg-blue-light px-4 py-2 text-xs font-bold text-blue-dark" : "shrink-0 rounded-lg px-4 py-2 text-xs font-semibold text-text-secondary transition hover:bg-section hover:text-blue-primary"}>{type}</button>
              ))}
            </div>
          </div>

          <div className="pt-6" role="tabpanel">
            <ContractCardGrid items={filteredContracts.slice(0, 3)} />
            <div className="mt-6 flex justify-center">
              <Button variant="outline" className="border-blue-primary/50 bg-card text-blue-primary hover:bg-blue-light hover:text-blue-dark">전체 계약 내역 보기<ArrowRight className="size-4" /></Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
