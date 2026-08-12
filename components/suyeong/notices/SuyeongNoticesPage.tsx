import { suyeongLinks } from "@/components/suyeong/config/links"
import { SuyeongListPage, SuyeongResultsSection } from "@/components/suyeong/shared"
import { downloadNoticesCsv } from "./notices.csv"
import { SuyeongNoticeSearch } from "./SuyeongNoticeSearch"
import { SuyeongNoticesTable } from "./SuyeongNoticesTable"
import { useNotices } from "./useNotices"

export function SuyeongNoticesPage() {
  const notices = useNotices()

  return (
    <SuyeongListPage
      activeItem="공지사항"
      current="알림글"
      description="수영구 세입·세출예산 운영정보공개시스템의 주요 소식을 확인하세요"
      parent={{ label: "공지사항", href: suyeongLinks.notices }}
      title="알림글"
    >
      <SuyeongNoticeSearch
        criteria={notices.criteria}
        onChange={notices.setCriteria}
        onReset={notices.reset}
        onSubmit={notices.search}
      />
      <SuyeongResultsSection
        ariaLabel="알림글 조회 결과"
        resultCount={notices.filteredRecords.length}
        pageSize={notices.pageSize}
        onPageSizeChange={notices.changePageSize}
        onDownload={() => downloadNoticesCsv(notices.filteredRecords)}
        currentPage={notices.currentPage}
        totalPages={notices.totalPages}
        onPageChange={notices.setCurrentPage}
      >
        <SuyeongNoticesTable records={notices.visibleRecords} />
      </SuyeongResultsSection>
    </SuyeongListPage>
  )
}
