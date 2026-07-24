import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import type { ReactNode } from "react"
import type { ContractRecord } from "@/components/contract-status/contract-status-data"

const amountFormatter = new Intl.NumberFormat("ko-KR")

export function ContractTable({ records }: { records: ContractRecord[] }) {
  return (
    <div className="contract-table-card">
      <div className="contract-table-scroll">
        <table>
          <caption className="sr-only">계약현황 검색 결과</caption>
          <thead>
            <tr>
              <th scope="col">번호</th>
              <th scope="col">구분</th>
              <th scope="col">관서명</th>
              <th scope="col">계약명</th>
              <th scope="col">계약금액</th>
              <th scope="col">계약일</th>
              <th scope="col">계약상대자</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map((record) => (
                <tr key={record.id}>
                  <td className="contract-table__number">{record.id}</td>
                  <td>
                    <span className={`contract-type-badge contract-type-badge--${record.type}`}>
                      {record.type}
                    </span>
                  </td>
                  <td>{record.office}</td>
                  <td className="contract-table__title">
                    <a href="#" title={record.title}>
                      {record.title}
                    </a>
                  </td>
                  <td className="contract-table__amount">
                    {amountFormatter.format(record.amount)}원
                  </td>
                  <td className="contract-table__date">{record.date.replaceAll("-", ".")}</td>
                  <td>{record.contractor}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="contract-table__empty">
                  검색 조건에 해당하는 계약이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

type ContractPaginationProps = {
  currentPage: number
  totalPages: number
  onChange: (page: number) => void
}

export function ContractPagination({
  currentPage,
  totalPages,
  onChange,
}: ContractPaginationProps) {
  const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4))
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, index) => start + index)

  const pageButton = (
    label: string,
    page: number,
    icon: ReactNode,
    disabled = false,
  ) => (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(page)}
    >
      {icon}
    </button>
  )

  return (
    <nav className="contract-pagination" aria-label="계약현황 페이지">
      {pageButton("첫 페이지", 1, <ChevronsLeft size={17} aria-hidden="true" />, currentPage === 1)}
      {pageButton(
        "이전 페이지",
        Math.max(1, currentPage - 1),
        <ChevronLeft size={17} aria-hidden="true" />,
        currentPage === 1,
      )}
      {pages.map((page) => (
        <button
          type="button"
          key={page}
          className={page === currentPage ? "is-current" : undefined}
          aria-current={page === currentPage ? "page" : undefined}
          aria-label={`${page}페이지`}
          onClick={() => onChange(page)}
        >
          {page}
        </button>
      ))}
      {pageButton(
        "다음 페이지",
        Math.min(totalPages, currentPage + 1),
        <ChevronRight size={17} aria-hidden="true" />,
        currentPage === totalPages,
      )}
      {pageButton(
        "마지막 페이지",
        totalPages,
        <ChevronsRight size={17} aria-hidden="true" />,
        currentPage === totalPages,
      )}
    </nav>
  )
}
