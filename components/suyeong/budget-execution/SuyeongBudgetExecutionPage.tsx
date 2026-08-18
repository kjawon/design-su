import { suyeongLinks } from "@/components/suyeong/config/links"
import {
  SuyeongFinancialSearch,
  SuyeongListPage,
  SuyeongResultsSection,
} from "@/components/suyeong/shared"
import { downloadBudgetExecutionCsv } from "./budget-execution.csv"
import { FieldExecutionRateChart } from "./FieldExecutionRateChart"
import { SuyeongBudgetExecutionTable } from "./SuyeongBudgetExecutionTable"
import { useBudgetExecution } from "./useBudgetExecution"

export function SuyeongBudgetExecutionPage() {
  const execution = useBudgetExecution()

  return (
    <SuyeongListPage
      activeItem="세출정보"
      current="예산집행현황"
      description="분야별 예산 집행 현황을 확인하세요"
      parent={{ label: "세출정보", href: suyeongLinks.budgetExecution }}
      title="예산집행현황"
    >
      <FieldExecutionRateChart records={execution.filteredRecords} />
      <SuyeongFinancialSearch
        criteria={execution.criteria}
        onChange={execution.setCriteria}
        onReset={execution.reset}
        onSubmit={execution.search}
      />
      <SuyeongResultsSection
        ariaLabel="예산집행현황 조회 결과"
        resultCount={execution.filteredRecords.length}
        pageSize={execution.pageSize}
        pageSizeOptions={[10, 30, 50]}
        onPageSizeChange={execution.changePageSize}
        onDownload={() => downloadBudgetExecutionCsv(execution.filteredRecords)}
        currentPage={execution.currentPage}
        totalPages={execution.totalPages}
        onPageChange={execution.setCurrentPage}
        showPageSize={false}
        showPagination={false}
      >
        <SuyeongBudgetExecutionTable records={execution.filteredRecords} />
      </SuyeongResultsSection>
    </SuyeongListPage>
  )
}
