import { suyeongLinks } from "@/components/suyeong/config/links"
import {
  SuyeongListPage,
  SuyeongResultsSection,
} from "@/components/suyeong/shared"
import { downloadBusinessDetailsCsv } from "./business-details.csv"
import { SuyeongBusinessDetailsSearch } from "./SuyeongBusinessDetailsSearch"
import { SuyeongBusinessDetailsTable } from "./SuyeongBusinessDetailsTable"
import { useBusinessDetails } from "./useBusinessDetails"

export function SuyeongBusinessDetailsPage() {
  const businessDetails = useBusinessDetails()

  return (
    <SuyeongListPage
      activeItem="세출정보"
      current="사업별세부설명"
      description="수영구의 사업별 예산과 추진 내용을 확인하세요"
      parent={{ label: "세출정보", href: suyeongLinks.budgetExecution }}
      title="사업별세부설명"
    >
      <SuyeongBusinessDetailsSearch
        criteria={businessDetails.criteria}
        onChange={businessDetails.setCriteria}
        onReset={businessDetails.reset}
        onSubmit={businessDetails.search}
      />
      <SuyeongResultsSection
        ariaLabel="사업별세부설명 조회 결과"
        resultCount={businessDetails.filteredRecords.length}
        pageSize={businessDetails.pageSize}
        pageSizeOptions={[10, 30, 50, 100]}
        onPageSizeChange={businessDetails.changePageSize}
        onDownload={() => downloadBusinessDetailsCsv(businessDetails.filteredRecords)}
        currentPage={businessDetails.currentPage}
        totalPages={businessDetails.totalPages}
        onPageChange={businessDetails.setCurrentPage}
      >
        <SuyeongBusinessDetailsTable records={businessDetails.visibleRecords} />
      </SuyeongResultsSection>
    </SuyeongListPage>
  )
}
