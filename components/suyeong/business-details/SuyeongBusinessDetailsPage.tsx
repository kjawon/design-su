import { useEffect, useState } from "react"
import { suyeongLinks } from "@/components/suyeong/config/links"
import {
  SuyeongListPage,
  SuyeongResultsSection,
} from "@/components/suyeong/shared"
import { downloadBusinessDetailsCsv } from "./business-details.csv"
import { businessDetailRecords } from "./business-details.data"
import type { BusinessDetailRecord } from "./business-details.types"
import { SuyeongBusinessDetailReport } from "./SuyeongBusinessDetailReport"
import { SuyeongBusinessDetailsSearch } from "./SuyeongBusinessDetailsSearch"
import { SuyeongBusinessDetailsTable } from "./SuyeongBusinessDetailsTable"
import { useBusinessDetails } from "./useBusinessDetails"

function getSelectedRecordFromUrl() {
  const recordNumber = Number(new URLSearchParams(window.location.search).get("business"))

  if (!Number.isInteger(recordNumber)) return null
  return businessDetailRecords.find((record) => record.number === recordNumber) ?? null
}

export function SuyeongBusinessDetailsPage() {
  const businessDetails = useBusinessDetails()
  const [selectedRecord, setSelectedRecord] = useState<BusinessDetailRecord | null>(
    getSelectedRecordFromUrl,
  )

  useEffect(() => {
    const syncSelectedRecord = () => setSelectedRecord(getSelectedRecordFromUrl())

    window.addEventListener("popstate", syncSelectedRecord)
    return () => window.removeEventListener("popstate", syncSelectedRecord)
  }, [])

  const showReport = (record: BusinessDetailRecord) => {
    const url = new URL(window.location.href)
    url.searchParams.set("business", String(record.number))
    window.history.pushState(null, "", url)
    setSelectedRecord(record)
  }

  const showList = () => {
    const url = new URL(window.location.href)
    url.searchParams.delete("business")
    window.history.replaceState(null, "", url)
    setSelectedRecord(null)
  }

  return (
    <SuyeongListPage
      activeItem="세출정보"
      current="사업별세부설명"
      description={
        selectedRecord
          ? `${selectedRecord.fiscalYear}년 ${selectedRecord.department} 사업 상세정보`
          : "00의 사업별 예산과 추진 내용을 확인하세요"
      }
      parent={{ label: "세출정보", href: suyeongLinks.budgetExecution }}
      title="사업별세부설명"
      className={selectedRecord ? "sy-business-detail-page" : undefined}
    >
      {selectedRecord ? (
        <SuyeongBusinessDetailReport
          record={selectedRecord}
          onBack={showList}
        />
      ) : (
        <>
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
            <SuyeongBusinessDetailsTable
              records={businessDetails.visibleRecords}
              onSelect={showReport}
            />
          </SuyeongResultsSection>
        </>
      )}
    </SuyeongListPage>
  )
}
