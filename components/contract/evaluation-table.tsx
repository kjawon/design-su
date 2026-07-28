import type { EvaluationRecord } from "@/components/contract/contract-types"

type EvaluationTableProps = {
  records: EvaluationRecord[]
  isLoading?: boolean
}

export function EvaluationTable({ records, isLoading = false }: EvaluationTableProps) {
  return (
    <div className="contract-table-card">
      <div className="contract-table-scroll">
        <table className="contract-evaluation-table" aria-busy={isLoading}>
          <caption className="sr-only">협상계약평가결과 검색 결과</caption>
          <colgroup>
            <col className="contract-evaluation-table__col-number" />
            <col className="contract-evaluation-table__col-office" />
            <col className="contract-evaluation-table__col-department" />
            <col className="contract-evaluation-table__col-title" />
            <col className="contract-evaluation-table__col-date" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">번호</th>
              <th scope="col">관서명</th>
              <th scope="col">부서명</th>
              <th scope="col">사업명</th>
              <th scope="col">평가일</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map((record) => (
                <tr key={record.id}>
                  <td className="contract-table__number">{record.id}</td>
                  <td className="contract-table__office" title={record.office}>
                    {record.office}
                  </td>
                  <td className="contract-table__office" title={record.department}>
                    {record.department}
                  </td>
                  <td className="contract-table__title">
                    <a href="#" title={record.projectTitle}>
                      {record.projectTitle}
                    </a>
                  </td>
                  <td className="contract-table__date">
                    {record.evaluationDate.replaceAll("-", ".")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="contract-table__empty">
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
