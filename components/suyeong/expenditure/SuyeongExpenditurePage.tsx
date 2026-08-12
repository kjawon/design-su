import { suyeongLinks } from "@/components/suyeong/config/links"
import { SuyeongListPage, SuyeongResultsSection } from "@/components/suyeong/shared"
import { downloadExpenditureCsv } from "./expenditure.csv"
import { SuyeongExpenditureSearch } from "./SuyeongExpenditureSearch"
import { SuyeongExpenditureTable } from "./SuyeongExpenditureTable"
import { useExpenditure } from "./useExpenditure"

export function SuyeongExpenditurePage() {
  const expenditure = useExpenditure()

  return (
    <SuyeongListPage
      activeItem="세출정보"
      current="지출현황"
      description="세부사업별 지출 내역을 기간과 조건별로 확인하세요"
      parent={{ label: "세출정보", href: suyeongLinks.budgetExecution }}
      title="지출현황"
    >
      <SuyeongExpenditureSearch
        criteria={expenditure.criteria}
        onChange={expenditure.setCriteria}
        onReset={expenditure.reset}
        onSubmit={expenditure.search}
      />
      <SuyeongResultsSection
        ariaLabel="지출현황 조회 결과"
        resultCount={expenditure.filteredRecords.length}
        pageSize={expenditure.pageSize}
        onPageSizeChange={expenditure.changePageSize}
        onDownload={() => downloadExpenditureCsv(expenditure.filteredRecords)}
        currentPage={expenditure.currentPage}
        totalPages={expenditure.totalPages}
        onPageChange={expenditure.setCurrentPage}
      >
        <SuyeongExpenditureTable records={expenditure.visibleRecords} />
      </SuyeongResultsSection>
    </SuyeongListPage>
  )
}
