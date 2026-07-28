import type { CompletionRecord } from "@/components/contract/contract-types"

const amountFormatter = new Intl.NumberFormat("ko-KR")

type CompletionTableProps = {
  records: CompletionRecord[]
  isLoading?: boolean
}

export function CompletionTable({ records, isLoading = false }: CompletionTableProps) {
  const formatDate = (date: string) => date.replaceAll("-", ".")

  return (
    <div className="contract-table-card">
      <div className="contract-table-scroll">
        <table className="contract-completion-table" aria-busy={isLoading}>
          <caption className="sr-only">준공검사 검색 결과</caption>
          <colgroup>
            <col className="contract-completion-table__col-number" />
            <col className="contract-completion-table__col-title" />
            <col className="contract-completion-table__col-office" />
            <col className="contract-completion-table__col-amount" />
            <col className="contract-completion-table__col-date" />
            <col className="contract-completion-table__col-date" />
            <col className="contract-completion-table__col-date" />
            <col className="contract-completion-table__col-date" />
            <col className="contract-completion-table__col-date" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">번호</th>
              <th scope="col">계약명</th>
              <th scope="col">관서명</th>
              <th scope="col">계약금액</th>
              <th scope="col">계약일</th>
              <th scope="col">착공일</th>
              <th scope="col">준공기한</th>
              <th scope="col">준공일</th>
              <th scope="col">검수일</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map((record) => (
                <tr key={record.id}>
                  <td className="contract-table__number">{record.id}</td>
                  <td className="contract-table__title">
                    <a href="#" title={record.title}>
                      {record.title}
                    </a>
                  </td>
                  <td className="contract-table__office">{record.office}</td>
                  <td className="contract-table__amount">
                    {amountFormatter.format(record.amount)}원
                  </td>
                  <td className="contract-table__date">{formatDate(record.contractDate)}</td>
                  <td className="contract-table__date">{formatDate(record.startDate)}</td>
                  <td className="contract-table__date">{formatDate(record.deadlineDate)}</td>
                  <td className="contract-table__date">{formatDate(record.completionDate)}</td>
                  <td className="contract-table__date">{formatDate(record.inspectionDate)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="contract-table__empty">
                  {isLoading ? "조회 중입니다." : "조회된 자료가 없습니다."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
