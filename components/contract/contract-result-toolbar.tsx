import { Download } from "lucide-react"

type ContractResultToolbarProps = {
  totalCount: number
  pageSize: number
  onPageSizeChange: (pageSize: number) => void
  onDownload: () => void
}

export function ContractResultToolbar({
  totalCount,
  pageSize,
  onPageSizeChange,
  onDownload,
}: ContractResultToolbarProps) {
  return (
    <div className="contract-results-tools">
      <p aria-live="polite">
        총 <strong>{totalCount.toLocaleString("ko-KR")}</strong>건
      </p>
      <div>
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
      </div>
    </div>
  )
}
