import { services, type ContractCategory } from "@/components/portal-data"

export const categoryDescriptions: Record<ContractCategory, string> = {
  자체발주계획: "예정 발주 정보를 확인하세요.",
  입찰정보: "진행 중인 입찰과 최근 계약 정보를 확인하세요.",
  일반회계: "일반회계 계약 정보를 확인하세요.",
  특별회계: "특별회계 계약 정보를 확인하세요.",
  대금지급: "계약별 대금 지급 현황을 확인하세요.",
}

function BookmarkTab({ category, active, onSelect }: { category: ContractCategory; active: boolean; onSelect: () => void }) {
  return (
    <button type="button" role="tab" aria-selected={active} onClick={onSelect} className="bookmark-tab relative min-w-max rounded-t-xl border px-5 py-3 text-sm font-bold">
      {category}
    </button>
  )
}

export function BookmarkTabs({ activeCategory, onChange }: { activeCategory: ContractCategory; onChange: (category: ContractCategory) => void }) {
  return (
    <div role="tablist" aria-label="계약정보 카테고리" className="flex gap-2 overflow-x-auto px-1 pb-3 pt-1">
      {services.map(({ title }) => (
        <BookmarkTab key={title} category={title as ContractCategory} active={activeCategory === title} onSelect={() => onChange(title as ContractCategory)} />
      ))}
    </div>
  )
}
