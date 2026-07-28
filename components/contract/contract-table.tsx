import type { ContractRecord } from "@/components/contract/contract-types"

const amountFormatter = new Intl.NumberFormat("ko-KR")

type DataTableProps<RecordType> = {
  records: RecordType[]
  detailBasePath: string
  isLoading?: boolean
}

export function ContractTable({
  records,
  detailBasePath,
  isLoading = false,
}: DataTableProps<ContractRecord>) {
  return (
    <div className="contract-table-card">
      <div className="contract-table-scroll">
        <table className="contract-data-table" aria-busy={isLoading}>
          <caption className="sr-only">계약현황 검색 결과</caption>
          <colgroup>
            <col className="contract-table__col-number" />
            <col className="contract-table__col-type" />
            <col className="contract-table__col-office" />
            <col className="contract-table__col-title" />
            <col className="contract-table__col-amount" />
            <col className="contract-table__col-date" />
            <col className="contract-table__col-contractor" />
          </colgroup>
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
                  <td className="contract-table__type">
                    <span className="contract-type-badge">{record.type}</span>
                  </td>
                  <td className="contract-table__office">{record.office}</td>
                  <td className="contract-table__title">
                    <a href={`${detailBasePath}/${record.id}`} title={record.title}>
                      {record.title}
                    </a>
                  </td>
                  <td className="contract-table__amount">
                    {amountFormatter.format(record.amount)}원
                  </td>
                  <td className="contract-table__date">{record.date.replaceAll("-", ".")}</td>
                  <td className="contract-table__contractor" title={record.contractor}>
                    {record.contractor}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="contract-table__empty">
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
