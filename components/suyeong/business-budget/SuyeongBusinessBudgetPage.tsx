import { suyeongLinks } from "@/components/suyeong/config/links"
import { SuyeongListPage, SuyeongResultsSection } from "@/components/suyeong/shared"
import { downloadBusinessBudgetCsv } from "./business-budget.csv"
import { SuyeongBusinessBudgetSearch } from "./SuyeongBusinessBudgetSearch"
import { SuyeongBusinessBudgetTable } from "./SuyeongBusinessBudgetTable"
import { useBusinessBudget } from "./useBusinessBudget"

export function SuyeongBusinessBudgetPage() {
  const budget = useBusinessBudget()

  return (
    <SuyeongListPage
      activeItem="세출정보"
      current="사업및예산정보"
      description="사업별 예산 편성과 집행 현황을 확인하세요"
      parent={{ label: "세출정보", href: suyeongLinks.budgetExecution }}
      title="사업및예산정보"
    >
      <SuyeongBusinessBudgetSearch
        criteria={budget.criteria}
        onChange={budget.setCriteria}
        onReset={budget.reset}
        onSubmit={budget.search}
      />
      <SuyeongResultsSection
        ariaLabel="사업및예산정보 조회 결과"
        resultCount={budget.filteredRecords.length}
        pageSize={budget.pageSize}
        onPageSizeChange={budget.changePageSize}
        onDownload={() => downloadBusinessBudgetCsv(budget.filteredRecords)}
        currentPage={budget.currentPage}
        totalPages={budget.totalPages}
        onPageChange={budget.setCurrentPage}
      >
        <SuyeongBusinessBudgetTable records={budget.visibleRecords} />
      </SuyeongResultsSection>
    </SuyeongListPage>
  )
}
