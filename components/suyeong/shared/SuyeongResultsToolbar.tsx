import { Download } from "lucide-react"
import "./SuyeongResultsToolbar.css"

interface SuyeongResultsToolbarProps {
  resultCount: number
  pageSize: number
  pageSizeOptions?: readonly number[]
  onPageSizeChange: (pageSize: number) => void
  onDownload: () => void
}

export function SuyeongResultsToolbar({
  resultCount,
  pageSize,
  pageSizeOptions = [10, 20, 50],
  onPageSizeChange,
  onDownload,
}: SuyeongResultsToolbarProps) {
  return (
    <div className="sy-results-toolbar">
      <p>
        총 <strong>{resultCount.toLocaleString("ko-KR")}</strong>건
      </p>
      <div className="sy-results-toolbar__actions">
        <label>
          <span className="sy-visually-hidden">페이지당 표시 건수</span>
          <select value={pageSize} onChange={(event) => onPageSizeChange(Number(event.target.value))}>
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>{option}개씩 보기</option>
            ))}
          </select>
        </label>
        <button className="sy-excel-button" type="button" onClick={onDownload}>
          <Download aria-hidden="true" />
          엑셀 다운로드
        </button>
      </div>
    </div>
  )
}
