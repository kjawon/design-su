import {
  SuyeongFinancialSearch,
  SuyeongListPage,
  SuyeongResultsSection,
} from "@/components/suyeong/shared"
import { downloadIncomeCsv } from "./income.csv"
import { IncomeTrendSection } from "./IncomeTrendSection"
import { SuyeongIncomeTable } from "./SuyeongIncomeTable"
import { useIncomeInformation } from "./useIncomeInformation"

export function SuyeongIncomePage() {
  const income = useIncomeInformation()

  return (
    <SuyeongListPage
      activeItem="세입정보"
      current="세입정보"
      description="회계별 세입 현황을 확인하세요"
      title="세입정보"
    >
      <IncomeTrendSection criteria={income.appliedCriteria} />
      <SuyeongFinancialSearch
        criteria={income.criteria}
        onChange={income.setCriteria}
        onReset={income.reset}
        onSubmit={income.search}
      />
      <SuyeongResultsSection
        ariaLabel="세입정보 조회 결과"
        resultCount={income.filteredRecords.length}
        pageSize={income.pageSize}
        onPageSizeChange={income.changePageSize}
        onDownload={() => downloadIncomeCsv(income.filteredRecords)}
        currentPage={income.currentPage}
        totalPages={income.totalPages}
        onPageChange={income.setCurrentPage}
        showPageSize={false}
        showPagination={false}
      >
        <SuyeongIncomeTable records={income.filteredRecords} />
      </SuyeongResultsSection>
    </SuyeongListPage>
  )
}
