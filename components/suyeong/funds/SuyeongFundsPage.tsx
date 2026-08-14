import {
  SuyeongFinancialSearch,
  SuyeongListPage,
  SuyeongResultsSection,
} from "@/components/suyeong/shared"
import { downloadFundsCsv } from "./funds.csv"
import { FundsTrendSection } from "./FundsTrendSection"
import { SuyeongFundsTable } from "./SuyeongFundsTable"
import { useFundsOperations } from "./useFundsOperations"
import "./SuyeongFundsPage.css"

export function SuyeongFundsPage() {
  const funds = useFundsOperations()

  return (
    <SuyeongListPage
      activeItem="자금운용현황"
      current="자금운용현황"
      description="현재 시점의 세입·세출 흐름을 확인할 수 있습니다."
      title="자금운용 추이"
      className="sy-funds-page"
    >
      <FundsTrendSection />
      <section className="sy-funds-detail" aria-labelledby="funds-detail-title">
        <h2 id="funds-detail-title">상세내역 조회</h2>
        <SuyeongFinancialSearch
          criteria={funds.criteria}
          onChange={funds.setCriteria}
          onReset={funds.reset}
          onSubmit={funds.search}
        />
        <SuyeongResultsSection
          ariaLabel="자금운용현황 조회 결과"
          resultCount={funds.filteredRecords.length}
          pageSize={funds.pageSize}
          onPageSizeChange={funds.changePageSize}
          onDownload={() => downloadFundsCsv(funds.filteredRecords)}
          currentPage={funds.currentPage}
          totalPages={funds.totalPages}
          onPageChange={funds.setCurrentPage}
        >
          <SuyeongFundsTable records={funds.visibleRecords} />
        </SuyeongResultsSection>
      </section>
    </SuyeongListPage>
  )
}
