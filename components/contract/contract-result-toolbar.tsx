import { Download, Printer } from "lucide-react"

type ContractResultToolbarProps = {
  totalCount: number
  pageSize: number
  onPageSizeChange: (pageSize: number) => void
  onDownload: () => void
  onPrint: () => void
}

export function ContractResultToolbar({
  totalCount,
  pageSize,
  onPageSizeChange,
  onDownload,
  onPrint,
}: ContractResultToolbarProps) {
  return (
    <div className="contract-results-tools">
      <p className="contract-results-count" aria-live="polite">
        총 <strong>{totalCount.toLocaleString("ko-KR")}</strong>건
      </p>
      <div className="contract-results-actions">
        <label>
          <span className="sr-only">페이지당 목록 개수</span>
          <select
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
          >
            <option value={10}>10개씩 보기</option>
            <option value={20}>20개씩 보기</option>
            <option value={50}>50개씩 보기</option>
          </select>
        </label>
        <button
          type="button"
          className="contract-button contract-button--excel"
          onClick={onDownload}
        >
          <Download size={18} aria-hidden="true" />
          엑셀 다운로드
        </button>
        <button
          type="button"
          className="contract-button contract-button--outline contract-print-button"
          onClick={onPrint}
        >
          <Printer size={18} aria-hidden="true" />
          인쇄
        </button>
      </div>
    </div>
  )
}
